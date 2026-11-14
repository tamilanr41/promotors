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
    const result = searchParams.get("result");

    const where: Record<string, unknown> = {};
    if (projectId) where.projectId = projectId;
    if (status) where.status = status;
    if (result) where.result = result;

    const [checks, total] = await Promise.all([
      prisma.qualityCheck.findMany({
        where, skip, take: limit, orderBy: { createdAt: "desc" },
        include: { project: { select: { id: true, name: true } } },
      }),
      prisma.qualityCheck.count({ where }),
    ]);

    return NextResponse.json({ data: checks, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Quality GET error:", error);
    return NextResponse.json({ error: "Failed to fetch quality checks" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const check = await prisma.qualityCheck.create({
      data: {
        projectId: body.projectId,
        title: body.title,
        description: body.description,
        checkType: body.checkType,
        standard: body.standard,
        result: body.result,
        status: body.status || "PENDING",
        checkedById: body.checkedById,
        checkedAt: body.checkedAt ? new Date(body.checkedAt) : undefined,
        notes: body.notes,
      },
      include: { project: { select: { id: true, name: true } } },
    });
    return NextResponse.json(check, { status: 201 });
  } catch (error) {
    console.error("Quality POST error:", error);
    return NextResponse.json({ error: "Failed to create quality check" }, { status: 500 });
  }
}
