"use client";

import { useState } from "react";
import {
  FolderKanban,
  Plus,
  Search,
  Edit,
  Trash2,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Eye,
  X,
  Layers,
  Sparkles,
  DollarSign,
  Upload
} from "lucide-react";
import Image from "next/image";
import { useLiveContent, ProjectItem } from "@/lib/content-store";

const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: "PRJ-001",
    name: "Maduranthakam Green City Phase 1",
    location: "Maduranthakam (Near Railway Station)",
    category: "Residential Layout",
    plotsCount: 48,
    priceRange: "₹650 - ₹850 / sq.ft",
    status: "Ready to Construct",
    image: "/layoutmad1.jpeg",
    description: "Prime residential layout with clear DTCP titles, tar roads, 24x7 water and street lights.",
    isActive: true,
  },
  {
    id: "PRJ-002",
    name: "Thiruthani Temple View Layout",
    location: "Thiruthani Bypass Road",
    category: "Residential Layout",
    plotsCount: 36,
    priceRange: "₹750 - ₹950 / sq.ft",
    status: "Fast Selling",
    image: "/img2.png",
    description: "Serene residential layout just 5 mins from the temple with excellent connectivity to Chennai highway.",
    isActive: true,
  },
  {
    id: "PRJ-003",
    name: "Maduranthangam Royal Town",
    location: "Maduranthangam Town Center",
    category: "Residential Layout",
    plotsCount: 62,
    priceRange: "₹550 - ₹750 / sq.ft",
    status: "Ongoing Development",
    image: "/img1.png",
    description: "Rapidly appreciating residential layout surrounded by schools, colleges and hospitals.",
    isActive: true,
  },
  {
    id: "PRJ-004",
    name: "Acharapakkam Agro Farm Lands",
    location: "Acharapakkam Green Belt",
    category: "Farming Land",
    plotsCount: 18,
    priceRange: "₹35 Lakhs / Acre",
    status: "Ready to Construct",
    image: "/formland.jpeg",
    description: "Fertile agricultural farming plots with borewell water, red soil, and boundary fencing.",
    isActive: true,
  },
  {
    id: "PRJ-005",
    name: "JP Avenue Premium Plots",
    location: "Arakkonam North",
    category: "Residential Layout",
    plotsCount: 28,
    priceRange: "₹800 / sq.ft",
    status: "Completed",
    image: "/scetch1.jpeg",
    description: "100% sold-out project with happy families already starting house construction.",
    isActive: false,
  },
];

