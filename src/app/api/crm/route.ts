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
    const type = searchParams.get("type");

    const where: Record<string, unknown> = {};
    if (search) where.name = { contains: search };
    if (status) where.status = status;
    if (type) where.type = type;

    const [campaigns, total] = await Promise.all([
      prisma.campaign.findMany({
        where, skip, take: limit, orderBy: { createdAt: "desc" },
        include: { createdBy: { select: { id: true, name: true } } },
      }),
      prisma.campaign.count({ where }),
    ]);

    return NextResponse.json({ data: campaigns, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("CRM GET error:", error);
    return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const campaign = await prisma.campaign.create({
      data: {
        name: body.name,
        type: body.type,
        status: body.status || "DRAFT",
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        endDate: body.endDate ? new Date(body.endDate) : undefined,
        budget: body.budget ? parseFloat(body.budget) : undefined,
        description: body.description,
        createdById: body.createdById,
      },
    });
    return NextResponse.json(campaign, { status: 201 });
  } catch (error) {
    console.error("CRM POST error:", error);
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 });
  }
}
