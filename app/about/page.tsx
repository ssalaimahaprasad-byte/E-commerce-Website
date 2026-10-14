"use client";

import Link from "next/link";
import RenzocartLogo from "@/components/RenzocartLogo";
import { useTranslation } from "@/lib/i18n";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
        <div className="mb-6 flex items-center justify-between border-b pb-6">
          <RenzocartLogo variant="dark" size="lg" />
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#3B82F6]">
            {t("est2026")}
          </span>
        </div>

        <h1 className="text-3xl font-extrabold text-[#172554] md:text-4xl">
          {t("aboutHeroTitle")}
        </h1>

        <p className="mt-4 text-base leading-relaxed text-slate-700">
          {t("aboutHeroDesc")}
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-100 bg-[#F5F8FF] p-5">
            <div className="text-2xl font-bold text-[#3B82F6]">{t("genuineBadge")}</div>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              {t("genuineDesc")}
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-[#F5F8FF] p-5">
            <div className="text-2xl font-bold text-[#8B5CF6]">{t("nextDayDelivery")}</div>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              {t("nextDayDeliveryDesc")}
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-[#F5F8FF] p-5">
            <div className="text-2xl font-bold text-[#172554]">{t("hassleFreeReturns")}</div>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              {t("hassleFreeReturnsDesc")}
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-4 text-sm leading-relaxed text-slate-700">
          <h2 className="text-xl font-bold text-[#172554]">{t("ourCommitment")}</h2>
          <p>
            {t("commitmentDesc")}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 border-t pt-6">
          <Link href="/" className="btn-amazon-primary px-6 py-2.5 text-xs font-bold">
            {t("exploreCatalog")}
          </Link>
          <Link href="/contact" className="btn-amazon-light px-6 py-2.5 text-xs font-semibold">
            {t("contactUs")}
          </Link>
        </div>
      </div>
    </div>
  );
}
