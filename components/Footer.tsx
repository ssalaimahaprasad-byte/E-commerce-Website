"use client";

import Link from "next/link";
import RenzocartLogo from "./RenzocartLogo";
import { useTranslation, LANGUAGES, Language } from "@/lib/i18n";

export default function Footer() {
  const { t, lang, changeLanguage } = useTranslation();

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="mt-16 w-full text-white">
      {/* Back to top bar */}
      <button
        onClick={scrollToTop}
        className="block w-full bg-[#1e293b] py-3.5 text-center text-xs font-semibold text-white transition hover:bg-[#334155]"
        aria-label="Scroll back to top"
      >
        ▲ {t("backToTop")}
      </button>

      {/* 4-Column Main Footer Links */}
      <div className="bg-[#172554] px-6 py-12 border-t border-[#1e3a8a]">
        <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-8 text-xs sm:grid-cols-4">
          <div>
            <h4 className="font-bold text-white mb-3 text-sm">{t("getToknowUs")}</h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link href="/about" className="hover:text-white hover:underline">{t("aboutUs")}</Link></li>
              <li><Link href="/help" className="hover:text-white hover:underline">{t("helpCenter")}</Link></li>
              <li><Link href="/faq" className="hover:text-white hover:underline">{t("faq")}</Link></li>
              <li><Link href="/contact" className="hover:text-white hover:underline">{t("contactUs")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3 text-sm">{t("customerPolicies")}</h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link href="/shipping-policy" className="hover:text-white hover:underline">{t("shippingPolicy")}</Link></li>
              <li><Link href="/returns-policy" className="hover:text-white hover:underline">{t("returnPolicy")}</Link></li>
              <li><Link href="/cancellation-policy" className="hover:text-white hover:underline">{t("cancellationPolicy")}</Link></li>
              <li><Link href="/privacy" className="hover:text-white hover:underline">{t("privacyPolicy")}</Link></li>
              <li><Link href="/terms" className="hover:text-white hover:underline">{t("termsConditions")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3 text-sm">{t("accountAndLists")}</h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link href="/orders" className="hover:text-white hover:underline">{t("yourOrders")}</Link></li>
              <li><Link href="/track" className="hover:text-white hover:underline">{t("trackPackage")}</Link></li>
              <li><Link href="/account" className="hover:text-white hover:underline">{t("myAccount")}</Link></li>
              <li><Link href="/cart" className="hover:text-white hover:underline">{t("shoppingCart")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3 text-sm">{t("makeMoneyWithUs")}</h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link href="/admin" className="hover:text-white hover:underline">{t("sellOnRenzocart")}</Link></li>
              <li><Link href="/admin" className="hover:text-white hover:underline">{t("sellerCentral")}</Link></li>
              <li><Link href="/about" className="hover:text-white hover:underline">{t("fulfilmentByRenzocart")}</Link></li>
              <li><Link href="/contact" className="hover:text-white hover:underline">{t("advertiseProducts")}</Link></li>
            </ul>
          </div>
        </div>

        {/* Middle logo and 5-language selector */}
        <div className="mx-auto mt-10 flex max-w-[1100px] flex-wrap items-center justify-between gap-6 border-t border-[#1e3a8a] pt-6 text-xs text-slate-300">
          <RenzocartLogo variant="light" size="md" />

          {/* 5-Language Selector in Footer */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400 text-[11px] font-medium mr-1">🌐 {t("selectLanguage")}:</span>
            {LANGUAGES.map((item) => (
              <button
                key={item.code}
                onClick={() => changeLanguage(item.code)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
                  lang === item.code
                    ? "bg-[#3B82F6] text-white shadow-sm"
                    : "border border-slate-600 text-slate-300 hover:bg-white/10 hover:border-slate-400"
                }`}
              >
                {item.nativeLabel}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-slate-600 px-3 py-1.5">
            <span>🇮🇳 India</span>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="bg-[#0f172a] px-6 py-6 text-center text-xs text-slate-400">
        <div className="flex flex-wrap justify-center gap-6 border-b border-slate-800 pb-4">
          <Link href="/terms" className="hover:text-white hover:underline">{t("termsConditions")}</Link>
          <Link href="/privacy" className="hover:text-white hover:underline">{t("privacyPolicy")}</Link>
          <Link href="/shipping-policy" className="hover:text-white hover:underline">{t("shippingPolicy")}</Link>
          <Link href="/returns-policy" className="hover:text-white hover:underline">{t("returnPolicy")}</Link>
        </div>
        <div className="mt-4 text-[11px] text-slate-500">
          {t("allRightsReserved")}
        </div>
      </div>
    </footer>
  );
}
