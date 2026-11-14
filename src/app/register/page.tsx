"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import {
  HardHat,
  Eye,
  EyeOff,
  UserPlus,
  Mail,
  Phone,
  User,
  Lock,
  KeyRound,
  Building,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Briefcase,
  Check,
  ChevronRight,
  ArrowLeft
} from "lucide-react";

const ROLE_OPTIONS = [
  {
    id: "client",
    title: "Client / Property Owner",
    subtitle: "Track project milestones, view live site photos & approve invoices",
    badge: "Recommended for Clients",
    icon: User,
  },
  {
    id: "project_manager",
    title: "Project Manager",
    subtitle: "Manage budgets, procurement, vendors & project timelines",
    badge: "Management",
    icon: Briefcase,
  },
  {
    id: "engineer",
    title: "Site Engineer",
    subtitle: "Record daily site logs, quality inspections & safety reports",
    badge: "Field Operations",
    icon: HardHat,
  },
  {
    id: "admin",
    title: "Enterprise Admin",
    subtitle: "Complete organizational control across all branches & modules",
    badge: "Executive",
    icon: ShieldCheck,
  },
];

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    password: "",
    confirmPassword: "",
    role: "client",
    secretCode: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strengthScore = getPasswordStrength(formData.password);

  const getStrengthLabel = () => {
    if (!formData.password) return { text: "Enter password", color: "bg-slate-200", width: "w-0" };
    if (strengthScore <= 1) return { text: "Weak", color: "bg-red-500", width: "w-1/4" };
    if (strengthScore === 2) return { text: "Fair", color: "bg-amber-500", width: "w-2/4" };
    if (strengthScore === 3) return { text: "Good", color: "bg-blue-500", width: "w-3/4" };
    return { text: "Strong", color: "bg-emerald-500", width: "w-full" };
  };

  const strength = getStrengthLabel();

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // 1-Click sample fill for fast evaluation
  const handleAutoFill = () => {
    const randomId = Math.floor(100 + Math.random() * 900);
    setFormData({
      name: "Karthik Raja",
      email: `karthik${randomId}@example.com`,
      phone: "+91 98765 12345",
      companyName: "Raja Promoters & Builders",
      password: "Password@123",
      confirmPassword: "Password@123",
      role: "client",
      secretCode: "",
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      setLoading(false);
      return;
    }

    if (formData.role !== "client" && !formData.secretCode.trim()) {
      setError("Admin Master Secret Key is required to authorize this internal account.");
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    if (!acceptTerms) {
      setError("You must accept the Terms of Service to continue.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setSuccess(true);

      // Auto sign-in immediately with created credentials
      const signInRes = await signIn("credentials", {
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        redirect: false,
      });

      setTimeout(() => {
        if (formData.role === "client") {
          router.push("/portal");
        } else {
          router.push("/dashboard");
        }
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create account.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      {/* HEADER */}
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <HardHat className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl text-slate-900 tracking-tight">COS</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-100 text-orange-700">
                  Onboarding
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Construction Operating System</p>
            </div>
          </Link>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-500 hidden sm:inline">Already have an account?</span>
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors flex items-center gap-1"
            >
              <span>Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* FORM CONTAINER */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* MAIN FORM */}
          <div className="lg:col-span-8 p-6 sm:p-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Create your account
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Join COS to collaborate across construction workflows, sites, and financial ledgers.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAutoFill}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold hover:bg-amber-100 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Auto-Fill Sample</span>
              </button>
            </div>

            {error && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Account created successfully! Logging you into your workspace...</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* SECTION 1: ROLE SELECTION */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Select Your Account Role
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ROLE_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = formData.role === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setFormData((p) => ({ ...p, role: opt.id }))}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? "bg-orange-50/70 border-orange-500 ring-2 ring-orange-500/20 shadow-sm"
                            : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg ${isSelected ? "bg-orange-500 text-white" : "bg-slate-200 text-slate-700"}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-bold text-slate-900">{opt.title}</span>
                          </div>
                          {isSelected && (
                            <div className="w-4 h-4 rounded-full bg-orange-500 text-white flex items-center justify-center">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                          {opt.subtitle}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 2: PERSONAL & COMPANY DETAILS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh V"
                      value={formData.name}
                      onChange={handleChange("name")}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-orange-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="ramesh@example.com"
                      value={formData.email}
                      onChange={handleChange("email")}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-orange-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange("phone")}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-orange-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Company / Organization
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Skyline Infra Projects"
                      value={formData.companyName}
                      onChange={handleChange("companyName")}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-orange-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: PASSWORDS WITH STRENGTH METER */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
                      placeholder="Min. 8 characters"
                      value={formData.password}
                      onChange={handleChange("password")}
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-orange-500 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* STRENGTH INDICATOR */}
                  {formData.password && (
                    <div className="mt-1.5 space-y-1">
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300`} />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Strength: <strong className="text-slate-700">{strength.text}</strong></span>
                        <span>Use 8+ chars, numbers & symbols</span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="Repeat password"
                      value={formData.confirmPassword}
                      onChange={handleChange("confirmPassword")}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-orange-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* ADMIN / MANAGEMENT SECRET KEY AUTHORIZATION */}
              {formData.role !== "client" && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <KeyRound className="w-4 h-4 text-amber-600" />
                      <span>Admin Master Secret Key *</span>
                    </label>
                    <span className="text-[10px] font-mono font-black text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded border border-amber-300">
                      REQUIRED FOR {formData.role.toUpperCase()}
                    </span>
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="Enter company master secret key..."
                    value={formData.secretCode}
                    onChange={handleChange("secretCode")}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-white text-xs sm:text-sm focus:border-amber-500 outline-none"
                  />
                  <p className="text-[11px] text-slate-600">
                    Authorized company master security passkey required to register internal administrative accounts.
                  </p>
                </div>
              )}

              {/* TERMS CHECKBOX */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="agree"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor="agree" className="text-xs text-slate-600 leading-snug">
                  I agree to the <Link href="/terms" className="text-orange-600 font-bold hover:underline">Terms of Service</Link>,{" "}
                  <Link href="/privacy" className="text-orange-600 font-bold hover:underline">Privacy Policy</Link>, and standard construction safety data protocols.
                </label>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Creating Your Account...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Registration & Open Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT SIDEBAR / BENEFITS */}
          <div className="lg:col-span-4 bg-slate-900 p-6 sm:p-8 text-white flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Enterprise Grade</span>
              </div>

              <h3 className="text-xl font-bold mb-3">
                Why Top Builders Choose COS
              </h3>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Empowering real estate developers, contractors, and owners with end-to-end digital control.
              </p>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Automated AI Estimator</span>
                    <span className="text-slate-400">Instant BOQ & material estimates with localized cost indices.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded bg-blue-500/20 text-blue-400 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Direct PO Procurement</span>
                    <span className="text-slate-400">Vendor bidding, purchase orders and 3-way invoice matching.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded bg-purple-500/20 text-purple-400 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Quality & Safety Compliance</span>
                    <span className="text-slate-400">Digital Non-Conformance Reports (NCR) and safety logs.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 mt-8">
              <div className="text-xs text-slate-400 mb-1">Already registered?</div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/user-login"
                  className="py-2 text-center rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
                >
                  Client Login
                </Link>
                <Link
                  href="/admin-login"
                  className="py-2 text-center rounded-xl bg-amber-500 hover:bg-amber-400 text-xs font-bold text-slate-950 transition-colors"
                >
                  Admin Login
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 py-3 text-center text-xs text-slate-500">
        © 2026 COS Construction Operating System • All rights reserved
      </footer>
    </div>
  );
}
