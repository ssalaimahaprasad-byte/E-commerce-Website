import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import { LanguageProvider } from "@/lib/i18n";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  title: "Renzocart – Online Shopping India: Mobiles, Electronics, Fashion, Home & More",
  description: "Renzocart: India's premier online shopping destination. Discover electronics, fashion, home essentials, groceries, and today's top deals with fast, reliable delivery.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Noto+Sans+Tamil:wght@400;500;600;700&family=Noto+Sans+Malayalam:wght@400;500;600;700&family=Noto+Sans+Kannada:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-[#F5F8FF] text-[#0F172A]">
        <LanguageProvider>
          <Suspense fallback={<header className="h-20 bg-[#172554] w-full" />}>
            <Header />
          </Suspense>

          {/* Main Content Container */}
          <main className="mx-auto w-full max-w-[1500px] flex-1 px-3 py-6 md:px-6">
            {children}
          </main>

          {/* Renzocart Modern Multi-Tier Footer with 5-Language Support */}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

