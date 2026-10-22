// Centralized site data and constants for Astrologer Shilpa
import {
  Sparkles,
  BookOpen,
  Stars,
  HeartHandshake,
  Heart,
  Briefcase,
  TrendingUp,
  IndianRupee,
  Hand,
  ScanFace,
  Calculator,
  Home,
  Building2,
  Flame,
  Eye,
  Users,
  Compass,
  Sun,
} from "lucide-react";

import Dhanyog from "./Images/Dhanyog.webp";
import Pyrite from "./Images/Pyrite.webp";
import EvilEye from "./Images/EvilEye.webp";
import Om from "./Images/Om.webp";
import RoseQuartz from "./Images/RoseQuartz.webp";
import YellowCitrine from "./Images/YellowCitrine.webp";

export const CONTACT = {
  phone: "+91 89499 36535",
  phoneRaw: "+918949936535",
  whatsapp: "918949936535",
  email: "astrologershipla1@gmail.com",
  address:
    "B Block 302, Manglam Garden City, Near Manglam Tarang, Near Muhana Gaav, Muhana, Jaipur, Rajasthan 302029",
  city: "Muhana, Jaipur, Rajasthan",
  instagram: "https://www.instagram.com/astrology_shilpa/",
  youtube: "https://www.youtube.com/@Astrologer_Shilpa/",
};

