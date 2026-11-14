import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const branchId = searchParams.get("branchId");

    const projectWhere: Record<string, unknown> = {};
    if (branchId) projectWhere.branchId = branchId;

    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const [projects, invoices, leads, equipment, users, safetyReports] = await Promise.all([
      prisma.project.findMany({ where: projectWhere, select: { id: true, status: true, budget: true, actualCost: true, progress: true } }),
      prisma.invoice.findMany({ where: { ...(branchId ? { project: { branchId } } : {}) }, select: { amount: true, total: true, status: true, createdAt: true, paidAt: true } }),
      prisma.lead.findMany({ where: { ...(branchId ? { branchId } : {}) }, select: { id: true, status: true, createdAt: true } }),
      prisma.equipment.findMany({ where: { ...(branchId ? { branchId } : {}) }, select: { id: true, status: true } }),
      prisma.user.findMany({ where: { ...(branchId ? { branchId } : {}) }, select: { id: true, timeEntries: { select: { hours: true } } } }),
      prisma.safetyReport.findMany({ where: { ...(branchId ? { project: { branchId } } : {}) }, select: { id: true, severity: true, status: true, createdAt: true } }),
    ]);

    const totalRevenue = invoices.filter((i) => i.status === "PAID").reduce((sum, i) => sum + i.total, 0);
    const monthlyBreakdown = Array.from({ length: 12 }, (_, m) => {
      const monthInvoices = invoices.filter((i) => {
        const d = new Date(i.createdAt);
        return d.getFullYear() === now.getFullYear() && d.getMonth() === m;
      });
      return {
        month: new Date(now.getFullYear(), m).toLocaleString("default", { month: "short" }),
        invoiced: monthInvoices.reduce((s, i) => s + i.total, 0),
        collected: monthInvoices.filter((i) => i.status === "PAID").reduce((s, i) => s + i.total, 0),
      };
    });

    const projectStats = [
      { status: "PLANNING", count: projects.filter((p) => p.status === "PLANNING").length },
      { status: "ACTIVE", count: projects.filter((p) => p.status === "ACTIVE").length },
      { status: "ON_HOLD", count: projects.filter((p) => p.status === "ON_HOLD").length },
      { status: "COMPLETED", count: projects.filter((p) => p.status === "COMPLETED").length },
      { status: "CANCELLED", count: projects.filter((p) => p.status === "CANCELLED").length },
    ];

    const totalLeads = leads.length;
    const convertedLeads = leads.filter((l) => l.status === "CONVERTED" || l.status === "WON").length;
    const leadConversion = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

    const totalEquipment = equipment.length;
    const availableEquipment = equipment.filter((e) => e.status === "AVAILABLE").length;
    const equipmentUtilization = totalEquipment > 0 ? Math.round(((totalEquipment - availableEquipment) / totalEquipment) * 100) : 0;

    const totalHours = users.reduce((sum, u) => sum + u.timeEntries.reduce((s, t) => s + t.hours, 0), 0);
    const workforceProductivity = users.length > 0 ? Math.round(totalHours / users.length) : 0;

    const totalSafety = safetyReports.length;
    const closedSafety = safetyReports.filter((s) => s.status === "CLOSED").length;
    const criticalSafety = safetyReports.filter((s) => s.severity === "CRITICAL" || s.severity === "HIGH").length;
    const safetyKPI = totalSafety > 0 ? Math.round((closedSafety / totalSafety) * 100) : 100;

    return NextResponse.json({
      revenue: { total: totalRevenue, monthlyBreakdown },
      projectStats,
      leadConversion: { rate: leadConversion, total: totalLeads, converted: convertedLeads },
      equipmentUtilization: { rate: equipmentUtilization, total: totalEquipment, inUse: totalEquipment - availableEquipment, available: availableEquipment },
      workforceProductivity: { averageHours: workforceProductivity, totalUsers: users.length, totalHours: Math.round(totalHours) },
      safetyKPI: { closureRate: safetyKPI, total: totalSafety, closed: closedSafety, critical: criticalSafety },
      generatedAt: now.toISOString(),
      isIndicative: true,
    });
  } catch (error) {
    console.error("Analytics GET error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
