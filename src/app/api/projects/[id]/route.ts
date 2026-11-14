import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: {
        client: true,
        projectManager: { select: { id: true, name: true, email: true } },
        milestones: { orderBy: { dueDate: "asc" } },
        tasks: { orderBy: { order: "asc" } },
        phases: { orderBy: { order: "asc" } },
        documents: { orderBy: { createdAt: "desc" }, take: 10 },
        invoices: true,
        purchaseOrders: true,
        budgets: true,
        qualityChecks: { orderBy: { createdAt: "desc" }, take: 10 },
        safetyReports: { orderBy: { createdAt: "desc" }, take: 10 },
        _count: { select: { tasks: true, milestones: true, documents: true, invoices: true } },
      },
    });
    if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
    return NextResponse.json(project);
  } catch (error) {
    console.error("Project GET error:", error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const project = await prisma.project.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description,
        type: body.type,
        status: body.status,
        priority: body.priority,
        clientId: body.clientId,
        projectManagerId: body.projectManagerId,
        branchId: body.branchId,
        location: body.location,
        plotSize: body.plotSize ? parseFloat(body.plotSize) : undefined,
        builtUpArea: body.builtUpArea ? parseFloat(body.builtUpArea) : undefined,
        budget: body.budget ? parseFloat(body.budget) : undefined,
        actualCost: body.actualCost ? parseFloat(body.actualCost) : undefined,
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        endDate: body.endDate ? new Date(body.endDate) : undefined,
        estimatedDuration: body.estimatedDuration,
        progress: body.progress !== undefined ? parseInt(body.progress) : undefined,
        notes: body.notes,
      },
      include: {
        client: { select: { id: true, companyName: true } },
        projectManager: { select: { id: true, name: true } },
      },
    });
    return NextResponse.json(project);
  } catch (error) {
    console.error("Project PUT error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.project.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    console.error("Project DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
