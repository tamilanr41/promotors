"use client";

import { useState } from "react";
import {
  MessageSquareQuote,
  Plus,
  Search,
  Edit2,
  Trash2,
  Star,
  MapPin,
  CheckCircle2,
  Upload,
  X,
  Sparkles,
  Quote,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLiveContent, TestimonialItem } from "@/lib/content-store";

const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "REV-001",
    name: "S. Karthik",
    role: "Plot Owner · Phase 1",
    location: "Arakkonam Layout",
    rating: 5,
    text: "Clear paperwork, transparent pricing and a team that actually answers calls. We got our registered plot exactly on the promised date without any hassle.",
    featured: true,
    active: true,
    date: "2026-04-18",
  },
  {
    id: "REV-002",
    name: "Priya & Ramesh",
    role: "Homeowners",
    location: "Maduranthangam Royal Town",
    rating: 5,
    text: "From the first site visit to the final sub-registrar registration, everything was explained in writing. No surprises, no hidden charges. Highly recommended developer.",
    featured: true,
    active: true,
    date: "2026-04-12",
  },
  {
    id: "REV-003",
    name: "V. Muthu",
    role: "Farmland Investor",
    location: "Chengalpattu Belt",
    rating: 5,
    text: "Their verification of patta, chitta and 30-year EC gave us the complete confidence to buy. Sweet groundwater and fertile red soil exactly as described.",
    featured: false,
    active: true,
    date: "2026-03-29",
  },
  {
    id: "REV-004",
    name: "Lakshmi Narayanan",
    role: "Plot Owner · Murugan Temple View",
    location: "Thiruthani Layout",
    rating: 5,
    text: "Tar roads, drainage and street lights were all in place before we paid. A rare, honest developer in Tamil Nadu who delivers before collecting balance payments.",
    featured: true,
    active: true,
    date: "2026-03-15",
  },
  {
    id: "REV-005",
    name: "Dr. K. Senthil Nathan",
    role: "Commercial Land Owner",
    location: "Acharapakkam Highway",
    rating: 4,
    text: "Excellent legal assistance and prompt spot registration. The location has tremendous appreciation potential near the highway.",
    featured: false,
    active: true,
    date: "2026-02-28",
  },
];

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useLiveContent<TestimonialItem>("testimonials", INITIAL_TESTIMONIALS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [actionAlert, setActionAlert] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setActionAlert(msg);
    setTimeout(() => setActionAlert(null), 3500);
  };

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    location: "Arakkonam",
    rating: 5,
    text: "",
    image: "",
    featured: false,
    active: true,
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: "",
      role: "Plot Buyer",
      location: "Arakkonam",
      rating: 5,
      text: "",
      image: "",
      featured: false,
      active: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: TestimonialItem) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      role: item.role,
      location: item.location,
      rating: item.rating,
      text: item.text,
      image: item.image || "",
      featured: item.featured,
      active: item.active,
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
    let updated: TestimonialItem[];
    if (editingId) {
      updated = testimonials.map((t) => (t.id === editingId ? { ...t, ...formData } : t));
      showFeedback("Customer review updated and live across site!");
    } else {
      const newItem: TestimonialItem = {
        id: `REV-${String(Date.now()).slice(-4)}`,
        ...formData,
        date: new Date().toISOString().split("T")[0],
      };
      updated = [newItem, ...testimonials];
      showFeedback("New review added successfully!");
    }
    await setTestimonials(updated);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    const updated = testimonials.filter((t) => t.id !== id);
    await setTestimonials(updated);
    setDeleteConfirmId(null);
    showFeedback("Review deleted.");
  };

  const toggleActive = async (id: string) => {
    const updated = testimonials.map((t) => (t.id === id ? { ...t, active: !t.active } : t));
    await setTestimonials(updated);
    showFeedback("Review visibility status updated!");
  };

  const toggleFeatured = async (id: string) => {
    const updated = testimonials.map((t) => (t.id === id ? { ...t, featured: !t.featured } : t));
    await setTestimonials(updated);
    showFeedback("Review featured status updated!");
  };

  const filtered = testimonials.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.location.toLowerCase().includes(search.toLowerCase()) ||
      t.text.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && t.active) ||
      (statusFilter === "featured" && t.featured) ||
      (statusFilter === "inactive" && !t.active);
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
            <MessageSquareQuote className="w-3.5 h-3.5" /> Client Reviews &amp; Testimonials
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Customer Testimonials Manager
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Add, update, or feature real customer reviews displayed across the website
          </p>
        </div>

        <Button
          onClick={handleOpenAdd}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Add New Testimonial
        </Button>
      </div>

      {actionAlert && (
        <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-semibold animate-in fade-in duration-200">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>{actionAlert}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search reviews by buyer name, location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 text-xs bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-slate-500 shrink-0 font-medium">Filter:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs border border-slate-200 dark:border-slate-800 rounded-md px-2.5 py-1.5 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              >
                <option value="all">All Reviews ({testimonials.length})</option>
                <option value="active">Active Reviews</option>
                <option value="featured">Featured on Homepage</option>
                <option value="inactive">Hidden / Inactive</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl border bg-white dark:bg-slate-900 p-5 flex flex-col justify-between shadow-sm transition-all duration-200 hover:shadow-md ${
              item.featured
                ? "border-amber-400 dark:border-amber-500/50"
                : "border-slate-200 dark:border-slate-800"
            }`}
          >
            <div>
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  {item.featured && (
                    <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-[9px] font-bold">
                      Featured
                    </Badge>
                  )}
                  <button
                    onClick={() => toggleActive(item.id)}
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold border transition-colors ${
                      item.active
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700"
                    }`}
                  >
                    {item.active ? "Live on Web" : "Hidden"}
                  </button>
                </div>
              </div>

              {/* Review Text */}
              <div className="relative mb-4">
                <Quote className="w-6 h-6 text-amber-500/20 absolute -top-1 -left-1 pointer-events-none" />
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic relative z-10 pl-3">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>
            </div>

            {/* Buyer Details & Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 shadow-sm overflow-hidden border border-amber-400/40">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    ) : (
                      item.name.charAt(0)
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">{item.name}</h4>
                    <p className="text-[10px] text-slate-500 font-medium">{item.role}</p>
                    <span className="flex items-center gap-1 text-[9px] text-amber-600 dark:text-amber-400 font-semibold mt-0.5">
                      <MapPin className="w-2.5 h-2.5" /> {item.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100 dark:border-slate-800/50 text-slate-500">
                <button
                  onClick={() => toggleFeatured(item.id)}
                  className={`text-[10px] font-semibold hover:underline ${
                    item.featured ? "text-amber-600" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {item.featured ? "★ Unfeature" : "☆ Feature on Home"}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1 rounded text-slate-500 hover:text-amber-600 dark:hover:text-amber-400"
                    title="Edit Review"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(item.id)}
                    className="p-1 rounded text-slate-500 hover:text-red-600"
                    title="Delete Review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <MessageSquareQuote className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">No Testimonials Found</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting your filter or click Add New Testimonial above.</p>
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              {editingId ? "Edit Testimonial Details" : "Add Customer Testimonial"}
            </h2>
            <p className="text-xs text-slate-500 mb-5">
              Enter buyer feedback, star ratings, and property purchase location.
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Buyer Full Name *</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. S. Karthik"
                    className="text-xs bg-white dark:bg-slate-950"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Location *</label>
                  <Input
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Arakkonam Layout"
                    className="text-xs bg-white dark:bg-slate-950"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Buyer Role / Plot Details</label>
                  <Input
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Plot Owner · Phase 1"
                    className="text-xs bg-white dark:bg-slate-950"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Star Rating</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
                    className="w-full text-xs p-2 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Testimonial Review Text *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  placeholder="Share buyer experience about legal title verification, spot registration, and layout quality..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:border-amber-500"
                />
              </div>

              {/* Upload Customer Avatar / Photo */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Customer Photo (Optional)</label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl border-2 border-dashed border-purple-500/40 bg-purple-500/5 hover:bg-purple-500/10 text-purple-700 dark:text-purple-400 text-xs font-bold cursor-pointer transition-all">
                    <Upload className="w-4 h-4" />
                    <span>Upload Photo from Computer</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLocalImageUpload}
                      className="hidden"
                    />
                  </label>
                  {formData.image && (
                    <div className="h-10 w-10 rounded-full overflow-hidden border border-amber-400 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={formData.image} alt="Preview" className="h-full w-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded text-amber-500 focus:ring-amber-500"
                  />
                  <span>Feature on Homepage Slider</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="rounded text-emerald-500 focus:ring-emerald-500"
                  />
                  <span>Publish &amp; Show Live</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="text-xs">
                  Cancel
                </Button>
                <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs">
                  {editingId ? "Update Review" : "Publish Testimonial"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/30 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Delete Customer Review?</h3>
            <p className="text-xs text-slate-500 mb-5">
              Are you sure you want to permanently remove this testimonial?
            </p>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setDeleteConfirmId(null)} className="flex-1 text-xs">
                Cancel
              </Button>
              <Button onClick={() => handleDelete(deleteConfirmId)} className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
