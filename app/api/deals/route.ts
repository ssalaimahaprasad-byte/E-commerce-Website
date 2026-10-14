import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const deals = await db.deal.findMany({
      where: { activeOnly: true },
    });
    return NextResponse.json({ deals: deals || [] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to load deals" }, { status: 500 });
  }
}
