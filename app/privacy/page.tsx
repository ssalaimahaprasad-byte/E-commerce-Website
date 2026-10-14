import Link from "next/link";
import RenzocartLogo from "@/components/RenzocartLogo";

export const metadata = {
  title: "Privacy Policy – Renzocart",
  description: "Renzocart customer privacy notice, data protection practices, and digital rights in India.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl py-6 space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-12 space-y-6">
        <div className="flex items-center justify-between border-b pb-6">
          <RenzocartLogo variant="dark" size="lg" />
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#3B82F6]">
            DPDP Act Compliant
          </span>
        </div>

        <h1 className="text-3xl font-extrabold text-[#172554]">Renzocart Privacy Notice</h1>

        <section className="space-y-3 text-xs leading-relaxed text-slate-700">
          <h2 className="text-base font-bold text-[#172554]">1. Information We Collect</h2>
          <p>
            When you register, place an order, or browse Renzocart, we collect necessary personal data to deliver our e-commerce services:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><b>Account Data:</b> Name, email address, contact telephone number, encrypted password hash.</li>
            <li><b>Delivery Information:</b> Shipping addresses, pin codes, recipient contact details.</li>
            <li><b>Payment References:</b> Transaction tokens and gateway settlement references. (We never store full card CVVs or net banking passwords).</li>
            <li><b>Device and Interaction:</b> IP address, browser type, language preferences, and viewed items for recommendation purposes.</li>
          </ul>
        </section>

        <section className="space-y-3 text-xs leading-relaxed text-slate-700">
          <h2 className="text-base font-bold text-[#172554]">2. How We Use Your Data</h2>
          <p>
            Your information is processed strictly for:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Fulfilling orders, processing payments, and dispatching deliveries.</li>
            <li>Sending critical transactional updates (order confirmation, tracking events, invoices).</li>
            <li>Preventing fraud, unauthorized account access, and ensuring platform security.</li>
          </ul>
        </section>

        <section className="space-y-3 text-xs leading-relaxed text-slate-700">
          <h2 className="text-base font-bold text-[#172554]">3. Data Sharing &amp; Third Parties</h2>
          <p>
            We do not sell your personal information. Data is shared exclusively with verified service partners necessary for fulfilling purchases (e.g., courier logistics partners and certified payment aggregators such as Razorpay).
          </p>
        </section>

        <section className="space-y-3 text-xs leading-relaxed text-slate-700">
          <h2 className="text-base font-bold text-[#172554]">4. Your Privacy Rights</h2>
          <p>
            You have the right to access, rectify, or request deletion of your personal account data at any time under the Indian Digital Personal Data Protection (DPDP) Act. For assistance, reach out to <Link href="/contact" className="text-[#3B82F6] font-semibold hover:underline">privacy@renzocart.in</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
