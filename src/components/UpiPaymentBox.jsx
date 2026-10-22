import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  Copy,
  Check,
  Smartphone,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Upload,
  Image as ImageIcon,
  X,
  Monitor,
  Lock,
  Sparkles,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { UPI_CONFIG, buildUpiPaymentUri } from "../data";
import {
  UpiLogo,
  GPayLogo,
  PhonePeLogo,
  PaytmLogo,
  BhimLogo,
  AmazonPayLogo,
  CredLogo,
  WhatsAppPayLogo,
  UpiAppIconsRow,
  QrCenterUpiBadge,
} from "./UpiIcons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function UpiPaymentBox({
  amount,
  orderId,
  orderTitle,
  onPaymentConfirmed,
  isProcessing = false,
}) {
  const [copied, setCopied] = useState(false);
  const [utrNumber, setUtrNumber] = useState("");
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showUtrHelp, setShowUtrHelp] = useState(false);

  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  const upiUri = buildUpiPaymentUri({
    amount,
    note: orderTitle ? `${orderTitle} (${orderId})` : `Order ${orderId}`,
    orderId,
  });

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(UPI_CONFIG.upiId);
    setCopied(true);
    toast.success(`UPI ID copied: ${UPI_CONFIG.upiId}`);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenUpiApp = () => {
    if (!isMobile) {
      toast.info("On laptop/desktop, please scan the QR code using your mobile phone.");
      return;
    }
    try {
      window.location.href = upiUri;
      toast.info("Opening your UPI app (GPay / PhonePe / Paytm)...");
    } catch (e) {
      console.warn("Could not open UPI intent link", e);
      toast.error("Please scan the QR code or copy the UPI ID to pay.");
    }
  };

  const handleScreenshotChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file (PNG/JPG).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Screenshot size must be under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setScreenshotPreview(reader.result);
      toast.success("Payment screenshot attached successfully!");
    };
    reader.readAsDataURL(file);
  };

  const handleConfirmPayment = () => {
    const cleanUtr = utrNumber.trim();

    // Strict 12-digit numeric validation
    if (!cleanUtr) {
      toast.error("Please enter the 12-digit UTR / UPI Reference Number from your payment receipt.");
      return;
    }

    if (!/^\d{12}$/.test(cleanUtr)) {
      toast.error("Invalid UTR! UTR must be exactly 12 numeric digits (no letters or spaces).");
      return;
    }

    onPaymentConfirmed({
      paymentId: cleanUtr,
      paymentStatus: "paid",
      utr: cleanUtr,
      paymentMethod: "UPI",
      screenshot: screenshotPreview || null,
    });
  };

  return (
    <div className="rounded-3xl bg-white border-2 border-gold/40 shadow-soft overflow-hidden">
      {/* 1. Official Fintech Gateway Header */}
      <div className="bg-gradient-to-r from-[#1f1a14] via-[#2d251d] to-[#17130f] text-white p-4 sm:p-5 border-b border-gold/30">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Authentic White UPI Badge Container */}
            <div className="bg-white px-3 py-1.5 rounded-xl shadow-md flex items-center justify-center shrink-0 border border-gray-100">
              <UpiLogo className="h-6 w-auto" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-base sm:text-lg font-bold text-white tracking-wide">
                  Direct UPI Gateway
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-300 bg-emerald-950/90 border border-emerald-500/50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  0% Commission
                </span>
              </div>
              <div className="text-xs text-white/70 flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>Verified Merchant: Astrologer Shilpa</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-white/60 block uppercase tracking-wider font-medium">
              Amount to Pay
            </span>
            <div className="text-xl sm:text-2xl font-black text-gold tracking-tight">
              ₹{amount.toLocaleString("en-IN")}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* 2. PROMINENT ACCEPTED UPI APPS STRIP */}
        <div className="bg-gradient-to-r from-beige-50 via-white to-beige-50 border border-beige-200/90 rounded-2xl p-3.5 text-center shadow-xs">
          <div className="flex items-center justify-center gap-2 text-[11px] font-bold text-ink uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
            <span>Pay using ANY of your favorite UPI Apps</span>
            <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
          </div>
          <UpiAppIconsRow />
        </div>

        {/* 3. MOBILE 1-TAP APP LAUNCHERS (Displayed on Phones/Tablets) */}
        {isMobile && (
          <div className="space-y-3 p-4 rounded-2xl bg-gradient-to-b from-purple-50/70 to-white border border-purple-200/80">
            <div className="text-center">
              <span className="text-xs font-bold text-purple-950 block">
                ⚡ 1-Tap Fast Checkout via Installed App:
              </span>
              <span className="text-[11px] text-purple-800">
                Amount ₹{amount.toLocaleString("en-IN")} will be auto-filled
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              {/* Google Pay */}
              <button
                type="button"
                onClick={handleOpenUpiApp}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white border border-gray-300 hover:border-blue-500 shadow-xs hover:shadow-md transition cursor-pointer text-xs font-bold text-gray-800"
              >
                <GPayLogo className="h-5" />
              </button>

              {/* PhonePe */}
              <button
                type="button"
                onClick={handleOpenUpiApp}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#5f259f] hover:bg-[#4d1d82] text-white shadow-xs hover:shadow-md transition cursor-pointer text-xs font-bold"
              >
                <PhonePeLogo className="h-5" />
              </button>

              {/* Paytm */}
              <button
                type="button"
                onClick={handleOpenUpiApp}
                className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#f5f9ff] border border-[#00b9f5]/50 hover:border-[#00b9f5] shadow-xs hover:shadow-md transition cursor-pointer text-xs font-bold"
              >
                <PaytmLogo className="h-5" />
              </button>
            </div>

            <div className="text-center pt-1">
              <span className="text-[11px] text-ink-muted">
                or scan the official QR code below
              </span>
            </div>
          </div>
        )}

        {/* Desktop Notification Banner */}
        {!isMobile && (
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-amber-950 text-xs">
            <Monitor className="w-5 h-5 text-amber-800 shrink-0" />
            <span>
              <strong>Laptop / Computer detected:</strong> Open Google Pay, PhonePe, Paytm, or BHIM on your smartphone and scan the QR standee below to pay <strong>₹{amount.toLocaleString("en-IN")}</strong>.
            </span>
          </div>
        )}

        {/* 4. AUTHENTIC MERCHANT UPI QR STANDEE */}
        <div className="relative bg-gradient-to-b from-beige-50/80 via-white to-beige-50/60 border-2 border-gold/40 rounded-3xl p-5 sm:p-6 flex flex-col items-center text-center space-y-4 shadow-sm">
          {/* Standee Header */}
          <div className="flex items-center justify-between w-full max-w-sm px-2 border-b border-beige-200/90 pb-2.5">
            <div className="flex items-center gap-2 text-left">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold-dark">
                <QrCode className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-ink block leading-tight">
                  Astrologer Shilpa
                </span>
                <span className="text-[10px] text-emerald-800 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" />
                  Verified UPI Merchant
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-ink-muted block uppercase tracking-wider">
                Payable
              </span>
              <span className="text-sm font-black text-gold-dark">
                ₹{amount.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* QR Container with Scanner Frame Corners & Center UPI Badge */}
          <div className="relative p-2">
            {/* Scanner Corner Marks */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold-dark rounded-tl-md" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold-dark rounded-tr-md" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold-dark rounded-bl-md" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold-dark rounded-br-md" />

            {/* QR Card */}
            <div className="relative bg-white p-3.5 rounded-2xl border border-beige-200 shadow-md inline-block">
              <QRCodeSVG
                value={upiUri}
                size={195}
                level="H"
                includeMargin={false}
                className="rounded-xl"
              />
              {/* Official Center Emblem */}
              <QrCenterUpiBadge />
            </div>
          </div>

          {/* Under QR Apps Row */}
          <div className="space-y-1">
            <p className="text-xs font-semibold text-ink">
              Scan with <span className="text-gold-dark font-bold">Google Pay, PhonePe, Paytm</span> or any UPI app
            </p>
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-ink-muted">
              <span>Fast</span> · <span>Secure</span> · <span>0% Convenience Fee</span>
            </div>
          </div>

          {/* Payee UPI ID Pill with Copy */}
          <div className="w-full max-w-sm flex items-center justify-between gap-2 bg-white px-3.5 py-2.5 rounded-2xl border border-beige-200 text-xs shadow-xs">
            <div className="text-left truncate">
              <span className="text-[10px] text-ink-muted block uppercase tracking-wider font-semibold">
                Direct Payee UPI ID
              </span>
              <span className="font-mono font-bold text-ink text-sm select-all">
                {UPI_CONFIG.upiId}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyUpi}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gold/15 hover:bg-gold/25 text-gold-dark text-xs font-bold transition shrink-0 cursor-pointer shadow-xs active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy ID</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 5. MANDATORY 12-DIGIT UTR / REFERENCE NUMBER (ANTI-FRAUD) */}
        <div className="pt-2 border-t border-beige-200 space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-beige-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <label className="text-xs font-bold text-ink flex items-center gap-1.5">
                <span>Enter 12-Digit UPI Reference / UTR Number</span>
                <span className="text-red-500 font-bold">*</span>
              </label>

              <button
                type="button"
                onClick={() => setShowUtrHelp(!showUtrHelp)}
                className="text-[11px] text-gold-dark hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Where to find UTR?</span>
              </button>
            </div>

            {/* Helper Drawer for UTR location */}
            {showUtrHelp && (
              <div className="p-3 bg-amber-50/90 rounded-xl border border-amber-200/80 text-[11px] text-amber-950 space-y-1.5 transition-all">
                <div className="font-bold text-amber-900">
                  How to find the 12-digit number on your payment receipt:
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-amber-800">
                  <li><strong>Google Pay:</strong> Look for <em>"UPI transaction ID"</em> (12 digits)</li>
                  <li><strong>PhonePe:</strong> Look for <em>"UTR"</em> (12 digits)</li>
                  <li><strong>Paytm:</strong> Look for <em>"UPI Ref No."</em> (12 digits)</li>
                  <li><strong>BHIM / CRED / Others:</strong> Look for <em>"Reference ID"</em> or <em>"UTR"</em></li>
                </ul>
              </div>
            )}

            <div className="relative">
              <Input
                value={utrNumber}
                onChange={(e) =>
                  setUtrNumber(e.target.value.replace(/[^0-9]/g, "").slice(0, 12))
                }
                placeholder="e.g. 429182749102 (Enter 12 digits)"
                maxLength={12}
                className="h-12 rounded-xl border-beige-200 font-mono text-base tracking-wider focus-visible:ring-gold bg-beige-50/40 pr-24"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs">
                {utrNumber.length === 12 ? (
                  <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    12/12
                  </span>
                ) : (
                  <span className="text-amber-800 font-semibold bg-amber-100/70 px-2 py-0.5 rounded-md">
                    {utrNumber.length}/12
                  </span>
                )}
              </div>
            </div>

            <div className="text-[10px] text-ink-muted">
              Verification is required to safeguard against payment fraud and confirm dispatch.
            </div>
          </div>

          {/* 6. Screenshot Upload (Optional Proof) */}
          <div className="p-3.5 rounded-2xl bg-beige-50/70 border border-beige-200 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-ink flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-gold-dark" />
                <span>Upload Payment Screenshot</span>
              </span>
              <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                Fast-Track Verification
              </span>
            </div>

            {screenshotPreview ? (
              <div className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-beige-200">
                <img
                  src={screenshotPreview}
                  alt="Receipt thumbnail"
                  className="w-12 h-12 object-cover rounded-lg border border-beige-200"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-emerald-700 font-bold truncate">
                    Screenshot Attached
                  </div>
                  <div className="text-[10px] text-ink-muted">
                    Ready to attach with WhatsApp confirmation
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setScreenshotPreview(null)}
                  className="p-1.5 hover:bg-beige-100 rounded-lg text-ink-muted hover:text-red-600 transition cursor-pointer"
                  aria-label="Remove screenshot"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex items-center justify-center gap-2 p-3 border border-dashed border-beige-300 hover:border-gold rounded-xl bg-white cursor-pointer transition text-xs text-ink-muted hover:text-ink">
                <Upload className="w-4 h-4 text-gold-dark" />
                <span>Attach screenshot from GPay / PhonePe (Optional proof)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleScreenshotChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* 7. Anti-Fraud & Security Guarantee */}
          <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/70 text-xs text-amber-950 flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-amber-950 block">
                Bank-Grade Anti-Fraud Protection
              </span>
              <p className="text-[11px] text-amber-900 leading-relaxed">
                Orders and consultations are dispatched only after matching the 12-digit UTR with Astrologer Shilpa's bank credit alerts.
              </p>
            </div>
          </div>

          {/* 8. SUBMIT / CONFIRM PAYMENT BUTTON */}
          <Button
            type="button"
            onClick={handleConfirmPayment}
            disabled={isProcessing}
            className="w-full bg-gold hover:bg-gold-dark text-white rounded-full h-13 text-sm sm:text-base font-bold shadow-soft hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>
              {isProcessing
                ? "Verifying Payment..."
                : `I Have Paid ₹${amount.toLocaleString("en-IN")} · Confirm Order`}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
