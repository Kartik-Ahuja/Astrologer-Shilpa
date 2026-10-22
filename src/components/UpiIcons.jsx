import React from "react";

// 1. Official Unified Payments Interface (UPI) Logo
export function UpiLogo({ className = "h-5 w-auto" }) {
  return (
    <svg
      viewBox="0 0 140 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="UPI - Unified Payments Interface"
    >
      {/* UPI Diagonal Slashes */}
      <polygon points="6,30 18,6 25,6 13,30" fill="#097939" />
      <polygon points="17,30 29,6 36,6 24,30" fill="#F37021" />
      
      {/* UPI Letters */}
      {/* U */}
      <path
        d="M45 8V20C45 24 47.5 26.5 51 26.5C54.5 26.5 57 24 57 20V8H62V20C62 27 57 30.5 51 30.5C45 30.5 40 27 40 20V8H45Z"
        fill="#231F20"
      />
      {/* P */}
      <path
        d="M66 8H76C80.5 8 83.5 11 83.5 15.5C83.5 20 80.5 23 76 23H71V30H66V8ZM71 19H75.5C77.5 19 78.5 17.5 78.5 15.5C78.5 13.5 77.5 12 75.5 12H71V19Z"
        fill="#231F20"
      />
      {/* I */}
      <path d="M88 8H93V30H88V8Z" fill="#231F20" />

      {/* Subtext UNIFIED PAYMENTS INTERFACE */}
      <text
        x="42"
        y="35"
        fontSize="5"
        fontWeight="bold"
        fill="#666"
        letterSpacing="0.8"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        UNIFIED PAYMENTS INTERFACE
      </text>
    </svg>
  );
}

// 2. Google Pay (GPay) Official Badge
export function GPayLogo({ className = "h-7" }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white border border-gray-200/90 shadow-xs hover:border-gray-300 transition shrink-0 ${className}`}
      title="Google Pay"
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          fill="#EA4335"
        />
      </svg>
      <div className="flex items-center leading-none">
        <span className="font-sans font-bold text-gray-800 text-[13px] tracking-tight">
          G<span className="text-gray-600 font-medium">Pay</span>
        </span>
      </div>
    </div>
  );
}

// 3. PhonePe Official Badge (with authentic Devanagari 'पे' mark)
export function PhonePeLogo({ className = "h-7" }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#5f259f] text-white shadow-xs hover:bg-[#521e8c] transition shrink-0 ${className}`}
      title="PhonePe"
    >
      {/* Official Devanagari 'पे' Symbol */}
      <svg viewBox="0 0 32 32" className="w-5 h-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="7" fill="#5f259f" />
        {/* Shirorekha (Top horizontal line) */}
        <line x1="7" y1="9" x2="25" y2="9" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
        {/* Right vertical stem */}
        <line x1="21" y1="9" x2="21" y2="24" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
        {/* Curved 'pa' loop */}
        <path
          d="M11 9V17C11 19.5 13 21 16 21H21"
          stroke="white"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Top slanted Matra 'े' */}
        <path
          d="M19 8L15 4"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-sans font-extrabold text-white text-[13px] tracking-tight">
        PhonePe
      </span>
    </div>
  );
}

// 4. Paytm Official Badge
export function PaytmLogo({ className = "h-7" }) {
  return (
    <div
      className={`inline-flex items-center px-2.5 py-1 rounded-xl bg-[#f5f9ff] border border-[#00b9f5]/50 shadow-xs shrink-0 ${className}`}
      title="Paytm"
    >
      <div className="flex items-center tracking-tight leading-none">
        <span className="font-sans font-black text-[#002e6e] text-[13px]">
          Pay
        </span>
        <span className="font-sans font-black text-[#00b9f5] text-[13px]">
          tm
        </span>
        <span className="ml-1 text-[9px] uppercase font-bold text-[#002e6e] bg-[#00b9f5]/20 px-1 py-0.2 rounded">
          UPI
        </span>
      </div>
    </div>
  );
}

// 5. BHIM UPI Official Badge
export function BhimLogo({ className = "h-7" }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white border border-gray-200/90 shadow-xs shrink-0 ${className}`}
      title="BHIM UPI"
    >
      {/* BHIM Slanted Green & Orange Icon */}
      <svg viewBox="0 0 20 20" className="w-4 h-4 shrink-0" fill="none">
        <polygon points="3,17 9,3 13,3 7,17" fill="#097939" />
        <polygon points="9,17 15,3 19,3 13,17" fill="#F37021" />
      </svg>
      <div className="flex items-center leading-none gap-0.5">
        <span className="font-sans font-black text-[#004a80] text-[12px] tracking-tight">
          BHIM
        </span>
        <span className="font-sans font-bold text-[#097939] text-[11px]">
          UPI
        </span>
      </div>
    </div>
  );
}

// 6. Amazon Pay Official Badge
export function AmazonPayLogo({ className = "h-7" }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#232f3e] text-white shadow-xs shrink-0 ${className}`}
      title="Amazon Pay"
    >
      <span className="font-sans font-bold text-white text-[12px] tracking-tight">
        amazon
      </span>
      <span className="font-sans font-bold text-[#ff9900] text-[12px] tracking-tight">
        pay
      </span>
    </div>
  );
}

// 7. CRED Official Badge
export function CredLogo({ className = "h-7" }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black text-white shadow-xs shrink-0 ${className}`}
      title="CRED Pay"
    >
      <span className="w-2 h-2 rounded-full bg-white animate-pulse shrink-0" />
      <span className="font-sans font-extrabold tracking-widest text-white text-[11px] uppercase">
        CRED
      </span>
    </div>
  );
}

// 8. WhatsApp Pay Badge
export function WhatsAppPayLogo({ className = "h-7" }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 text-[#128C7E] shadow-xs shrink-0 ${className}`}
      title="WhatsApp Pay"
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#25D366] shrink-0">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z" />
      </svg>
      <span className="font-sans font-bold text-[#075E54] text-[11px] tracking-tight">
        WhatsApp Pay
      </span>
    </div>
  );
}

// 9. Comprehensive Accepted Apps Row Component
export function UpiAppIconsRow({ className = "" }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      <GPayLogo />
      <PhonePeLogo />
      <PaytmLogo />
      <BhimLogo />
      <AmazonPayLogo />
      <CredLogo />
      <WhatsAppPayLogo />
    </div>
  );
}

// 10. Center QR Code Overlay Emblem
export function QrCenterUpiBadge() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded-lg border-2 border-gold shadow-md flex items-center justify-center gap-1 pointer-events-none">
      <svg viewBox="0 0 30 20" className="w-5 h-3.5" fill="none">
        <polygon points="3,17 9,3 14,3 8,17" fill="#097939" />
        <polygon points="10,17 16,3 21,3 15,17" fill="#F37021" />
      </svg>
      <span className="font-sans font-black text-[9px] text-[#231F20] tracking-tighter">
        UPI
      </span>
    </div>
  );
}
