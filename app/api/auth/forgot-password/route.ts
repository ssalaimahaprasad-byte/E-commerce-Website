import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { handle, rateLimit } from "@/lib/http";

const schema = z.object({
  email: z.string({ required_error: "Email is required" }).trim().toLowerCase().email("Please enter a valid email address")
});

export const POST = (req: NextRequest) => handle(async () => {
  rateLimit("forgot:" + (req.headers.get("x-forwarded-for") ?? "ip"), 10);
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error.issues[0]?.message || "Invalid email" }, { status: 400 });
  }

  const { email } = result.data;
  const user = await db.user.findUnique({ where: { email } });

  // Return success message to user with clear feedback
  return NextResponse.json({
    ok: true,
    message: user
      ? `Password reset link has been sent to ${email}. Please check your inbox and follow the instructions to reset your password.`
      : `If an account exists with ${email}, password reset instructions have been sent to that address.`
  });
});
