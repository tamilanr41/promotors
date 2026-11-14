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
    const projectId = searchParams.get("projectId");
    const clientId = searchParams.get("clientId");

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (projectId) where.projectId = projectId;
    if (clientId) where.clientId = clientId;

    if (type === "budget") {
      const whereBudget: Record<string, unknown> = {};
      if (projectId) whereBudget.projectId = projectId;
      const [budgets, total] = await Promise.all([
        prisma.projectBudget.findMany({ where: whereBudget, orderBy: { category: "asc" }, include: { project: { select: { id: true, name: true } } } }),
        prisma.projectBudget.count({ where: whereBudget }),
      ]);
      return NextResponse.json({ data: budgets, total, page: 1, limit: total, totalPages: 1 });
    }

    const [invoices, total] = await Promise.all([
      prisma.invoice.findMany({
        where, skip, take: limit, orderBy: { createdAt: "desc" },
        include: { client: { select: { id: true, companyName: true } }, project: { select: { id: true, name: true } }, payments: true },
      }),
      prisma.invoice.count({ where }),
    ]);

    return NextResponse.json({ data: invoices, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Finance GET error:", error);
    return NextResponse.json({ error: "Failed to fetch finance data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body.type === "budget") {
      const budget = await prisma.projectBudget.create({
        data: {
          projectId: body.projectId,
          category: body.category,
          allocated: parseFloat(body.allocated),
          spent: body.spent ? parseFloat(body.spent) : 0,
          committed: body.committed ? parseFloat(body.committed) : 0,
          notes: body.notes,
        },
      });
      return NextResponse.json(budget, { status: 201 });
    }

    const invCount = await prisma.invoice.count();
    const invoiceNo = `INV-${String(invCount + 1).padStart(4, "0")}`;
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNo,
        clientId: body.clientId,
        projectId: body.projectId,
        type: body.type || "CLIENT",
        amount: parseFloat(body.amount),
        tax: body.tax ? parseFloat(body.tax) : undefined,
        total: parseFloat(body.total || body.amount),
        status: body.status || "DRAFT",
        dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
        issuedAt: body.issuedAt ? new Date(body.issuedAt) : undefined,
        notes: body.notes,
        lineItems: body.lineItems ? {
          create: body.lineItems.map((item: { description: string; quantity: number; unit?: string; unitPrice: number }) => ({
            description: item.description,
            quantity: parseFloat(item.quantity.toString()),
            unit: item.unit,
            unitPrice: parseFloat(item.unitPrice.toString()),
            total: parseFloat(item.quantity.toString()) * parseFloat(item.unitPrice.toString()),
          })),
        } : undefined,
      },
      include: { client: { select: { id: true, companyName: true } }, lineItems: true },
    });
    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    console.error("Finance POST error:", error);
    return NextResponse.json({ error: "Failed to create finance record" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    if (body.id && body.type === "payment") {
      const payment = await prisma.payment.create({
        data: {
          invoiceId: body.invoiceId,
          amount: parseFloat(body.amount),
          mode: body.mode,
          reference: body.reference,
          notes: body.notes,
        },
      });
      await prisma.invoice.update({ where: { id: body.invoiceId }, data: { status: "PAID", paidAt: new Date() } });
      return NextResponse.json(payment, { status: 201 });
    }
    return NextResponse.json({ error: "Invalid update request" }, { status: 400 });
  } catch (error) {
    console.error("Finance PUT error:", error);
    return NextResponse.json({ error: "Failed to process payment" }, { status: 500 });
  }
}
