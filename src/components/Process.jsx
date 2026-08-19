import React from "react";
import { motion } from "framer-motion";
import { PROCESS } from "../data";

export default function Process() {
  return (
    <section id="process" data-testid="process-section" className="relative py-20 lg:py-32 bg-beige-50/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="section-label justify-center"><span>Booking Process</span></div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.1] text-ink mt-5">
            A simple, <span className="gold-text italic">4-step</span> journey to clarity.
          </h2>
          <div className="gold-divider w-24 mx-auto my-6" />
        </div>

        <div className="mt-16 relative">
          {/* Horizontal connecting line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                data-testid={`process-step-${i}`}
                className="relative text-center"
              >
                <div className="mx-auto w-24 h-24 rounded-full bg-white border border-gold/30 flex items-center justify-center shadow-soft relative z-10">
                  <span className="font-serif text-3xl gold-text">{p.step}</span>
                </div>
                <h3 className="mt-6 font-serif text-2xl text-ink">{p.title}</h3>
                <p className="mt-3 text-sm text-ink-muted leading-relaxed max-w-xs mx-auto">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
