"use client";

import { useLocation } from "@/lib/location";
import { useTranslation } from "@/lib/i18n";

export default function ProductBuyBoxDelivery() {
  const { location } = useLocation();
  const { t } = useTranslation();

  return (
    <div className="space-y-1">
      <div className="font-black italic text-[#3B82F6] tracking-tight text-xs flex items-center gap-1">
        <span>✓</span> renzocart <span className="text-[#8B5CF6]">express</span>
      </div>
      <div className="text-slate-700">
        {t("freeDelivery")} <b className="text-slate-900">{location.deliveryEstimate || t("tomorrow")}</b>.
      </div>
      <div className="text-slate-500 text-[11px] flex items-center gap-1">
        <span>📍</span>
        <span>{t("deliverTo")} {location.city} {location.pincode}</span>
      </div>
    </div>
  );
}