export default function CurrentProjectsPage() {
  const [projects, setProjects] = useLiveContent<ProjectItem>("projects", INITIAL_PROJECTS);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "deactive">("all");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<ProjectItem, "id">>({
    name: "",
    location: "",
    category: "Residential Layout",
    plotsCount: 20,
    priceRange: "",
    status: "Ready to Construct",
    image: "/img1.png",
    description: "",
    isActive: true,
  });

  // Delete Confirmation State
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [actionAlert, setActionAlert] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setActionAlert(msg);
    setTimeout(() => setActionAlert(null), 3500);
  };

  const toggleProjectStatus = async (id: string) => {
    const updated = projects.map((p) =>
      p.id === id ? { ...p, isActive: p.isActive === false ? true : false } : p
    );
    await setProjects(updated);
    showFeedback("Project status updated successfully!");
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchesLocation =
      locationFilter === "all" ||
      p.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" ? p.isActive !== false : p.isActive === false);
    return matchesSearch && matchesLocation && matchesStatus;
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: "",
      location: "",
      category: "Residential Layout",
      plotsCount: 30,
      priceRange: "₹700 / sq.ft",
      status: "Ready to Construct",
      image: "/img1.png",
      description: "",
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: ProjectItem) => {
    setEditingId(project.id);
    setFormData({
      name: project.name,
      location: project.location,
      category: project.category,
      plotsCount: project.plotsCount,
      priceRange: project.priceRange,
      status: project.status,
      image: project.image,
      description: project.description,
      isActive: project.isActive !== false,
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
    let updated: ProjectItem[];
    if (editingId) {
      updated = projects.map((p) => (p.id === editingId ? { ...formData, id: editingId } : p));
      showFeedback("Project details saved and updated live!");
    } else {
      const newId = `PRJ-${String(Date.now()).slice(-4)}`;
      updated = [{ ...formData, id: newId }, ...projects];
      showFeedback("New project added successfully!");
    }
    await setProjects(updated);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    await setProjects(updated);
    setDeleteConfirmId(null);
    showFeedback("Project deleted.");
  };

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <FolderKanban className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Current Active Projects
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage your ongoing and completed land layouts and plot sales across Tamil Nadu.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.02]"
        >
          <Plus className="h-4 w-4 stroke-[3]" />
          <span>Add New Project</span>
        </button>
      </div>

      {actionAlert && (
        <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-semibold animate-in fade-in duration-200">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>{actionAlert}</span>
        </div>
      )}

      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search current projects by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:border-amber-500 outline-none transition-colors"
          />
        </div>

        {/* STATUS FILTER (ALL / ACTIVE / DEACTIVE) */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "deactive")}
          className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 focus:border-amber-500 outline-none"
        >
          <option value="all">All Status (Active &amp; Deactive)</option>
          <option value="active">Active Only</option>
          <option value="deactive">Deactive Only</option>
        </select>

        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 focus:border-amber-500 outline-none"
        >
          <option value="all">All Locations</option>
          <option value="arakkonam">Arakkonam</option>
          <option value="thiruthani">Thiruthani</option>
          <option value="maduranthangam">Maduranthangam</option>
          <option value="acharapakkam">Acharapakkam</option>
        </select>
      </div>

      {/* PROJECTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            className={`group rounded-2xl bg-slate-900 border overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xl ${
              p.isActive !== false
                ? "border-slate-800 hover:border-amber-500/50"
                : "border-rose-900/40 bg-slate-900/70 opacity-80"
            }`}
          >
            <div>
              {/* IMAGE WITH HOVER ANIMATION */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={500}
                  height={300}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                    p.isActive === false ? "grayscale-[0.4] opacity-75" : ""
                  }`}
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-amber-400 border border-amber-500/30">
                    {p.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <span
                    className={`px-2 py-0.5 rounded-md backdrop-blur-md text-[9px] font-black uppercase tracking-wider border ${
                      p.isActive !== false
                        ? "bg-emerald-950/80 text-emerald-400 border-emerald-500/40"
                        : "bg-rose-950/80 text-rose-400 border-rose-500/40"
                    }`}
                  >
                    {p.isActive !== false ? "Active" : "Deactive"}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md backdrop-blur-md text-[9px] font-bold border ${
                      p.status === "Ready to Construct"
                        ? "bg-slate-950/80 text-emerald-400 border-emerald-500/40"
                        : p.status === "Fast Selling"
                        ? "bg-slate-950/80 text-amber-300 border-amber-500/40"
                        : "bg-slate-950/80 text-blue-400 border-blue-500/40"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
              </div>

              {/* DETAILS */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                    {p.name}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1 mb-3">
                  <MapPin className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{p.location}</span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {p.description}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Available Units</span>
                    <span className="font-bold text-white font-mono">{p.plotsCount} Plots</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Pricing</span>
                    <span className="font-bold text-amber-400">{p.priceRange}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS (ACTIVE/DEACTIVE TOGGLE + CRUD) */}
            <div className="p-4 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between gap-2">
              {/* ONE-CLICK ACTIVE / DEACTIVE TOGGLE */}
              <button
                onClick={() => toggleProjectStatus(p.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  p.isActive !== false
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/25"
                    : "bg-rose-500/15 text-rose-400 border-rose-500/40 hover:bg-rose-500/25"
                }`}
                title={p.isActive !== false ? "Click to Deactivate Project" : "Click to Activate Project"}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    p.isActive !== false ? "bg-emerald-400 animate-pulse" : "bg-rose-400"
                  }`}
                />
                <span>{p.isActive !== false ? "Active" : "Deactive"}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(p)}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-amber-500/10 text-slate-300 hover:text-amber-400 transition-colors border border-slate-800 hover:border-amber-500/40"
                  title="Edit Project"
                >
                  <Edit className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setDeleteConfirmId(p.id)}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-red-500/10 text-slate-300 hover:text-red-400 transition-colors border border-slate-800 hover:border-red-500/40"
                  title="Delete Project"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800">
          <FolderKanban className="h-10 w-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-300">No Projects Found</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting your search or filter keywords.</p>
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              {editingId ? "Edit Project Details" : "Add New Layout Project"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Enter the specifications, location, plots count, and pricing for this layout.
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">Project Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Arakkonam Royal Enclave"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-amber-500 outline-none"
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
                    placeholder="e.g. Thiruthani Main Road"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-amber-500 outline-none"
                  >
                    <option value="Residential Layout">Residential Layout</option>
                    <option value="Commercial Plots">Commercial Land / Builds</option>
                    <option value="Industrial Plots">Industrial Plots</option>
                    <option value="Infrastructure Development">Infrastructure Development</option>
                    <option value="Renovation & Building">Renovation & Building</option>
                    <option value="Farming Land">Farming Land</option>
                    <option value="Villa Layout">Villa Layout</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">Plots Count</label>
                  <input
                    type="number"
                    min={1}
                    value={formData.plotsCount}
                    onChange={(e) => setFormData({ ...formData, plotsCount: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-amber-500 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">Price / sq.ft</label>
                  <input
                    type="text"
                    value={formData.priceRange}
                    onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                    placeholder="₹750 / sq.ft"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-amber-500 outline-none"
                  >
                    <option value="Ready to Construct">Ready to Construct</option>
                    <option value="Fast Selling">Fast Selling</option>
                    <option value="Ongoing Development">Ongoing Development</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1.5">
                  Project Image (Upload from Computer or Select Preset)
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <label className="flex-1 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold cursor-pointer transition-all">
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
                    className="flex-1 w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-amber-500 outline-none"
                  >
                    {formData.image.startsWith("data:") && (
                      <option value="local">Selected Local Image</option>
                    )}
                    <option value="/img1.png">Layout Image 1 (/img1.png)</option>
                    <option value="/img2.png">Layout Image 2 (/img2.png)</option>
                    <option value="/img3.png">Layout Image 3 (/img3.png)</option>
                    <option value="/img4.png">Layout Image 4 (/img4.png)</option>
                    <option value="/img5.png">Layout Image 5 (/img5.png)</option>
                    <option value="/img6.png">Farm Lands Image (/img6.png)</option>
                    <option value="/img7.png">Site Aerial Image (/img7.png)</option>
                    <option value="/layoutmad1.jpeg">Maduranthangam Layout (/layoutmad1.jpeg)</option>
                    <option value="/layoutarak1.jpeg">Arakkonam Site (/layoutarak1.jpeg)</option>
                    <option value="/formland.jpeg">Farmland (/formland.jpeg)</option>
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
                    {formData.isActive !== false ? "Active on public layouts & inquiries" : "Deactive / Hidden from layout listings"}
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
                <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Highlights, title approvals, nearby landmarks..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-amber-500 outline-none"
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
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-500/25"
                >
                  {editingId ? "Update Project" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Delete This Project?</h3>
            <p className="text-xs text-slate-400 mb-6">
              Are you sure you want to remove this project? This action will remove it from the dashboard.
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
