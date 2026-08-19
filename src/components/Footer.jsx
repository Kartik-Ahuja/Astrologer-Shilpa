import React from "react";
import { Phone, MapPin, Instagram, Youtube, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { CONTACT, waLink } from "../data";

const QUICK = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Consultation", href: "#consultation" },
  { label: "Products", href: "/products" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const POPULAR = [
  "Kundli Reading",
  "Kundli Matching",
  "Marriage Astrology",
  "Online Pooja",
  "Numerology",
];

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="relative bg-[#111111] text-white pt-20 pb-8 overflow-hidden"
    >
      <div
        className="absolute inset-0 mandala-bg opacity-30 pointer-events-none"
        aria-hidden
      />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
              <span className="font-serif text-gold text-2xl">श</span>
            </div>
            <div className="leading-tight">
              <div className="font-serif text-2xl">Astrologer Shilpa</div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold">
                Vedic · Jaipur
              </div>
            </div>
          </div>
          <p className="mt-6 text-white/70 text-sm leading-relaxed max-w-md">
            Guiding your life through Vedic Astrology, Kundli Reading &amp;
            Vastu Wisdom — trusted by thousands across India and abroad.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-instagram"
              className="w-10 h-10 rounded-full border border-white/15 hover:border-gold hover:text-gold transition flex items-center justify-center"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={CONTACT.youtube}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-youtube"
              className="w-10 h-10 rounded-full border border-white/15 hover:border-gold hover:text-gold transition flex items-center justify-center"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-whatsapp"
              className="w-10 h-10 rounded-full border border-white/15 hover:border-[#25D366] hover:text-[#25D366] transition flex items-center justify-center"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="text-sm tracking-[0.25em] uppercase text-gold mb-5">
            Quick Links
          </div>
          <ul className="space-y-3">
            {QUICK.map((q) => (
              <li key={q.href}>
                <Link
                  to={q.href.startsWith("#") ? `/${q.href}` : q.href}
                  className="text-white/75 hover:text-gold text-sm transition"
                >
                  {q.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <div className="text-sm tracking-[0.25em] uppercase text-gold mb-5">
            Popular Services
          </div>
          <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
            {POPULAR.map((p) => (
              <li key={p}>
                <Link
                  to="/#services"
                  className="text-white/75 hover:text-gold text-sm transition"
                >
                  {p}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-7 space-y-3 text-sm text-white/75">
            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="flex items-center gap-3 hover:text-gold transition"
            >
              <Phone className="w-4 h-4 text-gold" /> {CONTACT.phone}
            </a>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />{" "}
              <span>{CONTACT.city}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/50">
        <div>Copyright © 2026 Astrologer Shilpa. All Rights Reserved.</div>
        <div>
          Made by{" "}
          <a
            href="https://www.instagram.com/web.katha/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold transition"
          >
            @Web.Katha
          </a>
        </div>
      </div>
    </footer>
  );
}
