// Every word, link and price on the site lives in this file.
// Edit it to update the site; the components in ./sections only lay it out.
// It is also read at build time (vite.config.ts) for the page title, link
// previews and search-engine data, so keep it plain data: no JSX, no browser APIs.

export const site = {
  url: "https://rahulankam.in",
  name: "Rahul Ankam",
  role: "AI-enabled full-stack developer",
  location: "Navi Mumbai, India",
  locality: "Navi Mumbai",
  region: "Maharashtra",
  email: "rahulankam1234@gmail.com", // switch to your Zoho address once it receives mail
  phoneDisplay: "+91 84250 94452",
  phone: "+918425094452",
  // Country code + number, digits only. Leave empty to hide every WhatsApp button.
  whatsapp: "918425094452",
  whatsappMessage:
    "Hi Rahul, I saw your website. I'd like a free preview of a website for my business.",
  linkedin: "https://www.linkedin.com/in/rahul-ankam/",
  github: "https://github.com/rahulankam20",
  // Set to "/RAHUL_ANKAM_RESUME.pdf" once that PDF includes MKCL; empty hides the Resume button.
  resumeUrl: "",
  // false turns the site into a plain developer portfolio: no prices, services,
  // process, free-preview offer or floating WhatsApp button.
  showServices: true,
};

export const seo = {
  title: "Rahul Ankam | Websites & Online Stores for Businesses | Navi Mumbai",
  description:
    "Full-stack developer in Navi Mumbai building fast, mobile-first websites and online stores with UPI checkout and GST invoices. See a free preview before you pay.",
  portfolioTitle: "Rahul Ankam | AI-Enabled Full-Stack Developer | Navi Mumbai",
  portfolioDescription:
    "Rahul Ankam is an AI-enabled full-stack developer in Navi Mumbai: React, Node.js, Java and Spring, and RAG chatbots on local LLMs.",
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
  eyebrow: "Rahul Ankam · Full-stack developer · Navi Mumbai",
  title: "Websites and online stores that bring you customers.",
  subtitle:
    "I build fast, mobile-first websites for small businesses, and complete online stores with UPI checkout, GST invoices and an admin panel. See a free preview of your site before you pay anything.",
  points: ["Free preview in 48 hours", "Pay only if you like it", "Live in about a week"],
  primaryCta: "Get a free preview",
  secondaryCta: "See my work",
  // Shown instead when site.showServices is false.
  portfolioTitle: "Full-stack developer building fast, reliable web apps.",
  portfolioSubtitle:
    "AI-enabled full-stack developer at MKCL, Navi Mumbai. React and Node.js, Java and Spring, and RAG chatbots on local LLMs.",
};

export const featured = {
  kicker: "Featured project · E-commerce",
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
  note: "The demo uses fictional products and simulated payments. The code is private; a live demo is available on request.",
  demoCta: "Ask for a live demo",
  demoMessage: "Hi Rahul, I'd like a live demo of your online store.",
  images: [
    { src: "/images/store-home-desktop.webp", alt: "Store home page with a bold hero and the store's own sneaker artwork", width: 1366, height: 854 },
    { src: "/images/store-shop-desktop.webp", alt: "Product grid with filters for brand, category, size and price", width: 1366, height: 854 },
    { src: "/images/store-product-desktop.webp", alt: "Product page with price, discount and UK size selection", width: 1366, height: 854 },
    { src: "/images/store-cart-desktop.webp", alt: "Cart with order summary and UPI checkout through Cashfree", width: 1366, height: 854 },
  ],
  phoneImages: [
    { src: "/images/store-home-mobile.webp", alt: "Store home page on a phone", width: 390, height: 844 },
    { src: "/images/store-product-mobile.webp", alt: "Product page on a phone", width: 390, height: 844 },
  ],
};

export const learningProjects = {
  title: "Earlier projects",
  intro: "Projects from my learning years, each live online.",
  items: [
    {
      title: "Stock trading platform (Zerodha clone)",
      description: "A full-stack trading interface with portfolios and transactions stored in MongoDB.",
      stack: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
      url: "https://zerodha-frontend-tau.vercel.app/",
    },
    {
      title: "Real-time weather app",
      description: "Live weather for cities worldwide, from an external API, in a clean Material UI dashboard.",
      stack: ["React", "Material UI", "REST API"],
      url: "https://real-time-weather-tau.vercel.app/",
    },
    {
      title: "Gym website",
      description: "A responsive website for a fitness business: memberships, amenities and a free-trial booking.",
      stack: ["HTML", "CSS", "JavaScript"],
      url: "https://rafitness.vercel.app/",
    },
    {
      title: "Amazon landing page clone",
      description: "A pixel-accurate copy of a large e-commerce home page, built to practise layout.",
      stack: ["HTML", "CSS"],
      url: "https://amazons-cloneweb.vercel.app/",
    },
    {
      title: "Tic-tac-toe",
      description: "A two-player browser game with win and draw detection.",
      stack: ["HTML", "CSS", "JavaScript"],
      url: "https://tic-tac-toe-game-zeta-one.vercel.app/",
    },
  ],
};

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
      text: "Based in Navi Mumbai. I can meet you in Mumbai or Navi Mumbai, and I work with clients anywhere online.",
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

export const footer = {
  tagline: "Websites, online stores and full-stack development · Navi Mumbai",
};
