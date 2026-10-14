"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";
import { useTranslation } from "@/lib/i18n";
import { inr } from "@/lib/money";

const HERO_SLIDES = [
  {
    id: 1,
    titleKey: "hero1Title",
    subtitleKey: "hero1Subtitle",
    badgeKey: "hero1Badge",
    bgGradient: "from-[#172554] via-[#1e3a8a] to-[#0f172a]",
    accentColor: "#3B82F6",
    categorySlug: "electronics",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    titleKey: "hero2Title",
    subtitleKey: "hero2Subtitle",
    badgeKey: "hero2Badge",
    bgGradient: "from-[#2e1065] via-[#4c1d95] to-[#172554]",
    accentColor: "#8B5CF6",
    categorySlug: "mobiles",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    titleKey: "hero3Title",
    subtitleKey: "hero3Subtitle",
    badgeKey: "hero3Badge",
    bgGradient: "from-[#0f172a] via-[#1e293b] to-[#172554]",
    accentColor: "#38bdf8",
    categorySlug: "computers",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1600&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    titleKey: "hero4Title",
    subtitleKey: "hero4Subtitle",
    badgeKey: "hero4Badge",
    bgGradient: "from-[#172554] via-[#1e40af] to-[#312e81]",
    accentColor: "#a855f7",
    categorySlug: "home-and-kitchen",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1600&auto=format&fit=crop&q=80",
  },
];

