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
    const assignedTo = searchParams.get("assignedTo");

    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { contactName: { contains: search } },
        { companyName: { contains: search } },
        { email: { contains: search } },
      ];
    }
    if (status) where.status = status;
    if (assignedTo) where.assignedToId = assignedTo;

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { assignedTo: { select: { id: true, name: true, email: true } }, client: { select: { id: true, companyName: true } } },
      }),
      prisma.lead.count({ where }),
    ]);

    return NextResponse.json({ data: leads, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Leads GET error:", error);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const lead = await prisma.lead.create({
      data: {
        companyName: body.companyName,
        contactName: body.contactName,
        email: body.email,
        phone: body.phone,
        source: body.source,
        status: body.status || "NEW",
        projectType: body.projectType,
        description: body.description,
        budget: body.budget ? parseFloat(body.budget) : undefined,
        location: body.location,
        plotSize: body.plotSize ? parseFloat(body.plotSize) : undefined,
        builtUpArea: body.builtUpArea ? parseFloat(body.builtUpArea) : undefined,
        timeline: body.timeline,
        notes: body.notes,
        assignedToId: body.assignedToId,
        branchId: body.branchId,
        clientId: body.clientId,
      },
    });
    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    console.error("Leads POST error:", error);
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
  }
}
