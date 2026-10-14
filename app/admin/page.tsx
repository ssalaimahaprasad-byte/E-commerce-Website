"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { inr } from "@/lib/money";
import RenzocartLogo from "@/components/RenzocartLogo";
import ProductImage from "@/components/ProductImage";
import { useTranslation } from "@/lib/i18n";

const STATUSES = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"];

const CATEGORIES_LIST = [
  { id: "cat-electronics", name: "Electronics" },
  { id: "cat-mobiles", name: "Mobiles" },
  { id: "cat-computers", name: "Computers" },
  { id: "cat-fashion", name: "Fashion" },
  { id: "cat-home", name: "Home & Kitchen" },
  { id: "cat-beauty", name: "Beauty" },
  { id: "cat-grocery", name: "Grocery" },
  { id: "cat-sports", name: "Sports" },
  { id: "cat-toys", name: "Toys" },
  { id: "cat-accessories", name: "Accessories" },
];

const IMAGE_PRESETS = [
  { label: "Headphones", url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80" },
  { label: "Earbuds", url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80" },
  { label: "Smartphone", url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80" },
  { label: "Laptop", url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80" },
  { label: "Smartwatch", url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80" },
  { label: "Sneakers", url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80" },
  { label: "Air Fryer", url: "https://images.unsplash.com/photo-1584269600519-112d071b35e6?w=800&auto=format&fit=crop&q=80" },
  { label: "Backpack", url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80" },
];

export default function Admin() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"DEALS" | "ORDERS" | "RETURNS" | "INVENTORY">("DEALS");
  const [data, setData] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [deals, setDeals] = useState<any[]>([]);
  const [returns, setReturns] = useState<any[]>([]);
  const [toastMsg, setToastMsg] = useState("");

  // New Deal Modal State
  const [showAddDealModal, setShowAddDealModal] = useState(false);
  const [selectedProductForDeal, setSelectedProductForDeal] = useState<any | null>(null);
  const [dealDiscountPercent, setDealDiscountPercent] = useState(25);
  const [dealStartDate, setDealStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [dealEndDate, setDealEndDate] = useState(new Date(Date.now() + 86400000 * 14).toISOString().split("T")[0]);
  const [dealStock, setDealStock] = useState(25);
  const [dealSubmitting, setDealSubmitting] = useState(false);

  // Add / Edit Product Modal State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [prodName, setProdName] = useState("");
  const [prodBrand, setProdBrand] = useState("Renzocart");
  const [prodCategory, setProdCategory] = useState("cat-electronics");
  const [prodSku, setProdSku] = useState("");
  const [prodPriceRupees, setProdPriceRupees] = useState("1999");
  const [prodMrpRupees, setProdMrpRupees] = useState("2499");
  const [prodStock, setProdStock] = useState("25");
  const [prodImage, setProdImage] = useState(IMAGE_PRESETS[0].url);
  const [prodDesc, setProdDesc] = useState("");
  const [prodSubmitting, setProdSubmitting] = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  const loadData = async () => {
    try {
      const [orderRes, prodRes, dealsRes, returnsRes] = await Promise.all([
        fetch("/api/admin/orders"),
        fetch("/api/admin/products"),
        fetch("/api/admin/deals"),
        fetch("/api/admin/returns"),
      ]);

      if (orderRes.ok) setData(await orderRes.json());
      if (prodRes.ok) setProducts((await prodRes.json()).products || []);
      if (dealsRes.ok) setDeals((await dealsRes.json()).deals || []);
      if (returnsRes.ok) setReturns((await returnsRes.json()).returns || []);
    } catch {
      // Fallback data loading
      const pRes = await fetch("/api/products");
      if (pRes.ok) {
        const pd = await pRes.json();
        setProducts(pd.items || []);
      }
      const dRes = await fetch("/api/deals");
      if (dRes.ok) {
        const dd = await dRes.json();
        setDeals(dd.deals || []);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Today's Deals: Create Deal
  const handleCreateDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductForDeal) return;
    setDealSubmitting(true);

    try {
      const regMinor = selectedProductForDeal.mrpMinor || selectedProductForDeal.priceMinor;
      const dealMinor = Math.round(regMinor * (1 - dealDiscountPercent / 100));

      const res = await fetch("/api/admin/deals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProductForDeal.id,
          productName: selectedProductForDeal.name,
          productSlug: selectedProductForDeal.slug,
          productImage: selectedProductForDeal.images?.[0]?.url || "",
          regularPriceMinor: regMinor,
          dealPriceMinor: dealMinor,
          discountPercent: dealDiscountPercent,
          startDate: new Date(dealStartDate).toISOString(),
          endDate: new Date(dealEndDate + "T23:59:59").toISOString(),
          dealStock,
          enabled: true,
        }),
      });

      const d = await res.json();
      if (!res.ok) throw new Error(d.error || "Failed to create deal");

      showToast(`Deal created for "${selectedProductForDeal.name.slice(0, 30)}..."`);
      setShowAddDealModal(false);
      setSelectedProductForDeal(null);
      loadData();
    } catch (err: any) {
      showToast(err.message || "Failed to create deal.");
    } finally {
      setDealSubmitting(false);
    }
  };

  // Today's Deals: Toggle or Delete Deal
  const handleToggleDeal = async (dealId: string, currentEnabled: boolean) => {
    try {
      await fetch(`/api/admin/deals/${dealId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !currentEnabled }),
      });
      showToast("Deal status updated.");
      loadData();
    } catch {
      showToast("Failed to update deal status.");
    }
  };

  const handleDeleteDeal = async (dealId: string) => {
    if (!confirm("Remove this product from Today's Deals?")) return;
    try {
      await fetch(`/api/admin/deals/${dealId}`, { method: "DELETE" });
      showToast("Deal removed.");
      loadData();
    } catch {
      showToast("Failed to remove deal.");
    }
  };

  // Returns: Approve / Reject
  const handleUpdateReturn = async (id: string, status: "APPROVED" | "REJECTED" | "COMPLETED") => {
    try {
      const res = await fetch("/api/admin/returns", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error("Failed to update return");
      showToast(`Return request marked as ${status}.`);
      loadData();
    } catch (err: any) {
      showToast(err.message);
    }
  };

  // Open Add Product Modal
  const openAddProductModal = () => {
    setEditingProduct(null);
    setProdName("");
    setProdBrand("Renzocart");
    setProdCategory("cat-electronics");
    setProdSku(`RC-${Date.now().toString().slice(-6)}`);
    setProdPriceRupees("1999");
    setProdMrpRupees("2499");
    setProdStock("25");
    setProdImage(IMAGE_PRESETS[0].url);
    setProdDesc("Premium quality product with official warranty and fast doorstep delivery.");
    setShowProductModal(true);
  };

  // Open Edit Product Modal
  const openEditProductModal = (p: any) => {
    setEditingProduct(p);
    setProdName(p.name || "");
    setProdBrand(p.brand || "Renzocart");
    setProdCategory(p.categoryId || "cat-electronics");
    setProdSku(p.sku || `RC-${Date.now().toString().slice(-6)}`);
    setProdPriceRupees(String(Math.floor((p.priceMinor || 0) / 100)));
    setProdMrpRupees(String(Math.floor((p.mrpMinor || p.priceMinor || 0) / 100)));
    setProdStock(String(p.stock ?? 20));
    setProdImage(p.images?.[0]?.url || IMAGE_PRESETS[0].url);
    setProdDesc(p.description || "");
    setShowProductModal(true);
  };

  // Save Product (Add or Edit)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim()) {
      showToast("Please enter a product name");
      return;
    }
    setProdSubmitting(true);
    try {
      const priceMinor = Math.round(Number(prodPriceRupees) * 100);
      const mrpMinor = Math.round(Number(prodMrpRupees || prodPriceRupees) * 100);
      const stock = Math.max(0, parseInt(prodStock, 10) || 0);
      const slug = prodName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

      const payload = {
        name: prodName.trim(),
        brand: prodBrand.trim() || "Renzocart",
        categoryId: prodCategory,
        sku: prodSku.trim() || `SKU-${Date.now()}`,
        slug: editingProduct ? editingProduct.slug : slug,
        priceMinor,
        mrpMinor: Math.max(priceMinor, mrpMinor),
        stock,
        description: prodDesc.trim() || "Quality certified product from Renzocart.",
        imageUrls: [prodImage.trim() || IMAGE_PRESETS[0].url],
      };

      if (editingProduct) {
        const res = await fetch(`/api/admin/products/${editingProduct.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Failed to update product");
        }
        showToast(`Product "${prodName.slice(0, 24)}..." updated successfully!`);
      } else {
        const res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Failed to create product");
        }
        showToast(`Product "${prodName.slice(0, 24)}..." created successfully!`);
      }

      setShowProductModal(false);
      loadData();
    } catch (err: any) {
      showToast(err.message || "Failed to save product.");
    } finally {
      setProdSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-[#172554] px-4 py-3 text-xs font-semibold text-white shadow-2xl border border-[#3B82F6] animate-fade-in">
          <span className="text-emerald-400 font-bold">✓</span>
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg("")} className="ml-2 text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div className="flex items-center gap-3">
          <RenzocartLogo variant="dark" size="md" />
          <span className="rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-bold text-[#172554]">
            {t("adminTitle")}
          </span>
        </div>
        <Link href="/" className="btn-amazon-light text-xs font-semibold self-start sm:self-auto">
          {t("viewStorefront")} →
        </Link>
      </div>

      {/* Overview Stat Cards with Modern Visual Accents */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat k={t("activeDeals")} v={String(deals.filter((d) => d.enabled).length)} icon="⚡" tag={t("livePromotions")} />
        <Stat k={t("liveProducts")} v={String(products.length || 105)} icon="📦" tag={t("inCatalog")} />
        <Stat k={t("pendingReturns")} v={String(returns.filter((r) => r.status === "REQUESTED").length)} icon="🔄" tag={t("actionNeeded")} />
        <Stat k={t("totalOrders")} v={String(data?.orders?.length || 3)} icon="💳" tag={t("totalProcessed")} />
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex gap-4 border-b text-xs font-bold text-slate-500 overflow-x-auto">
        <button
          onClick={() => setActiveTab("DEALS")}
          className={`pb-3 flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === "DEALS" ? "border-b-2 border-[#3B82F6] text-[#172554]" : "hover:text-slate-900"
          }`}
        >
          <span>⚡ {t("todaysDealsManagement")}</span>
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] text-[#3B82F6]">{deals.length}</span>
        </button>

        <button
          onClick={() => setActiveTab("RETURNS")}
          className={`pb-3 flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === "RETURNS" ? "border-b-2 border-[#3B82F6] text-[#172554]" : "hover:text-slate-900"
          }`}
        >
          <span>🔄 {t("returnsAndRefunds")}</span>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] text-amber-800">{returns.length}</span>
        </button>

        <button
          onClick={() => setActiveTab("ORDERS")}
          className={`pb-3 flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === "ORDERS" ? "border-b-2 border-[#3B82F6] text-[#172554]" : "hover:text-slate-900"
          }`}
        >
          <span>📋 {t("customerOrders")}</span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-700">{data?.orders?.length || 0}</span>
        </button>

        <button
          onClick={() => setActiveTab("INVENTORY")}
          className={`pb-3 flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === "INVENTORY" ? "border-b-2 border-[#3B82F6] text-[#172554]" : "hover:text-slate-900"
          }`}
        >
          <span>📊 {t("productStockAndCatalog")}</span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-700">{products.length}</span>
        </button>
      </div>

      {/* TAB 1: TODAY'S DEALS MANAGEMENT */}
      {activeTab === "DEALS" && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
            <div>
              <h2 className="text-lg font-extrabold text-[#172554]">{t("todaysDealsManagement")}</h2>
              <p className="text-xs text-slate-500">
                {t("dealsDesc")}
              </p>
            </div>
            <button
              onClick={() => {
                if (products.length > 0) setSelectedProductForDeal(products[0]);
                setShowAddDealModal(true);
              }}
              className="btn-amazon-primary px-4 py-2 text-xs font-bold"
            >
              {t("addProductToDeals")}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-slate-50 text-left text-slate-600">
                  <th className="p-3">{t("productOnOffer")}</th>
                  <th className="p-3">{t("discount")}</th>
                  <th className="p-3">{t("dealPrice")}</th>
                  <th className="p-3">{t("dealDates")}</th>
                  <th className="p-3">{t("dealStockLabel")}</th>
                  <th className="p-3">{t("dealStatus")}</th>
                  <th className="p-3 text-right">{t("dealActions")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {deals.map((deal) => {
                  const now = new Date().toISOString();
                  const isExpired = deal.endDate < now;
                  const isScheduled = deal.startDate > now;

                  return (
                    <tr key={deal.id} className="hover:bg-slate-50 transition">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg border border-slate-200 bg-white p-1 shrink-0 overflow-hidden flex items-center justify-center">
                            <ProductImage
                              src={deal.productImage}
                              alt={deal.productName}
                              className="h-full w-full object-contain"
                              containerClassName="h-full w-full"
                            />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 line-clamp-1 max-w-xs block">{deal.productName}</span>
                            <span className="font-mono text-[10px] text-slate-400">ID: {deal.id}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-3">
                        <span className="rounded bg-rose-100 px-2 py-0.5 text-xs font-black text-rose-700">
                          {deal.discountPercent}% OFF
                        </span>
                      </td>

                      <td className="p-3 font-bold text-[#172554]">
                        {inr(deal.dealPriceMinor)}
                        <span className="block text-[10px] text-slate-400 line-through">
                          {inr(deal.regularPriceMinor)}
                        </span>
                      </td>

                      <td className="p-3 text-[11px] text-slate-600">
                        <div>{new Date(deal.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</div>
                        <div className="text-slate-400">to {new Date(deal.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div>
                      </td>

                      <td className="p-3">
                        <span className="font-semibold text-slate-800">{deal.dealStock - (deal.soldCount || 0)}</span>
                        <span className="text-[10px] text-slate-400 block">{deal.soldCount || 0} sold</span>
                      </td>

                      <td className="p-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            !deal.enabled
                              ? "bg-slate-200 text-slate-700"
                              : isExpired
                              ? "bg-red-100 text-red-800"
                              : isScheduled
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {!deal.enabled ? t("disabled") : isExpired ? t("expired") : isScheduled ? t("scheduled") : t("activeLive")}
                        </span>
                      </td>

                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => handleToggleDeal(deal.id, deal.enabled)}
                          className="rounded-lg border border-slate-300 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100"
                        >
                          {deal.enabled ? t("disable") : t("enable")}
                        </button>
                        <button
                          onClick={() => handleDeleteDeal(deal.id)}
                          className="rounded-lg border border-red-200 px-2.5 py-1 text-[11px] font-bold text-red-600 hover:bg-red-50"
                        >
                          {t("delete")}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* TAB 2: RETURNS & REFUNDS */}
      {activeTab === "RETURNS" && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-extrabold text-[#172554]">Order Returns &amp; Refund Processing</h2>
            <p className="text-xs text-slate-500">
              Review customer return requests, approve doorstep logistics pickups, and trigger gateway refund settlements.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-slate-50 text-left text-slate-600">
                  <th className="p-3">Return ID / Order #</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Return Reason &amp; Comments</th>
                  <th className="p-3">Refund Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Approve / Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {returns.map((ret) => (
                  <tr key={ret.id} className="hover:bg-slate-50">
                    <td className="p-3">
                      <span className="font-bold text-[#3B82F6]">#{ret.orderNumber || ret.orderId}</span>
                      <span className="block font-mono text-[10px] text-slate-400">{ret.id}</span>
                    </td>
                    <td className="p-3">
                      <span className="font-medium text-slate-900">{ret.customerEmail}</span>
                    </td>
                    <td className="p-3 max-w-xs">
                      <span className="font-bold text-slate-800 block">{ret.reason}</span>
                      {ret.comments && <span className="text-[11px] text-slate-500 italic block">{ret.comments}</span>}
                    </td>
                    <td className="p-3 font-bold text-[#172554]">
                      {inr(ret.refundAmountMinor || 239900)}
                      <span className="block text-[10px] text-slate-400 font-mono">{ret.refundTxRef || "PENDING"}</span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          ret.status === "APPROVED"
                            ? "bg-blue-100 text-[#172554]"
                            : ret.status === "COMPLETED"
                            ? "bg-emerald-100 text-emerald-800"
                            : ret.status === "REJECTED"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {ret.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1.5">
                      {ret.status === "REQUESTED" && (
                        <>
                          <button
                            onClick={() => handleUpdateReturn(ret.id, "APPROVED")}
                            className="rounded-lg bg-[#3B82F6] px-2.5 py-1 text-[11px] font-bold text-white hover:bg-[#2563EB]"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleUpdateReturn(ret.id, "REJECTED")}
                            className="rounded-lg border border-red-300 px-2.5 py-1 text-[11px] font-bold text-red-600 hover:bg-red-50"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {ret.status === "APPROVED" && (
                        <button
                          onClick={() => handleUpdateReturn(ret.id, "COMPLETED")}
                          className="rounded-lg bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-emerald-700"
                        >
                          Mark Refund Completed
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* TAB 3: CUSTOMER ORDERS (WITH PRODUCT THUMBNAILS FOR ITEMS INCLUDED) */}
      {activeTab === "ORDERS" && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
            <div>
              <h2 className="text-lg font-extrabold text-[#172554]">Recent Customer Orders</h2>
              <p className="text-xs text-slate-500">
                Track order delivery lifecycle, view customer details, and inspect items in each package.
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-slate-50 text-left text-slate-600">
                  <th className="p-3">Order #</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Items Included (Thumbnails)</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data?.orders?.map((o: any) => (
                  <tr key={o.id} className="hover:bg-slate-50 transition">
                    <td className="p-3">
                      <span className="font-bold text-[#3B82F6]">#{o.number}</span>
                      <span className="block text-[10px] text-slate-400">
                        {new Date(o.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="font-semibold text-slate-900 block">{o.shippingAddress?.name || "Customer"}</span>
                      <span className="text-slate-500 text-[11px] block">{o.user?.email || "customer@renzocart.in"}</span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        {o.items && o.items.length > 0 ? (
                          o.items.map((it: any, itIdx: number) => (
                            <div
                              key={itIdx}
                              className="relative flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-1 hover:border-[#3B82F6] transition shadow-xs"
                              title={`${it.name} (Qty: ${it.quantity || 1})`}
                            >
                              <div className="h-10 w-10 shrink-0 overflow-hidden rounded bg-slate-50 flex items-center justify-center">
                                <ProductImage
                                  src={it.image}
                                  alt={it.name}
                                  className="h-full w-full object-contain"
                                  containerClassName="h-full w-full"
                                />
                              </div>
                              <div className="max-w-[130px] hidden sm:block">
                                <span className="block text-[11px] font-semibold text-slate-800 truncate">{it.name}</span>
                                <span className="block text-[10px] text-slate-500">Qty: {it.quantity || 1} • {inr(it.unitPriceMinor)}</span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <span className="text-slate-400 italic text-[11px]">No items listed</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3 font-bold text-[#172554]">{inr(o.totalMinor)}</td>
                    <td className="p-3">
                      <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                        {o.payment?.status || "PAID"}
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">{o.payment?.method || "Online"}</span>
                    </td>
                    <td className="p-3">
                      <select
                        className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-800"
                        value={o.status}
                        onChange={async (e) => {
                          await fetch("/api/admin/orders", {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ number: o.number, status: e.target.value }),
                          }).catch(() => {});
                          loadData();
                        }}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* TAB 4: PRODUCT INVENTORY (WITH IMAGES, CATEGORY, PRICE, STOCK & EDIT) */}
      {activeTab === "INVENTORY" && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
            <div>
              <h2 className="text-lg font-extrabold text-[#172554]">Product Stock &amp; Inventory ({products.length} Items)</h2>
              <p className="text-xs text-slate-500">
                View live product pictures, update stock units, edit specifications, or add new items to the catalog.
              </p>
            </div>
            <button
              onClick={openAddProductModal}
              className="btn-amazon-primary px-4 py-2 text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <span className="text-sm">+</span>
              <span>Add New Product</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-slate-50 text-left text-slate-600">
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock Units</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.slice(0, 50).map((p) => {
                  const pImg = p.images?.[0]?.url || "";
                  const catName = p.category?.name || p.categoryId?.replace("cat-", "").toUpperCase() || "General";

                  return (
                    <tr key={p.id} className="hover:bg-slate-50 transition">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg border border-slate-200 bg-white p-1 shrink-0 overflow-hidden flex items-center justify-center">
                            <ProductImage
                              src={pImg}
                              alt={p.name}
                              className="h-full w-full object-contain"
                              containerClassName="h-full w-full"
                            />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 line-clamp-1 max-w-sm block">{p.name}</span>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{p.brand}</span>
                              <span className="text-slate-300">•</span>
                              <span className="font-mono text-[10px] text-slate-400">SKU: {p.sku}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="p-3">
                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-[#3B82F6]">
                          {catName}
                        </span>
                      </td>

                      <td className="p-3 font-bold text-[#172554]">
                        {inr(p.priceMinor)}
                        {p.mrpMinor > p.priceMinor && (
                          <span className="block text-[10px] text-slate-400 line-through">
                            {inr(p.mrpMinor)}
                          </span>
                        )}
                      </td>

                      <td className="p-3">
                        <input
                          type="number"
                          min={0}
                          defaultValue={p.stock}
                          className="w-20 rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold"
                          onBlur={(e) =>
                            fetch(`/api/admin/products/${p.id}`, {
                              method: "PATCH",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ stock: +e.target.value }),
                            }).catch(() => {})
                          }
                        />
                      </td>

                      <td className="p-3">
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                          Active
                        </span>
                      </td>

                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => openEditProductModal(p)}
                          className="rounded-lg border border-slate-300 px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-100 transition"
                        >
                          Edit
                        </button>
                        <Link
                          href={`/products/${p.slug}`}
                          target="_blank"
                          className="rounded-lg border border-blue-200 px-2.5 py-1 text-[11px] font-bold text-[#3B82F6] hover:bg-blue-50 transition inline-block"
                        >
                          View ↗
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Add Deal Modal with Product Image Preview */}
      {showAddDealModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-[#172554]">Add Product to Today's Deals</h3>
              <button onClick={() => setShowAddDealModal(false)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateDeal} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Catalog Product *</label>
                <select
                  value={selectedProductForDeal?.id || ""}
                  onChange={(e) => {
                    const found = products.find((p) => p.id === e.target.value);
                    if (found) setSelectedProductForDeal(found);
                  }}
                  className="input"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name.slice(0, 65)}... ({inr(p.priceMinor)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Product Picture & Discount Preview Card */}
              {selectedProductForDeal && (
                <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/40 p-3 shadow-xs">
                  <div className="h-16 w-16 rounded-lg border bg-white p-1 shrink-0 overflow-hidden flex items-center justify-center">
                    <ProductImage
                      src={selectedProductForDeal.images?.[0]?.url}
                      alt={selectedProductForDeal.name}
                      className="h-full w-full object-contain"
                      containerClassName="h-full w-full"
                    />
                  </div>
                  <div className="flex-1 text-xs">
                    <span className="font-bold text-slate-900 line-clamp-1">{selectedProductForDeal.name}</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-emerald-700 font-extrabold">
                        Deal Price: {inr(Math.round((selectedProductForDeal.mrpMinor || selectedProductForDeal.priceMinor) * (1 - dealDiscountPercent / 100)))}
                      </span>
                      <span className="text-slate-400 line-through text-[11px]">
                        {inr(selectedProductForDeal.mrpMinor || selectedProductForDeal.priceMinor)}
                      </span>
                    </div>
                    <span className="text-[10px] text-rose-600 font-bold">{dealDiscountPercent}% Instant Savings</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Discount Percentage (%) *</label>
                  <input
                    type="number"
                    min={1}
                    max={90}
                    value={dealDiscountPercent}
                    onChange={(e) => setDealDiscountPercent(+e.target.value)}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Deal Inventory Units *</label>
                  <input
                    type="number"
                    min={1}
                    value={dealStock}
                    onChange={(e) => setDealStock(+e.target.value)}
                    className="input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Start Date *</label>
                  <input
                    type="date"
                    value={dealStartDate}
                    onChange={(e) => setDealStartDate(e.target.value)}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">End Date *</label>
                  <input
                    type="date"
                    value={dealEndDate}
                    onChange={(e) => setDealEndDate(e.target.value)}
                    className="input"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddDealModal(false)}
                  className="btn-amazon-light flex-1 py-2 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={dealSubmitting}
                  className="btn-amazon-primary flex-1 py-2 font-bold"
                >
                  {dealSubmitting ? "Saving..." : "Save Today's Deal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal with Live Picture Preview */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-[#172554]">
                  {editingProduct ? "Edit Product Details" : "Add New Product to Catalog"}
                </h3>
                <p className="text-xs text-slate-500">
                  {editingProduct ? `Updating SKU: ${editingProduct.sku}` : "Enter product information and image URL below."}
                </p>
              </div>
              <button
                onClick={() => setShowProductModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              {/* Live Picture Preview Box */}
              <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                <span className="block text-[11px] font-bold text-[#172554] uppercase tracking-wider mb-2">
                  Live Product Picture Preview
                </span>
                <div className="flex items-center gap-4">
                  <div className="h-24 w-24 rounded-xl border border-slate-200 bg-white p-2 shrink-0 overflow-hidden flex items-center justify-center shadow-sm">
                    <ProductImage
                      src={prodImage}
                      alt={prodName || "Preview"}
                      className="h-full w-full object-contain"
                      containerClassName="h-full w-full"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <span className="font-bold text-slate-900 block line-clamp-1">
                      {prodName || "Sample Product Title"}
                    </span>
                    <span className="text-slate-500 block text-[11px]">
                      Brand: <b className="text-slate-700">{prodBrand || "Renzocart"}</b> • Category: <b className="text-[#3B82F6]">{CATEGORIES_LIST.find(c => c.id === prodCategory)?.name || prodCategory}</b>
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-extrabold text-[#172554]">
                        ₹{Number(prodPriceRupees || 0).toLocaleString("en-IN")}
                      </span>
                      {Number(prodMrpRupees || 0) > Number(prodPriceRupees || 0) && (
                        <span className="text-slate-400 line-through text-[11px]">
                          ₹{Number(prodMrpRupees).toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Title */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sony WH-1000XM5 Wireless Headphones"
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  className="input"
                />
              </div>

              {/* Brand and Category */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Brand Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sony, Apple, Nike"
                    value={prodBrand}
                    onChange={(e) => setProdBrand(e.target.value)}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="input"
                  >
                    {CATEGORIES_LIST.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price, MRP, Stock */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    placeholder="1999"
                    value={prodPriceRupees}
                    onChange={(e) => setProdPriceRupees(e.target.value)}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">MRP (₹) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    placeholder="2499"
                    value={prodMrpRupees}
                    onChange={(e) => setProdMrpRupees(e.target.value)}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Stock Units *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    placeholder="25"
                    value={prodStock}
                    onChange={(e) => setProdStock(e.target.value)}
                    className="input"
                  />
                </div>
              </div>

              {/* Image URL with Preset Buttons */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Product Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/photo-..."
                  value={prodImage}
                  onChange={(e) => setProdImage(e.target.value)}
                  className="input font-mono text-xs"
                />
                <div className="mt-2">
                  <span className="text-[10px] text-slate-500 font-bold block mb-1">Or choose a quick image preset:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {IMAGE_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setProdImage(preset.url)}
                        className={`rounded px-2 py-0.5 text-[10px] font-semibold transition ${
                          prodImage === preset.url
                            ? "bg-[#3B82F6] text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Product Description</label>
                <textarea
                  rows={2}
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  placeholder="Key features, warranty, and package contents..."
                  className="input resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="btn-amazon-light flex-1 py-2 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={prodSubmitting}
                  className="btn-amazon-primary flex-1 py-2 font-bold"
                >
                  {prodSubmitting ? "Saving..." : editingProduct ? "Update Product" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const Stat = ({ k, v, icon, tag }: { k: string; v: string; icon: string; tag?: string }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between gap-4 hover:shadow-md transition">
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F5F8FF] text-2xl shadow-inner border border-blue-100">
        {icon}
      </div>
      <div>
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{k}</div>
        <div className="text-2xl font-black text-[#172554] mt-0.5">{v}</div>
      </div>
    </div>
    {tag && (
      <span className="text-[10px] font-bold text-[#3B82F6] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
        {tag}
      </span>
    )}
  </div>
);
