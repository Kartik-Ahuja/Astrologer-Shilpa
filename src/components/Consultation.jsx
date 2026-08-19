import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Phone, Video, BookOpen, Hand, ScanFace, Compass, Flame } from "lucide-react";
import { CONSULT_CHANNELS, waLink } from "../data";
import { Button } from "./ui/button";

const ICON_MAP = { MessageCircle, Phone, Video, BookOpen, Hand, ScanFace, Compass, Flame };

export default function Consultation() {
  return (
    <section
      id="consultation"
      data-testid="consultation-section"
      className="relative py-20 lg:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #FAF8F3 0%, #FFFFFF 60%, #F9F6EE 100%)",
      }}
    >
      <div className="absolute inset-0 mandala-bg pointer-events-none" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="section-label justify-center"><span>Online Consultation</span></div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.1] text-ink mt-5">
            Consult from <span className="gold-text italic">anywhere</span> in the world.
          </h2>
          <div className="gold-divider w-24 mx-auto my-6" />
          <p className="text-ink-muted text-base sm:text-lg leading-relaxed">
            Authentic Vedic astrology consultations available from the comfort of your home — across India and abroad.
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
                className="group bg-white rounded-2xl p-6 border border-beige-100 hover:border-gold/50 hover:shadow-gold transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 mx-auto flex items-center justify-center group-hover:bg-gold/20 transition">
                  <Icon className="w-6 h-6 text-gold-dark" strokeWidth={1.5} />
                </div>
                <div className="mt-4 font-serif text-lg text-ink leading-tight">{c.title}</div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Button
            asChild
            size="lg"
            className="bg-gold hover:bg-gold-dark text-white rounded-full h-14 px-8 shadow-gold hover:shadow-gold-glow transition"
            data-testid="consult-cta"
          >
            <a href={waLink("Namaste Shilpa ji, I would like to book an online consultation.")} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" /> Book Online Consultation
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
