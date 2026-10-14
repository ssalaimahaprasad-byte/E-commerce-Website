"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { removeLine, setQty, useCart, clearCart } from "@/lib/cart";
import { computeTotals, inr } from "@/lib/money";
import { useTranslation } from "@/lib/i18n";
import ProductImage from "@/components/ProductImage";

export default function CartPage() {
  const router = useRouter();
  const cart = useCart();
  const { t: tr } = useTranslation();

  const totalItems = cart.reduce((n, l) => n + l.quantity, 0);
  const subtotalRaw = cart.reduce((s, l) => s + l.priceMinor * l.quantity, 0);
  const totals = computeTotals(subtotalRaw, 0);

  if (cart.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 md:p-12 text-center shadow-sm">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#F5F8FF]">
          <svg className="h-12 w-12 fill-[#3B82F6]" viewBox="0 0 24 24">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </div>
        <h1 className="mt-4 text-2xl font-extrabold text-[#172554]">{tr("cartEmpty")}</h1>
        <p className="mt-2 text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
          {tr("emptyCartMessage")}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-amazon-primary px-6 py-2.5 text-xs font-bold">
            {tr("exploreDeals")}
          </Link>
          <Link href="/orders" className="btn-amazon-light px-5 py-2.5 text-xs font-bold">
            {tr("viewOrders")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Left Column: Cart Items (8 cols on lg) */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 md:p-6 shadow-sm lg:col-span-8">
        <div className="flex items-baseline justify-between border-b pb-3">
          <div>
            <h1 className="text-2xl font-bold text-[#172554]">{tr("shoppingCart")}</h1>
            <button
              onClick={() => clearCart()}
              className="text-xs text-[#3B82F6] hover:underline mt-0.5"
            >
              {tr("clearCart")}
            </button>
          </div>
          <span className="hidden text-xs text-slate-500 sm:inline">{tr("Price")}</span>
        </div>

        {/* Item Rows */}
        <div className="divide-y divide-gray-200">
          {cart.map((l) => (
            <div key={l.productId} className="flex flex-col sm:flex-row gap-4 py-4">
              {/* Product Image */}
              <Link href={`/products/${l.slug}`} className="shrink-0 mx-auto sm:mx-0">
                <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-xl bg-white p-2 border border-slate-100 flex items-center justify-center overflow-hidden">
                  <ProductImage
                    src={l.image}
                    alt={l.name}
                    className="h-full w-full object-contain"
                    containerClassName="h-full w-full"
                  />
                </div>
              </Link>

              {/* Item Info */}
              <div className="flex-1 space-y-1 text-xs">
                <Link
                  href={`/products/${l.slug}`}
                  className="text-sm font-semibold text-[#172554] hover:text-[#3B82F6] line-clamp-2 leading-snug"
                >
                  {l.name}
                </Link>

                <div className="font-bold text-green-700">{tr("inStock")}</div>
                <div className="text-slate-500 text-[11px]">{tr("freeDelivery")}</div>
                <div className="font-black italic text-[#3B82F6] tracking-tight text-xs">✓ renzocart express</div>

                {/* Quantity and Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <div className="flex items-center rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1 shadow-sm">
                    <span className="text-[11px] text-slate-600 mr-1.5">{tr("qty")}:</span>
                    <select
                      value={l.quantity}
                      onChange={(e) => setQty(l.productId, Number(e.target.value))}
                      className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none"
                    >
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>

                  <span className="text-slate-300">|</span>

                  <button
                    onClick={() => removeLine(l.productId)}
                    className="text-[#3B82F6] hover:underline"
                  >
                    {tr("delete")}
                  </button>

                  <span className="text-slate-300">|</span>

                  <button className="text-[#3B82F6] hover:underline">
                    {tr("saveForLater")}
                  </button>
                </div>
              </div>

              {/* Price Column */}
              <div className="text-right sm:w-28">
                <span className="text-base font-bold text-[#172554]">
                  {inr(l.priceMinor * l.quantity)}
                </span>
                {l.quantity > 1 && (
                  <div className="text-[11px] text-slate-500">
                    ({inr(l.priceMinor)} each)
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Subtotal Bottom */}
        <div className="border-t pt-4 text-right text-sm">
          {tr("subtotal")} ({totalItems} {totalItems === 1 ? tr("itemSingular") : tr("items")}):{" "}
          <b className="text-lg font-bold text-[#172554]">{inr(totals.subtotal)}</b>
        </div>
      </div>

      {/* Right Column: Checkout Box (4 cols on lg) */}
      <div className="space-y-4 lg:col-span-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm space-y-3">
          {/* Free delivery qualification banner */}
          <div className="flex items-start gap-2 text-xs text-green-700 bg-green-50 p-2.5 rounded-lg border border-green-200">
            <span className="text-base font-bold">✓</span>
            <div>
              <span className="font-bold">{tr("purchaseProtection")}</span>
              <p className="text-[11px] text-slate-600 mt-0.5">
                {tr("purchaseProtectionDesc")}
              </p>
            </div>
          </div>

          {/* Subtotal summary */}
          <div className="text-base">
            {tr("subtotal")} ({totalItems} {totalItems === 1 ? tr("itemSingular") : tr("items")}):{" "}
            <b className="text-xl font-bold text-[#172554]">{inr(totals.subtotal)}</b>
          </div>

          {/* Proceed to Buy Button */}
          <button
            onClick={() => router.push("/checkout")}
            className="btn-amazon-primary w-full py-3 text-xs font-bold text-center"
          >
            {tr("proceedToBuy")} ({totalItems} {totalItems === 1 ? tr("itemSingular") : tr("items")})
          </button>

          {/* EMI text */}
          <div className="text-[11px] text-gray-500 border-t pt-2">
            {tr("emiAvailable")}
          </div>
        </div>

        {/* Customers also bought recommendation box */}
        <div className="rounded-md border border-[#d5d9d9] bg-white p-4 shadow-sm text-xs space-y-2">
          <h3 className="font-bold text-gray-900">{tr("pairItWith")}</h3>
          <div className="flex items-center gap-3 border-t pt-2">
            <div className="h-14 w-14 rounded-lg object-contain border border-slate-100 p-1 bg-white shrink-0 overflow-hidden flex items-center justify-center">
              <ProductImage
                src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400"
                alt="Fire TV Stick"
                className="h-full w-full object-contain"
                containerClassName="h-full w-full"
              />
            </div>
            <div className="flex-1 space-y-0.5">
              <Link href="/products/fire-tv-stick-4k-streaming-device-with-alexa-voice-remote" className="font-semibold text-[#007185] hover:underline line-clamp-1">
                Fire TV Stick 4K with Alexa
              </Link>
              <div className="font-bold text-[#0f1111]">₹3,999</div>
              <Link href="/products/fire-tv-stick-4k-streaming-device-with-alexa-voice-remote" className="btn-amazon-light py-0.5 px-2 text-[10px]">
                {tr("viewProduct")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
