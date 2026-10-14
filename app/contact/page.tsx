"use client";
import { useState } from "react";
import RenzocartLogo from "@/components/RenzocartLogo";
import { useTranslation } from "@/lib/i18n";

export default function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setFeedback({ type: "error", text: t("fillAllFields") });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit message");

      setFeedback({ type: "success", text: data.message });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setFeedback({ type: "error", text: err.message || "An unexpected error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl py-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
        <div className="mb-6 flex items-center justify-between border-b pb-6">
          <RenzocartLogo variant="dark" size="lg" />
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#3B82F6]">
            {t("customerSupport247")}
          </span>
        </div>

        <h1 className="text-3xl font-extrabold text-[#172554]">{t("contactSupportTitle")}</h1>
        <p className="mt-2 text-sm text-slate-600">
          {t("contactSupportDesc")}
        </p>

        <div className="mt-8 grid gap-8 md:grid-cols-12">
          {/* Contact Details Column */}
          <div className="space-y-6 md:col-span-5">
            <div className="rounded-xl border border-slate-100 bg-[#F5F8FF] p-5">
              <h3 className="font-bold text-[#172554] text-sm">{t("headquarters")}</h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Renzocart India Private Limited<br />
                Tower B, Express Logistics Park<br />
                Chennai, Tamil Nadu - 600001
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-[#F5F8FF] p-5">
              <h3 className="font-bold text-[#172554] text-sm">{t("directChannels")}</h3>
              <div className="mt-2 space-y-1.5 text-xs text-slate-600">
                <p>📧 Email: <span className="font-medium text-[#3B82F6]">support@renzocart.in</span></p>
                <p>📞 Phone: <span className="font-medium text-[#172554]">1800-419-7369 ({t("tollFree")})</span></p>
                <p>⏰ Hours: <span className="font-medium">{t("hours247")}</span></p>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="md:col-span-7">
            {feedback && (
              <div
                role="alert"
                className={`mb-6 rounded-lg p-4 text-xs font-medium ${
                  feedback.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {feedback.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">{t("yourFullName")} *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">{t("emailAddress")} *</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">{t("subjectLabel")}</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Inquiry regarding Order #RC-402-98214"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="input"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">{t("messageLabel")}</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your issue or question in detail..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="input"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-amazon-primary w-full py-2.5 font-bold text-xs"
              >
                {loading ? t("sendingMessage") : t("sendMessageButton")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
