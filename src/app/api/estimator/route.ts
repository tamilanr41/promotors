import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const BASE_RATES = {
  residential: { ratePerSqft: 1800, materialPct: 0.5, laborPct: 0.3, equipPct: 0.08, overheadPct: 0.07, contingencyPct: 0.05 },
  commercial: { ratePerSqft: 2500, materialPct: 0.45, laborPct: 0.28, equipPct: 0.12, overheadPct: 0.1, contingencyPct: 0.05 },
  industrial: { ratePerSqft: 3500, materialPct: 0.4, laborPct: 0.25, equipPct: 0.18, overheadPct: 0.12, contingencyPct: 0.05 },
  infrastructure: { ratePerSqft: 2800, materialPct: 0.42, laborPct: 0.26, equipPct: 0.16, overheadPct: 0.11, contingencyPct: 0.05 },
  renovation: { ratePerSqft: 1500, materialPct: 0.4, laborPct: 0.35, equipPct: 0.1, overheadPct: 0.1, contingencyPct: 0.05 },
};

const MATERIAL_RATES = {
  cement: { perSqft: 0.4, unit: "bags", rate: 350 },
  steel: { perSqft: 3.5, unit: "kg", rate: 75 },
  aggregate: { perSqft: 0.5, unit: "cu ft", rate: 60 },
  bricks: { perSqft: 6, unit: "nos", rate: 8 },
  sand: { perSqft: 0.3, unit: "cu ft", rate: 45 },
  tiles: { perSqft: 0.8, unit: "sq ft", rate: 55 },
  paint: { perSqft: 0.08, unit: "liters", rate: 250 },
  wiring: { perSqft: 2, unit: "meters", rate: 15 },
  plumbing: { perSqft: 0.5, unit: "meters", rate: 35 },
};

function calculateEstimate(projectType: string, plotSize: number, builtUpArea: number, budget: number, location: string, timeline: string, preferences: string) {
  const config = BASE_RATES[projectType as keyof typeof BASE_RATES] || BASE_RATES.residential;
  const locationMultiplier = ["Mumbai", "Delhi", "Bangalore", "Chennai"].includes(location) ? 1.15 : ["Pune", "Hyderabad", "Ahmedabad"].includes(location) ? 1.05 : 1.0;
  const baseCost = builtUpArea * config.ratePerSqft * locationMultiplier;
  const budgetConstraint = budget > 0 ? Math.min(baseCost, budget * 0.95) : baseCost;

  const materials = budgetConstraint * config.materialPct;
  const labor = budgetConstraint * config.laborPct;
  const equipment = budgetConstraint * config.equipPct;
  const overheads = budgetConstraint * config.overheadPct;
  const contingency = budgetConstraint * config.contingencyPct;
  const total = materials + labor + equipment + overheads + contingency;

  const areaFactor = builtUpArea / 1000;
  const timelineNum = parseInt(timeline) || 12;
  const durationFactor = Math.max(4, Math.min(36, Math.round(areaFactor * 3 + (builtUpArea > 5000 ? 4 : 0) + (projectType === "infrastructure" ? 6 : 0))));
  const estimatedDuration = Math.max(durationFactor, Math.round(timelineNum * 0.8));

  const phaseDuration = Math.max(1, Math.round(estimatedDuration / 5));

  return {
    costEstimate: {
      materials: Math.round(materials),
      labor: Math.round(labor),
      equipment: Math.round(equipment),
      overheads: Math.round(overheads),
      contingency: Math.round(contingency),
      total: Math.round(total),
      currency: "INR",
      isIndicative: true,
      disclaimer: "This is an AI-generated indicative estimate based on standard Indian construction rates. Actual costs may vary. Please consult with our experts for a detailed BOQ.",
    },
    estimatedDuration: Math.round(estimatedDuration),
    suggestedPhases: [
      { name: "Site Preparation & Excavation", duration: phaseDuration, order: 1, startMonth: 0, endMonth: phaseDuration },
      { name: "Foundation & Substructure", duration: phaseDuration, order: 2, startMonth: phaseDuration, endMonth: phaseDuration * 2 },
      { name: "Structural Framework", duration: phaseDuration, order: 3, startMonth: phaseDuration * 2, endMonth: phaseDuration * 3 },
      { name: "MEP Works", duration: phaseDuration, order: 4, startMonth: phaseDuration * 3, endMonth: phaseDuration * 4 },
      { name: "Finishing & Handover", duration: phaseDuration, order: 5, startMonth: phaseDuration * 4, endMonth: phaseDuration * 5 },
    ],
    materialQuantities: Object.entries(MATERIAL_RATES).reduce((acc, [key, val]) => {
      acc[key] = {
        quantity: Math.round(builtUpArea * val.perSqft),
        unit: val.unit,
        rate: val.rate,
        cost: Math.round(builtUpArea * val.perSqft * val.rate),
      };
      return acc;
    }, {} as Record<string, { quantity: number; unit: string; rate: number; cost: number }>),
    questionsForConsultant: [
      "What is the soil bearing capacity at the site?",
      "Are there any local municipal approvals pending?",
      "Do you require GST-compliant billing for materials?",
      "What is the preferred construction methodology (conventional vs prefab)?",
      "Are there any heritage or height restrictions at the location?",
      "What is the expected quality certification required (IGBC, GRIHA, etc.)?",
      "Do you need earthquake-resistant design considerations?",
      "What is the expected labour availability in the region?",
    ],
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectType, plotSize, builtUpArea, budget, location, timeline, preferences } = body;

    if (!projectType || !builtUpArea) {
      return NextResponse.json({ error: "projectType and builtUpArea are required" }, { status: 400 });
    }

    const estimate = calculateEstimate(projectType, plotSize || 0, builtUpArea, budget || 0, location || "", timeline || "12", preferences || "");

    const session = await getServerSession(authOptions);
    if (session?.user) {
      await prisma.estimate.create({
        data: {
          type: projectType,
          totalAmount: estimate.costEstimate.total,
          status: "DRAFT",
          createdById: (session.user as unknown as { id: string }).id,
          notes: `Generated for ${builtUpArea} sq.ft ${projectType} project in ${location}`,
          items: {
            create: [
              { category: "Materials", description: "Construction Materials", quantity: 1, unit: "lump", unitRate: estimate.costEstimate.materials, amount: estimate.costEstimate.materials },
              { category: "Labor", description: "Construction Labor", quantity: 1, unit: "lump", unitRate: estimate.costEstimate.labor, amount: estimate.costEstimate.labor },
              { category: "Equipment", description: "Equipment & Machinery", quantity: 1, unit: "lump", unitRate: estimate.costEstimate.equipment, amount: estimate.costEstimate.equipment },
              { category: "Overheads", description: "Site Overheads", quantity: 1, unit: "lump", unitRate: estimate.costEstimate.overheads, amount: estimate.costEstimate.overheads },
              { category: "Contingency", description: "Contingency Reserve", quantity: 1, unit: "lump", unitRate: estimate.costEstimate.contingency, amount: estimate.costEstimate.contingency },
            ],
          },
        },
      });
    }

    return NextResponse.json(estimate, { status: 200 });
  } catch (error) {
    console.error("Estimator error:", error);
    return NextResponse.json({ error: "Failed to generate estimate" }, { status: 500 });
  }
}
