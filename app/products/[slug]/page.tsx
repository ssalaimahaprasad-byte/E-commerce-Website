import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { inr } from "@/lib/money";
import ProductCard from "@/components/ProductCard";
import AddButtons from "@/components/AddButtons";
import ProductReviews from "@/components/ProductReviews";
import ProductBuyBoxDelivery from "@/components/ProductBuyBoxDelivery";
import ProductDetailCenter from "@/components/ProductDetailCenter";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductBreadcrumb from "@/components/ProductBreadcrumb";
import ProductBuyBox from "@/components/ProductBuyBox";
import RelatedProductsHeader from "@/components/RelatedProductsHeader";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const p = await db.product.findFirst({
    where: { slug: params.slug, active: true },
    include: { images: { orderBy: { position: "asc" } }, category: true, variants: true },
  });

  if (!p) notFound();

  const related = await db.product.findMany({
    where: { categoryId: p.categoryId, id: { not: p.id }, active: true },
    take: 4,
    include: { images: { take: 1 } },
  });

  const specs = (p.specs || {}) as Record<string, string>;
  const off = Math.round(100 - (p.priceMinor / p.mrpMinor) * 100);
  const rupees = Math.floor(p.priceMinor / 100);
  const mainImg = p.images?.[0]?.url || "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800";

  return (
    <div className="space-y-8 bg-white p-4 md:p-6 rounded-md border border-[#d5d9d9] shadow-sm">
      {/* Amazon Breadcrumb */}
      <ProductBreadcrumb
        categoryName={p.category?.name}
        categorySlug={p.category?.slug}
        productName={p.name}
      />

      {/* 3-Column Amazon Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left: Product Images with Interactive Gallery & Fallbacks (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-24">
            <ProductImageGallery
              images={p.images || []}
              productName={p.name}
              isBestSeller={p.isBestSeller}
            />
          </div>
        </div>

        {/* Center: Title, Ratings, Pricing, Offers & Specs (4 cols on lg) */}
        <ProductDetailCenter product={p as any} />

        {/* Right: Amazon Buy Box (3 cols on lg) */}
        <div className="lg:col-span-3">
          <ProductBuyBox product={p} mainImg={mainImg} />
        </div>
      </div>

      {/* Dynamic Customer Reviews Section */}
      <ProductReviews
        productSlug={p.slug}
        productName={p.name}
        initialRating={p.rating || 4.5}
        initialRatingCount={p.ratingCount || 14820}
      />

      {/* Related Products Shelf */}
      {related.length > 0 && (
        <section className="border-t pt-8">
          <RelatedProductsHeader />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((r: any) => (
              <ProductCard key={r.id} p={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