export const waLink = (msg) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg || "Namaste Shilpa ji, I would like to book a consultation.")}`;

export const UPI_CONFIG = {
  upiId: "navratan0442@ybl",
  payeeName: "Astrologer Shilpa",
};

export const buildUpiPaymentUri = ({ amount, note, orderId }) => {
  const upiId = UPI_CONFIG.upiId;
  const name = UPI_CONFIG.payeeName;
  const cleanAmount = Number(amount || 0).toFixed(2);
  const safeNote = note || `Order ${orderId || ""} - Astrologer Shilpa`;
  return `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&am=${cleanAmount}&cu=INR&tn=${encodeURIComponent(safeNote)}`;
};

export const SERVICES = [
  {
    icon: BookOpen,
    title: "Kundli Reading & Matching",
    desc: "Detailed birth chart analysis to reveal your life path.",
  },
  {
    icon: Stars,
    title: "Janam Kundli Analysis",
    desc: "Deep-dive into planetary placements & dashas.",
  },
  {
    icon: Sun,
    title: "Palm & Horoscope Reading",
    desc: "Daily, monthly & yearly predictions tailored for you.",
  },
  // {
  //   icon: HeartHandshake,
  //   title: "Marriage Compatibility",
  //   desc: "Guna milan & dosh analysis for life partners.",
  // },
  // {
  //   icon: Sparkles,
  //   title: "Kundli Matching",
  //   desc: "Traditional Ashtakoot kundli matching for marriage.",
  // },
  {
    icon: Heart,
    title: "Love & Relationship",
    desc: "Clarity & remedies for love and relationship issues.",
  },
  // {
  //   icon: Briefcase,
  //   title: "Career Astrology",
  //   desc: "Right career path, job changes & growth timing.",
  // },
  // {
  //   icon: TrendingUp,
  //   title: "Business Astrology",
  //   desc: "Best muhurat, partners & strategic decisions.",
  // },
  {
    icon: IndianRupee,
    title: "Career & Financial Guidance",
    desc: "Wealth, investments & financial dosha remedies.",
  },
  // {
  //   icon: Hand,
  //   title: "Palm Reading",
  //   desc: "Hast rekha vigyan — read what your hands reveal.",
  // },
  // {
  //   icon: ScanFace,
  //   title: "Face Reading",
  //   desc: "Samudrik shastra — personality & destiny insights.",
  // },
  {
    icon: Calculator,
    title: "Numerology",
    desc: "Power of numbers — name, DOB & lucky elements.",
  },
  // {
  //   icon: Compass,
  //   title: "Vastu Consultation",
  //   desc: "Energy alignment of spaces for harmony & success.",
  // },
  // {
  //   icon: Home,
  //   title: "Home Vastu",
  //   desc: "Vastu corrections for peace, health & prosperity at home.",
  // },
  // {
  //   icon: Building2,
  //   title: "Office Vastu",
  //   desc: "Workplace vastu to boost growth & team energy.",
  // },
  {
    icon: Flame,
    title: "Online Pooja Consultation",
    desc: "Navgrah, Mahamrityunjay, Kaal Sarp & more poojas.",
  },
  {
    icon: Eye,
    title: "Future Prediction",
    desc: "Vedic predictions for upcoming life events.",
  },
  {
    icon: Users,
    title: "Family Guidance",
    desc: "Solutions for family disputes & generational doshas.",
  },
];

export const PRODUCTS = [
  {
    slug: "dhan-yog-bracelet",
    name: "Dhan Yog Bracelet",
    shortDescription:
      "A prosperity-inspired bracelet traditionally associated with abundance, growth and positive opportunities.",
    description:
      "The Dhan Yog Bracelet is designed as a symbolic piece for those who connect with prosperity, ambition and financial growth. It can be worn as a daily reminder of abundance, confidence and new opportunities.",
    price: 999,
    image: Dhanyog,
    details: [
      "Premium polished beads",
      "Traditionally associated with prosperity and abundance",
      "Symbolises confidence, growth and positive opportunities",
      "Suitable for daily wear",
    ],
  },
  {
    slug: "pyrite-bracelet",
    name: "Pyrite Bracelet",
    shortDescription:
      "A striking bracelet traditionally associated with confidence, abundance, protection and positive energy.",
    description:
      "The Pyrite Bracelet combines a bold metallic-inspired appearance with traditional symbolism connected to prosperity, confidence and determination. It is designed for everyday wear as a reminder of ambition and positive energy.",
    price: 999,
    image: Pyrite,
    details: [
      "Polished pyrite-style beads",
      "Traditionally associated with abundance and prosperity",
      "Symbolises confidence and determination",
      "Suitable for daily wear",
    ],
  },
  {
    slug: "yellow-citrine-bracelet",
    name: "Yellow Citrine Bracelet",
    shortDescription:
      "A vibrant bracelet traditionally associated with positivity, abundance, confidence and joyful energy.",
    description:
      "The Yellow Citrine Bracelet features warm golden-yellow tones and is traditionally connected with abundance, optimism and personal confidence. It can be worn as a symbolic reminder to stay positive and focused on growth.",
    price: 799,
    image: YellowCitrine,
    details: [
      "Polished yellow stone-style beads",
      "Traditionally associated with abundance and positivity",
      "Symbolises confidence and optimism",
      "Suitable for everyday wear",
    ],
  },

  {
    slug: "rose-quartz-tumbler-bracelet",
    name: "Rose Quartz Tumbler Bracelet",
    shortDescription:
      "A soft pink bracelet traditionally associated with love, harmony, compassion and self-care.",
    description:
      "The Rose Quartz Tumbler Bracelet features elegant pink-toned polished beads and is traditionally associated with love, emotional harmony and gentle energy. A beautiful everyday accessory with a soft and elegant aesthetic.",
    price: 799,
    image: RoseQuartz,
    details: [
      "Polished rose-pink beads",
      "Traditionally associated with love and harmony",
      "Symbolises compassion and self-care",
      "Suitable for daily wear",
    ],
  },

  {
    slug: "evil-eye-bracelet",
    name: "Evil Eye Bracelet",
    shortDescription:
      "A classic symbolic bracelet traditionally worn as a protective charm against negative energy.",
    description:
      "The Evil Eye Bracelet combines a timeless blue design with the traditional symbolism of the evil eye. It is commonly worn as a symbolic protective accessory and a reminder of positivity and awareness.",
    price: 799,
    image: EvilEye,
    details: [
      "Classic blue evil eye design",
      "Traditionally associated with protection",
      "Symbolises positivity and awareness",
      "Suitable for everyday wear",
    ],
  },

  {
    slug: "om-bracelet",
    name: "Om Bracelet",
    shortDescription:
      "A spiritual bracelet featuring the Om symbol, traditionally associated with peace, harmony and mindfulness.",
    description:
      "The Om Bracelet combines a classic beaded design with the sacred Om symbol. Traditionally connected with spiritual awareness, balance and inner harmony, it makes a meaningful everyday accessory.",
    price: 399,
    image: Om,
    details: [
      "Classic dark polished beads",
      "Features an Om symbol charm",
      "Traditionally associated with peace and harmony",
      "Suitable for daily spiritual and everyday wear",
    ],
  },
];

export const productPath = (product) => `/product/${product.slug}`;

export const productWaLink = (product) =>
  waLink(
    `Namaste Shilpa ji, I would like to purchase this product:\n\n` +
      `Product: ${product.name}\n` +
      `Price: ₹${product.price.toLocaleString("en-IN")}\n\n` +
      "Please share the purchase process and delivery details.",
  );

export const WHY_US = [
  "Personalized Consultation",
  "Practical Remedies",
  "Trusted Astrological Guidance",
  "Online & Offline Sessions",
  "Easy-to-Understand Advice",
  "Confidential Consultation",
  "Spiritual & Practical Approach",
];

export const CONSULT_CHANNELS = [
  {
    title: "WhatsApp Consultation",
    icon: "MessageCircle",
  },
  {
    title: "Phone Consultation",
    icon: "Phone",
  },
  {
    title: "Video Call Consultation",
    icon: "Video",
  },
  {
    title: "Online Kundli Reading",
    icon: "BookOpen",
  },
  {
    title: "Online Palm Reading",
    icon: "Hand",
  },
  {
    title: "Online Face Reading",
    icon: "ScanFace",
  },
  // {
  //   title: "Online Vastu Consultation",
  //   icon: "Compass",
  // },
  {
    title: "Online Pooja Consultation",
    icon: "Flame",
  },
];

export const TESTIMONIALS = [
  {
    stars: 5,
    text: "She is truly the best astrologer in Jaipur! Her kundli reading and career astrology consultation were so accurate. I followed her remedies, and my professional life changed completely.",
    name: "Renu Pareek",
  },
  {
    stars: 5,
    text: "Someone had referred me to Shilpa for showing my kundali. In my experience i had the best palm reading and kundali reading session with her where she told me what I could do to imrpove my situation. I am completely satisfied with the results I saw.",
    name: "Aastha Agrawal",
  },
  {
    stars: 5,
    text: "She is best kundali reader nd by nature she is so humble nd describe each and everything from our kundali and palm thnku so much shilpa mam💗 she change my opinion towards  life.....highly recommended …",
    name: "Komal Goyal",
  },
  {
    stars: 5,
    text: "I wanted to appreciate the best astrologer that I have come across in Jaipur. I had reached out to her for problems that I was facing in my academic and family life and the solutions suggested by her really did bring an improvement. She is helpful and a very good guide.",
    name: "Advait Gangwal",
  },
  {
    stars: 5,
    text: "Was looking for some good palm and kundali reader and then got to know about her through a friend and it was the best thing for me. From job to personal life issues, i have seen great results. Best kundali reader i have known. Thank u mam.",
    name: "Seema Agarwal",
  },
  {
    stars: 5,
    text: "Thoroughly enjoyed my afternoon with Shilpa, she is very kind and knowledgeable! Definitely recommend the experience!",
    name: "Faithe Saccsara",
  },
];

export const PROCESS = [
  {
    step: "01",
    title: "Book Appointment",
    desc: "Reach out via call, WhatsApp or the contact form below.",
  },
  {
    step: "02",
    title: "Share Birth Details",
    desc: "Date, time & place of birth — accuracy matters.",
  },
  {
    step: "03",
    title: "Detailed Analysis",
    desc: "Shilpa ji studies your chart and prepares insights.",
  },
  {
    step: "04",
    title: "Guidance & Remedies",
    desc: "Receive clear predictions and practical remedies.",
  },
];

export const FAQS = [
  {
    q: "Who is the best astrologer in Jaipur?",
    a: "Astrologer Shilpa Tibrewal is a trusted name in Jaipur for Vedic Astrology, Kundli Reading, and Numerology. With years of experience, she is known for accurate readings, easy-to-understand advice and practical remedies that work in real life.",
  },
  {
    q: "How does kundli reading work?",
    a: "Kundli reading uses your exact date, time and place of birth to chart the position of planets. Astrologer Shilpa analyses the placements, dashas and yogas in your janam kundli to give you guidance on career, marriage, finances, health and life purpose.",
  },
  {
    q: "Can I book an online astrology consultation?",
    a: "Yes. Online consultations are available via WhatsApp, Phone and Video Call — anywhere in India and abroad. Simply share your birth details after booking and you will receive a full reading at your scheduled time.",
  },
  {
    q: "Do you offer online pooja consultation?",
    a: "Absolutely. Shilpa ji guides Navgrah Shanti Pooja, Mahamrityunjay Jaap, Kaal Sarp Dosh Pooja, Manglik Dosh Pooja, Lakshmi Pooja, Ganesh Pooja, Rudrabhishek, Pitra Dosh Nivaran and many more — all online with proper sankalp and vidhi.",
  },
  {
    q: "What details are needed for horoscope reading?",
    a: "You will need your full name, date of birth, exact time of birth (as written on the birth certificate if possible) and place of birth. These details help in preparing an accurate janam kundli.",
  },
  // {
  //   q: "Do you provide vastu consultation for homes and offices?",
  //   a: "Yes. Home Vastu and Office Vastu consultations are available both online (via floor plan) and on-site in Jaipur. Practical, non-destructive remedies are provided wherever possible.",
  // },
];

export const BOOKING_CONFIG = {
  consultation: {
    id: "consultation",
    type: "consultation",
    title: "Audio Consultation",
    badge: "10 Min Audio Call",
    price: 1000,
    formattedPrice: "₹1,000",
    duration: "10 Minutes Audio Call",
    subtitle:
      "Direct 1-on-1 audio call with Shilpa ji for fast & accurate guidance.",
    description:
      "Get authentic Vedic guidance on your Janam Kundli, love life, career, finances, or family problems with actionable remedies.",
    features: [
      "10-minute focused audio call with Shilpa ji",
      "Kundli & planetary dasha insights",
      "Practical, easy-to-do Vedic remedies",
      "100% confidential discussion",
    ],
  },
  pooja: {
    id: "pooja",
    type: "pooja",
    title: "Online Vedic Pooja",
    badge: "Full Vidhi + Prasad Delivery",
    price: 5000,
    formattedPrice: "₹5,000",
    duration: "Complete Vedic Ritual",
    subtitle:
      "Performed on your behalf with personal Sankalp on your Name & Gotra.",
    description:
      "Traditional Vedic pooja guided by Shilpa ji and Vedic Pandits with proper sankalp. Sanctified Prasad, Raksha Sutra & Yantra delivered to your home address.",
    features: [
      "Personal Sankalp with your Name & Gotra",
      "Vedic Pandits reciting sacred Vedic mantras",
      "Live photos / video clips sent on WhatsApp",
      "Doorstep delivery of sanctified Prasad & Raksha Kavach",
    ],
  },
};

export const CONSULTATION_TOPICS = [
  "Kundli Reading & Janam Patrika",
  "Career, Job & Business Growth",
  "Love, Relationship & Marriage Compatibility",
  "Financial Obstacles & Debt Remedies",
  "Health, Mental Peace & Family Disputes",
  "Palm & Face Reading Insights",
  "Numerology & Lucky Name Correction",
  "General Life Guidance & Muhurat",
];

export const ONLINE_POOJAS = [
  {
    id: "navgrah-shanti",
    name: "Navgrah Shanti Pooja",
    price: 5000,
    benefit:
      "Pacifies all 9 planetary doshas, brings harmony and removes recurring hurdles.",
    icon: "Stars",
  },
  {
    id: "mahamrityunjay",
    name: "Mahamrityunjay Jaap",
    price: 5000,
    benefit:
      "Powerful Shiva mantra jaap for health, recovery, protection and longevity.",
    icon: "Flame",
  },
  {
    id: "kaal-sarp",
    name: "Kaal Sarp Dosh Pooja",
    price: 5000,
    benefit:
      "Relieves career stagnation, marriage delays and sudden hurdles caused by Rahu-Ketu.",
    icon: "Sparkles",
  },
  {
    id: "manglik-dosh",
    name: "Manglik Dosh Nivaran Pooja",
    price: 5000,
    benefit:
      "Calms high Mars energy, resolves marital delays and protects relationship peace.",
    icon: "Heart",
  },
  {
    id: "lakshmi-pooja",
    name: "Maha Lakshmi & Kuber Pooja",
    price: 5000,
    benefit:
      "Attracts financial prosperity, business growth, abundance and auspicious energy.",
    icon: "IndianRupee",
  },
  {
    id: "ganesh-pooja",
    name: "Siddhi Vinayak Ganesh Pooja",
    price: 5000,
    benefit:
      "Vighnaharta blessings for successful new ventures, education and removal of obstacles.",
    icon: "Sun",
  },
  {
    id: "rudrabhishek",
    name: "Maha Rudrabhishek Pooja",
    price: 5000,
    benefit:
      "Sacred Panchamrit abhishek of Lord Shiva for inner peace, purification and blessings.",
    icon: "Flame",
  },
  {
    id: "pitra-dosh",
    name: "Pitra Dosh Nivaran Pooja",
    price: 5000,
    benefit:
      "Ancestral peace, family progress, progeny blessings and removing inherited blocks.",
    icon: "Users",
  },
  {
    id: "shiv-parvati-vivah",
    name: "Shiv Parvati Vivah Pooja",
    price: 5000,
    benefit:
      "Ideal for finding the right life partner, timely marriage and lifelong affection.",
    icon: "HeartHandshake",
  },
];

export const TIME_SLOTS = [
  { id: "m1", label: "10:00 AM - 11:30 AM", period: "Morning" },
  { id: "m2", label: "11:30 AM - 01:00 PM", period: "Morning" },
  { id: "a1", label: "02:00 PM - 03:30 PM", period: "Afternoon" },
  { id: "a2", label: "03:30 PM - 05:00 PM", period: "Afternoon" },
  { id: "e1", label: "05:30 PM - 07:00 PM", period: "Evening" },
  { id: "e2", label: "07:00 PM - 08:30 PM", period: "Evening" },
];

export const formatBookingWhatsAppMessage = (booking) => {
  const isPooja = booking.type === "pooja";
  const title = isPooja
    ? "ONLINE POOJA BOOKING"
    : "CONSULTATION (AUDIO CALL) BOOKING";

  const lines = [
    `🕉️ *NEW ${title} - ASTROLOGER SHILPA* 🕉️`,
    ``,
    `*Booking ID:* #${booking.bookingId || "PENDING"}`,
    `*Service:* ${booking.serviceName || (isPooja ? "Online Vedic Pooja" : "10 Min Audio Consultation")}`,
    `*Fee / Dakshina:* ₹${booking.amount?.toLocaleString("en-IN") || (isPooja ? "5,000" : "1,000")}`,
    `*Payment Method:* ⚡ Direct UPI (0% Fee)`,
    `*Payment Status:* ✅ Paid via UPI (${booking.utr ? `UTR: ${booking.utr}` : `Ref: ${booking.paymentId || "CONFIRMED"}`})`,
    `*UPI ID:* ${UPI_CONFIG.upiId}`,
    booking.screenshot ? `• *Receipt Screenshot:* (Attached)` : null,
    ``,
    `📅 *SCHEDULED SLOT:*`,
    `• Date: ${booking.dateFormatted || booking.date || "Not Selected"}`,
    `• Time Slot: ${booking.slot || "Not Selected"}`,
    ``,
    `👤 *DEVOTEE / CLIENT DETAILS:*`,
    `• Name: ${booking.name || "N/A"}`,
    `• Phone: ${booking.phone || "N/A"}`,
    booking.email ? `• Email: ${booking.email}` : null,
    booking.dob ? `• DOB: ${booking.dob}` : null,
    booking.birthTime ? `• Birth Time: ${booking.birthTime}` : null,
    booking.birthPlace ? `• Birth Place: ${booking.birthPlace}` : null,
    booking.gotra ? `• Gotra / Father's Name: ${booking.gotra}` : null,
    ``,
    `📦 *DELIVERY ADDRESS (FOR PRASAD & BLESSINGS):*`,
    `• Address: ${booking.address || "N/A"}`,
    booking.landmark ? `• Landmark: ${booking.landmark}` : null,
    `• City: ${booking.city || "N/A"}, ${booking.state || "Rajasthan"}`,
    `• Pincode: ${booking.pincode || "N/A"}`,
    ``,
    booking.notes
      ? `💬 *Sankalp / Concern / Question:*\n"${booking.notes}"\n`
      : null,
    `🙏 *Namaste Shilpa ji, please review and confirm this booking.*`,
  ];

  return lines.filter(Boolean).join("\n");
};

