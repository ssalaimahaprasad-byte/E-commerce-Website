"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import RenzocartLogo from "@/components/RenzocartLogo";
import { useTranslation } from "@/lib/i18n";
import ProductImage from "@/components/ProductImage";

function TrackContent() {
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const initialOrder = searchParams?.get("order") || "";
  const [searchTerm, setSearchTerm] = useState(initialOrder);
  const [trackingData, setTrackingData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTracking = async (orderIdOrNumber: string) => {
    if (!orderIdOrNumber.trim()) return;
    setLoading(true);
    setError("");
    setTrackingData(null);

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(orderIdOrNumber.trim())}/track`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order not found");
      setTrackingData(data);
    } catch (err: any) {
      setError(err.message || "Failed to locate tracking details for this order.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrder) {
      setSearchTerm(initialOrder);
      fetchTracking(initialOrder);
    }
  }, [initialOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTracking(searchTerm);
  };

  return (
    <div className="mx-auto max-w-4xl py-6 space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-12 space-y-6">
        <div className="flex items-center justify-between border-b pb-6">
          <RenzocartLogo variant="dark" size="lg" />
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#3B82F6]">
            {t("realTimeTracking")}
          </span>
        </div>

        <h1 className="text-3xl font-extrabold text-[#172554]">{t("trackYourPackage")}</h1>
        <p className="text-xs text-slate-600">
          {t("trackPackageDesc")}
        </p>

        {/* Search input form */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            required
            placeholder={t("orderNumberOrAwbPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input flex-1 text-xs"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-amazon-primary px-6 py-2.5 text-xs font-bold"
          >
            {loading ? t("locating") : t("trackPackage")}
          </button>
        </form>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-800">
            {error}
          </div>
        )}

        {/* Tracking Details Display */}
        {trackingData && (
          <div className="mt-8 space-y-6 border-t pt-6">
            <div className="grid gap-4 sm:grid-cols-3 rounded-xl border border-slate-100 bg-[#F5F8FF] p-5 text-xs">
              <div>
                <span className="block text-slate-500 uppercase tracking-wider text-[10px]">{t("orderNumber")}</span>
                <span className="font-bold text-[#172554] text-sm">#{trackingData.orderNumber}</span>
              </div>
              <div>
                <span className="block text-slate-500 uppercase tracking-wider text-[10px]">{t("carrier")} &amp; AWB</span>
                <span className="font-semibold text-slate-900">{trackingData.carrier}</span>
                <span className="block font-mono text-slate-500 text-[11px]">{trackingData.awbNumber}</span>
              </div>
              <div>
                <span className="block text-slate-500 uppercase tracking-wider text-[10px]">{t("estimatedDelivery")}</span>
                <span className="font-bold text-green-700 text-sm">{trackingData.estimatedDelivery}</span>
              </div>
            </div>

            {/* Cancelled Banner */}
            {trackingData.isCancelled && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-xs text-red-800">
                <b>{t("orderCancelled")}:</b> {trackingData.cancellationReason || "Cancelled by customer request."}
              </div>
            )}

            {/* 6-Stage Visual Timeline */}
            <div>
              <h3 className="font-bold text-[#172554] text-sm mb-4">{t("shipmentProgressTimeline")}</h3>
              <div className="space-y-4">
                {trackingData.steps?.map((step: any, idx: number) => {
                  return (
                    <div key={idx} className="flex items-start gap-4">
                      {/* Step Indicator */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                            step.completed
                              ? "bg-green-600 text-white shadow-sm"
                              : step.current
                              ? "bg-[#3B82F6] text-white ring-4 ring-blue-100"
                              : "bg-slate-200 text-slate-500"
                          }`}
                        >
                          {step.completed ? "✓" : idx + 1}
                        </div>
                        {idx < trackingData.steps.length - 1 && (
                          <div
                            className={`w-0.5 h-8 my-1 ${
                              step.completed ? "bg-green-500" : "bg-slate-200"
                            }`}
                          />
                        )}
                      </div>

                      {/* Step Details */}
                      <div className="flex-1 pb-2">
                        <div className="flex items-baseline justify-between">
                          <span
                            className={`text-xs font-bold ${
                              step.completed ? "text-slate-900" : "text-slate-500"
                            }`}
                          >
                            {step.name}
                          </span>
                          <span className="text-[11px] text-slate-400">{step.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Items */}
            {trackingData.items && trackingData.items.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="font-bold text-[#172554] text-xs mb-3">{t("itemsInThisPackage")}</h4>
                <div className="space-y-3">
                  {trackingData.items.map((item: any, i: number) => (
                    <div key={i} className="flex items-center gap-3 text-xs">
                      <div className="h-12 w-12 rounded-lg object-contain border border-slate-100 p-0.5 bg-white shrink-0 overflow-hidden flex items-center justify-center">
                        <ProductImage
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain"
                          containerClassName="h-full w-full"
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800 line-clamp-1">{item.name}</span>
                        <span className="text-slate-500 text-[11px]">{t("qty")}: {item.quantity || 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading package tracking...</div>}>
      <TrackContent />
    </Suspense>
  );
}
