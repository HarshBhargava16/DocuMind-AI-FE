"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import AuthShowcase, { Logo } from "@/components/auth/auth-showcase";

function getStrength(password) {
  if (!password) return { score: 0, label: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const labels = ["Too weak", "Weak", "Fair", "Good", "Strong"];
  return { score, label: labels[score] };
}

const strengthColors = [
  "bg-[#E2E8F0]",
  "bg-red-400",
  "bg-orange-400",
  "bg-[#2563EB]",
  "bg-[#16A34A]",
];

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const strength = useMemo(
    () => getStrength(formData.password),
    [formData.password]
  );

  const passwordsMatch =
    formData.confirmPassword.length > 0 &&
    formData.password === formData.confirmPassword;
  const passwordsDiffer =
    formData.confirmPassword.length > 0 &&
    formData.password !== formData.confirmPassword;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { userName, email, password, confirmPassword } = formData;

    if (!userName || !email || !password || !confirmPassword) {
      return setError("Fill in all four fields to continue.");
    }

    if (password !== confirmPassword) {
      return setError("The two passwords don't match. Re-enter them.");
    }

    if (password.length < 8) {
      return setError("Use at least 8 characters for your password.");
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/user/register`,
        { userName, email, password }
      );

      if (!data.success) {
        throw new Error(data.message || "We couldn't create your account.");
      }

      router.push("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-[#E2E8F0] bg-white px-4 py-3 text-[15px] text-[#111827] placeholder:text-[#94A3B8] outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/15";
  const labelClass = "mb-1.5 block text-sm font-medium text-[#111827]";

  return (
    <main className="grid h-dvh overflow-hidden bg-white font-sans text-[#111827] lg:grid-cols-[1.05fr_1fr]">
      <AuthShowcase
        heading="Stop searching."
        accent="Start asking."
      />

      <section className="flex items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-[26rem]">
          <Logo className="mb-8 lg:hidden" />

          <h1 className="text-3xl font-bold tracking-tight">
            Create your account
          </h1>
          <p className="mt-2 text-[15px] text-[#64748B]">
            Upload a document and start asking questions in a minute.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
            <div>
              <label htmlFor="userName" className={labelClass}>
                Full name
              </label>
              <input
                id="userName"
                type="text"
                name="userName"
                autoComplete="name"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Aarav Sharma"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="password" className={labelClass}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  className={`${inputClass} pr-12`}
                  aria-describedby="password-strength"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-lg text-[#64748B] transition hover:text-[#2563EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div id="password-strength" className="mt-2.5" aria-live="polite">
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        strength.score >= i
                          ? strengthColors[strength.score]
                          : "bg-[#E2E8F0]"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-1.5 h-4 text-xs text-[#64748B]">
                  {formData.password
                    ? `Password strength: ${strength.label}`
                    : "Mix upper and lower case, numbers and symbols for a stronger password."}
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className={labelClass}>
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className={`${inputClass} ${
                  passwordsDiffer
                    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                    : ""
                }`}
                aria-invalid={passwordsDiffer}
              />
              <p
                className={`mt-1.5 h-4 text-xs ${
                  passwordsMatch ? "text-[#16A34A]" : "text-red-600"
                }`}
                aria-live="polite"
              >
                {passwordsMatch && "Passwords match."}
                {passwordsDiffer && "Passwords don't match yet."}
              </p>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full bg-[#2563EB] text-[15px] font-semibold hover:bg-[#1D4ED8]"
            >
              {loading && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
              {loading ? "Creating account…" : "Create account"}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-[#64748B]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#2563EB] underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}