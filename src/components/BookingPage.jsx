import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import BookingModal from "./BookingModal";
import { Sparkles, Flame, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import { BOOKING_CONFIG, ONLINE_POOJAS } from "../data";

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get("type") || "consultation";
  const serviceParam = searchParams.get("service") || "";

  // Dedicated booking state on this page
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    document.title = "Book Consultation & Online Pooja | Astrologer Shilpa";
  }, []);

  return (
    <div className="min-h-screen bg-beige-50 text-ink flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full">
        {/* Page Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="section-label justify-center">
            <span>Online Slot Booking &amp; Sankalp</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-ink mt-4">
            Book Consultation &amp; <span className="gold-text italic">Online Pooja</span>
          </h1>
          <div className="gold-divider w-24 mx-auto my-5" />
          <p className="text-ink-muted text-base leading-relaxed">
            Select your preferred date &amp; time slot, enter devotee details with Prasad delivery address, and complete direct payment via UPI (GPay/PhonePe/Paytm).
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gold hover:bg-gold-dark text-white rounded-full h-12 px-8 font-medium shadow-gold transition"
            >
              Open Booking Window
            </button>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full border border-gold/60 px-6 h-12 text-sm font-medium text-ink hover:bg-gold/5"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
          {/* Audio Consultation Card */}
          <div className="bg-white rounded-3xl p-7 border border-beige-200 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center text-gold-dark">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-gold-dark font-bold">
                  {BOOKING_CONFIG.consultation.badge}
                </span>
                <h2 className="font-serif text-2xl text-ink">
                  {BOOKING_CONFIG.consultation.title}
                </h2>
              </div>
            </div>

            <div className="mt-4 font-serif text-3xl font-bold text-gold-dark">
              ₹1,000{" "}
              <span className="text-xs text-ink-muted font-normal font-sans">
                / 10 Min Call
              </span>
            </div>

            <p className="mt-3 text-sm text-ink-muted leading-relaxed">
              {BOOKING_CONFIG.consultation.description}
            </p>

            <ul className="mt-5 space-y-2 text-xs text-ink">
              {BOOKING_CONFIG.consultation.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-6 w-full bg-gold text-white rounded-full h-11 text-xs font-semibold hover:bg-gold-dark transition"
            >
              Book Audio Call Slot (₹1,000)
            </button>
          </div>

          {/* Online Pooja Card */}
          <div className="bg-white rounded-3xl p-7 border border-beige-200 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-orange-800 font-bold">
                  {BOOKING_CONFIG.pooja.badge}
                </span>
                <h2 className="font-serif text-2xl text-ink">
                  {BOOKING_CONFIG.pooja.title}
                </h2>
              </div>
            </div>

            <div className="mt-4 font-serif text-3xl font-bold text-gold-dark">
              ₹5,000{" "}
              <span className="text-xs text-ink-muted font-normal font-sans">
                / Full Vidhi &amp; Prasad Delivery
              </span>
            </div>

            <p className="mt-3 text-sm text-ink-muted leading-relaxed">
              {BOOKING_CONFIG.pooja.description}
            </p>

            <ul className="mt-5 space-y-2 text-xs text-ink">
              {BOOKING_CONFIG.pooja.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-6 w-full bg-[#1a1511] text-gold rounded-full h-11 text-xs font-semibold hover:bg-black transition border border-gold/40"
            >
              Book Sacred Pooja Slot (₹5,000)
            </button>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />

      {/* Render Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialType={typeParam}
        initialService={serviceParam}
      />
    </div>
  );
}
