import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { normalizePhone } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rateLimit";
const schema = z.object({
  name: z.string().trim().min(2).max(100), phone: z.string(),
  email: z.string().trim().email().max(150).optional().or(z.literal("")),
  message: z.string().trim().min(5).max(3000), website: z.string().max(0).optional(),
});
export async function POST(req: Request) {
  if (!rateLimit(`contact:${clientIp(req)}`, 5, 10 * 60_000)) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  try {
    const p = schema.safeParse(await req.json());
    if (!p.success) return NextResponse.json({ error: "Please check your details and try again." }, { status: 400 });
    if (p.data.website) return NextResponse.json({ ok: true });
    const phone = normalizePhone(p.data.phone);
    if (!phone) return NextResponse.json({ error: "Enter a valid 10-digit Indian mobile number." }, { status: 400 });
    await db.contactMessage.create({ data: { name: p.data.name, phone, email: p.data.email || null, message: p.data.message } });
    return NextResponse.json({ ok: true });
  } catch (e) { console.error("contact error", e); return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 }); }
}
