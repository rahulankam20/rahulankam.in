// Every word, link and price on the site lives in this file.
// Edit it to update the site; the components in ./sections only lay it out.
// It is also read at build time (vite.config.ts) for the page title, link
// previews and search-engine data, so keep it plain data: no JSX, no browser APIs.

export const site = {
  url: "https://rahulankam.in",
  name: "Rahul Ankam",
  role: "AI-enabled full-stack developer",
  location: "Mumbai, India",
  locality: "Mumbai",
  region: "Maharashtra",
  email: "hello@rahulankam.in",
  phoneDisplay: "+91 84250 94452",
  phone: "+918425094452",
  // Country code + number, digits only. Leave empty to hide every WhatsApp button.
  whatsapp: "918425094452",
  whatsappMessage:
    "Hi Rahul, I saw your website. I'd like a free preview of a website for my business.",
  // Empty hides the link everywhere (contact, footer, search data). Hidden
  // until the profiles are ready; they were:
  // "https://www.linkedin.com/in/rahul-ankam/" and "https://github.com/rahulankam20".
  linkedin: "",
  github: "",
  // Set to "/RAHUL_ANKAM_RESUME.pdf" once that PDF includes MKCL; empty hides the Resume button.
  resumeUrl: "",
  // false turns the site into a plain developer portfolio: no prices, services,
  // process, free-preview offer or floating WhatsApp button.
  showServices: true,
};

export const seo = {
  title: "Rahul Ankam | Websites & Online Stores for Businesses | Mumbai",
  description:
    "Full-stack developer in Mumbai building fast, mobile-first websites and online stores with UPI checkout and GST invoices. See a free preview before you pay.",
  portfolioTitle: "Rahul Ankam | AI-Enabled Full-Stack Developer | Mumbai",
  portfolioDescription:
    "Rahul Ankam is an AI-enabled full-stack developer in Mumbai: React, Node.js, Java and Spring, and RAG chatbots on local LLMs.",
  image: "/og-image.jpg",
  imageAlt: "Rahul Ankam: websites and online stores, with screenshots of an online store built by Rahul",
};

export const nav = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services", servicesOnly: true },
  { href: "#process", label: "Process", servicesOnly: true },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export const hero = {
  eyebrow: "Rahul Ankam · Full-stack developer · Mumbai",
  title: "Websites and online stores that bring you customers.",
  // This word of the title is drawn in the orange gradient.
  titleHighlight: "customers.",
  // Small floating labels around the screenshots in the hero.
  badges: ["UPI + cash on delivery", "GST invoices built in"],
  subtitle:
    "I build fast, mobile-first websites for small businesses, and complete online stores with UPI checkout, GST invoices and an admin panel. See a free preview of your site before you pay anything.",
  points: ["Free preview in 48 hours", "Pay only if you like it", "Live in about a week"],
  primaryCta: "Get a free preview",
  secondaryCta: "See my work",
  // The screenshots beside the title: the online store on a computer and a phone.
  image: { src: "/images/store-home-desktop.webp", alt: "Store home page with a bold hero and the store's own sneaker artwork", width: 1366, height: 854 },
  phoneImage: { src: "/images/store-product-mobile.webp", alt: "Product page on a phone", width: 390, height: 844 },
  // The 60-second intro video (made in the shoe-resell workspace, videos/portfolio).
  // Its opening frame is the hero's card; the video loads only when the card is
  // pressed. An empty src brings back the screenshots above instead.
  video: {
    src: "/videos/intro.mp4",
    poster: "/images/intro-poster.webp",
    label: "Watch the intro video",
    tagline: "1 minute · all three demos in action",
    posterAlt: "The intro video's opening frame: three phones running the online store, the clinic website and the restaurant website",
    title: "Websites and online stores that bring you customers: a 60-second intro",
    description:
      "Three working demos in 60 seconds: an online store with UPI checkout and GST invoices, a clinic website in English, Marathi and Hindi that books on WhatsApp, and a restaurant website with a 44-dish menu and catering quotes.",
    uploadDate: "2026-10-25",
    duration: "PT60S",
    width: 1920,
    height: 1080,
  },
  // Shown instead when site.showServices is false.
  portfolioTitle: "Full-stack developer building fast, reliable web apps.",
  portfolioSubtitle:
    "Mumbai-based AI-enabled full-stack developer at MKCL. React and Node.js, Java and Spring, and RAG chatbots on local LLMs.",
};

