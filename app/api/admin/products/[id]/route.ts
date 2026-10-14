import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { handle } from "@/lib/http";
import { productSchema } from "@/lib/schemas";

export const PATCH = (req: NextRequest, { params }: { params: { id: string } }) => handle(async () => {
  await requireAdmin();
  const { imageUrls, ...d } = productSchema.partial().parse(await req.json());
  const p = await db.product.update({ where: { id: params.id }, data: { ...d,
    ...(imageUrls && { images: { deleteMany: {}, create: imageUrls.map((url, position) => ({ url, position })) } }) } });
  return NextResponse.json(p);
});

// Soft-delete so historical order items keep their product reference.
export const DELETE = (_: NextRequest, { params }: { params: { id: string } }) => handle(async () => {
  await requireAdmin();
  await db.product.update({ where: { id: params.id }, data: { active: false } });
  return NextResponse.json({ ok: true });
});
