"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addToCart } from "@/lib/cart";
import { useTranslation } from "@/lib/i18n";

export default function AddButtons({
  p,
}: {
  p: { id: string; slug: string; name: string; priceMinor: number; image: string; stock: number };
}) {
  const [q, setQ] = useState(1);
  const [msg, setMsg] = useState("");
  const router = useRouter();
  const { t } = useTranslation();
  const line = { productId: p.id, slug: p.slug, name: p.name, priceMinor: p.priceMinor, image: p.image };

  return (
    <div className="space-y-3 pt-1">
      <div className="flex items-center gap-2 text-xs">
        <label htmlFor="qtySelect" className="font-semibold text-slate-700">{t("qty")}:</label>
        <select
          id="qtySelect"
          className="rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-800 shadow-sm hover:bg-slate-100 focus:outline-none"
          value={q}
          onChange={(e) => setQ(+e.target.value)}
        >
          {Array.from({ length: Math.min(10, Math.max(1, p.stock)) }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <button
          className="btn-amazon-primary w-full py-2.5 text-xs font-bold"
          disabled={p.stock < 1}
          onClick={() => {
            addToCart(line, q);
            setMsg(t("addedToCart"));
            setTimeout(() => setMsg(""), 3500);
          }}
        >
          {t("addToCart")}
        </button>
        <button
          className="btn-amazon-secondary w-full py-2.5 text-xs font-bold"
          disabled={p.stock < 1}
          onClick={() => {
            addToCart(line, q);
            router.push("/checkout");
          }}
        >
          {t("buyNow")}
        </button>
      </div>

      {msg && (
        <div role="status" className="flex items-center justify-between rounded-lg bg-green-50 p-2 text-xs font-semibold text-green-800 border border-green-200">
          <span>{msg}</span>
          <Link href="/cart" className="text-[#3B82F6] font-bold hover:underline">
            {t("cart")} →
          </Link>
        </div>
      )}
    </div>
  );
}
