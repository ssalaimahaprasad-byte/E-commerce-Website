import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { db } from "./db";

const secret = () => new TextEncoder().encode(process.env.JWT_SECRET || "novacart-super-secret-jwt-key-minimum-32-characters-long");
export const COOKIE = "nc_session";

export async function createSession(userId: string, role: string) {
  const token = await new SignJWT({ role }).setProtectedHeader({ alg: "HS256" })
    .setSubject(userId).setExpirationTime("7d").sign(secret());
  cookies().set(COOKIE, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 7 });
}
export function destroySession() { cookies().delete(COOKIE); }

export async function getUser() {
  const t = cookies().get(COOKIE)?.value;
  if (!t) return null;
  try {
    const { payload } = await jwtVerify(t, secret());
    return await db.user.findUnique({ where: { id: payload.sub! }, select: { id: true, email: true, name: true, role: true } });
  } catch { return null; }
}
export async function requireUser() {
  const u = await getUser();
  if (!u) throw new HttpError(401, "Please log in");
  return u;
}
export async function requireAdmin() {
  const u = await requireUser(); // role re-checked against DB, never trusting the client
  if (u.role !== "ADMIN") throw new HttpError(403, "Forbidden");
  return u;
}

export class HttpError extends Error { constructor(public status: number, msg: string) { super(msg); } }
