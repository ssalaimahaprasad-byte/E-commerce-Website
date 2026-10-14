"use client";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

export default function HelpCenterPage() {
  const { t } = useTranslation();

  const HELP_CATEGORIES = [
    {
      title: t("shippingPolicy"),
      desc: "Track package status, express delivery times, PIN code serviceability, and courier partners.",
      link: "/shipping-policy",
      action: t("shippingPolicy"),
      icon: "🚚",
    },
    {
      title: t("returnPolicy"),
      desc: "Start a return, understand the 7-day policy, refund timelines to UPI & cards, and pickup requirements.",
      link: "/returns-policy",
      action: t("returnPolicy"),
      icon: "🔄",
    },
    {
      title: t("cancellationPolicy"),
      desc: "Cancel orders before dispatch, select reasons, understand instant stock and payment reversal.",
      link: "/cancellation-policy",
      action: t("cancellationPolicy"),
      icon: "🛑",
    },
    {
      title: t("paymentMethod"),
      desc: "Supported payment methods: UPI, Credit/Debit cards, Net Banking, EMI, Cash on Delivery, GST invoices.",
      link: "/faq",
      action: t("faq"),
      icon: "💳",
    },
    {
      title: t("security"),
      desc: "Update login email, manage delivery addresses, change password, and understand data protection.",
      link: "/privacy",
      action: t("privacyPolicy"),
      icon: "🛡️",
    },
    {
      title: t("termsConditions"),
      desc: "Review buyer policies, seller conditions, electronic communication terms, and service limitations.",
      link: "/terms",
      action: t("termsConditions"),
      icon: "📜",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl py-6 space-y-8">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-200 bg-[#172554] p-8 text-white shadow-sm md:p-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-200">
              {t("resolutionHub")}
            </span>
            <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">{t("howCanWeHelpToday")}</h1>
            <p className="mt-2 text-sm text-blue-100 max-w-xl">
              {t("resolutionHubDesc")}
            </p>
          </div>
          <div className="shrink-0 flex gap-3">
            <Link href="/track" className="btn-amazon-primary px-5 py-2.5 text-xs font-bold">
              {t("trackAnOrder")}
            </Link>
            <Link href="/contact" className="btn-amazon-light px-5 py-2.5 text-xs font-semibold">
              {t("contactUs")}
            </Link>
          </div>
        </div>
      </div>

      {/* 6 Help Topics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {HELP_CATEGORIES.map((cat, idx) => (
          <div key={idx} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-3xl mb-3">{cat.icon}</div>
              <h3 className="text-base font-bold text-[#172554]">{cat.title}</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">{cat.desc}</p>
            </div>
            <Link
              href={cat.link}
              className="mt-5 text-xs font-bold text-[#3B82F6] hover:text-[#8B5CF6] hover:underline"
            >
              {cat.action} →
            </Link>
          </div>
        ))}
      </div>

      {/* Direct Contact Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-[#172554] text-sm">{t("customerSupport247")}</h3>
          <p className="text-xs text-slate-600 mt-1">{t("contactSupportDesc")}</p>
        </div>
        <Link href="/contact" className="btn-amazon-primary px-5 py-2 text-xs font-bold shrink-0">
          {t("contactUs")}
        </Link>
      </div>
    </div>
  );
}
