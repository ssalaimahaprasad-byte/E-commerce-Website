"use client";
import Link from "next/link";
import { inr } from "@/lib/money";
import { useTranslation } from "@/lib/i18n";

interface ProductDetailCenterProps {
  product: {
    id: string;
    slug: string;
    name: string;
    brand: string;
    rating: number;
    ratingCount: number;
    priceMinor: number;
    mrpMinor: number;
    isAmazonChoice?: boolean;
    category?: { name: string; slug: string } | null;
    specs?: Record<string, string>;
    description?: string;
  };
}

export default function ProductDetailCenter({ product: p }: ProductDetailCenterProps) {
  const { t } = useTranslation();
  const off = Math.round(100 - (p.priceMinor / p.mrpMinor) * 100);
  const rupees = Math.floor(p.priceMinor / 100);
  const specs = (p.specs || {}) as Record<string, string>;

  return (
    <div className="lg:col-span-4 space-y-4 text-xs text-[#0f1111]">
      {/* Brand Link */}
      <div>
        <Link
          href={`/?brand=${encodeURIComponent(p.brand)}`}
          className="text-xs font-semibold text-[#007185] hover:text-[#c7511f] hover:underline"
        >
          {t("visitStore", { brand: p.brand })}
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-lg md:text-xl font-bold leading-snug text-[#0f1111]">
        {p.name}
      </h1>

      {/* Rating & Reviews */}
      <div className="flex flex-wrap items-center gap-2 border-b pb-3">
        <span className="text-[#de7921] font-bold text-sm">
          {p.rating?.toFixed(1) || "4.5"}
        </span>
        <div className="flex text-[#de7921]">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-sm">
              {i < Math.floor(p.rating || 4.5) ? "★" : "☆"}
            </span>
          ))}
        </div>
        <span className="text-[#007185] hover:text-[#c7511f] hover:underline">
          {(p.ratingCount || 14820).toLocaleString()} {t("ratings")}
        </span>
        <span className="text-gray-400">|</span>
        <span className="text-[#007185] hover:text-[#c7511f] hover:underline">
          {t("answeredQuestions")}
        </span>
      </div>

      {/* Renzocart Choice Tag */}
      {p.isAmazonChoice && (
        <div className="inline-block badge-choice rounded-md px-2.5 py-1">
          {t("brandName")} <span className="text-[#3B82F6] font-bold ml-1">Choice</span>
          <span className="text-gray-300 ml-2 font-normal">for "{p.category?.name || "electronics"}"</span>
        </div>
      )}

      {/* Bought past month */}
      <div className="text-gray-600 font-medium">
        {t("boughtPastMonth")}
      </div>

      {/* Price Section */}
      <div className="border-t border-b py-3 space-y-1">
        <div className="flex items-baseline gap-2">
          {off > 0 && (
            <span className="text-2xl font-light text-[#cc0c39]">
              -{off}%
            </span>
          )}
          <div className="flex items-start">
            <span className="text-xs font-normal align-top pt-1">₹</span>
            <span className="text-3xl font-bold tracking-tight text-[#0f1111]">
              {rupees.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {p.mrpMinor > p.priceMinor && (
          <div className="text-xs text-gray-500">
            {t("mrp")} <s className="line-through">{inr(p.mrpMinor)}</s>
          </div>
        )}

        <div className="text-[11px] text-gray-600">
          {t("inclusiveTaxes")}
        </div>
        <div className="text-xs font-semibold text-gray-800 pt-1">
          {t("emiStartsAt", { amount: Math.round(rupees / 12).toLocaleString("en-IN") })}
        </div>
      </div>

      {/* Bank Offers Carousel / Cards */}
      <div className="space-y-2">
        <h4 className="font-bold text-gray-900">{t("offersAndDiscounts")}</h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded border border-[#d5d9d9] p-2.5 bg-[#fcfcfc]">
            <div className="font-bold text-[#0f1111]">{t("bankOffer")}</div>
            <div className="text-[11px] text-gray-600 mt-1 line-clamp-2">
              {t("bankOfferDesc")}
            </div>
            <span className="mt-1 block text-[11px] font-semibold text-[#007185]">
              7 {t("viewOffers")} ›
            </span>
          </div>
          <div className="rounded border border-[#d5d9d9] p-2.5 bg-[#fcfcfc]">
            <div className="font-bold text-[#0f1111]">{t("partnerOffers")}</div>
            <div className="text-[11px] text-gray-600 mt-1 line-clamp-2">
              {t("partnerOffersDesc")}
            </div>
            <span className="mt-1 block text-[11px] font-semibold text-[#007185]">
              1 {t("viewOffers")} ›
            </span>
          </div>
        </div>
      </div>

      {/* Service Guarantee Badges */}
      <div className="grid grid-cols-4 gap-2 border-t border-b py-3 text-center text-[10px] text-gray-600">
        <div>
          <div className="text-lg">🔄</div>
          <div>{t("replacement")}</div>
        </div>
        <div>
          <div className="text-lg">🚚</div>
          <div>{t("freeDelivery")}</div>
        </div>
        <div>
          <div className="text-lg">🛡️</div>
          <div>{t("warranty")}</div>
        </div>
        <div>
          <div className="text-lg">💳</div>
          <div>{t("payOnDelivery")}</div>
        </div>
      </div>

      {/* Specifications Table */}
      {Object.keys(specs).length > 0 && (
        <div className="space-y-2 pt-2">
          <h4 className="font-bold text-gray-900">{t("technicalDetails")}</h4>
          <table className="w-full text-xs">
            <tbody>
              {Object.entries(specs).map(([k, v]) => (
                <tr key={k} className="border-b border-gray-100">
                  <td className="py-1.5 font-bold text-gray-700 w-1/3">{k}</td>
                  <td className="py-1.5 text-gray-900">{String(v)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* About This Item */}
      {p.description && (
        <div className="space-y-2 pt-2">
          <h4 className="font-bold text-gray-900">{t("aboutItem")}</h4>
          <p className="text-xs text-gray-700 leading-relaxed">
            {p.description}
          </p>
        </div>
      )}
    </div>
  );
}
