import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Award } from "lucide-react";
import { Button } from "./ui/button";
import { waLink } from "../data";
import Astro from "../Images/astro.webp";

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative py-20 lg:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid lg:grid-cols-12 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5"
        >
          <div className="relative mx-auto max-w-sm lg:mx-0">
            <div
              className="absolute inset-0 translate-x-3 translate-y-3 border border-gold/50 rounded-[2rem]"
              aria-hidden
            />
            <div className="relative rounded-[2rem] overflow-hidden bg-beige-50">
              <img
                src={Astro}
                alt="Astrologer Shilpa Tibrewal — Vedic astrologer in Jaipur"
                className="w-full h-[480px] object-cover object-top"
                loading="lazy"
              />
            </div>
            <div className="absolute -top-6 -right-6 bg-white border border-gold/30 rounded-2xl px-5 py-4 shadow-soft">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-gold" />
                <div>
                  <div className="font-serif text-xl text-ink leading-none">
                    20+ Years
                  </div>
                  <div className="text-xs text-ink-muted mt-1">
                    of experience
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7"
        >
          <div className="section-label mb-5">
            <span>About Shilpa</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.1] text-ink">
            Bringing{" "}
            <span className="gold-text italic">clarity, confidence</span> &amp;
            direction through Vedic wisdom.
          </h2>
          <div className="gold-divider w-24 my-7" />
          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            Hi, I am{" "}
            <strong className="text-ink font-medium">Shilpa Tibrewal</strong>, a
            trusted Astrologer in Jaipur offering Vedic Astrology, Kundli
            Reading, Janam Kundli Analysis, Horoscope Reading, Palm Reading,
            Face Reading, Numerology, and Online Pooja Consultation.
          </p>
          <p className="mt-5 text-base sm:text-lg text-ink-muted leading-relaxed">
            My mission is to help people gain{" "}
            <strong className="text-ink font-medium">
              clarity, confidence and direction
            </strong>{" "}
            through personalized astrological guidance — combining ancient Vedic
            principles with practical, easy-to-follow remedies for modern life.
          </p>

          <div className="grid sm:grid-cols-3 gap-5 mt-10">
            {[
              { icon: Sparkles, k: "10,000+", v: "Consultations" },
              { icon: Heart, k: "98%", v: "Client Satisfaction" },
              { icon: Award, k: "All India", v: "Online Reach" },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-2xl border border-beige-100 bg-beige-50/40 p-5"
              >
                <s.icon className="w-5 h-5 text-gold mb-3" strokeWidth={1.6} />
                <div className="font-serif text-2xl text-ink">{s.k}</div>
                <div className="text-xs uppercase tracking-widest text-ink-muted mt-1">
                  {s.v}
                </div>
              </div>
            ))}
          </div>

          <Button
            asChild
            className="mt-10 bg-gold hover:bg-gold-dark text-white rounded-full h-12 px-7 shadow-gold hover:shadow-gold-glow transition"
            data-testid="about-cta"
          >
            <a
              href={waLink(
                "Namaste Shilpa ji, I would like to know more about your consultations.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Talk to Shilpa ji
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
