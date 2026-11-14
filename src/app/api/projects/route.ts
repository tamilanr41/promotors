import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const status = searchParams.get("status");
    const clientId = searchParams.get("clientId");

    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { location: { contains: search } },
      ];
    }
    if (status) where.status = status;
    if (clientId) where.clientId = clientId;

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          client: { select: { id: true, companyName: true } },
          projectManager: { select: { id: true, name: true } },
          _count: { select: { tasks: true, milestones: true, documents: true } },
        },
      }),
      prisma.project.count({ where }),
    ]);

    return NextResponse.json({ data: projects, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Projects GET error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const project = await prisma.project.create({
      data: {
        name: body.name,
        description: body.description,
        type: body.type,
        status: body.status || "PLANNING",
        priority: body.priority,
        clientId: body.clientId,
        projectManagerId: body.projectManagerId,
        branchId: body.branchId,
        location: body.location,
        plotSize: body.plotSize ? parseFloat(body.plotSize) : undefined,
        builtUpArea: body.builtUpArea ? parseFloat(body.builtUpArea) : undefined,
        budget: body.budget ? parseFloat(body.budget) : undefined,
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        endDate: body.endDate ? new Date(body.endDate) : undefined,
        estimatedDuration: body.estimatedDuration,
        notes: body.notes,
      },
      include: {
        client: { select: { id: true, companyName: true } },
        projectManager: { select: { id: true, name: true } },
      },
    });
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Projects POST error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
