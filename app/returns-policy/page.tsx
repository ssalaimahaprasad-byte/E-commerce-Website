import Link from "next/link";
import RenzocartLogo from "@/components/RenzocartLogo";

export const metadata = {
  title: "Return & Refund Policy – Renzocart",
  description: "Learn about Renzocart's 7-day hassle-free return window, doorstep pickup, and verified refund procedures.",
};

export default function ReturnsPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl py-6 space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-12 space-y-6">
        <div className="flex items-center justify-between border-b pb-6">
          <RenzocartLogo variant="dark" size="lg" />
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#3B82F6]">
            7-Day Return Window
          </span>
        </div>

        <h1 className="text-3xl font-extrabold text-[#172554]">Return and Refund Policy</h1>

        <section className="space-y-3 text-xs leading-relaxed text-slate-700">
          <h2 className="text-base font-bold text-[#172554]">1. 7-Day Hassle-Free Returns</h2>
          <p>
            At Renzocart, we want you to be completely delighted with your purchase. Eligible products may be returned within <b>7 days of delivery</b> for a full refund or replacement.
          </p>
        </section>

        <section className="space-y-3 text-xs leading-relaxed text-slate-700">
          <h2 className="text-base font-bold text-[#172554]">2. How to Request a Return</h2>
          <ol className="list-decimal pl-5 space-y-1.5">
            <li>Go to <Link href="/orders" className="text-[#3B82F6] font-semibold hover:underline">Your Orders</Link> and select the delivered order.</li>
            <li>Click the <b>Request Return</b> button.</li>
            <li>Select the return reason (e.g. Defective, Damaged in transit, Size/Fit issue, Wrong item).</li>
            <li>Add optional comments and submit your request.</li>
            <li>Our logistics partner will schedule a free doorstep pickup within 48 hours.</li>
          </ol>
        </section>

        <section className="space-y-3 text-xs leading-relaxed text-slate-700">
          <h2 className="text-base font-bold text-[#172554]">3. Refund Timelines &amp; Methods</h2>
          <p>
            Refunds are initiated immediately upon completion of pickup inspection at our distribution center:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><b>UPI / Instant Payment:</b> Refund credited within 24 to 48 hours to original VPA.</li>
            <li><b>Credit &amp; Debit Cards:</b> Reflects on your statement in 3 to 5 business days.</li>
            <li><b>Net Banking:</b> 3 to 7 business days depending on beneficiary bank clearing.</li>
            <li><b>Cash on Delivery:</b> Transferred via secure NEFT/IMPS to your verified bank account.</li>
          </ul>
        </section>

        <section className="space-y-3 text-xs leading-relaxed text-slate-700">
          <h2 className="text-base font-bold text-[#172554]">4. Non-Returnable Categories</h2>
          <p>
            In accordance with health, hygiene, and copyright standards, the following items are non-returnable unless received defective or damaged:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Perishable grocery items and opened food products</li>
            <li>Innerwear, swimwear, and personal hygiene products</li>
            <li>Digital software codes and gift vouchers</li>
          </ul>
        </section>

        <div className="rounded-xl border border-slate-100 bg-[#F5F8FF] p-5 flex items-center justify-between">
          <span className="text-xs text-slate-700">Need help initiating a return?</span>
          <Link href="/orders" className="btn-amazon-primary px-4 py-2 text-xs font-bold">
            Go to Your Orders &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
