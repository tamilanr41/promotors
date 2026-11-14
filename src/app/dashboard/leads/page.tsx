"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Plus,
  Search,
  Users2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  X,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { useLiveContent, LeadItem as Lead } from "@/lib/content-store";

const statusBadgeStyles: Record<Lead["status"], { label: string; badgeClass: string }> = {
  new: { label: "New Lead", badgeClass: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30" },
  contacted: { label: "Contacted", badgeClass: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30" },
  "site-visit-fixed": { label: "Site Visit Fixed", badgeClass: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30" },
  booked: { label: "Plot Booked", badgeClass: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30" },
  cancelled: { label: "Not Interested", badgeClass: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/30" },
};

export default function LeadsPage() {
  const [leads, setLeads] = useLiveContent<Lead>("leads", []);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [actionAlert, setActionAlert] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setActionAlert(msg);
    setTimeout(() => setActionAlert(null), 3500);
  };

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    project: "Arakkonam Green City",
    plotSize: "1,200 sq.ft",
    budget: "₹10 Lakhs",
    status: "new" as Lead["status"],
    source: "Website Form",
    notes: "",
  });

  const handleOpenAdd = () => {
    setEditingLead(null);
    setFormData({
      name: "",
      phone: "",
      email: "",
      project: "Arakkonam Green City",
      plotSize: "1,200 sq.ft",
      budget: "₹10 Lakhs",
      status: "new",
      source: "Phone Call",
      notes: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (lead: Lead) => {
    setEditingLead(lead);
    setFormData({
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      project: lead.project,
      plotSize: lead.plotSize,
      budget: lead.budget,
      status: lead.status,
      source: lead.source,
      notes: lead.notes,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this enquiry record?")) {
      await setLeads(leads.filter((l) => l.id !== id));
      showFeedback("Enquiry deleted.");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLead) {
      const updated = leads.map((l) =>
        l.id === editingLead.id
          ? {
              ...l,
              ...formData,
            }
          : l
      );
      await setLeads(updated);
      showFeedback("Lead enquiry updated successfully!");
    } else {
      const newLead: Lead = {
        id: `LD-${Math.floor(100 + Math.random() * 900)}`,
        ...formData,
        date: new Date().toISOString().split("T")[0],
      };
      await setLeads([newLead, ...leads]);
      showFeedback("New lead enquiry added!");
    }
    setIsModalOpen(false);
  };

  const filtered = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      l.project.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Users2 className="w-3.5 h-3.5" /> Customer Inquiries & Leads
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Booking Enquiries & Site Visits
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage incoming phone calls, website inquiries, and scheduled site visits
          </p>
        </div>
        <Button
          onClick={handleOpenAdd}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold shadow-md shadow-purple-500/20"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Enquiry
        </Button>
      </div>

      {actionAlert && (
        <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-semibold animate-in fade-in duration-200">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>{actionAlert}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <Card className="border border-slate-200 dark:border-slate-800 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by buyer name, phone, project..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-slate-500 shrink-0">Filter Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs border border-slate-200 dark:border-slate-800 rounded-md px-2.5 py-1.5 bg-transparent"
              >
                <option value="all">All Enquiries ({leads.length})</option>
                <option value="new">New Leads</option>
                <option value="contacted">Contacted</option>
                <option value="site-visit-fixed">Site Visit Fixed</option>
                <option value="booked">Booked</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card className="border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 dark:bg-slate-900/40">
              <TableHead className="text-xs font-bold">Buyer Details</TableHead>
              <TableHead className="text-xs font-bold">Interested Project</TableHead>
              <TableHead className="text-xs font-bold">Plot Requirement</TableHead>
              <TableHead className="text-xs font-bold">Budget</TableHead>
              <TableHead className="text-xs font-bold">Status</TableHead>
              <TableHead className="text-xs font-bold">Date</TableHead>
              <TableHead className="text-xs font-bold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((lead) => {
              const statusInfo = statusBadgeStyles[lead.status];
              return (
                <TableRow key={lead.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/30">
                  <TableCell>
                    <div>
                      <p className="font-bold text-sm text-slate-900 dark:text-white">{lead.name}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <a href={`tel:${lead.phone}`} className="hover:text-amber-600 flex items-center gap-1 font-mono">
                          <Phone className="w-3 h-3 text-slate-400" /> {lead.phone}
                        </a>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate max-w-xs mt-0.5">{lead.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-xs text-slate-900 dark:text-white flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                      {lead.project}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Via {lead.source}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">{lead.plotSize}</span>
                    {lead.notes && (
                      <p className="text-[11px] text-slate-500 italic truncate max-w-xs mt-0.5">&ldquo;{lead.notes}&rdquo;</p>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="font-extrabold text-xs text-emerald-600 dark:text-emerald-400">{lead.budget}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[10px] font-semibold ${statusInfo.badgeClass}`}>
                      {statusInfo.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-slate-500 font-mono">{lead.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleOpenEdit(lead)}
                        className="h-8 w-8 p-0 text-slate-600 hover:text-amber-600"
                        title="Edit Lead"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(lead.id)}
                        className="h-8 w-8 p-0 text-slate-600 hover:text-rose-600"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-slate-500 text-xs">
                  <div className="flex flex-col items-center justify-center">
                    <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mb-2">
                      <Users2 className="h-5 w-5" />
                    </div>
                    <p className="font-semibold text-slate-700 dark:text-slate-300">No Booking Enquiries Yet</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">When buyers submit site visit requests or contact forms on the website, they will appear here in real-time.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
              <h2 className="font-bold text-base text-slate-900 dark:text-white">
                {editingLead ? "Edit Enquiry Details" : "Add New Customer Enquiry"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Buyer Full Name</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. S. K. Venkatesh"
                    className="mt-1 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Phone Number</label>
                  <Input
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98401 22345"
                    className="mt-1 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="buyer@gmail.com"
                    className="mt-1 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Target Project</label>
                  <select
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="mt-1 w-full text-xs border border-slate-200 dark:border-slate-800 rounded-md p-2 bg-transparent"
                  >
                    <option value="Arakkonam Green City">Arakkonam Green City</option>
                    <option value="Thiruthani Temple View">Thiruthani Temple View</option>
                    <option value="Maduranthangam Royal Town">Maduranthangam Royal Town</option>
                    <option value="Acharapakkam Agro Farm">Acharapakkam Agro Farm</option>
                    <option value="Tiruvallur Metro City (Upcoming)">Tiruvallur Metro City</option>
                    <option value="Kanchipuram Silk City (Upcoming)">Kanchipuram Silk City</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Plot Size</label>
                  <Input
                    value={formData.plotSize}
                    onChange={(e) => setFormData({ ...formData, plotSize: e.target.value })}
                    placeholder="e.g. 1,200 sq.ft"
                    className="mt-1 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Budget Range</label>
                  <Input
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="e.g. ₹12 Lakhs"
                    className="mt-1 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Lead Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Lead["status"] })}
                    className="mt-1 w-full text-xs border border-slate-200 dark:border-slate-800 rounded-md p-2 bg-transparent"
                  >
                    <option value="new">New Lead</option>
                    <option value="contacted">Contacted</option>
                    <option value="site-visit-fixed">Site Visit Fixed</option>
                    <option value="booked">Plot Booked</option>
                    <option value="cancelled">Not Interested</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Notes / Remarks</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Wants Sunday 11 AM cab pickup for site visit..."
                  className="mt-1 w-full text-xs border border-slate-200 dark:border-slate-800 rounded-md p-2 bg-transparent focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="text-xs">
                  Cancel
                </Button>
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold">
                  {editingLead ? "Save Changes" : "Create Enquiry"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
