"use client";

import { useState } from "react";
import {
  Building,
  Plus,
  Search,
  Edit,
  Trash2,
  MapPin,
  Calendar,
  Sparkles,
  CheckCircle2,
  X,
  Layers,
  ArrowRight,
  Upload
} from "lucide-react";
import Image from "next/image";
import { useLiveContent, UpcomingProjectItem } from "@/lib/content-store";

const INITIAL_UPCOMING: UpcomingProjectItem[] = [
  {
    id: "UP-001",
    name: "Tiruvallur Metro City Layout",
    location: "Tiruvallur (Near Collectorate)",
    expectedLaunch: "April 2027",
    category: "Mega Gated Layout",
    totalAcres: "14 Acres",
    estimatedPlots: 120,
    preBookingStatus: "Pre-Booking Open",
    image: "/img4.png",
    highlights: "Close to the upcoming metro corridor, wide 40ft blacktop roads, landscaped parks and clubhouse.",
    isActive: true,
  },
  {
    id: "UP-002",
    name: "Kanchipuram Silk City Enclave",
    location: "Kanchipuram Outer Ring Road",
    expectedLaunch: "June 2027",
    category: "Residential Layout",
    totalAcres: "8 Acres",
    estimatedPlots: 75,
    preBookingStatus: "Early Bird Available",
    image: "/img5.png",
    highlights: "Direct highway frontage, 100% vaastu compliant plots with DTCP & RERA pending final clearance.",
    isActive: true,
  },
  {
    id: "UP-003",
    name: "Maduranthangam Lakeside Agro Plots",
    location: "Maduranthangam Lake Road",
    expectedLaunch: "August 2027",
    category: "Farm Lands",
    totalAcres: "25 Acres",
    estimatedPlots: 35,
    preBookingStatus: "Coming Soon",
    image: "/img6.png",
    highlights: "Scenic organic farming plots with drip irrigation, fruit orchards and secure 24/7 boundary watch.",
    isActive: true,
  },
  {
    id: "UP-004",
    name: "Acharapakkam Highway Commercial Hub",
    location: "GST Road, Acharapakkam",
    expectedLaunch: "November 2027",
    category: "Commercial Land",
    totalAcres: "5 Acres",
    estimatedPlots: 24,
    preBookingStatus: "Approvals in Progress",
    image: "/img7.png",
    highlights: "High-visibility retail and commercial showrooms on national highway with immense capital appreciation.",
    isActive: false,
  },
];

