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
import RawPyrite from "./Images/RawPyrite.webp";
import Rudraksh from "./Images/Rudraksh.webp";
import EvilEyeTree from "./Images/EvilEyeTree.webp";
import KarungaliMala from "./Images/KarungaliMala.webp";
import CrystalEgg from "./Images/CrystalEgg.webp";
import EggStand from "./Images/EggStand.webp";
import FourCrystalEggs from "./Images/FourCrystalEggs.webp";
import ChakraFrame from "./Images/ChakraFrame.webp";
import TigerStone from "./Images/TigerStone.webp";

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
    price: 799,
    image: Dhanyog,
    details: [
      "Premium polished beads",
      "Traditionally associated with prosperity and abundance",
      "Symbolises confidence, growth and positive opportunities",
      "Cleansed and energized with Vedic mantras",
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
    price: 799,
    image: Pyrite,
    details: [
      "Polished pyrite-style beads",
      "Traditionally associated with abundance and prosperity",
      "Symbolises confidence and determination",
      "Attracts career opportunities and focus",
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
      "Supports business and career growth",
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
      "Symbolises compassion, self-love and emotional balance",
      "Promotes positive and calm energy",
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
      "Traditionally associated with protection against negative energy",
      "Symbolises positivity, awareness and good luck",
      "Comfortable elastic cord for everyday wear",
    ],
  },
  {
    slug: "om-bracelet",
    name: "Om Bracelet",
    shortDescription:
      "A spiritual bracelet featuring the Om symbol, traditionally associated with peace, harmony and mindfulness.",
    description:
      "The Om Bracelet combines a classic beaded design with the sacred Om symbol. Traditionally connected with spiritual awareness, balance and inner harmony, it makes a meaningful everyday accessory.",
    price: 299,
    image: Om,
    details: [
      "Classic dark polished beads with golden Om symbol",
      "Traditionally associated with peace, harmony and mindfulness",
      "Represents spiritual connection and balance",
      "Suitable for daily spiritual and everyday wear",
    ],
  },
  {
    slug: "raw-pyrite-stone",
    name: "Raw Pyrite Stone",
    shortDescription:
      "Made from 100% genuine raw pyrite and traditionally linked to Shani (Saturn) for balance, abundance and stability.",
    description:
      "Made from 100% genuine pyrite and traditionally linked to Shani (Saturn). It is believed to help balance Shani energy, boost willpower and bring stability during challenging phases. Keep it in your cash locker, office desk or pooja room to attract abundance.",
    price: 499,
    image: RawPyrite,
    details: [
      "100% genuine raw metallic golden pyrite cluster",
      "Traditionally linked to Shani (Saturn) energy balance",
      "Attracts money, abundance and financial stability",
      "Boosts confidence, willpower and career success",
      "Protects from negative energy and evil eye",
    ],
  },
  {
    slug: "rudraksh",
    name: "Vedic Rudraksh Bead",
    shortDescription:
      "Natural 5-Mukhi Vedic Rudraksh revered for spiritual balance, inner peace, and divine protection.",
    description:
      "Rudraksh is traditionally revered in Vedic practices and associated with Lord Shiva, spiritual balance, inner peace and positive energy. Each bead is naturally sourced, cleansed and energized with Vedic mantras for maximum spiritual benefits.",
    price: 499,
    image: Rudraksh,
    details: [
      "Authentic natural 5-Mukhi Vedic Rudraksha bead",
      "Supports inner peace, mental calm and emotional stability",
      "Encourages mental clarity and meditation focus",
      "Promotes positive spiritual energy and divine protection",
      "Sanctified and energized with traditional Vedic chanting",
    ],
  },
  {
    slug: "evil-eye-healing-tree",
    name: "Evil Eye Healing Tree",
    shortDescription:
      "An ornamental healing tree combining the symbolic protection of the Evil Eye with decorative energy beauty.",
    description:
      "An ornamental healing tree combining the symbolic protection of the Evil Eye with the beauty of an energy tree. Crafted with golden wire branches holding vibrant blue evil eye glass beads on a protective evil eye pedestal, it elevates your home, temple or office space.",
    price: 999,
    image: EvilEyeTree,
    details: [
      "Artisan golden wire branches with blue evil eye glass leaves",
      "Sturdy round blue glass evil eye talisman base",
      "Symbolic protection against negative vibrations and drishti dosha",
      "Brings positive energy, prosperity and spiritual peace",
      "Perfect decorative centerpiece for living room, reception or altar",
    ],
  },
  {
    slug: "natural-karungali-mala",
    name: "Natural Karungali Mala",
    shortDescription:
      "Natural Karungali (Ebony wood) Mala traditionally valued in spiritual practices for grounding, protection and positive energy.",
    description:
      "Natural Karungali (Ebony wood) Mala is traditionally valued in spiritual practices and is associated with grounding, protection and positive energy. Traditionally connected with Mars (Mangal) and protective divine energy, it helps clear obstacles and calm the mind during meditation and japa.",
    price: 699,
    image: KarungaliMala,
    details: [
      "Crafted from 100% natural authentic Karungali (Ebony wood)",
      "Traditional 108 polished beads with guru bead & black silk tassel",
      "Supports emotional grounding, stability and resilience",
      "Traditionally used for spiritual protection and warding off negativity",
      "Ideal for daily wearing, mantra japa and meditation",
    ],
  },
  {
    slug: "healing-crystal-egg",
    name: "Healing Crystal Egg (Rose Quartz)",
    shortDescription:
      "A polished crystal egg designed as a decorative healing object for meditation, energy work and creating a calming environment.",
    description:
      "A polished rose quartz crystal egg designed as a decorative healing object and traditionally used for meditation, energy work and creating a calming environment. Placed on its included golden tripod stand, it radiates soothing vibrations of love, harmony and emotional peace.",
    price: 999,
    image: CrystalEgg,
    details: [
      "Smooth polished natural Rose Quartz gemstone egg",
      "Includes an ornate golden brass tripod display stand",
      "Promotes calm, relaxation and gentle emotional balance",
      "Supports heart chakra opening, harmony and self-love",
      "Elegant spiritual décor for bedside tables, altars and work desks",
    ],
  },
  {
    slug: "egg-stand",
    name: "Royal Decorative Egg Stand",
    shortDescription:
      "An elegant decorative stand designed to display crystal healing eggs beautifully in your home, office or spiritual space.",
    description:
      "An elegant decorative stand designed to display crystal healing eggs beautifully in your home, office or spiritual space. Features intricate antique royal detailing with a lustrous golden finish, providing a stable and regal foundation for sacred stones.",
    price: 599,
    image: EggStand,
    details: [
      "High-grade metal alloy with rich golden polished finish",
      "Ornate tripod claw legs for steady, slip-free display",
      "Securely holds single crystal eggs, spheres, and mineral specimens",
      "Enhances home decor, temple mandirs and meditation spaces",
    ],
  },
  {
    slug: "4-crystal-eggs-with-stand",
    name: "4 Crystal Eggs + Royal Stand Collection",
    shortDescription:
      "A complete decorative collection featuring four crystal eggs with a coordinated stand for display and spiritual spaces.",
    description:
      "A complete decorative collection featuring four crystal eggs with a coordinated stand, designed for display and spiritual spaces. Includes Rose Quartz, Green Aventurine, Clear Quartz, and Amethyst eggs resting in an ornate golden four-cup stand for comprehensive multi-chakra energy.",
    price: 3499,
    image: FourCrystalEggs,
    details: [
      "Complete set of 4 natural polished crystal eggs",
      "Rose Quartz, Green Aventurine, Clear Quartz, and Amethyst",
      "Includes coordinated ornate golden 4-cup display stand",
      "Harmonizes heart, crown, third eye and physical energy",
      "Magnificent spiritual centerpiece for pooja room or living area",
    ],
  },
  {
    slug: "7-chakra-photo-frame",
    name: "7 Chakra Sacred Photo Frame",
    shortDescription:
      "A sacred 7 Chakra photo frame designed to balance energy centers and bring positivity, peace and spiritual harmony.",
    description:
      "A sacred 7 Chakra photo frame designed to balance energy centers and bring positivity, peace and spiritual harmony. Aligned vertically from the Root to Crown Chakra, this artwork serves as a daily focal point for meditation, spiritual balance, and positive energy flow in any room.",
    price: 999,
    image: ChakraFrame,
    details: [
      "Premium sleek black frame with protective front glass",
      "Features all 7 sacred Chakra vortexes with authentic Vedic colors",
      "Balances directional energies and clears environmental stress",
      "Ideal focal object for daily meditation, prayer, or yoga spaces",
      "Ready to hang on walls or stand on study desks and mandirs",
    ],
  },
  {
    slug: "tiger-stone-bracelet",
    name: "Tiger Stone (Tiger Eye) Bracelet",
    shortDescription:
      "A striking Tiger Stone bracelet traditionally known for boosting courage, confidence, focus and protective strength.",
    description:
      "The Tiger Stone (Tiger's Eye) Bracelet combines rich golden-brown chatoyant beads traditionally associated with courage, confidence, focus and protective strength. Wear it daily to stay grounded, motivated, and shielded against negativity.",
    price: 499,
    image: TigerStone,
    details: [
      "Natural chatoyant golden-brown Tiger's Eye polished beads",
      "Traditionally associated with courage, focus, and willpower",
      "Protects against evil eye and negative environmental energies",
      "Supports career ambition, leadership and decisive actions",
      "Comfortable durable elastic band for daily wear",
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

export const OFFLINE_SERVICES = [
  "Janam Kundli Reading & Analysis",
  "Palm Reading (Hast Rekha Vigyan)",
  "Face Reading (Samudrik Shastra)",
  "Marriage & Kundli Matching",
  "Career, Job & Business Astrology",
  "Financial & Wealth Remedies",
  "Family & Relationship Guidance",
  "Vastu Consultation (Home / Office)",
  "Personalized Vedic Remedies & Gemstones",
];

export const OFFLINE_TIME_SLOTS = [
  { id: "morning", label: "Morning Slot (10:00 AM – 01:00 PM)" },
  { id: "afternoon", label: "Afternoon Slot (01:00 PM – 04:00 PM)" },
  { id: "evening", label: "Evening Slot (04:00 PM – 07:00 PM)" },
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
    hindiName: "नवग्रह शांति पूजा एवं हवन",
    price: 5000,
    category: "dosha",
    categoryLabel: "Planetary & Dosha Nivaran",
    benefit:
      "Pacifies all 9 planetary doshas, brings harmony and removes recurring hurdles.",
    icon: "Stars",
    duration: "2.5 – 3 Hours",
    pandits: "2 Vedic Brahmins",
    whyPerform:
      "When planets are unfavorably placed in your Janam Kundli, or during difficult dasha periods (like Shani Sade Sati, Dhaiya, Rahu/Ketu mahadasha), life can face constant obstacles, financial drains, health dips, and unexpected delays. Navgrah Shanti harmonizes all 9 cosmic energies.",
    whatHappens:
      "The ritual begins with Gauri-Ganesh Pujan and Kalash Sthapana. Pandits establish the sacred Navgrah Yantra and chant specific Vedic Beej Mantras for Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu. A sacred Havan is conducted using 9 distinct planetary sacred woods (Samidhas) followed by Purna Ahuti and Aarti.",
    vidhiSteps: [
      "Gauri Ganesh Pujan & Swasti Vachan",
      "Kalash Sthapana & Navgrah Yantra Pratishta",
      "Personal Sankalp recited with Devotee's Name & Gotra",
      "11,000+ Navgrah Vedic Beej Mantra Chanting",
      "9 Sacred Samidha Havan with Pure Cow Ghee",
      "Purna Ahuti, Shanti Paath & Maha Aarti",
    ],
    keyInclusions: [
      "Individual Sankalp on your Name & Gotra",
      "Live Video clips of your Sankalp & Havan on WhatsApp",
      "Energized Navgrah Yantra for home temple",
      "Sanctified dry-fruit Prasad couriered to your doorstep",
    ],
    idealFor:
      "Anyone experiencing Sade Sati, planetary mahadasha stress, sudden business losses, or constant unexplained blockages.",
  },
  {
    id: "mahamrityunjay",
    name: "Mahamrityunjay Jaap",
    hindiName: "महामृत्युंजय महाजाप व संजीवनी हवन",
    price: 5000,
    category: "health",
    categoryLabel: "Health & Protection",
    benefit:
      "Powerful Shiva mantra jaap for health, recovery, protection and longevity.",
    icon: "Flame",
    duration: "3 Hours",
    pandits: "3 Vedic Shiva Priests",
    whyPerform:
      "Known as the Maha Sanjeevani ritual in Vedic scriptures, this pooja invokes Lord Shiva's conquering power over chronic illnesses, mental depression, sudden accidents, fear of death, and negative energy. It infuses physical cells with divine healing vibrations.",
    whatHappens:
      "Begins with Jalabhishek and Panchamrit Abhishek of the Shiva Lingam. Devotee's personal health sankalp is taken. Priests chant the potent Mahamrityunjay Samput Mantra with sacred Rudraksha beads. It concludes with an energized Amrit Havan using Guggul, sesame seeds, herbs, and pure ghee, followed by Shiva Aarti.",
    vidhiSteps: [
      "Panchamrit Abhishek & Belpatra Arpan to Lord Shiva",
      "Sanjeevani Health Sankalp on Devotee's Name & Gotra",
      "Potent Mahamrityunjay Mantra Jaap with Rudraksha Mala",
      "Sacred Amrit Havan with Guggul, Camphor & Herbs",
      "Bhasma (Sacred Ash) Abhimantran for recovery",
      "Karpura Aarti & Shiva Raksha Stotram",
    ],
    keyInclusions: [
      "Personalized healing Sankalp for the patient/devotee",
      "Video clips of Abhishek and Havan sent on WhatsApp",
      "Blessed Shiva Bhasma (vibhuti) & protective Raksha Sutra",
      "Energized Mahamrityunjay Yantra & sanctified Prasad courier",
    ],
    idealFor:
      "People suffering from prolonged illness, critical recovery, psychological anxiety, Markesh dasha, or seeking life protection.",
  },
  {
    id: "kaal-sarp",
    name: "Kaal Sarp Dosh Pooja",
    hindiName: "काल सर्प दोष शांति पूजा",
    price: 5000,
    category: "dosha",
    categoryLabel: "Planetary & Dosha Nivaran",
    benefit:
      "Relieves career stagnation, marriage delays and sudden hurdles caused by Rahu-Ketu.",
    icon: "Sparkles",
    duration: "2.5 Hours",
    pandits: "2 Vedic Brahmins",
    whyPerform:
      "When all seven planets are locked between Rahu and Ketu in the birth chart, a person faces the dreaded Kaal Sarp Yog. Hard work yields very little reward, mental restlessness prevails, marriage gets postponed, and recurring nightmares of snakes or water occur.",
    whatHappens:
      "Conducted following strict Nag Shastra vidhi. Silver Naag-Naagin idols are invoked on a sacred altar. Priests recite Rahu and Ketu Vedic Shanti Mantras, Sarpa Suktam, and Maha Kaal Sarp Nivaran Mantras. Ahutis are offered into the havan kund with black sesame, mustard seeds, and special samagri to break the serpentine block.",
    vidhiSteps: [
      "Naag-Naagin Pratishta & Panchamrit Pujan",
      "Kaal Sarp Nivaran Sankalp with Name & Gotra",
      "Rahu & Ketu Vedic Beej Mantra recitations",
      "Sarpa Gayatri & Maha Mrityunjay Samput Path",
      "Special Sarpa Shanti Havan with Mustard & Sesame",
      "Visarjan rituals and Rahu-Ketu Shanti blessings",
    ],
    keyInclusions: [
      "Personal Sankalp dissolving serpentine karmic blocks",
      "Video recordings of the Naag pujan and ahutis on WhatsApp",
      "Energized Kaal Sarp Nivaran Yantra for your home",
      "Sanctified dry-fruit prasad & holy thread couriered",
    ],
    idealFor:
      "Individuals whose kundli indicates Anant, Kulik, Vasuki, Shankhpal, or any of the 12 types of Kaal Sarp Yog.",
  },
  {
    id: "manglik-dosh",
    name: "Manglik Dosh Nivaran Pooja",
    hindiName: "मांगलिक दोष निवारण एवं मंगल शांति",
    price: 5000,
    category: "marriage",
    categoryLabel: "Marriage & Relationship",
    benefit:
      "Calms high Mars energy, resolves marital delays and protects relationship peace.",
    icon: "Heart",
    duration: "2.5 Hours",
    pandits: "2 Vedic Brahmins",
    whyPerform:
      "Mars (Mangal) situated in the 1st, 4th, 7th, 8th, or 12th house in the birth chart creates Manglik Dosh. This causes delays in finding suitable partners, frequent conflicts in marriage, temperament clashes, or post-wedding turbulence.",
    whatHappens:
      "Lord Mangal (Bhauma) and Lord Hanuman are invoked. Red coral, red flowers, and copper items are offered. Priests chant the Mangal Gayatri, Rinmochan Mangal Stotram, and Vedic Mangal Mantras. A specialized Havan using Khadir wood, red sandalwood, and cow ghee pacifies Mars's fiery aggression into constructive marital harmony.",
    vidhiSteps: [
      "Bhauma (Mars) Pratima Sthapana & Hanuman Vandana",
      "Manglik Shanti Sankalp on Devotee's Name & Gotra",
      "10,000+ Mangal Beej Mantra & Gayatri Path",
      "Khadir Wood Havan with Red Sandalwood & Ghee",
      "Sindoor Arpan & Saubhagya blessing prayers",
      "Maha Aarti for peaceful and timely marriage",
    ],
    keyInclusions: [
      "Customized Sankalp for timely marriage and peaceful union",
      "Full video clips of Mangal Havan sent via WhatsApp",
      "Energized Mangal Yantra & consecrated red raksha sutra",
      "Sanctified temple prasad delivered to your home address",
    ],
    idealFor:
      "Anyone who is Anshik or Purna Manglik, facing delay in marriage or relationship disputes.",
  },
  {
    id: "lakshmi-pooja",
    name: "Maha Lakshmi & Kuber Pooja",
    hindiName: "महालक्ष्मी एवं कुबेर धनवर्षा पूजा",
    price: 5000,
    category: "wealth",
    categoryLabel: "Wealth & Prosperity",
    benefit:
      "Attracts financial prosperity, business growth, abundance and auspicious energy.",
    icon: "IndianRupee",
    duration: "2.5 Hours",
    pandits: "2 Vedic Pandits",
    whyPerform:
      "To overcome acute cash-flow crunches, stubborn debts, stagnation in shop/business sales, and attract continuous financial prosperity into your home or commercial enterprise.",
    whatHappens:
      "Maa Lakshmi and Kuber Bhandari are invoked with 108 fragrant lotus flowers and panchamrit. Pandits recite the sacred Rigvedic Shree Suktam, Kanakadhara Stotram, and Kuber Dhanakarshan Mantras with Kamalgatta (lotus seed) rosaries. The Havan includes pure cow ghee, dry fruits, and kheer ahutis to stimulate wealth channels.",
    vidhiSteps: [
      "Shree Yantra & Kuber Yantra Sthapana",
      "Dhan-Aakarshan Sankalp with Devotee/Business Name",
      "16-Rik Rigvedic Shree Suktam Chanting (16 Cycles)",
      "Kuber Beej Mantra Jaap with Lotus Seed Mala",
      "Kamalgatta & Kheer Ahuti Havan in Sacred Fire",
      "Lakshmi Aarti & Kuber Dhana-Vridhi Blessings",
    ],
    keyInclusions: [
      "Personal/Business Sankalp for exponential financial growth",
      "Live footage and clips of Shree Suktam havan on WhatsApp",
      "Energized Brass Shree Yantra & Kuber Coin for cash locker",
      "Prasad & energized Gomti Chakra couriered to your doorstep",
    ],
    idealFor:
      "Entrepreneurs, business owners, professionals seeking promotion, and families desiring financial stability and debt relief.",
  },
  {
    id: "ganesh-pooja",
    name: "Siddhi Vinayak Ganesh Pooja",
    hindiName: "सिद्धि विनायक गणेश पूजा",
    price: 5000,
    category: "wealth",
    categoryLabel: "Wealth & Prosperity",
    benefit:
      "Vighnaharta blessings for successful new ventures, education and removal of obstacles.",
    icon: "Sun",
    duration: "2 Hours",
    pandits: "2 Vedic Brahmins",
    whyPerform:
      "Lord Ganesha is the 'Prathama Pujya' who removes all seen and unseen hurdles. Perfect before embarking on new businesses, property purchases, house warming, higher competitive exams, or when facing persistent administrative obstacles.",
    whatHappens:
      "Begins with 21 Durva grass offerings and red sindoor archan to Lord Ganesha. 21 recitations of Ganapati Atharvashirsha with perfect Vedic intonations are performed. A sacred Modak and Ghee havan is conducted to invoke Siddhi (accomplishment) and Buddhi (wisdom).",
    vidhiSteps: [
      "Deep Prajwalan & Swasti Vachan",
      "21 Durva Grass & Modak Archana to Lord Ganesha",
      "Sankalp for obstacle removal and new venture success",
      "Ganapati Atharvashirsha Path (21 Cycles)",
      "Vighnaharta Havan with Ghee, Sesame & Modaks",
      "Ganesh Aarti, Pushpanjali & Pradakshina",
    ],
    keyInclusions: [
      "Customized Sankalp for your specific project/exam/deal",
      "Video clips of Atharvashirsha path and Havan on WhatsApp",
      "Energized Ganesh Yantra / Silver Coin for your office/temple",
      "Sanctified dry-fruit Prasad delivered to your address",
    ],
    idealFor:
      "Anyone starting a new company, signing major contracts, students preparing for crucial exams, or moving into a new home.",
  },
  {
    id: "rudrabhishek",
    name: "Maha Rudrabhishek Pooja",
    hindiName: "द्वादश ज्योतिर्लिंग महारुद्राभिषेक",
    price: 5000,
    category: "health",
    categoryLabel: "Health & Protection",
    benefit:
      "Sacred Panchamrit abhishek of Lord Shiva for inner peace, purification and blessings.",
    icon: "Flame",
    duration: "2.5 – 3 Hours",
    pandits: "3 Vedic Shiva Priests",
    whyPerform:
      "Rudrabhishek is hailed as the ultimate Vedic remedy to wash away karmic impurities, cleanse planetary afflictions, cure psychosomatic ailments, and bring unshakeable mental fortitude and domestic peace.",
    whatHappens:
      "A continuous stream (Dhara) of sacred Gangajal, Cow Milk, Honey, Curd, Ghee, Sugarcane juice, and Panchamrit is poured over the sacred Narmadeshwar Shivling while the priests chant the Shukla Yajurveda Rudrashtadhyayi. Sacred Belpatra, Bhasma, and Dhatura are offered followed by a dedicated Shiva Havan.",
    vidhiSteps: [
      "Narmadeshwar Shivling Sthapana & Jalabhishek",
      "Sankalp with Devotee's Name, Gotra & Family Welfare",
      "Continuous Panchamrit & Gangajal Dhara Abhishekam",
      "Shukla Yajurveda Rudrashtadhyayi (Namakam-Chamakam) Path",
      "Bilva Patra & Bhasma Archana to Lord Mahadev",
      "Shiva Havan, Karpura Aarti & Shanti Paath",
    ],
    keyInclusions: [
      "Complete family Sankalp under the holy Rudradhara",
      "High-definition video clips of the Abhishekam on WhatsApp",
      "Sanctified Shiva Bhasma (vibhuti) & holy Rudraksha bead",
      "Dry-fruit Prasad couriered directly to your home",
    ],
    idealFor:
      "Spiritual seekers, families wanting harmony, people going through intense planetary testing, or chronic health issues.",
  },
  {
    id: "pitra-dosh",
    name: "Pitra Dosh Nivaran Pooja",
    hindiName: "पितृ दोष निवारण एवं शांति पूजा",
    price: 5000,
    category: "dosha",
    categoryLabel: "Planetary & Dosha Nivaran",
    benefit:
      "Ancestral peace, family progress, progeny blessings and removing inherited blocks.",
    icon: "Users",
    duration: "3 Hours",
    pandits: "2 Vedic Brahmins",
    whyPerform:
      "Afflictions in the 9th house of your kundli, Sun conjunct Rahu/Ketu, or lack of ancestral contentment causes Pitra Dosh. Typical signs include recurrent family disputes, inability to conceive children (vansh vridhi issues), sudden career drops, and pervasive melancholy.",
    whatHappens:
      "Conducted following Garuda Purana and Vedic Smriti traditions. Includes Pitru Tarpana with black sesame and kusha grass, Vishnu Sahasranama chanting, and offering sacred Pinda-Daan sankalpa. A dedicated Pitru Shanti Havan elevates ancestral souls to high spiritual realms, releasing their divine blessings upon the lineage.",
    vidhiSteps: [
      "Pitru Tarpana with Kusha, Til & Gangajal",
      "Pitra Dosh Nivaran Sankalp with Devotee's Gotra & Ancestral names",
      "Garuda Purana Pitra Suktam & Vishnu Sahasranama Chanting",
      "Til, Ghee & Samidha Pitru Shanti Havan",
      "Brahmin Bhojan & Gau-Seva (Cow feeding) Sankalp",
      "Pitra Ashirvad Aarti & Purna Ahuti",
    ],
    keyInclusions: [
      "Ancestral lineage Sankalp on your Gotra",
      "Real-time video clips of Tarpana and Havan sent on WhatsApp",
      "Energized Pitra Dosh Nivaran Kavach/Yantra",
      "Sanctified holy Prasad dispatched to your address",
    ],
    idealFor:
      "Families struggling with progeny delays, persistent domestic conflict, inherited health issues, or dream omens of ancestors.",
  },
  {
    id: "shiv-parvati-vivah",
    name: "Shiv Parvati Vivah Pooja",
    hindiName: "शिव-पार्वती विवाह एवं अखंड सौभाग्य पूजा",
    price: 5000,
    category: "marriage",
    categoryLabel: "Marriage & Relationship",
    benefit:
      "Ideal for finding the right life partner, timely marriage and lifelong affection.",
    icon: "HeartHandshake",
    duration: "2.5 Hours",
    pandits: "2 Vedic Brahmins",
    whyPerform:
      "Lord Shiva and Mata Parvati embody the divine archetypes of ideal matrimony and eternal devotion. This pooja is recommended when marriage is getting delayed, good proposals fall through at the last minute, or when married couples seek restoration of romance and mutual respect.",
    whatHappens:
      "Priests re-enact the symbolic spiritual union (Vivah) of Shiva and Parvati. The bride/groom's chart is kept in front of the altar. Sacred Katyayani Mantra and Gauri Stotram are chanted by the priests. The havan is performed with sweet samagri, honey, betel leaves, and clarified butter, invoking the blessings of Akhand Saubhagya.",
    vidhiSteps: [
      "Gauri-Shankar Pratima Sthapana & Divine Varmala",
      "Vivah Pratibandhak Dosh Nivaran Sankalp",
      "Katyayani Mantra & Parvati Stotram Chanting",
      "Vivah Bandhan Havan with Honey, Sandalwood & Sweet Samagri",
      "Saubhagya Sindoor & Haldi-Kumkum Abhimantran",
      "Maha Mangala Aarti & Akhand Dampatya Blessings",
    ],
    keyInclusions: [
      "Personalized Sankalp for timely marriage and harmonious partner",
      "Video clips of the Gauri-Shankar pujan sent via WhatsApp",
      "Blessed Gauri-Shankar Raksha Sutra & Saubhagya Sindoor",
      "Dry-fruit Prasad couriered to your home address",
    ],
    idealFor:
      "Unmarried individuals facing delays, parents searching for a compatible match for their child, or couples wanting deeper harmony.",
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
