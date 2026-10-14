"use client";
import { useState } from "react";
import Link from "next/link";
import RenzocartLogo from "@/components/RenzocartLogo";

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: "Orders",
    q: "How do I check the status of my Renzocart order?",
    a: "You can track your order at any time by visiting the 'Your Orders' page or using our dedicated 'Track Order' tool. You will see a 6-stage timeline from Order Placed to Delivered, along with your live AWB number and courier partner details.",
  },
  {
    category: "Orders",
    q: "Can I cancel an order after placing it?",
    a: "Yes. You can cancel any order as long as it is in PENDING, CONFIRMED, or PROCESSING state. Navigate to 'Your Orders', click 'Cancel Order', select your reason, and confirm. Once an item has been SHIPPED, it cannot be cancelled; however, you can return it upon delivery.",
  },
  {
    category: "Orders",
    q: "What is 'Buy It Again'?",
    a: "'Buy It Again' lets you re-order items from your purchase history with a single click. Renzocart validates the current real-time stock and live selling price before adding it to your cart.",
  },
  {
    category: "Shipping",
    q: "What are Renzocart's delivery timelines?",
    a: "Orders to metropolitan areas (Delhi NCR, Mumbai, Chennai, Bangalore, Hyderabad, Kolkata) typically arrive within 24–48 hours via Express Delivery. Tier-2 and Tier-3 cities receive deliveries within 2 to 4 business days.",
  },
  {
    category: "Shipping",
    q: "How do I check if delivery is available to my PIN code?",
    a: "Click 'Deliver to' in the header navigation and enter your 6-digit Indian PIN code. Our serviceability engine will immediately display delivery estimates and availability for your area.",
  },
  {
    category: "Returns",
    q: "What is the return policy window on Renzocart?",
    a: "Eligible items can be returned within 7 days of delivery. From 'Your Orders', click 'Request Return', select your reason (e.g., size issue, defective item, wrong product), and our team will arrange a free doorstep pickup.",
  },
  {
    category: "Returns",
    q: "When will my refund be processed?",
    a: "Refunds for UPI payments are credited within 24 to 48 hours following inspection. Credit/debit card refunds reflect in 3 to 5 business days depending on your issuing bank.",
  },
  {
    category: "Payments",
    q: "What payment methods are supported?",
    a: "We support all major payment modes including UPI (Google Pay, PhonePe, Paytm), Credit & Debit Cards (Visa, Mastercard, RuPay), Net Banking across 50+ Indian banks, and Cash on Delivery (COD) for eligible PIN codes.",
  },
  {
    category: "Payments",
    q: "How can I download a tax invoice for my purchase?",
    a: "You can view or print an itemized GST tax invoice for any order directly from the 'Your Orders' page by clicking the 'Invoice' button on the order card.",
  },
];

import { useTranslation } from "@/lib/i18n";

export default function FAQPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = [
    { key: "All", labelKey: "allCategories" },
    { key: "Orders", labelKey: "yourOrders" },
    { key: "Shipping", labelKey: "shippingPolicy" },
    { key: "Returns", labelKey: "returns" },
    { key: "Payments", labelKey: "payment" },
  ];

  const filteredFaqs = selectedCategory === "All"
    ? FAQS
    : FAQS.filter((f) => f.category === selectedCategory);

  return (
    <div className="mx-auto max-w-4xl py-6 space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
        <div className="mb-6 flex items-center justify-between border-b pb-6">
          <RenzocartLogo variant="dark" size="lg" />
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#3B82F6]">
            {t("helpFaqs")}
          </span>
        </div>

        <h1 className="text-3xl font-extrabold text-[#172554]">{t("frequentlyAskedQuestions")}</h1>
        <p className="mt-2 text-sm text-slate-600">
          {t("faqSubtitle")}
        </p>

        {/* Category Filters */}
        <div className="mt-6 flex flex-wrap gap-2 border-b pb-4">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setSelectedCategory(c.key)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                selectedCategory === c.key
                  ? "bg-[#172554] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {t(c.labelKey)}
            </button>
          ))}
        </div>

        {/* Accordion FAQ Items */}
        <div className="mt-6 divide-y divide-slate-100">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between text-left text-sm font-bold text-[#172554] transition hover:text-[#3B82F6]"
                >
                  <span>{faq.q}</span>
                  <span className="ml-4 text-base font-bold text-[#8B5CF6]">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-3 text-xs leading-relaxed text-slate-600 animate-fade-in">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 border-t pt-6 flex items-center justify-between text-xs text-slate-600">
          <span>{t("didNotFindLookingFor")}</span>
          <Link href="/contact" className="font-bold text-[#3B82F6] hover:underline">
            {t("contactUs")} &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