// The scrolling strip under the hero.
export const marquee = [
  "Business websites",
  "Online stores",
  "UPI checkout",
  "Cash on delivery",
  "GST invoices",
  "WhatsApp-ready",
  "Mobile-first",
  "Google-ready SEO",
  "Free hosting",
  "Care plans",
];

export const work = {
  title: "Selected work",
  intro:
    "An online store, a clinic website in three languages, and a restaurant website with table bookings and catering quotes. Each is built to be rebranded, so your site starts from code that is already tested and working.",
};

// A screenshot, with its size in pixels so the page keeps its place while it loads.
export type Shot = { src: string; alt: string; width: number; height: number };

export type Project = {
  // The card's own link, handy to send to a client: rahulankam.in/#work-<id>
  id: string;
  kicker: string;
  title: string;
  summary: string;
  highlights: string[];
  stack: string[];
  // Count up when they scroll into view.
  stats: { value: number; prefix?: string; suffix?: string; label: string }[];
  note: string;
  // A WhatsApp button; servicesOnly hides it when site.showServices is false.
  cta: { label: string; message: string; servicesOnly?: boolean };
  // The demo's address once it's online. Empty hides the "View the live demo" button.
  liveUrl: string;
  // The first is shown wide and the next two side by side, with the phones below.
  // The two demo websites' screenshots come from scripts/screenshots.mjs.
  images: [Shot, Shot, Shot];
  phoneImages: [Shot, Shot];
};

