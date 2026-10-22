import React, { useState } from "react";
import { ArrowUpRight, MessageCircle, ShieldCheck, ShoppingBag, Plus, Minus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { PRODUCTS, productPath, productWaLink } from "../data";
import { useCart } from "../context/CartContext";
import ProductCheckoutModal from "./ProductCheckoutModal";

export default function Products() {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";
  const visibleProducts = isHomePage ? PRODUCTS.slice(0, 3) : PRODUCTS;

  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const { addToCart, updateQuantity, getItemQuantity, openCart } = useCart();

  return (
    <section id="products" className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="section-label">
              <span>Shop With Guidance</span>
            </div>
            <h2 className="mt-5 font-serif text-4xl leading-[1.1] text-ink sm:text-5xl">
              Thoughtfully prepared products for{" "}
              <span className="gold-text italic">your everyday devotion.</span>
            </h2>
            <div className="gold-divider my-6 w-24" />
            <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
              Explore a curated selection of spiritually prepared products,
              thoughtfully chosen and prepared with guidance from experienced
              Pandits. Order online with instant 0% fee UPI checkout.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product) => {
            const quantityInCart = getItemQuantity(product.slug);

            return (
              <article
                key={product.slug}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-beige-100 bg-beige-50/40 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-gold"
              >
                <div className="relative block overflow-hidden">
                  <Link
                    to={productPath(product)}
                    className="block overflow-hidden"
                    aria-label={`View ${product.name}`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Link>

                  {quantityInCart > 0 && (
                    <div className="absolute top-3 right-3 bg-gold text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-soft flex items-center gap-1 z-10 backdrop-blur-xs">
                      <ShoppingBag className="w-3.5 h-3.5" /> {quantityInCart} in Cart
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-2xl leading-tight text-ink">
                      {product.name}
                    </h3>
                    <span className="shrink-0 text-lg font-semibold text-gold-dark">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                    {product.shortDescription}
                  </p>

                  <div className="mt-6 flex flex-col gap-2.5">
                    {quantityInCart > 0 ? (
                      <div className="space-y-2">
                        {/* Interactive Quantity Stepper */}
                        <div className="flex items-center justify-between border-2 border-gold bg-gold/10 rounded-full px-2 h-11">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.slug, quantityInCart - 1)}
                            aria-label={`Decrease quantity of ${product.name}`}
                            className="w-8 h-8 rounded-full bg-white text-ink hover:bg-gold/20 flex items-center justify-center transition shadow-xs cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5 text-gold-dark" />
                          </button>

                          <span className="text-xs font-bold text-ink">
                            {quantityInCart} in Cart · ₹{(product.price * quantityInCart).toLocaleString("en-IN")}
                          </span>

                          <button
                            type="button"
                            onClick={() => updateQuantity(product.slug, quantityInCart + 1)}
                            aria-label={`Increase quantity of ${product.name}`}
                            className="w-8 h-8 rounded-full bg-gold text-white hover:bg-gold-dark flex items-center justify-center transition shadow-xs cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={openCart}
                            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-gold px-3 text-xs font-semibold text-white transition hover:bg-gold-dark shadow-gold cursor-pointer"
                          >
                            <ShoppingBag className="h-3.5 w-3.5" /> View Cart ({quantityInCart})
                          </button>
                          <button
                            type="button"
                            onClick={() => setCheckoutProduct(product)}
                            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-gold/60 bg-white px-3 text-xs font-semibold text-ink transition hover:bg-gold/10 cursor-pointer"
                          >
                            <ShieldCheck className="h-3.5 w-3.5 text-gold-dark" /> Buy Now
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            addToCart(product, 1);
                          }}
                          className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full border-2 border-gold/60 bg-white px-2.5 text-xs font-semibold text-ink transition hover:bg-gold/10 hover:border-gold cursor-pointer"
                        >
                          <ShoppingBag className="h-4 w-4 text-gold-dark" /> Add to Cart
                        </button>
                        <button
                          type="button"
                          onClick={() => setCheckoutProduct(product)}
                          className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-gold px-2.5 text-xs font-semibold text-white transition hover:bg-gold-dark shadow-gold cursor-pointer"
                        >
                          <ShieldCheck className="h-4 w-4" /> Buy Now
                        </button>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <a
                        href={productWaLink(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ask about ${product.name} on WhatsApp`}
                        className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-[#25D366] transition font-medium"
                      >
                        <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" /> Ask on WhatsApp
                      </a>

                      <Link
                        to={productPath(product)}
                        className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-gold-dark transition font-medium"
                      >
                        View details <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {isHomePage && (
          <div className="mt-10 flex justify-center">
            <Link
              to="/products"
              onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-gold/60 px-7 text-sm font-medium text-ink transition hover:border-gold hover:bg-gold/5 hover:text-gold-dark"
            >
              Shop More Products <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>

      <ProductCheckoutModal
        product={checkoutProduct}
        isOpen={Boolean(checkoutProduct)}
        onClose={() => setCheckoutProduct(null)}
      />
    </section>
  );
}
