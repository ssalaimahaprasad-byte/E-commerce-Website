"use client";
import Link from "next/link";

interface RenzocartLogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function RenzocartLogo({
  variant = "light",
  size = "md",
  className = "",
}: RenzocartLogoProps) {
  const isLight = variant === "light"; // For dark backgrounds (like navbar #172554)
  const renzoColor = isLight ? "text-white" : "text-[#0B1536]";
  const storeColor = isLight ? "text-blue-200" : "text-[#636B99]";

  const iconSizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10 md:h-11 md:w-11",
    lg: "h-14 w-14 md:h-16 md:w-16",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl md:text-2xl",
    lg: "text-3xl md:text-4xl",
  };

  const storeSizes = {
    sm: "text-[8px] tracking-[0.25em]",
    md: "text-[9px] md:text-[10px] tracking-[0.3em]",
    lg: "text-xs md:text-sm tracking-[0.3em]",
  };

  return (
    <Link
      href="/"
      title="Renzocart - Home"
      aria-label="Renzocart Home"
      className={`inline-flex items-center gap-2.5 md:gap-3 group transition-transform active:scale-95 ${className}`}
    >
      {/* Badge Style Mark (Premium Look) */}
      <div className={`relative shrink-0 ${iconSizes[size]} flex items-center justify-center`}>
        <svg
          viewBox="0 0 206 213"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm transition-transform group-hover:scale-105"
        >
          <defs>
            <linearGradient id="renzoBadgeBg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#182A64" />
              <stop offset="100%" stopColor="#0A133E" />
            </linearGradient>
            <linearGradient id="renzoHandleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F3BF39" />
              <stop offset="100%" stopColor="#FACD52" />
            </linearGradient>
          </defs>

          {/* Dark Navy Squircle Badge */}
          <rect width="206" height="213" rx="52" fill="url(#renzoBadgeBg)" />
          <rect
            x="1"
            y="1"
            width="204"
            height="211"
            rx="51"
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1.5"
          />

          {/* Yellow / Gold Cart Handle */}
          <path
            d="M 22.0 90.0 C 21.67 90.83, 21.50 91.67, 22.0 93.0 C 22.50 94.33, 20.83 97.17, 25.0 98.0 C 29.17 98.83, 42.67 97.00, 47.0 98.0 C 51.33 99.00, 49.17 99.33, 51.0 104.0 C 52.83 108.67, 56.67 122.50, 58.0 126.0 C 59.33 129.50, 58.50 124.67, 59.0 125.0 C 59.50 125.33, 60.50 128.00, 61.0 128.0 C 61.50 128.00, 60.83 125.67, 62.0 125.0 C 63.17 124.33, 67.00 125.00, 68.0 124.0 C 69.00 123.00, 68.83 121.50, 68.0 119.0 C 67.17 116.50, 64.00 111.83, 63.0 109.0 C 62.00 106.17, 63.33 105.33, 62.0 102.0 C 60.67 98.67, 61.33 91.33, 55.0 89.0 C 48.67 86.67, 29.50 87.83, 24.0 88.0 C 18.50 88.17, 22.33 89.17, 22.0 90.0 Z"
            fill="url(#renzoHandleGrad)"
          />

          {/* White Cart Body forming stylized 'R' */}
          <path
            d="M 70.0 49.0 C 68.33 50.83, 66.83 54.00, 66.0 57.0 C 65.17 60.00, 54.67 65.00, 65.0 67.0 C 75.33 69.00, 116.33 67.50, 128.0 69.0 C 139.67 70.50, 133.67 73.33, 135.0 76.0 C 136.33 78.67, 136.83 82.00, 136.0 85.0 C 135.17 88.00, 132.00 92.17, 130.0 94.0 C 128.00 95.83, 131.00 95.67, 124.0 96.0 C 117.00 96.33, 94.33 95.67, 88.0 96.0 C 81.67 96.33, 87.00 94.33, 86.0 98.0 C 85.00 101.67, 82.17 114.33, 82.0 118.0 C 81.83 121.67, 81.00 119.17, 85.0 120.0 C 89.00 120.83, 98.83 119.17, 106.0 123.0 C 113.17 126.83, 124.50 139.33, 128.0 143.0 C 131.50 146.67, 135.33 144.83, 127.0 145.0 C 118.67 145.17, 87.50 147.33, 78.0 144.0 C 68.50 140.67, 71.83 127.50, 70.0 125.0 C 68.17 122.50, 68.17 128.17, 67.0 129.0 C 65.83 129.83, 63.83 129.50, 63.0 130.0 C 62.17 130.50, 62.33 131.83, 62.0 132.0 C 61.67 132.17, 60.17 127.83, 61.0 131.0 C 61.83 134.17, 65.33 147.00, 67.0 151.0 C 68.67 155.00, 55.67 154.33, 71.0 155.0 C 86.33 155.67, 144.00 155.83, 159.0 155.0 C 174.00 154.17, 160.83 151.67, 161.0 150.0 C 161.17 148.33, 165.00 150.50, 160.0 145.0 C 155.00 139.50, 133.17 123.00, 131.0 117.0 C 128.83 111.00, 142.83 112.50, 147.0 109.0 C 151.17 105.50, 154.00 100.50, 156.0 96.0 C 158.00 91.50, 158.83 86.17, 159.0 82.0 C 159.17 77.83, 158.17 74.50, 157.0 71.0 C 155.83 67.50, 154.33 64.17, 152.0 61.0 C 149.67 57.83, 147.17 54.50, 143.0 52.0 C 138.83 49.50, 138.17 47.00, 127.0 46.0 C 115.83 45.00, 85.50 45.50, 76.0 46.0 C 66.50 46.50, 71.67 47.17, 70.0 49.0 Z"
            fill="#FFFFFF"
          />

          {/* Cart Wheels */}
          <circle cx="87" cy="172" r="11" fill="#FFFFFF" />
          <circle cx="141" cy="172" r="11" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Renzocart Wordmark & STORE Subtitle */}
      <div className="flex flex-col select-none justify-center">
        <span className={`font-black tracking-tight leading-none ${textSizes[size]}`}>
          <span className={renzoColor}>Renzo</span>
          <span className="text-[#2563EB]">cart</span>
        </span>
        <span className={`uppercase font-bold pt-1 leading-none ${storeSizes[size]} ${storeColor}`}>
          Store
        </span>
      </div>
    </Link>
  );
}

