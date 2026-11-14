"use client";

import { useState } from "react";
import {
  Tag,
  Plus,
  Search,
  Edit,
  Trash2,
  Calendar,
  Sparkles,
  CheckCircle2,
  XCircle,
  X,
  Percent,
  Gift,
  Clock,
  Layers
} from "lucide-react";
import { useLiveContent, OfferItem as BaseOfferItem } from "@/lib/content-store";

interface OfferItem {
  id: string;
  title: string;
  tag: string;
  badge?: string;
  discountType: "Free Registration" | "Cash Discount" | "Gold Coin" | "Zero Downpayment" | "Special Price";
  discountValue: string;
  applicableProjects: string;
  validTill: string;
  active: boolean;
  terms: string;
}

const INITIAL_OFFERS: OfferItem[] = [
  {
    id: "OFF-001",
    title: "100% Free Registration & Patta Transfer",
    tag: "FESTIVE DEAL",
    badge: "FESTIVE DEAL",
    discountType: "Free Registration",
    discountValue: "Save up to ₹45,000",
    applicableProjects: "Arakkonam & Thiruthani Layouts",
    validTill: "31 Dec 2026",
    active: true,
    terms: "Applicable on full payment spot booking for selected residential layout plots.",
  },
  {
    id: "OFF-002",
    title: "Spot Booking 1 Sovereign Gold Coin Gift",
    tag: "GOLDEN DEAL",
    badge: "GOLDEN DEAL",
    discountType: "Gold Coin",
    discountValue: "8 Grams 916 Gold",
    applicableProjects: "Maduranthangam Royal Town",
    validTill: "15 Jan 2027",
    active: true,
    terms: "Handed over at time of registered sale deed registration.",
  },
  {
    id: "OFF-003",
    title: "Early Bird Pre-Launch ₹100/sq.ft Discount",
    tag: "EARLY BIRD",
    badge: "EARLY BIRD",
    discountType: "Cash Discount",
    discountValue: "₹100 Off / sq.ft",
    applicableProjects: "Tiruvallur Metro City (Upcoming)",
    validTill: "28 Feb 2027",
    active: true,
    terms: "For the first 25 pre-booking customers only.",
  },
  {
    id: "OFF-004",
    title: "Zero Downpayment & Easy 12-Month EMI Scheme",
    tag: "FLEXI PAY",
    badge: "FLEXI PAY",
    discountType: "Zero Downpayment",
    discountValue: "0% Interest EMI",
    applicableProjects: "Acharapakkam Farming Lands",
    validTill: "31 Mar 2027",
    active: false,
    terms: "Pay in 12 equal monthly instalments with no bank loan documentation hassle.",
  },
];

