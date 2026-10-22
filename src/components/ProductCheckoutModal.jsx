import React, { useState, useEffect } from "react";
import {
  X,
  Package,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  IndianRupee,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  MapPin,
  Truck,
} from "lucide-react";
import { toast } from "sonner";
import { formatProductOrderWhatsAppMessage, waLink } from "../data";
import UpiPaymentBox from "./UpiPaymentBox";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function ProductCheckoutModal({ product, isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: Delivery Address, 2: Review & Pay, 3: Success
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    landmark: "",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "",
  });
  const [quantity, setQuantity] = useState(1);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [hasAutoRedirected, setHasAutoRedirected] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setQuantity(1);
      setCountdown(5);
      setHasAutoRedirected(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const totalAmount = product ? product.price * quantity : 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceedToPay = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your full name.");
      return;
    }
    const cleanPhone = formData.phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!formData.address.trim()) {
      toast.error("Please enter your delivery street address.");
      return;
    }
    if (!formData.city.trim()) {
      toast.error("Please enter your city.");
      return;
    }
    if (!formData.pincode.trim() || formData.pincode.trim().length < 6) {
      toast.error("Please enter a valid 6-digit postal pincode.");
      return;
    }

    setStep(2);
  };

  const finalizeOrder = ({
    paymentId = null,
    paymentStatus = "paid",
    utr = null,
    paymentMethod = "UPI",
    screenshot = null,
  }) => {
    const orderId = `PROD-${Date.now().toString().slice(-4)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const orderRecord = {
      orderId,
      productName: product.name,
      amount: totalAmount,
      quantity,
      paymentId: utr || paymentId || `UPI-${Date.now().toString().slice(-6)}`,
      paymentStatus,
      paymentMethod,
      utr,
      screenshot,
      ...formData,
      createdAt: new Date().toISOString(),
    };

    setCompletedOrder(orderRecord);
    setStep(3);
    setCountdown(5);
    setHasAutoRedirected(false);

    try {
      const existing = JSON.parse(
        localStorage.getItem("shilpa_astro_orders") || "[]",
      );
      localStorage.setItem(
        "shilpa_astro_orders",
        JSON.stringify([orderRecord, ...existing.slice(0, 9)]),
      );
    } catch (e) {
      console.warn("Could not save order", e);
    }

    toast.success(
      "Payment confirmed! Redirecting to WhatsApp in 5 seconds...",
    );
  };

  // 5-Second Auto-Redirect Countdown to WhatsApp
  useEffect(() => {
    if (step !== 3 || !completedOrder || hasAutoRedirected) return;

    if (countdown <= 0) {
      setHasAutoRedirected(true);
      const msg = formatProductOrderWhatsAppMessage(completedOrder);
      const waUrl = waLink(msg);
      try {
        window.open(waUrl, "_blank", "noopener,noreferrer");
      } catch (e) {
        console.warn("Auto-opening WhatsApp window failed:", e);
      }
      toast.success("Opening WhatsApp with your order details...");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [step, completedOrder, countdown, hasAutoRedirected]);

  const handleOpenWhatsApp = () => {
    if (!completedOrder) return;
    setHasAutoRedirected(true);
    const msg = formatProductOrderWhatsAppMessage(completedOrder);
    const url = waLink(msg);
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp with your order details...");
  };

  const handleCopyMessage = () => {
    if (!completedOrder) return;
    const msg = formatProductOrderWhatsAppMessage(completedOrder);
    navigator.clipboard.writeText(msg);
    setCopied(true);
    toast.success("Order details copied to clipboard!");
    setTimeout(() => setCopied(false), 3000);
  };

  if (!isOpen || !product) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-checkout-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm transition-all"
    >
      <div
        className="fixed inset-0"
        onClick={step === 3 ? onClose : undefined}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-beige-200 overflow-hidden my-auto z-10 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#221c17] via-[#2f2720] to-[#1a1511] text-white px-6 py-5 border-b border-gold/30 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold">
                <Package className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h2
                  id="product-checkout-title"
                  className="font-serif text-xl sm:text-2xl text-white font-medium"
                >
                  {step === 3 ? "Order Placed" : "Complete Your Order"}
                </h2>
                <p className="text-xs text-white/70">
                  {product.name} · Astrologer Shilpa
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 min-h-0">
          {/* Product Summary Header */}
          <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-beige-50/80 border border-beige-200">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 rounded-xl object-cover border border-beige-200"
            />
            <div className="flex-1">
              <h3 className="font-serif text-lg text-ink font-semibold leading-tight">
                {product.name}
              </h3>
              <div className="text-xs text-ink-muted mt-0.5">
                Energized &amp; Sanctified Spiritual Accessory
              </div>
              <div className="text-base font-bold text-gold-dark mt-1">
                ₹{product.price.toLocaleString("en-IN")}
              </div>
            </div>
            <div className="flex items-center gap-2 border border-beige-200 rounded-lg p-1 bg-white">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-6 h-6 rounded flex items-center justify-center text-ink hover:bg-beige-100 text-sm font-bold"
              >
                -
              </button>
              <span className="text-xs font-semibold px-1">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-6 h-6 rounded flex items-center justify-center text-ink hover:bg-beige-100 text-sm font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* STEP 1: DELIVERY ADDRESS */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-amber-900 bg-amber-50/70 border border-amber-200/80 p-3 rounded-xl">
                <Truck className="w-4 h-4 text-gold shrink-0" />
                <span>
                  Free doorstep courier delivery across India. Carefully packed
                  &amp; blessed.
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs text-ink-muted block mb-1">
                    Full Name *
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full name"
                    className="h-11 rounded-xl border-beige-200 focus-visible:ring-gold"
                  />
                </div>
                <div>
                  <label className="text-xs text-ink-muted block mb-1">
                    WhatsApp Mobile *
                  </label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit number"
                    className="h-11 rounded-xl border-beige-200 focus-visible:ring-gold"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-ink-muted block mb-1">
                    Email (Optional)
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@email.com"
                    className="h-11 rounded-xl border-beige-200 focus-visible:ring-gold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-ink-muted block mb-1">
                  Flat / House No., Street, Area *
                </label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Complete shipping address"
                  className="h-11 rounded-xl border-beige-200 focus-visible:ring-gold"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-ink-muted block mb-1">
                    Landmark
                  </label>
                  <Input
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    placeholder="Near temple / landmark"
                    className="h-11 rounded-xl border-beige-200 focus-visible:ring-gold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs text-ink-muted block mb-1">
                    City *
                  </label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="h-11 rounded-xl border-beige-200 focus-visible:ring-gold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs text-ink-muted block mb-1">
                    Pincode *
                  </label>
                  <Input
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="302029"
                    maxLength={6}
                    className="h-11 rounded-xl border-beige-200 focus-visible:ring-gold text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: REVIEW & PAY */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-beige-50/70 border border-beige-200 text-xs space-y-2">
                <div className="flex justify-between border-b border-beige-200/80 pb-2">
                  <span className="text-ink-muted">Deliver To:</span>
                  <span className="font-semibold text-ink">
                    {formData.name} ({formData.phone})
                  </span>
                </div>
                <div className="flex justify-between border-b border-beige-200/80 pb-2">
                  <span className="text-ink-muted">Shipping Address:</span>
                  <span className="font-medium text-ink text-right max-w-[65%]">
                    {formData.address},{" "}
                    {formData.landmark ? `${formData.landmark}, ` : ""}
                    {formData.city} - {formData.pincode}
                  </span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-semibold text-ink">
                  <span>
                    Total Payable ({quantity} item{quantity > 1 ? "s" : ""}):
                  </span>
                  <span className="text-gold-dark text-base font-bold">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <UpiPaymentBox
                amount={totalAmount}
                orderId={`PROD-${Date.now().toString().slice(-4)}`}
                orderTitle={`${product.name} (Qty: ${quantity})`}
                onPaymentConfirmed={finalizeOrder}
                isProcessing={isProcessingPayment}
              />
            </div>
          )}

          {/* STEP 3: SUCCESS & WHATSAPP CONFIRMATION */}
          {step === 3 && completedOrder && (
            <div className="text-center space-y-5 py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-soft">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="inline-block text-[11px] uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full font-bold mb-2">
                  ✅ Payment Done via UPI (
                  {completedOrder.utr
                    ? `UTR: ${completedOrder.utr}`
                    : `ID: #${completedOrder.orderId}`}
                  )
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-ink font-semibold">
                  Payment Submitted Successfully!
                </h3>
                <p className="mt-1.5 text-xs text-gold-dark font-bold uppercase tracking-wider">
                  Final Step: Send Order to Shilpa ji on WhatsApp
                </p>
              </div>

              {/* 10-Second Countdown & WhatsApp Redirect Notice */}
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-center space-y-3 max-w-lg mx-auto shadow-xs">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 text-gold-dark font-extrabold flex items-center justify-center text-sm border-2 border-gold/40 shadow-xs animate-pulse shrink-0">
                    {countdown}s
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-amber-950 text-sm sm:text-base">
                      {countdown > 0
                        ? `Redirecting to WhatsApp in ${countdown} seconds...`
                        : "Opening WhatsApp now..."}
                    </div>
                    <div className="text-[11px] text-amber-800">
                      Redirecting to WhatsApp to send your order details to Astrologer Shilpa
                    </div>
                  </div>
                </div>

                {/* Animated Progress Bar */}
                <div className="w-full bg-amber-200/60 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gold h-2 rounded-full transition-all duration-1000 ease-linear"
                    style={{
                      width: `${Math.max(0, Math.min(100, ((10 - countdown) / 5) * 100))}%`,
                    }}
                  />
                </div>

                <p className="text-xs text-amber-900 leading-relaxed">
                  Payment received successfully!{" "}
                  <strong>
                    {countdown > 0 ? `In ${countdown} seconds, ` : ""}your verified order receipt will automatically open on WhatsApp
                  </strong>
                  , where you simply need to tap 'Send' so Shilpa ji can prepare and dispatch your parcel.
                </p>

                <p className="text-[11px] text-amber-800/90 font-medium">
                  (If you do not wish to wait, click the green button below to open immediately)
                </p>
              </div>

              <div className="bg-beige-50/70 border border-beige-200 rounded-2xl p-4 text-left text-xs space-y-2 max-w-lg mx-auto">
                <div className="flex justify-between border-b border-beige-200/80 pb-2">
                  <span className="text-ink-muted">Item:</span>
                  <span className="font-semibold text-ink">
                    {completedOrder.productName} (Qty: {completedOrder.quantity}
                    )
                  </span>
                </div>
                <div className="flex justify-between border-b border-beige-200/80 pb-2">
                  <span className="text-ink-muted">Total Paid:</span>
                  <span className="font-bold text-gold-dark">
                    ₹{completedOrder.amount?.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between border-b border-beige-200/80 pb-2">
                  <span className="text-ink-muted">UPI UTR Ref:</span>
                  <span className="font-mono font-bold text-emerald-700">
                    {completedOrder.utr}
                  </span>
                </div>
                <div className="flex justify-between border-b border-beige-200/80 pb-2">
                  <span className="text-ink-muted">Customer:</span>
                  <span className="font-semibold text-ink">
                    {completedOrder.name} ({completedOrder.phone})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Delivery Address:</span>
                  <span className="font-semibold text-ink text-right max-w-[65%]">
                    {completedOrder.address}, {completedOrder.city} -{" "}
                    {completedOrder.pincode}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2 max-w-md mx-auto">
                <Button
                  onClick={handleOpenWhatsApp}
                  size="lg"
                  className="w-full bg-[#25D366] hover:bg-[#1faa54] text-white rounded-full h-14 text-base font-semibold shadow-soft hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer animate-pulse"
                >
                  <MessageCircle className="w-5 h-5" />
                  {countdown > 0
                    ? `Send on WhatsApp Now (${countdown}s)`
                    : "Open WhatsApp & Send Order Details"}
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleCopyMessage}
                    className="flex-1 rounded-full h-11 text-xs border-beige-200 text-ink hover:bg-beige-50 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-1 text-emerald-600" />{" "}
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" /> Copy Details
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={onClose}
                    className="rounded-full h-11 text-xs text-ink hover:bg-beige-100 cursor-pointer"
                  >
                    Already Sent / Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer controls for steps 1-2 */}
        {step < 3 && (
          <div className="bg-beige-50/80 border-t border-beige-200/80 px-6 py-4 flex items-center justify-between shrink-0">
            {step === 2 ? (
              <Button
                variant="ghost"
                onClick={() => setStep(1)}
                className="rounded-full text-xs text-ink hover:bg-beige-200/50"
              >
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
              </Button>
            ) : (
              <div className="text-xs text-ink-muted">
                Total:{" "}
                <span className="font-bold text-gold-dark">
                  ₹{totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
            )}

            {step === 1 && (
              <Button
                onClick={handleProceedToPay}
                className="bg-gold hover:bg-gold-dark text-white rounded-full px-6 h-11 text-xs sm:text-sm font-medium shadow-gold"
              >
                Proceed to Payment <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            )}

            {step === 2 && (
              <div className="text-xs text-ink-muted">
                Final Step · Direct 0% Fee UPI Pay
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
