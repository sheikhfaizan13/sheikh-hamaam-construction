import { z } from "zod";

export function normalizePhone(raw: string): string | null {
  let d = raw.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? d : null;
}

const phone = z.string().trim().transform((v, ctx) => {
  const p = normalizePhone(v);
  if (!p) { ctx.addIssue({ code: "custom", message: "Enter a valid 10-digit Indian mobile number." }); return z.NEVER; }
  return p;
});

export const bookingSchema = z.object({
  customerName: z.string().trim().min(2).max(100),
  phone,
  email: z.string().trim().email().max(150).optional().or(z.literal("")),
  location: z.string().trim().min(2).max(200),
  preferredDate: z.coerce.date().refine((d) => d.getTime() > Date.now() - 864e5, "Choose today or a future date."),
  preferredTime: z.enum(["Morning", "Afternoon", "Evening"]),
  hammamType: z.enum(["Traditional", "Modern", "Custom", "Not Sure"]),
  roomSize: z.string().trim().min(2).max(60),
  projectType: z.enum(["New Construction", "Renovation"]),
  budget: z.enum(["Under ₹1 Lakh", "₹1-3 Lakh", "₹3-5 Lakh", "Above ₹5 Lakh", "Not Sure"]),
  requirements: z.string().trim().max(2000).optional().or(z.literal("")),
  website: z.string().max(0).optional(), // honeypot: real users leave this empty
});

export const trackSchema = z.object({
  bookingId: z.string().trim().toUpperCase().regex(/^SHC-\d{4}-\d{4,}$/),
  phone,
});
