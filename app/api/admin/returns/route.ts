import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { handle } from "@/lib/http";

export const dynamic = "force-dynamic";

export const GET = () =>
  handle(async () => {
    await requireAdmin();
    const returns = await db.returnRequest.findMany({});
    return NextResponse.json({ returns: returns || [] });
  });

const UpdateReturnSchema = z.object({
  id: z.string(),
  status: z.enum(["REQUESTED", "APPROVED", "REJECTED", "IN_TRANSIT", "COMPLETED"]),
  adminNotes: z.string().optional(),
});

export const PATCH = (req: NextRequest) =>
  handle(async () => {
    await requireAdmin();
    const body = await req.json();
    const data = UpdateReturnSchema.parse(body);

    const existing = await db.returnRequest.findFirst({
      where: { id: data.id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Return request not found" }, { status: 404 });
    }

    const updates: any = {
      status: data.status,
      adminNotes: data.adminNotes || existing.adminNotes,
    };

    if (data.status === "APPROVED") {
      updates.refundStatus = "PROCESSING";
      updates.refundTxRef = "REF-" + Math.floor(100000 + Math.random() * 900000);
    } else if (data.status === "COMPLETED") {
      updates.refundStatus = "REFUNDED";
      updates.refundTxRef = updates.refundTxRef || ("REF-" + Math.floor(100000 + Math.random() * 900000));
      // Also update the order status
      if (existing.orderId) {
        await db.order.update({
          where: { id: existing.orderId },
          data: { status: "REFUNDED" },
        }).catch(() => {});
      }
    } else if (data.status === "REJECTED") {
      updates.refundStatus = "REJECTED";
    }

    const updated = await db.returnRequest.update({
      where: { id: data.id },
      data: updates,
    });

    return NextResponse.json({ returnRequest: updated });
  });
