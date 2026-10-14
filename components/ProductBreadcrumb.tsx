"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

interface ProductBreadcrumbProps {
  categoryName?: string;
  categorySlug?: string;
  productName: string;
}

export default function ProductBreadcrumb({
  categoryName,
  categorySlug,
  productName,
}: ProductBreadcrumbProps) {
  const { t } = useTranslation();

  return (
    <nav className="flex items-center gap-1.5 text-xs text-gray-500">
      <Link href="/" className="hover:text-[#3B82F6]">
        {t("breadcrumbHome")}
      </Link>
      <span>›</span>
      <Link href={`/?category=${categorySlug || ""}`} className="hover:text-[#3B82F6]">
        {categoryName || t("department")}
      </Link>
      <span>›</span>
      <span className="truncate text-gray-800 max-w-xs">{productName}</span>
    </nav>
  );
}
