import Image from "next/image";
import BookingForm from "@/components/BookingForm";
import ContactForm from "@/components/ContactForm";
import Gallery, { Work } from "@/components/Gallery";
import { waUrl } from "@/lib/whatsapp";
export const dynamic = "force-dynamic";
const WORKS: Work[] = [
  { title: "Hammam Heating Structure", img: "/images/project-1.jpg", cat: "Traditional" },
  { title: "Hammam Floor Construction", img: "/images/project-2.jpg", cat: "Residential" },
  { title: "Traditional Hammam Interior", img: "/images/project-3.jpg", cat: "Traditional" },
  { title: "Hammam Flooring Work", img: "/images/project-4.jpg", cat: "Residential" },
  { title: "Traditional Kashmiri Hammam", img: "/images/project-5.jpg", cat: "Traditional" },
  { title: "Hammam Interior", img: "/images/project-6.jpg", cat: "Luxury" },
];
const SERVICES: [string, string][] = [
  ["Hammam Construction", "End-to-end construction of hammams, built with durable materials and proper heating channels for long-lasting warmth."],
  ["Custom Hammam Design", "Hammams designed around your room size, budget and preferences, from layout to finishing."],
  ["Traditional Kashmiri Hammam", "Authentic Kashmiri hammam construction using traditional stone flooring and underfloor heating techniques."],
  ["Modern Hammam", "Contemporary hammam builds that combine modern finishes with reliable, efficient heating systems."],
  ["Heating Systems", "Construction of the heating chamber and channels that keep the hammam floor warm through winter."],
  ["Flooring & Finishing", "Stone flooring, grouting and finishing work for a durable, comfortable hammam floor."],
  ["Hammam Renovation", "Repair and upgrading of existing hammams: flooring, heating and structural improvements."],
];
const NAV = [["#home", "Home"], ["#about", "About"], ["#services", "Services"], ["#work", "Our Work"], ["#booking", "Booking"], ["#contact", "Contact"]];
export default function Home() {
  const wa = waUrl("Hello Sheikh Hamaam Construction, I'd like to know more about your services.");
  return (<>
    <header className="fixed inset-x-0 top-0 z-50 bg-cream/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <a href="#home" className="font-serif text-lg font-semibold text-walnut">Sheikh Hamaam <span className="text-bronze">Construction</span></a>
        <ul className="hidden items-center gap-6 text-sm font-medium lg:flex">{NAV.map(([h, l]) => <li key={h}><a href={h} className="hover:text-bronze">{l}</a></li>)}<li><a href="/track-booking" className="hover:text-bronze">Track Booking</a></li></ul>
        <details className="relative lg:hidden"><summary className="cursor-pointer list-none p-2 text-2xl text-walnut" aria-label="Menu">☰</summary>
          <ul className="absolute right-0 mt-2 w-56 rounded-xl bg-cream p-2 shadow-xl">{NAV.map(([h, l]) => <li key={h}><a href={h} className="block rounded-md px-3 py-3 hover:bg-beige">{l}</a></li>)}<li><a href="/track-booking" className="block rounded-md px-3 py-3 hover:bg-beige">Track Booking</a></li></ul></details>
      </nav>
    </header>
    <main>
      <section id="home" className="relative flex min-h-[92vh] items-center overflow-hidden">
        <Image src="/images/hero.jpg" alt="Finished traditional Kashmiri hammam interior with stone flooring" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-bark/75 via-bark/55 to-bark/90" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-28 text-center sm:text-left">
          <div className="mx-auto max-w-2xl sm:mx-0">
            <span className="eyebrow !text-gold">Traditional Kashmiri Craftsmanship</span>
            <h1 className="text-4xl font-semibold leading-tight text-cream sm:text-5xl lg:text-6xl">Traditional Kashmiri Hammam, Built With Care.</h1>
            <p className="mt-5 max-w-xl text-base text-beige/90 sm:text-lg">Professional hammam construction and design services combining traditional craftsmanship with modern construction techniques.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start">
              <a href="#booking" className="btn-primary">Book a Hammam</a>
              <a href="#work" className="btn-secondary !border-cream/40 !text-cream">View Our Work</a>
              <a href={wa} target="_blank" rel="noopener" className="btn-wa">WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="mx-auto max-w-7xl px-5 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4]"><Image src="/images/about-1.jpg" alt="Brick-built hammam heating structure" fill sizes="25vw" className="rounded-2xl object-cover shadow-lg" /></div>
            <div className="relative mt-8 aspect-[3/4]"><Image src="/images/about-2.jpg" alt="Men relaxing inside a finished traditional hammam" fill sizes="25vw" className="rounded-2xl object-cover shadow-lg" /></div>
          </div>
          <div>
            <span className="eyebrow">About Us</span>
            <h2 className="text-3xl font-semibold sm:text-4xl">Hammam Craftsmanship Rooted in Kashmiri Tradition</h2>
            <p className="mt-5 leading-relaxed text-bark/80">Sheikh Hamaam Construction specializes in building traditional Kashmiri hammams, from the stone flooring and underfloor heating channels to the final finishing touches. We work on new hammam construction as well as renovation and upgrading of existing hammams, combining time-tested techniques with modern construction practices.</p>
          </div>
        </div>
      </section>
      <section id="services" className="bg-beige/50 py-20 sm:py-28"><div className="mx-auto max-w-7xl px-5">
        <div className="text-center"><span className="eyebrow">What We Do</span><h2 className="text-3xl font-semibold sm:text-4xl">Our Services</h2></div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(([t, d]) => <div key={t} className="card p-6"><h3 className="text-lg font-semibold">{t}</h3><p className="mt-2 text-sm leading-relaxed text-bark/75">{d}</p><a href="#booking" className="mt-4 inline-block text-sm font-medium text-bronze">Book this service →</a></div>)}
        </div></div></section>
      <section id="work" className="mx-auto max-w-7xl px-5 py-20 sm:py-28">
        <div className="text-center"><span className="eyebrow">Our Work</span><h2 className="text-3xl font-semibold sm:text-4xl">Real Hammam Projects</h2><p className="mt-4 text-bark/70">A look at our actual construction and finishing work.</p></div>
        <Gallery items={WORKS} />
      </section>
      <section id="booking" className="bg-beige/50 py-20 sm:py-28"><div className="mx-auto max-w-3xl px-5">
        <div className="mb-12 text-center"><span className="eyebrow">Book Now</span><h2 className="text-3xl font-semibold sm:text-4xl">Request Your Hammam</h2><p className="mt-4 text-bark/70">Tell us about your project and our team will get in touch. Already booked? <a href="/track-booking" className="text-bronze underline">Track your hammam</a>.</p></div>
        <BookingForm />
      </div></section>
      <section id="contact" className="py-20 sm:py-28"><div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2">
        <div>
          <span className="eyebrow">Get in Touch</span><h2 className="text-3xl font-semibold sm:text-4xl">Sheikh Hamaam Construction</h2>
          <p className="mt-3 text-bark/75">📍 Sader Koot Bala, Bandipora<br />Jammu &amp; Kashmir, India</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={wa} target="_blank" rel="noopener" className="btn-wa">WhatsApp</a>
            <a href="https://www.instagram.com/sheikh_hamaam.construction" target="_blank" rel="noopener" className="btn-secondary">Instagram</a>
            <a href="https://www.facebook.com/share/1VbtR6SJwS/" target="_blank" rel="noopener" className="btn-secondary">Facebook</a>
          </div>
        </div>
        <div className="card p-6 sm:p-8"><ContactForm /></div>
      </div></section>
    </main>
    <footer className="bg-bark text-cream/80"><div className="mx-auto max-w-7xl px-5 py-12">
      <h3 className="text-lg font-semibold text-cream">Sheikh Hamaam Construction</h3>
      <p className="mt-2 text-sm text-cream/60">Traditional Craftsmanship. Modern Construction.</p>
      <p className="mt-8 border-t border-white/10 pt-6 text-xs text-cream/50">© {new Date().getFullYear()} Sheikh Hamaam Construction. All rights reserved.</p>
    </div></footer>
    <a href={wa} target="_blank" rel="noopener" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-lg">💬</a>
  </>);
}
