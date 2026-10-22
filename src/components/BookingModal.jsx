import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Flame,
  MessageCircle,
  X,
  Copy,
  Check,
  Loader2,
  IndianRupee,
  Package,
} from "lucide-react";
import { toast } from "sonner";
import {
  CONTACT,
  BOOKING_CONFIG,
  ONLINE_POOJAS,
  CONSULTATION_TOPICS,
  TIME_SLOTS,
  formatBookingWhatsAppMessage,
  waLink,
} from "../data";
import { generateBookingId } from "../lib/razorpay";
import UpiPaymentBox from "./UpiPaymentBox";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

// Generate next 14 available dates starting tomorrow or today
const getAvailableDates = () => {
  const dates = [];
  const today = new Date();
  // Start from tomorrow if current hour is past 6 PM, else from today
  const startOffset = today.getHours() >= 18 ? 1 : 0;

  for (let i = startOffset; i < startOffset + 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    const dayName = d.toLocaleDateString("en-IN", { weekday: "short" });
    const dayNum = d.getDate();
    const monthName = d.toLocaleDateString("en-IN", { month: "short" });
    const isoDate = d.toISOString().split("T")[0];
    const fullFormatted = d.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    dates.push({
      isoDate,
      dayName,
      dayNum,
      monthName,
      fullFormatted,
      isToday: i === 0,
    });
  }
  return dates;
};

