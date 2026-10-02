import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookingSchema } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rateLimit";
import { waUrl } from "@/lib/whatsapp";

const FAIL = "Something went wrong while submitting your request. Please try again or contact us on WhatsApp.";

export async function POST(req: Request) {
  if (!rateLimit(`book:${clientIp(req)}`, 5, 10 * 60_000))
    return NextResponse.json({ error: "Too many requests. Please try again in a few minutes." }, { status: 429 });
  try {
    const parsed = bookingSchema.safeParse(await req.json());
    if (!parsed.success)
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Please check the form." }, { status: 400 });
    const d = parsed.data;
    if (d.website) return NextResponse.json({ ok: true }); // bot: silently pretend success

    const booking = await db.$transaction(async (tx) => {
      const year = new Date().getFullYear();
      const counter = await tx.bookingCounter.upsert({
        where: { year }, create: { year, count: 1 }, update: { count: { increment: 1 } },
      });
      const bookingId = `SHC-${year}-${String(counter.count).padStart(4, "0")}`;
      const customer = await tx.customer.upsert({
        where: { phone: d.phone },
        create: { fullName: d.customerName, phone: d.phone, email: d.email || null, location: d.location },
        update: { fullName: d.customerName, email: d.email || null, location: d.location },
      });
      return tx.booking.create({
        data: {
          bookingId, customerId: customer.id, customerName: d.customerName, phone: d.phone,
          email: d.email || null, location: d.location, preferredDate: d.preferredDate,
          preferredTime: d.preferredTime, hammamType: d.hammamType, roomSize: d.roomSize,
          projectType: d.projectType, budget: d.budget, requirements: d.requirements || null,
        },
      });
    });

    const msg = [
      "Hello Sheikh Hamaam Construction,", "", "I have submitted a hammam booking request.", "",
      `Booking ID: ${booking.bookingId}`, "", `Name: ${d.customerName}`, `Phone: ${d.phone}`,
      `Location: ${d.location}`, `Hammam Type: ${d.hammamType}`, `Room Size: ${d.roomSize}`,
      `Project: ${d.projectType}`, `Budget: ${d.budget}`, "", "Please contact me regarding my hammam project.",
    ].join("\n");
    return NextResponse.json({ ok: true, bookingId: booking.bookingId, whatsappUrl: waUrl(msg) });
  } catch (e) {
    console.error("booking error", e);
    return NextResponse.json({ error: FAIL }, { status: 500 });
  }
}
