import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { handle } from "@/lib/http";

export const GET = () => handle(async () => {
  await requireAdmin();
  const [orders, revenue] = await Promise.all([
    db.order.findMany({ orderBy: { createdAt: "desc" }, take: 50, include: { user: { select: { email: true } }, payment: true, items: true } }),
    db.payment.aggregate({ where: { status: "PAID" }, _sum: { amountMinor: true }, _count: true }),
  ]);
  return NextResponse.json({ orders, revenueMinor: revenue._sum.amountMinor ?? 0, paidCount: revenue._count });
});

export const PATCH = (req: NextRequest) => handle(async () => {
  await requireAdmin();
  const d = z.object({ number: z.string(), status: z.enum(["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]) }).parse(await req.json());
  return NextResponse.json(await db.order.update({ where: { number: d.number }, data: { status: d.status } }));
});
