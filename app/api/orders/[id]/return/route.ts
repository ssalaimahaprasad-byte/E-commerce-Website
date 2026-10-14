import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

const ReturnSchema = z.object({
  reason: z.string().min(3, "Please select a valid return reason"),
  comments: z.string().optional(),
  productId: z.string().optional(),
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

    if (user && user.role !== "ADMIN" && order.userId && order.userId !== user.id) {
      return NextResponse.json({ error: "Unauthorized access to order" }, { status: 403 });
    }

    // Must be DELIVERED to request a return
    if (order.status !== "DELIVERED") {
      return NextResponse.json(
        { error: "Return can only be requested for orders that have been successfully delivered." },
        { status: 400 }
      );
    }

    // Check existing return request for this order
    const existing = await db.returnRequest.findFirst({
      where: { orderId: order.id },
    });

    if (existing && existing.status !== "REJECTED") {
      return NextResponse.json(
        { error: "A return request is already active for this order. Status: " + existing.status },
        { status: 400 }
      );
    }

    const body = await req.json();
    const data = ReturnSchema.parse(body);

    const firstItem = order.items?.[0];
    const returnRequest = await db.returnRequest.create({
      data: {
        orderId: order.id,
        orderNumber: order.number,
        userId: user?.id || order.userId || "guest",
        customerEmail: user?.email || "customer@renzocart.test",
        productId: data.productId || firstItem?.productId || "prod-item",
        productName: firstItem?.name || "Order Item",
        reason: data.reason,
        comments: data.comments || "",
        status: "REQUESTED",
        refundStatus: "PENDING",
        refundAmountMinor: order.totalMinor,
        refundTxRef: "REF-PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Return request submitted successfully. Our team will review and approve within 24 hours.",
      returnRequest,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to submit return request" }, { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const orderId = params.id;
    const returnRequest = await db.returnRequest.findFirst({
      where: { orderId },
    });
    return NextResponse.json({ returnRequest: returnRequest || null });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
