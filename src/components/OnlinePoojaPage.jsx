import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  Phone,
  ArrowRight,
  Package,
  Stars,
  Heart,
  IndianRupee,
  Sun,
  Users,
  HeartHandshake,
  Award,
  Video,
  FileCheck,
  Check,
  X,
  Info,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import { Button } from "./ui/button";
import { useBooking } from "../context/BookingContext";
import { ONLINE_POOJAS, CONTACT, waLink } from "../data";

const ICON_MAP = {
  Stars,
  Flame,
  Sparkles,
  Heart,
  IndianRupee,
  Sun,
  Users,
  HeartHandshake,
};

const CATEGORIES = [
  { id: "all", label: "All Poojas (9)" },
  { id: "dosha", label: "Planetary & Dosha Nivaran" },
  { id: "health", label: "Health & Protection" },
  { id: "wealth", label: "Wealth & Prosperity" },
  { id: "marriage", label: "Marriage & Relationships" },
];

export default function OnlinePoojaPage() {
  const { openBooking } = useBooking();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPoojaForModal, setSelectedPoojaForModal] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    document.title =
      "Online Vedic Pooja Services | Authentic Vidhi, Sankalp & Prasad | Astrologer Shilpa";

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute(
        "content",
        "Book authentic online Vedic poojas with personalized Sankalp on your Name & Gotra. 100% Vedic vidhi, live video clips on WhatsApp, and energized Prasad delivered across India.",
      );
    }
  }, []);

  const filteredPoojas =
    selectedCategory === "all"
      ? ONLINE_POOJAS
      : ONLINE_POOJAS.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-ink flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* ========================================================= */}
        {/* LIGHT HERO SECTION                                        */}
        {/* ========================================================= */}
        <section
          className="relative pt-32 pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #FAF8F3 0%, #FFFFFF 50%, #F9F6EE 100%)",
          }}
        >
          {/* Subtle background mandala */}
          <div
            className="absolute inset-0 mandala-bg pointer-events-none opacity-40"
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

          <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center">
            {/* Section label */}
            <div className="section-label justify-center mb-4">
              <span>Online Vedic Pooja Services</span>
            </div>

            <h1 className="font-serif text-3.5xl sm:text-5xl lg:text-[3.75rem] leading-[1.08] text-ink max-w-4xl mx-auto">
              Authentic Online Vedic Pooja on Your{" "}
              <span className="gold-text italic">Name &amp; Gotra</span>.
            </h1>

            <div className="gold-divider w-24 mx-auto my-6" />

            {/* Flat Dakshina Highlight Pill */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold/15 border border-gold/30 text-gold-dark font-medium text-xs sm:text-sm mb-5 shadow-soft">
              <Sparkles className="w-4 h-4 text-gold-dark" />
              <span>
                Pooja Dakshina: <strong>₹5,000/- Flat</strong> (Full Shastric
                Vidhi + Samagri + Havan + Video Proof + Prasad Delivery)
              </span>
            </div>

            <p className="text-ink-muted text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              Resolve persistent planetary doshas, health worries, financial
              stagnation, and marriage delays. Conducted with authentic Shastric
              vidhi, sacred havan, real-time video proof on WhatsApp, and
              sanctified Prasad delivered across India.
            </p>

            {/* Hero CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => openBooking({ type: "pooja" })}
                size="lg"
                className="w-full sm:w-auto bg-gold hover:bg-gold-dark text-white font-semibold rounded-full h-13 px-8 shadow-gold hover:shadow-gold-glow transition text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-5 h-5" /> Book a Pooja Slot (₹5,000)
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-gold/50 text-ink hover:bg-gold/5 rounded-full h-13 px-8 text-sm font-medium transition cursor-pointer"
              >
                <a
                  href={waLink(
                    "Namaste Shilpa ji, I would like to consult about which Online Pooja is recommended for my problem.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2 text-[#25D366]" /> Ask
                  Which Pooja on WhatsApp
                </a>
              </Button>
            </div>

            {/* 4 Trust Highlights (Clean Light Cards) */}
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
              {[
                {
                  icon: FileCheck,
                  title: "Individual Sankalp",
                  desc: "Recited with devotee's exact Name, Gotra & Nakshatra",
                },
                {
                  icon: Video,
                  title: "Live Video on WhatsApp",
                  desc: "Clear video clips & photos of your Sankalp & Havan",
                },
                {
                  icon: Package,
                  title: "Doorstep Prasad Delivery",
                  desc: "Blessed Prasad, Yantra & Raksha Sutra couriered",
                },
                {
                  icon: Award,
                  title: "Certified Vedic Pandits",
                  desc: "100% Shastric vidhi guided by Astrologer Shilpa ji",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white border border-beige-100 shadow-soft"
                >
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold-dark mb-3">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="font-serif text-base font-semibold text-ink">
                    {item.title}
                  </div>
                  <div className="text-xs text-ink-muted mt-1 leading-relaxed">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* HOW ONLINE POOJA WORKS                                    */}
        {/* ========================================================= */}
        <section className="py-20 bg-white border-y border-beige-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="text-center max-w-3xl mx-auto">
              <div className="section-label justify-center">
                <span>Transparency &amp; Shastra Vidhi</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink mt-4">
                Pooja Me Exactly{" "}
                <span className="gold-text italic">Kya Hoga?</span>
              </h2>
              <div className="gold-divider w-24 mx-auto my-5" />
              <p className="text-ink-muted text-sm sm:text-base leading-relaxed">
                Step-by-step process of how your online Vedic pooja is performed
                with authentic rituals from booking to prasad delivery.
              </p>
            </div>

            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {[
                {
                  step: "01",
                  title: "Sankalp Details",
                  desc: "You provide devotee's Name, Gotra, Date & Place of Birth, and your specific prayer/wish.",
                },
                {
                  step: "02",
                  title: "Shubh Muhurat",
                  desc: "Pooja is scheduled on an auspicious Vedic tithi (Ekadashi, Amavasya, Purnima) aligned with your chart.",
                },
                {
                  step: "03",
                  title: "Vedic Mantras & Havan",
                  desc: "Vedic Pandits conduct Kalash Sthapana, 11,000+ Beej Mantra jaap, and sacred Samidha Havan.",
                },
                {
                  step: "04",
                  title: "WhatsApp Video Proof",
                  desc: "High-resolution video clips and photos of your personal Sankalp being taken are shared on WhatsApp.",
                },
                {
                  step: "05",
                  title: "Prasad Courier",
                  desc: "Energized Yantra, protective Raksha Sutra, and holy dry-fruit Prasad are dispatched to your doorstep.",
                },
              ].map((s, idx) => (
                <div
                  key={idx}
                  className="relative p-6 rounded-2xl bg-[#FAF8F3] border border-beige-200/80 hover:border-gold/50 hover:shadow-soft transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="font-serif text-3xl font-bold text-gold/30">
                    {s.step}
                  </div>
                  <div className="mt-4">
                    <h3 className="font-serif text-lg text-ink font-semibold">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3-COLUMN POOJA CATALOG GRID (Balanced & Elegant)          */}
        {/* ========================================================= */}
        <section id="pooja-list" className="py-20 lg:py-28 bg-[#FAFAFA]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="section-label justify-center">
                <span>Sacred Offerings</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink mt-4">
                Explore All{" "}
                <span className="gold-text italic">Online Pooja Services</span>
              </h2>
              <div className="gold-divider w-24 mx-auto my-5" />
              <p className="text-ink-muted text-sm sm:text-base leading-relaxed">
                Choose a pooja below to read the complete vidhi details or book
                your personal Sankalp. Each pooja includes full Vedic rituals,
                live WhatsApp video clips, and home Prasad delivery.
              </p>

              {/* Category Filter Pills */}
              <div className="mt-8 flex flex-wrap justify-center items-center gap-2 max-w-4xl mx-auto">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer ${
                      selectedCategory === cat.id
                        ? "bg-gold text-white shadow-soft"
                        : "bg-white text-ink hover:text-gold-dark border border-beige-200 hover:border-gold/40 shadow-xs"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Responsive 3-Column Grid */}
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPoojas.map((pooja, i) => {
                const IconComponent = ICON_MAP[pooja.icon] || Flame;

                return (
                  <motion.article
                    key={pooja.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                    className="group bg-white rounded-3xl p-6 md:p-7 border border-beige-200/90 hover:border-gold/60 shadow-soft hover:shadow-gold transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 relative"
                  >
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-8 right-8 h-1 bg-gold/0 group-hover:bg-gold/60 rounded-full transition-all duration-300" />

                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gold/10 text-gold-dark border border-gold/20">
                          {pooja.categoryLabel}
                        </span>

                        <div className="flex items-center gap-1.5 text-[11px] text-ink-muted font-medium">
                          <Clock className="w-3.5 h-3.5 text-gold" />
                          <span>{pooja.duration}</span>
                        </div>
                      </div>

                      {/* Icon + Title */}
                      <div className="flex items-start gap-3.5 mb-3">
                        <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold-dark shrink-0 group-hover:bg-gold group-hover:text-white transition duration-300">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-serif text-xl sm:text-2xl text-ink font-semibold leading-tight group-hover:text-gold-dark transition">
                            {pooja.name}
                          </h3>
                          <div className="text-xs text-gold-dark font-medium mt-0.5">
                            {pooja.hindiName}
                          </div>
                        </div>
                      </div>

                      {/* Benefit Description */}
                      <p className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-3 mt-3">
                        {pooja.benefit}
                      </p>

                      {/* Key Ritual Bullets */}
                      <div className="mt-5 pt-4 border-t border-beige-100 space-y-2">
                        <div className="text-[11px] uppercase tracking-wider text-ink font-semibold flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-gold" /> Vidhi
                          Inclusions:
                        </div>
                        <ul className="space-y-1.5 text-xs text-ink/80">
                          <li className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                            <span>Personal Sankalp on Name &amp; Gotra</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                            <span>11,000+ Beej Mantra Jaap &amp; Havan</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                            <span>
                              WhatsApp Video Proof &amp; Prasad Delivery
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Pricing & CTAs */}
                    <div className="mt-6 pt-5 border-t border-beige-100">
                      <div className="flex items-baseline justify-between mb-4">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-ink-muted block">
                            Pooja Dakshina
                          </span>
                          <span className="font-serif text-2xl font-bold text-gold-dark">
                            ₹{pooja.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-medium">
                          All-Inclusive Vidhi
                        </span>
                      </div>

                      {/* Main Action Buttons */}
                      <div className="space-y-2">
                        <Button
                          onClick={() =>
                            openBooking({ type: "pooja", service: pooja.name })
                          }
                          className="w-full bg-gold hover:bg-gold-dark text-white rounded-xl h-11 text-xs font-semibold shadow-gold transition cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Calendar className="w-4 h-4" /> BOOK NOW
                        </Button>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedPoojaForModal(pooja)}
                            className="w-full h-9 rounded-xl border border-beige-200 hover:border-gold/50 bg-[#FAF8F3] hover:bg-white text-ink text-[11px] font-medium transition cursor-pointer flex items-center justify-center gap-1"
                          >
                            <Info className="w-3.5 h-3.5 text-gold-dark" />{" "}
                            Vidhi Brief
                          </button>

                          <a
                            href={waLink(
                              `Namaste Shilpa ji, I would like to enquire about ${pooja.name} (${pooja.hindiName}). Please share the upcoming shubh muhurat details.`,
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full h-9 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-medium transition cursor-pointer flex items-center justify-center gap-1"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />{" "}
                            WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* COMPLETE POOJA BRIEF MODAL (High-End Light Dialog)        */}
        {/* ========================================================= */}
        <AnimatePresence>
          {selectedPoojaForModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/40 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-9 shadow-2xl border border-beige-200 my-8 max-h-[90vh] overflow-y-auto"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedPoojaForModal(null)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-beige-100 hover:bg-beige-200 text-ink flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Header */}
                <div className="flex items-start gap-4 pr-10">
                  <div className="w-14 h-14 rounded-2xl bg-gold/15 flex items-center justify-center text-gold-dark shrink-0">
                    {React.createElement(
                      ICON_MAP[selectedPoojaForModal.icon] || Flame,
                      { className: "w-7 h-7" },
                    )}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gold/10 text-gold-dark border border-gold/20">
                        {selectedPoojaForModal.categoryLabel}
                      </span>
                      <span className="text-xs text-ink-muted flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gold" />{" "}
                        {selectedPoojaForModal.duration}
                      </span>
                      <span className="text-xs text-ink-muted flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-gold" />{" "}
                        {selectedPoojaForModal.pandits}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-ink font-semibold">
                      {selectedPoojaForModal.name}
                    </h3>
                    <div className="text-xs text-gold-dark font-medium mt-0.5">
                      {selectedPoojaForModal.hindiName}
                    </div>
                  </div>
                </div>

                <div className="gold-divider w-full my-5" />

                {/* Modal Body */}
                <div className="space-y-5 text-ink">
                  {/* Why Perform */}
                  <div>
                    <h4 className="font-serif text-lg text-ink font-semibold flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-gold" />
                      Why Should You Perform This Pooja?
                    </h4>
                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                      {selectedPoojaForModal.whyPerform}
                    </p>

                    <div className="mt-3 p-3 rounded-xl bg-[#FAF8F3] border border-gold/20 text-xs text-ink/80">
                      <strong className="text-gold-dark">Ideal For: </strong>
                      {selectedPoojaForModal.idealFor}
                    </div>
                  </div>

                  {/* What Happens in the Vidhi */}
                  <div>
                    <h4 className="font-serif text-lg text-ink font-semibold flex items-center gap-2 mb-2">
                      <Flame className="w-4 h-4 text-orange-500" />
                      Exactly What Happens in the Vidhi?
                    </h4>
                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mb-3">
                      {selectedPoojaForModal.whatHappens}
                    </p>

                    <div className="text-[11px] uppercase tracking-wider text-ink font-semibold mb-2">
                      Step-by-Step Ritual Sequence:
                    </div>
                    <ul className="space-y-1.5 text-xs text-ink/85">
                      {selectedPoojaForModal.vidhiSteps?.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverables */}
                  <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-beige-200">
                    <div className="text-xs uppercase tracking-wider text-gold-dark font-bold mb-2 flex items-center gap-1.5">
                      <Package className="w-4 h-4" /> What You Will Receive:
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2 text-xs text-ink/80">
                      {selectedPoojaForModal.keyInclusions?.map((inc, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-2 rounded-lg bg-white border border-beige-100"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="mt-6 pt-5 border-t border-beige-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-ink-muted">
                      Pooja Dakshina
                    </div>
                    <div className="font-serif text-2xl font-bold text-gold-dark">
                      ₹{selectedPoojaForModal.price.toLocaleString("en-IN")}
                      <span className="text-xs font-sans text-ink-muted font-normal ml-1">
                        (All-Inclusive)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <Button
                      onClick={() => {
                        const sName = selectedPoojaForModal.name;
                        setSelectedPoojaForModal(null);
                        openBooking({ type: "pooja", service: sName });
                      }}
                      className="flex-1 sm:flex-none bg-gold hover:bg-gold-dark text-white rounded-full px-7 h-11 text-xs font-semibold shadow-gold cursor-pointer"
                    >
                      Book This Pooja (₹5,000)
                    </Button>

                    <a
                      href={waLink(
                        `Namaste Shilpa ji, I am interested in booking ${selectedPoojaForModal.name} (${selectedPoojaForModal.hindiName}). Please let me know the upcoming shubh muhurat.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-11 px-4 rounded-full border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" /> Ask
                      on WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ========================================================= */}
        {/* FAQS SECTION (Clean Light Cards)                          */}
        {/* ========================================================= */}
        <section className="py-20 bg-white border-t border-beige-100">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <div className="section-label justify-center">
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-ink mt-3">
                Common Questions About{" "}
                <span className="gold-text italic">Online Pooja</span>
              </h2>
              <div className="gold-divider w-20 mx-auto my-4" />
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "Kya mera physical presence hona zaroori hai?",
                  a: "Nahi, Vedic shastron me 'Pratinidhi Sankalp' ka vidhan hai. Devotee ke Naam aur Gotra par jo Sankalp liya jata hai, uska pura aashirvad aur fal usi vyakti ko prapt hota hai chahe wo duniya me kisi bhi kone me ho.",
                },
                {
                  q: "Mujhe kaise pata chalega ki meri pooja sampann hui?",
                  a: "Aapki pooja shuru hone par Pandit ji dwara aapka Naam aur Gotra bolte hue personal Sankalp ka video recording aur Havan ki clear photos WhatsApp par same day share ki jati hain.",
                },
                {
                  q: "Prasad mere ghar kab tak pahuchega?",
                  a: "Pooja sampann hone ke baad sanctified Prasad (dry fruits, mishri), energized Raksha Sutra (suraksha dhaga) aur blessed Yantra ko speed post/courier se pack karke bhej diya jata hai, jo 3 se 5 dino me deliver ho jata hai.",
                },
                {
                  q: "Mujhe pooja ke samay kya karna hoga?",
                  a: "Pooja timing par aap apne ghar ya office me rehte hue mann hi mann 'Om Namah Shivaya' ya sambandhit devta ka dhyan kar sakte hain. Koi kathin niyam ya upwas anivarya nahi hai.",
                },
                {
                  q: "Kya main apne parivar ke sadasya ke liye pooja book kar sakta hu?",
                  a: "Haan, aap apne mata-pita, baccho, jeevansathi ya business partner ke Naam aur Gotra par bhi pooja book kar sakte hain.",
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F3] border border-beige-200/80"
                >
                  <h3 className="font-serif text-base sm:text-lg text-ink font-semibold flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gold/15 text-gold-dark text-xs flex items-center justify-center font-bold shrink-0">
                      Q
                    </span>
                    {faq.q}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed pl-8">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* BOTTOM RECOMMENDATION BANNER                              */}
        {/* ========================================================= */}
        <section className="py-16 bg-[#FAFAFA] border-t border-beige-100">
          <div className="max-w-4xl mx-auto px-6">
            <div
              className="rounded-3xl p-8 sm:p-12 text-center border border-gold/30 shadow-soft"
              style={{
                background:
                  "linear-gradient(135deg, #FAF8F3 0%, #FFFFFF 60%, #F9F6EE 100%)",
              }}
            >
              <div className="inline-flex items-center gap-2 text-gold-dark text-xs font-semibold tracking-wider uppercase mb-3">
                <Sparkles className="w-4 h-4 text-gold" /> Need Guidance on
                Choosing the Right Pooja?
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-ink">
                Connect Directly with{" "}
                <span className="gold-text italic">Shilpa ji</span> on WhatsApp
              </h2>

              <div className="gold-divider w-20 mx-auto my-4" />

              <p className="text-ink-muted text-sm max-w-xl mx-auto leading-relaxed">
                Share your birth chart details or life concern to receive an
                authentic recommendation on which Vedic pooja will provide the
                fastest resolution.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href={waLink(
                    "Namaste Shilpa ji, I am viewing your Online Pooja page and need guidance on which pooja is best for my situation.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:bg-[#20bd5a] shadow-md transition cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-current" /> Free Pooja
                  Recommendation on WhatsApp
                </a>

                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-beige-200 text-ink hover:bg-gold/5 font-medium text-sm transition cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-gold-dark" /> Call:{" "}
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
