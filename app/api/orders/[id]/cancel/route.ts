import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

const CancelSchema = z.object({
  reason: z.string().min(3, "Please provide a reason for cancellation"),
  comments: z.string().optional(),
});

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUser();
    const orderId = params.id;

    const order = await db.order.findFirst({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Security: ensure user owns the order or is an ADMIN
    if (user && user.role !== "ADMIN" && order.userId && order.userId !== user.id) {
      return NextResponse.json({ error: "Unauthorized access to order" }, { status: 403 });
    }

    // Eligibility check: CANNOT cancel if already SHIPPED, DELIVERED, or already CANCELLED
    if (order.status === "DELIVERED") {
      return NextResponse.json(
        { error: "Orders that have already been delivered cannot be cancelled. You may request a return instead." },
        { status: 400 }
      );
    }

    if (order.status === "SHIPPED") {
      return NextResponse.json(
        { error: "Order has already been shipped. It can no longer be cancelled. Please refuse delivery or request a return upon delivery." },
        { status: 400 }
      );
    }

    if (order.status === "CANCELLED") {
      return NextResponse.json({ error: "This order is already cancelled." }, { status: 400 });
    }

    const body = await req.json().catch(() => ({}));
    const parsed = CancelSchema.safeParse(body);
    const cancellationReason = parsed.success ? parsed.data.reason : "Customer requested cancellation";

    // Update status in DB
    const updated = await db.order.update({
      where: { id: order.id },
      data: {
        status: "CANCELLED",
        cancellationReason,
        cancelledAt: new Date().toISOString(),
      },
    });

    // Restore stock inventory
    if (order.items && Array.isArray(order.items)) {
      for (const item of order.items) {
        if (item.productId) {
          const prod = await db.product.findUnique({ where: { id: item.productId } });
          if (prod) {
            await db.product.update({
              where: { id: item.productId },
              data: { stock: prod.stock + (item.quantity || 1) },
            });
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Order successfully cancelled and inventory restored.",
      order: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to cancel order" }, { status: 500 });
  }
}
