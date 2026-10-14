"use client";
import { useState } from "react";
import ProductImage, { DEFAULT_PRODUCT_FALLBACK_IMAGE } from "./ProductImage";

export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const safeList = images && images.length > 0 ? images : [DEFAULT_PRODUCT_FALLBACK_IMAGE];
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(false);

  return (
    <div>
      <div
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2"
        onClick={() => setZoom(!zoom)}
        role="button"
        aria-label="Toggle zoom"
      >
        <ProductImage
          src={safeList[i]}
          alt={alt}
          className={`aspect-square w-full object-contain transition-transform duration-300 ${zoom ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"}`}
          containerClassName="w-full h-full"
        />
      </div>
      {safeList.length > 1 && (
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {safeList.map((u, n) => (
            <button
              key={n}
              type="button"
              onClick={() => setI(n)}
              className={`h-16 w-16 shrink-0 cursor-pointer rounded-lg border bg-white p-1 overflow-hidden ${
                n === i ? "ring-2 ring-[#3B82F6] border-[#3B82F6]" : "border-slate-200 opacity-75 hover:opacity-100"
              }`}
            >
              <ProductImage src={u} alt={`${alt} thumbnail ${n + 1}`} className="h-full w-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
