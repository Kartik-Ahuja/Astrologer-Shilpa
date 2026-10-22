import React from "react";
import Navbar from "./Navbar";
import Products from "./Products";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-beige-50 text-ink">
      <Navbar />
      <main className="pt-20">
        <Products />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
