"use client";

import { useTranslation } from "@/lib/i18n";

export default function RelatedProductsHeader() {
  const { t } = useTranslation();
  return (
    <h2 className="text-xl font-bold text-gray-900 mb-4">
      {t("customersAlsoViewed")}
    </h2>
  );
}
