import { NextRequest, NextResponse } from "next/server";
import { productSchema } from "@/lib/schemas";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { handle } from "@/lib/http";

export const GET = () => handle(async () => {
  await requireAdmin();
  return NextResponse.json({ products: await db.product.findMany({ orderBy: { createdAt: "desc" }, include: { category: true, images: { orderBy: { position: "asc" } } } }) });
});

export const POST = (req: NextRequest) => handle(async () => {
  await requireAdmin();
  const { imageUrls, ...d } = productSchema.parse(await req.json());
  const p = await db.product.create({ data: { ...d, images: { create: imageUrls.map((url, position) => ({ url, position })) } } });
  return NextResponse.json(p, { status: 201 });
});
