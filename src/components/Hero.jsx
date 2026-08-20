import React from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Calendar, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { CONTACT, waLink } from "../data";
import HeroImage from "../Images/Hero.webp";

const fadeUp = {
  hidden: { opacity: 1, y: 0 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative flex w-full items-start overflow-hidden bg-[#FAFAFA] pt-28 pb-16 lg:min-h-svh lg:items-center lg:pt-36 lg:pb-28"
    >
      {/* Decorative background */}
      <div
        className="absolute inset-0 mandala-bg pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-gold/5 blur-3xl pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute -bottom-40 -left-20 w-[420px] h-[420px] rounded-full bg-beige-100 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-12 lg:px-16 grid lg:grid-cols-12 gap-12 lg:gap-12 items-center">
        <div className="lg:col-span-7 text-center lg:text-left">
          <motion.div
            initial={false}
            custom={0}
            className="section-label justify-center lg:justify-start mb-6"
          >
            <span>Vedic Astrology · Jaipur</span>
          </motion.div>

          <motion.h1
            initial={false}
            custom={1}
            className="font-serif text-[2.15rem] sm:text-[3.75rem] lg:text-[4.25rem] leading-[1.05] tracking-tight text-ink max-w-3xl mx-auto lg:mx-0"
            data-testid="hero-headline"
          >
            Best Astrologer in <span className="gold-text italic">Jaipur</span>
            <br />
            <span className="text-ink/90">Vedic Astrology, Kundli Reading</span>
          </motion.h1>

          <motion.p
            initial={false}
            custom={2}
            className="mt-5 max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg text-ink-muted leading-relaxed"
          >
            Get personalized guidance for{" "}
            <strong className="text-ink font-medium">
              career, marriage, relationships, business, finances, family
              matters &amp; life purpose
            </strong>{" "}
            through authentic Vedic Astrology — by Shilpa Tibrewal, a trusted
            astrologer in Jaipur.
          </motion.p>

          <motion.div
            initial={false}
            custom={3}
            className="mt-7 flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 max-w-xl mx-auto lg:mx-0"
          >
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-gold hover:bg-gold-dark text-white rounded-full h-12 px-6 text-sm sm:text-base font-medium shadow-gold hover:shadow-gold-glow transition-all duration-300 hover:-translate-y-0.5"
              data-testid="hero-book-btn"
            >
              <a href="#contact">
                <Calendar className="w-5 h-5 mr-2" /> Book Consultation
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-gold/60 text-ink hover:bg-gold/5 hover:border-gold rounded-full h-12 px-6 text-sm sm:text-base font-medium transition-all duration-300 hover:-translate-y-0.5"
              data-testid="hero-whatsapp-btn"
            >
              <a
                href={waLink(
                  "Namaste Shilpa ji, I would like to book a consultation.",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2 text-[#25D366]" />{" "}
                WhatsApp Now
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="w-full sm:w-auto text-ink hover:text-gold-dark rounded-full h-12 px-6 text-sm sm:text-base font-medium"
              data-testid="hero-call-btn"
            >
              <a href={`tel:${CONTACT.phoneRaw}`}>
                <Phone className="w-5 h-5 mr-2" /> Call Now
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={false}
            custom={4}
            className="mt-7 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-xs sm:text-sm text-ink-muted"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" /> 20+ Years of Experience
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" /> 10,000+ Consultations
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" /> Online &amp; Offline
            </div>
          </motion.div>
        </div>

        {/* Visual */}
        <motion.div initial={false} className="lg:col-span-5 relative">
          <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-lg lg:max-w-md">
            {/* Gold offset frame */}
            <div
              className="absolute inset-0 translate-x-3 translate-y-3 border border-gold/50 hero-arch pointer-events-none"
              aria-hidden
            />
            <div className="relative overflow-hidden hero-arch bg-white shadow-soft">
              <img
                src={HeroImage}
                alt="Astrologer Shilpa Tibrewal — Best Astrologer in Jaipur"
                className="w-full h-[360px] sm:h-[520px] lg:h-[520px] object-cover object-top"
                loading="eager"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white border border-gold/30 rounded-2xl px-5 py-4 shadow-soft animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="font-serif text-lg leading-none text-ink">
                    Shilpa Tibrewal
                  </div>
                  <div className="text-xs text-ink-muted mt-1">
                    Vedic Astrologer · Jaipur
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
