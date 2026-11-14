
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  ShieldAlert,
  User,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Building2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");

  // Login form state (empty by default as requested)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regRole, setRegRole] = useState("admin");
  const [regSecretCode, setRegSecretCode] = useState("");
  const [showSecretCode, setShowSecretCode] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password. Please check your credentials.");
        setLoading(false);
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("An error occurred during authentication. Please try again.");
      setLoading(false);
    }
  };

  // Handle Create New Admin Account
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim() || !regPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!regSecretCode.trim()) {
      setError("Admin Secret Key is required to authorize account creation.");
      return;
    }

    if (regPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: regName.trim(),
          email: regEmail.trim().toLowerCase(),
          password: regPassword,
          role: regRole,
          secretCode: regSecretCode.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create admin account.");
        setLoading(false);
        return;
      }

      setSuccessMsg("Account created successfully! Logging you in...");

      // Automatically sign in the newly registered admin
      const signInRes = await signIn("credentials", {
        email: regEmail.trim().toLowerCase(),
        password: regPassword,
        redirect: false,
      });

      if (signInRes?.ok) {
        router.push("/dashboard");
      } else {
        setMode("login");
        setEmail(regEmail);
        setPassword("");
        setSuccessMsg("Account registered! Please enter your password to sign in.");
        setLoading(false);
      }
    } catch {
      setError("Failed to register. Please check your network connection.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      {/* Top Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-8 w-8 rounded-lg bg-slate-900 border border-amber-500/30 flex items-center justify-center p-1">
            <Image src="/logo.png" alt="Logo" width={28} height={28} className="object-contain" />
          </div>
          <div>
            <span className="font-display text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
              <span className="text-amber-400">AAA</span> PROMOTERZ
            </span>
            <span className="block text-[8px] uppercase tracking-widest text-slate-400 font-mono">
              ADMIN CONTROL CENTER
            </span>
          </div>
        </Link>
        <Link
          href="/"
          className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1 font-medium"
        >
          &larr; Back to Website
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-md">
          {/* Card Box */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Title & Mode Switcher */}
            <div className="text-center mb-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 mb-3 shadow-sm">
                <Shield className="h-6 w-6" />
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                {mode === "login" ? "Admin Sign In" : "Create Admin ID"}
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                {mode === "login"
                  ? "Enter your credentials to access project controls & leads"
                  : "Register a new administrative account"}
              </p>

              {/* Tabs */}
              <div className="mt-5 grid grid-cols-2 p-1 rounded-xl bg-slate-950 border border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setError("");
                    setSuccessMsg("");
                  }}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${mode === "login"
                      ? "bg-amber-500 text-slate-950 shadow-sm"
                      : "text-slate-400 hover:text-white"
                    }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("register");
                    setError("");
                    setSuccessMsg("");
                  }}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${mode === "register"
                      ? "bg-amber-500 text-slate-950 shadow-sm"
                      : "text-slate-400 hover:text-white"
                    }`}
                >
                  Create New ID
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Success Message */}
            {successMsg && (
              <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* LOGIN FORM */}
            {mode === "login" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Admin Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input
                      type="email"
                      required
                      placeholder="Enter your admin email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 text-xs bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300">Password</label>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Enter your password..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 text-xs bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus:border-amber-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-5 rounded-xl shadow-md shadow-amber-500/20 transition-all mt-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-3.5 w-3.5 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                      Authenticating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span>Sign In to Dashboard</span>
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            ) : (
              /* REGISTER NEW ID FORM */
              <form onSubmit={handleRegister} className="space-y-3.5">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input
                      type="text"
                      required
                      placeholder="e.g. V. Kirubanidhi (Director)"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="pl-10 text-xs bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Admin Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input
                      type="email"
                      required
                      placeholder="admin@aaapromoterz.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="pl-10 text-xs bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Create Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <Input
                        type="password"
                        required
                        placeholder="Min 6 chars"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="pl-10 text-xs bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus:border-amber-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Confirm</label>
                    <div className="relative">
                      <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <Input
                        type="password"
                        required
                        placeholder="Re-enter password"
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        className="pl-10 text-xs bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Admin Role</label>
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value)}
                    className="w-full text-xs bg-slate-950 border border-slate-800 rounded-md p-2 text-white focus:border-amber-400"
                  >
                    <option value="super_admin">Super Administrator (Full Access)</option>
                    <option value="project_manager">Project Manager (Projects & Offers)</option>
                    <option value="site_engineer">Site Coordinator (Enquiries & Visits)</option>
                  </select>
                </div>

                {/* HARDCODED ADMIN SECURITY SECRET CODE */}
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                      <ShieldAlert className="h-4 w-4 text-amber-400" />
                      <span>Admin Master Secret Key</span>
                    </label>
                    <span className="text-[9px] font-mono font-black text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-400/30 uppercase tracking-wider">
                      REQUIRED
                    </span>
                  </div>
                  <div className="relative">
                    <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-400" />
                    <Input
                      type={showSecretCode ? "text" : "password"}
                      required
                      placeholder="Enter secret code to authorize..."
                      value={regSecretCode}
                      onChange={(e) => setRegSecretCode(e.target.value)}
                      className="pl-10 pr-10 text-xs bg-slate-950 border-amber-500/40 text-white placeholder:text-slate-600 focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSecretCode(!showSecretCode)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                      tabIndex={-1}
                    >
                      {showSecretCode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    Authorized company master security passkey required to register new administrator accounts.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-5 rounded-xl shadow-md shadow-amber-500/20 transition-all mt-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-3.5 w-3.5 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                      Creating Account...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      <span>Create Account &amp; Access Dashboard</span>
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono">
        © 2026 AAA Promoterz &amp; Builders. Administrative Security Portal.
      </footer>
    </div>
  );
}