export default function BookingModal({
  isOpen,
  onClose,
  initialType = "consultation",
  initialService = "",
}) {
  const availableDates = useMemo(() => getAvailableDates(), []);

  // Form state
  const [step, setStep] = useState(1); // 1: Slot, 2: Devotee & Address, 3: Review & Pay, 4: Success
  const [bookingType, setBookingType] = useState(initialType || "consultation");
  const [selectedPooja, setSelectedPooja] = useState(
    initialType === "pooja" && initialService
      ? initialService
      : ONLINE_POOJAS[0].name,
  );
  const [consultationTopic, setConsultationTopic] = useState(
    initialType === "consultation" && initialService
      ? initialService
      : CONSULTATION_TOPICS[0],
  );
  const [selectedDate, setSelectedDate] = useState(
    availableDates[0]?.isoDate || "",
  );
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0]?.label || "");

  // Personal details
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    dob: "",
    birthTime: "",
    birthPlace: "",
    gotra: "",
    address: "",
    landmark: "",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "",
    notes: "",
  });

  // Payment & Confirmation state
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [completedBooking, setCompletedBooking] = useState(null);
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [hasAutoRedirected, setHasAutoRedirected] = useState(false);

  // Sync initial props when opened
  useEffect(() => {
    if (isOpen) {
      setBookingType(initialType || "consultation");
      if (initialType === "pooja" && initialService) {
        setSelectedPooja(initialService);
      } else if (initialType === "consultation" && initialService) {
        setConsultationTopic(initialService);
      }
      setStep(1);
      setCountdown(5);
      setHasAutoRedirected(false);
    }
  }, [isOpen, initialType, initialService]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const currentConfig =
    BOOKING_CONFIG[bookingType] || BOOKING_CONFIG.consultation;
  const currentPrice = currentConfig.price;
  const currentServiceName =
    bookingType === "pooja"
      ? `Online Pooja: ${selectedPooja}`
      : `Audio Consultation: ${consultationTopic}`;

  const selectedDateObj = availableDates.find(
    (d) => d.isoDate === selectedDate,
  );
  const dateFormatted = selectedDateObj
    ? selectedDateObj.fullFormatted
    : selectedDate;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Step 1 Validation -> Go to Step 2
  const handleProceedToDetails = () => {
    if (!selectedDate) {
      toast.error("Please select a preferred date.");
      return;
    }
    if (!selectedSlot) {
      toast.error("Please select a time slot.");
      return;
    }
    setStep(2);
  };

  // Step 2 Validation -> Go to Step 3
  const handleProceedToReview = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your full name.");
      return;
    }
    const cleanPhone = formData.phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!formData.address.trim()) {
      toast.error(
        "Please enter your complete address for Prasad/Blessing delivery.",
      );
      return;
    }
    if (!formData.city.trim()) {
      toast.error("Please enter your city.");
      return;
    }
    if (!formData.pincode.trim() || formData.pincode.trim().length < 6) {
      toast.error("Please enter a valid 6-digit postal pincode.");
      return;
    }

    setStep(3);
  };

  // Finish Booking & Dispatch
  const finalizeBooking = ({
    paymentId = null,
    paymentStatus = "paid",
    utr = null,
    paymentMethod = "UPI",
    screenshot = null,
  }) => {
    const bookingId = generateBookingId(bookingType);
    const bookingRecord = {
      bookingId,
      type: bookingType,
      serviceName: currentServiceName,
      amount: currentPrice,
      paymentId: utr || paymentId || `UPI-${Date.now().toString().slice(-6)}`,
      paymentStatus,
      paymentMethod,
      utr,
      screenshot,
      date: selectedDate,
      dateFormatted,
      slot: selectedSlot,
      ...formData,
      createdAt: new Date().toISOString(),
    };

    setCompletedBooking(bookingRecord);
    setStep(4);
    setCountdown(5);
    setHasAutoRedirected(false);

    // Save to localStorage
    try {
      const existing = JSON.parse(
        localStorage.getItem("shilpa_astro_bookings") || "[]",
      );
      localStorage.setItem(
        "shilpa_astro_bookings",
        JSON.stringify([bookingRecord, ...existing.slice(0, 9)]),
      );
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }

    toast.success(
      "Payment confirmed! Redirecting to WhatsApp in 5 seconds...",
    );
  };

  // 5-Second Auto-Redirect Countdown to WhatsApp
  useEffect(() => {
    if (step !== 4 || !completedBooking || hasAutoRedirected) return;

    if (countdown <= 0) {
      setHasAutoRedirected(true);
      const msg = formatBookingWhatsAppMessage(completedBooking);
      const waUrl = waLink(msg);
      try {
        window.open(waUrl, "_blank", "noopener,noreferrer");
      } catch (e) {
        console.warn("Auto-opening WhatsApp window failed:", e);
      }
      toast.success("Opening WhatsApp with your booking details...");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [step, completedBooking, countdown, hasAutoRedirected]);

  // Copy WhatsApp Message to Clipboard
  const handleCopyMessage = () => {
    if (!completedBooking) return;
    const msg = formatBookingWhatsAppMessage(completedBooking);
    navigator.clipboard.writeText(msg);
    setCopied(true);
    toast.success("Booking details copied to clipboard!");
    setTimeout(() => setCopied(false), 3000);
  };

  // Open WhatsApp Link
  const handleOpenWhatsApp = () => {
    if (!completedBooking) return;
    setHasAutoRedirected(true);
    const msg = formatBookingWhatsAppMessage(completedBooking);
    const url = waLink(msg);
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp with your booking details...");
  };
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm transition-all"
    >
      <div
        className="fixed inset-0"
        onClick={step === 4 ? onClose : undefined}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-beige-200 overflow-hidden my-auto z-10 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#221c17] via-[#2f2720] to-[#1a1511] text-white px-6 py-5 border-b border-gold/30 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold">
                {bookingType === "pooja" ? (
                  <Flame className="w-5 h-5 text-gold" />
                ) : (
                  <Sparkles className="w-5 h-5 text-gold" />
                )}
              </div>
              <div>
                <h2
                  id="booking-modal-title"
                  className="font-serif text-xl sm:text-2xl text-white font-medium"
                >
                  {step === 4
                    ? "Booking Confirmed"
                    : "Book Astrological Service"}
                </h2>
                <p className="text-xs text-white/70">
                  {step === 4
                    ? "Your slot has been recorded. Share on WhatsApp."
                    : "Astrologer Shilpa Tibrewal · Vedic Astrologer Jaipur"}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Step indicator */}
          {step < 4 && (
            <div className="mt-4 flex items-center justify-between text-xs text-white/70">
              <div className="flex items-center gap-2">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    step >= 1 ? "bg-gold text-white" : "bg-white/20 text-white"
                  }`}
                >
                  1
                </span>
                <span className={step === 1 ? "text-gold font-medium" : ""}>
                  Service &amp; Slot
                </span>
              </div>
              <div className="h-px bg-white/20 flex-1 mx-3" />
              <div className="flex items-center gap-2">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    step >= 2 ? "bg-gold text-white" : "bg-white/20 text-white"
                  }`}
                >
                  2
                </span>
                <span className={step === 2 ? "text-gold font-medium" : ""}>
                  Devotee &amp; Address
                </span>
              </div>
              <div className="h-px bg-white/20 flex-1 mx-3" />
              <div className="flex items-center gap-2">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    step >= 3 ? "bg-gold text-white" : "bg-white/20 text-white"
                  }`}
                >
                  3
                </span>
                <span className={step === 3 ? "text-gold font-medium" : ""}>
                  Review &amp; Pay
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 min-h-0">
          {/* STEP 1: SERVICE & SLOT SELECTION */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Type Switch Tabs */}
              <div>
                <label className="text-xs uppercase tracking-widest font-semibold text-ink-muted block mb-2.5">
                  Select Booking Category
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {/* Consultation Card */}
                  <button
                    type="button"
                    onClick={() => setBookingType("consultation")}
                    className={`relative p-4 rounded-2xl border text-left transition-all duration-200 ${
                      bookingType === "consultation"
                        ? "border-gold bg-gold/5 shadow-gold ring-2 ring-gold/30"
                        : "border-beige-200 bg-white hover:border-gold/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gold/15 text-gold-dark">
                        10 Min Audio Call
                      </span>
                      {bookingType === "consultation" && (
                        <CheckCircle2 className="w-5 h-5 text-gold" />
                      )}
                    </div>
                    <div className="font-serif text-lg sm:text-xl text-ink font-semibold mt-2">
                      Audio Consultation
                    </div>
                    <div className="text-xs text-ink-muted mt-0.5">
                      1-on-1 direct phone call guidance
                    </div>
                    <div className="mt-3 font-semibold text-gold-dark text-lg">
                      ₹1,000{" "}
                      <span className="text-xs text-ink-muted font-normal">
                        / 10 mins
                      </span>
                    </div>
                  </button>

                  {/* Online Pooja Card */}
                  <button
                    type="button"
                    onClick={() => setBookingType("pooja")}
                    className={`relative p-4 rounded-2xl border text-left transition-all duration-200 ${
                      bookingType === "pooja"
                        ? "border-gold bg-gold/5 shadow-gold ring-2 ring-gold/30"
                        : "border-beige-200 bg-white hover:border-gold/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800">
                        <Flame className="w-3.5 h-3.5 text-orange-600" /> Vidhi
                        + Prasad Delivery
                      </span>
                      {bookingType === "pooja" && (
                        <CheckCircle2 className="w-5 h-5 text-gold" />
                      )}
                    </div>
                    <div className="font-serif text-lg sm:text-xl text-ink font-semibold mt-2">
                      Online Vedic Pooja
                    </div>
                    <div className="text-xs text-ink-muted mt-0.5">
                      With Personal Sankalp &amp; Prasad
                    </div>
                    <div className="mt-3 font-semibold text-gold-dark text-lg">
                      ₹5,000{" "}
                      <span className="text-xs text-ink-muted font-normal">
                        / Full Pooja
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Specific Selection based on Type */}
              {bookingType === "pooja" ? (
                <div>
                  <label className="text-xs uppercase tracking-widest font-semibold text-ink-muted block mb-2">
                    Choose Sacred Pooja *
                  </label>
                  <select
                    value={selectedPooja}
                    onChange={(e) => setSelectedPooja(e.target.value)}
                    className="w-full h-12 px-3.5 rounded-xl border border-beige-200 bg-white text-ink text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
                  >
                    {ONLINE_POOJAS.map((pooja) => (
                      <option key={pooja.id} value={pooja.name}>
                        {pooja.name} (₹{pooja.price.toLocaleString("en-IN")})
                      </option>
                    ))}
                  </select>
                  {/* Selected Pooja Benefit note */}
                  <p className="mt-2 text-xs text-ink-muted italic">
                    {ONLINE_POOJAS.find((p) => p.name === selectedPooja)
                      ?.benefit ||
                      "Performed by learned Vedic Pandits with authentic Vedic vidhi & Sankalp on your name."}
                  </p>
                </div>
              ) : (
                <div>
                  <label className="text-xs uppercase tracking-widest font-semibold text-ink-muted block mb-2">
                    Consultation Concern / Focus *
                  </label>
                  <select
                    value={consultationTopic}
                    onChange={(e) => setConsultationTopic(e.target.value)}
                    className="w-full h-12 px-3.5 rounded-xl border border-beige-200 bg-white text-ink text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
                  >
                    {CONSULTATION_TOPICS.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                  <p className="mt-2 text-xs text-ink-muted">
                    📞 Shilpa ji will directly call your mobile number for a
                    10-minute focused consultation.
                  </p>
                </div>
              )}

              {/* Date Selection */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs uppercase tracking-widest font-semibold text-ink-muted flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-gold" /> Select
                    Date *
                  </label>
                  <span className="text-xs text-gold-dark font-medium">
                    Next 14 Days
                  </span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {availableDates.map((item) => {
                    const isSelected = selectedDate === item.isoDate;
                    return (
                      <button
                        key={item.isoDate}
                        type="button"
                        onClick={() => setSelectedDate(item.isoDate)}
                        className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl border transition text-center ${
                          isSelected
                            ? "bg-gold text-white border-gold shadow-gold font-medium scale-[1.03]"
                            : "bg-beige-50/50 hover:bg-beige-100/60 border-beige-200 text-ink"
                        }`}
                      >
                        <span className="text-[10px] uppercase tracking-wider opacity-80">
                          {item.dayName}
                        </span>
                        <span className="text-lg font-serif font-bold leading-tight mt-0.5">
                          {item.dayNum}
                        </span>
                        <span className="text-[10px] opacity-75">
                          {item.monthName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slot Selection */}
              <div>
                <label className="text-xs uppercase tracking-widest font-semibold text-ink-muted flex items-center gap-1.5 mb-2.5">
                  <Clock className="w-3.5 h-3.5 text-gold" /> Select Preferred
                  Time Slot *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedSlot === slot.label;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setSelectedSlot(slot.label)}
                        className={`py-2.5 px-3 rounded-xl border text-xs text-center transition font-medium ${
                          isSelected
                            ? "bg-gold text-white border-gold shadow-gold"
                            : "bg-white hover:bg-beige-50 border-beige-200 text-ink"
                        }`}
                      >
                        <div>{slot.label}</div>
                        <span
                          className={`text-[10px] block mt-0.5 ${
                            isSelected ? "text-white/80" : "text-ink-muted"
                          }`}
                        >
                          {slot.period}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: DEVOTEE DETAILS & PRASAD DELIVERY ADDRESS */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="p-3.5 rounded-2xl bg-gold/10 border border-gold/30 text-ink text-xs flex items-center justify-between">
                <div>
                  <span className="font-semibold text-gold-dark">
                    {currentServiceName}
                  </span>
                  <div className="text-ink-muted mt-0.5">
                    {dateFormatted} · {selectedSlot}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-ink-muted">Amount</span>
                  <div className="font-bold text-gold-dark text-base">
                    ₹{currentPrice.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>

              {/* Devotee Info */}
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold text-ink mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-gold" /> 1. Devotee / Client
                  Details
                </h3>
                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs text-ink-muted block mb-1">
                      Full Name *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Ramesh Sharma"
                      className="h-11 rounded-xl border-beige-200 focus-visible:ring-gold"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-ink-muted block mb-1">
                      WhatsApp Mobile Number *
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 9876543210"
                      className="h-11 rounded-xl border-beige-200 focus-visible:ring-gold"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs text-ink-muted block mb-1">
                      Email Address (Optional)
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. ramesh@example.com"
                      className="h-11 rounded-xl border-beige-200 focus-visible:ring-gold"
                    />
                  </div>
                </div>
              </div>

              {/* Vedic Birth Details & Gotra */}
              <div className="pt-2 border-t border-beige-100">
                <h3 className="text-xs uppercase tracking-widest font-bold text-ink mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold" /> 2. Vedic Birth
                  Details (For Sankalp &amp; Kundli)
                </h3>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-ink-muted block mb-1">
                      Date of Birth
                    </label>
                    <Input
                      name="dob"
                      type="date"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="h-11 rounded-xl border-beige-200 focus-visible:ring-gold text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-ink-muted block mb-1">
                      Birth Time
                    </label>
                    <Input
                      name="birthTime"
                      type="time"
                      value={formData.birthTime}
                      onChange={handleInputChange}
                      className="h-11 rounded-xl border-beige-200 focus-visible:ring-gold text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-ink-muted block mb-1">
                      Birth Place / City
                    </label>
                    <Input
                      name="birthPlace"
                      value={formData.birthPlace}
                      onChange={handleInputChange}
                      placeholder="e.g. Jaipur"
                      className="h-11 rounded-xl border-beige-200 focus-visible:ring-gold text-xs"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="text-xs text-ink-muted block mb-1">
                      Gotra or Father's Name (Required for Pooja Sankalp)
                    </label>
                    <Input
                      name="gotra"
                      value={formData.gotra}
                      onChange={handleInputChange}
                      placeholder="e.g. Kashyap Gotra / S/o Shri Rajesh Sharma"
                      className="h-11 rounded-xl border-beige-200 focus-visible:ring-gold text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address for Prasad */}
              <div className="pt-2 border-t border-beige-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-ink flex items-center gap-2">
                    <Package className="w-4 h-4 text-gold" /> 3. Prasad &amp;
                    Blessings Delivery Address *
                  </h3>
                  <span className="text-[11px] text-orange-800 bg-orange-100 px-2 py-0.5 rounded-full font-medium">
                    Courier Delivery
                  </span>
                </div>

                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/70 mb-3 text-xs text-amber-900 leading-relaxed">
                  📦 <strong>Prasad Dispatch:</strong> Sanctified Prasad, Raksha
                  Sutra, and energized Yantra will be safely dispatched to this
                  address after pooja.
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-ink-muted block mb-1">
                      Flat / House No., Street, Building *
                    </label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="e.g. Flat 302, Manglam City, Tonk Road"
                      className="h-11 rounded-xl border-beige-200 focus-visible:ring-gold"
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs text-ink-muted block mb-1">
                        Landmark (Optional)
                      </label>
                      <Input
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleInputChange}
                        placeholder="Near Temple / Metro"
                        className="h-11 rounded-xl border-beige-200 focus-visible:ring-gold"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-ink-muted block mb-1">
                        City / Town *
                      </label>
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Jaipur"
                        className="h-11 rounded-xl border-beige-200 focus-visible:ring-gold"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-ink-muted block mb-1">
                        Pincode *
                      </label>
                      <Input
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="302029"
                        maxLength={6}
                        className="h-11 rounded-xl border-beige-200 focus-visible:ring-gold"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Note / Wish */}
              <div>
                <label className="text-xs text-ink-muted block mb-1">
                  Specific Prayer / Sankalp Wish or Questions (Optional)
                </label>
                <Textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="Share any specific wish, family member names for Sankalp, or question for Shilpa ji..."
                  className="rounded-xl border-beige-200 focus-visible:ring-gold resize-none text-xs"
                />
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW & PAYMENT (DIRECT UPI) */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-beige-200 p-5 bg-beige-50/50 space-y-4">
                <div className="flex items-start justify-between border-b border-beige-200 pb-3">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-gold-dark font-bold">
                      {bookingType === "pooja"
                        ? "Online Vedic Pooja"
                        : "Audio Consultation"}
                    </span>
                    <h3 className="font-serif text-xl text-ink font-semibold mt-0.5">
                      {currentServiceName}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-ink-muted">Total Payable</div>
                    <div className="font-serif text-2xl font-bold text-gold-dark">
                      ₹{currentPrice.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-ink-muted block uppercase tracking-wider text-[10px]">
                      Scheduled Date &amp; Time
                    </span>
                    <div className="font-medium text-ink mt-0.5 flex items-center gap-1.5">
                      <CalendarIcon className="w-3.5 h-3.5 text-gold" />
                      {dateFormatted}
                    </div>
                    <div className="font-medium text-ink mt-0.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                      {selectedSlot}
                    </div>
                  </div>

                  <div>
                    <span className="text-ink-muted block uppercase tracking-wider text-[10px]">
                      Devotee Details
                    </span>
                    <div className="font-medium text-ink mt-0.5">
                      {formData.name} ({formData.phone})
                    </div>
                    {formData.gotra && (
                      <div className="text-ink-muted mt-0.5">
                        Gotra: {formData.gotra}
                      </div>
                    )}
                  </div>

                  <div className="sm:col-span-2 pt-2 border-t border-beige-200/80">
                    <span className="text-ink-muted block uppercase tracking-wider text-[10px]">
                      Prasad &amp; Yantra Delivery Address
                    </span>
                    <div className="font-medium text-ink mt-0.5 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                      <span>
                        {formData.address}
                        {formData.landmark ? `, Near ${formData.landmark}` : ""}
                        , {formData.city}, {formData.state} - {formData.pincode}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* UPI Payment Box */}
              <UpiPaymentBox
                amount={currentPrice}
                orderId={generateBookingId(bookingType)}
                orderTitle={`${currentServiceName} (${selectedDate} ${selectedSlot})`}
                onPaymentConfirmed={finalizeBooking}
                isProcessing={isProcessingPayment}
              />
            </div>
          )}

          {/* STEP 4: SUCCESS & WHATSAPP DISPATCH */}
          {step === 4 && completedBooking && (
            <div className="text-center space-y-5 py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-soft">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="inline-block text-[11px] uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full font-bold mb-2">
                  ✅ Payment Done via UPI (
                  {completedBooking.utr
                    ? `UTR: ${completedBooking.utr}`
                    : `ID: #${completedBooking.bookingId}`}
                  )
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-ink font-semibold">
                  Booking Payment Submitted!
                </h3>
                <p className="mt-1.5 text-xs text-gold-dark font-bold uppercase tracking-wider">
                  Final Step: Confirm Slot with Shilpa ji on WhatsApp
                </p>
              </div>

              {/* 10-Second Countdown & WhatsApp Redirect Notice */}
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-center space-y-3 max-w-lg mx-auto shadow-xs">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 text-gold-dark font-extrabold flex items-center justify-center text-sm border-2 border-gold/40 shadow-xs animate-pulse shrink-0">
                    {countdown}s
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-amber-950 text-sm sm:text-base">
                      {countdown > 0
                        ? `Redirecting to WhatsApp in ${countdown} seconds...`
                        : "Opening WhatsApp now..."}
                    </div>
                    <div className="text-[11px] text-amber-800">
                      Redirecting to WhatsApp to send your slot & consultation details to Astrologer Shilpa
                    </div>
                  </div>
                </div>

                {/* Animated Progress Bar */}
                <div className="w-full bg-amber-200/60 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gold h-2 rounded-full transition-all duration-1000 ease-linear"
                    style={{
                      width: `${Math.max(0, Math.min(100, ((10 - countdown) / 5) * 100))}%`,
                    }}
                  />
                </div>

                <p className="text-xs text-amber-900 leading-relaxed">
                  Payment received successfully!{" "}
                  <strong>
                    {countdown > 0 ? `In ${countdown} seconds, ` : ""}your verified booking receipt will automatically open on WhatsApp
                  </strong>
                  , where you simply need to tap 'Send' so Shilpa ji can lock and confirm your slot on the schedule.
                </p>

                <p className="text-[11px] text-amber-800/90 font-medium">
                  (If you do not wish to wait, click the green button below to open immediately)
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-beige-50/70 border border-beige-200 rounded-2xl p-4 text-left text-xs space-y-2 max-w-lg mx-auto">
                <div className="flex justify-between border-b border-beige-200/80 pb-2">
                  <span className="text-ink-muted">Service:</span>
                  <span className="font-semibold text-ink">
                    {completedBooking.serviceName}
                  </span>
                </div>
                <div className="flex justify-between border-b border-beige-200/80 pb-2">
                  <span className="text-ink-muted">Total Paid:</span>
                  <span className="font-bold text-gold-dark">
                    ₹{completedBooking.amount?.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between border-b border-beige-200/80 pb-2">
                  <span className="text-ink-muted">UPI UTR Ref:</span>
                  <span className="font-mono font-bold text-emerald-700">
                    {completedBooking.utr}
                  </span>
                </div>
                <div className="flex justify-between border-b border-beige-200/80 pb-2">
                  <span className="text-ink-muted">Slot:</span>
                  <span className="font-semibold text-ink">
                    {completedBooking.dateFormatted} ({completedBooking.slot})
                  </span>
                </div>
                <div className="flex justify-between border-b border-beige-200/80 pb-2">
                  <span className="text-ink-muted">Devotee:</span>
                  <span className="font-semibold text-ink">
                    {completedBooking.name} ({completedBooking.phone})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Delivery Address:</span>
                  <span className="font-semibold text-ink text-right max-w-[65%]">
                    {completedBooking.address}, {completedBooking.city} -{" "}
                    {completedBooking.pincode}
                  </span>
                </div>
              </div>

              {/* Big WhatsApp CTA Button */}
              <div className="space-y-3 pt-2 max-w-md mx-auto">
                <Button
                  onClick={handleOpenWhatsApp}
                  size="lg"
                  className="w-full bg-[#25D366] hover:bg-[#1faa54] text-white rounded-full h-14 text-base font-semibold shadow-soft hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer animate-pulse"
                >
                  <MessageCircle className="w-5 h-5" />
                  {countdown > 0
                    ? `Send on WhatsApp Now (${countdown}s)`
                    : "Open WhatsApp & Confirm Slot Details"}
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleCopyMessage}
                    className="flex-1 rounded-full h-11 text-xs border-beige-200 text-ink hover:bg-beige-50 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-1 text-emerald-600" />{" "}
                        Copied to Clipboard
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" /> Copy Details
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={onClose}
                    className="rounded-full h-11 text-xs text-ink hover:bg-beige-100 cursor-pointer"
                  >
                    Already Sent / Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls (for steps 1-3) */}
        {step < 4 && (
          <div className="bg-beige-50/80 border-t border-beige-200/80 px-6 py-4 flex items-center justify-between shrink-0">
            {step > 1 ? (
              <Button
                variant="ghost"
                onClick={() => setStep((s) => s - 1)}
                className="rounded-full text-xs text-ink hover:bg-beige-200/50"
              >
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
              </Button>
            ) : (
              <div className="text-xs text-ink-muted">
                Price:{" "}
                <span className="font-bold text-gold-dark">
                  ₹{currentPrice.toLocaleString("en-IN")}
                </span>
              </div>
            )}

            {step === 1 && (
              <Button
                onClick={handleProceedToDetails}
                className="bg-gold hover:bg-gold-dark text-white rounded-full px-6 h-11 text-xs sm:text-sm font-medium shadow-gold"
              >
                Enter Details &amp; Address{" "}
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            )}

            {step === 2 && (
              <Button
                onClick={handleProceedToReview}
                className="bg-gold hover:bg-gold-dark text-white rounded-full px-6 h-11 text-xs sm:text-sm font-medium shadow-gold"
              >
                Proceed to Payment <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            )}

            {step === 3 && (
              <div className="text-xs text-ink-muted">
                Step 3 of 3 · Direct 0% Fee UPI Pay
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
