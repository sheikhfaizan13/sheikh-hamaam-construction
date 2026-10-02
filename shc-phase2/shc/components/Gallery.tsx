"use client";
import Image from "next/image";
import { useState } from "react";
export type Work = { title: string; img: string; cat: string };
const CATS = ["All", "Traditional", "Modern", "Luxury", "Residential"];
export default function Gallery({ items }: { items: Work[] }) {
  const [f, setF] = useState("All"); const [open, setOpen] = useState<number | null>(null);
  const list = f === "All" ? items : items.filter(i => i.cat === f);
  return (<>
    <div className="mt-8 flex flex-wrap justify-center gap-2">
      {CATS.map(c => <button key={c} onClick={() => setF(c)} className={`rounded-full px-4 py-2.5 text-sm font-medium ${f === c ? "bg-walnut text-cream" : "bg-white text-bark/70"}`}>{c}</button>)}
    </div>
    <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((p, i) => (
        <button key={p.img} onClick={() => setOpen(i)} className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
          <Image src={p.img} alt={`${p.title} by Sheikh Hamaam Construction`} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-left font-serif text-cream">{p.title}</span>
        </button>))}
    </div>
    {open !== null && list[open] && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4" onClick={() => setOpen(null)}>
        <button className="absolute right-4 top-4 text-3xl text-white" aria-label="Close">✕</button>
        <button className="absolute left-2 p-3 text-3xl text-white" aria-label="Previous" onClick={e => { e.stopPropagation(); setOpen((open - 1 + list.length) % list.length); }}>‹</button>
        <button className="absolute right-2 p-3 text-3xl text-white" aria-label="Next" onClick={e => { e.stopPropagation(); setOpen((open + 1) % list.length); }}>›</button>
        <div className="relative h-[75vh] w-full max-w-3xl"><Image src={list[open].img} alt={list[open].title} fill className="object-contain" /></div>
      </div>)}
  </>);
}
