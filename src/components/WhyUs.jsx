import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { WHY_US } from "../data";

export default function WhyUs() {
  return (
    <section id="why" data-testid="why-section" className="relative py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="section-label"><span>Why Choose Us</span></div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.1] text-ink mt-5">
            Trusted, <span className="gold-text italic">personalized</span> &amp; spiritually grounded.
          </h2>
          <div className="gold-divider w-24 my-6" />
          <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-md">
            Every consultation is treated with care, confidentiality and a clear plan of action — combining classical wisdom with practical guidance.
          </p>
        </div>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          {WHY_US.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              data-testid={`why-item-${i}`}
              className="flex items-start gap-4 p-5 rounded-2xl bg-beige-50/60 border border-beige-100 hover:border-gold/40 transition"
            >
              <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center shrink-0">
                <Check className="w-5 h-5 text-gold-dark" strokeWidth={2} />
              </div>
              <div className="font-serif text-xl text-ink leading-snug pt-1.5">{item}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
