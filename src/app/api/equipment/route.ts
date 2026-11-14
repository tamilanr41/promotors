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
    if (search) where.OR = [{ name: { contains: search } }, { code: { contains: search } }, { model: { contains: search } }];
    if (status) where.status = status;
    if (type) where.type = type;

    const [equipment, total] = await Promise.all([
      prisma.equipment.findMany({
        where, skip, take: limit, orderBy: { name: "asc" },
        include: { _count: { select: { assignments: true, maintenanceRecords: true } } },
      }),
      prisma.equipment.count({ where }),
    ]);

    return NextResponse.json({ data: equipment, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Equipment GET error:", error);
    return NextResponse.json({ error: "Failed to fetch equipment" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const equipment = await prisma.equipment.create({
      data: {
        name: body.name,
        code: body.code,
        type: body.type,
        model: body.model,
        make: body.make,
        year: body.year ? parseInt(body.year) : undefined,
        plateNumber: body.plateNumber,
        vinNumber: body.vinNumber,
        status: body.status || "AVAILABLE",
        condition: body.condition,
        location: body.location,
        purchaseDate: body.purchaseDate ? new Date(body.purchaseDate) : undefined,
        purchasePrice: body.purchasePrice ? parseFloat(body.purchasePrice) : undefined,
        hourlyRate: body.hourlyRate ? parseFloat(body.hourlyRate) : undefined,
        fuelType: body.fuelType,
        fuelCapacity: body.fuelCapacity ? parseFloat(body.fuelCapacity) : undefined,
        lastMaintenanceAt: body.lastMaintenanceAt ? new Date(body.lastMaintenanceAt) : undefined,
        nextMaintenanceAt: body.nextMaintenanceAt ? new Date(body.nextMaintenanceAt) : undefined,
        meterReading: body.meterReading ? parseFloat(body.meterReading) : undefined,
      },
    });
    return NextResponse.json(equipment, { status: 201 });
  } catch (error) {
    console.error("Equipment POST error:", error);
    return NextResponse.json({ error: "Failed to create equipment" }, { status: 500 });
  }
}