// The Work section, one card per project, in this order.
export const projects: Project[] = [
  {
    id: "store",
    kicker: "Online store · E-commerce",
    title: "Online store for footwear and fashion brands",
    summary:
      "A white-label online store built for Indian sellers. Customers pick a size and pay by UPI, card or cash on delivery. The owner runs products, stock and orders from an admin panel.",
    highlights: [
      "UPI, cards and netbanking through Cashfree, plus cash on delivery",
      "Stock per size, cart, wishlist and order-status emails",
      "GST invoices and India's e-commerce rules built in",
      "Admin panel with two-step sign-in, and encrypted nightly backups",
      "Rebranded for a new brand in about a day: name, logo, colours and text",
      "300+ automated tests and a 200-shopper load test",
    ],
    stack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Docker", "Cashfree"],
    // All measured on the store itself.
    stats: [
      { value: 300, suffix: "+", label: "automated tests" },
      { value: 200, label: "shoppers at once in the load test" },
      { value: 0, label: "items oversold under that load" },
      { value: 8, label: "automatic order emails" },
    ],
    note: "The screenshots and the live demo show the same store under two different brands: that's the rebranding at work. Payments on the live demo run in Cashfree's test mode, so nothing is charged. The code is private.",
    cta: {
      label: "Get a store like this",
      message: "Hi Rahul, I saw your online store demo. I'd like a store like it for my business.",
      servicesOnly: true,
    },
    liveUrl: "https://shop.rahulankam.in/",
    images: [
      { src: "/images/store-shop-desktop.webp", alt: "Product grid with filters for brand, category, size and price", width: 1366, height: 854 },
      { src: "/images/store-product-desktop.webp", alt: "Product page with price, discount and UK size selection", width: 1366, height: 854 },
      { src: "/images/store-cart-desktop.webp", alt: "Cart with order summary and UPI checkout through Cashfree", width: 1366, height: 854 },
    ],
    phoneImages: [
      { src: "/images/store-home-mobile.webp", alt: "Store home page on a phone", width: 390, height: 844 },
      { src: "/images/store-product-mobile.webp", alt: "Product page on a phone", width: 390, height: 844 },
    ],
  },
  {
    id: "dental",
    kicker: "Clinic website · Healthcare",
    title: "Dental clinic website in English, Marathi and Hindi",
    summary:
      "A demo website for Mogra Dental Care, a fictional clinic in Nerul, Navi Mumbai. Patients see the timings, what each treatment involves and where its charges start, and book an appointment on WhatsApp in their own language.",
    highlights: [
      "English, Marathi and Hindi, with a one-tap language switch",
      "Booking on WhatsApp: the patient picks a day and a time of day, and WhatsApp opens with the message ready",
      "A live \"Open now\" badge, the week's timings and holiday closures",
      "Each treatment explained, with its starting charge",
      "Checked automatically for what dental advertising rules don't allow, such as discounts, testimonials and before-and-after photos",
      "Call, WhatsApp and directions buttons always in reach on a phone",
    ],
    stack: ["Astro", "TypeScript", "Tailwind CSS", "Zod", "Cloudflare"],
    // Scores from Google Lighthouse, on a phone, on every language's page.
    stats: [
      { value: 3, label: "languages: English, Marathi and Hindi" },
      { value: 97, suffix: "+", label: "speed score on a phone (Google Lighthouse)" },
      { value: 100, label: "accessibility score (Google Lighthouse)" },
      { value: 0, prefix: "₹", label: "a month for hosting" },
    ],
    note: "Its dentists and charges are examples. On the demo, calls and WhatsApp messages come to me.",
    cta: {
      label: "Get a website like this",
      message: "Hi Rahul, I saw your dental clinic website. I'd like a website like it for my business.",
      servicesOnly: true,
    },
    liveUrl: "https://dental.rahulankam.in/",
    images: [
      {
        src: "/images/dental-home-desktop.webp",
        alt: "Mogra Dental Care's home page: a photo of the clinic, an \"Open now\" badge, a Book on WhatsApp button and the week's timings",
        width: 1366,
        height: 854,
      },
      { src: "/images/dental-treatments-desktop.webp", alt: "Treatments and charges: what each treatment involves, how long it takes and its starting charge", width: 1366, height: 854 },
      { src: "/images/dental-booking-desktop.webp", alt: "Appointment form: the patient picks a treatment, a day and a time of day, then sends it on WhatsApp", width: 1366, height: 854 },
    ],
    phoneImages: [
      { src: "/images/dental-home-mobile.webp", alt: "The clinic's home page on a phone, with call, WhatsApp and directions buttons along the bottom", width: 390, height: 844 },
      { src: "/images/dental-marathi-mobile.webp", alt: "The same page in Marathi on a phone", width: 390, height: 844 },
    ],
  },
  {
    id: "restaurant",
    kicker: "Restaurant website · Food and catering",
    title: "Restaurant website with table bookings and catering quotes",
    summary:
      "A demo website for a fictional North and South Indian restaurant and caterer in Vashi, Navi Mumbai. Guests browse the menu and order on Swiggy or Zomato, or ask for a table or a catering quote, which reaches the restaurant by email.",
    highlights: [
      "A 44-dish menu that filters by diet and spice, with FSSAI allergens on every dish",
      "Swiggy and Zomato buttons, plus table requests and catering quotes emailed to the restaurant",
      "Catering packages priced per plate, for 25 to 500 guests",
      "Spam protection on both forms: Cloudflare Turnstile, a hidden trap field and a rate limit",
      "A live \"Open now\" badge, with Sunday breakfast, late weekends and festival timings",
      "Restaurant, menu and timings details that Google can read",
    ],
    stack: ["Astro", "TypeScript", "Tailwind CSS", "Zod", "Cloudflare Workers", "Turnstile", "Brevo"],
    // Scores from Google Lighthouse, on a phone, on the home page.
    stats: [
      { value: 44, label: "dishes, each with its allergens" },
      { value: 97, suffix: "+", label: "speed score on a phone (Google Lighthouse)" },
      { value: 100, label: "accessibility score (Google Lighthouse)" },
      { value: 0, label: "personal details kept by the website" },
    ],
    note: "Its menu, prices and story are examples. On the demo, calls and requests come to me.",
    cta: {
      label: "Get a website like this",
      message: "Hi Rahul, I saw your restaurant website. I'd like a website like it for my business.",
      servicesOnly: true,
    },
    liveUrl: "https://restaurant.rahulankam.in/",
    images: [
      {
        src: "/images/restaurant-home-desktop.webp",
        alt: "The restaurant's home page: a thali in an arched frame, an \"Open now\" badge, and buttons to order on Swiggy or Zomato, book a table or ask for a catering quote",
        width: 1366,
        height: 854,
      },
      { src: "/images/restaurant-menu-desktop.webp", alt: "The menu filtered to Jain dishes, with diet labels, spice level and allergens on each dish", width: 1366, height: 854 },
      { src: "/images/restaurant-catering-desktop.webp", alt: "Catering packages priced per plate, from a puja to a wedding, set as invitation cards", width: 1366, height: 854 },
    ],
    phoneImages: [
      { src: "/images/restaurant-home-mobile.webp", alt: "The restaurant's home page on a phone", width: 390, height: 844 },
      { src: "/images/restaurant-menu-mobile.webp", alt: "The menu's diet and spice filters on a phone", width: 390, height: 844 },
    ],
  },
];