export default function OffersPage() {
  const [offers, setOffers] = useLiveContent<OfferItem>("offers", INITIAL_OFFERS);
  const [search, setSearch] = useState("");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<OfferItem, "id">>({
    title: "",
    tag: "HOT DEAL",
    discountType: "Cash Discount",
    discountValue: "",
    applicableProjects: "All Layouts",
    validTill: "31 Dec 2026",
    active: true,
    terms: "",
  });

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [actionAlert, setActionAlert] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setActionAlert(msg);
    setTimeout(() => setActionAlert(null), 3500);
  };

  const filtered = offers.filter(
    (o) =>
      (o.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (o.applicableProjects || "").toLowerCase().includes(search.toLowerCase()) ||
      (o.tag || o.badge || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: "",
      tag: "SPECIAL PROMO",
      discountType: "Cash Discount",
      discountValue: "₹50,000 Off",
      applicableProjects: "All Layouts",
      validTill: "31 Jan 2027",
      active: true,
      terms: "Valid on plot bookings confirmed within offer period.",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (offer: OfferItem) => {
    setEditingId(offer.id);
    setFormData({
      title: offer.title,
      tag: offer.tag,
      discountType: offer.discountType,
      discountValue: offer.discountValue,
      applicableProjects: offer.applicableProjects,
      validTill: offer.validTill,
      active: offer.active,
      terms: offer.terms,
    });
    setIsModalOpen(true);
  };

  const handleToggleActive = async (id: string) => {
    const updated = offers.map((o) => (o.id === id ? { ...o, active: !o.active } : o));
    await setOffers(updated);
    showFeedback("Offer active status updated successfully!");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    let updated: OfferItem[];
    if (editingId) {
      updated = offers.map((o) => (o.id === editingId ? { ...formData, id: editingId } : o));
      showFeedback("Offer updated and live across website!");
    } else {
      const newId = `OFF-${String(Date.now()).slice(-4)}`;
      updated = [{ ...formData, id: newId }, ...offers];
      showFeedback("New promotional offer created and live!");
    }
    await setOffers(updated);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    const updated = offers.filter((o) => o.id !== id);
    await setOffers(updated);
    setDeleteConfirmId(null);
    showFeedback("Offer deleted.");
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Tag className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Special Offers &amp; Promotional Deals
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Create, manage and activate festive schemes, registration fee waivers, and early-bird discounts.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.02]"
        >
          <Plus className="h-4 w-4 stroke-[3]" />
          <span>Create New Offer</span>
        </button>
      </div>

      {actionAlert && (
        <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-semibold animate-in fade-in duration-200">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>{actionAlert}</span>
        </div>
      )}

      {/* SEARCH */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search offers by title or project..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:border-amber-500 outline-none"
        />
      </div>

      {/* OFFERS LIST / CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`group rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 shadow-xl ${item.active
                ? "bg-slate-900 border-amber-500/40 hover:border-amber-400"
                : "bg-slate-950/70 border-slate-800 opacity-75"
              }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold tracking-wider uppercase border border-amber-500/30 font-mono flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3" />
                  {item.tag}
                </span>

                <button
                  onClick={() => handleToggleActive(item.id)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 transition-colors border ${item.active
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30"
                      : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700"
                    }`}
                >
                  {item.active ? (
                    <>
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                      <span>Active on Site</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-3 w-3 text-slate-500" />
                      <span>Inactive / Paused</span>
                    </>
                  )}
                </button>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                {item.title}
              </h3>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 mb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Benefit Value</span>
                  <span className="text-base font-black text-amber-400 font-mono">{item.discountValue}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase block">Scheme Type</span>
                  <span className="text-xs font-semibold text-slate-300">{item.discountType}</span>
                </div>
              </div>

              <div className="space-y-1 text-xs text-slate-400 mb-4">
                <div className="flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                  <span>Applicable on: <strong className="text-slate-200">{item.applicableProjects}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                  <span>Valid Until: <strong className="text-slate-200 font-mono">{item.validTill}</strong></span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 italic bg-slate-950/60 p-2.5 rounded-lg border border-slate-850">
                &ldquo;{item.terms}&rdquo;
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500">{item.id}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 rounded-lg bg-slate-950 hover:bg-amber-500/10 text-slate-300 hover:text-amber-400 transition-colors border border-slate-800"
                  title="Edit Offer"
                >
                  <Edit className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setDeleteConfirmId(item.id)}
                  className="p-2 rounded-lg bg-slate-950 hover:bg-red-500/10 text-slate-300 hover:text-red-400 transition-colors border border-slate-800"
                  title="Delete Offer"
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
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <h2 className="text-xl font-bold text-white mb-1">
              {editingId ? "Edit Special Offer" : "Create New Promotional Deal"}
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Publish seasonal discounts, registration fee waivers, or spot booking gifts.
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Offer Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. 100% Free Patta &amp; Registration Offer"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-amber-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    placeholder="e.g. FESTIVE DEAL"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-amber-500 outline-none uppercase font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Benefit Value</label>
                  <input
                    type="text"
                    required
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                    placeholder="e.g. Save ₹50,000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Scheme Type</label>
                  <select
                    value={formData.discountType}
                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-amber-500 outline-none"
                  >
                    <option value="Free Registration">Free Registration &amp; Patta</option>
                    <option value="Cash Discount">Cash Discount (₹/sq.ft)</option>
                    <option value="Gold Coin">Spot Booking Gold Coin</option>
                    <option value="Zero Downpayment">Zero Downpayment Flexi EMI</option>
                    <option value="Special Price">Special Promotional Price</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Valid Till Date</label>
                  <input
                    type="text"
                    value={formData.validTill}
                    onChange={(e) => setFormData({ ...formData, validTill: e.target.value })}
                    placeholder="e.g. 31 Jan 2027"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Applicable Layouts / Sites</label>
                <input
                  type="text"
                  value={formData.applicableProjects}
                  onChange={(e) => setFormData({ ...formData, applicableProjects: e.target.value })}
                  placeholder="e.g. Arakkonam Phase 1 &amp; Thiruthani Layouts"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Terms &amp; Conditions Note</label>
                <textarea
                  rows={2}
                  value={formData.terms}
                  onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                  placeholder="Terms, booking payment window, eligibility criteria..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-amber-500 outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="activeCheck"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-amber-500"
                />
                <label htmlFor="activeCheck" className="text-xs font-semibold text-slate-300">
                  Publish this offer immediately on the website &amp; portal
                </label>
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
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-500/25"
                >
                  {editingId ? "Update Offer" : "Save & Publish Offer"}
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
            <h3 className="text-lg font-bold text-white mb-2">Delete Special Offer?</h3>
            <p className="text-xs text-slate-400 mb-6">
              Are you sure you want to permanently delete this offer?
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
