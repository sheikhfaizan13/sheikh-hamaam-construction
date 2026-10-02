import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { trackSchema } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rateLimit";

const NOT_FOUND = "Booking ID not found. Please check your details.";

export async function POST(req: Request) {
  if (!rateLimit(`track:${clientIp(req)}`, 10, 10 * 60_000))
    return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  try {
    const parsed = trackSchema.safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({ error: NOT_FOUND }, { status: 404 });
    const b = await db.booking.findUnique({
      where: { bookingId: parsed.data.bookingId },
      select: { bookingId: true, phone: true, hammamType: true, projectType: true, location: true, status: true, createdAt: true },
    });
    // Same message whether the ID or the phone is wrong, so IDs can't be probed.
    if (!b || b.phone !== parsed.data.phone) return NextResponse.json({ error: NOT_FOUND }, { status: 404 });
    const { phone: _omit, ...safe } = b; // never returns notes or contact details
    return NextResponse.json({ ok: true, booking: safe });
  } catch (e) {
    console.error("track error", e);
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 });
  }
}
