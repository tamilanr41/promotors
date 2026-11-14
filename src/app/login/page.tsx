"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  HardHat,
  Eye,
  EyeOff,
  ArrowRight,
  Lock,
  Mail,
  Shield,
  ShieldCheck,
  Building2,
  KeyRound,
  UserCheck,
  CheckCircle2,
  Smartphone,
  Sparkles,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Layers,
  Activity,
  AlertCircle,
  RefreshCw,
  Fingerprint,
  ArrowLeft
} from "lucide-react";

// Demo credentials for immediate one-click testing
const DEMO_ACCOUNTS = [
  {
    roleName: "Super Admin",
    type: "admin",
    email: "admin@cos.com",
    password: "admin123",
    badge: "Executive",
    badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
    description: "Full access to all branches, finance, team & enterprise settings",
    target: "/dashboard",
  },
  {
    roleName: "Project Manager",
    type: "admin",
    email: "pm@cos.com",
    password: "pm123",
    badge: "Management",
    badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
    description: "Manage milestones, procurement, workforce & site progress",
    target: "/dashboard",
  },
  {
    roleName: "Site Engineer",
    type: "admin",
    email: "engineer@cos.com",
    password: "se123",
    badge: "Field Ops",
    badgeColor: "bg-amber-100 text-amber-700 border-amber-200",
    description: "Inspections, quality checks, equipment & safety logs",
    target: "/dashboard",
  },
  {
    roleName: "Client / Investor",
    type: "user",
    email: "client@cos.com",
    password: "client123",
    badge: "Client Portal",
    badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    description: "Live project updates, invoices, blueprints & approvals",
    target: "/portal",
  },
];

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  // Mode: "user" (Client/Customer) vs "admin" (Management/Enterprise)
  const initialType = searchParams.get("type") === "admin" ? "admin" : "user";
  const [activeTab, setActiveTab] = useState<"user" | "admin">(initialType);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // User login mode: "password" vs "phone_otp"
  const [userLoginMethod, setUserLoginMethod] = useState<"password" | "otp">("password");
  const [otpSent, setOtpSent] = useState(false);

  // Admin login mode: "password" vs "two_factor"
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");

  // Forgot password modal
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOtp, setForgotOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [forgotStep, setForgotStep] = useState<1 | 2>(1);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMsg, setForgotMsg] = useState("");
  const [forgotError, setForgotError] = useState("");

  // If already logged in, show redirect helper
  useEffect(() => {
    if (session?.user) {
      const userRole = (session.user as { role?: string })?.role;
      if (userRole === "CLIENT") {
        router.push("/portal");
      } else {
        router.push("/dashboard");
      }
    }
  }, [session, router]);

  // Set email/password from demo account
  const handleQuickLogin = (demo: typeof DEMO_ACCOUNTS[0]) => {
    setActiveTab(demo.type as "user" | "admin");
    setEmail(demo.email);
    setPassword(demo.password);
    setError("");
    setSuccessMsg(`Selected demo profile: ${demo.roleName}`);
  };

  const handleSendOtp = () => {
    if (!phone || phone.length < 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setOtpCode("123456");
      setSuccessMsg("SMS OTP dispatched! Use demo code: 123456");
    }, 800);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    // If OTP login for user
    if (activeTab === "user" && userLoginMethod === "otp") {
      if (!otpCode || otpCode.length !== 6) {
        setError("Please enter the 6-digit verification code");
        setLoading(false);
        return;
      }
      // Demo phone OTP signs in as client
      const res = await signIn("credentials", {
        email: "client@cos.com",
        password: "client123",
        redirect: false,
      });

      if (res?.error) {
        setError("OTP verification failed. Please try again.");
        setLoading(false);
      } else {
        setSuccessMsg("Verification verified! Redirecting to Client Portal...");
        setTimeout(() => router.push("/portal"), 600);
      }
      return;
    }

    // If 2FA enabled for admin
    if (activeTab === "admin" && twoFactorEnabled) {
      if (!twoFactorCode || twoFactorCode.length !== 6) {
        setError("Please enter the 6-digit Authenticator Token");
        setLoading(false);
        return;
      }
    }

    try {
      const result = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials. Please check your email and password.");
        setLoading(false);
      } else {
        setSuccessMsg("Authentication verified! Loading your workspace...");
        // Fetch session to determine role routing
        const sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();
        const role = sessionData?.user?.role;

        setTimeout(() => {
          if (role === "CLIENT" || activeTab === "user") {
            router.push("/portal");
          } else {
            router.push("/dashboard");
          }
        }, 500);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  // Forgot Password API handler
  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotError("");
    setForgotMsg("");

    try {
      if (forgotStep === 1) {
        const res = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: forgotEmail }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to send reset code");
        setForgotMsg(`Verification code sent! Demo OTP: ${data.demoOtp || "123456"}`);
        setForgotOtp(data.demoOtp || "123456");
        setForgotStep(2);
      } else {
        const res = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: forgotEmail,
            otp: forgotOtp,
            newPassword,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Password reset failed");
        setForgotMsg("Password updated successfully! You can now log in.");
        setEmail(forgotEmail);
        setPassword(newPassword);
        setTimeout(() => {
          setShowForgotModal(false);
          setForgotStep(1);
          setForgotMsg("");
        }, 1500);
      }
    } catch (err: unknown) {
      setForgotError(err instanceof Error ? err.message : "Reset failed");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* TOP NOTIFICATION BAR */}
      <div className="bg-slate-900 border-b border-slate-800 text-slate-300 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-medium text-white">COS Global Cloud Node:</span>
            <span className="text-slate-400 hidden sm:inline">Active • 99.98% SLA Guaranteed • ISO 27001 Certified</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Back to Website
            </Link>
            <span className="text-slate-700">|</span>
            <span className="text-emerald-400 flex items-center gap-1 font-mono">
              <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[680px]">
          
          {/* LEFT COLUMN: MAIN AUTHENTICATION FORM */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              {/* BRAND HEADER */}
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center gap-3 group">
                  <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform">
                    <HardHat className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-2xl font-black tracking-tight text-slate-900">COS</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 uppercase tracking-wider">
                        v2.4
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">Construction Operating System</p>
                  </div>
                </Link>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Need an account?</span>
                  <Link href="/register" className="text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors inline-flex items-center gap-0.5">
                    Register Now <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* ROLE SELECTION TABS: USER LOGIN VS ADMIN LOGIN */}
              <div className="mb-6">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                  Select Login Portal
                </label>
                <div className="grid grid-cols-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("user");
                      setError("");
                      setSuccessMsg("");
                      if (email === "admin@cos.com" || email === "pm@cos.com" || email === "engineer@cos.com") {
                        setEmail("client@cos.com");
                        setPassword("client123");
                      }
                    }}
                    className={`relative py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                      activeTab === "user"
                        ? "bg-white text-slate-900 shadow-md shadow-slate-200/50"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <UserCheck className={`w-4 h-4 ${activeTab === "user" ? "text-orange-600" : "text-slate-400"}`} />
                    <span>Client Portal</span>
                    {activeTab === "user" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 ml-1" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("admin");
                      setError("");
                      setSuccessMsg("");
                      if (email === "client@cos.com") {
                        setEmail("admin@cos.com");
                        setPassword("admin123");
                      }
                    }}
                    className={`relative py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                      activeTab === "admin"
                        ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Shield className={`w-4 h-4 ${activeTab === "admin" ? "text-amber-400" : "text-slate-400"}`} />
                    <span>Admin & Staff</span>
                    {activeTab === "admin" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 ml-1" />
                    )}
                  </button>
                </div>
              </div>

              {/* HEADING ACCORDING TO PORTAL */}
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {activeTab === "user" ? "Client & Owner Sign In" : "Enterprise Staff Login"}
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  {activeTab === "user"
                    ? "Access your project milestones, financial invoices, blueprints & approvals."
                    : "Secure administrative access for Super Admins, Project Managers & Engineers."}
                </p>
              </div>

              {/* ALERTS */}
              {error && (
                <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-sm animate-fadeIn">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
                  <div className="flex-1 font-medium">{error}</div>
                </div>
              )}

              {successMsg && (
                <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-800 text-sm animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-600" />
                  <div className="flex-1 font-medium">{successMsg}</div>
                </div>
              )}

              {/* USER TAB: PASSWORD VS OTP METHOD TOGGLE */}
              {activeTab === "user" && (
                <div className="flex items-center gap-4 mb-4 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setUserLoginMethod("password")}
                    className={`pb-1 border-b-2 transition-colors ${
                      userLoginMethod === "password"
                        ? "border-orange-500 text-orange-600 font-bold"
                        : "border-transparent text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    Email & Password
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserLoginMethod("otp")}
                    className={`pb-1 border-b-2 transition-colors flex items-center gap-1 ${
                      userLoginMethod === "otp"
                        ? "border-orange-500 text-orange-600 font-bold"
                        : "border-transparent text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" /> Mobile OTP Login
                  </button>
                </div>
              )}

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* USER OTP LOGIN FLOW */}
                {activeTab === "user" && userLoginMethod === "otp" ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                        Registered Mobile Number
                      </label>
                      <div className="relative">
                        <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-10 pr-24 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 text-sm transition-all outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={loading}
                          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
                        >
                          {otpSent ? "Resend" : "Send OTP"}
                        </button>
                      </div>
                    </div>

                    {otpSent && (
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                            6-Digit Verification Code
                          </label>
                          <span className="text-xs text-emerald-600 font-mono">Demo: 123456</span>
                        </div>
                        <input
                          type="text"
                          maxLength={6}
                          placeholder="123456"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          className="w-full text-center tracking-widest text-lg font-mono py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  /* STANDARD EMAIL & PASSWORD */
                  <>
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                        {activeTab === "admin" ? "Enterprise Email Address" : "Account Email"}
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          placeholder={activeTab === "admin" ? "admin@cos.com" : "client@cos.com"}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 text-sm transition-all outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setForgotEmail(email);
                            setShowForgotModal(true);
                          }}
                          className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          placeholder="••••••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 text-sm transition-all outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* EXTRA FEATURE: ADMIN TWO-FACTOR AUTHENTICATION TOGGLE */}
                    {activeTab === "admin" && (
                      <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200/80 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <KeyRound className="w-4 h-4 text-amber-600" />
                            <span className="text-xs font-bold text-slate-800">
                              Two-Factor Authentication (2FA)
                            </span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={twoFactorEnabled}
                              onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-slate-900"></div>
                          </label>
                        </div>
                        {twoFactorEnabled && (
                          <div className="pt-2 border-t border-slate-200">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[11px] text-slate-500">Google Authenticator 6-Digit Code</span>
                              <span className="text-[11px] font-mono text-emerald-600 font-semibold">Demo: Any 6 digits</span>
                            </div>
                            <input
                              type="text"
                              maxLength={6}
                              placeholder="000000"
                              value={twoFactorCode}
                              onChange={(e) => setTwoFactorCode(e.target.value)}
                              className="w-full text-center tracking-widest text-sm font-mono py-2 rounded-lg border border-slate-300 bg-white focus:border-slate-900 outline-none"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}

                {/* REMEMBER ME & SECURITY INDICATOR */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span>Remember this session (30 days)</span>
                  </label>

                  <div className="flex items-center gap-1 text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Protected</span>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 text-white disabled:opacity-60 disabled:cursor-not-allowed ${
                    activeTab === "admin"
                      ? "bg-slate-900 hover:bg-slate-800 shadow-slate-900/25 hover:shadow-slate-900/40"
                      : "bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-orange-500/25 hover:shadow-orange-500/40"
                  }`}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Authenticating Credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>{activeTab === "admin" ? "Access Enterprise Console" : "Sign In to Client Portal"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* QUICK ONE-CLICK DEMO ROLES (REQUESTED EXTRA FEATURE) */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Quick 1-Click Demo Profiles
                  </span>
                  <span className="text-[11px] text-slate-400">Auto-fills credentials</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {DEMO_ACCOUNTS.map((demo) => (
                    <button
                      key={demo.email}
                      type="button"
                      onClick={() => handleQuickLogin(demo)}
                      className={`p-2.5 rounded-xl border text-left transition-all hover:scale-[1.02] flex flex-col justify-between ${
                        email === demo.email
                          ? "bg-orange-50/80 border-orange-300 ring-2 ring-orange-400/20 shadow-sm"
                          : "bg-slate-50 border-slate-200 hover:bg-slate-100/80"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-800 truncate">{demo.roleName}</span>
                      </div>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border inline-block w-fit ${demo.badgeColor}`}>
                        {demo.badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* FOOTER AUDIT NOTICE */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-slate-400" />
                Audit Logs Enabled for Security Compliance
              </span>
              <div className="flex items-center gap-3">
                <Link href="/privacy" className="hover:text-slate-600 transition-colors">Privacy</Link>
                <span>•</span>
                <Link href="/terms" className="hover:text-slate-600 transition-colors">Terms</Link>
                <span>•</span>
                <Link href="/contact" className="hover:text-slate-600 transition-colors">Support</Link>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: LUXURY BRANDING & STATS PANEL */}
          <div className="lg:col-span-5 relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-8 sm:p-12 text-white flex flex-col justify-between overflow-hidden">
            {/* BACKGROUND PATTERN & GLOW */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            <div className="relative z-10">
              {/* STATUS PILL */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-amber-300 font-semibold mb-8">
                <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Next-Gen Construction OS</span>
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-white mb-4 leading-tight">
                Engineering certainty from blueprint to handover.
              </h2>

              <p className="text-sm text-slate-300 mb-8 leading-relaxed">
                Connect site engineers, project managers, contractors, and property owners in real time with automated procurement, AI estimates, and transparent milestone tracking.
              </p>

              {/* INTERACTIVE PREVIEW CARD */}
              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-3 mb-8">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Active High-Rise Project</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                    Phase 3 On-Track
                  </span>
                </div>
                <div className="text-sm font-bold text-white">Imperial Heights Luxury Tower</div>
                
                {/* PROGRESS BAR */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-slate-300">
                    <span>Structural Milestones</span>
                    <span className="font-mono font-bold text-amber-400">78% Complete</span>
                  </div>
                  <div className="w-full bg-slate-700/60 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full w-[78%]" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
                  <div>
                    <div className="text-xs font-bold text-white">₹14.8 Cr</div>
                    <div className="text-[10px] text-slate-400">Budget</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">142 Days</div>
                    <div className="text-[10px] text-slate-400">Saved</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-400">0 NCRs</div>
                    <div className="text-[10px] text-slate-400">Quality</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ENTERPRISE METRICS */}
            <div className="relative z-10 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-black text-amber-400">₹450Cr+</div>
                <div className="text-[11px] text-slate-400 font-medium">Projects Built</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">99.4%</div>
                <div className="text-[11px] text-slate-400 font-medium">On-Time Rate</div>
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-400">100%</div>
                <div className="text-[11px] text-slate-400 font-medium">Audited & Safe</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* FORGOT PASSWORD INTERACTIVE MODAL */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => {
                setShowForgotModal(false);
                setForgotStep(1);
                setForgotError("");
                setForgotMsg("");
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-sm font-bold w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Reset Account Password</h3>
                <p className="text-xs text-slate-500">
                  {forgotStep === 1 ? "Enter your email to receive a reset code" : "Verify code and enter your new password"}
                </p>
              </div>
            </div>

            {forgotError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium">
                {forgotError}
              </div>
            )}

            {forgotMsg && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-medium">
                {forgotMsg}
              </div>
            )}

            <form onSubmit={handleForgotSubmit} className="space-y-4">
              {forgotStep === 1 ? (
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                    Your Registered Email
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-orange-500"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                      6-Digit OTP Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={forgotOtp}
                      onChange={(e) => setForgotOtp(e.target.value)}
                      placeholder="123456"
                      className="w-full text-center tracking-widest font-mono text-base px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                      New Password (Min. 6 chars)
                    </label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-orange-500"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={forgotLoading}
                className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm transition-colors disabled:opacity-50"
              >
                {forgotLoading ? "Processing..." : forgotStep === 1 ? "Send Reset Code" : "Update Password & Login"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="flex items-center gap-3 text-slate-600 font-semibold">
            <RefreshCw className="w-5 h-5 animate-spin text-orange-500" />
            <span>Loading Construction Operating System...</span>
          </div>
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
