import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const lead = await prisma.lead.findUnique({
      where: { id: params.id },
      include: {
        assignedTo: { select: { id: true, name: true, email: true } },
        client: { select: { id: true, companyName: true } },
        quotations: true,
        siteVisits: true,
        tasks: true,
        documents: true,
      },
    });
    if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    return NextResponse.json(lead);
  } catch (error) {
    console.error("Lead GET error:", error);
    return NextResponse.json({ error: "Failed to fetch lead" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const lead = await prisma.lead.update({
      where: { id: params.id },
      data: {
        companyName: body.companyName,
        contactName: body.contactName,
        email: body.email,
        phone: body.phone,
        source: body.source,
        status: body.status,
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
    return NextResponse.json(lead);
  } catch (error) {
    console.error("Lead PUT error:", error);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.lead.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Lead deleted" });
  } catch (error) {
    console.error("Lead DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}
