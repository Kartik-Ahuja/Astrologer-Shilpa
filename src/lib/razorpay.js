import { ASTRO_LOGO_BASE64 } from "./logoBase64";

export const RAZORPAY_KEY =
  import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_TMqxkUch9orx96";

let scriptLoadingPromise = null;

export const loadRazorpayScript = () => {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);

  if (scriptLoadingPromise) return scriptLoadingPromise;

  scriptLoadingPromise = new Promise((resolve) => {
    const existing = document.getElementById("razorpay-checkout-script");
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.id = "razorpay-checkout-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.warn("Razorpay SDK failed to load. Falling back to test/direct mode.");
      resolve(false);
    };
    document.body.appendChild(script);
  });

  return scriptLoadingPromise;
};

export const generateBookingId = (type = "ASTRO") => {
  const prefix = type === "pooja" ? "POOJA" : "ASTRO";
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const timeCode = Date.now().toString().slice(-4);
  return `${prefix}-${timeCode}-${randomNum}`;
};

export const initiateRazorpayPayment = async ({
  amount,
  bookingId,
  serviceName,
  customerName,
  customerEmail,
  customerPhone,
  onSuccess,
  onDismiss,
  onError,
}) => {
  try {
    const isLoaded = await loadRazorpayScript();

    if (!isLoaded || !window.Razorpay) {
      // If script is blocked or offline, let the user know and offer fallback
      const useMock = window.confirm(
        "Razorpay SDK could not be loaded (may be blocked by adblocker). Would you like to proceed in test simulation mode to complete your booking?"
      );
      if (useMock) {
        onSuccess({
          razorpay_payment_id: `sim_pay_${Date.now()}`,
          razorpay_order_id: `sim_ord_${bookingId}`,
          isSimulated: true,
        });
      } else if (onDismiss) {
        onDismiss();
      }
      return;
    }

    const options = {
      key: RAZORPAY_KEY,
      amount: Math.round(amount * 100), // in paise
      currency: "INR",
      name: "Astrologer Shilpa",
      description: serviceName || "Vedic Consultation / Pooja",
      image:
        typeof window !== "undefined" && window.location.protocol === "https:"
          ? `${window.location.origin}/logo-128.png`
          : ASTRO_LOGO_BASE64,
      prefill: {
        name: customerName || "",
        email: customerEmail || "",
        contact: customerPhone || "",
      },
      notes: {
        bookingId,
        serviceName,
      },
      theme: {
        color: "#b88a44", // Gold theme matching the site
      },
      modal: {
        ondismiss: () => {
          if (onDismiss) onDismiss();
        },
      },
      handler: (response) => {
        if (onSuccess) {
          onSuccess(response);
        }
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.on("payment.failed", (response) => {
      if (onError) {
        onError(response.error);
      }
    });

    razorpayInstance.open();
  } catch (err) {
    console.error("Error opening Razorpay checkout:", err);
    if (onError) onError(err);
  }
};
