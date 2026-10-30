import React, { useState, useEffect } from "react";
import { Menu, X, Phone, Calendar, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { CONTACT } from "../data";
import { useBooking } from "../context/BookingContext";
import { useCart } from "../context/CartContext";
import AstroLogo from "../Images/AstroLogo.webp";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Consultation", href: "#consultation" },
  { label: "Offline Visit", href: "#offline-consultation" },
  { label: "Online Pooja", href: "/online-pooja" },
  { label: "Products", href: "/products" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openBooking } = useBooking();
  const { cartCount, openCart } = useCart();

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
          ? "bg-white/90 backdrop-blur-md border-b border-beige-100 shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a
          href="#home"
          onClick={(event) => handleSectionClick(event, "#home")}
          data-testid="brand-link"
          className="flex items-center gap-3 group"
        >
          <div className="leading-tight">
            <div className="font-serif text-xl text-ink">
              <img
                src={AstroLogo}
                alt="Astrologer Shilpa"
                className="h-12 w-auto max-w-[200px] object-contain sm:h-14 sm:max-w-[225px] lg:h-14 lg:max-w-[215px]"
              />
            </div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
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
          <button
            type="button"
            onClick={openCart}
            aria-label={`Shopping Cart with ${cartCount} items`}
            className="relative p-2.5 rounded-full border border-gold/40 text-ink hover:bg-gold/10 hover:border-gold transition flex items-center justify-center cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 text-gold-dark" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-soft">
                {cartCount}
              </span>
            )}
          </button>

          <Button
            onClick={() => openBooking({ type: "consultation" })}
            className="bg-gold hover:bg-gold-dark text-white rounded-full h-11 px-5 shadow-gold hover:shadow-gold-glow transition flex items-center gap-1.5 text-xs font-semibold"
            data-testid="nav-book-btn"
          >
            <Calendar className="w-3.5 h-3.5" /> Book Slot
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-gold/50 text-ink hover:bg-gold/5 rounded-full h-11 px-4 text-xs font-medium"
            data-testid="nav-call-btn"
          >
            <a href={`tel:${CONTACT.phoneRaw}`}>
              <Phone className="w-3.5 h-3.5 mr-1.5 text-gold" /> {CONTACT.phone}
            </a>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={openCart}
            aria-label={`Shopping Cart with ${cartCount} items`}
            className="relative p-2 rounded-full border border-gold/40 text-ink hover:bg-gold/10 transition flex items-center justify-center cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 text-gold-dark" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            aria-label="Toggle menu"
            data-testid="nav-mobile-toggle"
            onClick={() => setOpen((v) => !v)}
            className="p-2 text-ink"
          >
            {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
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

            <div className="pt-4 flex flex-col gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  openCart();
                }}
                className="border-gold/60 text-ink rounded-full py-3 font-medium flex items-center justify-center gap-2 text-sm"
              >
                <ShoppingBag className="w-4 h-4 text-gold" /> View Cart ({cartCount} {cartCount === 1 ? "item" : "items"})
              </Button>

              <Button
                onClick={() => {
                  setOpen(false);
                  openBooking({ type: "consultation" });
                }}
                className="bg-gold text-white rounded-full py-3 font-medium flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" /> Book Slot (₹1,000 / ₹5,000)
              </Button>

              <a
                href={`tel:${CONTACT.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 border border-beige-200 text-ink rounded-full py-3 font-medium text-sm"
              >
                <Phone className="w-4 h-4 text-gold" /> {CONTACT.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
