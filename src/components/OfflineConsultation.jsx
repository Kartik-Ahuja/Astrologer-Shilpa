import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  Navigation,
  Compass,
  Hand,
  ScanFace,
  BookOpen,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import { CONTACT, waLink, OFFLINE_SERVICES, OFFLINE_TIME_SLOTS } from "../data";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const DEFAULT_SERVICES = [
  "Janam Kundli Reading & Analysis",
  "Palm Reading (Hast Rekha Vigyan)",
  "Face Reading (Samudrik Shastra)",
  "Marriage & Kundli Matching",
  "Career, Job & Business Astrology",
  "Financial & Wealth Remedies",
  "Family & Relationship Guidance",
  "Vastu Consultation (Home / Office)",
  "Personalized Vedic Remedies & Gemstones",
];

const DEFAULT_TIME_SLOTS = [
  { id: "morning", label: "Morning Slot (10:00 AM – 01:00 PM)" },
  { id: "afternoon", label: "Afternoon Slot (01:00 PM – 04:00 PM)" },
  { id: "evening", label: "Evening Slot (04:00 PM – 07:00 PM)" },
];

export default function OfflineConsultation() {
  const servicesList = OFFLINE_SERVICES || DEFAULT_SERVICES;
  const timeSlotsList = OFFLINE_TIME_SLOTS || DEFAULT_TIME_SLOTS;

  // Get tomorrow's date as default min/value for date picker
  const getTomorrowIso = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };

  const getTodayIso = () => {
    return new Date().toISOString().split("T")[0];
  };

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    service: servicesList[0] || "Janam Kundli Reading & Analysis",
    preferredDate: getTomorrowIso(),
    timeSlot: timeSlotsList[0]?.label || "Morning Slot (10:00 AM – 01:00 PM)",
    attendees: "1 Person",
    dob: "",
    birthTime: "",
    birthPlace: "",
    notes: "",
  });

  const [showBirthDetails, setShowBirthDetails] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const buildWhatsAppMessage = (data) => {
    const formattedDate = data.preferredDate
      ? new Date(data.preferredDate + "T00:00:00").toLocaleDateString("en-IN", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "Flexible / Soonest Available";

    const lines = [
      "🕉️ *OFFLINE / IN-PERSON CONSULTATION REQUEST* 🕉️",
      "Astrologer Shilpa - Jaipur Center",
      "",
      "Namaste Shilpa ji, I would like to book an in-person / offline consultation at your Jaipur center.",
      "",
      "📅 *PREFERRED APPOINTMENT:*",
      `• Date: ${formattedDate}`,
      `• Time Slot: ${data.timeSlot}`,
      `• Service: ${data.service}`,
      `• Attendees: ${data.attendees}`,
      "",
      "👤 *VISITOR DETAILS:*",
      `• Name: ${data.name.trim()}`,
      `• Phone: ${data.phone.trim()}`,
      data.email.trim() ? `• Email: ${data.email.trim()}` : null,
      `• Visiting From / City: ${data.city.trim() || "Jaipur"}`,
      "",
      (data.dob || data.birthTime || data.birthPlace)
        ? "🔮 *BIRTH DETAILS (FOR CHART PREPARATION):*"
        : null,
      data.dob ? `• Date of Birth: ${data.dob}` : null,
      data.birthTime ? `• Time of Birth: ${data.birthTime}` : null,
      data.birthPlace ? `• Place of Birth: ${data.birthPlace}` : null,
      (data.dob || data.birthTime || data.birthPlace) ? "" : null,
      data.notes.trim()
        ? `💬 *Specific Concern / Question:*\n"${data.notes.trim()}"\n`
        : null,
      "📍 *Center Location:*",
      "B Block 302, Manglam Garden City, Near Manglam Tarang, Muhana, Jaipur, Rajasthan 302029",
      "",
      "Please confirm the appointment slot and visit instructions. Thank you!",
    ];

    return lines.filter((line) => line !== null).join("\n");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!form.name.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    const cleanPhone = form.phone.replace(/[^0-9]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!form.preferredDate) {
      toast.error("Please select a preferred appointment date.");
      return;
    }

    setIsSubmitting(true);

    const message = buildWhatsAppMessage(form);
    const targetUrl = waLink(message);

    // Save submitted data for visual confirmation card
    setSubmittedData({ ...form });

    toast.success("Redirecting to WhatsApp to send your appointment details...");

    // Open WhatsApp
    setTimeout(() => {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
      setIsSubmitting(false);
    }, 400);
  };

  const handleResetForm = () => {
    setSubmittedData(null);
    setForm({
      name: "",
      phone: "",
      email: "",
      city: "",
      service: servicesList[0] || "Janam Kundli Reading & Analysis",
      preferredDate: getTomorrowIso(),
      timeSlot: timeSlotsList[0]?.label || "Morning Slot (10:00 AM – 01:00 PM)",
      attendees: "1 Person",
      dob: "",
      birthTime: "",
      birthPlace: "",
      notes: "",
    });
    setShowBirthDetails(false);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "B Block 302, Manglam Garden City, Near Manglam Tarang, Muhana, Jaipur, Rajasthan 302029"
  )}`;

  return (
    <section
      id="offline-consultation"
      data-testid="offline-consultation-section"
      className="relative py-20 lg:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #FAF8F3 50%, #F5EFEB 100%)",
      }}
    >
      {/* Decorative background aura */}
      <div className="absolute inset-0 mandala-bg pointer-events-none opacity-40" aria-hidden />
      <div
        className="absolute top-1/4 -right-20 w-[450px] h-[450px] rounded-full bg-gold/5 blur-3xl pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-10 -left-20 w-[400px] h-[400px] rounded-full bg-beige-200/50 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="section-label justify-center">
            <span>Offline Consultation · In-Person Visit</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.1] text-ink mt-5">
            Meet Shilpa ji in Person for{" "}
            <span className="gold-text italic">Face-to-Face</span> Guidance.
          </h2>
          <div className="gold-divider w-24 mx-auto my-6" />

          {/* Location badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold/15 border border-gold/30 text-gold-dark font-medium text-xs sm:text-sm mb-4 shadow-soft">
            <MapPin className="w-4 h-4 text-gold-dark" />
            <span>Jaipur Center: <strong>Muhana, Jaipur, Rajasthan</strong> · Prior Appointment Required</span>
          </div>

          <p className="text-ink-muted text-base sm:text-lg leading-relaxed">
            Experience the depth of face-to-face Vedic astrology. Sit across Shilpa ji for live
            Hast Rekha (Palm Reading), Samudrik Shastra (Face Reading), comprehensive Kundli analysis,
            and energized remedial guidance in a private, tranquil setting.
          </p>
        </div>

        {/* 2-Column Grid: Left = Office Info & In-Person Highlights, Right = Inline Form */}
        <div className="mt-16 grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Center Location & Visiting Perks */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Center Address Card */}
            <div className="bg-white rounded-3xl p-7 md:p-8 border border-gold/30 shadow-soft relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gold/15 flex items-center justify-center text-gold-dark shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-gold-dark font-bold">
                    Consultation Center
                  </span>
                  <h3 className="font-serif text-2xl text-ink font-semibold">
                    Jaipur Chamber
                  </h3>
                </div>
              </div>

              <div className="space-y-3 text-sm text-ink/80 pt-2 border-t border-beige-100">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold mt-1 shrink-0" />
                  <p className="leading-relaxed">
                    <strong>B Block 302, Manglam Garden City</strong>,
                    <br />
                    Near Manglam Tarang, Near Muhana Gaav,
                    <br />
                    Muhana, Jaipur, Rajasthan 302029
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gold shrink-0" />
                  <p>
                    <strong>Visiting Hours:</strong> 10:00 AM – 07:00 PM (Mon – Sun)
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                  <p className="text-xs text-ink-muted">
                    Pre-booking is mandatory to ensure uninterrupted 1-on-1 private time.
                  </p>
                </div>
              </div>

              {/* Action Buttons: Google Maps & Call */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gold/10 hover:bg-gold/20 text-gold-dark font-medium text-xs border border-gold/30 transition shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-beige-100/70 hover:bg-beige-100 text-ink font-medium text-xs border border-beige-200 transition"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-dark" />
                  <span>Call: {CONTACT.phone}</span>
                </a>
              </div>
            </div>

            {/* Why In-Person Benefits */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-7 border border-beige-200 shadow-soft">
              <h4 className="font-serif text-xl text-ink font-semibold flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-gold" />
                Why Choose an Offline Visit?
              </h4>

              <ul className="space-y-3.5 text-xs sm:text-sm text-ink/80">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold-dark shrink-0 mt-0.5">
                    <Hand className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-ink font-medium">Physical Palm Reading (Hast Rekha):</strong>
                    <p className="text-ink-muted text-xs mt-0.5">
                      Direct examination of subtle hand lines, mounts, and symbols with magnifying optics.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold-dark shrink-0 mt-0.5">
                    <ScanFace className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-ink font-medium">Samudrik Shastra (Face Reading):</strong>
                    <p className="text-ink-muted text-xs mt-0.5">
                      Natural energy evaluation, forehead lines, and facial geometry for destiny predictions.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold-dark shrink-0 mt-0.5">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-ink font-medium">Detailed Family &amp; Couple Kundli Discussion:</strong>
                    <p className="text-ink-muted text-xs mt-0.5">
                      Bring family charts or partner horoscopes for unhurried in-depth clarity.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold-dark shrink-0 mt-0.5">
                    <Compass className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-ink font-medium">Authentic Remedies &amp; Gemstone Touch:</strong>
                    <p className="text-ink-muted text-xs mt-0.5">
                      Physically inspect certified gemstones, sacred rudrakshas, and energized yantras.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Column: Direct In-Section Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-9 border border-gold/30 shadow-soft relative">
              {/* Form Title & Subtitle */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-beige-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-gold-dark text-xs font-semibold tracking-wider uppercase mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-gold" /> Offline Appointment Form
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-ink font-semibold">
                    Book In-Person Consultation
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted mt-1">
                    Fill the form directly below — submitted details will open instantly on WhatsApp.
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium shrink-0 self-start">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  WhatsApp Direct Redirect
                </div>
              </div>

              {/* Success Confirmation Card if already submitted */}
              <AnimatePresence>
                {submittedData && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6 p-5 rounded-2xl bg-emerald-50/80 border border-emerald-300 text-emerald-950"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2 font-medium text-sm text-emerald-900">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>Appointment Request Generated!</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="text-xs text-emerald-700 hover:text-emerald-900 underline flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" /> New Request
                      </button>
                    </div>

                    <p className="text-xs text-emerald-800 mt-2 leading-relaxed">
                      Your details for <strong>{submittedData.name}</strong> on{" "}
                      <strong>{submittedData.preferredDate}</strong> ({submittedData.timeSlot}) have been formatted.
                      If WhatsApp did not open automatically, click below to send now.
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <a
                        href={waLink(buildWhatsAppMessage(submittedData))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20bd5a] shadow-sm transition"
                      >
                        <MessageCircle className="w-4 h-4" /> Open in WhatsApp
                      </a>
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-emerald-300 text-emerald-900 text-xs font-medium hover:bg-emerald-50 transition"
                      >
                        Edit Details
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* The Form */}
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                {/* Row 1: Name and Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ink font-semibold mb-1.5">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
                      <Input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        placeholder="e.g., Rajesh Sharma"
                        required
                        className="pl-10 h-11 bg-beige-50/50 border-beige-200 focus:border-gold focus:ring-gold rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ink font-semibold mb-1.5">
                      WhatsApp Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
                      <Input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={onChange}
                        placeholder="10-digit mobile number"
                        required
                        className="pl-10 h-11 bg-beige-50/50 border-beige-200 focus:border-gold focus:ring-gold rounded-xl text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Visiting City & Attendees */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ink font-semibold mb-1.5">
                      Visiting From / City <span className="text-ink-muted font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
                      <Input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={onChange}
                        placeholder="e.g., Jaipur / Delhi / Kota"
                        className="pl-10 h-11 bg-beige-50/50 border-beige-200 focus:border-gold focus:ring-gold rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ink font-semibold mb-1.5">
                      Number of Persons Visiting
                    </label>
                    <select
                      name="attendees"
                      value={form.attendees}
                      onChange={onChange}
                      className="w-full h-11 px-3.5 rounded-xl border border-beige-200 bg-beige-50/50 text-ink text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold cursor-pointer"
                    >
                      <option value="1 Person (Individual)">1 Person (Individual)</option>
                      <option value="2 Persons (Couple / Partners)">2 Persons (Couple / Partners)</option>
                      <option value="3-4 Persons (Family)">3-4 Persons (Family)</option>
                      <option value="5+ Persons (Large Family)">5+ Persons (Large Family)</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Consultation Service */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-ink font-semibold mb-1.5">
                    Select Consultation Service <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={onChange}
                    className="w-full h-11 px-3.5 rounded-xl border border-beige-200 bg-beige-50/50 text-ink text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold cursor-pointer"
                  >
                    {servicesList.map((service, idx) => (
                      <option key={idx} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Row 4: Preferred Date and Time Slot */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ink font-semibold mb-1.5">
                      Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Input
                        type="date"
                        name="preferredDate"
                        min={getTodayIso()}
                        value={form.preferredDate}
                        onChange={onChange}
                        required
                        className="h-11 bg-beige-50/50 border-beige-200 focus:border-gold focus:ring-gold rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ink font-semibold mb-1.5">
                      Preferred Time Slot
                    </label>
                    <select
                      name="timeSlot"
                      value={form.timeSlot}
                      onChange={onChange}
                      className="w-full h-11 px-3.5 rounded-xl border border-beige-200 bg-beige-50/50 text-ink text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold cursor-pointer"
                    >
                      {timeSlotsList.map((slot) => (
                        <option key={slot.id} value={slot.label}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Optional Collapsible: Birth Details for Prior Chart Preparation */}
                <div className="border border-beige-200 rounded-2xl p-4 bg-beige-50/30">
                  <button
                    type="button"
                    onClick={() => setShowBirthDetails((v) => !v)}
                    className="w-full flex items-center justify-between text-left text-xs font-semibold text-ink uppercase tracking-wider hover:text-gold-dark transition cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-gold" />
                      Add Birth Details (Optional — For Prior Kundli Preparation)
                    </span>
                    {showBirthDetails ? (
                      <ChevronUp className="w-4 h-4 text-ink-muted" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-ink-muted" />
                    )}
                  </button>

                  <AnimatePresence>
                    {showBirthDetails && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3.5 pt-3 border-t border-beige-200/80 space-y-3"
                      >
                        <p className="text-[11px] text-ink-muted leading-relaxed">
                          Providing your birth details allows Shilpa ji to compute your Janam Kundli and Dasha calculations in advance so your visit focuses on answers and remedies.
                        </p>

                        <div className="grid sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-ink-muted font-medium mb-1">
                              Date of Birth
                            </label>
                            <Input
                              type="date"
                              name="dob"
                              value={form.dob}
                              onChange={onChange}
                              className="h-9 bg-white border-beige-200 rounded-lg text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-ink-muted font-medium mb-1">
                              Time of Birth
                            </label>
                            <Input
                              type="time"
                              name="birthTime"
                              value={form.birthTime}
                              onChange={onChange}
                              className="h-9 bg-white border-beige-200 rounded-lg text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-ink-muted font-medium mb-1">
                              Birth Place (City, State)
                            </label>
                            <Input
                              type="text"
                              name="birthPlace"
                              value={form.birthPlace}
                              onChange={onChange}
                              placeholder="e.g. Jaipur, Rajasthan"
                              className="h-9 bg-white border-beige-200 rounded-lg text-xs"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Specific Question / Notes */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-ink font-semibold mb-1.5">
                    Your Specific Concern / Questions{" "}
                    <span className="text-ink-muted font-normal">(Optional)</span>
                  </label>
                  <Textarea
                    name="notes"
                    value={form.notes}
                    onChange={onChange}
                    rows={2}
                    placeholder="Briefly describe what you would like to discuss (e.g. marriage timing, career change, business partnership, health)..."
                    className="bg-beige-50/50 border-beige-200 focus:border-gold focus:ring-gold rounded-xl text-sm"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-2xl h-14 px-6 shadow-md hover:shadow-lg transition flex items-center justify-center gap-2.5 text-base cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>
                      {isSubmitting
                        ? "Opening WhatsApp..."
                        : "Send Offline Appointment Request on WhatsApp"}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>

                  <p className="text-[11px] text-ink-muted text-center mt-2.5 leading-relaxed">
                    ✨ Clicking redirects you directly to WhatsApp with pre-filled details. Shilpa ji or our appointment desk will confirm your scheduled slot.
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

