import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, phone, role, companyName, secretCode } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    // Normalize role
    let normalizedRole = "CLIENT";
    const r = (role || "").toLowerCase();
    if (r.includes("admin") || r === "super_admin") {
      normalizedRole = "SUPER_ADMIN";
    } else if (r.includes("pm") || r.includes("project_manager")) {
      normalizedRole = "PROJECT_MANAGER";
    } else if (r.includes("engineer") || r.includes("site_engineer")) {
      normalizedRole = "SITE_ENGINEER";
    } else {
      normalizedRole = "CLIENT";
    }

    // Hardcoded Admin Master Secret Codes (Strict Authorization)
    const VALID_ADMIN_SECRETS = [
      "AAA@ADMIN#2026",
      "AAA2026",
      process.env.ADMIN_SECRET_CODE,
    ].filter(Boolean);

    // If creating an administrative or management account, secret code is strictly mandatory
    const isAdminAccount = normalizedRole !== "CLIENT" || Boolean(secretCode);

    if (isAdminAccount) {
      if (!secretCode || !VALID_ADMIN_SECRETS.includes(secretCode.trim())) {
        return NextResponse.json(
          {
            error:
              "Invalid or missing Admin Secret Key. You must enter the authorized master security key (AAA@ADMIN#2026) to create an administrative account.",
          },
          { status: 403 }
        );
      }
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email address already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 12);

    // Get default headquarters branch if available
    const defaultBranch = await prisma.branch.findFirst({
      where: { type: "HEADQUARTERS" },
    });

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        phone: phone || null,
        role: normalizedRole,
        branchId: defaultBranch?.id || null,
        emailVerified: true,
      },
    });

    // If client role, create Client profile
    if (normalizedRole === "CLIENT") {
      await prisma.client.create({
        data: {
          contactName: name.trim(),
          companyName: companyName || `${name.trim()}'s Properties`,
          email: email.toLowerCase().trim(),
          phone: phone || null,
          branchId: defaultBranch?.id || null,
          userId: user.id,
        },
      });
    }

    return NextResponse.json(
      {
        message: "Account created successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

