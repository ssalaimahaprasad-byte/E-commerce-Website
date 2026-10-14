import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { handle } from "@/lib/http";

export const dynamic = "force-dynamic";

const UpdateDealSchema = z.object({
  dealPriceMinor: z.number().positive().optional(),
  discountPercent: z.number().min(1).max(99).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  dealStock: z.number().int().min(0).optional(),
  enabled: z.boolean().optional(),
});

export const PUT = (req: NextRequest, { params }: { params: { id: string } }) =>
  handle(async () => {
    await requireAdmin();
    const body = await req.json();
    const data = UpdateDealSchema.parse(body);

    const updated = await db.deal.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json({ deal: updated });
  });

export const DELETE = (req: NextRequest, { params }: { params: { id: string } }) =>
  handle(async () => {
    await requireAdmin();
    const deleted = await db.deal.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ deleted: true, deal: deleted });
  });
