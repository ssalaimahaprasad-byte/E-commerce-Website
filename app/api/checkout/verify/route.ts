import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser, HttpError } from "@/lib/auth";
import { handle } from "@/lib/http";
import { markPaid, verifyCheckoutSignature } from "@/lib/payments";

const schema = z.object({ razorpay_order_id: z.string(), razorpay_payment_id: z.string(), razorpay_signature: z.string() });

export const POST = (req: NextRequest) => handle(async () => {
  const user = await requireUser();
  const d = schema.parse(await req.json());
  const p = await db.payment.findUnique({ where: { razorpayOrderId: d.razorpay_order_id }, include: { order: true } });
  if (!p || p.order.userId !== user.id) throw new HttpError(404, "Order not found");
  if (!verifyCheckoutSignature(d.razorpay_order_id, d.razorpay_payment_id, d.razorpay_signature)) {
    await db.payment.updateMany({ where: { id: p.id, status: "CREATED" }, data: { status: "FAILED" } });
    throw new HttpError(400, "Payment verification failed");
  }
  await markPaid(d.razorpay_order_id, d.razorpay_payment_id);
  return NextResponse.json({ ok: true, orderNumber: p.order.number });
});