export const formatProductOrderWhatsAppMessage = (order) => {
  const lines = [
    `🛍️ *NEW PRODUCT ORDER - ASTROLOGER SHILPA* 🛍️`,
    ``,
    `*Order ID:* #${order.orderId || "CONFIRMED"}`,
    `*Product:* ${order.productName} (Qty: ${order.quantity || 1})`,
    `*Amount:* ₹${order.amount?.toLocaleString("en-IN")}`,
    `*Payment Method:* ⚡ Direct UPI (0% Fee)`,
    `*Payment Status:* ✅ Paid via UPI (${order.utr ? `UTR: ${order.utr}` : `Ref: ${order.paymentId || "CONFIRMED"}`})`,
    `*UPI ID:* ${UPI_CONFIG.upiId}`,
    order.screenshot ? `• *Receipt Screenshot:* (Attached)` : null,
    ``,
    `👤 *CUSTOMER DETAILS:*`,
    `• Name: ${order.name}`,
    `• Phone: ${order.phone}`,
    order.email ? `• Email: ${order.email}` : null,
    ``,
    `📦 *DELIVERY ADDRESS:*`,
    `• Address: ${order.address}`,
    order.landmark ? `• Landmark: ${order.landmark}` : null,
    `• City: ${order.city}, ${order.state || "Rajasthan"}`,
    `• Pincode: ${order.pincode}`,
    ``,
    `🙏 *Namaste Shilpa ji, I have completed the payment via UPI for this order on your website. Please dispatch the energized product to my address.*`,
  ];

  return lines.filter(Boolean).join("\n");
};