export const services = {
  title: "What I can build for you",
  intro: "Clear prices, a fixed scope, and a free preview before you pay.",
  offer: "Founding offer: 40% off for my first 3 website clients.",
  packages: [
    {
      name: "Starter website",
      price: "₹9,999",
      founding: "₹5,999",
      blurb: "One page for shops, clinics, salons, tutors and restaurants.",
      delivery: "Live in about a week",
      features: [
        "Mobile-first one-page design",
        "Services, photos, reviews and map",
        "WhatsApp and call buttons, enquiry form",
        "Basic Google setup so customers find you",
      ],
      cta: "Get a free preview",
      message: "Hi Rahul, I'd like a free preview of a one-page website for my business.",
    },
    {
      name: "Business website",
      price: "₹19,999",
      founding: "From ₹11,999",
      blurb: "5 to 7 pages for a growing business.",
      delivery: "Live in about 2 weeks",
      features: [
        "Everything in Starter",
        "Home, About, Services, Gallery and Contact pages",
        "Google Business Profile link and analytics",
        "Blog-ready, and speed-tuned for phones",
      ],
      cta: "Get a free preview",
      message: "Hi Rahul, I'd like a free preview of a business website.",
      highlight: true,
    },
    {
      name: "Online store",
      price: "Price on request",
      blurb: "Your own store with UPI, cash on delivery and GST invoices. No platform fee per sale.",
      delivery: "Live in about 2 weeks",
      features: [
        "Products with sizes and stock",
        "UPI, cards and COD into your own Cashfree account",
        "Admin panel for orders and stock",
        "GST invoices and policy pages",
      ],
      cta: "Ask for a demo",
      message: "Hi Rahul, I'd like a demo of your online store.",
    },
  ],
  care: {
    name: "Care plan",
    price: "₹999 a month",
    description: "Hosting and SSL, backups, updates, and small edits every month. Cancel any time.",
  },
  abroad: "Outside India? I work with clients worldwide. Prices in USD on request.",
};

export const howItWorks = {
  title: "How it works",
  steps: [
    {
      title: "Free preview",
      text: "Send me your business name and a few details. Within 48 hours I'll show you a preview of your homepage.",
    },
    {
      title: "Approve and start",
      text: "Like it? Pay 50% to start. Two rounds of changes are included.",
    },
    {
      title: "Go live",
      text: "Pay the rest and your site goes live on your own web address, usually within a week.",
    },
    {
      title: "Care (optional)",
      text: "I keep it fast, secure and up to date, and make small edits for you.",
    },
  ],
};

export const whyMe = {
  title: "Why work with me",
  // icon: one of "phone", "key", "zap", "shield", "chat", "pin" (see sections/WhyMe.tsx).
  points: [
    {
      icon: "phone",
      title: "Built for phones",
      text: "Most customers will find you on their phone, so every page is designed for small screens first and loads fast.",
    },
    {
      icon: "key",
      title: "You own everything",
      text: "Your domain, your content and your website stay yours. No lock-in.",
    },
    {
      icon: "zap",
      title: "Faster with AI",
      text: "I use AI coding tools every day, so you get a finished site in days, not months.",
    },
    {
      icon: "shield",
      title: "Professional engineering",
      text: "I build software for a living, so your site gets clean code, security and backups.",
    },
    {
      icon: "chat",
      title: "Easy to reach",
      text: "Message me on WhatsApp and get a reply the same day.",
    },
    {
      icon: "pin",
      title: "Local and online",
      text: "Based in Mumbai. I can meet you anywhere in Mumbai or Navi Mumbai, and I work with clients anywhere online.",
    },
  ],
};

