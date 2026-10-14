import Link from "next/link";
import RenzocartLogo from "@/components/RenzocartLogo";

export const metadata = {
  title: "Cancellation Policy – Renzocart",
  description: "Learn when and how to cancel orders on Renzocart, stock restoration, and cancellation rules.",
};

export default function CancellationPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl py-6 space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-12 space-y-6">
        <div className="flex items-center justify-between border-b pb-6">
          <RenzocartLogo variant="dark" size="lg" />
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#3B82F6]">
            Transparent Policy
          </span>
        </div>

        <h1 className="text-3xl font-extrabold text-[#172554]">Renzocart Cancellation Policy</h1>

        <section className="space-y-3 text-xs leading-relaxed text-slate-700">
          <h2 className="text-base font-bold text-[#172554]">1. When Can I Cancel an Order?</h2>
          <p>
            You can cancel an order <b>free of charge</b> at any point before it enters the shipping / dispatch phase. This includes orders with the following statuses:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><b>PENDING:</b> Order placed, awaiting payment confirmation.</li>
            <li><b>CONFIRMED:</b> Order confirmed and sent to warehouse.</li>
            <li><b>PROCESSING:</b> Items being picked and packed at the distribution center.</li>
          </ul>
        </section>

        <section className="space-y-3 text-xs leading-relaxed text-slate-700">
          <h2 className="text-base font-bold text-[#172554]">2. Orders Already Shipped or Out for Delivery</h2>
          <p>
            Once an order is marked as <b>SHIPPED</b> or <b>DELIVERED</b>, our logistics network has already transferred custody to national courier partners. In this case:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>The order cannot be cancelled directly from the system.</li>
            <li>You may politely decline the package when the courier partner attempts delivery.</li>
            <li>Alternatively, accept the delivery and initiate a return within 7 days via our <Link href="/returns-policy" className="text-[#3B82F6] font-semibold hover:underline">Return &amp; Refund Policy</Link>.</li>
          </ul>
        </section>

        <section className="space-y-3 text-xs leading-relaxed text-slate-700">
          <h2 className="text-base font-bold text-[#172554]">3. Cancellation Procedure</h2>
          <ol className="list-decimal pl-5 space-y-1.5">
            <li>Open <Link href="/orders" className="text-[#3B82F6] font-semibold hover:underline">Your Orders</Link>.</li>
            <li>Find the eligible order and click the <b>Cancel Order</b> button.</li>
            <li>Select a reason from the dropdown (e.g. Ordered by mistake, Found better price, Delivery time too long).</li>
            <li>Confirm your cancellation. The order status updates immediately in our database, and inventory is restored automatically.</li>
          </ol>
        </section>

        <section className="space-y-3 text-xs leading-relaxed text-slate-700">
          <h2 className="text-base font-bold text-[#172554]">4. Refund for Cancelled Prepaid Orders</h2>
          <p>
            If payment was already deducted, the full transaction amount is reversed automatically to the original payment method without any cancellation deductions. Reversals generally reflect within 24 to 48 hours for UPI and 3 to 5 business days for cards.
          </p>
        </section>
      </div>
    </div>
  );
}
