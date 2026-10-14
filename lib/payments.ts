import Razorpay from "razorpay";
import crypto from "crypto";
import { db } from "./db";

export const razorpay = () => new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID!, key_secret: process.env.RAZORPAY_KEY_SECRET! });

export function verifyCheckoutSignature(orderId: string, paymentId: string, signature: string) {
  const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!).update(`${orderId}|${paymentId}`).digest("hex");
  return safeEq(expected, signature);
}
export function verifyWebhookSignature(rawBody: string, signature: string) {
  const expected = crypto.createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!).update(rawBody).digest("hex");
  return safeEq(expected, signature);
}
function safeEq(a: string, b: string) {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

/** Idempotent: safe to call from both the verify endpoint and the webhook. */
export async function markPaid(razorpayOrderId: string, razorpayPaymentId: string) {
  return db.$transaction(async (tx: any) => {
    const p = await tx.payment.findUnique({ where: { razorpayOrderId }, include: { order: { include: { items: true } } } });
    if (!p || p.status === "PAID") return p;
    for (const it of p.order.items) {
      const r = await tx.product.updateMany({ where: { id: it.productId, stock: { gte: it.quantity } }, data: { stock: { decrement: it.quantity }, popularity: { increment: it.quantity } } });
      if (r.count === 0) throw new Error(`Insufficient stock for ${it.name} – flag order ${p.orderId} for manual refund`);
    }
    await tx.payment.update({ where: { id: p.id }, data: { status: "PAID", razorpayPaymentId } });
    await tx.order.update({ where: { id: p.orderId }, data: { status: "CONFIRMED" } });
    return p;
  });
}
