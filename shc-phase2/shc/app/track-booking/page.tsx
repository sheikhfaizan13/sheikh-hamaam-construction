"use client";
import { useState } from "react";
const STEPS = ["NEW", "CONTACTED", "CONFIRMED", "IN_PROGRESS", "COMPLETED"];
type B = { bookingId: string; hammamType: string; projectType: string; location: string; status: string; createdAt: string };
export default function Track() {
  const [b, setB] = useState<B | null>(null); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setErr(""); setB(null);
    try {
      const res = await fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))) });
      const d = await res.json(); if (res.ok) setB(d.booking); else setErr(d.error);
    } catch { setErr("Something went wrong. Please try again later."); }
    setBusy(false);
  }
  const idx = b ? STEPS.indexOf(b.status) : -1;
  return (
    <main className="mx-auto max-w-xl px-5 py-16">
      <a href="/" className="text-sm text-bronze">← Sheikh Hamaam Construction</a>
      <h1 className="mt-4 text-3xl font-semibold">Track Your Hammam</h1>
      <form onSubmit={submit} className="card mt-6 space-y-4 p-6">
        {err && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{err}</p>}
        <div><label className="label">Booking ID</label><input required name="bookingId" placeholder="SHC-2026-0001" className="input-field uppercase" /></div>
        <div><label className="label">Phone Number</label><input required name="phone" type="tel" inputMode="tel" className="input-field" /></div>
        <button disabled={busy} className="btn-primary w-full">{busy ? "Checking…" : "Track Booking"}</button>
      </form>
      {b && (
        <div className="card mt-6 p-6">
          <p className="font-mono text-lg font-semibold">{b.bookingId}</p>
          <p className="mt-1 text-sm text-bark/70">{b.hammamType} · {b.projectType} · {b.location}</p>
          <p className="text-sm text-bark/70">Booked on {new Date(b.createdAt).toLocaleDateString("en-IN", { dateStyle: "long" })}</p>
          {b.status === "CANCELLED" ? <p className="mt-5 font-medium text-red-700">This booking has been cancelled.</p> : (
            <ol className="mt-5 space-y-3">
              {STEPS.map((s, i) => (
                <li key={s} className={`flex items-center gap-3 ${i === idx ? "font-semibold text-walnut" : i < idx ? "text-bark/70" : "text-bark/35"}`}>
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${i === idx ? "bg-bronze text-white" : i < idx ? "bg-walnut text-cream" : "bg-beige"}`}>{i < idx ? "✓" : i + 1}</span>
                  {s.replace("_", " ")}
                </li>))}
            </ol>)}
        </div>)}
    </main>);
}
