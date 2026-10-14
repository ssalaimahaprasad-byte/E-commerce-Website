"use client";

import ProductBuyBoxDelivery from "@/components/ProductBuyBoxDelivery";
import AddButtons from "@/components/AddButtons";
import { useTranslation } from "@/lib/i18n";

interface ProductBuyBoxProps {
  product: {
    id: string;
    slug: string;
    name: string;
    priceMinor: number;
    stock: number;
  };
  mainImg: string;
}

export default function ProductBuyBox({ product: p, mainImg }: ProductBuyBoxProps) {
  const { t } = useTranslation();
  const rupees = Math.floor(p.priceMinor / 100);

  return (
    <div className="sticky top-24 rounded-lg border border-[#d5d9d9] bg-white p-4 text-xs space-y-3 shadow-sm">
      {/* Price in Buy Box */}
      <div className="flex items-baseline gap-1">
        <span className="text-xs font-normal">₹</span>
        <span className="text-2xl font-bold text-[#0f1111]">
          {rupees.toLocaleString("en-IN")}
        </span>
      </div>

      {/* Product Buy Box Delivery */}
      <ProductBuyBoxDelivery />

      {/* Stock status */}
      <div className={`text-sm font-bold ${p.stock > 0 ? "text-green-700" : "text-red-600"}`}>
        {p.stock > 0 ? t("inStock") : t("outOfStock")}
      </div>

      {/* Add Buttons */}
      <AddButtons
        p={{
          id: p.id,
          slug: p.slug,
          name: p.name,
          priceMinor: p.priceMinor,
          image: mainImg,
          stock: p.stock,
        }}
      />

      {/* Secure transaction */}
      <div className="flex items-center gap-2 pt-2 text-[11px] text-gray-600">
        <svg className="h-4 w-4 fill-gray-500" viewBox="0 0 24 24">
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
        </svg>
        <span>{t("secureTransaction")}</span>
      </div>

      {/* Ships from & Sold by */}
      <div className="space-y-1 border-t pt-3 text-[11px] text-gray-600">
        <div className="flex justify-between">
          <span>{t("shipsFrom")}</span>
          <span className="font-semibold text-gray-900">{t("brandName")} Direct</span>
        </div>
        <div className="flex justify-between">
          <span>{t("soldBy")}</span>
          <span className="font-semibold text-[#3B82F6] hover:underline cursor-pointer">
            Appario Retail Private Ltd
          </span>
        </div>
      </div>

      {/* Wishlist button */}
      <button className="btn-amazon-light w-full py-1.5 text-xs text-center">
        {t("addToWishList")}
      </button>
    </div>
  );
}
