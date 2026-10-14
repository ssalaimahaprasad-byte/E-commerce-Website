"use client";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { clearCart, useCart } from "@/lib/cart";
import { computeTotals, inr } from "@/lib/money";
import RenzocartLogo from "@/components/RenzocartLogo";
import { getSavedLocation } from "@/lib/location";
import { useTranslation } from "@/lib/i18n";
import ProductImage from "@/components/ProductImage";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Checkout() {
  const cart = useCart();
  const { t: tr } = useTranslation();
  const [a, setA] = useState({
    name: "John Doe",
    phone: "9876543210",
    street: "Flat 402, Royal Residency, Connaught Place",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110001",
  });

  useEffect(() => {
    const loc = getSavedLocation();
    if (loc && loc.pincode) {
      setA((prev) => ({
        ...prev,
        city: loc.city || prev.city,
        state: loc.state || prev.state,
        pincode: loc.pincode || prev.pincode,
      }));
    }
  }, []);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [coupon, setCoupon] = useState("WELCOME10");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const inflight = useRef(false);

  const subtotalRaw = cart.reduce((s, l) => s + l.priceMinor * l.quantity, 0);
  const percentOff = coupon.toUpperCase() === "WELCOME10" ? 10 : 0;
  const t = computeTotals(subtotalRaw, percentOff);

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    if (inflight.current || cart.length === 0) return;
    inflight.current = true;
    setBusy(true);
    setMsg("");

    try {
      const r = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((l) => ({ productId: l.productId, quantity: l.quantity })),
          address: a,
          coupon: coupon || undefined,
        }),
      });

      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Failed to create order");

      // If in demo/simulation mode
      if (d.isSimulation) {
        clearCart();
        setTimeout(() => {
          location.href = "/orders?placed=" + d.orderNumber;
        }, 800);
        return;
      }

      // Razorpay live checkout
      if (typeof window !== "undefined" && window.Razorpay) {
        const rzp = new window.Razorpay({
          key: d.keyId,
          amount: d.amount,
          currency: "INR",
          name: "Renzocart",
          description: `Order ${d.orderNumber}`,
          order_id: d.razorpayOrderId,
          prefill: { name: a.name, contact: a.phone },
          theme: { color: "#172554" },
          handler: async (resp: any) => {
            const v = await fetch("/api/checkout/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(resp),
            });
            if (v.ok) {
              clearCart();
              location.href = "/orders?placed=" + d.orderNumber;
            } else {
              setMsg("Payment verification pending. Order saved.");
              inflight.current = false;
              setBusy(false);
            }
          },
          modal: {
            ondismiss: () => {
              setMsg("Payment cancelled. You can retry.");
              inflight.current = false;
              setBusy(false);
            },
          },
        });
        rzp.open();
      } else {
        // Fallback simulation
        clearCart();
        location.href = "/orders?placed=" + d.orderNumber;
      }
    } catch (err: any) {
      setMsg(err.message);
      inflight.current = false;
      setBusy(false);
    }
  }

  if (cart.length === 0) {
    return (
      <div className="rounded-md border border-[#d5d9d9] bg-white p-12 text-center shadow-sm">
        <h1 className="text-xl font-bold">{tr("cartEmpty")}</h1>
        <p className="mt-2 text-xs text-gray-600">{tr("emptyCartNotice")}</p>
        <Link href="/" className="btn-amazon-primary mt-4 inline-block px-6 py-2">
          {tr("shopProducts")}
        </Link>
      </div>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {/* Checkout Navbar */}
      <div className="mb-6 flex items-center justify-between border-b pb-4">
        <Link href="/" className="flex items-center gap-2">
          <RenzocartLogo size="md" variant="dark" />
        </Link>
        <h1 className="text-xl md:text-2xl font-bold text-[#172554]">
          {tr("checkout")} (<span className="text-[#3B82F6]">{cart.length} {cart.length === 1 ? tr("itemSingular") : tr("items")}</span>)
        </h1>
        <div className="text-xs text-slate-500 font-medium">{tr("secure256")}</div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Multi-Step Accordion (8 cols on lg) */}
        <div className="space-y-5 lg:col-span-8">
          {/* Step 1: Delivery Address */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h2 className="text-base font-bold text-[#172554] flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#172554] text-xs font-bold text-white">
                  1
                </span>
                {tr("deliveryAddress")}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">{tr("fullName")}</label>
                <input
                  className="input"
                  required
                  value={a.name}
                  onChange={(e) => setA({ ...a, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">{tr("mobileNumber")}</label>
                <input
                  className="input"
                  required
                  maxLength={10}
                  pattern="[6-9][0-9]{9}"
                  value={a.phone}
                  onChange={(e) => setA({ ...a, phone: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">{tr("streetAddress")}</label>
                <input
                  className="input"
                  required
                  value={a.street}
                  onChange={(e) => setA({ ...a, street: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">{tr("city")}</label>
                <input
                  className="input"
                  required
                  value={a.city}
                  onChange={(e) => setA({ ...a, city: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">{tr("state")}</label>
                <input
                  className="input"
                  required
                  value={a.state}
                  onChange={(e) => setA({ ...a, state: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">{tr("pincode")}</label>
                <input
                  className="input"
                  required
                  maxLength={6}
                  pattern="[1-9][0-9]{5}"
                  value={a.pincode}
                  onChange={(e) => setA({ ...a, pincode: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Step 2: Payment Method */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h2 className="text-base font-bold text-[#172554] flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#172554] text-xs font-bold text-white">
                  2
                </span>
                {tr("paymentMethod")}
              </h2>
            </div>

            <div className="space-y-3 text-xs">
              <label className={`flex items-start gap-3 rounded-lg border p-3.5 cursor-pointer transition ${paymentMethod === "card" ? "border-[#3B82F6] bg-blue-50/50" : "border-slate-200"}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="mt-0.5 text-[#3B82F6]"
                />
                <div>
                  <div className="font-bold text-slate-900">{tr("creditDebitCard")}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{tr("cardSubtitle")}</div>
                </div>
              </label>

              <label className={`flex items-start gap-3 rounded-lg border p-3.5 cursor-pointer transition ${paymentMethod === "upi" ? "border-[#3B82F6] bg-blue-50/50" : "border-slate-200"}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "upi"}
                  onChange={() => setPaymentMethod("upi")}
                  className="mt-0.5 text-[#3B82F6]"
                />
                <div>
                  <div className="font-bold text-slate-900">{tr("upiPayment")}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{tr("upiSubtitle")}</div>
                </div>
              </label>

              <label className={`flex items-start gap-3 rounded-lg border p-3.5 cursor-pointer transition ${paymentMethod === "cod" ? "border-[#3B82F6] bg-blue-50/50" : "border-slate-200"}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="mt-0.5 text-[#3B82F6]"
                />
                <div>
                  <div className="font-bold text-slate-900">{tr("cashOnDelivery")}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{tr("codSubtitle")}</div>
                </div>
              </label>
            </div>
          </div>

          {/* Step 3: Review Items & Delivery */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <h2 className="text-base font-bold text-[#172554] flex items-center gap-2 border-b pb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#172554] text-xs font-bold text-white">
                3
              </span>
              {tr("reviewItems")}
            </h2>

            <div className="divide-y divide-slate-100 text-xs">
              {cart.map((l) => (
                <div key={l.productId} className="flex items-center gap-3 py-2.5">
                  <div className="h-12 w-12 rounded-lg object-contain border border-slate-100 p-0.5 bg-white shrink-0 overflow-hidden flex items-center justify-center">
                    <ProductImage
                      src={l.image}
                      alt={l.name}
                      className="h-full w-full object-contain"
                      containerClassName="h-full w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-slate-900 line-clamp-1">{l.name}</span>
                    <span className="text-slate-500">{tr("qty")}: {l.quantity}</span>
                  </div>
                  <div className="font-bold text-slate-900">{inr(l.priceMinor * l.quantity)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary Buy Box (4 cols on lg) */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 text-xs">
            <button
              type="submit"
              disabled={busy}
              className="btn-amazon-primary w-full py-3 text-sm font-bold shadow-md"
            >
              {busy ? tr("processingOrder") : tr("placeOrder")}
            </button>

            <p className="text-[11px] text-slate-500 text-center">
              {tr("termsAgreement")}
            </p>

            <div className="border-t pt-3 space-y-2">
              <h3 className="font-bold text-sm text-[#172554]">{tr("orderSummary")}</h3>
              <div className="flex justify-between text-slate-600">
                <span>{tr("items")}:</span>
                <span>{inr(t.subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{tr("freeDelivery")}:</span>
                <span className="text-green-700 font-bold">FREE</span>
              </div>
              {percentOff > 0 && (
                <div className="flex justify-between text-green-700 font-semibold">
                  <span>{tr("promoApplied")} ({coupon}):</span>
                  <span>-{inr(t.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>{tr("gstInclusive")}:</span>
                <span>{inr(t.tax)}</span>
              </div>

              {/* Coupon input */}
              <div className="pt-2">
                <label className="font-bold text-slate-700 block mb-1">{tr("applyPromo")}</label>
                <div className="flex gap-2">
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                    placeholder="e.g. WELCOME10"
                    className="input uppercase text-xs"
                  />
                </div>
              </div>

              <div className="border-t pt-3 flex justify-between text-base font-bold text-[#b12704]">
                <span>{tr("total")}:</span>
                <span>{inr(t.total)}</span>
              </div>
            </div>

            {msg && (
              <div role="alert" className="rounded-lg bg-red-50 p-2.5 text-xs text-red-600 border border-red-200">
                {msg}
              </div>
            )}

            <div className="rounded-xl bg-[#F5F8FF] p-3 text-[11px] text-slate-600 border border-slate-200 space-y-1">
              <div className="font-bold text-[#172554]">🛡️ {tr("purchaseProtection")}</div>
              <div>{tr("purchaseProtectionDesc")}</div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
