import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const ORDER_STEPS = [
  "Order Placed",
  "Confirmed",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const orderId = params.id;
    const order = await db.order.findFirst({
      where: { id: orderId },
    });

    if (!order) {
      // Also attempt by order number (e.g. RC-402-98214-721)
      const orderByNumber = await db.order.findFirst({
        where: { number: orderId },
      });
      if (!orderByNumber) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }
      return NextResponse.json(formatTrackingData(orderByNumber));
    }

    return NextResponse.json(formatTrackingData(order));
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to retrieve tracking" }, { status: 500 });
  }
}

function formatTrackingData(order: any) {
  const status = order.status || "CONFIRMED";
  let stepIndex = 1;

  if (status === "PENDING") stepIndex = 0;
  else if (status === "CONFIRMED") stepIndex = 1;
  else if (status === "PROCESSING") stepIndex = 2;
  else if (status === "SHIPPED") stepIndex = 3;
  else if (status === "OUT_FOR_DELIVERY") stepIndex = 4;
  else if (status === "DELIVERED") stepIndex = 5;
  else if (status === "CANCELLED") stepIndex = -1;

  const orderDate = new Date(order.createdAt || Date.now());
  const estDelivery = new Date(orderDate.getTime() + 86400000 * 2).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  const steps = ORDER_STEPS.map((name, idx) => {
    let completed = false;
    let time = "";

    if (stepIndex === -1) {
      completed = idx === 0;
      time = idx === 0 ? orderDate.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : "";
    } else {
      completed = idx <= stepIndex;
      if (idx === 0) time = orderDate.toLocaleDateString("en-IN", { day: "numeric", month: "short" }) + " " + orderDate.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
      else if (idx === 1) time = new Date(orderDate.getTime() + 1800000).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
      else if (idx === 2) time = completed ? "Completed" : "Expected in next 6h";
      else if (idx === 3) time = completed ? "Dispatched from Hub" : "Expected tomorrow";
      else if (idx === 4) time = completed ? "Out with courier partner" : "Pending";
      else if (idx === 5) time = completed ? "Delivered & Signed" : `Expected by ${estDelivery}`;
    }

    return {
      step: idx + 1,
      name,
      completed,
      current: idx === stepIndex,
      time,
    };
  });

  return {
    orderId: order.id,
    orderNumber: order.number,
    status: order.status,
    carrier: order.tracking?.carrier || "Renzocart Express Logistics",
    awbNumber: order.tracking?.awbNumber || `RC-IN-${order.number?.replace(/[^0-9]/g, "").slice(-6) || "782914"}`,
    estimatedDelivery: order.tracking?.estimatedDelivery || `${estDelivery} by 8:00 PM`,
    isCancelled: status === "CANCELLED",
    cancellationReason: order.cancellationReason || null,
    items: order.items || [],
    shippingAddress: order.shippingAddress || null,
    steps,
  };
}
