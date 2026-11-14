"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, BarChart3, Calendar, Download, FileText, HelpCircle, MessageSquare } from "lucide-react";
import { downloadFile, generateEstimateReport } from "@/lib/download";

const projectTypes = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "industrial", label: "Industrial" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "renovation", label: "Renovation" },
];

interface EstimateResult {
  costEstimate: { materials: number; labor: number; equipment: number; overheads: number; contingency: number; total: number; currency: string; isIndicative: boolean; disclaimer: string };
  estimatedDuration: number;
  suggestedPhases: { name: string; duration: number; order: number; startMonth: number; endMonth: number }[];
  materialQuantities: Record<string, { quantity: number; unit: string; rate: number; cost: number }>;
  questionsForConsultant: string[];
}

export function AIEstimatorForm() {
  const [projectType, setProjectType] = useState("");
  const [plotSize, setPlotSize] = useState("");
  const [builtUpArea, setBuiltUpArea] = useState("");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");
  const [timeline, setTimeline] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/estimator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectType, plotSize: parseFloat(plotSize) || 0, builtUpArea: parseFloat(builtUpArea) || 0, budget: parseFloat(budget) || 0, location, timeline, preferences: "" }),
      });
      if (!res.ok) throw new Error("Failed to generate estimate");
      const data = await res.json();
      setResult(data);
    } catch {
      setError("Failed to generate estimate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const report = generateEstimateReport({ ...result, projectType, location, builtUpArea });
    downloadFile(report, `estimate-${projectType || "project"}-${new Date().toISOString().slice(0, 10)}.txt`);
  };

  const maxCost = result ? Math.max(result.costEstimate.materials, result.costEstimate.labor, result.costEstimate.equipment, result.costEstimate.overheads, result.costEstimate.contingency) : 1;
  const maxMonth = result ? Math.max(...result.suggestedPhases.map((p) => p.endMonth)) : 1;

  const costCategories = result ? [
    { label: "Materials", value: result.costEstimate.materials, color: "bg-blue-500" },
    { label: "Labor", value: result.costEstimate.labor, color: "bg-green-500" },
    { label: "Equipment", value: result.costEstimate.equipment, color: "bg-amber-500" },
    { label: "Overheads", value: result.costEstimate.overheads, color: "bg-purple-500" },
    { label: "Contingency", value: result.costEstimate.contingency, color: "bg-red-400" },
  ] : [];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cos-blue">
            <BarChart3 className="h-5 w-5 text-cos-orange" />
            AI Project Estimator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Select options={projectTypes} placeholder="Select project type" value={projectType} onChange={(e) => setProjectType(e.target.value)} />
            <Input placeholder="Plot Size (sq ft)" type="number" value={plotSize} onChange={(e) => setPlotSize(e.target.value)} />
            <Input placeholder="Built-up Area (sq ft) *" type="number" required value={builtUpArea} onChange={(e) => setBuiltUpArea(e.target.value)} />
            <Input placeholder="Budget Range (INR)" type="number" value={budget} onChange={(e) => setBudget(e.target.value)} />
            <Input placeholder="Location (e.g., Mumbai)" value={location} onChange={(e) => setLocation(e.target.value)} />
            <Input placeholder="Timeline (months)" type="number" value={timeline} onChange={(e) => setTimeline(e.target.value)} />
            <Button type="submit" className="w-full bg-gradient-to-r from-cos-orange to-cos-orange-dark" disabled={loading}>
              {loading ? "Generating..." : "Generate Estimate"}
            </Button>
          </form>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </CardContent>
      </Card>

      <div className="space-y-4">
        {loading && (
          <Card className="border-0 shadow-md">
            <CardContent className="space-y-4 p-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-full rounded" />
              ))}
            </CardContent>
          </Card>
        )}

        {result && (
          <>
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-cos-blue">Cost Breakdown</CardTitle>
                  <span className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-700">
                    <AlertTriangle className="h-3 w-3" /> Indicative
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg bg-gradient-to-r from-cos-orange to-cos-orange-dark p-4 text-white">
                  <p className="text-sm opacity-90">Total Estimated Cost</p>
                  <p className="text-3xl font-bold">₹{(result.costEstimate.total / 100000).toFixed(1)}L</p>
                  <p className="text-xs opacity-75">~{result.estimatedDuration} months duration</p>
                </div>
                {costCategories.map((cat) => (
                  <div key={cat.label} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{cat.label}</span>
                      <span className="font-medium">₹{(cat.value / 100000).toFixed(2)}L</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                      <div className={`h-full rounded-full transition-all duration-500 ${cat.color}`} style={{ width: `${(cat.value / maxCost) * 100}%` }} />
                    </div>
                  </div>
                ))}
                <p className="mt-2 text-xs text-muted-foreground">{result.costEstimate.disclaimer}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg text-cos-blue">
                  <Calendar className="h-5 w-5 text-cos-orange" />
                  Suggested Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {result.suggestedPhases.map((phase) => (
                    <div key={phase.order} className="relative">
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cos-orange/10 text-xs font-bold text-cos-orange">
                          {phase.order}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{phase.name}</p>
                          <p className="text-xs text-muted-foreground">Month {phase.startMonth + 1} - {phase.endMonth}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{phase.duration}mo</span>
                      </div>
                      <div className="ml-3.5 mt-1 h-2 rounded-full bg-gray-100">
                        <div className="h-full rounded-full bg-gradient-to-r from-cos-orange to-cos-orange-light transition-all" style={{ width: `${((phase.endMonth - phase.startMonth) / maxMonth) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg text-cos-blue">
                  <FileText className="h-5 w-5 text-cos-orange" />
                  Material Quantities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {Object.entries(result.materialQuantities).map(([key, val]) => (
                    <div key={key} className="rounded-lg border p-2 text-center">
                      <p className="text-xs capitalize text-muted-foreground">{key}</p>
                      <p className="text-sm font-bold">{val.quantity.toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground">{val.unit}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg text-cos-blue">
                  <HelpCircle className="h-5 w-5 text-cos-orange" />
                  Questions for Consultant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.questionsForConsultant.map((q, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-cos-orange" />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-cos-orange to-cos-orange-dark">
                <MessageSquare className="mr-2 h-4 w-4" /> Request Consultation
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
