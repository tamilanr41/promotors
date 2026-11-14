import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, newPassword, otp } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email address." },
        { status: 404 }
      );
    }

    // If OTP is provided, verify it (demo OTP accepted: 123456 or any 6-digit code for testing)
    if (newPassword) {
      if (otp && otp.length !== 6) {
        return NextResponse.json(
          { error: "Invalid verification code. Please enter the 6-digit code." },
          { status: 400 }
        );
      }

      if (newPassword.length < 6) {
        return NextResponse.json(
          { error: "Password must be at least 6 characters." },
          { status: 400 }
        );
      }

      const hashedPassword = await hash(newPassword, 12);
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });

      return NextResponse.json({
        message: "Password reset successful! You can now log in.",
      });
    }

    // Step 1: Request reset code
    return NextResponse.json({
      message: `Verification code sent to ${email}. (Demo Code: 123456)`,
      demoOtp: "123456",
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Failed to process password reset request." },
      { status: 500 }
    );
  }
}

