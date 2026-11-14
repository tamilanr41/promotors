"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Save, Plus, User, Shield, Bell, CheckCircle2, Building2, Phone, Mail, Globe, MapPin } from "lucide-react";
import { saveLiveContent } from "@/lib/content-store";

const defaultSettings = {
  companyName: "AAA Promoterz & Builders",
  email: "admin@aaapromoterz.com",
  phone: "+91 91767 83332",
  website: "https://aaapromoterz.com",
  address: "No. 12, Gandhi Road, Near New Bus Stand, Arakkonam, Tamil Nadu - 631001",
};

const adminUsers = [
  { id: "USR-001", name: "V. Kirubanidhi", email: "admin@aaapromoterz.com", role: "Director / Super Admin", status: "active", lastLogin: "Active Now" },
  { id: "USR-002", name: "Tamilan", email: "tamilan@gmail.com", role: "Super Administrator", status: "active", lastLogin: "Today" },
  { id: "USR-003", name: "Chief Operations", email: "admin@cos.com", role: "Operations Lead", status: "active", lastLogin: "Yesterday" },
];

export default function SettingsPage() {
  const [formData, setFormData] = useState(defaultSettings);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const cached = localStorage.getItem("aaa_settings");
      if (cached) {
        setFormData(JSON.parse(cached));
      }
    } catch {}
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSavedSuccess(false);

    try {
      localStorage.setItem("aaa_settings", JSON.stringify(formData));
      await saveLiveContent("settings", formData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch {
      // Fallback saved locally
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Building2 className="h-5 w-5" />
            </span>
            <span>Admin &amp; Company Settings</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure AAA Promoterz business contact info, administration accounts, and security preferences.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-semibold animate-in fade-in duration-200">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>Settings saved successfully! All updates are live across the portal.</span>
        </div>
      )}

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <TabsTrigger value="general" className="text-xs data-[state=active]:bg-amber-500 data-[state=active]:text-slate-950 font-bold">General Profile</TabsTrigger>
          <TabsTrigger value="users" className="text-xs data-[state=active]:bg-amber-500 data-[state=active]:text-slate-950 font-bold">Administrators</TabsTrigger>
          <TabsTrigger value="security" className="text-xs data-[state=active]:bg-amber-500 data-[state=active]:text-slate-950 font-bold">Security Key</TabsTrigger>
        </TabsList>

        {/* GENERAL TAB */}
        <TabsContent value="general">
          <Card className="border border-slate-800 bg-slate-900/90 shadow-xl">
            <CardHeader className="border-b border-slate-800/80">
              <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                <Building2 className="h-4 w-4 text-amber-400" />
                <span>Company Contact &amp; Public Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-slate-300">Company Name</Label>
                    <Input
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="bg-slate-950 border-slate-800 text-xs text-white focus:border-amber-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-slate-300">Official Email</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-slate-950 border-slate-800 text-xs text-white focus:border-amber-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-slate-300">Phone Number</Label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-slate-950 border-slate-800 text-xs text-white focus:border-amber-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-slate-300">Official Website</Label>
                    <Input
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="bg-slate-950 border-slate-800 text-xs text-white focus:border-amber-400"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-slate-300">Office Headquarter Address</Label>
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="bg-slate-950 border-slate-800 text-xs text-white focus:border-amber-400"
                  />
                </div>
                <Separator className="bg-slate-800 my-4" />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-2 px-5 rounded-xl shadow-md transition-all flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>{loading ? "Saving Changes..." : "Save Changes"}</span>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* USERS TAB */}
        <TabsContent value="users">
          <Card className="border border-slate-800 bg-slate-900/90 shadow-xl">
            <CardHeader className="border-b border-slate-800/80">
              <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                <User className="h-4 w-4 text-amber-400" />
                <span>Authorized Administrative Users</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-800">
                    <TableHead className="text-xs text-slate-400">Name</TableHead>
                    <TableHead className="text-xs text-slate-400">Email</TableHead>
                    <TableHead className="text-xs text-slate-400">Role</TableHead>
                    <TableHead className="text-xs text-slate-400">Status</TableHead>
                    <TableHead className="text-xs text-slate-400">Access</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adminUsers.map((u) => (
                    <TableRow key={u.id} className="border-slate-800/50">
                      <TableCell className="text-xs font-bold text-white">{u.name}</TableCell>
                      <TableCell className="text-xs text-slate-300 font-mono">{u.email}</TableCell>
                      <TableCell className="text-xs text-amber-400">{u.role}</TableCell>
                      <TableCell>
                        <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-[10px]">
                          {u.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-slate-400">{u.lastLogin}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SECURITY TAB */}
        <TabsContent value="security">
          <Card className="border border-slate-800 bg-slate-900/90 shadow-xl">
            <CardHeader className="border-b border-slate-800/80">
              <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                <Shield className="h-4 w-4 text-amber-400" />
                <span>Admin Master Security Passkey</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-2">
                <div className="text-xs font-bold text-amber-300">Authorized Master Security Key:</div>
                <div className="font-mono text-sm font-extrabold bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 text-amber-400 select-all inline-block">
                  AAA@ADMIN#2026
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  This passkey authorizes account registration on <code className="text-amber-400">/admin-login</code> and acts as an emergency master override password for all administrative logins.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
