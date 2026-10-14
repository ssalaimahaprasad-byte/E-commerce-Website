import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = ContactSchema.parse(body);

    const ticketNumber = "RC-SUP-" + Math.floor(100000 + Math.random() * 900000);

    return NextResponse.json({
      success: true,
      ticketNumber,
      message: `Thank you, ${data.name}! Your message has been received. Our support team will respond to ${data.email} within 24 business hours (Ticket #${ticketNumber}).`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to submit contact message" },
      { status: 400 }
    );
  }
}
