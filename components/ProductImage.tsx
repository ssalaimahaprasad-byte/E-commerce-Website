"use client";
import { useState, useEffect } from "react";

// Clean inline SVG placeholder data URL that never fails to load (offline & network proof)
export const DEFAULT_PRODUCT_FALLBACK_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#E2E8F0"/>
    </linearGradient>
    <linearGradient id="primary" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B82F6"/>
      <stop offset="100%" stop-color="#8B5CF6"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>
  <rect x="20" y="20" width="360" height="360" rx="16" fill="none" stroke="#CBD5E1" stroke-width="2" stroke-dasharray="6 6"/>
  <g transform="translate(140, 120)">
    <rect x="0" y="30" width="120" height="110" rx="14" fill="url(#primary)" opacity="0.9"/>
    <path d="M30 30 V18 C30 8 90 8 90 18 V30" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>
    <circle cx="60" cy="85" r="14" fill="#FFFFFF" opacity="0.3"/>
    <path d="M48 85 L56 93 L74 75" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <text x="200" y="280" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#172554" text-anchor="middle" letter-spacing="1">RENZOCART</text>
  <text x="200" y="302" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="500" fill="#64748B" text-anchor="middle">Product Image</text>
</svg>
`)}`;

interface ProductImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  containerClassName?: string;
  fallbackSrc?: string;
  loading?: "lazy" | "eager";
  onLoad?: () => void;
}

export default function ProductImage({
  src,
  alt,
  className = "h-full w-full object-contain",
  containerClassName = "",
  fallbackSrc = DEFAULT_PRODUCT_FALLBACK_IMAGE,
  loading = "lazy",
  onLoad,
}: ProductImageProps) {
  const initial = (src && src.trim() !== "") ? src : fallbackSrc;
  const [currentSrc, setCurrentSrc] = useState<string>(initial);
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const valid = (src && src.trim() !== "") ? src : fallbackSrc;
    setCurrentSrc(valid);
    setHasError(false);
    setLoaded(false);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    }
  };

  const handleLoad = () => {
    setLoaded(true);
    if (onLoad) onLoad();
  };

  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${containerClassName}`}>
      {/* Subtle Skeleton placeholder while loading */}
      {!loaded && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-slate-100" />
      )}
      <img
        src={currentSrc}
        alt={alt || "Renzocart Product"}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
