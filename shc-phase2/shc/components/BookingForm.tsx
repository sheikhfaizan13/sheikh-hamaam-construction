"use client";
import { useState } from "react";
const sel = (name: string, label: string, opts: string[]) => (
  <div><label className="label">{label}</label>
    <select required name={name} className="input-field" defaultValue=""><option value="" disabled>Select</option>{opts.map(o => <option key={o}>{o}</option>)}</select></div>
);
export default function BookingForm() {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [done, setDone] = useState<{ bookingId: string; whatsappUrl: string } | null>(null);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setErr("");
    try {
      const res = await fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))) });
      const data = await res.json();
      if (!res.ok) setErr(data.error ?? "Something went wrong. Please try again later.");
      else setDone(data);
    } catch { setErr("Something went wrong while submitting your request. Please try again or contact us on WhatsApp."); }
    setBusy(false);
  }
  if (done) return (
    <div className="card mx-auto max-w-xl p-8 text-center">
      <div className="text-4xl">✅</div>
      <h3 className="mt-4 text-xl font-semibold">Your hammam request has been received successfully.</h3>
      <p className="mt-3 text-sm text-bark/70">Booking ID</p>
      <p className="font-mono text-2xl font-semibold text-walnut">{done.bookingId}</p>
      <p className="mt-2 text-bark/70">Our team will contact you soon. Save this ID to track your booking.</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a href={done.whatsappUrl} target="_blank" rel="noopener" className="btn-wa">Continue on WhatsApp</a>
        <a href="/track-booking" className="btn-secondary">Track Your Hammam</a>
      </div>
    </div>);
  return (
    <form onSubmit={submit} className="card p-6 sm:p-10">
      {err && <p role="alert" className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{err}</p>}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label className="label">Full Name</label><input required name="customerName" className="input-field" autoComplete="name" /></div>
        <div><label className="label">Phone</label><input required name="phone" type="tel" inputMode="tel" className="input-field" autoComplete="tel" /></div>
        <div><label className="label">Email (optional)</label><input name="email" type="email" className="input-field" /></div>
        <div><label className="label">Location</label><input required name="location" className="input-field" /></div>
        <div><label className="label">Preferred Date</label><input required name="preferredDate" type="date" className="input-field" /></div>
        {sel("preferredTime", "Preferred Contact Time", ["Morning", "Afternoon", "Evening"])}
        {sel("hammamType", "Hammam Type", ["Traditional", "Modern", "Custom", "Not Sure"])}
        <div><label className="label">Approximate Room Size</label><input required name="roomSize" placeholder="e.g. 10x12 ft" className="input-field" /></div>
        {sel("projectType", "New Construction / Renovation", ["New Construction", "Renovation"])}
        {sel("budget", "Budget Range", ["Under ₹1 Lakh", "₹1-3 Lakh", "₹3-5 Lakh", "Above ₹5 Lakh", "Not Sure"])}
        <div className="sm:col-span-2"><label className="label">Additional Requirements (optional)</label><textarea name="requirements" className="input-field min-h-[100px]" /></div>
      </div>
      <button disabled={busy} className="btn-primary mt-8 w-full sm:w-auto">{busy ? "Submitting…" : "Submit Booking Request"}</button>
    </form>);
}
