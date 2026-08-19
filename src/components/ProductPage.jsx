import React, { useEffect } from "react";
import { ArrowLeft, Check, MessageCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { PRODUCTS, productWaLink } from "../data";

export default function ProductPage() {
  const { slug } = useParams();
  const product = PRODUCTS.find((item) => item.slug === slug);

  useEffect(() => {
    if (!product) return undefined;

    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content");
    document.title = `${product.name} | Astrologer Shilpa`;
    description?.setAttribute(
      "content",
      `${product.shortDescription} Ask about purchase and delivery on WhatsApp.`,
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

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-beige-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12 lg:px-16">
          <Link to="/" className="font-serif text-xl text-ink">
            Astrologer Shilpa
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink transition hover:text-gold-dark"
          >
            <ArrowLeft className="h-4 w-4" /> Back home
          </Link>
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
            <div className="text-2xl font-semibold text-gold-dark">
              ₹{product.price.toLocaleString("en-IN")}
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
            <a
              href={productWaLink(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-gold px-8 text-base font-medium text-white shadow-gold transition hover:bg-gold-dark hover:shadow-gold-glow sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" /> Ask purchase process on
              WhatsApp
            </a>
            <p className="mt-4 text-xs leading-relaxed text-ink-muted">
              For payment and other purchase details, please connect with us on WhatsApp. We’ll guide you through the process and confirm everything with you personally.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
