import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// First line of defence only; every admin API route ALSO calls requireAdmin() against the DB.
export async function middleware(req: NextRequest) {
  const t = req.cookies.get("nc_session")?.value;
  let role: unknown;
  try { if (t) role = (await jwtVerify(t, new TextEncoder().encode(process.env.JWT_SECRET!))).payload.role; } catch {}
  if (role !== "ADMIN") {
    return req.nextUrl.pathname.startsWith("/api")
      ? NextResponse.json({ error: "Forbidden" }, { status: 403 })
      : NextResponse.redirect(new URL("/login", req.url));
  }
}
export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