export default function UpcomingProjectsPage() {
  const [upcoming, setUpcoming] = useLiveContent<UpcomingProjectItem>("upcoming", INITIAL_UPCOMING);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "deactive">("all");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<UpcomingProjectItem, "id">>({
    name: "",
    location: "",
    expectedLaunch: "July 2027",
    category: "Residential Layout",
    totalAcres: "10 Acres",
    estimatedPlots: 80,
    preBookingStatus: "Pre-Booking Open",
    image: "/img4.png",
    highlights: "",
    isActive: true,
  });

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [actionAlert, setActionAlert] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setActionAlert(msg);
    setTimeout(() => setActionAlert(null), 3500);
  };

  const toggleUpcomingStatus = async (id: string) => {
    const updated = upcoming.map((u) =>
      u.id === id ? { ...u, isActive: u.isActive === false ? true : false } : u
    );
    await setUpcoming(updated);
    showFeedback("Upcoming project status updated!");
  };

  const filtered = upcoming.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" ? item.isActive !== false : item.isActive === false);
    return matchesSearch && matchesStatus;
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: "",
      location: "",
      expectedLaunch: "August 2027",
      category: "Residential Layout",
      totalAcres: "10 Acres",
      estimatedPlots: 80,
      preBookingStatus: "Pre-Booking Open",
      image: "/img4.png",
      highlights: "",
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: UpcomingProjectItem) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      location: item.location,
      expectedLaunch: item.expectedLaunch,
      category: item.category,
      totalAcres: item.totalAcres,
      estimatedPlots: item.estimatedPlots,
      preBookingStatus: item.preBookingStatus,
      image: item.image,
      highlights: item.highlights,
      isActive: item.isActive !== false,
    });
    setIsModalOpen(true);
  };

  const handleLocalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setFormData((prev) => ({ ...prev, image: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    let updated: UpcomingProjectItem[];
    if (editingId) {
      updated = upcoming.map((u) => (u.id === editingId ? { ...formData, id: editingId } : u));
      showFeedback("Upcoming project updated and live across site!");
    } else {
      const newId = `UP-${String(Date.now()).slice(-4)}`;
      updated = [{ ...formData, id: newId }, ...upcoming];
      showFeedback("New upcoming project added successfully!");
    }
    await setUpcoming(updated);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    const updated = upcoming.filter((u) => u.id !== id);
    await setUpcoming(updated);
    setDeleteConfirmId(null);
    showFeedback("Upcoming project deleted.");
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
              <Building className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Upcoming Projects &amp; Future Launches
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Plan, showcase, and control future layout launches, land acquisitions, and early-bird pre-bookings.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/20 hover:scale-[1.02]"
        >
          <Plus className="h-4 w-4 stroke-[3]" />
          <span>Add Upcoming Project</span>
        </button>
      </div>

      {actionAlert && (
        <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-semibold animate-in fade-in duration-200">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>{actionAlert}</span>
        </div>
      )}

      {/* SEARCH & STATUS FILTER */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search upcoming projects by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* STATUS FILTER (ALL / ACTIVE / DEACTIVE) */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "deactive")}
          className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 focus:border-blue-500 outline-none"
        >
          <option value="all">All Status (Active &amp; Deactive)</option>
          <option value="active">Active Only</option>
          <option value="deactive">Deactive Only</option>
        </select>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`group rounded-2xl bg-slate-900 border overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xl ${
              item.isActive !== false
                ? "border-slate-800 hover:border-blue-500/50"
                : "border-rose-900/40 bg-slate-900/70 opacity-80"
            }`}
          >
            <div>
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-950">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={600}
                  height={350}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                    item.isActive === false ? "grayscale-[0.4] opacity-75" : ""
                  }`}
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-blue-300 border border-blue-500/30">
                    {item.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <span
                    className={`px-2 py-0.5 rounded-md backdrop-blur-md text-[9px] font-black uppercase tracking-wider border ${
                      item.isActive !== false
                        ? "bg-emerald-950/80 text-emerald-400 border-emerald-500/40"
                        : "bg-rose-950/80 text-rose-400 border-rose-500/40"
                    }`}
                  >
                    {item.isActive !== false ? "Active" : "Deactive"}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-lg backdrop-blur-md text-[10px] font-bold border ${
                      item.preBookingStatus === "Pre-Booking Open"
                        ? "bg-slate-950/80 text-emerald-400 border-emerald-500/40"
                        : "bg-slate-950/80 text-blue-300 border-blue-500/40"
                    }`}
                  >
                    {item.preBookingStatus}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                  {item.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1 mb-3">
                  <MapPin className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {item.highlights}
                </p>

                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/80 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Expected Launch</span>
                    <span className="font-bold text-white font-mono flex items-center gap-1 mt-0.5">
                      <Calendar className="h-3 w-3 text-amber-400" />
                      {item.expectedLaunch}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Land Area</span>
                    <span className="font-bold text-slate-300 font-mono mt-0.5 block">{item.totalAcres}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Planned Plots</span>
                    <span className="font-bold text-blue-400 font-mono mt-0.5 block">{item.estimatedPlots} Plots</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS (ACTIVE/DEACTIVE TOGGLE + CRUD) */}
            <div className="p-4 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between gap-2">
              {/* ONE-CLICK ACTIVE / DEACTIVE TOGGLE */}
              <button
                onClick={() => toggleUpcomingStatus(item.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  item.isActive !== false
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/25"
                    : "bg-rose-500/15 text-rose-400 border-rose-500/40 hover:bg-rose-500/25"
                }`}
                title={item.isActive !== false ? "Click to Deactivate Project" : "Click to Activate Project"}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.isActive !== false ? "bg-emerald-400 animate-pulse" : "bg-rose-400"
                  }`}
                />
                <span>{item.isActive !== false ? "Active" : "Deactive"}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-blue-500/10 text-slate-300 hover:text-blue-400 transition-colors border border-slate-800 hover:border-blue-500/40"
                  title="Edit Launch"
                >
                  <Edit className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setDeleteConfirmId(item.id)}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-red-500/10 text-slate-300 hover:text-red-400 transition-colors border border-slate-800 hover:border-red-500/40"
                  title="Delete Launch"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              {editingId ? "Edit Upcoming Project" : "Add Upcoming Project Launch"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Enter the future layout details, estimated launch timeline, and pre-booking status.
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">Project Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Kanchipuram Green Acres"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Acharapakkam Bypass"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">Expected Launch Date</label>
                  <input
                    type="text"
                    value={formData.expectedLaunch}
                    onChange={(e) => setFormData({ ...formData, expectedLaunch: e.target.value })}
                    placeholder="e.g. September 2027"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Total Acres</label>
                  <input
                    type="text"
                    value={formData.totalAcres}
                    onChange={(e) => setFormData({ ...formData, totalAcres: e.target.value })}
                    placeholder="12 Acres"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-blue-500 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Estimated Plots</label>
                  <input
                    type="number"
                    value={formData.estimatedPlots}
                    onChange={(e) => setFormData({ ...formData, estimatedPlots: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-blue-500 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Pre-Booking Status</label>
                  <select
                    value={formData.preBookingStatus}
                    onChange={(e) => setFormData({ ...formData, preBookingStatus: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-blue-500 outline-none"
                  >
                    <option value="Pre-Booking Open">Pre-Booking Open</option>
                    <option value="Early Bird Available">Early Bird Available</option>
                    <option value="Approvals in Progress">Approvals in Progress</option>
                    <option value="Coming Soon">Coming Soon</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1.5">
                  Launch Visual (Upload from Device or Select Preset)
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <label className="flex-1 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-blue-500/40 bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-bold cursor-pointer transition-all">
                    <Upload className="w-4 h-4" />
                    <span>Upload Image from Device</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLocalImageUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase">OR</span>
                  <select
                    value={formData.image.startsWith("data:") ? "local" : formData.image}
                    onChange={(e) => {
                      if (e.target.value !== "local") {
                        setFormData({ ...formData, image: e.target.value });
                      }
                    }}
                    className="flex-1 w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-blue-500 outline-none"
                  >
                    {formData.image.startsWith("data:") && (
                      <option value="local">Selected Local Image</option>
                    )}
                    <option value="/img4.png">Site Image 4 (/img4.png)</option>
                    <option value="/img5.png">Site Image 5 (/img5.png)</option>
                    <option value="/img6.png">Farm Lands (/img6.png)</option>
                    <option value="/img7.png">Aerial View (/img7.png)</option>
                    <option value="/img1.png">Layout 1 (/img1.png)</option>
                  </select>
                </div>

                {formData.image && (
                  <div className="mt-3 flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950">
                    <div className="relative h-12 w-16 rounded-lg overflow-hidden border border-slate-300 dark:border-slate-800 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {formData.image.startsWith("data:") ? "Custom Local Device Image Loaded" : formData.image}
                      </p>
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Image Ready for Saving</p>
                    </div>
                  </div>
                )}
              </div>

              {/* ACTIVE / DEACTIVE TOGGLE IN MODAL */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950">
                <div>
                  <label className="text-xs font-bold text-slate-900 dark:text-white block">Project Visibility</label>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {formData.isActive !== false ? "Active on upcoming launches showcase" : "Deactive / Hidden from upcoming listings"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isActive: formData.isActive === false ? true : false })}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                    formData.isActive !== false
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                      : "bg-rose-500/20 text-rose-400 border-rose-500/40"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${formData.isActive !== false ? "bg-emerald-400 animate-pulse" : "bg-rose-400"}`} />
                  <span>{formData.isActive !== false ? "Active" : "Deactive"}</span>
                </button>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Project Highlights</label>
                <textarea
                  rows={3}
                  value={formData.highlights}
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                  placeholder="Transport connectivity, road widths, pre-launch discounts..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-blue-500 outline-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30"
                >
                  {editingId ? "Update Launch" : "Save Upcoming Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Delete Upcoming Project?</h3>
            <p className="text-xs text-slate-400 mb-6">
              Are you sure you want to delete this upcoming project launch?
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors shadow-md shadow-red-600/30"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
