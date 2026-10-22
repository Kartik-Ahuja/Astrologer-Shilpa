import React, { useEffect, useState } from "react";
import { ArrowLeft, Check, MessageCircle, ShieldCheck, ShoppingBag, Plus, Minus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { PRODUCTS, productWaLink } from "../data";
import { useCart } from "../context/CartContext";
import ProductCheckoutModal from "./ProductCheckoutModal";

export default function ProductPage() {
  const { slug } = useParams();
  const product = PRODUCTS.find((item) => item.slug === slug);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, openCart, cartCount, getItemQuantity } = useCart();
  const quantityInCart = product ? getItemQuantity(product.slug) : 0;

  useEffect(() => {
    if (!product) return undefined;

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content");
    document.title = `${product.name} | Astrologer Shilpa`;
    description?.setAttribute(
      "content",
      `${product.shortDescription} Buy online with instant UPI payment and doorstep delivery across India.`
    );

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) {
        description.setAttribute("content", previousDescription);
      }
    };
  }, [product]);

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-beige-50 px-6 text-center">
        <div>
          <h1 className="font-serif text-4xl text-ink">Product not found</h1>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-full bg-gold px-6 py-3 font-medium text-white"
          >
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    openCart();
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-beige-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="font-serif text-xl text-ink">
            Astrologer Shilpa
          </Link>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/products"
              className="text-sm font-medium text-ink hover:text-gold-dark transition hidden sm:inline"
            >
              All Products
            </Link>

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

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink transition hover:text-gold-dark"
            >
              <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">Back home</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="min-h-screen bg-beige-50 px-6 pb-20 pt-32 md:px-12 lg:px-16">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="overflow-hidden rounded-3xl border border-beige-100 bg-white shadow-soft">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div>
            <div className="section-label">
              <span>Product Details</span>
            </div>
            <h1 className="mt-5 font-serif text-5xl leading-[1.05] text-ink sm:text-6xl">
              {product.name}
            </h1>
            <div className="gold-divider my-6 w-24" />
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-3xl font-serif font-bold text-gold-dark">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              <span className="text-xs font-sans text-emerald-700 bg-emerald-100 font-semibold px-2.5 py-1 rounded-full">
                In Stock · Free Delivery
              </span>
              {quantityInCart > 0 && (
                <span className="text-xs font-sans text-amber-800 bg-amber-100 font-semibold px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                  <ShoppingBag className="w-3.5 h-3.5 text-gold-dark" /> {quantityInCart} already in your Cart
                </span>
              )}
            </div>
            <p className="mt-6 text-base leading-relaxed text-ink-muted sm:text-lg">
              {product.description}
            </p>
            <ul className="mt-7 space-y-3">
              {product.details.map((detail) => (
                <li
                  key={detail}
                  className="flex items-start gap-3 text-sm text-ink"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{" "}
                  {detail}
                </li>
              ))}
            </ul>

            {/* Quantity Selector */}
            <div className="mt-8 flex items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Quantity:
              </span>
              <div className="flex items-center rounded-full border border-beige-200 bg-white shadow-xs">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-ink hover:text-gold transition rounded-l-full cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-sm text-ink">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-ink hover:text-gold transition rounded-r-full cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-sm font-semibold text-ink">
                = ₹{(product.price * quantity).toLocaleString("en-IN")}
              </span>
            </div>

            {/* Actions: Add to Cart & Buy Now */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border-2 border-gold/70 bg-white px-7 text-sm sm:text-base font-semibold text-ink transition hover:bg-gold/10 hover:border-gold cursor-pointer"
              >
                <ShoppingBag className="h-5 w-5 text-gold-dark" /> Add {quantity > 1 ? `${quantity} ` : ""}to Cart
              </button>

              {quantityInCart > 0 && (
                <button
                  type="button"
                  onClick={openCart}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gold/15 text-gold-dark border border-gold/50 px-6 text-sm sm:text-base font-semibold transition hover:bg-gold/25 cursor-pointer"
                >
                  <ShoppingBag className="h-5 w-5" /> View Cart ({quantityInCart})
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsCheckoutOpen(true)}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gold px-7 text-sm sm:text-base font-semibold text-white shadow-gold transition hover:bg-gold-dark hover:shadow-gold-glow cursor-pointer"
              >
                <ShieldCheck className="h-5 w-5" /> Buy Now · ₹{(product.price * quantity).toLocaleString("en-IN")}
              </button>
            </div>

            <div className="mt-3">
              <a
                href={productWaLink(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-gold/40 bg-white/60 px-5 text-xs font-medium text-ink transition hover:bg-gold/5"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366]" /> Ask questions about this product on WhatsApp
              </a>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-ink-muted">
              🔒 100% Direct &amp; Secure UPI Payment (GPay, PhonePe, Paytm, QR). Doorstep delivery across India.
            </p>
          </div>
        </div>
      </main>

      <ProductCheckoutModal
        product={product}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  );
}
