import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const projectId = searchParams.get("projectId");
    const status = searchParams.get("status");
    const severity = searchParams.get("severity");

    const where: Record<string, unknown> = {};
    if (projectId) where.projectId = projectId;
    if (status) where.status = status;
    if (severity) where.severity = severity;

    const [reports, total] = await Promise.all([
      prisma.safetyReport.findMany({
        where, skip, take: limit, orderBy: { createdAt: "desc" },
        include: { reportedBy: { select: { id: true, name: true } }, project: { select: { id: true, name: true } }, actions: true },
      }),
      prisma.safetyReport.count({ where }),
    ]);

    return NextResponse.json({ data: reports, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Safety GET error:", error);
    return NextResponse.json({ error: "Failed to fetch safety reports" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const report = await prisma.safetyReport.create({
      data: {
        projectId: body.projectId,
        title: body.title,
        type: body.type,
        description: body.description,
        severity: body.severity || "LOW",
        location: body.location,
        reportedById: body.reportedById,
        status: body.status || "OPEN",
      },
      include: { reportedBy: { select: { id: true, name: true } }, project: { select: { id: true, name: true } } },
    });
    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error("Safety POST error:", error);
    return NextResponse.json({ error: "Failed to create safety report" }, { status: 500 });
  }
}
