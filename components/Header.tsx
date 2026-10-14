"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useCart } from "@/lib/cart";
import RenzocartLogo from "./RenzocartLogo";
import { useTranslation, Language, LANGUAGES } from "@/lib/i18n";
import { useLocation, STATES_AND_CITIES } from "@/lib/location";

const NAV_DEPARTMENTS = [
  { key: "electronics", slug: "electronics" },
  { key: "mobiles", slug: "mobiles" },
  { key: "computers", slug: "computers" },
  { key: "fashion", slug: "fashion" },
  { key: "homeAndKitchen", slug: "home-and-kitchen" },
  { key: "beauty", slug: "beauty" },
  { key: "grocery", slug: "grocery" },
  { key: "sports", slug: "sports" },
  { key: "toys", slug: "toys" },
  { key: "accessories", slug: "accessories" },
];

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cart = useCart();
  const { t, lang, changeLanguage } = useTranslation();
  const { location, updateLocation } = useLocation();

  const [q, setQ] = useState(searchParams?.get("q") ?? "");
  const [category, setCategory] = useState(searchParams?.get("category") ?? "");
  const [user, setUser] = useState<{ id?: string; name: string; role: string; email?: string } | null>(null);

  // Modals & Popovers
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // Location Form State
  const [locState, setLocState] = useState(location.state || "Tamil Nadu");
  const [locCity, setLocCity] = useState(location.city || "Chennai");
  const [locPin, setLocPin] = useState(location.pincode || "600001");
  const [locError, setLocError] = useState("");
  const [geoLoading, setGeoLoading] = useState(false);

  const accountRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQ(searchParams?.get("q") ?? "");
    setCategory(searchParams?.get("category") ?? "");
  }, [searchParams]);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d?.user) setUser(d.user);
      })
      .catch(() => {});
  }, []);

  // Sync modal inputs when location changes
  useEffect(() => {
    setLocState(location.state);
    setLocCity(location.city);
    setLocPin(location.pincode);
  }, [location]);

  // Click outside to close menus
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setShowAccountMenu(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowLocationModal(false);
        setShowAccountMenu(false);
        setShowLangMenu(false);
        setShowDrawer(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const totalItems = cart.reduce((n, l) => n + l.quantity, 0);

  function showToast(msg: string) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (category) params.set("category", category);
    const qs = params.toString();
    router.push(qs ? "/?" + qs : "/");
  }

  function handleSaveLocation(e: React.FormEvent) {
    e.preventDefault();
    setLocError("");

    if (!/^\d{6}$/.test(locPin.trim())) {
      setLocError("Please enter a valid 6-digit Indian PIN code (e.g. 600001, 110001).");
      return;
    }

    const result = updateLocation({
      country: "India",
      state: locState,
      city: locCity,
      pincode: locPin.trim(),
    });

    if (!result.isServiceable) {
      setLocError(result.message || "Delivery is unavailable for this PIN code.");
      return;
    }

    setShowLocationModal(false);
    showToast(`Delivery location updated: ${locCity}, ${locPin} (${result.deliveryEstimate})`);
  }

  function handleGeolocation() {
    if (!navigator.geolocation) {
      setLocError("Geolocation is not supported by your browser.");
      return;
    }

    setGeoLoading(true);
    setLocError("");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoLoading(false);
        // Map detected coordinates to closest metropolitan delivery hub
        const lat = pos.coords.latitude;
        if (lat < 15) {
          setLocState("Tamil Nadu");
          setLocCity("Chennai");
          setLocPin("600001");
        } else if (lat < 21) {
          setLocState("Maharashtra");
          setLocCity("Mumbai");
          setLocPin("400001");
        } else {
          setLocState("Delhi");
          setLocCity("New Delhi");
          setLocPin("110001");
        }
        showToast("Nearest delivery hub detected. Click Apply to save.");
      },
      (err) => {
        setGeoLoading(false);
        setLocError("Location permission denied. Please select your state and PIN code manually.");
      },
      { timeout: 8000 }
    );
  }

  async function handleSignOut() {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    setUser(null);
    setShowAccountMenu(false);
    setShowDrawer(false);
    showToast("Signed out successfully");
    window.location.href = "/";
  }

  return (
    <>
      {/* Toast Notification */}
      {toastMsg && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-[#172554] px-4 py-3 text-xs font-semibold text-white shadow-2xl border border-[#3B82F6] animate-fade-in"
        >
          <span className="text-emerald-400 text-base">✓</span>
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg("")} className="ml-2 text-slate-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Main Header Container with Navbar Color #172554 */}
      <header className="sticky top-0 z-40 w-full select-none shadow-md">
        <div className="bg-[#172554] px-2 py-2 text-white md:px-4">
          <div className="mx-auto flex max-w-[1500px] items-center gap-2 md:gap-4">
            {/* Drawer Toggle (Mobile) */}
            <button
              onClick={() => setShowDrawer(true)}
              className="flex items-center rounded-lg p-1.5 hover:bg-white/10 md:hidden"
              aria-label="Open Navigation Menu"
            >
              <svg className="h-6 w-6 stroke-white" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Renzocart Logo */}
            <RenzocartLogo variant="light" size="md" className="shrink-0" />

            {/* Choose Your Location Button */}
            <button
              type="button"
              onClick={() => {
                setLocError("");
                setShowLocationModal(true);
              }}
              className="hidden lg:flex items-center gap-2 rounded-lg p-1.5 text-left transition hover:bg-white/10 shrink-0"
              title="Select Delivery Location"
            >
              <svg className="h-5 w-5 fill-[#3B82F6] shrink-0" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
              </svg>
              <div className="leading-tight">
                <span className="block text-[10px] text-blue-200 uppercase tracking-wider">
                  {t("deliverTo")} {user?.name ? user.name.split(" ")[0] : "India"}
                </span>
                <span className="block text-xs font-bold text-white truncate max-w-[130px]">
                  {location.city} {location.pincode}
                </span>
              </div>
            </button>

            {/* Global Search Bar (Desktop) */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 items-center rounded-lg bg-white overflow-hidden shadow-inner ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-[#3B82F6]"
            >
              <select
                aria-label="Search Department"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="hidden h-10 border-r border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-100 focus:outline-none md:block cursor-pointer shrink-0"
              >
                <option value="">{t("allCategories")}</option>
                {NAV_DEPARTMENTS.map((d) => (
                  <option key={d.slug} value={d.slug}>
                    {t(d.key)}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="h-10 w-full flex-1 px-3 text-xs md:text-sm text-slate-900 placeholder-slate-400 outline-none"
              />

              <button
                type="submit"
                aria-label="Submit Search"
                className="h-10 bg-[#3B82F6] px-4 font-bold text-white transition hover:bg-[#2563EB] flex items-center justify-center shrink-0"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>

            {/* Language Switcher Dropdown (5 Languages: EN, TA, HI, ML, KN) */}
            <div className="relative shrink-0" ref={langRef}>
              <button
                type="button"
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1.5 rounded-lg p-2 text-xs font-bold hover:bg-white/10 transition"
                aria-label="Select Language"
              >
                <span>
                  {LANGUAGES.find((l) => l.code === lang)?.flag || "🇮🇳"}{" "}
                  {LANGUAGES.find((l) => l.code === lang)?.shortLabel || "EN"}
                </span>
                <span className="text-[10px] text-blue-200">▾</span>
              </button>

              {showLangMenu && (
                <div className="absolute right-0 top-full mt-1 w-56 rounded-xl border border-slate-200 bg-white p-2 text-xs font-semibold text-slate-800 shadow-2xl z-50">
                  <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-slate-400 border-b mb-1">
                    {t("selectLanguage")}
                  </div>
                  {LANGUAGES.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        changeLanguage(item.code);
                        setShowLangMenu(false);
                        showToast(`${item.nativeLabel} (${item.label})`);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition hover:bg-blue-50 ${
                        lang === item.code ? "bg-blue-50 font-bold text-[#3B82F6]" : "text-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{item.flag}</span>
                        <div>
                          <span className="block text-xs font-bold leading-tight">{item.nativeLabel}</span>
                          <span className="block text-[10px] text-slate-400 leading-tight">{item.label}</span>
                        </div>
                      </div>
                      {lang === item.code && <span className="text-[#3B82F6] font-bold text-sm">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Account & Orders Dropdown */}
            <div className="relative shrink-0" ref={accountRef}>
              <button
                type="button"
                onClick={() => setShowAccountMenu(!showAccountMenu)}
                className="rounded-lg p-2 text-left hover:bg-white/10 transition"
              >
                <span className="block text-[10px] text-blue-200 leading-none">
                  {user ? `Hello, ${user.name.split(" ")[0]}` : t("helloSignIn")}
                </span>
                <span className="block text-xs font-bold text-white flex items-center gap-1 leading-none mt-1">
                  {t("accountAndLists")} <span className="text-[10px] text-blue-200">▾</span>
                </span>
              </button>

              {showAccountMenu && (
                <div className="absolute right-0 top-full mt-1 w-60 rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 shadow-2xl z-50">
                  {!user ? (
                    <div className="border-b pb-3 text-center">
                      <Link
                        href="/login"
                        onClick={() => setShowAccountMenu(false)}
                        className="btn-amazon-primary block w-full py-2 font-bold"
                      >
                        {t("signIn")} ({t("brandName")})
                      </Link>
                      <span className="mt-2 block text-[11px] text-slate-500">
                        {t("newToRenzocart")}{" "}
                        <Link href="/login" className="text-[#3B82F6] font-semibold hover:underline">
                          {t("register")}
                        </Link>
                      </span>
                    </div>
                  ) : (
                    <div className="border-b pb-2 mb-2">
                      <span className="block font-bold text-[#172554] text-sm">{user.name}</span>
                      <span className="block text-[11px] text-slate-500">{user.email}</span>
                      {user.role === "ADMIN" && (
                        <span className="mt-1 inline-block rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                          Administrator
                        </span>
                      )}
                    </div>
                  )}

                  <div className="space-y-1 pt-1 font-medium">
                    <Link
                      href="/orders"
                      onClick={() => setShowAccountMenu(false)}
                      className="block rounded-lg px-2.5 py-1.5 hover:bg-blue-50 hover:text-[#3B82F6]"
                    >
                      {t("yourOrders")}
                    </Link>
                    <Link
                      href="/track"
                      onClick={() => setShowAccountMenu(false)}
                      className="block rounded-lg px-2.5 py-1.5 hover:bg-blue-50 hover:text-[#3B82F6]"
                    >
                      {t("trackPackage")}
                    </Link>
                    <Link
                      href="/account"
                      onClick={() => setShowAccountMenu(false)}
                      className="block rounded-lg px-2.5 py-1.5 hover:bg-blue-50 hover:text-[#3B82F6]"
                    >
                      {t("myAccount")}
                    </Link>
                    {user?.role === "ADMIN" && (
                      <Link
                        href="/admin"
                        onClick={() => setShowAccountMenu(false)}
                        className="block rounded-lg px-2.5 py-1.5 font-bold text-[#8B5CF6] hover:bg-purple-50"
                      >
                        ⚙️ {t("adminDashboard")}
                      </Link>
                    )}
                    {user && (
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left rounded-lg px-2.5 py-1.5 text-red-600 hover:bg-red-50 font-semibold border-t mt-2 pt-2"
                      >
                        {t("signOut")}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart Button */}
            <Link
              href="/cart"
              className="flex items-center gap-2 rounded-lg p-2 text-white hover:bg-white/10 transition shrink-0"
            >
              <div className="relative">
                <svg className="h-6 w-6 stroke-white fill-none" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#8B5CF6] text-[11px] font-black text-white shadow">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-bold">{t("cart")}</span>
            </Link>
          </div>
        </div>

        {/* Mobile Full-Width Search Bar */}
        <div className="md:hidden px-3 pb-2.5 pt-1 bg-[#172554]">
          <form
            onSubmit={handleSearch}
            className="flex w-full items-center rounded-lg bg-white overflow-hidden shadow-inner ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-[#3B82F6]"
          >
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="h-10 w-full flex-1 px-3 text-xs text-slate-900 placeholder-slate-400 outline-none"
            />
            <button
              type="submit"
              aria-label="Submit Search"
              className="h-10 bg-[#3B82F6] px-4 font-bold text-white transition hover:bg-[#2563EB] flex items-center justify-center shrink-0"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </form>
        </div>

        {/* Mobile Deliver to Location Bar */}
        <button
          type="button"
          onClick={() => {
            setLocError("");
            setShowLocationModal(true);
          }}
          className="flex lg:hidden w-full items-center gap-2 bg-[#1e293b] px-3.5 py-1.5 text-xs text-white border-t border-[#334155] text-left hover:bg-[#334155] transition"
        >
          <svg className="h-4 w-4 fill-[#3B82F6] shrink-0" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
          </svg>
          <span className="text-[11px] text-blue-200 truncate">
            {t("deliverTo")} <b className="text-white">{location.city} {location.pincode}</b> ▾
          </span>
        </button>

        {/* Sub-Navigation Bar */}
        <div className="flex items-center gap-4 bg-[#1e293b] px-4 py-1.5 text-xs font-medium text-slate-200 overflow-x-auto border-t border-[#334155]">
          <Link href="/?isDeal=1" className="font-bold text-amber-400 hover:text-white shrink-0 flex items-center gap-1">
            ⚡ {t("todaysDeals")}
          </Link>
          {NAV_DEPARTMENTS.slice(0, 7).map((d) => (
            <Link
              key={d.slug}
              href={`/?category=${d.slug}`}
              className="hover:text-white shrink-0 whitespace-nowrap"
            >
              {t(d.key)}
            </Link>
          ))}
          <Link href="/help" className="hover:text-white shrink-0">
            {t("customerService")}
          </Link>
          <Link href="/admin" className="hover:text-white text-blue-300 shrink-0">
            {t("sell")}
          </Link>
        </div>
      </header>

      {/* Choose Your Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-[#172554]">{t("chooseDeliveryLocation")}</h3>
              <button
                onClick={() => setShowLocationModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Select your delivery destination to view live product availability, shipping speeds, and local discounts.
            </p>

            {locError && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700">
                {locError}
              </div>
            )}

            <form onSubmit={handleSaveLocation} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Country</label>
                <input
                  type="text"
                  disabled
                  value="India"
                  className="input bg-slate-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">{t("selectState")}</label>
                <select
                  value={locState}
                  onChange={(e) => {
                    const st = e.target.value;
                    setLocState(st);
                    const cities = STATES_AND_CITIES[st] || [];
                    if (cities.length > 0) setLocCity(cities[0]);
                  }}
                  className="input"
                >
                  {Object.keys(STATES_AND_CITIES).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">{t("selectCity")}</label>
                <select
                  value={locCity}
                  onChange={(e) => setLocCity(e.target.value)}
                  className="input"
                >
                  {(STATES_AND_CITIES[locState] || [locCity]).map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">{t("enterPincode")}</label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="e.g. 600001 or 110001"
                  value={locPin}
                  onChange={(e) => setLocPin(e.target.value.replace(/\D/g, ""))}
                  className="input font-mono"
                />
              </div>

              {/* Geolocation Button */}
              <button
                type="button"
                onClick={handleGeolocation}
                disabled={geoLoading}
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-slate-50 py-2 font-medium text-slate-700 hover:bg-slate-100 transition"
              >
                <span>📍</span>
                <span>{geoLoading ? "Detecting nearest hub..." : t("useCurrentLocation")}</span>
              </button>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLocationModal(false)}
                  className="btn-amazon-light flex-1 py-2 font-semibold"
                >
                  {t("cancel")}
                </button>
                <button
                  type="submit"
                  className="btn-amazon-primary flex-1 py-2 font-bold"
                >
                  {t("saveLocation")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Side Drawer */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDrawer(false)} />
          <div className="relative w-80 max-w-full bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <RenzocartLogo variant="dark" size="md" />
                <button onClick={() => setShowDrawer(false)} className="text-slate-400 text-lg">✕</button>
              </div>

              <div className="space-y-2 text-xs font-semibold text-slate-700">
                <div className="text-[10px] uppercase tracking-wider text-slate-400">{t("departments")}</div>
                {NAV_DEPARTMENTS.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/?category=${d.slug}`}
                    onClick={() => setShowDrawer(false)}
                    className="block rounded-lg px-3 py-2 hover:bg-blue-50 hover:text-[#3B82F6]"
                  >
                    {t(d.key)}
                  </Link>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2 text-xs font-semibold text-slate-700">
                <div className="text-[10px] uppercase tracking-wider text-slate-400">{t("quickLinks")}</div>
                <Link href="/orders" onClick={() => setShowDrawer(false)} className="block px-3 py-1.5 hover:text-[#3B82F6]">
                  {t("yourOrders")}
                </Link>
                <Link href="/track" onClick={() => setShowDrawer(false)} className="block px-3 py-1.5 hover:text-[#3B82F6]">
                  {t("trackPackage")}
                </Link>
                <Link href="/help" onClick={() => setShowDrawer(false)} className="block px-3 py-1.5 hover:text-[#3B82F6]">
                  {t("helpCenter")}
                </Link>
                <Link href="/contact" onClick={() => setShowDrawer(false)} className="block px-3 py-1.5 hover:text-[#3B82F6]">
                  {t("contactUs")}
                </Link>
              </div>

              {/* Language Selection in Drawer */}
              <div className="border-t pt-4 space-y-2 text-xs">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{t("selectLanguage")}</div>
                <div className="grid grid-cols-1 gap-1.5">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        changeLanguage(l.code);
                        showToast(`${l.nativeLabel} (${l.label})`);
                      }}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 text-left font-semibold transition ${
                        lang === l.code ? "bg-blue-50 text-[#3B82F6] border border-blue-200" : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{l.flag}</span>
                        <span>{l.nativeLabel}</span>
                        <span className="text-[10px] text-slate-400 font-normal">({l.label})</span>
                      </span>
                      {lang === l.code && <span className="text-[#3B82F6] font-bold">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="w-full btn-amazon-light py-2 text-red-600 font-bold"
                >
                  {t("signOut")}
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setShowDrawer(false)}
                  className="w-full btn-amazon-primary block text-center py-2 font-bold"
                >
                  {t("signIn")}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
