import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import Consultation from "./components/Consultation";
import PoojaBanner from "./components/PoojaBanner";
import Testimonials from "./components/Testimonials";
import Process from "./components/Process";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Products from "./components/Products";
import ProductPage from "./components/ProductPage";
import ProductsPage from "./components/ProductsPage";
import BookingPage from "./components/BookingPage";
import BookingModal from "./components/BookingModal";
import CartDrawer from "./components/CartDrawer";
import CartCheckoutModal from "./components/CartCheckoutModal";
import { BookingProvider, useBooking } from "./context/BookingContext";
import { CartProvider } from "./context/CartContext";

const GlobalBookingModal = () => {
  const { isOpen, closeBooking, bookingOptions } = useBooking();
  return (
    <BookingModal
      isOpen={isOpen}
      onClose={closeBooking}
      initialType={bookingOptions.type}
      initialService={bookingOptions.service}
    />
  );
};

const Home = () => (
  <div className="bg-[#FAFAFA] text-ink min-h-screen">
    <Navbar />

    <main>
      <Hero />
      <About />
      <Services />
      <WhyUs />
      <Consultation />
      <Products />
      <PoojaBanner />
      <Testimonials />
      <Process />
      <FAQ />
      <Contact />
    </main>

    <Footer />
    <FloatingWhatsApp />
  </div>
);

function App() {
  return (
    <BookingProvider>
      <CartProvider>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/book" element={<BookingPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:slug" element={<ProductPage />} />
              <Route path="/product/:slug" element={<ProductPage />} />
            </Routes>
            <GlobalBookingModal />
            <CartDrawer />
            <CartCheckoutModal />
          </BrowserRouter>
          <Toaster position="top-center" richColors closeButton />
        </div>
      </CartProvider>
    </BookingProvider>
  );
}

export default App;
