"use client";
import { useState } from "react";
import ProductImage, { DEFAULT_PRODUCT_FALLBACK_IMAGE } from "./ProductImage";

interface ProductImageGalleryProps {
  images: { id?: string; url: string; position?: number }[];
  productName: string;
  isBestSeller?: boolean;
}

export default function ProductImageGallery({
  images,
  productName,
  isBestSeller,
}: ProductImageGalleryProps) {
  const safeImages = images && images.length > 0 ? images : [{ url: DEFAULT_PRODUCT_FALLBACK_IMAGE, position: 0 }];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const activeImage = safeImages[selectedIndex] || safeImages[0];

  return (
    <div className="space-y-4">
      {/* Main Image Frame */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm flex items-center justify-center p-4 group">
        <div
          className={`h-full w-full flex items-center justify-center cursor-zoom-in transition-transform duration-300 ${
            isZoomed ? "scale-125" : "group-hover:scale-105"
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
          title="Click to toggle zoom"
        >
          <ProductImage
            src={activeImage.url}
            alt={productName}
            className="max-h-[420px] w-full object-contain p-2"
            containerClassName="w-full h-full"
            loading="eager"
          />
        </div>

        {/* Badges */}
        {isBestSeller && (
          <span className="absolute left-3 top-3 rounded-md bg-[#8B5CF6] px-2.5 py-1 text-xs font-black uppercase tracking-wider text-white shadow-sm">
            #1 Best Seller
          </span>
        )}

        {/* Zoom Hint */}
        <button
          type="button"
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute right-3 bottom-3 rounded-full bg-white/90 p-2 text-slate-600 shadow-md hover:bg-white hover:text-[#3B82F6] transition"
          aria-label="Toggle image zoom"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
        </button>
      </div>

      {/* Thumbnails Row */}
      {safeImages.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-thin">
          {safeImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSelectedIndex(idx);
                setIsZoomed(false);
              }}
              className={`h-16 w-16 sm:h-20 sm:w-20 rounded-xl border-2 p-1.5 overflow-hidden bg-white shrink-0 transition-all ${
                selectedIndex === idx
                  ? "border-[#3B82F6] ring-2 ring-[#3B82F6]/20 shadow-md"
                  : "border-slate-200 hover:border-slate-400 opacity-80 hover:opacity-100"
              }`}
            >
              <ProductImage
                src={img.url}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="h-full w-full object-contain"
                containerClassName="h-full w-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
