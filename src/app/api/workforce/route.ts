import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const role = searchParams.get("role");
    const branchId = searchParams.get("branchId");

    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [{ name: { contains: search } }, { email: { contains: search } }];
    }
    if (role) where.role = role;
    if (branchId) where.branchId = branchId;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { name: "asc" },
        select: {
          id: true, name: true, email: true, role: true, phone: true, avatar: true,
          branchId: true, permissions: true, createdAt: true, updatedAt: true,
          branch: { select: { id: true, name: true } },
          _count: { select: { assignedTasks: true, safetyReports: true, timeEntries: true } },
        },
      }),
      prisma.user.count({ where }),
    ]);

    return NextResponse.json({ data: users, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Workforce GET error:", error);
    return NextResponse.json({ error: "Failed to fetch workforce" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        role: body.role || "STAFF",
        phone: body.phone,
        branchId: body.branchId,
        permissions: body.permissions,
      },
      select: {
        id: true, name: true, email: true, role: true, phone: true,
        branchId: true, permissions: true, createdAt: true,
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Workforce POST error:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