export const formatMultiItemOrderWhatsAppMessage = (order) => {
  const itemsList = (order.items || [])
    .map(
      (item, idx) =>
        `• *${item.product.name}* (Qty: ${item.quantity}) - ₹${(item.product.price * item.quantity).toLocaleString("en-IN")}`,
    )
    .join("\n");

  const lines = [
    `🛍️ *NEW CART ORDER - ASTROLOGER SHILPA* 🛍️`,
    ``,
    `*Order ID:* #${order.orderId || "CONFIRMED"}`,
    `*Total Items:* ${order.totalItems || order.items?.length || 1}`,
    `*Total Amount:* ₹${order.totalAmount?.toLocaleString("en-IN")}`,
    `*Payment Method:* ⚡ Direct UPI (0% Fee)`,
    `*Payment Status:* ✅ Paid via UPI (${order.utr ? `UTR: ${order.utr}` : `Ref: ${order.paymentId || "CONFIRMED"}`})`,
    `*UPI ID:* ${UPI_CONFIG.upiId}`,
    order.screenshot ? `• *Receipt Screenshot:* (Attached)` : null,
    ``,
    `📦 *ORDERED ITEMS:*`,
    itemsList,
    ``,
    `👤 *CUSTOMER DETAILS:*`,
    `• Name: ${order.name}`,
    `• Phone: ${order.phone}`,
    order.email ? `• Email: ${order.email}` : null,
    ``,
    `🚚 *DELIVERY ADDRESS:*`,
    `• Address: ${order.address}`,
    order.landmark ? `• Landmark: ${order.landmark}` : null,
    `• City: ${order.city}, ${order.state || "Rajasthan"}`,
    `• Pincode: ${order.pincode}`,
    ``,
    `🙏 *Namaste Shilpa ji, I have placed this order and completed payment via UPI. Please dispatch the energized products.*`,
  ];

  return lines.filter(Boolean).join("\n");
};