export const about = {
  title: "About me",
  paragraphs: [
    "I'm Rahul, an AI-enabled full-stack developer from Mumbai. Since April 2026 I've worked at Maharashtra Knowledge Corporation Ltd (MKCL) in Seawoods, Navi Mumbai, where I work on a legacy Java and Spring application and built a RAG chatbot end to end on my own, running on local LLMs.",
    "Before MKCL I was a full-stack intern, building backends with NestJS, Prisma and PostgreSQL and moving a large React app to Next.js. I use AI coding tools every day, including vibe coding to get from idea to working prototype fast, and I review and test what they produce.",
  ],
  // Shown only when site.showServices is true.
  servicesParagraph:
    "I also build websites and online stores for small businesses: fast, mobile-first and easy to manage.",
  experience: [
    {
      role: "AI-Enabled Full Stack Developer",
      org: "Maharashtra Knowledge Corporation Ltd (MKCL)",
      place: "Seawoods, Navi Mumbai",
      period: "Apr 2026 – Present",
      points: [
        "Work on a legacy Java and Spring application.",
        "Built a RAG (retrieval-augmented generation) chatbot application end to end, on my own, using locally hosted LLMs.",
      ],
    },
    {
      role: "Full Stack Developer Intern",
      org: "",
      place: "",
      period: "Aug 2025 – Mar 2026",
      points: [
        "Built the backend of a bidding website end to end with my mentor, and integrated the WhatsApp Business API for automated messages.",
        "Migrated a large React application to Next.js for better SEO and faster loading.",
        "Built backend modules and REST APIs with NestJS, Prisma and PostgreSQL.",
      ],
    },
  ],
  education: [
    {
      degree: "B.E., Electronics and Telecommunication",
      school: "Terna Engineering College, University of Mumbai",
      period: "2021 – 2025",
    },
    {
      degree: "HSC, Computer Science",
      school: "Andhra Education Society's Junior College",
      period: "2019 – 2021",
    },
  ],
  skills: [
    { group: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML & CSS"] },
    { group: "Backend", items: ["Node.js", "Express", "NestJS", "Java", "Spring", "REST APIs"] },
    { group: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "Prisma"] },
    { group: "AI", items: ["RAG", "Local LLMs", "AI-assisted coding", "Vibe coding", "Claude Code", "Cursor", "n8n automation"] },
    { group: "Tools", items: ["Git & GitHub", "Docker", "Cloudflare", "Vercel", "Render"] },
  ],
};

export const faq = {
  title: "Questions",
  items: [
    {
      q: "Do I own the website?",
      a: "Yes. The domain is registered in your name, and the content and website are yours once paid for.",
    },
    {
      q: "What do I need to give you?",
      a: "Your logo, a few photos, your services or products with prices, and your contact details. I can help write the text.",
    },
    {
      q: "How long does it take?",
      a: "You see a preview within 48 hours. A one-page site goes live about a week after you approve it; bigger sites take about two weeks.",
    },
    {
      q: "What does it cost to keep the site running?",
      a: "Your domain costs roughly ₹500–1,000 a year, paid to the registrar. Hosting for most business sites is free. The care plan is optional.",
    },
    {
      q: "Can you build an online store?",
      a: "Yes. I have my own store system for Indian sellers: UPI, cards and cash on delivery through your own Cashfree account, GST invoices and an admin panel. Ask for a demo.",
    },
    {
      q: "Do you work with clients outside India?",
      a: "Yes. We work over WhatsApp, email and video calls, and you pay by international transfer in USD.",
    },
    {
      q: "Can you fix or redesign my current website?",
      a: "Yes. Send me the link and I'll tell you what I'd change and what it would cost.",
    },
  ],
};

export const contact = {
  title: "Tell me about your business",
  subtitle: "Get a free preview of your website within 48 hours. You pay only if you like it.",
  portfolioTitle: "Get in touch",
  portfolioSubtitle: "Questions, opportunities or a project in mind? I'd love to hear from you.",
  replyTime: "I usually reply within a few hours.",
  form: {
    name: "Your name",
    business: "Business name (optional)",
    email: "Email address",
    phone: "Phone or WhatsApp (optional)",
    message: "What does your business do, and what do you need?",
    submit: "Send message",
    sending: "Sending…",
    success: "Thanks! Your message is on its way. I'll get back to you soon.",
    error: "Sorry, that didn't send. Please try again, or message me on WhatsApp.",
  },
  // EmailJS sends the form to your inbox from the browser (free plan: 200 a
  // month). The public key is meant to be public; Contact.tsx turns on EmailJS's
  // free bot blocking and rate limit, since its domain allowlist is paid-only.
  emailjs: {
    serviceId: "service_orlhxwb",
    templateId: "template_vmwd3ig",
    publicKey: "e5M9SA35EKG2IHgzd",
  },
};

// The band just before the contact form (shown with the services).
export const ctaBand = {
  title: "Ready to see your website?",
  text: "Send me your business name. Within 48 hours you'll see a preview of your new site, and you pay only if you like it.",
  primary: "Get my free preview",
  secondary: "Or fill the form",
};

export const footer = {
  tagline: "Websites, online stores and full-stack development · Mumbai",
};
