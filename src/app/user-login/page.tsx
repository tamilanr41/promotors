"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  UserCheck,
  Building,
  Lock,
  Mail,
  Smartphone,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  HardHat,
  Search,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  ArrowLeft,
  FileText,
  Clock,
  Layers
} from "lucide-react";

export default function UserLoginPage() {
  const router = useRouter();
  const [method, setMethod] = useState<"password" | "otp">("password");
  const [email, setEmail] = useState("client@cos.com");
  const [password, setPassword] = useState("client123");
  const [phone, setPhone] = useState("+91 98765 43213");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [showTrackModal, setShowTrackModal] = useState(false);

  const handleDemoClient = () => {
    setEmail("client@cos.com");
    setPassword("client123");
    setError("");
  };

  const handleSendOtp = () => {
    if (!phone || phone.length < 10) {
      setError("Please enter a valid mobile number.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setOtpCode("123456");
    }, 600);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (method === "otp") {
      if (!otpCode || otpCode.length !== 6) {
        setError("Please enter the 6-digit OTP code (Demo: 123456)");
        setLoading(false);
        return;
      }
    }

    try {
      const result = await signIn("credentials", {
        email: method === "otp" ? "client@cos.com" : email.trim().toLowerCase(),
        password: method === "otp" ? "client123" : password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid login credentials. Please verify your details.");
        setLoading(false);
      } else {
        router.push("/portal");
      }
    } catch {
      setError("An error occurred during authentication.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-amber-50/20 flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      {/* TOP HEADER */}
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <HardHat className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl text-slate-900 tracking-tight">COS</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Client Hub
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Construction Operating System</p>
            </div>
          </Link>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <button
              onClick={() => setShowTrackModal(true)}
              className="hidden sm:flex items-center gap-1.5 text-slate-600 hover:text-orange-600 transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track Project by ID</span>
            </button>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <Link
              href="/admin-login"
              className="px-3.5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <span>Admin / Staff Login</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* FORM */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/80 text-orange-800 text-xs font-bold">
                  <UserCheck className="w-3.5 h-3.5 text-orange-600" />
                  <span>Client & Property Owner Portal</span>
                </div>
                <Link href="/register" className="text-xs font-bold text-orange-600 hover:underline">
                  New Client? Sign Up →
                </Link>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                Welcome back to your project
              </h1>
              <p className="text-sm text-slate-500 mb-6">
                Sign in to view site CCTV, milestone progress, engineer reports & financial invoices.
              </p>

              {/* TABS: PASSWORD VS OTP */}
              <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => setMethod("password")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    method === "password"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Email & Password
                </button>
                <button
                  type="button"
                  onClick={() => setMethod("otp")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                    method === "otp"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" /> Mobile OTP
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {method === "password" ? (
                  <>
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Registered Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="client@cos.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-orange-500 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Password
                        </label>
                        <Link href="/login" className="text-xs text-orange-600 hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-orange-500 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Registered Mobile
                      </label>
                      <div className="relative">
                        <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43213"
                          className="w-full pl-10 pr-24 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-orange-500 outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-orange-500 text-white rounded-lg text-xs font-bold hover:bg-orange-600"
                        >
                          {otpSent ? "Resend" : "Send OTP"}
                        </button>
                      </div>
                    </div>

                    {otpSent && (
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <label className="font-bold text-slate-700 uppercase">Verification Code</label>
                          <span className="text-emerald-600 font-mono">Demo: 123456</span>
                        </div>
                        <input
                          type="text"
                          maxLength={6}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          placeholder="123456"
                          className="w-full text-center tracking-widest font-mono text-base py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 outline-none"
                        />
                      </div>
                    )}
                  </>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Open My Client Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* DEMO CLIENT BUTTON */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleDemoClient}
                  className="w-full p-3 rounded-2xl bg-amber-50 border border-amber-200 hover:bg-amber-100/80 transition-colors flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-200/80 flex items-center justify-center font-bold text-amber-900 text-xs">
                      AS
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Amit Sharma (Sample Client)</div>
                      <div className="text-[11px] text-slate-500">Auto-fill: client@cos.com / client123</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-orange-600 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> 1-Click Fill
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Encrypted Client Session
              </span>
              <Link href="/contact" className="hover:text-slate-600">Client Support Desk</Link>
            </div>
          </div>

          {/* RIGHT HERO BANNER */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 p-8 text-white flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                <Building className="w-6 h-6 text-amber-400" />
              </div>

              <h2 className="text-2xl font-bold mb-3">
                Total transparency on your construction journey.
              </h2>
              <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                Track every brick, concrete pour, and milestone sign-off from anywhere in the world.
              </p>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold block text-white">Daily Photographic Logs</span>
                    <span className="text-slate-400">High-resolution drone & site photos</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <FileText className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold block text-white">Digital GST Invoices & Receipts</span>
                    <span className="text-slate-400">Download audited statements instantly</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold block text-white">Milestone Verification</span>
                    <span className="text-slate-400">Approve phase completions with 1-click</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs text-slate-400 flex items-center justify-between">
              <span>Trusted by 5,000+ Property Owners</span>
              <span className="text-amber-400 font-bold">★ 4.9/5 Rating</span>
            </div>
          </div>

        </div>
      </div>

      {/* TRACK PROJECT MODAL */}
      {showTrackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setShowTrackModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-sm font-bold w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Track Project by Reference ID</h3>
                <p className="text-xs text-slate-500">Enter your project booking code or contract number</p>
              </div>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="e.g. PRJ-2026-HQ001"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-orange-500 font-mono uppercase"
              />

              <button
                type="button"
                onClick={() => {
                  if (!trackingNumber) return;
                  setShowTrackModal(false);
                  router.push(`/portfolio`);
                }}
                className="w-full py-3 rounded-xl bg-orange-600 text-white font-bold text-xs hover:bg-orange-700 transition-colors"
              >
                Lookup Project Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-200 py-3 text-center text-xs text-slate-500">
        © 2026 COS Construction Operating System. Client Portal Protected.
      </footer>
    </div>
  );
}

