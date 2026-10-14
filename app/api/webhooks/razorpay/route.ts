import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { markPaid, verifyWebhookSignature } from "@/lib/payments";

export async function POST(req: NextRequest) {
  const raw = await req.text(); // raw body is required for signature validation
  const sig = req.headers.get("x-razorpay-signature") ?? "";
  if (!verifyWebhookSignature(raw, sig)) return NextResponse.json({ error: "Bad signature" }, { status: 400 });

  const event = JSON.parse(raw);
  const pay = event.payload?.payment?.entity;
  try {
    if (event.event === "payment.captured" || event.event === "order.paid") {
      const ent = pay ?? event.payload?.order?.entity;
      await markPaid(pay?.order_id ?? ent.id, pay?.id ?? "unknown");
    } else if (event.event === "payment.failed" && pay) {
      await db.payment.updateMany({ where: { razorpayOrderId: pay.order_id, status: "CREATED" }, data: { status: "FAILED" } });
    }
  } catch (e) { console.error("webhook error", e); return NextResponse.json({ error: "retry" }, { status: 500 }); }
  return NextResponse.json({ ok: true });
}
