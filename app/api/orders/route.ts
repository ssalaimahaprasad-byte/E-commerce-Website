import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { handle } from "@/lib/http";

export const GET = () => handle(async () => {
  const u = await requireUser();
  const orders = await db.order.findMany({ where: { userId: u.id }, orderBy: { createdAt: "desc" }, include: { items: true, payment: { select: { status: true } } } });
  return NextResponse.json({ orders });
});

// Customer cancellation: only before shipping; refunds must be issued via Razorpay dashboard/API.
export const DELETE = (req: Request) => handle(async () => {
  const u = await requireUser();
  const number = new URL(req.url).searchParams.get("number");
  const r = await db.order.updateMany({ where: { number: number ?? "", userId: u.id, status: { in: ["PENDING", "CONFIRMED", "PROCESSING"] } }, data: { status: "CANCELLED" } });
  return NextResponse.json({ cancelled: r.count === 1 }, { status: r.count ? 200 : 400 });
});
