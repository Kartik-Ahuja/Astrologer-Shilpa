import React from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Phone,
  Video,
  BookOpen,
  Hand,
  ScanFace,
  Compass,
  Flame,
  Calendar,
  Sparkles,
} from "lucide-react";
import { CONSULT_CHANNELS, waLink } from "../data";
import { useBooking } from "../context/BookingContext";
import { Button } from "./ui/button";

const ICON_MAP = {
  MessageCircle,
  Phone,
  Video,
  BookOpen,
  Hand,
  ScanFace,
  Compass,
  Flame,
};

export default function Consultation() {
  const { openBooking } = useBooking();

  return (
    <section
      id="consultation"
      data-testid="consultation-section"
      className="relative py-20 lg:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #FAF8F3 0%, #FFFFFF 60%, #F9F6EE 100%)",
      }}
    >
      <div className="absolute inset-0 mandala-bg pointer-events-none" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="section-label justify-center">
            <span>Audio Consultation</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.1] text-ink mt-5">
            Direct 1-on-1 Guidance with <span className="gold-text italic">Shilpa ji</span>.
          </h2>
          <div className="gold-divider w-24 mx-auto my-6" />

          {/* Pricing Highlight Pill */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold/15 border border-gold/30 text-gold-dark font-medium text-sm sm:text-base mb-4 shadow-soft">
            <Sparkles className="w-4 h-4 text-gold-dark" />
            <span>Consultation Fee: <strong>₹1,000/- for 10 Min Audio Call</strong></span>
          </div>

          <p className="text-ink-muted text-base sm:text-lg leading-relaxed">
            Get personalized kundli analysis, love &amp; relationship remedies, career timing, and immediate clarity directly over a private phone call.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {CONSULT_CHANNELS.map((c, i) => {
            const Icon = ICON_MAP[c.icon] || MessageCircle;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                data-testid={`consult-card-${i}`}
                onClick={() => openBooking({ type: "consultation", service: c.title })}
                className="group bg-white rounded-2xl p-6 border border-beige-100 hover:border-gold/50 hover:shadow-gold transition-all duration-300 hover:-translate-y-1 text-center cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 mx-auto flex items-center justify-center group-hover:bg-gold/20 transition">
                  <Icon className="w-6 h-6 text-gold-dark" strokeWidth={1.5} />
                </div>
                <div className="mt-4 font-serif text-lg text-ink leading-tight">{c.title}</div>
                <div className="mt-2 text-[11px] text-gold-dark opacity-0 group-hover:opacity-100 transition font-medium">
                  Book Slot →
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Button
            onClick={() => openBooking({ type: "consultation" })}
            size="lg"
            className="w-full sm:w-auto bg-gold hover:bg-gold-dark text-white rounded-full h-14 px-8 shadow-gold hover:shadow-gold-glow transition text-base font-semibold"
            data-testid="consult-cta"
          >
            <Calendar className="w-5 h-5 mr-2" /> Book Audio Call Slot (₹1,000)
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-gold/50 text-ink hover:bg-gold/5 rounded-full h-14 px-8 text-sm font-medium"
          >
            <a
              href={waLink("Namaste Shilpa ji, I would like to know about available consultation slots.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-5 h-5 mr-2 text-[#25D366]" /> Ask on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
