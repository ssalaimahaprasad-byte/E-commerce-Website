"use client";
import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import RenzocartLogo from "@/components/RenzocartLogo";
import { useTranslation } from "@/lib/i18n";

function LoginForm() {
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  const initialMode =
    searchParams?.get("mode") === "register"
      ? "register"
      : searchParams?.get("mode") === "forgot"
      ? "forgot"
      : "login";
  const [mode, setMode] = useState<"login" | "register" | "forgot">(initialMode);
  const [f, setF] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [err, setErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const qMode = searchParams?.get("mode");
    if (qMode === "register") setMode("register");
    else if (qMode === "forgot") setMode("forgot");
    else if (qMode === "login") setMode("login");
  }, [searchParams]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setSuccessMsg("");

    if (mode === "register") {
      if (f.password.length < 6) {
        return setErr(t("passwordTooShort"));
      }
      if (f.password !== f.confirmPassword) {
        return setErr(t("passwordsDoNotMatch"));
      }
    }

    setBusy(true);

    try {
      if (mode === "forgot") {
        const r = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: f.email.trim().toLowerCase() }),
        });
        const d = await r.json();
        setBusy(false);
        if (!r.ok) return setErr(d.error || "Failed to process request. Please check the email address.");
        setSuccessMsg(d.message || t("resetLinkSent"));
        return;
      }

      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const payload =
        mode === "login"
          ? { email: f.email.trim().toLowerCase(), password: f.password }
          : { name: f.name.trim(), email: f.email.trim().toLowerCase(), password: f.password };

      const r = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const d = await r.json();
      setBusy(false);

      if (!r.ok) {
        return setErr(d.error || "Authentication failed. Please verify your email and password.");
      }

      // Successful login or registration
      const nextParam = searchParams?.get("next") || "/";
      const safeNext = nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/";
      window.location.href = safeNext;
    } catch {
      setBusy(false);
      setErr("Unable to reach the server. Please verify your network connection and try again.");
    }
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center pt-6 pb-12 px-4 sm:px-0">
      {/* Modern Renzocart Logo */}
      <div className="mb-6">
        <RenzocartLogo variant="dark" size="lg" />
      </div>

      {/* Main Login Card */}
      <form
        onSubmit={submit}
        noValidate={false}
        autoComplete="off"
        className="w-full rounded-2xl border border-slate-200 bg-white p-7 shadow-sm space-y-4 text-xs text-slate-800"
      >
        <h1 className="text-2xl font-black text-[#172554]">
          {mode === "login" ? t("signIn") : mode === "register" ? t("createAccountTitle") : t("passwordAssistance")}
        </h1>

        {mode === "forgot" && (
          <p className="text-slate-600 text-xs leading-relaxed">
            {t("passwordAssistanceDesc")}
          </p>
        )}

        {/* Error Alert */}
        {err && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-3 text-red-700 flex items-start gap-2 text-xs font-medium"
          >
            <span className="text-base leading-none">⚠</span>
            <div className="flex-1">{err}</div>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div
            role="status"
            className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-emerald-800 flex items-start gap-2 text-xs font-medium"
          >
            <span className="text-base leading-none">✓</span>
            <div className="flex-1">{successMsg}</div>
          </div>
        )}

        {mode === "register" && (
          <div>
            <label htmlFor="regName" className="block font-bold text-slate-700 mb-1">
              {t("yourFullName")} *
            </label>
            <input
              id="regName"
              name="name"
              type="text"
              autoComplete="off"
              className="input w-full"
              placeholder={t("fullNamePlaceholder")}
              required
              disabled={busy}
              value={f.name}
              onChange={(e) => setF({ ...f, name: e.target.value })}
            />
          </div>
        )}

        <div>
          <label htmlFor="authEmail" className="block font-bold text-slate-700 mb-1">
            {t("emailAddress")} *
          </label>
          <input
            id="authEmail"
            name="email"
            type="email"
            autoComplete="off"
            className="input w-full"
            placeholder={t("enterYourEmail")}
            required
            disabled={busy}
            value={f.email}
            onChange={(e) => setF({ ...f, email: e.target.value })}
          />
        </div>

        {mode !== "forgot" && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="authPassword" className="font-bold text-slate-700">
                {t("passwordLabel")} *
              </label>
              {mode === "login" && (
                <button
                  type="button"
                  onClick={() => {
                    setMode("forgot");
                    setErr("");
                    setSuccessMsg("");
                  }}
                  className="text-[#3B82F6] hover:text-[#8B5CF6] hover:underline cursor-pointer text-xs font-semibold"
                >
                  {t("forgotPasswordQuestion")}
                </button>
              )}
            </div>
            <input
              id="authPassword"
              name="password"
              type="password"
              autoComplete="new-password"
              className="input w-full"
              placeholder={mode === "register" ? t("passwordMinLength") : t("enterYourPassword")}
              required
              minLength={6}
              disabled={busy}
              value={f.password}
              onChange={(e) => setF({ ...f, password: e.target.value })}
            />
            {mode === "register" && (
              <p className="mt-1 text-[11px] text-slate-500">
                ℹ {t("passwordMinLength")}
              </p>
            )}
          </div>
        )}

        {mode === "register" && (
          <div>
            <label htmlFor="authConfirmPassword" className="block font-bold text-slate-700 mb-1">
              {t("confirmPasswordLabel")} *
            </label>
            <input
              id="authConfirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              className="input w-full"
              placeholder={t("reenterPassword")}
              required
              minLength={6}
              disabled={busy}
              value={f.confirmPassword}
              onChange={(e) => setF({ ...f, confirmPassword: e.target.value })}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          className="btn-amazon-primary w-full py-2.5 font-bold shadow-md"
        >
          {busy
            ? t("verifyingCredentials")
            : mode === "login"
            ? `${t("signIn")} (${t("brandName")})`
            : mode === "register"
            ? t("createAccountButton")
            : t("sendResetLinkButton")}
        </button>

        {mode === "forgot" && (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setErr("");
                setSuccessMsg("");
              }}
              className="text-[#3B82F6] hover:underline text-xs font-semibold"
            >
              ← {t("signIn")}
            </button>
          </div>
        )}

        {mode !== "forgot" && (
          <p className="text-[11px] text-slate-500 leading-normal pt-1">
            {t("termsAgreement")}
          </p>
        )}
      </form>

      {/* Mode Switch Divider */}
      {mode !== "forgot" && (
        <div className="w-full mt-6 space-y-4">
          <div className="relative text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300" />
            </div>
            <span className="relative bg-[#F5F8FF] px-3 text-xs text-slate-500 font-medium">
              {mode === "login" ? t("newToRenzocart") : t("alreadyHaveAccount")}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setErr("");
              setSuccessMsg("");
            }}
            className="btn-amazon-light w-full py-2.5 text-xs font-bold shadow-sm"
          >
            {mode === "login" ? t("createAccountButton") : t("signIn")}
          </button>
        </div>
      )}
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading authentication…</div>}>
      <LoginForm />
    </Suspense>
  );
}
