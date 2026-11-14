import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const status = searchParams.get("status");
    const projectId = searchParams.get("projectId");
    const type = searchParams.get("type");

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (projectId) where.projectId = projectId;

    if (type === "materials" || !type) {
      const [materials, total] = await Promise.all([
        prisma.material.findMany({
          where: { name: searchParams.get("search") ? { contains: searchParams.get("search") || "" } : undefined },
          skip, take: limit, orderBy: { name: "asc" },
        }),
        prisma.material.count(),
      ]);
      return NextResponse.json({ data: materials, total, page, limit, totalPages: Math.ceil(total / limit) });
    }

    const [orders, total] = await Promise.all([
      prisma.purchaseOrder.findMany({
        where, skip, take: limit, orderBy: { createdAt: "desc" },
        include: { vendor: { select: { id: true, companyName: true } }, project: { select: { id: true, name: true } }, items: { include: { material: true } } },
      }),
      prisma.purchaseOrder.count({ where }),
    ]);
    return NextResponse.json({ data: orders, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Procurement GET error:", error);
    return NextResponse.json({ error: "Failed to fetch procurement data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body.type === "material") {
      const material = await prisma.material.create({
        data: {
          name: body.name,
          code: body.code,
          category: body.category,
          unit: body.unit,
          unitPrice: body.unitPrice ? parseFloat(body.unitPrice) : undefined,
          minStock: body.minStock ? parseFloat(body.minStock) : undefined,
          currentStock: body.currentStock ? parseFloat(body.currentStock) : 0,
          description: body.description,
        },
      });
      return NextResponse.json(material, { status: 201 });
    }

    const poCount = await prisma.purchaseOrder.count();
    const poNumber = `PO-${String(poCount + 1).padStart(4, "0")}`;
    const order = await prisma.purchaseOrder.create({
      data: {
        poNumber,
        projectId: body.projectId,
        vendorId: body.vendorId,
        status: body.status || "DRAFT",
        expectedDate: body.expectedDate ? new Date(body.expectedDate) : undefined,
        notes: body.notes,
        items: {
          create: (body.items || []).map((item: { materialId?: string; description: string; quantity: number; unit?: string; unitPrice: number }) => ({
            materialId: item.materialId,
            description: item.description,
            quantity: parseFloat(item.quantity.toString()),
            unit: item.unit,
            unitPrice: parseFloat(item.unitPrice.toString()),
            total: parseFloat(item.quantity.toString()) * parseFloat(item.unitPrice.toString()),
          })),
        },
      },
      include: { items: true, vendor: { select: { id: true, companyName: true } } },
    });
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Procurement POST error:", error);
    return NextResponse.json({ error: "Failed to create procurement record" }, { status: 500 });
  }
}
