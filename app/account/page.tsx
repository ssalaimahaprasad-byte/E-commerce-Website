"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import RenzocartLogo from "@/components/RenzocartLogo";
import { useLocation } from "@/lib/location";
import { useTranslation, LANGUAGES } from "@/lib/i18n";

export default function AccountPage() {
  const [user, setUser] = useState<{ id: string; name: string; email: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const { location } = useLocation();
  const { t, lang, changeLanguage } = useTranslation();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d?.user) setUser(d.user);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSignOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    window.location.href = "/";
  };

  return (
    <div className="mx-auto max-w-4xl py-6 space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-12 space-y-6">
        <div className="flex items-center justify-between border-b pb-6">
          <RenzocartLogo variant="dark" size="lg" />
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#3B82F6]">
            {t("customerAccount")}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#172554]">
              {user ? `${t("welcomeBack")}, ${user.name}` : t("yourAccount")}
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              {user?.email || t("accountSubtitle")}
            </p>
          </div>
          {user ? (
            <button
              onClick={handleSignOut}
              className="btn-amazon-light self-start px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50"
            >
              {t("signOut")}
            </button>
          ) : (
            <Link href="/login" className="btn-amazon-primary self-start px-5 py-2 text-xs font-bold">
              {t("signIn")}
            </Link>
          )}
        </div>

        {/* 6 Account Action Cards */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 pt-4">
          <Link
            href="/orders"
            className="group rounded-xl border border-slate-200 p-5 transition hover:border-[#3B82F6] hover:shadow-md"
          >
            <div className="text-2xl mb-2">📦</div>
            <h3 className="font-bold text-[#172554] text-sm group-hover:text-[#3B82F6]">{t("yourOrders")}</h3>
            <p className="text-xs text-slate-500 mt-1">{t("ordersCardDesc")}</p>
          </Link>

          <Link
            href="/track"
            className="group rounded-xl border border-slate-200 p-5 transition hover:border-[#3B82F6] hover:shadow-md"
          >
            <div className="text-2xl mb-2">🚚</div>
            <h3 className="font-bold text-[#172554] text-sm group-hover:text-[#3B82F6]">{t("trackPackage")}</h3>
            <p className="text-xs text-slate-500 mt-1">{t("trackPackageDesc")}</p>
          </Link>

          <Link
            href="/help"
            className="group rounded-xl border border-slate-200 p-5 transition hover:border-[#3B82F6] hover:shadow-md"
          >
            <div className="text-2xl mb-2">🛡️</div>
            <h3 className="font-bold text-[#172554] text-sm group-hover:text-[#3B82F6]">{t("helpCenter")}</h3>
            <p className="text-xs text-slate-500 mt-1">{t("resolutionHubDesc")}</p>
          </Link>

          <Link
            href="/contact"
            className="group rounded-xl border border-slate-200 p-5 transition hover:border-[#3B82F6] hover:shadow-md"
          >
            <div className="text-2xl mb-2">💬</div>
            <h3 className="font-bold text-[#172554] text-sm group-hover:text-[#3B82F6]">{t("contactUs")}</h3>
            <p className="text-xs text-slate-500 mt-1">{t("contactCardDesc")}</p>
          </Link>

          <div className="rounded-xl border border-slate-200 p-5 bg-[#F5F8FF]">
            <div className="text-2xl mb-2">📍</div>
            <h3 className="font-bold text-[#172554] text-sm">{t("deliveryLocation")}</h3>
            <p className="text-xs text-slate-600 mt-1">
              {location.city}, {location.state} ({location.pincode})
            </p>
            <span className="block text-[11px] text-green-700 font-semibold mt-1">
              ✓ {t("serviceable")}: {location.deliveryEstimate || t("deliveryEstimateDefault")}
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 p-5 bg-[#F5F8FF]">
            <div className="text-2xl mb-2">🌐</div>
            <h3 className="font-bold text-[#172554] text-sm">{t("preferences")}</h3>
            <p className="text-xs text-slate-600 mt-1">
              {LANGUAGES.find((l) => l.code === lang)?.nativeLabel} ({LANGUAGES.find((l) => l.code === lang)?.label})
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => changeLanguage(l.code)}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
                    lang === l.code ? "bg-[#172554] text-white shadow-sm" : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {l.nativeLabel}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Admin Console Shortcut */}
        {user?.role === "ADMIN" && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">{t("adminPrivilegesActive")}</span>
              <p className="text-xs text-amber-800 mt-0.5">{t("adminPrivilegesDesc")}</p>
            </div>
            <Link href="/admin" className="btn-amazon-primary px-4 py-2 text-xs font-bold">
              {t("openAdminConsole")} &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
