import Link from "next/link";
import RenzocartLogo from "@/components/RenzocartLogo";

export const metadata = {
  title: "Terms and Conditions – Renzocart",
  description: "Terms of service and user agreement for shopping and selling on Renzocart.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl py-6 space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-12 space-y-6">
        <div className="flex items-center justify-between border-b pb-6">
          <RenzocartLogo variant="dark" size="lg" />
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#3B82F6]">
            Legal Agreement
          </span>
        </div>

        <h1 className="text-3xl font-extrabold text-[#172554]">Terms &amp; Conditions of Use</h1>

        <section className="space-y-3 text-xs leading-relaxed text-slate-700">
          <h2 className="text-base font-bold text-[#172554]">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Renzocart (&quot;Website&quot;, &quot;Platform&quot;), you agree to be bound by these Terms and Conditions and our associated policies. If you disagree with any portion of these terms, please discontinue using the service.
          </p>
        </section>

        <section className="space-y-3 text-xs leading-relaxed text-slate-700">
          <h2 className="text-base font-bold text-[#172554]">2. Account Responsibilities</h2>
          <p>
            You are responsible for maintaining the confidentiality of your username and password, as well as restricting access to your computer or mobile device. You agree to accept responsibility for all activities that occur under your account.
          </p>
        </section>

        <section className="space-y-3 text-xs leading-relaxed text-slate-700">
          <h2 className="text-base font-bold text-[#172554]">3. Product Pricing &amp; Availability</h2>
          <p>
            All prices listed on Renzocart are in Indian Rupees (INR) and inclusive of applicable Goods and Services Tax (GST). While we strive for accuracy, in the rare event of a typographical pricing error, Renzocart reserves the right to cancel affected orders prior to dispatch with a prompt full refund.
          </p>
        </section>

        <section className="space-y-3 text-xs leading-relaxed text-slate-700">
          <h2 className="text-base font-bold text-[#172554]">4. Intellectual Property</h2>
          <p>
            All content including the Renzocart logo, brand emblems, user interfaces, scripts, graphics, and product arrangements are the property of Renzocart Inc. or its licensors and are protected under Indian and international intellectual property laws.
          </p>
        </section>

        <section className="space-y-3 text-xs leading-relaxed text-slate-700">
          <h2 className="text-base font-bold text-[#172554]">5. Governing Law and Jurisdiction</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of the Republic of India. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Chennai, Tamil Nadu.
          </p>
        </section>
      </div>
    </div>
  );
}
