"use client";
import { useState } from "react";
export default function ContactForm() {
  const [busy, setBusy] = useState(false); const [err, setErr] = useState(""); const [ok, setOk] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setErr("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))) });
      if (res.ok) setOk(true); else setErr((await res.json()).error ?? "Something went wrong. Please try again later.");
    } catch { setErr("Something went wrong. Please try again later."); }
    setBusy(false);
  }
  if (ok) return <p className="text-bark/80">✅ Thank you. Your message has been received and our team will get back to you.</p>;
  return (
    <form onSubmit={submit} className="space-y-4">
      {err && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{err}</p>}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div><label className="label">Name</label><input required name="name" className="input-field" /></div>
      <div><label className="label">Phone</label><input required name="phone" type="tel" inputMode="tel" className="input-field" /></div>
      <div><label className="label">Email (optional)</label><input name="email" type="email" className="input-field" /></div>
      <div><label className="label">Message</label><textarea required name="message" className="input-field min-h-[100px]" /></div>
      <button disabled={busy} className="btn-primary w-full">{busy ? "Sending…" : "Send Message"}</button>
    </form>);
}
