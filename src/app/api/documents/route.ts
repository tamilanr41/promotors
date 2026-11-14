import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const projectId = searchParams.get("projectId");
    const clientId = searchParams.get("clientId");
    const type = searchParams.get("type");
    const category = searchParams.get("category");

    const where: Record<string, unknown> = {};
    if (search) where.name = { contains: search };
    if (projectId) where.projectId = projectId;
    if (clientId) where.clientId = clientId;
    if (type) where.type = type;
    if (category) where.category = category;

    const [documents, total] = await Promise.all([
      prisma.document.findMany({
        where, skip, take: limit, orderBy: { createdAt: "desc" },
        include: { uploadedBy: { select: { id: true, name: true } }, project: { select: { id: true, name: true } } },
      }),
      prisma.document.count({ where }),
    ]);

    return NextResponse.json({ data: documents, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Documents GET error:", error);
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const document = await prisma.document.create({
      data: {
        name: body.name,
        type: body.type,
        category: body.category,
        fileUrl: body.fileUrl,
        fileSize: body.fileSize ? parseInt(body.fileSize) : undefined,
        projectId: body.projectId,
        leadId: body.leadId,
        clientId: body.clientId,
        uploadedById: body.uploadedById,
        isPublic: body.isPublic || false,
      },
      include: { uploadedBy: { select: { id: true, name: true } }, project: { select: { id: true, name: true } } },
    });
    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error("Documents POST error:", error);
    return NextResponse.json({ error: "Failed to create document" }, { status: 500 });
  }
}
