import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { handle } from "@/lib/http";

export const dynamic = "force-dynamic";

export const GET = () =>
  handle(async () => {
    await requireAdmin();
    const deals = await db.deal.findMany({});
    return NextResponse.json({ deals: deals || [] });
  });

const DealSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  productName: z.string().min(1),
  productSlug: z.string().min(1),
  productImage: z.string().optional().default(""),
  regularPriceMinor: z.number().positive("Regular price must be greater than 0"),
  dealPriceMinor: z.number().positive("Deal price must be greater than 0"),
  discountPercent: z.number().min(1).max(99, "Discount must be between 1% and 99%"),
  startDate: z.string(),
  endDate: z.string(),
  dealStock: z.number().int().min(1, "Deal stock must be at least 1"),
  enabled: z.boolean().default(true),
});

export const POST = (req: NextRequest) =>
  handle(async () => {
    await requireAdmin();
    const body = await req.json();
    const data = DealSchema.parse(body);

    if (data.dealPriceMinor >= data.regularPriceMinor) {
      return NextResponse.json(
        { error: "Deal price must be lower than regular price" },
        { status: 400 }
      );
    }

    if (new Date(data.endDate) <= new Date(data.startDate)) {
      return NextResponse.json(
        { error: "End date must be after start date" },
        { status: 400 }
      );
    }

    const created = await db.deal.create({
      data: {
        ...data,
        soldCount: 0,
      },
    });

    return NextResponse.json({ deal: created }, { status: 201 });
  });
