import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { createSession } from "@/lib/auth";
import { handle, rateLimit } from "@/lib/http";

const schema = z.object({
  email: z.string({ required_error: "Email is required" }).trim().toLowerCase().email("Please enter a valid email address"),
  password: z.string({ required_error: "Password is required" }).min(1, "Password is required")
});

export const POST = (req: NextRequest) => handle(async () => {
  rateLimit("login:" + (req.headers.get("x-forwarded-for") ?? "ip"), 20);
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

  const { email, password } = result.data;
  const u = await db.user.findUnique({ where: { email } });

  if (!u || !u.passwordHash) {
    return NextResponse.json(
      { error: "Incorrect email or password. Please verify your credentials and try again." },
      { status: 401 }
    );
  }

  const isValidPassword = await bcrypt.compare(password, u.passwordHash);
  if (!isValidPassword) {
    return NextResponse.json(
      { error: "Incorrect email or password. Please verify your credentials and try again." },
      { status: 401 }
    );
  }

  await createSession(u.id, u.role || "CUSTOMER");
  return NextResponse.json({ id: u.id, name: u.name, email: u.email, role: u.role });
});

