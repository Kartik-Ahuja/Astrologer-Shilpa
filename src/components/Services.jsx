import React from "react";
import { motion } from "framer-motion";
import { SERVICES } from "../data";

export default function Services() {
  return (
    <section id="services" data-testid="services-section" className="relative py-20 lg:py-32 bg-beige-50/50">
      <div className="absolute inset-0 mandala-bg pointer-events-none" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="section-label justify-center"><span>Services</span></div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.1] text-ink mt-5">
            Comprehensive <span className="gold-text italic">astrological guidance</span> for every life question.
          </h2>
          <div className="gold-divider w-24 mx-auto my-6" />
          <p className="text-ink-muted text-base sm:text-lg leading-relaxed">
            From kundli reading to  online pooja — find clarity for every aspect of life.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              data-testid={`service-card-${i}`}
              className="group relative bg-white rounded-2xl p-7 border border-beige-100 hover:border-gold/50 shadow-soft hover:shadow-gold transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-0 left-7 right-7 h-px bg-gold/0 group-hover:bg-gold transition-all duration-500" />
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition">
                <s.icon className="w-5 h-5 text-gold-dark" strokeWidth={1.6} />
              </div>
              <h3 className="font-serif text-2xl text-ink leading-tight">{s.title}</h3>
              <p className="mt-3 text-sm text-ink-muted leading-relaxed">{s.desc}</p>
              <div className="mt-5 text-xs uppercase tracking-[0.25em] text-gold-dark opacity-0 group-hover:opacity-100 transition">
                Available Online &amp; Offline →
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
