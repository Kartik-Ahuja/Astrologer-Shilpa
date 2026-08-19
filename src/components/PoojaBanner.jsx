import React from "react";
import { motion } from "framer-motion";
import { Flame, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { waLink } from "../data";

const POOJAS = [
  "Navgrah Shanti Pooja", "Mahamrityunjay Jaap", "Kaal Sarp Dosh Pooja",
  "Manglik Dosh Pooja", "Lakshmi Pooja", "Ganesh Pooja",
  "Rudrabhishek Pooja", "Pitra Dosh Nivaran Pooja", "Shiv Parvati Vivah",
];

export default function PoojaBanner() {
  return (
    <section
      data-testid="pooja-banner"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(10,8,30,0.88), rgba(10,8,30,0.92)), url('https://images.pexels.com/photos/13344256/pexels-photo-13344256.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 text-gold text-xs tracking-[0.3em] uppercase mb-5">
            <Flame className="w-4 h-4" /> Online Pooja
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.05] text-white">
            All <span className="gold-text italic">Online Pooja</span> Services Available
          </h2>
          <p className="mt-6 text-white/75 text-base sm:text-lg leading-relaxed max-w-lg">
            Traditional poojas performed with full vidhi and sankalp on your behalf — guided by Astrologer Shilpa Tibrewal.
          </p>

          <Button
            asChild
            size="lg"
            className="mt-8 bg-gold hover:bg-gold-dark text-[#111] rounded-full h-14 px-8 shadow-gold hover:shadow-gold-glow transition"
            data-testid="pooja-cta"
          >
            <a href={waLink("Namaste Shilpa ji, I would like to book an online pooja.")} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" /> Book Your Pooja Today
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {POOJAS.map((p, i) => (
            <div
              key={p}
              data-testid={`pooja-${i}`}
              className="flex items-center gap-3 px-5 py-4 rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm hover:border-gold/60 hover:bg-white/10 transition"
            >
              <div className="w-2 h-2 rounded-full bg-gold shrink-0" />
              <span className="font-serif text-lg text-white">{p}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
