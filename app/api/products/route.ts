import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { handle } from "@/lib/http";

export const dynamic = "force-dynamic";

const SORTS: Record<string, Prisma.ProductOrderByWithRelationInput> = {
  price_asc: { priceMinor: "asc" }, price_desc: { priceMinor: "desc" },
  popular: { popularity: "desc" }, newest: { createdAt: "desc" }, rating: { rating: "desc" },
};

export const GET = (req: NextRequest) => handle(async () => {
  const q = req.nextUrl.searchParams;
  const page = Math.max(1, Number(q.get("page")) || 1), take = 12;
  const search = q.get("q")?.trim();
  const where: Prisma.ProductWhereInput = { active: true };
  if (search) where.OR = [
    { name: { contains: search, mode: "insensitive" } }, { brand: { contains: search, mode: "insensitive" } },
    { description: { contains: search, mode: "insensitive" } }, { category: { name: { contains: search, mode: "insensitive" } } },
  ];
  if (q.get("category")) where.category = { slug: q.get("category")! };
  if (q.get("brand")) where.brand = q.get("brand")!;
  if (q.get("minRating")) where.rating = { gte: Number(q.get("minRating")) };
  if (q.get("inStock") === "1") where.stock = { gt: 0 };
  if (q.get("isDeal") === "1") (where as any).isDealOfTheDay = true;
  if (q.get("prime") === "1") (where as any).primeEligible = true;
  const min = q.get("minPrice"), max = q.get("maxPrice"); // rupees in the URL
  if (min || max) where.priceMinor = { ...(min && { gte: Number(min) * 100 }), ...(max && { lte: Number(max) * 100 }) };

  const [items, total] = await Promise.all([
    db.product.findMany({ where, orderBy: SORTS[q.get("sort") ?? "popular"] ?? SORTS.popular, skip: (page - 1) * take, take,
      include: { images: { orderBy: { position: "asc" }, take: 1 } } }),
    db.product.count({ where }),
  ]);
  return NextResponse.json({ items, total, page, pages: Math.ceil(total / take) });
});
