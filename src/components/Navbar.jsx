import React, { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { CONTACT } from "../data";
import AstroLogo from "../Images/AstroLogo.webp";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Consultation", href: "#consultation" },
  { label: "Products", href: "/products" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleSectionClick = (event, href) => {
    if (!href.startsWith("#")) {
      setOpen(false);
      return;
    }

    event.preventDefault();
    setOpen(false);

    if (window.location.pathname !== "/") {
      window.location.assign(`/${href}`);
      return;
    }

    const section = document.getElementById(href.slice(1));
    if (!section) return;

    window.history.pushState(null, "", href);
    window.scrollTo({
      top: section.getBoundingClientRect().top + window.scrollY - 80,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-beige-100 shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 h-24 lg:h-20 flex items-center justify-between">
        <a
          href="#home"
          onClick={(event) => handleSectionClick(event, "#home")}
          data-testid="brand-link"
          className="flex items-center gap-3 group"
        >
          {/* <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center group-hover:bg-gold/20 transition">
            <span className="font-serif text-gold text-xl">श</span>
          </div> */}
          <div className="leading-tight">
            <div className="font-serif text-xl text-ink">
              <img
                src={AstroLogo}
                alt="Astrologer Shilpa"
                className="h-14 w-auto max-w-[220px] object-contain sm:h-16 sm:max-w-[235px] lg:h-14 lg:max-w-[215px]"
              />
            </div>
            {/* <div className="text-[10px] tracking-[0.25em] uppercase text-gold-dark">
              Vedic · Jaipur
            </div> */}
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV.map((n) => (
            <Link
              key={n.href}
              to={n.href.startsWith("#") ? `/${n.href}` : n.href}
              onClick={(event) => handleSectionClick(event, n.href)}
              data-testid={`nav-${n.label.toLowerCase()}`}
              className="text-sm font-medium text-ink/80 hover:text-gold-dark transition relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button
            asChild
            className="bg-gold hover:bg-gold-dark text-white rounded-full h-11 px-5 shadow-gold hover:shadow-gold-glow transition"
            data-testid="nav-call-btn"
          >
            <a href={`tel:${CONTACT.phoneRaw}`}>
              <Phone className="w-4 h-4 mr-2" /> {CONTACT.phone}
            </a>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-3 text-ink"
        >
          {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {open && (
        <div
          className="lg:hidden bg-white border-t border-beige-100 shadow-soft"
          data-testid="mobile-menu"
        >
          <nav className="flex flex-col px-6 py-4">
            {NAV.map((n) => (
              <Link
                key={n.href}
                to={n.href.startsWith("#") ? `/${n.href}` : n.href}
                onClick={(event) => handleSectionClick(event, n.href)}
                data-testid={`mnav-${n.label.toLowerCase()}`}
                className="py-3 text-ink hover:text-gold-dark border-b border-beige-100 last:border-0"
              >
                {n.label}
              </Link>
            ))}
            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="mt-4 inline-flex items-center justify-center gap-2 bg-gold text-white rounded-full py-3 font-medium"
            >
              <Phone className="w-4 h-4" /> {CONTACT.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
