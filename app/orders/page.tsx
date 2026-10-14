"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { inr } from "@/lib/money";
import { addToCart } from "@/lib/cart";
import { useTranslation } from "@/lib/i18n";
import ProductImage from "@/components/ProductImage";

function OrdersContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const placedNumber = searchParams?.get("placed");
  const { t } = useTranslation();

  const [orders, setOrders] = useState<any[] | null>(null);
  const [filterText, setFilterText] = useState("");
  const [activeTab, setActiveTab] = useState<"ALL" | "BUY_AGAIN" | "NOT_SHIPPED" | "CANCELLED">("ALL");
  const [toastMsg, setToastMsg] = useState("");

  // Modals state
  const [cancelModalOrder, setCancelModalOrder] = useState<any | null>(null);
  const [cancelReason, setCancelReason] = useState("Ordered by mistake");
  const [cancelLoading, setCancelLoading] = useState(false);

  const [returnModalOrder, setReturnModalOrder] = useState<any | null>(null);
  const [returnReason, setReturnReason] = useState("Defective / Item not working properly");
  const [returnComments, setReturnComments] = useState("");
  const [returnLoading, setReturnLoading] = useState(false);

  const [reviewModalItem, setReviewModalItem] = useState<any | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);

  const [invoiceModalOrder, setInvoiceModalOrder] = useState<any | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  const load = () => {
    fetch("/api/orders")
      .then(async (r) => {
        if (r.ok) {
          const d = await r.json();
          setOrders(d.orders || []);
        } else {
          setOrders([]);
        }
      })
      .catch(() => setOrders([]));
  };

  useEffect(() => {
    load();
  }, []);

  // Filter orders by text and tab
  const filteredOrders = orders?.filter((o) => {
    if (activeTab === "NOT_SHIPPED" && !["PENDING", "CONFIRMED", "PROCESSING"].includes(o.status)) {
      return false;
    }
    if (activeTab === "CANCELLED" && o.status !== "CANCELLED") {
      return false;
    }

    if (!filterText) return true;
    const term = filterText.toLowerCase();
    return (
      o.number.toLowerCase().includes(term) ||
      o.items?.some((i: any) => i.name.toLowerCase().includes(term))
    );
  });

  // Extract unique products purchased across all orders for Buy It Again
  const buyAgainProducts = orders
    ? Array.from(
        new Map(
          orders
            .flatMap((o) => (o.items || []).map((it: any) => ({ ...it, orderCreatedAt: o.createdAt })))
            .map((item: any) => [item.productId || item.slug || item.name, item])
        ).values()
      ).filter((item: any) => {
        if (!filterText) return true;
        return item.name.toLowerCase().includes(filterText.toLowerCase());
      })
    : [];

  // Action: Buy It Again
  const handleBuyAgain = async (item: any) => {
    try {
      // Validate current live price and stock from backend
      const res = await fetch(`/api/products?q=${encodeURIComponent(item.name)}`);
      let livePrice = item.unitPriceMinor;
      let inStock = true;

      if (res.ok) {
        const data = await res.json();
        const found = data.items?.find((p: any) => p.id === item.productId || p.slug === item.slug);
        if (found) {
          if (found.stock < 1 || !found.active) {
            showToast(`Sorry, "${item.name}" is currently unavailable or out of stock.`);
            return;
          }
          livePrice = found.priceMinor;
        }
      }

      addToCart({
        productId: item.productId || "prod-item",
        slug: item.slug || "item",
        name: item.name,
        priceMinor: livePrice,
        image: item.image || "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400",
      });

      showToast(`Added "${item.name}" to cart!`);
    } catch {
      showToast("Could not re-add product. Please try again.");
    }
  };

  // Action: Confirm Cancellation
  const handleConfirmCancel = async () => {
    if (!cancelModalOrder) return;
    setCancelLoading(true);

    try {
      const res = await fetch(`/api/orders/${cancelModalOrder.id}/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: cancelReason }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to cancel order");

      showToast(`Order #${cancelModalOrder.number} has been cancelled.`);
      setCancelModalOrder(null);
      load();
    } catch (err: any) {
      showToast(err.message || "Failed to cancel order.");
    } finally {
      setCancelLoading(false);
    }
  };

  // Action: Confirm Return Request
  const handleConfirmReturn = async () => {
    if (!returnModalOrder) return;
    setReturnLoading(true);

    try {
      const res = await fetch(`/api/orders/${returnModalOrder.id}/return`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reason: returnReason,
          comments: returnComments,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit return");

      showToast(`Return request submitted for Order #${returnModalOrder.number}.`);
      setReturnModalOrder(null);
      setReturnComments("");
      load();
    } catch (err: any) {
      showToast(err.message || "Failed to submit return request.");
    } finally {
      setReturnLoading(false);
    }
  };

  // Action: Submit Product Review
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewModalItem) return;
    setReviewLoading(true);

    try {
      const slug = reviewModalItem.slug || "product";
      const res = await fetch(`/api/products/${slug}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating: reviewRating,
          title: reviewTitle,
          comment: reviewComment,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit review");

      showToast("Thank you! Your product review has been submitted.");
      setReviewModalItem(null);
      setReviewTitle("");
      setReviewComment("");
    } catch (err: any) {
      showToast(err.message || "Failed to submit review.");
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {toastMsg && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-[#172554] px-4 py-3 text-xs font-semibold text-white shadow-2xl border border-[#3B82F6]"
        >
          <span className="text-emerald-400 font-bold">✓</span>
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg("")} className="ml-2 text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Order Placed Success Banner */}
      {placedNumber && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white font-extrabold text-lg">
              ✓
            </span>
            <div>
              <h2 className="text-base font-bold text-emerald-950">
                {t("orderPlacedSuccess")}
              </h2>
              <p className="text-xs text-emerald-800">
                {t("orderPlacedEmailNotice")} {t("orderNumberLabel") || t("orderNumber")} <b>{placedNumber}</b>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-black text-[#172554]">{t("yourOrders")}</h1>
          <p className="text-xs text-slate-500">{t("ordersSubtitle")}</p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder={t("searchOrdersPlaceholder")}
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="input w-64 text-xs"
          />
          <button className="btn-amazon-primary px-4 py-2 text-xs font-bold shrink-0">
            {t("searchButton")}
          </button>
        </div>
      </div>

      {/* Order Filter Tabs */}
      <div className="flex gap-6 border-b text-xs font-semibold text-slate-500 overflow-x-auto">
        <button
          onClick={() => setActiveTab("ALL")}
          className={`pb-2.5 transition whitespace-nowrap ${
            activeTab === "ALL" ? "border-b-2 border-[#3B82F6] font-bold text-[#172554]" : "hover:text-slate-900"
          }`}
        >
          {t("yourOrders")}
        </button>
        <button
          onClick={() => setActiveTab("BUY_AGAIN")}
          className={`pb-2.5 transition whitespace-nowrap ${
            activeTab === "BUY_AGAIN" ? "border-b-2 border-[#3B82F6] font-bold text-[#172554]" : "hover:text-slate-900"
          }`}
        >
          {t("buyItAgain")}
        </button>
        <button
          onClick={() => setActiveTab("NOT_SHIPPED")}
          className={`pb-2.5 transition whitespace-nowrap ${
            activeTab === "NOT_SHIPPED" ? "border-b-2 border-[#3B82F6] font-bold text-[#172554]" : "hover:text-slate-900"
          }`}
        >
          {t("notYetShipped")}
        </button>
        <button
          onClick={() => setActiveTab("CANCELLED")}
          className={`pb-2.5 transition whitespace-nowrap ${
            activeTab === "CANCELLED" ? "border-b-2 border-[#3B82F6] font-bold text-[#172554]" : "hover:text-slate-900"
          }`}
        >
          {t("cancelledOrders")}
        </button>
      </div>

      {/* Loading Skeleton */}
      {!orders ? (
        <div className="h-64 animate-pulse rounded-2xl bg-white border border-slate-200 p-6" />
      ) : activeTab === "BUY_AGAIN" ? (
        buyAgainProducts.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm space-y-3">
            <div className="text-4xl">🛍️</div>
            <p className="text-sm font-semibold text-slate-800">{t("noPurchasesToBuyAgain")}</p>
            <Link href="/" className="btn-amazon-primary inline-block px-5 py-2 text-xs font-bold">
              {t("startShopping")}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-slate-600">{t("reorderFavorites")}</p>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">{buyAgainProducts.length} items</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {buyAgainProducts.map((item: any, idx: number) => (
                <div key={idx} className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm hover:border-[#3B82F6] hover:shadow-md transition">
                  <div>
                    <Link
                      href={item.slug ? `/products/${item.slug}` : "/"}
                      className="aspect-square w-full rounded-lg bg-white p-2 border border-slate-100 flex items-center justify-center overflow-hidden block"
                    >
                      <ProductImage
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain hover:scale-105 transition duration-200"
                        containerClassName="h-full w-full"
                      />
                    </Link>
                    <Link
                      href={item.slug ? `/products/${item.slug}` : "/"}
                      className="mt-2.5 block text-xs font-bold text-slate-900 hover:text-[#3B82F6] line-clamp-2 leading-snug"
                    >
                      {item.name}
                    </Link>
                    <div className="mt-1.5 font-extrabold text-sm text-[#172554]">{inr(item.unitPriceMinor)}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {t("purchasedOn")} {new Date(item.orderCreatedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                    </div>
                  </div>
                  <button
                    onClick={() => handleBuyAgain(item)}
                    className="mt-3 btn-amazon-primary w-full py-1.5 text-xs font-bold"
                  >
                    ⚡ {t("buyItAgain")}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )
      ) : filteredOrders?.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm space-y-3">
          <div className="text-4xl">📦</div>
          <p className="text-sm font-semibold text-slate-800">{t("noOrdersFound")}</p>
          <Link href="/" className="btn-amazon-primary inline-block px-5 py-2 text-xs font-bold">
            {t("startShopping")}
          </Link>
        </div>
      ) : (
        /* Order Cards */
        <div className="space-y-5">
          {filteredOrders?.map((o) => {
            const isCancellable = ["PENDING", "CONFIRMED", "PROCESSING"].includes(o.status);
            const isDelivered = o.status === "DELIVERED";
            const isCancelled = o.status === "CANCELLED";

            return (
              <div
                key={o.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                {/* Order Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 bg-[#F5F8FF] px-5 py-3.5 text-xs border-b border-slate-200">
                  <div className="flex flex-wrap items-center gap-6">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                        {t("orderPlaced")}
                      </span>
                      <span className="font-semibold text-slate-900">
                        {new Date(o.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                        {t("total")}
                      </span>
                      <span className="font-bold text-[#172554]">{inr(o.totalMinor)}</span>
                    </div>

                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                        {t("shipTo")}
                      </span>
                      <span className="font-medium text-slate-700">
                        {o.shippingAddress?.name || "Renzocart Customer"} ({o.shippingAddress?.city || "Chennai"})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                        {t("orderNumber")}
                      </span>
                      <span className="font-mono font-bold text-[#172554]">#{o.number}</span>
                    </div>
                    <span className="text-slate-300">|</span>
                    <button
                      onClick={() => setInvoiceModalOrder(o)}
                      className="text-[#3B82F6] hover:text-[#8B5CF6] hover:underline font-bold text-xs"
                    >
                      {t("invoice")} ▾
                    </button>
                  </div>
                </div>

                {/* Order Body */}
                <div className="p-5 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="space-y-4 flex-1">
                      {/* Status Banner */}
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                            isDelivered
                              ? "bg-emerald-100 text-emerald-800"
                              : isCancelled
                              ? "bg-rose-100 text-rose-800"
                              : "bg-blue-100 text-[#172554]"
                          }`}
                        >
                          {isDelivered
                            ? `✓ ${t("deliveredOn", { date: new Date(o.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) })}`
                            : isCancelled
                            ? `✕ ${t("orderCancelled")}`
                            : `⏳ ${o.status}: ${t("expectedTomorrow")}`}
                        </span>
                        {o.tracking?.carrier && (
                          <span className="text-[11px] text-slate-500">via {o.tracking.carrier}</span>
                        )}
                      </div>

                      {/* Items */}
                      <div className="space-y-4">
                        {o.items?.map((item: any) => (
                          <div key={item.id} className="flex gap-4">
                            <div className="h-20 w-20 rounded-xl object-contain border border-slate-100 p-1 bg-slate-50 shrink-0 overflow-hidden flex items-center justify-center">
                              <ProductImage
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-contain"
                                containerClassName="h-full w-full"
                              />
                            </div>
                            <div className="space-y-1 text-xs">
                              <Link
                                href={item.slug ? `/products/${item.slug}` : "/"}
                                className="font-bold text-slate-900 hover:text-[#3B82F6] hover:underline line-clamp-2"
                              >
                                {item.name}
                              </Link>
                              <div className="text-slate-500 font-medium">{t("qty")}: {item.quantity || 1}</div>
                              <div className="font-extrabold text-[#172554]">{inr(item.unitPriceMinor)}</div>

                              <div className="pt-2 flex flex-wrap gap-3">
                                <Link
                                  href={item.slug ? `/products/${item.slug}` : "/"}
                                  className="text-xs font-bold text-[#3B82F6] hover:underline"
                                >
                                  {t("viewItem")} &rarr;
                                </Link>

                                {isDelivered && (
                                  <button
                                    onClick={() => setReviewModalItem(item)}
                                    className="text-xs font-bold text-[#8B5CF6] hover:underline"
                                  >
                                    ★ {t("writeReview")}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Actions Column */}
                    <div className="flex flex-col gap-2 sm:w-52 text-xs shrink-0">
                      {/* Track Package */}
                      <Link
                        href={`/track?order=${encodeURIComponent(o.number)}`}
                        className="btn-amazon-primary py-2 text-center font-bold"
                      >
                        {t("trackPackage")}
                      </Link>

                      {/* Buy It Again */}
                      {o.items?.[0] && (
                        <button
                          onClick={() => handleBuyAgain(o.items[0])}
                          className="btn-amazon-light py-2 font-bold hover:border-[#3B82F6]"
                        >
                          {t("buyItAgain")}
                        </button>
                      )}

                      {/* Cancel Order (Eligible before shipped) */}
                      {isCancellable && (
                        <button
                          onClick={() => setCancelModalOrder(o)}
                          className="rounded-lg border border-rose-300 py-1.5 font-bold text-rose-700 hover:bg-rose-50 transition"
                        >
                          {t("cancelOrder")}
                        </button>
                      )}

                      {/* Request Return (Eligible delivered orders) */}
                      {isDelivered && (
                        <button
                          onClick={() => setReturnModalOrder(o)}
                          className="rounded-lg border border-slate-300 py-1.5 font-bold text-slate-700 hover:bg-slate-50 transition"
                        >
                          {t("requestReturn")}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cancel Order Modal */}
      {cancelModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-[#172554]">{t("cancelOrder")} #{cancelModalOrder.number}</h3>
              <button onClick={() => setCancelModalOrder(null)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <p className="text-xs text-slate-600">
              {t("cancelOrderModalDesc")}
            </p>

            <div className="space-y-2 text-xs">
              <label className="block font-semibold text-slate-700">{t("cancellationReason")} *</label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="input"
              >
                <option value="Ordered by mistake">Ordered by mistake</option>
                <option value="Found cheaper elsewhere">Found cheaper elsewhere</option>
                <option value="Delivery time is too long">Delivery time is too long</option>
                <option value="Need to change shipping address">Need to change shipping address</option>
                <option value="Duplicate order placed">Duplicate order placed</option>
                <option value="Other reason">Other reason</option>
              </select>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={() => setCancelModalOrder(null)}
                className="btn-amazon-light flex-1 py-2 font-semibold"
              >
                {t("keepOrder")}
              </button>
              <button
                type="button"
                disabled={cancelLoading}
                onClick={handleConfirmCancel}
                className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 flex-1 shadow"
              >
                {cancelLoading ? t("cancelling") : t("confirmCancellation")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Return Request Modal */}
      {returnModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-[#172554]">{t("requestReturn")} #{returnModalOrder.number}</h3>
              <button onClick={() => setReturnModalOrder(null)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <p className="text-xs text-slate-600">
              {t("doorstepPickupDesc")}
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">{t("returnReason")} *</label>
                <select
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  className="input"
                >
                  <option value="Defective / Item not working properly">Defective / Item not working properly</option>
                  <option value="Product damaged in transit">Product damaged in transit</option>
                  <option value="Wrong item or variant delivered">Wrong item or variant delivered</option>
                  <option value="Size / Fit not as expected">Size / Fit not as expected</option>
                  <option value="Item not as described on website">Item not as described on website</option>
                  <option value="Performance issue or poor quality">Performance issue or poor quality</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">{t("additionalComments")}</label>
                <textarea
                  rows={3}
                  placeholder={t("commentsPlaceholder")}
                  value={returnComments}
                  onChange={(e) => setReturnComments(e.target.value)}
                  className="input"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setReturnModalOrder(null)}
                className="btn-amazon-light flex-1 py-2 font-semibold"
              >
                {t("cancel")}
              </button>
              <button
                type="button"
                disabled={returnLoading}
                onClick={handleConfirmReturn}
                className="btn-amazon-primary flex-1 py-2 font-bold"
              >
                {returnLoading ? t("submittingReturn") : t("submitReturnRequest")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Write a Product Review Modal */}
      {reviewModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-[#172554]">{t("writeReview")}</h3>
              <button onClick={() => setReviewModalItem(null)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border">
              <div className="h-12 w-12 rounded-lg border border-slate-200 p-1 bg-white shrink-0 overflow-hidden flex items-center justify-center">
                <ProductImage
                  src={reviewModalItem.image}
                  alt={reviewModalItem.name}
                  className="h-full w-full object-contain"
                  containerClassName="h-full w-full"
                />
              </div>
              <span className="text-xs font-semibold text-slate-800 line-clamp-2">{reviewModalItem.name}</span>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">{t("overallRating")} *</label>
                <div className="flex items-center gap-2 text-2xl text-amber-500 cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="hover:scale-110 transition"
                    >
                      {star <= reviewRating ? "★" : "☆"}
                    </button>
                  ))}
                  <span className="text-xs text-slate-600 font-bold ml-2">{reviewRating} / 5</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">{t("addHeadline")} *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Excellent build quality and fast shipping!"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  className="input"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">{t("writeYourReview")} *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="What did you like or dislike about this product? How was the performance?"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="input"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewModalItem(null)}
                  className="btn-amazon-light flex-1 py-2 font-semibold"
                >
                  {t("cancel")}
                </button>
                <button
                  type="submit"
                  disabled={reviewLoading}
                  className="btn-amazon-primary flex-1 py-2 font-bold"
                >
                  {reviewLoading ? t("submitting") : t("submitReview")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tax Invoice Modal */}
      {invoiceModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <span className="text-xl font-black text-[#172554]">
                  Renzo<span className="text-[#3B82F6]">cart</span>
                </span>
                <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-bold">Tax Invoice</span>
              </div>
              <button onClick={() => setInvoiceModalOrder(null)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="block font-bold text-slate-800">Sold By:</span>
                <p className="text-slate-600 mt-1">
                  Renzocart India Retail Pvt. Ltd.<br />
                  Logistics Tower, Anna Salai<br />
                  Chennai, Tamil Nadu - 600001<br />
                  GSTIN: 33AAACR8921P1Z4
                </p>
              </div>
              <div>
                <span className="block font-bold text-slate-800">Billed &amp; Shipped To:</span>
                <p className="text-slate-600 mt-1">
                  {invoiceModalOrder.shippingAddress?.name || "Renzocart Customer"}<br />
                  {invoiceModalOrder.shippingAddress?.street || "42 Express Avenue"}<br />
                  {invoiceModalOrder.shippingAddress?.city || "Chennai"}, {invoiceModalOrder.shippingAddress?.state || "Tamil Nadu"} - {invoiceModalOrder.shippingAddress?.pincode || "600001"}
                </p>
              </div>
            </div>

            <div className="border-t pt-4 text-xs">
              <div className="flex justify-between py-1 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <span>Invoice No: RC-INV-{invoiceModalOrder.number}</span>
                <span>Date: {new Date(invoiceModalOrder.createdAt).toLocaleDateString("en-IN")}</span>
              </div>

              <div className="mt-2 divide-y border rounded-xl overflow-hidden">
                <div className="flex justify-between bg-slate-50 p-2.5 font-bold text-slate-700">
                  <span className="flex-1">Description</span>
                  <span className="w-16 text-center">Qty</span>
                  <span className="w-24 text-right">Price</span>
                </div>
                {invoiceModalOrder.items?.map((it: any, idx: number) => (
                  <div key={idx} className="flex justify-between p-2.5 text-slate-800">
                    <span className="flex-1 font-medium">{it.name}</span>
                    <span className="w-16 text-center">{it.quantity || 1}</span>
                    <span className="w-24 text-right font-bold">{inr(it.unitPriceMinor)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-1 text-right text-xs">
                <div className="text-slate-600">Subtotal: {inr(invoiceModalOrder.totalMinor)}</div>
                <div className="text-slate-600">Integrated GST (18% Included): {inr(Math.round(invoiceModalOrder.totalMinor * 0.18 / 1.18))}</div>
                <div className="text-base font-extrabold text-[#172554] border-t pt-1">
                  Grand Total: {inr(invoiceModalOrder.totalMinor)}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t pt-4">
              <button
                type="button"
                onClick={() => window.print()}
                className="btn-amazon-primary px-5 py-2 text-xs font-bold"
              >
                🖨️ Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading your orders...</div>}>
      <OrdersContent />
    </Suspense>
  );
}