const FEATURE_TILES = [
  {
    titleKey: "tileElectronicsTitle",
    linkKey: "seeAllDeals",
    categorySlug: "electronics",
    items: [
      { name: "Sony XM5", img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&auto=format&fit=crop&q=80", slug: "sony-wh-1000xm5-wireless-noise-cancelling-headphones" },
      { name: "boAt TWS", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&auto=format&fit=crop&q=80", slug: "boat-airdopes-141-bluetooth-truly-wireless-earbuds" },
      { name: "Bose Micro", img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&auto=format&fit=crop&q=80", slug: "bose-soundlink-micro-bluetooth-speaker-black" },
      { name: "JBL Flip 6", img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&auto=format&fit=crop&q=80", slug: "jbl-flip-6-wireless-portable-bluetooth-speaker" },
    ],
  },
  {
    titleKey: "tileMobilesTitle",
    linkKey: "shopMobiles",
    categorySlug: "mobiles",
    items: [
      { name: "iPhone 15", img: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400&auto=format&fit=crop&q=80", slug: "apple-iphone-15-128-gb-black-with-dynamic-island-48mp-main-camera" },
      { name: "Galaxy S24", img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&auto=format&fit=crop&q=80", slug: "samsung-galaxy-s24-ultra-5g-titanium-gray-256gb" },
      { name: "OnePlus 12", img: "https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?w=400&auto=format&fit=crop&q=80", slug: "oneplus-12-5g-silky-black-16gb-512gb" },
      { name: "Anker 20W PD", img: "https://images.unsplash.com/photo-1609592424361-b51f084fa173?w=400&auto=format&fit=crop&q=80", slug: "anker-powercore-20000mah-20w-fast-charging-power-bank" },
    ],
  },
  {
    titleKey: "tileFashionTitle",
    linkKey: "exploreFashion",
    categorySlug: "fashion",
    items: [
      { name: "Levi's 511", img: "https://images.unsplash.com/photo-1542272604-780c96856592?w=400&auto=format&fit=crop&q=80", slug: "levis-mens-511-slim-fit-stretch-dark-wash-denim-jeans" },
      { name: "Nike Hoodie", img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&auto=format&fit=crop&q=80", slug: "nike-sportswear-club-fleece-pullover-hoodie-black" },
      { name: "Puma Smash", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&auto=format&fit=crop&q=80", slug: "puma-unisex-smash-v2-leather-sneakers-white" },
      { name: "Titan Raga", img: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=400&auto=format&fit=crop&q=80", slug: "titan-raga-viva-rose-gold-analog-womens-watch" },
    ],
  },
  {
    titleKey: "tileHomeTitle",
    linkKey: "discoverHomeItems",
    categorySlug: "home-and-kitchen",
    items: [
      { name: "Prestige Cookware", img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&auto=format&fit=crop&q=80", slug: "prestige-omega-deluxe-granite-3-piece-cookware-set" },
      { name: "Bajaj Mixer", img: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&auto=format&fit=crop&q=80", slug: "bajaj-gx-1-500w-mixer-grinder-3-stainless-steel-jars" },
      { name: "Aquaguard Purifier", img: "https://images.unsplash.com/photo-1585837575652-267c041d77d4?w=400&auto=format&fit=crop&q=80", slug: "aquaguard-sure-delight-nxt-ro-uv-water-purifier" },
      { name: "Smart LED Bulbs", img: "https://images.unsplash.com/photo-1550524514-9636edecdd04?w=400&auto=format&fit=crop&q=80", slug: "wipro-b22-9w-smart-led-bulb-pack-of-2" },
    ],
  },
];

const CATEGORIES_LIST = [
  { name: "Electronics", slug: "electronics", key: "electronics" },
  { name: "Mobiles", slug: "mobiles", key: "mobiles" },
  { name: "Computers", slug: "computers", key: "computers" },
  { name: "Fashion", slug: "fashion", key: "fashion" },
  { name: "Home & Kitchen", slug: "home-and-kitchen", key: "homeAndKitchen" },
  { name: "Beauty", slug: "beauty", key: "beauty" },
  { name: "Grocery", slug: "grocery", key: "grocery" },
  { name: "Sports", slug: "sports", key: "sports" },
  { name: "Toys", slug: "toys", key: "toys" },
  { name: "Accessories", slug: "accessories", key: "accessories" },
];

function Listing() {
  const sp = useSearchParams();
  const router = useRouter();
  const { t } = useTranslation();

  const [data, setData] = useState<any>(null);
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Auto rotate hero banner
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Fetch Live Deals from /api/deals
  useEffect(() => {
    fetch("/api/deals")
      .then((r) => r.json())
      .then((d) => {
        if (d?.deals) setDeals(d.deals);
      })
      .catch(() => {});
  }, []);

  // Fetch Products with search/filter params
  useEffect(() => {
    setLoading(true);
    setError("");
    fetch("/api/products?" + sp.toString())
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.error || "Failed to load products");
        setData(d);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [sp]);

  const setFilter = (k: string, v: string) => {
    const n = new URLSearchParams(sp.toString());
    v ? n.set(k, v) : n.delete(k);
    n.delete("page");
    router.push("/?" + n.toString());
  };

  const isBrowsingOrSearching = sp.toString().length > 0;
  const currentCategory = sp.get("category") || "";
  const currentBrand = sp.get("brand") || "";
  const currentMinRating = sp.get("minRating") || "";
  const currentSort = sp.get("sort") || "popular";
  const inStockOnly = sp.get("inStock") === "1";

  // Deals countdown calculation
  const [timeLeft, setTimeLeft] = useState("04h 32m 18s");
  useEffect(() => {
    const end = Date.now() + 16338000;
    const interval = setInterval(() => {
      const diff = Math.max(0, end - Date.now());
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="-mt-6 space-y-8">
      {/* Hero Banner Carousel (Shown on Home view) */}
      {!isBrowsingOrSearching && (
        <div className="relative -mx-4 overflow-hidden md:-mx-8">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {HERO_SLIDES.map((slide) => (
              <div
                key={slide.id}
                className={`relative min-w-full h-[320px] md:h-[450px] lg:h-[500px] flex items-center bg-gradient-to-r ${slide.bgGradient}`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />

                <div className="relative mx-auto max-w-[1500px] w-full px-6 md:px-12 z-10 flex flex-col items-start justify-center text-white">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-3 shadow"
                    style={{ backgroundColor: slide.accentColor, color: "#fff" }}
                  >
                    {t(slide.badgeKey)}
                  </span>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-2xl text-shadow">
                    {t(slide.titleKey)}
                  </h1>
                  <p className="mt-3 text-sm md:text-lg text-slate-200 max-w-xl">
                    {t(slide.subtitleKey)}
                  </p>
                  <Link
                    href={`/?category=${slide.categorySlug}`}
                    className="mt-6 btn-amazon-primary px-6 py-2.5 text-xs font-bold shadow-lg"
                  >
                    {t("shopTheSale")} →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Navigation Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-xl font-bold text-white shadow-md backdrop-blur-sm transition hover:bg-black/70"
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-xl font-bold text-white shadow-md backdrop-blur-sm transition hover:bg-black/70"
            aria-label="Next slide"
          >
            ›
          </button>

          {/* Bottom gradient fade into page background #F5F8FF */}
          <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#F5F8FF] via-[#F5F8FF]/80 to-transparent pointer-events-none" />
        </div>
      )}

      {/* Signature 4-Quadrant Feature Cards Floating Over Banner */}
      {!isBrowsingOrSearching && (
        <div className="relative z-20 -mt-20 md:-mt-32 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURE_TILES.map((tile, i) => (
            <div key={i} className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
              <div>
                <h2 className="text-base font-bold text-[#172554] leading-tight mb-4">
                  {t(tile.titleKey)}
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {tile.items.map((item, itemIdx) => (
                    <Link
                      key={itemIdx}
                      href={`/products/${item.slug}`}
                      className="group flex flex-col items-center"
                    >
                      <div className="aspect-square w-full overflow-hidden rounded-xl bg-slate-50 p-2 flex items-center justify-center border border-slate-100">
                        <ProductImage
                          src={item.img}
                          alt={item.name}
                          className="h-full w-full object-contain transition duration-200 group-hover:scale-105"
                          containerClassName="h-full w-full"
                        />
                      </div>
                      <span className="mt-1 text-[11px] font-medium text-slate-700 group-hover:text-[#3B82F6] line-clamp-1">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href={`/?category=${tile.categorySlug}`}
                className="mt-4 text-xs font-bold text-[#3B82F6] hover:text-[#8B5CF6] hover:underline"
              >
                {t(tile.linkKey)} &rarr;
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Today's Deals Live Shelf (Admin-Managed Backend) */}
      {!isBrowsingOrSearching && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between border-b pb-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600 font-bold">
                ⚡
              </span>
              <div>
                <h2 className="text-xl font-extrabold text-[#172554]">{t("todaysDeals")}</h2>
                <span className="text-xs text-slate-500 font-medium">{t("curatedVerifiedDiscounts")}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-red-50 border border-red-200 px-3 py-1 text-xs font-bold text-red-700">
                ⏳ {t("endsIn")}: {timeLeft}
              </span>
              <Link href="/?isDeal=1" className="text-xs font-bold text-[#3B82F6] hover:text-[#8B5CF6]">
                {t("seeAllDeals")} &rarr;
              </Link>
            </div>
          </div>

          {/* Deal Cards Carousel */}
          <div className="flex gap-4 overflow-x-auto pb-3 pt-1">
            {(deals.length > 0 ? deals : data?.items?.slice(0, 6) || []).map((dealItem: any) => {
              const product = dealItem.productSlug ? {
                id: dealItem.productId,
                slug: dealItem.productSlug,
                name: dealItem.productName,
                brand: "Renzocart Featured",
                priceMinor: dealItem.dealPriceMinor,
                mrpMinor: dealItem.regularPriceMinor,
                stock: dealItem.dealStock - (dealItem.soldCount || 0),
                rating: 4.8,
                ratingCount: 3420,
                isDealOfTheDay: true,
                images: [{ url: dealItem.productImage, position: 0 }],
              } : dealItem;

              return (
                <div key={dealItem.id} className="w-52 shrink-0">
                  <ProductCard p={product} />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Mobile Filter Toggle Button */}
      <div className="flex items-center justify-between lg:hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-2 text-xs font-bold text-[#172554] bg-[#F5F8FF] px-3.5 py-2 rounded-lg border border-slate-200 hover:bg-blue-50 transition"
        >
          <span>⚙️ {t("filters")} &amp; {t("department")}</span>
          <span className="text-[10px] text-blue-500">{showMobileFilters ? "▲" : "▼"}</span>
        </button>
        {currentCategory && (
          <span className="text-xs font-semibold text-[#3B82F6] truncate max-w-[140px]">
            {currentCategory}
          </span>
        )}
      </div>

      {/* Main Catalog Layout with Sidebar Filters */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Left Sidebar Filters */}
        <aside className={`space-y-6 rounded-2xl border border-slate-200 bg-white p-5 text-xs shadow-sm lg:col-span-1 ${showMobileFilters ? "block" : "hidden lg:block"}`}>
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="font-extrabold uppercase tracking-wider text-[#172554]">{t("filters")}</h3>
            {isBrowsingOrSearching && (
              <button
                onClick={() => router.push("/")}
                className="text-xs font-bold text-[#3B82F6] hover:underline"
              >
                {t("clearAll")}
              </button>
            )}
          </div>

          {/* 10 Departments / Categories */}
          <div className="border-b pb-4">
            <h4 className="font-bold text-[#172554] mb-2.5">{t("department")}</h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => setFilter("category", "")}
                  className={`text-left block w-full py-0.5 rounded px-1.5 ${
                    !currentCategory ? "bg-blue-50 font-bold text-[#3B82F6]" : "text-slate-600 hover:text-[#3B82F6]"
                  }`}
                >
                  {t("allCategories")}
                </button>
              </li>
              {CATEGORIES_LIST.map((c) => (
                <li key={c.slug}>
                  <button
                    onClick={() => setFilter("category", c.slug)}
                    className={`text-left block w-full py-0.5 rounded px-1.5 truncate ${
                      currentCategory === c.slug ? "bg-blue-50 font-bold text-[#3B82F6]" : "text-slate-600 hover:text-[#3B82F6]"
                    }`}
                  >
                    {t(c.key)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Reviews Rating Filter */}
          <div className="border-b pb-4">
            <h4 className="font-bold text-[#172554] mb-2.5">{t("customerRating")}</h4>
            <div className="space-y-1.5">
              {[
                { stars: "4", label: "4★" },
                { stars: "3", label: "3★" },
              ].map((r) => (
                <button
                  key={r.stars}
                  onClick={() => setFilter("minRating", currentMinRating === r.stars ? "" : r.stars)}
                  className={`flex items-center gap-1.5 w-full rounded px-1.5 py-1 ${
                    currentMinRating === r.stars ? "bg-amber-50 font-bold text-amber-800" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span className="text-amber-500">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <span key={idx}>{idx < Number(r.stars) ? "★" : "☆"}</span>
                    ))}
                  </span>
                  <span>{t("andUp")}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Top Brands */}
          <div className="border-b pb-4">
            <h4 className="font-bold text-[#172554] mb-2.5">{t("brand")}</h4>
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {["Apple", "Samsung", "Sony", "boAt", "OnePlus", "Philips", "Prestige", "Puma", "Nike", "Levi's", "Tata Tea", "LEGO"].map((brand) => (
                <label key={brand} className="flex cursor-pointer items-center gap-2 text-slate-700">
                  <input
                    type="checkbox"
                    checked={currentBrand.toLowerCase() === brand.toLowerCase()}
                    onChange={(e) => setFilter("brand", e.target.checked ? brand : "")}
                    className="h-3.5 w-3.5 rounded border-slate-300 text-[#3B82F6] focus:ring-[#3B82F6]"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="border-b pb-4">
            <h4 className="font-bold text-[#172554] mb-2.5">{t("priceRange")}</h4>
            <ul className="space-y-1.5 text-slate-600">
              <li>
                <button onClick={() => { setFilter("minPrice", ""); setFilter("maxPrice", "1000"); }} className="hover:text-[#3B82F6]">
                  {t("under1000")}
                </button>
              </li>
              <li>
                <button onClick={() => { setFilter("minPrice", "1000"); setFilter("maxPrice", "5000"); }} className="hover:text-[#3B82F6]">
                  {t("price1000To5000")}
                </button>
              </li>
              <li>
                <button onClick={() => { setFilter("minPrice", "5000"); setFilter("maxPrice", "25000"); }} className="hover:text-[#3B82F6]">
                  {t("price5000To25000")}
                </button>
              </li>
              <li>
                <button onClick={() => { setFilter("minPrice", "25000"); setFilter("maxPrice", ""); }} className="hover:text-[#3B82F6]">
                  {t("over25000")}
                </button>
              </li>
            </ul>
          </div>

          {/* In Stock Only */}
          <div>
            <h4 className="font-bold text-[#172554] mb-2">{t("availability")}</h4>
            <label className="flex cursor-pointer items-center gap-2 text-slate-700">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setFilter("inStock", e.target.checked ? "1" : "")}
                className="h-3.5 w-3.5 rounded border-slate-300 text-[#3B82F6] focus:ring-[#3B82F6]"
              />
              <span>{t("inStockOnly")}</span>
            </label>
          </div>
        </aside>

        {/* Right Main Grid */}
        <main className="space-y-4 lg:col-span-4">
          {/* Top Sort and Results Header */}
          <div className="flex flex-wrap items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs shadow-sm">
            <div className="text-slate-600">
              {loading ? (
                <span>{t("loadingProducts")}</span>
              ) : (
                <span>
                  {t("showingResults", { count: data?.items?.length || 0, total: data?.total || 0 })}
                  {sp.get("q") && <span> {t("forQuery")} <b className="text-slate-900">"{sp.get("q")}"</b></span>}
                  {currentCategory && <span> {t("inCategory")} <b className="text-[#3B82F6]">{currentCategory}</b></span>}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="sortSelect" className="font-semibold text-slate-700">{t("sortBy")}</label>
              <select
                id="sortSelect"
                value={currentSort}
                onChange={(e) => setFilter("sort", e.target.value)}
                className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
              >
                <option value="popular">{t("featured")}</option>
                <option value="price_asc">{t("priceLowToHigh")}</option>
                <option value="price_desc">{t("priceHighToLow")}</option>
                <option value="rating">{t("avgCustomerReview")}</option>
                <option value="newest">{t("newestArrivals")}</option>
              </select>
            </div>
          </div>

          {/* Product Cards Grid */}
          {error ? (
            <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 shadow-sm">
              {error}
            </div>
          ) : loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-80 animate-pulse rounded-xl bg-white border border-slate-100 p-4">
                  <div className="aspect-square w-full rounded bg-slate-100" />
                  <div className="mt-3 h-4 w-3/4 rounded bg-slate-100" />
                  <div className="mt-2 h-4 w-1/2 rounded bg-slate-100" />
                </div>
              ))}
            </div>
          ) : data?.items?.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm">
              <div className="text-4xl">🔍</div>
              <h3 className="mt-3 text-lg font-bold text-slate-900">{t("noProductsMatch")}</h3>
              <p className="mt-1 text-xs text-slate-600">
                {t("tryClearingFilters")}
              </p>
              <button
                onClick={() => router.push("/")}
                className="mt-4 btn-amazon-primary px-5 py-2 text-xs font-bold"
              >
                {t("exploreAllProducts")}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {data.items.map((p: any) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {data && data.pages > 1 && (
            <div className="flex justify-center gap-1.5 pt-6">
              {Array.from({ length: data.pages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => {
                    const x = new URLSearchParams(sp.toString());
                    x.set("page", String(n));
                    router.push("/?" + x.toString());
                  }}
                  className={`h-9 min-w-9 rounded-lg border px-3 text-xs font-bold transition ${
                    n === data.page
                      ? "border-[#3B82F6] bg-[#3B82F6] text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading Renzocart storefront...</div>}>
      <Listing />
    </Suspense>
  );
}
