import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Flame,
  Calendar,
  Package,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "./ui/button";
import { useBooking } from "../context/BookingContext";
import { ONLINE_POOJAS } from "../data";

export default function PoojaBanner() {
  const { openBooking } = useBooking();

  return (
    <section
      id="pooja-banner"
      data-testid="pooja-banner"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(10,8,30,0.90), rgba(10,8,30,0.94)), url('https://images.pexels.com/photos/13344256/pexels-photo-13344256.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5"
        >
          <div className="inline-flex items-center gap-2 text-gold text-xs tracking-[0.3em] uppercase mb-4">
            <Flame className="w-4 h-4" /> Online Vedic Pooja
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.08] text-white">
            All <span className="gold-text italic">Online Pooja</span> Services
            Available
          </h2>

          {/* Pricing Highlight */}
          <div className="mt-5 inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/10 border border-gold/40 text-gold text-sm sm:text-base font-medium">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>
              Pooja Dakshina: <strong>₹5,000/-</strong> (Full Vidhi)
            </span>
          </div>

          <p className="mt-5 text-white/80 text-sm sm:text-base leading-relaxed">
            Traditional poojas performed with complete Vedic vidhi and
            personalized sankalp on your Name &amp; Gotra.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => openBooking({ type: "pooja" })}
              size="lg"
              className="bg-gold hover:bg-gold-dark text-[#111] font-semibold rounded-full h-14 px-7 shadow-gold hover:shadow-gold-glow transition text-sm flex items-center justify-center gap-2"
              data-testid="pooja-cta"
            >
              <Calendar className="w-5 h-5 text-black" /> Book Pooja Slot
              (₹5,000)
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-gold/60 text-white hover:bg-gold/15 hover:text-gold rounded-full h-14 px-7 text-sm font-semibold transition flex items-center justify-center"
            >
              <Link to="/online-pooja">
                View All Pooja Details →
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {ONLINE_POOJAS.map((p, i) => (
            <div
              key={p.id}
              data-testid={`pooja-${i}`}
              onClick={() => openBooking({ type: "pooja", service: p.name })}
              className="group cursor-pointer flex flex-col justify-between p-4 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm hover:border-gold/70 hover:bg-white/15 transition duration-300"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-gold shrink-0 group-hover:scale-125 transition" />
                  <span className="font-serif text-lg text-white font-medium group-hover:text-gold transition">
                    {p.name}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-gold transition shrink-0" />
              </div>
              <p className="text-[11px] text-white/60 mt-2 line-clamp-2 leading-relaxed">
                {p.benefit}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-white/10">
                <span className="text-gold font-semibold">₹5,000</span>
                <span className="text-white/70 group-hover:text-white transition font-medium">
                  Book Slot →
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
