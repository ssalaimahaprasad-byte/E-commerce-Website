"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { addToCart } from "@/lib/cart";
import { inr } from "@/lib/money";
import { useTranslation } from "@/lib/i18n";
import ProductImage from "./ProductImage";

export default function ProductCard({ p }: { p: any }) {
  const router = useRouter();
  const { t } = useTranslation();
  const [added, setAdded] = useState(false);
  const img = p.images?.[0]?.url ?? "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800";
  const off = Math.round(100 - (p.priceMinor / p.mrpMinor) * 100);
  const line = { productId: p.id, slug: p.slug, name: p.name, priceMinor: p.priceMinor, image: img };

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(line);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleBuyNow(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(line);
    router.push("/checkout");
  }

  const rupees = Math.floor(p.priceMinor / 100);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-2.5 sm:p-3.5 transition-all duration-200 hover:border-[#8B5CF6] hover:shadow-lg">
      {/* Badges */}
      <div className="absolute left-2 top-2 z-10 flex flex-col gap-1 items-start">
        {p.isBestSeller && (
          <span className="rounded-md bg-[#8B5CF6] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
            {t("bestSeller")}
          </span>
        )}
        {!p.isBestSeller && p.isAmazonChoice && (
          <span className="rounded-md bg-[#172554] px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
            Renzo<span className="text-[#3B82F6]">Choice</span>
          </span>
        )}
        {!p.isBestSeller && !p.isAmazonChoice && (p.isDealOfTheDay || off >= 20) && (
          <span className="rounded-md bg-[#DC2626] px-2 py-0.5 text-[10px] font-black text-white shadow-sm">
            {t("dealOfTheDay")}
          </span>
        )}
      </div>

      {/* Product Image with Fallback and Error Handling */}
      <Link href={`/products/${p.slug}`} className="relative block overflow-hidden pt-2">
        <div className="aspect-square w-full overflow-hidden bg-white flex items-center justify-center p-2 rounded-lg">
          <ProductImage
            src={img}
            alt={p.name}
            className="h-full w-full object-contain p-1 transition duration-300 group-hover:scale-105"
            containerClassName="w-full h-full"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Details */}
      <div className="flex flex-1 flex-col pt-2">
        {/* Brand */}
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          {p.brand}
        </span>

        {/* Product Title */}
        <Link
          href={`/products/${p.slug}`}
          className="line-clamp-2 text-xs md:text-sm font-semibold text-slate-900 group-hover:text-[#3B82F6] leading-snug mt-0.5"
          title={p.name}
        >
          {p.name}
        </Link>

        {/* Rating Stars */}
        <div className="mt-1 flex items-center gap-1.5 text-xs">
          <div className="flex text-amber-500 text-xs">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>
                {i < Math.floor(p.rating || 4.5) ? "★" : "☆"}
              </span>
            ))}
          </div>
          <span className="text-[11px] font-semibold text-slate-500">
            {p.rating?.toFixed(1) || "4.5"} ({p.ratingCount?.toLocaleString() || "1,200"})
          </span>
        </div>

        {/* Discount Tag */}
        {off >= 10 && (
          <div className="mt-1 flex items-center gap-1.5">
            <span className="rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold text-rose-700">
              {off}% OFF
            </span>
            <span className="text-[10px] font-semibold text-rose-700">{t("limitedTimeDeal")}</span>
          </div>
        )}

        {/* Price */}
        <div className="mt-1.5 flex items-baseline gap-1.5">
          <span className="text-xs font-semibold text-slate-800">₹</span>
          <span className="text-xl font-extrabold tracking-tight text-[#172554]">
            {rupees.toLocaleString("en-IN")}
          </span>
          {p.mrpMinor > p.priceMinor && (
            <span className="text-xs text-slate-400 line-through">
              {inr(p.mrpMinor)}
            </span>
          )}
        </div>

        {/* Delivery speed */}
        <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-600">
          <span className="font-bold text-[#3B82F6]">⚡ Express</span>
          <span>{t("deliveryBy")} <b>{t("tomorrow")}</b></span>
        </div>

        {/* Stock status */}
        <div className={`mt-0.5 text-[11px] font-medium ${p.stock > 0 ? "text-emerald-700" : "text-rose-600"}`}>
          {p.stock > 0 ? t("inStock") : t("outOfStock")}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto pt-3 flex flex-col gap-1.5">
          <button
            onClick={handleAddToCart}
            disabled={p.stock < 1}
            className="btn-amazon-primary w-full py-1.5 text-xs font-bold"
          >
            {added ? t("addedCheck") : t("addToCart")}
          </button>
          <button
            onClick={handleBuyNow}
            disabled={p.stock < 1}
            className="btn-amazon-secondary w-full py-1.5 text-xs font-bold"
          >
            {t("buyNow")}
          </button>
        </div>
      </div>
    </div>
  );
}
