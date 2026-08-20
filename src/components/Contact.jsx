import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Instagram, Youtube, Send, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { CONTACT, SERVICES, waLink } from "../data";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const whatsappMessage = [
      "Namaste Shilpa ji, I would like to book a consultation.",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Service: ${form.service || "Not specified"}`,
      `Message: ${form.message}`,
    ].join("\n");

    window.open(waLink(whatsappMessage), "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp with your details...");
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-20 lg:py-32 bg-beige-50/40"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="section-label justify-center">
            <span>Contact</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.1] text-ink mt-5">
            Begin your journey to{" "}
            <span className="gold-text italic">clarity</span>.
          </h2>
          <div className="gold-divider w-24 mx-auto my-6" />
          <p className="text-ink-muted text-base sm:text-lg">
            Share your details below or reach out directly — we usually respond
            within a few hours.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-12 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={onSubmit}
              data-testid="contact-form"
              className="bg-white rounded-2xl p-7 md:p-9 border border-beige-100 shadow-soft"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs uppercase tracking-widest text-ink-muted">
                    Your Name *
                  </label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="Full name"
                    data-testid="contact-name"
                    className="mt-2 h-12 border-beige-200 focus-visible:ring-gold focus-visible:border-gold rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-ink-muted">
                    Phone *
                  </label>
                  <Input
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    placeholder="+91 ..."
                    data-testid="contact-phone"
                    className="mt-2 h-12 border-beige-200 focus-visible:ring-gold focus-visible:border-gold rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-ink-muted">
                    Email *
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="you@email.com"
                    data-testid="contact-email"
                    className="mt-2 h-12 border-beige-200 focus-visible:ring-gold focus-visible:border-gold rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-ink-muted">
                    Service
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={onChange}
                    data-testid="contact-service"
                    className="mt-2 h-12 w-full px-3 rounded-xl border border-beige-200 bg-white text-ink focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition"
                  >
                    <option value="">Select a service</option>
                    {SERVICES.map((s) => (
                      <option key={s.title} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <label className="text-xs uppercase tracking-widest text-ink-muted">
                  Your Question / Message *
                </label>
                <Textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={5}
                  placeholder="Share your birth details (DOB, time, place) or your concern..."
                  data-testid="contact-message"
                  className="mt-2 border-beige-200 focus-visible:ring-gold focus-visible:border-gold rounded-xl resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                data-testid="contact-submit"
                className="mt-6 bg-gold hover:bg-gold-dark text-white rounded-full h-13 px-8 shadow-gold hover:shadow-gold-glow transition w-full sm:w-auto"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" /> Send Message
                  </>
                )}
              </Button>
              <p className="text-xs text-ink-muted mt-4">
                Your details are kept strictly confidential.
              </p>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 space-y-5"
          >
            <div className="bg-white rounded-2xl p-7 border border-beige-100 shadow-soft">
              <h3 className="font-serif text-2xl text-ink">
                Reach Out Directly
              </h3>
              <div className="gold-divider w-16 my-4" />
              <a
                href={`tel:${CONTACT.phoneRaw}`}
                data-testid="contact-phone-link"
                className="flex items-start gap-4 p-3 rounded-xl hover:bg-beige-50 transition"
              >
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-gold-dark" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-ink-muted">
                    Call
                  </div>
                  <div className="font-medium text-ink">{CONTACT.phone}</div>
                </div>
              </a>
              <div className="flex items-start gap-4 p-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-gold-dark" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-ink-muted">
                    Visit
                  </div>
                  <div className="text-ink leading-snug text-sm mt-1">
                    {CONTACT.address}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="contact-instagram"
                  className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-full border border-beige-200 hover:border-gold hover:text-gold-dark transition"
                >
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
                <a
                  href={CONTACT.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="contact-youtube"
                  className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-full border border-beige-200 hover:border-gold hover:text-gold-dark transition"
                >
                  <Youtube className="w-4 h-4" /> YouTube
                </a>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-beige-100 shadow-soft bg-white">
              <iframe
                title="Astrologer Shilpa Location — Muhana, Jaipur"
                src="https://www.google.com/maps?q=B%20Block%20302%2C%20Manglam%20Garden%20City%2C%20Near%20Manglam%20Tarang%2C%20Muhana%2C%20Jaipur%2C%20Rajasthan%20302029&output=embed"
                className="w-full h-72"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                data-testid="contact-map"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
