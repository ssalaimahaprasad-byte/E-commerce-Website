import Link from "next/link";
import RenzocartLogo from "@/components/RenzocartLogo";

export const metadata = {
  title: "Shipping Policy – Renzocart",
  description: "Renzocart shipping timelines, express delivery, coverage areas, and dispatch policies.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl py-6 space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-12 space-y-6">
        <div className="flex items-center justify-between border-b pb-6">
          <RenzocartLogo variant="dark" size="lg" />
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#3B82F6]">
            Updated October 2026
          </span>
        </div>

        <h1 className="text-3xl font-extrabold text-[#172554]">Renzocart Shipping &amp; Delivery Policy</h1>

        <section className="space-y-3 text-xs leading-relaxed text-slate-700">
          <h2 className="text-base font-bold text-[#172554]">1. Delivery Coverage &amp; PIN Codes</h2>
          <p>
            Renzocart ships to over 19,000 PIN codes across India. Customers can enter their 6-digit delivery PIN code at any time using the header navigation tool to immediately check serviceability and estimated delivery dates.
          </p>
        </section>

        <section className="space-y-3 text-xs leading-relaxed text-slate-700">
          <h2 className="text-base font-bold text-[#172554]">2. Shipping Speeds &amp; Timelines</h2>
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#172554] text-white">
                <tr>
                  <th className="p-3">Delivery Option</th>
                  <th className="p-3">Eligible Locations</th>
                  <th className="p-3">Estimated Transit</th>
                  <th className="p-3">Charges</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3 font-semibold text-[#3B82F6]">Express Next-Day</td>
                  <td className="p-3">Major Metros (Delhi NCR, Mumbai, Chennai, Bengaluru, Hyderabad, Kolkata)</td>
                  <td className="p-3">Next Day by 8:00 PM</td>
                  <td className="p-3 font-semibold text-green-700">FREE on orders &ge; ₹499</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#172554]">Standard Delivery</td>
                  <td className="p-3">Tier-2 &amp; Tier-3 Cities, District Centers</td>
                  <td className="p-3">2 to 4 Business Days</td>
                  <td className="p-3 font-semibold text-green-700">FREE on orders &ge; ₹499</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-600">Regional / Remote</td>
                  <td className="p-3">Select Hinterland &amp; Remote PIN Codes</td>
                  <td className="p-3">4 to 6 Business Days</td>
                  <td className="p-3">₹49 (Subsidized)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-3 text-xs leading-relaxed text-slate-700">
          <h2 className="text-base font-bold text-[#172554]">3. Order Dispatch &amp; Tracking</h2>
          <p>
            Orders placed before 2:00 PM IST on business days are dispatched from our nearest automated fulfillment center on the same calendar day. Once dispatched, customers receive an SMS and email notification with an active AWB tracking number. Live 6-stage status tracking is available 24/7 on our <Link href="/track" className="font-semibold text-[#3B82F6] hover:underline">Track Package page</Link>.
          </p>
        </section>

        <section className="space-y-3 text-xs leading-relaxed text-slate-700">
          <h2 className="text-base font-bold text-[#172554]">4. Tamper-Evident Packaging</h2>
          <p>
            All electronics and high-value orders are shipped in security-sealed, tamper-evident corrugated boxes with one-time verification OTP upon delivery. If the seal is compromised, please refuse delivery and report immediately to <Link href="/contact" className="font-semibold text-[#3B82F6] hover:underline">Customer Support</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
