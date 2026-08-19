import React from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { PRODUCTS, productPath, productWaLink } from "../data";

export default function Products() {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";
  const visibleProducts = isHomePage ? PRODUCTS.slice(0, 3) : PRODUCTS;

  return (
    <section id="products" className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="section-label">
              <span>Shop With Guidance</span>
            </div>
            <h2 className="mt-5 font-serif text-4xl leading-[1.1] text-ink sm:text-5xl">
              Thoughtfully prepared products for {" "}
              <span className="gold-text italic">your everyday devotion.</span>
            </h2>
            <div className="gold-divider my-6 w-24" />
            <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
              Explore a curated selection of spiritually prepared products,
              thoughtfully chosen and prepared with guidance from experienced
              Pandits.
            </p>
          </div>
          {/* <p className="max-w-xs text-sm leading-relaxed text-ink-muted md:text-right">
            No online checkout. Product availability, delivery and purchase are
            confirmed personally on WhatsApp.
          </p> */}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product) => (
            <article
              key={product.slug}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-beige-100 bg-beige-50/40 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-gold"
            >
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
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to={productPath(product)}
                    className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-gold/50 px-4 text-sm font-medium text-ink transition hover:border-gold hover:bg-gold/5"
                  >
                    View details <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={productWaLink(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ask about ${product.name} on WhatsApp`}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gold px-4 text-sm font-medium text-white transition hover:bg-gold-dark"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {isHomePage && (
          <div className="mt-10 flex justify-center">
            <Link
              to="/products"
              onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-gold/60 px-7 text-sm font-medium text-ink transition hover:border-gold hover:bg-gold/5 hover:text-gold-dark"
            >
              Shop More <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
