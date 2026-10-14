import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { createSession } from "@/lib/auth";
import { handle, rateLimit } from "@/lib/http";

const schema = z.object({
  name: z.string({ required_error: "Name is required" }).trim().min(2, "Name must be at least 2 characters").max(80, "Name cannot exceed 80 characters"),
  email: z.string({ required_error: "Email is required" }).trim().toLowerCase().email("Please enter a valid email address"),
  password: z.string({ required_error: "Password is required" }).min(6, "Password must be at least 6 characters").max(100, "Password cannot exceed 100 characters")
});

export const POST = (req: NextRequest) => handle(async () => {
  rateLimit("reg:" + (req.headers.get("x-forwarded-for") ?? "ip"), 15);
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    const msg = result.error.issues[0]?.message || "Invalid input";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  const { name, email, password } = result.data;
  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "An account with this email address already exists. Please sign in instead." },
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const u = await db.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: "CUSTOMER",
      emailVerified: true
    }
  });

  if (!u || !u.id) {
    return NextResponse.json(
      { error: "Unable to create account. Please try again." },
      { status: 500 }
    );
  }

  await createSession(u.id, u.role || "CUSTOMER");
  return NextResponse.json({ id: u.id, name: u.name, email: u.email, role: u.role });
});

