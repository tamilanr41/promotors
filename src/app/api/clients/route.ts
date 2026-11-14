import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { contactName: { contains: search } },
        { companyName: { contains: search } },
        { email: { contains: search } },
      ];
    }

    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { projects: true, leads: true, invoices: true } } },
      }),
      prisma.client.count({ where }),
    ]);

    return NextResponse.json({ data: clients, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Clients GET error:", error);
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const client = await prisma.client.create({
      data: {
        companyName: body.companyName,
        contactName: body.contactName,
        email: body.email,
        phone: body.phone,
        address: body.address,
        city: body.city,
        state: body.state,
        gstin: body.gstin,
        pan: body.pan,
        type: body.type,
        source: body.source,
        branchId: body.branchId,
        userId: body.userId,
      },
    });
    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error("Clients POST error:", error);
    return NextResponse.json({ error: "Failed to create client" }, { status: 500 });
  }
}
