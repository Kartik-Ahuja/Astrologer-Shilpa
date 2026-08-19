import React from "react";
import { MessageCircle } from "lucide-react";
import { waLink } from "../data";

export default function FloatingWhatsApp() {
  return (
    <a
      href={waLink("Namaste Shilpa ji, I would like to book a consultation.")}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="floating-whatsapp"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5b] text-white flex items-center justify-center shadow-lg animate-pulse-soft transition hover:scale-110"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
