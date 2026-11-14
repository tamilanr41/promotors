import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const type = searchParams.get("type");
    const status = searchParams.get("status");

    const where: Record<string, unknown> = {};
    if (type) where.type = type;
    if (status) where.status = status;

    const [integrations, total] = await Promise.all([
      prisma.integration.findMany({ where, skip, take: limit, orderBy: { name: "asc" } }),
      prisma.integration.count({ where }),
    ]);

    const sanitized = integrations.map((i) => ({
      ...i,
      apiKey: i.apiKey ? "••••••••" : null,
      apiSecret: i.apiSecret ? "••••••••" : null,
    }));

    return NextResponse.json({ data: sanitized, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Integrations GET error:", error);
    return NextResponse.json({ error: "Failed to fetch integrations" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const integration = await prisma.integration.create({
      data: {
        name: body.name,
        type: body.type,
        apiKey: body.apiKey,
        apiSecret: body.apiSecret,
        endpoint: body.endpoint,
        status: body.status || "ACTIVE",
        config: body.config ? JSON.stringify(body.config) : undefined,
        branchId: body.branchId,
      },
    });
    return NextResponse.json({ ...integration, apiKey: "••••••••", apiSecret: "••••••••" }, { status: 201 });
  } catch (error) {
    console.error("Integrations POST error:", error);
    return NextResponse.json({ error: "Failed to create integration" }, { status: 500 });
  }
}
