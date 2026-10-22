import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
    openCheckout,
  } = useCart();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isCartOpen) closeCart();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Drawer container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="px-6 py-5 bg-gradient-to-r from-[#221c17] via-[#2f2720] to-[#1a1511] text-white flex items-center justify-between border-b border-gold/30 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl font-medium text-white">Your Cart</h2>
                    <p className="text-xs text-white/70">
                      {cartCount} item{cartCount !== 1 ? "s" : ""} selected
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeCart}
                  aria-label="Close cart"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Banner */}
              <div className="bg-amber-50/80 px-6 py-2.5 border-b border-amber-200/60 flex items-center justify-between text-xs text-amber-900 shrink-0">
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gold" /> Free delivery across India on all orders
                </span>
                <span className="font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
                  FREE
                </span>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-beige-100 flex items-center justify-center text-gold mb-4">
                      <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                    </div>
                    <h3 className="font-serif text-2xl text-ink font-medium">Your cart is empty</h3>
                    <p className="text-xs text-ink-muted mt-2 max-w-xs leading-relaxed">
                      Explore our energized Vedic crystals, Dhan Yog, Pyrite, and spiritual bracelets.
                    </p>
                    <Link
                      to="/products"
                      onClick={closeCart}
                      className="mt-6 inline-flex items-center justify-center rounded-full bg-gold px-6 py-2.5 text-xs font-semibold text-white shadow-gold hover:bg-gold-dark transition"
                    >
                      Shop Spiritual Products
                    </Link>
                  </div>
                ) : (
                  cart.map(({ product, quantity }) => (
                    <div
                      key={product.slug}
                      className="flex gap-4 p-3.5 rounded-2xl border border-beige-200 bg-beige-50/40 hover:border-gold/40 transition"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 rounded-xl object-cover border border-beige-200 shrink-0"
                      />

                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-serif text-base font-semibold text-ink leading-tight truncate">
                              {product.name}
                            </h4>
                            <div className="text-xs text-gold-dark font-bold mt-1">
                              ₹{product.price.toLocaleString("en-IN")}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(product.slug)}
                            aria-label={`Remove ${product.name}`}
                            className="text-ink-muted hover:text-red-600 transition p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-beige-200/60">
                          {/* Quantity selector */}
                          <div className="flex items-center border border-beige-200 rounded-lg bg-white">
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.slug, quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-ink hover:bg-beige-100 transition"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-ink">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.slug, quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-ink hover:bg-beige-100 transition"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-xs font-bold text-ink">
                            ₹{(product.price * quantity).toLocaleString("en-IN")}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {cart.length > 0 && (
                <div className="p-6 bg-beige-50/90 border-t border-beige-200 shrink-0 space-y-4">
                  <div className="space-y-1.5 text-xs text-ink-muted">
                    <div className="flex justify-between">
                      <span>Subtotal ({cartCount} items):</span>
                      <span className="text-ink font-medium">₹{cartTotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span className="text-emerald-700 font-semibold">FREE</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-beige-200/80 text-sm font-bold text-ink">
                      <span>Total Payable:</span>
                      <span className="text-gold-dark text-base">₹{cartTotal.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <Button
                    onClick={openCheckout}
                    className="w-full bg-gold hover:bg-gold-dark text-white rounded-full h-13 text-sm font-semibold shadow-gold hover:shadow-gold-glow transition flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-5 h-5" /> Proceed to Checkout (₹{cartTotal.toLocaleString("en-IN")}) <ArrowRight className="w-4 h-4" />
                  </Button>

                  <div className="flex items-center justify-between text-[11px] text-ink-muted pt-1">
                    <button
                      type="button"
                      onClick={clearCart}
                      className="hover:text-red-600 transition underline underline-offset-2"
                    >
                      Clear Cart
                    </button>
                    <span>100% Direct &amp; Safe UPI Payment</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
