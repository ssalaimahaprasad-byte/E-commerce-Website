export interface MockProduct {
  id: string;
  slug: string;
  sku: string;
  name: string;
  brand: string;
  description: string;
  specs: Record<string, string>;
  priceMinor: number;
  mrpMinor: number;
  stock: number;
  rating: number;
  ratingCount: number;
  popularity: number;
  active: boolean;
  categoryId: string;
  category: { id: string; name: string; slug: string };
  images: { id: string; url: string; position: number }[];
  variants?: { id: string; label: string; stock: number }[];
  reviews?: { id: string; author: string; rating: number; title: string; comment: string; date: string; verified: boolean }[];
  isBestSeller?: boolean;
  isAmazonChoice?: boolean;
  isDealOfTheDay?: boolean;
  dealDiscountPercent?: number;
  primeEligible?: boolean;
}

export interface MockCategory {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  banner?: string;
}

export const CATEGORIES: MockCategory[] = [
  { id: "cat-electronics", name: "Electronics", slug: "electronics" },
  { id: "cat-mobiles", name: "Mobiles", slug: "mobiles" },
  { id: "cat-computers", name: "Computers", slug: "computers" },
  { id: "cat-fashion", name: "Fashion", slug: "fashion" },
  { id: "cat-home", name: "Home & Kitchen", slug: "home-and-kitchen" },
  { id: "cat-beauty", name: "Beauty", slug: "beauty" },
  { id: "cat-grocery", name: "Grocery", slug: "grocery" },
  { id: "cat-sports", name: "Sports", slug: "sports" },
  { id: "cat-toys", name: "Toys", slug: "toys" },
  { id: "cat-accessories", name: "Accessories", slug: "accessories" },
];

export const PRODUCTS: MockProduct[] = [
  // --- Electronics & Audio ---
  {
    id: "prod-sony-wh1000xm5",
    slug: "sony-wh-1000xm5-wireless-noise-cancelling-headphones",
    sku: "SNY-XM5-BLK",
    name: "Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones with Auto NC Optimizer, Crystal Clear Hands-Free Calling, Black",
    brand: "Sony",
    description: "The Sony WH-1000XM5 headphones rewrite the rules for distraction-free listening. 2 processors control 8 microphones for unprecedented noise cancellation and exceptional call quality. Newly developed 30mm carbon fiber driver unit delivers superlative sound quality with LDAC high-res wireless audio.",
    specs: {
      "Brand": "Sony",
      "Model Name": "WH-1000XM5",
      "Color": "Black",
      "Form Factor": "Over Ear",
      "Connectivity": "Wireless, Bluetooth 5.2",
      "Battery Life": "30 Hours with ANC",
      "Special Feature": "Active Noise Cancellation, Multipoint Pairing, Speak-to-Chat",
    },
    priceMinor: 2699000,
    mrpMinor: 3499000,
    stock: 24,
    rating: 4.6,
    ratingCount: 14820,
    popularity: 98,
    active: true,
    categoryId: "cat-electronics",
    category: { id: "cat-electronics", name: "Electronics", slug: "electronics" },
    images: [
      { id: "img-xm5-1", url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80", position: 0 },
      { id: "img-xm5-2", url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80", position: 1 },
    ],
    isAmazonChoice: true,
    primeEligible: true,
    isDealOfTheDay: true,
    dealDiscountPercent: 23,
    reviews: [
      { id: "r1", author: "Rahul Sharma", rating: 5, title: "Unbeatable noise cancellation!", comment: "I use these during daily flights and remote work. The silence is stunning, and the battery life easily lasts a whole week of work.", date: "12 Oct 2026", verified: true },
      { id: "r2", author: "Priya V.", rating: 5, title: "Super lightweight and premium", comment: "Much more comfortable than the XM4 for long sessions. Soundstage is crisp and punchy.", date: "28 Sep 2026", verified: true },
    ],
  },
  {
    id: "prod-boat-airdopes-141",
    slug: "boat-airdopes-141-bluetooth-truly-wireless-earbuds",
    sku: "BOAT-AD141-CBL",
    name: "boAt Airdopes 141 Bluetooth Truly Wireless in Ear Earbuds with 42H Playtime, Beast Mode ENx Tech, ASAP Charge, IWP, IPX4 Water Resistance (Bold Black)",
    brand: "boAt",
    description: "Lock into your rhythm with boAt Airdopes 141 TWS earbuds. Enjoy up to 42 hours of nonstop playback. Equipped with BEAST mode for low latency gaming and ENx tech for clear calling experience.",
    specs: {
      "Brand": "boAt",
      "Model Name": "Airdopes 141",
      "Color": "Bold Black",
      "Connectivity": "Bluetooth 5.1",
      "Playtime": "Up to 42 Hours",
      "Water Resistance": "IPX4",
    },
    priceMinor: 119900,
    mrpMinor: 449000,
    stock: 140,
    rating: 4.1,
    ratingCount: 189500,
    popularity: 99,
    active: true,
    categoryId: "cat-electronics",
    category: { id: "cat-electronics", name: "Electronics", slug: "electronics" },
    images: [
      { id: "img-boat-1", url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80", position: 0 },
      { id: "img-boat-2", url: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&auto=format&fit=crop&q=80", position: 1 },
    ],
    isBestSeller: true,
    primeEligible: true,
    reviews: [
      { id: "r3", author: "Amit K.", rating: 4, title: "Great value for money", comment: "Bass is heavy, battery backup is ridiculous for under 1500 rupees.", date: "05 Oct 2026", verified: true },
    ],
  },
  {
    id: "prod-apple-airpods-pro-2",
    slug: "apple-airpods-pro-2nd-gen-usb-c",
    sku: "APL-APP2-USBC",
    name: "Apple AirPods Pro (2nd Generation) with MagSafe Case (USB-C) ​​​​​​​Active Noise Cancellation, Transparency, Personalized Spatial Audio",
    brand: "Apple",
    description: "AirPods Pro (2nd generation) with USB-C deliver up to 2x more Active Noise Cancellation than previous generation, with Transparency mode and Adaptive Audio that tailors noise control to your environment.",
    specs: {
      "Brand": "Apple",
      "Model Name": "AirPods Pro 2",
      "Color": "White",
      "Connector": "USB Type-C",
      "Battery": "Up to 6 hours listening with ANC (30h with case)",
      "Chip": "Apple H2 headphone chip",
    },
    priceMinor: 2099000,
    mrpMinor: 2490000,
    stock: 35,
    rating: 4.7,
    ratingCount: 32400,
    popularity: 96,
    active: true,
    categoryId: "cat-electronics",
    category: { id: "cat-electronics", name: "Electronics", slug: "electronics" },
    images: [
      { id: "img-app2-1", url: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=80", position: 0 },
      { id: "img-app2-2", url: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&auto=format&fit=crop&q=80", position: 1 },
    ],
    isAmazonChoice: true,
    primeEligible: true,
  },

  // --- Amazon Devices ---
  {
    id: "prod-echo-dot-5th-gen",
    slug: "echo-dot-5th-gen-smart-speaker-with-alexa",
    sku: "AMZ-ECHO5-BLK",
    name: "All-New Echo Dot (5th Gen, 2024 release) | Smart speaker with bigger sound, deeper bass and Alexa (Black)",
    brand: "Amazon",
    description: "Our best-sounding Echo Dot yet – Enjoy an improved audio experience compared to any previous Echo Dot with Alexa for clearer vocals, deeper bass and vibrant sound in any room. Ask Alexa for music, weather, alarms, cricket scores, and smart home control.",
    specs: {
      "Brand": "Amazon",
      "Model Name": "Echo Dot 5th Gen",
      "Color": "Black",
      "Voice Assistant": "Alexa Built-in (English & Hindi)",
      "Audio": "1.73” front-firing speaker, Lossless High Definition",
      "Connectivity": "Dual-band Wi-Fi, Bluetooth Low Energy",
    },
    priceMinor: 449900,
    mrpMinor: 549900,
    stock: 120,
    rating: 4.5,
    ratingCount: 78900,
    popularity: 97,
    active: true,
    categoryId: "cat-devices",
    category: { id: "cat-devices", name: "Amazon Devices", slug: "amazon-devices" },
    images: [
      { id: "img-echo-1", url: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&auto=format&fit=crop&q=80", position: 0 },
      { id: "img-echo-2", url: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=800&auto=format&fit=crop&q=80", position: 1 },
    ],
    isBestSeller: true,
    primeEligible: true,
    isDealOfTheDay: true,
    dealDiscountPercent: 18,
  },
  {
    id: "prod-fire-tv-stick-4k",
    slug: "fire-tv-stick-4k-streaming-device-with-alexa-voice-remote",
    sku: "AMZ-FTV4K-MAX",
    name: "Fire TV Stick 4K streaming device, supports Wi-Fi 6, Dolby Vision/Atmos, HDR10+, Alexa Voice Remote with TV controls",
    brand: "Amazon",
    description: "Cinematic 4K streaming experience with support for Dolby Vision, HDR10+, and immersive Dolby Atmos audio. Stream more than a million movies and TV episodes from Netflix, Prime Video, Disney+ Hotstar, and more.",
    specs: {
      "Brand": "Amazon",
      "Model Name": "Fire TV Stick 4K",
      "Resolution": "4K Ultra HD up to 60fps",
      "Audio Support": "Dolby Atmos, 7.1 surround sound",
      "Storage": "8 GB internal",
      "Remote": "Alexa Voice Remote with power and volume buttons",
    },
    priceMinor: 399900,
    mrpMinor: 599900,
    stock: 85,
    rating: 4.6,
    ratingCount: 65120,
    popularity: 95,
    active: true,
    categoryId: "cat-devices",
    category: { id: "cat-devices", name: "Amazon Devices", slug: "amazon-devices" },
    images: [
      { id: "img-ftv-1", url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80", position: 0 },
    ],
    isAmazonChoice: true,
    primeEligible: true,
  },
  {
    id: "prod-kindle-paperwhite-16gb",
    slug: "kindle-paperwhite-16-gb-6-8-display",
    sku: "AMZ-KNDL-PW16",
    name: "Kindle Paperwhite (16 GB) – 6.8″ display with adjustable warm light, up to 10 weeks of battery life, and 20% faster page turns (Black)",
    brand: "Amazon",
    description: "Purpose-built for reading with a flush-front design and 300 ppi glare-free display that reads like real paper, even in bright sunlight. Waterproof (IPX8) reading in the bath or by the pool.",
    specs: {
      "Brand": "Amazon",
      "Display": "6.8” Paperwhite display with built-in light, 300 ppi",
      "Storage": "16 GB",
      "Battery Life": "Up to 10 weeks",
      "Waterproofing": "IPX8 (2 meters fresh water for 60 mins)",
    },
    priceMinor: 1399900,
    mrpMinor: 1499900,
    stock: 40,
    rating: 4.7,
    ratingCount: 19400,
    popularity: 91,
    active: true,
    categoryId: "cat-devices",
    category: { id: "cat-devices", name: "Amazon Devices", slug: "amazon-devices" },
    images: [
      { id: "img-kndl-1", url: "https://images.unsplash.com/photo-1592496001020-d31bd830651f?w=800&auto=format&fit=crop&q=80", position: 0 },
    ],
    isAmazonChoice: true,
    primeEligible: true,
  },

  // --- Mobiles & Smartphones ---
  {
    id: "prod-iphone-15-pro",
    slug: "apple-iphone-15-pro-128-gb-natural-titanium",
    sku: "APL-IP15P-128-NAT",
    name: "Apple iPhone 15 Pro (128 GB) - Natural Titanium | Titanium Design, A17 Pro Chip, 48MP Main Camera, Action Button, USB-C",
    brand: "Apple",
    description: "Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and a more versatile pro camera system with 48MP resolution and next-generation portraits.",
    specs: {
      "Brand": "Apple",
      "Model Name": "iPhone 15 Pro",
      "Color": "Natural Titanium",
      "Storage": "128 GB",
      "Display": "6.1-inch Super Retina XDR with ProMotion 120Hz",
      "Processor": "A17 Pro chip with 6-core GPU",
      "Camera": "48MP Main + 12MP Ultra Wide + 12MP 3x Telephoto",
    },
    priceMinor: 11990000,
    mrpMinor: 13490000,
    stock: 18,
    rating: 4.7,
    ratingCount: 8450,
    popularity: 98,
    active: true,
    categoryId: "cat-mobiles",
    category: { id: "cat-mobiles", name: "Mobiles & Accessories", slug: "mobiles" },
    images: [
      { id: "img-ip15-1", url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80", position: 0 },
      { id: "img-ip15-2", url: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80", position: 1 },
    ],
    isAmazonChoice: true,
    primeEligible: true,
  },
  {
    id: "prod-samsung-s24-ultra",
    slug: "samsung-galaxy-s24-ultra-5g-titanium-gray-256gb",
    sku: "SAM-S24U-256-GRY",
    name: "Samsung Galaxy S24 Ultra 5G (Titanium Gray, 12GB, 256GB Storage) | Galaxy AI, 200MP Camera, S Pen Included, Snapdragon 8 Gen 3",
    brand: "Samsung",
    description: "Meet Galaxy S24 Ultra, the ultimate form of Galaxy Ultra with a new titanium exterior and a 6.8-inch flat display. Galaxy AI is here: Circle to Search with Google, Live Translate, Note Assist and Photo Assist.",
    specs: {
      "Brand": "Samsung",
      "Model Name": "Galaxy S24 Ultra",
      "Color": "Titanium Gray",
      "RAM / Storage": "12GB RAM, 256GB Storage",
      "Display": "6.8” Dynamic AMOLED 2X QHD+ 120Hz 2600 nits",
      "Camera": "200MP + 50MP + 12MP + 10MP Quad Camera",
      "Battery": "5000 mAh with 45W Fast Charging",
    },
    priceMinor: 12999900,
    mrpMinor: 13499900,
    stock: 14,
    rating: 4.6,
    ratingCount: 4210,
    popularity: 94,
    active: true,
    categoryId: "cat-mobiles",
    category: { id: "cat-mobiles", name: "Mobiles & Accessories", slug: "mobiles" },
    images: [
      { id: "img-s24-1", url: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80", position: 0 },
    ],
    isBestSeller: true,
    primeEligible: true,
  },
  {
    id: "prod-oneplus-12r",
    slug: "oneplus-12r-cool-blue-16gb-ram-256gb-storage",
    sku: "OP-12R-256-BLU",
    name: "OnePlus 12R (Cool Blue, 16GB RAM, 256GB Storage) | Snapdragon 8 Gen 2, 1.5K 120Hz ProXDR Display, 5500 mAh Battery, 100W SUPERVOOC",
    brand: "OnePlus",
    description: "Driven by an extreme combination of performance and design, the OnePlus 12R delivers flagship-grade power, cutting-edge ProXDR display with 4th Gen LTPO, and industry-leading cooling system.",
    specs: {
      "Brand": "OnePlus",
      "Model Name": "12R",
      "Color": "Cool Blue",
      "RAM / Storage": "16GB RAM, 256GB Storage",
      "Display": "6.78” 1.5K 120Hz AMOLED ProXDR",
      "Battery": "5500 mAh + 100W Charger in box",
    },
    priceMinor: 4299900,
    mrpMinor: 4599900,
    stock: 52,
    rating: 4.5,
    ratingCount: 16800,
    popularity: 93,
    active: true,
    categoryId: "cat-mobiles",
    category: { id: "cat-mobiles", name: "Mobiles & Accessories", slug: "mobiles" },
    images: [
      { id: "img-op-1", url: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80", position: 0 },
    ],
    isBestSeller: true,
    primeEligible: true,
  },

  // --- Computers & Laptops ---
  {
    id: "prod-macbook-air-m3",
    slug: "apple-macbook-air-15-inch-m3-chip-16gb-512gb-midnight",
    sku: "APL-MBA15-M3-MDN",
    name: "Apple 2024 MacBook Air 15″ Laptop with M3 chip: 15.3-inch Liquid Retina Display, 16GB Unified Memory, 512GB SSD Storage, 1080p FaceTime HD Camera - Midnight",
    brand: "Apple",
    description: "The M3 chip brings even greater capabilities to the superportable 15-inch MacBook Air. With up to 18 hours of battery life and a spacious Liquid Retina display, take on work and play anywhere with effortless speed.",
    specs: {
      "Brand": "Apple",
      "Model Name": "MacBook Air 15” M3",
      "Display": "15.3-inch Liquid Retina with True Tone (500 nits)",
      "Memory": "16GB Unified Memory",
      "Storage": "512GB SSD",
      "Battery": "Up to 18 hours battery life",
      "Weight": "1.51 kg",
    },
    priceMinor: 14490000,
    mrpMinor: 15490000,
    stock: 12,
    rating: 4.8,
    ratingCount: 3950,
    popularity: 97,
    active: true,
    categoryId: "cat-computers",
    category: { id: "cat-computers", name: "Computers & Gaming", slug: "computers" },
    images: [
      { id: "img-mba-1", url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80", position: 0 },
    ],
    isAmazonChoice: true,
    primeEligible: true,
  },
  {
    id: "prod-logitech-mx-master-3s",
    slug: "logitech-mx-master-3s-performance-wireless-mouse",
    sku: "LOG-MX3S-GRY",
    name: "Logitech MX Master 3S - Wireless Performance Mouse with Quiet Clicks, 8K DPI Sensor, MagSpeed Scrolling, Bluetooth/USB, Pale Gray",
    brand: "Logitech",
    description: "An icon remastered. Feel every moment of your workflow with even more precision, tactility, and performance, thanks to Quiet Clicks and an 8,000 DPI track-on-glass sensor.",
    specs: {
      "Brand": "Logitech",
      "Model": "MX Master 3S",
      "Sensor": "8,000 DPI Darkfield",
      "Scroll": "MagSpeed Electromagnetic wheel (1000 lines/sec)",
      "Battery": "Up to 70 days on full charge",
      "Compatibility": "Windows, macOS, Linux, iPadOS",
    },
    priceMinor: 899500,
    mrpMinor: 1099500,
    stock: 45,
    rating: 4.7,
    ratingCount: 22100,
    popularity: 92,
    active: true,
    categoryId: "cat-computers",
    category: { id: "cat-computers", name: "Computers & Gaming", slug: "computers" },
    images: [
      { id: "img-mx-1", url: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80", position: 0 },
    ],
    isBestSeller: true,
    primeEligible: true,
  },
  {
    id: "prod-dell-4k-monitor-27",
    slug: "dell-27-inch-4k-uhd-ips-monitor-s2721qs",
    sku: "DEL-S2721QS",
    name: "Dell 27-inch 4K UHD (3840 x 2160) IPS Ultra-Thin Bezel Monitor, AMD FreeSync, HDR, Height/Tilt/Swivel/Pivot Adjustable Stand, HDMI & DP",
    brand: "Dell",
    description: "Enjoy unrivaled clarity with stunning 4K UHD resolution. Three-sided ultrathin bezel design lets you see more with less distraction. Built-in dual 3W speakers and height adjustable stand.",
    specs: {
      "Brand": "Dell",
      "Screen Size": "27 Inches",
      "Resolution": "4K UHD 3840 x 2160 at 60Hz",
      "Panel Type": "IPS with 99% sRGB coverage",
      "Ports": "2x HDMI 2.0, 1x DisplayPort 1.2",
    },
    priceMinor: 2899000,
    mrpMinor: 3800000,
    stock: 19,
    rating: 4.5,
    ratingCount: 7650,
    popularity: 88,
    active: true,
    categoryId: "cat-computers",
    category: { id: "cat-computers", name: "Computers & Gaming", slug: "computers" },
    images: [
      { id: "img-mon-1", url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80", position: 0 },
    ],
    primeEligible: true,
  },

  // --- Home & Kitchen ---
  {
    id: "prod-philips-air-fryer",
    slug: "philips-digital-air-fryer-hd9252-90-4-1l",
    sku: "PHI-AF-HD9252",
    name: "Philips Digital Air Fryer HD9252/90 with Rapid Air Technology, 4.1L (0.8kg), Touch Panel with 7 Pre-sets, Keep Warm Function (Black)",
    brand: "Philips",
    description: "Healthy cooking with Rapid Air technology. Philips brings the world’s No. 1 Airfryer to everyone’s home. Enjoy healthy food that’s crispy on the outside and tender on the inside with up to 90% less fat.",
    specs: {
      "Brand": "Philips",
      "Capacity": "4.1 Litres",
      "Power": "1400 Watts",
      "Control Method": "Touch screen with 7 presets",
      "Special Feature": "Rapid Air Technology, Dishwasher safe parts",
    },
    priceMinor: 699900,
    mrpMinor: 1199500,
    stock: 58,
    rating: 4.4,
    ratingCount: 28900,
    popularity: 96,
    active: true,
    categoryId: "cat-home",
    category: { id: "cat-home", name: "Home & Kitchen", slug: "home-and-kitchen" },
    images: [
      { id: "img-af-1", url: "https://images.unsplash.com/photo-1584269600519-112d071b35e6?w=800&auto=format&fit=crop&q=80", position: 0 },
    ],
    isBestSeller: true,
    primeEligible: true,
    isDealOfTheDay: true,
    dealDiscountPercent: 42,
  },
  {
    id: "prod-dyson-v12-vacuum",
    slug: "dyson-v12-detect-slim-cordless-vacuum-cleaner",
    sku: "DYS-V12-SLM",
    name: "Dyson V12 Detect Slim Total Clean Cordless Vacuum Cleaner | Laser reveals invisible dust, Piezo sensor counts particles, LCD screen",
    brand: "Dyson",
    description: "Dyson’s lightest intelligent cordless vacuum with laser illumination. Engineered for deep whole-home cleaning with up to 60 minutes of fade-free run time.",
    specs: {
      "Brand": "Dyson",
      "Type": "Cordless Stick Vacuum",
      "Suction Power": "150 AW",
      "Weight": "2.2 kg",
      "Filtration": "Whole-machine filtration captures 99.99% of particles down to 0.3 microns",
    },
    priceMinor: 4990000,
    mrpMinor: 6590000,
    stock: 15,
    rating: 4.6,
    ratingCount: 5200,
    popularity: 90,
    active: true,
    categoryId: "cat-home",
    category: { id: "cat-home", name: "Home & Kitchen", slug: "home-and-kitchen" },
    images: [
      { id: "img-dys-1", url: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80", position: 0 },
    ],
    isAmazonChoice: true,
    primeEligible: true,
  },
  {
    id: "prod-milton-thermosteel-flask",
    slug: "milton-thermosteel-flip-lid-flask-1000ml",
    sku: "MLT-FLSK-1000",
    name: "Milton Thermosteel Flip Lid Insulated Water Bottle Flask, 1000 ml, 24 Hours Hot or Cold, 100% Rust-Proof Stainless Steel (Silver)",
    brand: "Milton",
    description: "Double-walled vacuum insulated flask keeps beverages hot or cold for 24 hours. Fabricated with 304 grade stainless steel and leak-proof flip lid with jacket for ease of carrying.",
    specs: {
      "Brand": "Milton",
      "Capacity": "1000 Milliliters",
      "Material": "18/8 Stainless Steel",
      "Temperature Retention": "24 Hours Hot & Cold",
    },
    priceMinor: 99900,
    mrpMinor: 135000,
    stock: 160,
    rating: 4.3,
    ratingCount: 54100,
    popularity: 94,
    active: true,
    categoryId: "cat-home",
    category: { id: "cat-home", name: "Home & Kitchen", slug: "home-and-kitchen" },
    images: [
      { id: "img-mlt-1", url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80", position: 0 },
    ],
    isBestSeller: true,
    primeEligible: true,
  },

  // --- Fashion ---
  {
    id: "prod-fossil-grant-watch",
    slug: "fossil-grant-chronograph-black-dial-mens-watch",
    sku: "FOS-FS4812",
    name: "Fossil Grant Chronograph Analog Black Dial Men's Watch - FS4812 | Roman Numerals, Genuine Brown Leather Band, 50m Water Resistance",
    brand: "Fossil",
    description: "Modeled after vintage clocks, our Grant collection has a timeless appeal. Roman numerals with chronograph movement on a sleek black dial paired with rich brown leather strap.",
    specs: {
      "Brand": "Fossil",
      "Case Diameter": "44 mm",
      "Band Material": "Genuine Leather",
      "Movement": "Quartz Chronograph",
      "Water Resistance": "5 ATM / 50 meters",
    },
    priceMinor: 749500,
    mrpMinor: 1299500,
    stock: 32,
    rating: 4.4,
    ratingCount: 14200,
    popularity: 91,
    active: true,
    categoryId: "cat-fashion",
    category: { id: "cat-fashion", name: "Fashion & Apparel", slug: "fashion" },
    images: [
      { id: "img-fos-1", url: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80", position: 0 },
      { id: "img-fos-2", url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80", position: 1 },
    ],
    isAmazonChoice: true,
    primeEligible: true,
    isDealOfTheDay: true,
    dealDiscountPercent: 42,
  },
  {
    id: "prod-ray-ban-aviator",
    slug: "ray-ban-classic-polarized-aviator-sunglasses",
    sku: "RB-3025-POL",
    name: "Ray-Ban Unisex Polarized Aviator Sunglasses (Gold Frame, Green Classic G-15 Lens, 58mm) - RB3025 001/58",
    brand: "Ray-Ban",
    description: "Currently one of the most iconic sunglass models in the world, Ray-Ban Aviator Classic sunglasses were originally designed for U.S. aviators in 1937. Polarized lenses eliminate glare and provide 100% UV protection.",
    specs: {
      "Brand": "Ray-Ban",
      "Frame Material": "Metal",
      "Lens Material": "Glass Polarized",
      "Lens Width": "58 mm",
      "UV Protection": "100% UV400",
    },
    priceMinor: 899000,
    mrpMinor: 1149000,
    stock: 28,
    rating: 4.5,
    ratingCount: 6890,
    popularity: 89,
    active: true,
    categoryId: "cat-fashion",
    category: { id: "cat-fashion", name: "Fashion & Apparel", slug: "fashion" },
    images: [
      { id: "img-rb-1", url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80", position: 0 },
    ],
    isAmazonChoice: true,
    primeEligible: true,
  },
  {
    id: "prod-nike-air-jordan-1",
    slug: "nike-mens-air-jordan-1-low-sneakers",
    sku: "NKE-AJ1-LOW",
    name: "Nike Men's Air Jordan 1 Low Retro Basketball Sneakers (White/Black-Gym Red) | Premium Leather, Air Cushioning",
    brand: "Nike",
    description: "Inspired by the 1985 original, the Air Jordan 1 Low offers a clean, classic look that's familiar yet always fresh. An encapsulated Air-Sole unit provides lightweight cushioning.",
    specs: {
      "Brand": "Nike",
      "Outer Material": "Genuine Leather",
      "Sole": "Rubber Cupsole",
      "Closure": "Lace-Up",
      "Style": "Low-Top Sneaker",
    },
    priceMinor: 899500,
    mrpMinor: 999500,
    stock: 22,
    rating: 4.6,
    ratingCount: 9340,
    popularity: 95,
    active: true,
    categoryId: "cat-fashion",
    category: { id: "cat-fashion", name: "Fashion & Apparel", slug: "fashion" },
    images: [
      { id: "img-nike-1", url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80", position: 0 },
    ],
    isBestSeller: true,
    primeEligible: true,
  },

  // --- Beauty & Personal Care ---
  {
    id: "prod-the-ordinary-niacinamide",
    slug: "the-ordinary-niacinamide-10-zinc-1-face-serum-30ml",
    sku: "ORD-NIAC-30ML",
    name: "The Ordinary Niacinamide 10% + Zinc 1% Oil Control Serum (30ml) | Reduces Blemishes, Minimizes Pores & Evens Skin Tone",
    brand: "The Ordinary",
    description: "A high-strength vitamin and mineral blemish formula with 10% pure Niacinamide and 1% Zinc PCA to balance visible sebum activity and visibly brighten the look of dull skin.",
    specs: {
      "Brand": "The Ordinary",
      "Skin Type": "Oily, Combination, Normal",
      "Volume": "30 ml",
      "Key Ingredients": "Niacinamide (Vitamin B3), Zinc PCA",
    },
    priceMinor: 60000,
    mrpMinor: 65000,
    stock: 95,
    rating: 4.4,
    ratingCount: 38400,
    popularity: 93,
    active: true,
    categoryId: "cat-beauty",
    category: { id: "cat-beauty", name: "Beauty & Grooming", slug: "beauty" },
    images: [
      { id: "img-ord-1", url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80", position: 0 },
    ],
    isBestSeller: true,
    primeEligible: true,
  },
  {
    id: "prod-philips-oneblade",
    slug: "philips-oneblade-hybrid-trimmer-and-shaver-qp2525",
    sku: "PHI-OB-QP2525",
    name: "Philips OneBlade Hybrid Trimmer and Shaver QP2525/10 with 3 Trimming Combs, Dual-Sided Blade, Water Resistant for Wet & Dry Use",
    brand: "Philips",
    description: "Trim, edge, and shave any length of hair. The unique OneBlade technology integrates a fast-moving cutter (200x per second) with a dual protection system to give an efficient, comfortable shave on longer hairs without nicking skin.",
    specs: {
      "Brand": "Philips",
      "Battery": "45 mins of continuous cordless use",
      "Blade Life": "Up to 4 months per blade",
      "Usage": "Wet & Dry, 100% waterproof",
    },
    priceMinor: 169900,
    mrpMinor: 219900,
    stock: 80,
    rating: 4.3,
    ratingCount: 46200,
    popularity: 92,
    active: true,
    categoryId: "cat-beauty",
    category: { id: "cat-beauty", name: "Beauty & Grooming", slug: "beauty" },
    images: [
      { id: "img-ob-1", url: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=800&auto=format&fit=crop&q=80", position: 0 },
    ],
    isAmazonChoice: true,
    primeEligible: true,
  },

  // --- Books ---
  {
    id: "prod-atomic-habits",
    slug: "atomic-habits-by-james-clear-paperback",
    sku: "BK-ATM-HBT",
    name: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones by James Clear (Paperback)",
    brand: "Random House",
    description: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
    specs: {
      "Author": "James Clear",
      "Publisher": "Random House Business Books",
      "Format": "Paperback, 320 pages",
      "Language": "English",
      "ISBN-13": "978-1847941831",
    },
    priceMinor: 48900,
    mrpMinor: 79900,
    stock: 250,
    rating: 4.8,
    ratingCount: 112000,
    popularity: 100,
    active: true,
    categoryId: "cat-books",
    category: { id: "cat-books", name: "Books", slug: "books" },
    images: [
      { id: "img-ath-1", url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80", position: 0 },
    ],
    isBestSeller: true,
    primeEligible: true,
  },
  {
    id: "prod-psychology-of-money",
    slug: "the-psychology-of-money-by-morgan-housel",
    sku: "BK-PSY-MNY",
    name: "The Psychology of Money: Timeless Lessons on Wealth, Greed, and Happiness by Morgan Housel (Paperback)",
    brand: "Jaico Publishing",
    description: "Doing well with money isn’t necessarily about what you know. It’s about how you behave. And behavior is hard to teach, even to really smart people. Morgan Housel shares 19 short stories exploring the strange ways people think about money.",
    specs: {
      "Author": "Morgan Housel",
      "Publisher": "Jaico Publishing House",
      "Format": "Paperback, 252 pages",
      "Language": "English",
    },
    priceMinor: 34900,
    mrpMinor: 49900,
    stock: 180,
    rating: 4.7,
    ratingCount: 89000,
    popularity: 97,
    active: true,
    categoryId: "cat-books",
    category: { id: "cat-books", name: "Books", slug: "books" },
    images: [
      { id: "img-pom-1", url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80", position: 0 },
    ],
    isBestSeller: true,
    primeEligible: true,
  },
  {
    id: "prod-mobiles-1-cmvg",
    slug: "apple-iphone-15-128gb-black",
    sku: "APL-IP15-128-BLK",
    name: "Apple iPhone 15 (128 GB) - Black with Dynamic Island & 48MP Main Camera",
    brand: "Apple",
    description: "Dynamic Island bubbles up alerts and Live Activities. All-new 48MP Main camera shoots in super-high resolution.",
    specs: {
      "Brand": "Apple",
      "Model": "iPhone 15",
      "Display": "6.1-inch Super Retina XDR",
      "Chip": "A16 Bionic",
      "Storage": "128 GB"
},
    priceMinor: 7199900,
    mrpMinor: 7990000,
    stock: 61,
    rating: 4.6,
    ratingCount: 6770,
    popularity: 86,
    active: true,
    categoryId: "cat-mobiles",
    category: { id: "cat-mobiles", name: "Mobiles", slug: "mobiles" },
    images: [
      { id: "prod-mobiles-1-cmvg-img1", url: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-mobiles-1-cmvg-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-mobiles-1-cmvg-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: true,
    dealDiscountPercent: 10,
    primeEligible: true
  },
  {
    id: "prod-mobiles-2-hq27",
    slug: "samsung-galaxy-s24-ultra-5g-titanium-gray",
    sku: "SAM-S24U-256-GRY",
    name: "Samsung Galaxy S24 Ultra 5G (Titanium Gray, 12GB, 256GB Storage) with Galaxy AI",
    brand: "Samsung",
    description: "Meet Galaxy S24 Ultra with Galaxy AI, featuring a titanium exterior, built-in S Pen, and 200MP camera system.",
    specs: {
      "Brand": "Samsung",
      "Model": "Galaxy S24 Ultra",
      "RAM": "12 GB",
      "Storage": "256 GB"
},
    priceMinor: 12999900,
    mrpMinor: 13499900,
    stock: 99,
    rating: 4.4,
    ratingCount: 5185,
    popularity: 82,
    active: true,
    categoryId: "cat-mobiles",
    category: { id: "cat-mobiles", name: "Mobiles", slug: "mobiles" },
    images: [
      { id: "prod-mobiles-2-hq27-img1", url: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-mobiles-2-hq27-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-mobiles-2-hq27-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: true,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-mobiles-3-wfog",
    slug: "oneplus-12-5g-silky-black-16gb-512gb",
    sku: "OP-12-512-BLK",
    name: "OnePlus 12 5G (Silky Black, 16GB RAM, 512GB Storage) with 4th Gen Hasselblad Camera",
    brand: "OnePlus",
    description: "Elite performance with Snapdragon 8 Gen 3, 2K 120Hz ProXDR display, and 100W SUPERVOOC fast charging.",
    specs: {
      "Brand": "OnePlus",
      "RAM": "16 GB",
      "Storage": "512 GB",
      "Charging": "100W SuperVOOC"
},
    priceMinor: 6499900,
    mrpMinor: 6999900,
    stock: 15,
    rating: 4.5,
    ratingCount: 1144,
    popularity: 94,
    active: true,
    categoryId: "cat-mobiles",
    category: { id: "cat-mobiles", name: "Mobiles", slug: "mobiles" },
    images: [
      { id: "prod-mobiles-3-wfog-img1", url: "https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-mobiles-3-wfog-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-mobiles-3-wfog-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: false,
    isDealOfTheDay: true,
    dealDiscountPercent: 7,
    primeEligible: true
  },
  {
    id: "prod-mobiles-4-pg7n",
    slug: "google-pixel-8a-aloe-128gb",
    sku: "GOOG-PX8A-128-ALO",
    name: "Google Pixel 8a - Smartphone with Google AI & Tensor G3 - Aloe 128GB",
    brand: "Google",
    description: "Pixel 8a delivers exceptional photo and video quality powered by Google Tensor G3 and 7 years of OS updates.",
    specs: {
      "Brand": "Google",
      "Display": "6.1-inch Actua 120Hz",
      "Chip": "Google Tensor G3"
},
    priceMinor: 4999900,
    mrpMinor: 5299900,
    stock: 40,
    rating: 4.6,
    ratingCount: 17365,
    popularity: 91,
    active: true,
    categoryId: "cat-mobiles",
    category: { id: "cat-mobiles", name: "Mobiles", slug: "mobiles" },
    images: [
      { id: "prod-mobiles-4-pg7n-img1", url: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-mobiles-4-pg7n-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-mobiles-4-pg7n-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-mobiles-5-yuze",
    slug: "redmi-note-13-pro-5g-coral-purple",
    sku: "MI-N13P-256-PUR",
    name: "Redmi Note 13 Pro 5G (Coral Purple, 8GB RAM, 256GB Storage) | 200MP OIS Camera",
    brand: "Xiaomi",
    description: "Flagship 200MP camera with OIS, 1.5K 120Hz AMOLED display, and 67W Turbo Charge.",
    specs: {
      "Brand": "Xiaomi",
      "Camera": "200 MP Ultra-Clear",
      "Battery": "5100 mAh"
},
    priceMinor: 2499900,
    mrpMinor: 2899900,
    stock: 96,
    rating: 4.8,
    ratingCount: 15248,
    popularity: 82,
    active: true,
    categoryId: "cat-mobiles",
    category: { id: "cat-mobiles", name: "Mobiles", slug: "mobiles" },
    images: [
      { id: "prod-mobiles-5-yuze-img1", url: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-mobiles-5-yuze-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-mobiles-5-yuze-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: false,
    isDealOfTheDay: true,
    dealDiscountPercent: 14,
    primeEligible: true
  },
  {
    id: "prod-mobiles-6-bx9b",
    slug: "realme-12-pro-plus-5g-submariner-blue",
    sku: "RME-12PP-256-BLU",
    name: "Realme 12 Pro+ 5G (Submariner Blue, 12GB RAM, 256GB Storage)",
    brand: "Realme",
    description: "Luxury watch design by Ollivier Saveo with 64MP periscope telephoto camera and 120Hz curved vision display.",
    specs: {
      "Brand": "Realme",
      "RAM": "12 GB",
      "Storage": "256 GB"
},
    priceMinor: 2999900,
    mrpMinor: 3499900,
    stock: 60,
    rating: 4.4,
    ratingCount: 19628,
    popularity: 93,
    active: true,
    categoryId: "cat-mobiles",
    category: { id: "cat-mobiles", name: "Mobiles", slug: "mobiles" },
    images: [
      { id: "prod-mobiles-6-bx9b-img1", url: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-mobiles-6-bx9b-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-mobiles-6-bx9b-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: true,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-mobiles-7-fawd",
    slug: "motorola-edge-50-pro-5g-luxe-lavender",
    sku: "MOT-E50P-256-LAV",
    name: "Motorola Edge 50 Pro 5G (Luxe Lavender, 12GB RAM, 256GB Storage)",
    brand: "Motorola",
    description: "World's 1st Pantone validated display and camera phone with IP68 underwater protection and 50W wireless charging.",
    specs: {
      "Brand": "Motorola",
      "Charging": "125W TurboPower",
      "Waterproof": "IP68"
},
    priceMinor: 3599900,
    mrpMinor: 4199900,
    stock: 40,
    rating: 4.4,
    ratingCount: 1375,
    popularity: 88,
    active: true,
    categoryId: "cat-mobiles",
    category: { id: "cat-mobiles", name: "Mobiles", slug: "mobiles" },
    images: [
      { id: "prod-mobiles-7-fawd-img1", url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-mobiles-7-fawd-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-mobiles-7-fawd-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: true,
    dealDiscountPercent: 14,
    primeEligible: true
  },
  {
    id: "prod-mobiles-8-2x1x",
    slug: "iqoo-neo-9-pro-5g-fiery-red",
    sku: "IQ-N9P-256-RED",
    name: "iQOO Neo 9 Pro 5G (Fiery Red, 8GB RAM, 256GB Storage) | Snapdragon 8 Gen 2",
    brand: "iQOO",
    description: "Flagship gaming performance with dedicated Supercomputing Chip Q1, Sony IMX920 night vision camera, and 120W FlashCharge.",
    specs: {
      "Brand": "iQOO",
      "Chipset": "Snapdragon 8 Gen 2",
      "Battery": "5160 mAh"
},
    priceMinor: 3699900,
    mrpMinor: 4199900,
    stock: 36,
    rating: 4.6,
    ratingCount: 16167,
    popularity: 91,
    active: true,
    categoryId: "cat-mobiles",
    category: { id: "cat-mobiles", name: "Mobiles", slug: "mobiles" },
    images: [
      { id: "prod-mobiles-8-2x1x-img1", url: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-mobiles-8-2x1x-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-mobiles-8-2x1x-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: false,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-mobiles-9-ud97",
    slug: "nothing-phone-2a-5g-white-128gb",
    sku: "NOTH-P2A-128-WHT",
    name: "Nothing Phone (2a) 5G (White, 8GB RAM, 128GB Storage) with Glyph Interface",
    brand: "Nothing",
    description: "Unique transparent back design with iconic Glyph Interface lights and dual 50MP rear camera sensors.",
    specs: {
      "Brand": "Nothing",
      "Processor": "MediaTek Dimensity 7200 Pro",
      "Display": "120Hz Flexible AMOLED"
},
    priceMinor: 2399900,
    mrpMinor: 2599900,
    stock: 44,
    rating: 4.8,
    ratingCount: 25192,
    popularity: 85,
    active: true,
    categoryId: "cat-mobiles",
    category: { id: "cat-mobiles", name: "Mobiles", slug: "mobiles" },
    images: [
      { id: "prod-mobiles-9-ud97-img1", url: "https://images.unsplash.com/photo-1598327105854-c8674faddf79?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-mobiles-9-ud97-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-mobiles-9-ud97-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: false,
    isDealOfTheDay: true,
    dealDiscountPercent: 8,
    primeEligible: true
  },
  {
    id: "prod-computers-1-m4ue",
    slug: "asus-zenbook-14-oled-intel-core-ultra-7",
    sku: "ASU-ZB14-OLED",
    name: "ASUS Zenbook 14 OLED, Intel Core Ultra 7 155H 14-inch 3K 120Hz Laptop",
    brand: "ASUS",
    description: "Ultrathin 1.2 kg all-metal chassis with stunning 3K ASUS Lumina OLED touchscreen and Intel AI Boost NPU.",
    specs: {
      "Brand": "ASUS",
      "RAM": "16GB",
      "SSD": "1TB NVMe",
      "Display": "3K OLED 120Hz"
},
    priceMinor: 11499000,
    mrpMinor: 13299000,
    stock: 38,
    rating: 4.4,
    ratingCount: 15084,
    popularity: 85,
    active: true,
    categoryId: "cat-computers",
    category: { id: "cat-computers", name: "Computers", slug: "computers" },
    images: [
      { id: "prod-computers-1-m4ue-img1", url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-computers-1-m4ue-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-computers-1-m4ue-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: true,
    dealDiscountPercent: 13,
    primeEligible: true
  },
  {
    id: "prod-computers-2-t372",
    slug: "lenovo-legion-pro-5-gaming-laptop-rtx-4070",
    sku: "LEN-LGP5-RTX4070",
    name: "Lenovo Legion Pro 5 Gen 8 AMD Ryzen 7 7745HX 16-inch QHD+ 240Hz Gaming Laptop (RTX 4070)",
    brand: "Lenovo",
    description: "Uncompromised gaming firepower powered by Legion Coldfront 5.0 thermals and AI-tuned performance.",
    specs: {
      "Brand": "Lenovo",
      "GPU": "RTX 4070 8GB",
      "RAM": "32GB DDR5",
      "Display": "16-inch WQXGA 240Hz"
},
    priceMinor: 15999000,
    mrpMinor: 18999000,
    stock: 57,
    rating: 4.2,
    ratingCount: 11489,
    popularity: 82,
    active: true,
    categoryId: "cat-computers",
    category: { id: "cat-computers", name: "Computers", slug: "computers" },
    images: [
      { id: "prod-computers-2-t372-img1", url: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-computers-2-t372-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-computers-2-t372-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: true,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-computers-3-bpaj",
    slug: "hp-spectre-x360-2-in-1-laptop-nightfall-black",
    sku: "HP-SPX360-14-BLK",
    name: "HP Spectre x360 2-in-1 Laptop 14-inch 2.8K OLED Touch, Intel Core Ultra 7",
    brand: "HP",
    description: "Crafted gem-cut 2-in-1 convertible laptop with 9MP AI camera, poly studio quad audio, and rechargeable tilt pen.",
    specs: {
      "Brand": "HP",
      "Form": "Convertible 2-in-1 Touch",
      "Battery": "Up to 17 Hours"
},
    priceMinor: 14999000,
    mrpMinor: 16999000,
    stock: 53,
    rating: 4.6,
    ratingCount: 13409,
    popularity: 87,
    active: true,
    categoryId: "cat-computers",
    category: { id: "cat-computers", name: "Computers", slug: "computers" },
    images: [
      { id: "prod-computers-3-bpaj-img1", url: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-computers-3-bpaj-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-computers-3-bpaj-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: false,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-computers-4-wuta",
    slug: "dell-xps-13-plus-intel-evo-platinum",
    sku: "DEL-XPS13-EVO",
    name: "Dell XPS 13 9340 Laptop, 13.4-inch FHD+ InfinityEdge, Intel Core Ultra 5",
    brand: "Dell",
    description: "Iconic minimalist CNC aluminum design with invisible haptic glass touchpad and zero-lattice keyboard.",
    specs: {
      "Brand": "Dell",
      "Screen": "13.4-inch 120Hz",
      "Weight": "1.19 kg"
},
    priceMinor: 12999000,
    mrpMinor: 14500000,
    stock: 31,
    rating: 4.5,
    ratingCount: 18210,
    popularity: 86,
    active: true,
    categoryId: "cat-computers",
    category: { id: "cat-computers", name: "Computers", slug: "computers" },
    images: [
      { id: "prod-computers-4-wuta-img1", url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-computers-4-wuta-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-computers-4-wuta-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: true,
    dealDiscountPercent: 10,
    primeEligible: true
  },
  {
    id: "prod-computers-5-fj7x",
    slug: "keychron-q1-pro-qmk-via-wireless-custom-mechanical-keyboard",
    sku: "KEY-Q1P-RGB-RED",
    name: "Keychron Q1 Pro QMK/VIA Wireless Custom Mechanical Keyboard",
    brand: "Keychron",
    description: "Premium full-metal mechanical keyboard with Bluetooth 5.1 & Type-C and customizable rotary encoder.",
    specs: {
      "Brand": "Keychron",
      "Switches": "Hot-swappable Red",
      "Connectivity": "Bluetooth 5.1 + Type-C"
},
    priceMinor: 1699900,
    mrpMinor: 2099900,
    stock: 96,
    rating: 4.1,
    ratingCount: 24393,
    popularity: 89,
    active: true,
    categoryId: "cat-computers",
    category: { id: "cat-computers", name: "Computers", slug: "computers" },
    images: [
      { id: "prod-computers-5-fj7x-img1", url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-computers-5-fj7x-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-computers-5-fj7x-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: false,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-computers-6-pzr5",
    slug: "samsung-t7-shield-2tb-portable-ssd",
    sku: "SAM-T7S-2TB-BLK",
    name: "Samsung T7 Shield 2TB Portable SSD - USB 3.2 Gen 2 External Solid State Drive (Rugged IP65)",
    brand: "Samsung",
    description: "Rugged durability with IP65 water and dust resistance, up to 1,050 MB/s transfer speeds, and drop resistance up to 3 meters.",
    specs: {
      "Brand": "Samsung",
      "Capacity": "2 TB",
      "Speed": "Up to 1050 MB/s"
},
    priceMinor: 1649900,
    mrpMinor: 2599900,
    stock: 16,
    rating: 4.5,
    ratingCount: 7044,
    popularity: 93,
    active: true,
    categoryId: "cat-computers",
    category: { id: "cat-computers", name: "Computers", slug: "computers" },
    images: [
      { id: "prod-computers-6-pzr5-img1", url: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-computers-6-pzr5-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-computers-6-pzr5-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: true,
    isDealOfTheDay: true,
    dealDiscountPercent: 36,
    primeEligible: true
  },
  {
    id: "prod-computers-7-wzly",
    slug: "lg-ultragear-27-inch-qhd-nano-ips-gaming-monitor",
    sku: "LG-27GP850-B",
    name: "LG UltraGear 27-inch QHD Nano IPS Gaming Monitor, 165Hz (O/C 180Hz), 1ms",
    brand: "LG",
    description: "Stunning Nano IPS color reproduction with 1ms response time, HDR400, and NVIDIA G-Sync compatible variable refresh rate.",
    specs: {
      "Brand": "LG",
      "Resolution": "2560x1440 QHD",
      "Refresh Rate": "180Hz"
},
    priceMinor: 2799900,
    mrpMinor: 4200000,
    stock: 38,
    rating: 4.3,
    ratingCount: 24733,
    popularity: 96,
    active: true,
    categoryId: "cat-computers",
    category: { id: "cat-computers", name: "Computers", slug: "computers" },
    images: [
      { id: "prod-computers-7-wzly-img1", url: "https://images.unsplash.com/photo-1551645120-d70bfe84c826?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-computers-7-wzly-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-computers-7-wzly-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: true,
    dealDiscountPercent: 33,
    primeEligible: true
  },
  {
    id: "prod-computers-8-ttlw",
    slug: "apple-ipad-air-11-inch-m2-chip-128gb-space-grey",
    sku: "APL-IPAD-AIR-M2",
    name: "Apple iPad Air 11-inch (M2 Chip, Wi-Fi, 128GB) - Space Grey",
    brand: "Apple",
    description: "Supercharged by the M2 chip with gorgeous Liquid Retina display, landscape 12MP front camera, and Apple Pencil Pro support.",
    specs: {
      "Brand": "Apple",
      "Chip": "Apple M2",
      "Display": "11-inch Liquid Retina",
      "Storage": "128 GB"
},
    priceMinor: 5990000,
    mrpMinor: 6490000,
    stock: 80,
    rating: 4.9,
    ratingCount: 5538,
    popularity: 88,
    active: true,
    categoryId: "cat-computers",
    category: { id: "cat-computers", name: "Computers", slug: "computers" },
    images: [
      { id: "prod-computers-8-ttlw-img1", url: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-computers-8-ttlw-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-computers-8-ttlw-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: false,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-fashion-1-pl23",
    slug: "levis-mens-511-slim-fit-stretch-jeans",
    sku: "LEV-511-SLM-BLU",
    name: "Levi's Men's 511 Slim Fit Stretch Dark Wash Denim Jeans",
    brand: "Levi's",
    description: "A modern slim with room to move. The 511 Slim Fit Jeans are a classic since right now, cut close without being too tight.",
    specs: {
      "Brand": "Levi's",
      "Fit": "Slim",
      "Material": "99% Cotton, 1% Elastane"
},
    priceMinor: 239900,
    mrpMinor: 399900,
    stock: 82,
    rating: 4.9,
    ratingCount: 5920,
    popularity: 93,
    active: true,
    categoryId: "cat-fashion",
    category: { id: "cat-fashion", name: "Fashion", slug: "fashion" },
    images: [
      { id: "prod-fashion-1-pl23-img1", url: "https://images.unsplash.com/photo-1542272604-780c96856592?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-fashion-1-pl23-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-fashion-1-pl23-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: true,
    dealDiscountPercent: 40,
    primeEligible: true
  },
  {
    id: "prod-fashion-2-ly7u",
    slug: "nike-sportswear-club-fleece-pullover-hoodie-black",
    sku: "NKE-CLUB-HD-BLK",
    name: "Nike Sportswear Club Fleece Men's Brushed-Back Pullover Hoodie - Black",
    brand: "Nike",
    description: "A closet staple, the Nike Sportswear Club Fleece Hoodie combines classic style with the soft comfort of brushed fleece.",
    specs: {
      "Brand": "Nike",
      "Fabric": "80% Cotton, 20% Polyester",
      "Fit": "Standard"
},
    priceMinor: 329500,
    mrpMinor: 399500,
    stock: 70,
    rating: 4.7,
    ratingCount: 23510,
    popularity: 86,
    active: true,
    categoryId: "cat-fashion",
    category: { id: "cat-fashion", name: "Fashion", slug: "fashion" },
    images: [
      { id: "prod-fashion-2-ly7u-img1", url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-fashion-2-ly7u-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-fashion-2-ly7u-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: true,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-fashion-3-6lt4",
    slug: "puma-unisex-smash-v2-leather-sneakers-white",
    sku: "PUM-SMASH-WHT",
    name: "Puma Unisex Adult Smash v2 L Classic Leather Casual Low-Top Sneakers - White/Black",
    brand: "Puma",
    description: "The Puma Smash v2 L features an upgraded leather upper with clean look and durable rubber outsole for grip.",
    specs: {
      "Brand": "Puma",
      "Upper": "Genuine Leather",
      "Sole": "Durable Rubber"
},
    priceMinor: 219900,
    mrpMinor: 449900,
    stock: 82,
    rating: 4.4,
    ratingCount: 15574,
    popularity: 95,
    active: true,
    categoryId: "cat-fashion",
    category: { id: "cat-fashion", name: "Fashion", slug: "fashion" },
    images: [
      { id: "prod-fashion-3-6lt4-img1", url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-fashion-3-6lt4-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-fashion-3-6lt4-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: false,
    isDealOfTheDay: true,
    dealDiscountPercent: 51,
    primeEligible: true
  },
  {
    id: "prod-fashion-4-lp7e",
    slug: "mens-classic-tailored-slim-fit-formal-blazer-navy",
    sku: "BLZ-SLM-NVY",
    name: "Raymond Men's Regular Fit Single Breasted Formal Poly-Viscose Navy Blue Blazer",
    brand: "Raymond",
    description: "Crafted with precision tailoring and high-grade poly-viscose blend, offering structured drape and breathability.",
    specs: {
      "Brand": "Raymond",
      "Fit": "Contemporary Slim",
      "Pattern": "Solid Navy"
},
    priceMinor: 499900,
    mrpMinor: 899900,
    stock: 56,
    rating: 4.2,
    ratingCount: 12116,
    popularity: 96,
    active: true,
    categoryId: "cat-fashion",
    category: { id: "cat-fashion", name: "Fashion", slug: "fashion" },
    images: [
      { id: "prod-fashion-4-lp7e-img1", url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-fashion-4-lp7e-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-fashion-4-lp7e-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-fashion-5-rb6q",
    slug: "titan-raga-viva-rose-gold-analog-womens-watch",
    sku: "TTN-RAGA-RSGLD",
    name: "Titan Raga Viva Analog Rose Gold Dial Women's Quartz Watch with Crystal Accents",
    brand: "Titan",
    description: "Graceful rose gold bracelet strap with shimmering crystal indices and mineral glass protection.",
    specs: {
      "Brand": "Titan",
      "Dial Color": "Rose Gold",
      "Strap": "Stainless Steel"
},
    priceMinor: 479500,
    mrpMinor: 599500,
    stock: 58,
    rating: 4.6,
    ratingCount: 20565,
    popularity: 86,
    active: true,
    categoryId: "cat-fashion",
    category: { id: "cat-fashion", name: "Fashion", slug: "fashion" },
    images: [
      { id: "prod-fashion-5-rb6q-img1", url: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-fashion-5-rb6q-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-fashion-5-rb6q-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: false,
    isDealOfTheDay: true,
    dealDiscountPercent: 20,
    primeEligible: true
  },
  {
    id: "prod-fashion-6-fdzw",
    slug: "biba-womens-cotton-printed-anarkali-kurta-dupatta-set",
    sku: "BIB-ANK-SET-TEAL",
    name: "BIBA Women's Cotton Printed Anarkali Kurta with Churidar and Chiffon Dupatta Set",
    brand: "BIBA",
    description: "Pure breathable cotton crafted with traditional gold foil print and flared hemline suitable for festive celebrations.",
    specs: {
      "Brand": "BIBA",
      "Material": "100% Cotton",
      "Sleeve": "3/4th Sleeve"
},
    priceMinor: 279900,
    mrpMinor: 550000,
    stock: 49,
    rating: 4.7,
    ratingCount: 4872,
    popularity: 90,
    active: true,
    categoryId: "cat-fashion",
    category: { id: "cat-fashion", name: "Fashion", slug: "fashion" },
    images: [
      { id: "prod-fashion-6-fdzw-img1", url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-fashion-6-fdzw-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-fashion-6-fdzw-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: true,
    isDealOfTheDay: true,
    dealDiscountPercent: 49,
    primeEligible: true
  },
  {
    id: "prod-fashion-7-zecs",
    slug: "wildcraft-turnaround-35l-laptop-backpack",
    sku: "WLD-TRN-35L-GRY",
    name: "Wildcraft Turnaround 35L Water Resistant Travel & Laptop Backpack with Rain Cover",
    brand: "Wildcraft",
    description: "Engineered with triple-compartment organization, padded 15.6-inch laptop cradle, ergonomic back support, and rain poncho.",
    specs: {
      "Brand": "Wildcraft",
      "Capacity": "35 Liters",
      "Warranty": "5 Years"
},
    priceMinor: 189900,
    mrpMinor: 349900,
    stock: 64,
    rating: 4.8,
    ratingCount: 3626,
    popularity: 92,
    active: true,
    categoryId: "cat-fashion",
    category: { id: "cat-fashion", name: "Fashion", slug: "fashion" },
    images: [
      { id: "prod-fashion-7-zecs-img1", url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-fashion-7-zecs-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-fashion-7-zecs-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-fashion-8-090y",
    slug: "woodland-mens-camel-leather-outdoor-trekking-boots",
    sku: "WOD-BOOT-CAMEL",
    name: "Woodland Men's Camel Suede Leather High-Traction Outdoor Trekking Boots",
    brand: "Woodland",
    description: "Rugged all-terrain outdoor ankle boots built with water-resistant nubuck leather and shock-absorbing rubber lug sole.",
    specs: {
      "Brand": "Woodland",
      "Upper": "Nubuck/Suede Leather",
      "Sole": "Deep Cleated Rubber"
},
    priceMinor: 439500,
    mrpMinor: 549500,
    stock: 16,
    rating: 4.3,
    ratingCount: 20963,
    popularity: 95,
    active: true,
    categoryId: "cat-fashion",
    category: { id: "cat-fashion", name: "Fashion", slug: "fashion" },
    images: [
      { id: "prod-fashion-8-090y-img1", url: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-fashion-8-090y-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-fashion-8-090y-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: false,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-home-and-kitchen-1-jhjo",
    slug: "prestige-omega-deluxe-granite-3-piece-cookware-set",
    sku: "PRS-OMG-3PC",
    name: "Prestige Omega Deluxe Granite Non-Stick 3-Piece Cookware Set (Fry Pan, Omni Tawa, Kadai)",
    brand: "Prestige",
    description: "5-layer non-stick German granite coating compatible with induction and gas cooktops. Dishwasher safe with 2-year warranty.",
    specs: {
      "Brand": "Prestige",
      "Material": "Aluminium Granite",
      "Coating": "5 Layer Non-Stick"
},
    priceMinor: 249900,
    mrpMinor: 450000,
    stock: 95,
    rating: 4.7,
    ratingCount: 2629,
    popularity: 89,
    active: true,
    categoryId: "cat-home",
    category: { id: "cat-home", name: "Home & Kitchen", slug: "home-and-kitchen" },
    images: [
      { id: "prod-home-and-kitchen-1-jhjo-img1", url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-home-and-kitchen-1-jhjo-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-home-and-kitchen-1-jhjo-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: true,
    dealDiscountPercent: 44,
    primeEligible: true
  },
  {
    id: "prod-home-and-kitchen-2-qavs",
    slug: "bajaj-gx-1-500w-mixer-grinder-3-stainless-steel-jars",
    sku: "BAJ-GX1-500W",
    name: "Bajaj GX-1 500W Mixer Grinder with 3 Stainless Steel Jars & Overload Protector",
    brand: "Bajaj",
    description: "Reliable 500W Titan motor with 2-in-1 functional blades, easy grip handles, and 3-speed control with incher.",
    specs: {
      "Brand": "Bajaj",
      "Wattage": "500 Watts",
      "Jars": "3 Stainless Steel"
},
    priceMinor: 199900,
    mrpMinor: 369900,
    stock: 42,
    rating: 4.5,
    ratingCount: 8934,
    popularity: 88,
    active: true,
    categoryId: "cat-home",
    category: { id: "cat-home", name: "Home & Kitchen", slug: "home-and-kitchen" },
    images: [
      { id: "prod-home-and-kitchen-2-qavs-img1", url: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-home-and-kitchen-2-qavs-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-home-and-kitchen-2-qavs-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: true,
    isDealOfTheDay: true,
    dealDiscountPercent: 46,
    primeEligible: true
  },
  {
    id: "prod-home-and-kitchen-3-o9j1",
    slug: "aquaguard-sure-delight-nxt-ro-uv-water-purifier",
    sku: "AG-SURE-ROUV",
    name: "Aquaguard Sure Delight NXT RO+UV Water Purifier with 6-Stage Purification & 6L Tank",
    brand: "Aquaguard",
    description: "Superior 6-stage purification removes heavy metals and bacteria while retaining natural essential minerals.",
    specs: {
      "Brand": "Eureka Forbes",
      "Purification": "RO + UV",
      "Tank Capacity": "6 Liters"
},
    priceMinor: 899900,
    mrpMinor: 1400000,
    stock: 89,
    rating: 4.7,
    ratingCount: 21424,
    popularity: 98,
    active: true,
    categoryId: "cat-home",
    category: { id: "cat-home", name: "Home & Kitchen", slug: "home-and-kitchen" },
    images: [
      { id: "prod-home-and-kitchen-3-o9j1-img1", url: "https://images.unsplash.com/photo-1585837575652-267c041d77d4?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-home-and-kitchen-3-o9j1-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-home-and-kitchen-3-o9j1-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: false,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-home-and-kitchen-4-p59l",
    slug: "wakefit-orthopaedic-memory-foam-queen-mattress",
    sku: "WAK-ORTHO-QN-6IN",
    name: "Wakefit Orthopaedic Memory Foam 6-Inch Queen Size Mattress (78x60 Inches)",
    brand: "Wakefit",
    description: "Next-gen memory foam contouring with zoned support for spinal alignment. 10-year warranty included.",
    specs: {
      "Brand": "Wakefit",
      "Dimensions": "78 x 60 x 6 Inch",
      "Firmness": "Medium Firm"
},
    priceMinor: 1149900,
    mrpMinor: 1699900,
    stock: 86,
    rating: 4.7,
    ratingCount: 5342,
    popularity: 82,
    active: true,
    categoryId: "cat-home",
    category: { id: "cat-home", name: "Home & Kitchen", slug: "home-and-kitchen" },
    images: [
      { id: "prod-home-and-kitchen-4-p59l-img1", url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-home-and-kitchen-4-p59l-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-home-and-kitchen-4-p59l-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: true,
    dealDiscountPercent: 32,
    primeEligible: true
  },
  {
    id: "prod-home-and-kitchen-5-bd7q",
    slug: "wipro-b22-9w-smart-led-bulb-pack-of-2",
    sku: "WIP-LED-9W-P2",
    name: "Wipro 9W B22 WiFi Smart LED Bulb (Pack of 2) - 16 Million Colors, Alexa & Google Compatible",
    brand: "Wipro",
    description: "Control your ambiance with 16 million colors, music sync, schedules, and voice commands.",
    specs: {
      "Brand": "Wipro",
      "Wattage": "9 Watts",
      "Cap": "B22 Indian Socket"
},
    priceMinor: 99900,
    mrpMinor: 209900,
    stock: 88,
    rating: 4.6,
    ratingCount: 25202,
    popularity: 90,
    active: true,
    categoryId: "cat-home",
    category: { id: "cat-home", name: "Home & Kitchen", slug: "home-and-kitchen" },
    images: [
      { id: "prod-home-and-kitchen-5-bd7q-img1", url: "https://images.unsplash.com/photo-1550524514-9636edecdd04?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-home-and-kitchen-5-bd7q-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-home-and-kitchen-5-bd7q-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: false,
    isDealOfTheDay: true,
    dealDiscountPercent: 52,
    primeEligible: true
  },
  {
    id: "prod-home-and-kitchen-6-xa0x",
    slug: "hawkins-contura-3-litre-hard-anodised-pressure-cooker",
    sku: "HWK-CONT-3L-HA",
    name: "Hawkins Contura 3 Litre Hard Anodised Pressure Cooker with Stainless Steel Lid",
    brand: "Hawkins",
    description: "Curved body for easy stirring and viewing. Food cooks faster and browns beautifully with less oil.",
    specs: {
      "Brand": "Hawkins",
      "Capacity": "3 Liters",
      "Base": "Hard Anodised 3.25mm"
},
    priceMinor: 187500,
    mrpMinor: 220000,
    stock: 99,
    rating: 4.8,
    ratingCount: 17623,
    popularity: 89,
    active: true,
    categoryId: "cat-home",
    category: { id: "cat-home", name: "Home & Kitchen", slug: "home-and-kitchen" },
    images: [
      { id: "prod-home-and-kitchen-6-xa0x-img1", url: "https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-home-and-kitchen-6-xa0x-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-home-and-kitchen-6-xa0x-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: true,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-home-and-kitchen-7-pncu",
    slug: "solimo-stainless-steel-induction-dutch-oven-5l",
    sku: "SOL-DO-5L-SS",
    name: "Solimo Stainless Steel Induction Bottom Dutch Oven with Glass Lid (24cm, 5 Litres)",
    brand: "Solimo",
    description: "Heavy-gauge stainless steel with encapsulated aluminium sandwich bottom for even heat distribution.",
    specs: {
      "Brand": "Solimo",
      "Capacity": "5 Liters",
      "Material": "100% Food Grade Stainless Steel"
},
    priceMinor: 129900,
    mrpMinor: 240000,
    stock: 82,
    rating: 4.2,
    ratingCount: 12274,
    popularity: 97,
    active: true,
    categoryId: "cat-home",
    category: { id: "cat-home", name: "Home & Kitchen", slug: "home-and-kitchen" },
    images: [
      { id: "prod-home-and-kitchen-7-pncu-img1", url: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-home-and-kitchen-7-pncu-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-home-and-kitchen-7-pncu-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-beauty-1-cjfh",
    slug: "loreal-paris-revitalift-1-5-hyaluronic-acid-face-serum-30ml",
    sku: "LOR-REVIT-HA-30",
    name: "L'Oreal Paris Revitalift 1.5% Hyaluronic Acid Plumping Serum for Radiant Hydrated Skin - 30ml",
    brand: "L'Oreal Paris",
    description: "Lightweight, non-sticky hyaluronic acid serum that instantly hydrates and plumps skin by +42% in 2 weeks.",
    specs: {
      "Brand": "L'Oreal Paris",
      "Volume": "30 ml",
      "Skin Type": "All Skin Types"
},
    priceMinor: 74900,
    mrpMinor: 99900,
    stock: 29,
    rating: 4.6,
    ratingCount: 2931,
    popularity: 82,
    active: true,
    categoryId: "cat-beauty",
    category: { id: "cat-beauty", name: "Beauty", slug: "beauty" },
    images: [
      { id: "prod-beauty-1-cjfh-img1", url: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-beauty-1-cjfh-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-beauty-1-cjfh-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: true,
    dealDiscountPercent: 25,
    primeEligible: true
  },
  {
    id: "prod-beauty-2-g4of",
    slug: "philips-bt3231-15-smart-beard-trimmer-series-3000",
    sku: "PHI-BT3231-15",
    name: "Philips BT3231/15 Smart Beard Trimmer Series 3000 with PowerAdapt Sensor & 60 Min Run Time",
    brand: "Philips",
    description: "Lift & Trim system cuts 30% faster with self-sharpening titanium blades and 20 lock-in length settings.",
    specs: {
      "Brand": "Philips",
      "Battery Run Time": "60 Minutes",
      "Settings": "20 Lengths"
},
    priceMinor: 169900,
    mrpMinor: 239500,
    stock: 85,
    rating: 4.4,
    ratingCount: 23216,
    popularity: 86,
    active: true,
    categoryId: "cat-beauty",
    category: { id: "cat-beauty", name: "Beauty", slug: "beauty" },
    images: [
      { id: "prod-beauty-2-g4of-img1", url: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-beauty-2-g4of-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-beauty-2-g4of-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: true,
    isDealOfTheDay: true,
    dealDiscountPercent: 29,
    primeEligible: true
  },
  {
    id: "prod-beauty-3-uj2r",
    slug: "minimalist-spf-50-pa-face-sunscreen-50g",
    sku: "MIN-SPF50-50G",
    name: "Minimalist SPF 50 PA++++ Broad Spectrum Sunscreen with Multi-Vitamins - 50g",
    brand: "Minimalist",
    description: "Photostable sunscreen with 4 very effective UV filters formulated with Niacinamide, Vitamin B5 and Vitamin F.",
    specs: {
      "Brand": "Minimalist",
      "Protection": "SPF 50 PA++++",
      "Quantity": "50 grams"
},
    priceMinor: 37900,
    mrpMinor: 39900,
    stock: 29,
    rating: 4.4,
    ratingCount: 9097,
    popularity: 83,
    active: true,
    categoryId: "cat-beauty",
    category: { id: "cat-beauty", name: "Beauty", slug: "beauty" },
    images: [
      { id: "prod-beauty-3-uj2r-img1", url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-beauty-3-uj2r-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-beauty-3-uj2r-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: false,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-beauty-4-qs7m",
    slug: "maybelline-new-york-lash-sensational-sky-high-mascara-black",
    sku: "MAYB-SKY-HIGH",
    name: "Maybelline New York Lash Sensational Sky High Waterproof Mascara - Very Black, 6ml",
    brand: "Maybelline",
    description: "Exclusive Flex Tower brush bends to volumize and extend every lash from root to tip. Infused with bamboo extract.",
    specs: {
      "Brand": "Maybelline",
      "Shade": "Very Black",
      "Waterproof": "Yes"
},
    priceMinor: 64900,
    mrpMinor: 79900,
    stock: 16,
    rating: 4.7,
    ratingCount: 25897,
    popularity: 98,
    active: true,
    categoryId: "cat-beauty",
    category: { id: "cat-beauty", name: "Beauty", slug: "beauty" },
    images: [
      { id: "prod-beauty-4-qs7m-img1", url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-beauty-4-qs7m-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-beauty-4-qs7m-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: true,
    dealDiscountPercent: 18,
    primeEligible: true
  },
  {
    id: "prod-beauty-5-dds9",
    slug: "cetaphil-gentle-skin-cleanser-for-dry-to-normal-sensitive-skin-250ml",
    sku: "CET-GSC-250ML",
    name: "Cetaphil Gentle Skin Cleanser for Dry to Normal Sensitive Skin - 250ml",
    brand: "Cetaphil",
    description: "Dermatologist-recommended non-foaming hydrating face wash that preserves skin's natural moisture barrier.",
    specs: {
      "Brand": "Cetaphil",
      "Volume": "250 ml",
      "Fragrance": "Fragrance-Free"
},
    priceMinor: 48900,
    mrpMinor: 56500,
    stock: 91,
    rating: 4.3,
    ratingCount: 19651,
    popularity: 85,
    active: true,
    categoryId: "cat-beauty",
    category: { id: "cat-beauty", name: "Beauty", slug: "beauty" },
    images: [
      { id: "prod-beauty-5-dds9-img1", url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-beauty-5-dds9-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-beauty-5-dds9-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: false,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-beauty-6-jdz6",
    slug: "neutrogena-hydro-boost-water-gel-moisturiser-50g",
    sku: "NEUT-HB-50G",
    name: "Neutrogena Hydro Boost Water Gel Moisturiser with Hyaluronic Acid - 50g",
    brand: "Neutrogena",
    description: "Refreshing water gel formula with amino acids and electrolytes that delivers 72 hours of intense hydration.",
    specs: {
      "Brand": "Neutrogena",
      "Texture": "Water Gel",
      "Weight": "50g"
},
    priceMinor: 84900,
    mrpMinor: 115000,
    stock: 67,
    rating: 4.5,
    ratingCount: 8491,
    popularity: 89,
    active: true,
    categoryId: "cat-beauty",
    category: { id: "cat-beauty", name: "Beauty", slug: "beauty" },
    images: [
      { id: "prod-beauty-6-jdz6-img1", url: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-beauty-6-jdz6-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-beauty-6-jdz6-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: true,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-beauty-7-gvpt",
    slug: "forest-essentials-soundarya-radiance-cream-24k-gold-50g",
    sku: "FE-SND-50G-GLD",
    name: "Forest Essentials Deluxe Soundarya Radiance Cream with 24K Gold & SPF 25 (50g)",
    brand: "Forest Essentials",
    description: "Ayurvedic formulation that penetrates deep to restore firmness, elasticity, and luminous radiance with pure 24K gold bhasma.",
    specs: {
      "Brand": "Forest Essentials",
      "Active": "24 Karat Gold Bhasma",
      "Weight": "50 grams"
},
    priceMinor: 520000,
    mrpMinor: 590000,
    stock: 36,
    rating: 4.3,
    ratingCount: 25122,
    popularity: 90,
    active: true,
    categoryId: "cat-beauty",
    category: { id: "cat-beauty", name: "Beauty", slug: "beauty" },
    images: [
      { id: "prod-beauty-7-gvpt-img1", url: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-beauty-7-gvpt-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-beauty-7-gvpt-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-grocery-1-42kx",
    slug: "tata-tea-gold-leaf-tea-with-gently-rolled-aromatic-long-leaves-1kg",
    sku: "TATA-GOLD-1KG",
    name: "Tata Tea Gold Leaf Tea with Gently Rolled Aromatic Long Leaves - 1kg Pouch",
    brand: "Tata Tea",
    description: "Exquisite blend of 85% Assam CTC tea and 15% gently rolled long leaves for unmatched aroma and taste.",
    specs: {
      "Brand": "Tata Tea",
      "Weight": "1 kg",
      "Type": "Black Tea CTC + Orthodox"
},
    priceMinor: 49900,
    mrpMinor: 67000,
    stock: 44,
    rating: 4.2,
    ratingCount: 3938,
    popularity: 82,
    active: true,
    categoryId: "cat-grocery",
    category: { id: "cat-grocery", name: "Grocery", slug: "grocery" },
    images: [
      { id: "prod-grocery-1-42kx-img1", url: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-grocery-1-42kx-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-grocery-1-42kx-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: true,
    dealDiscountPercent: 25,
    primeEligible: true
  },
  {
    id: "prod-grocery-2-rc0p",
    slug: "daawat-biryani-extra-long-grain-basmati-rice-5kg",
    sku: "DAW-BASM-5KG",
    name: "Daawat Biryani Basmati Rice, 5kg - World's Longest Grains with Rich Aroma",
    brand: "Daawat",
    description: "Aged to perfection, cooked grains elongate up to 24mm without breaking or sticking, ideal for royal biryanis.",
    specs: {
      "Brand": "Daawat",
      "Weight": "5 kg",
      "Grain Type": "Extra Long Grain Aged"
},
    priceMinor: 89900,
    mrpMinor: 119900,
    stock: 37,
    rating: 4.2,
    ratingCount: 15469,
    popularity: 93,
    active: true,
    categoryId: "cat-grocery",
    category: { id: "cat-grocery", name: "Grocery", slug: "grocery" },
    images: [
      { id: "prod-grocery-2-rc0p-img1", url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-grocery-2-rc0p-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-grocery-2-rc0p-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: true,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-grocery-3-78ur",
    slug: "saffola-gold-refined-cooking-oil-pro-blend-5l-can",
    sku: "SAF-GOLD-5L",
    name: "Saffola Gold Blended Edible Oil, 5L Canister | Rice Bran & Sunflower Oil",
    brand: "Saffola",
    description: "Healthy cooking oil with LOSORB technology that absorbs up to 33% less oil in fried foods. Good for heart health.",
    specs: {
      "Brand": "Saffola",
      "Volume": "5 Liters",
      "Blend": "Rice Bran + Sunflower"
},
    priceMinor: 78500,
    mrpMinor: 102500,
    stock: 94,
    rating: 4.7,
    ratingCount: 11185,
    popularity: 86,
    active: true,
    categoryId: "cat-grocery",
    category: { id: "cat-grocery", name: "Grocery", slug: "grocery" },
    images: [
      { id: "prod-grocery-3-78ur-img1", url: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-grocery-3-78ur-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-grocery-3-78ur-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: false,
    isDealOfTheDay: true,
    dealDiscountPercent: 23,
    primeEligible: true
  },
  {
    id: "prod-grocery-4-dx3o",
    slug: "ferrero-rocher-premium-hazelnut-chocolates-24-pieces-300g",
    sku: "FER-ROCH-24",
    name: "Ferrero Rocher Moments Premium Hazelnut Chocolates Gift Box, 24 Pieces (300g)",
    brand: "Ferrero Rocher",
    description: "Whole crunchy hazelnut wrapped in creamy filling, encased in a crispy wafer shell coated in milk chocolate.",
    specs: {
      "Brand": "Ferrero",
      "Count": "24 Pcs",
      "Weight": "300g"
},
    priceMinor: 94900,
    mrpMinor: 119500,
    stock: 85,
    rating: 4.8,
    ratingCount: 19090,
    popularity: 93,
    active: true,
    categoryId: "cat-grocery",
    category: { id: "cat-grocery", name: "Grocery", slug: "grocery" },
    images: [
      { id: "prod-grocery-4-dx3o-img1", url: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-grocery-4-dx3o-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-grocery-4-dx3o-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: true,
    dealDiscountPercent: 21,
    primeEligible: true
  },
  {
    id: "prod-grocery-5-pkh7",
    slug: "nescafe-gold-blend-rich-smooth-pure-instant-coffee-200g-glass-jar",
    sku: "NES-GOLD-200G",
    name: "Nescafe Gold Blend Premium Rich & Smooth Roasted Arabica Instant Coffee - 200g Glass Jar",
    brand: "Nescafe",
    description: "Golden roasted Arabica beans ground 10 times finer to unlock hidden aromas for an authentic cafe-style cup.",
    specs: {
      "Brand": "Nescafe",
      "Weight": "200 grams",
      "Packaging": "Glass Jar"
},
    priceMinor: 99900,
    mrpMinor: 125000,
    stock: 60,
    rating: 4.8,
    ratingCount: 24620,
    popularity: 85,
    active: true,
    categoryId: "cat-grocery",
    category: { id: "cat-grocery", name: "Grocery", slug: "grocery" },
    images: [
      { id: "prod-grocery-5-pkh7-img1", url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-grocery-5-pkh7-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-grocery-5-pkh7-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: false,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-grocery-6-82zn",
    slug: "tata-sampann-unpolished-toor-dal-1kg",
    sku: "TATA-TOOR-1KG",
    name: "Tata Sampann Unpolished Toor Dal / Arhar Dal, 1kg - Rich in Natural Protein",
    brand: "Tata Sampann",
    description: "Wholesome unpolished lentils retaining wholesome nutrients and original nutty flavor, certified free from chemicals.",
    specs: {
      "Brand": "Tata Sampann",
      "Weight": "1 kg",
      "Processing": "Unpolished (No Water/Oil)"
},
    priceMinor: 18500,
    mrpMinor: 23000,
    stock: 56,
    rating: 4.5,
    ratingCount: 16742,
    popularity: 94,
    active: true,
    categoryId: "cat-grocery",
    category: { id: "cat-grocery", name: "Grocery", slug: "grocery" },
    images: [
      { id: "prod-grocery-6-82zn-img1", url: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-grocery-6-82zn-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-grocery-6-82zn-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: true,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-grocery-7-jnan",
    slug: "kelloggs-real-almond-honey-muesli-1kg",
    sku: "KEL-MUES-1KG",
    name: "Kellogg's Real Almond & Honey Muesli Crunchy Breakfast Cereal, 1kg",
    brand: "Kellogg's",
    description: "Power-packed breakfast loaded with real California almonds, delicious honey, and 5 nutritious multi-grains.",
    specs: {
      "Brand": "Kellogg's",
      "Weight": "1 kg",
      "Grains": "5 Multigrains (Wheat, Oats, Corn, Rice, Barley)"
},
    priceMinor: 49900,
    mrpMinor: 69900,
    stock: 61,
    rating: 4.3,
    ratingCount: 23432,
    popularity: 92,
    active: true,
    categoryId: "cat-grocery",
    category: { id: "cat-grocery", name: "Grocery", slug: "grocery" },
    images: [
      { id: "prod-grocery-7-jnan-img1", url: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-grocery-7-jnan-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-grocery-7-jnan-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-sports-1-s3m3",
    slug: "yonex-nanoray-light-18i-graphite-badminton-racquet-strung",
    sku: "YNX-NR18I-BLK",
    name: "Yonex Nanoray Light 18i Graphite Badminton Racquet (77g, 30 lbs String Tension)",
    brand: "Yonex",
    description: "Ultra-lightweight 77g badminton racquet engineered for lightning-fast racquet speeds and dynamic repulsion on smashes.",
    specs: {
      "Brand": "Yonex",
      "Weight": "77g (5U)",
      "Tension": "Up to 30 lbs"
},
    priceMinor: 219900,
    mrpMinor: 389000,
    stock: 52,
    rating: 4.8,
    ratingCount: 17381,
    popularity: 90,
    active: true,
    categoryId: "cat-sports",
    category: { id: "cat-sports", name: "Sports", slug: "sports" },
    images: [
      { id: "prod-sports-1-s3m3-img1", url: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-sports-1-s3m3-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-sports-1-s3m3-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: true,
    dealDiscountPercent: 43,
    primeEligible: true
  },
  {
    id: "prod-sports-2-xmpu",
    slug: "cosco-torino-fifa-standard-size-5-football",
    sku: "CSC-TOR-SZ5",
    name: "Cosco Torino Hand-Stitched FIFA Standard Size 5 Football for Turf & Grass",
    brand: "Cosco",
    description: "High performance synthetic leather outer with multi-layer polyester backing for true flight and zero water absorption.",
    specs: {
      "Brand": "Cosco",
      "Size": "5 (Official)",
      "Construction": "32 Panel Hand-Stitched"
},
    priceMinor: 79900,
    mrpMinor: 125000,
    stock: 69,
    rating: 4.3,
    ratingCount: 4511,
    popularity: 88,
    active: true,
    categoryId: "cat-sports",
    category: { id: "cat-sports", name: "Sports", slug: "sports" },
    images: [
      { id: "prod-sports-2-xmpu-img1", url: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-sports-2-xmpu-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-sports-2-xmpu-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: true,
    isDealOfTheDay: true,
    dealDiscountPercent: 36,
    primeEligible: true
  },
  {
    id: "prod-sports-3-wwfw",
    slug: "kore-dm-20kg-adjustable-pvc-dumbbell-gym-set",
    sku: "KOR-DM20-GYM",
    name: "Kore DM-20kg PVC Home Gym Kit with Dumbbell Rods, Barbell Converter & Hand Gripper",
    brand: "Kore",
    description: "All-in-one home strength setup containing 20kg weight plates, curl bar converter, safety locks, and leather wrist wraps.",
    specs: {
      "Brand": "Kore",
      "Total Weight": "20 kg",
      "Material": "PVC Cement Plates"
},
    priceMinor: 149900,
    mrpMinor: 320000,
    stock: 76,
    rating: 4.3,
    ratingCount: 5337,
    popularity: 86,
    active: true,
    categoryId: "cat-sports",
    category: { id: "cat-sports", name: "Sports", slug: "sports" },
    images: [
      { id: "prod-sports-3-wwfw-img1", url: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-sports-3-wwfw-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-sports-3-wwfw-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: false,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-sports-4-ej57",
    slug: "boldfit-pro-grip-6mm-anti-tear-tpe-yoga-mat-with-strap",
    sku: "BLD-YOGA-6MM",
    name: "Boldfit Pro Grip 6mm Anti-Tear Dual Color TPE Eco-Friendly Yoga Mat with Strap",
    brand: "Boldfit",
    description: "High-density cushioned TPE foam prevents knee and joint strain with non-slip textured surfaces on both sides.",
    specs: {
      "Brand": "Boldfit",
      "Thickness": "6 mm",
      "Material": "TPE"
},
    priceMinor: 89900,
    mrpMinor: 199900,
    stock: 79,
    rating: 4.8,
    ratingCount: 3500,
    popularity: 96,
    active: true,
    categoryId: "cat-sports",
    category: { id: "cat-sports", name: "Sports", slug: "sports" },
    images: [
      { id: "prod-sports-4-ej57-img1", url: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-sports-4-ej57-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-sports-4-ej57-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: true,
    dealDiscountPercent: 55,
    primeEligible: true
  },
  {
    id: "prod-sports-5-vdm4",
    slug: "sg-savage-edition-kashmir-willow-cricket-bat",
    sku: "SG-SAVAGE-KW",
    name: "SG Savage Edition Kashmir Willow Full Size Cricket Bat with Padded Cover",
    brand: "SG",
    description: "Traditionally shaped with thick massive edges and curved blade for powerful strokes across all formats.",
    specs: {
      "Brand": "SG",
      "Willow": "Kashmir Willow Grade 1",
      "Handle": "Singapore Cane"
},
    priceMinor: 249900,
    mrpMinor: 399900,
    stock: 89,
    rating: 4.9,
    ratingCount: 12279,
    popularity: 82,
    active: true,
    categoryId: "cat-sports",
    category: { id: "cat-sports", name: "Sports", slug: "sports" },
    images: [
      { id: "prod-sports-5-vdm4-img1", url: "https://images.unsplash.com/photo-1531415074868-036b107e775a?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-sports-5-vdm4-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-sports-5-vdm4-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: false,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-sports-6-lf3b",
    slug: "nivia-storm-football-rubber-size-5",
    sku: "NIV-STRM-SZ5",
    name: "Nivia Storm Football Rubber Molded Ball (Size 5, Multicolor)",
    brand: "Nivia",
    description: "High abrasion resistance rubber construction suitable for hard surfaces, school fields, and wet weather conditions.",
    specs: {
      "Brand": "Nivia",
      "Material": "Rubberized Molded",
      "Playing Surface": "Rough Hard Ground"
},
    priceMinor: 44900,
    mrpMinor: 57000,
    stock: 51,
    rating: 4.8,
    ratingCount: 22426,
    popularity: 94,
    active: true,
    categoryId: "cat-sports",
    category: { id: "cat-sports", name: "Sports", slug: "sports" },
    images: [
      { id: "prod-sports-6-lf3b-img1", url: "https://images.unsplash.com/photo-1552667466-07770ae110d0?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-sports-6-lf3b-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-sports-6-lf3b-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: true,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-sports-7-ryis",
    slug: "garmin-forerunner-55-gps-running-smartwatch-black",
    sku: "GAR-FR55-BLK",
    name: "Garmin Forerunner 55 GPS Running Smartwatch with Heart Rate & Daily Suggested Workouts",
    brand: "Garmin",
    description: "Easy-to-use GPS running watch that monitors heart rate at the wrist and tracks pace, distance, and intervals.",
    specs: {
      "Brand": "Garmin",
      "Battery Life": "Up to 2 Weeks",
      "GPS": "Built-in High Precision"
},
    priceMinor: 1999000,
    mrpMinor: 2249000,
    stock: 57,
    rating: 4.5,
    ratingCount: 2816,
    popularity: 94,
    active: true,
    categoryId: "cat-sports",
    category: { id: "cat-sports", name: "Sports", slug: "sports" },
    images: [
      { id: "prod-sports-7-ryis-img1", url: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-sports-7-ryis-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-sports-7-ryis-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-toys-1-nou2",
    slug: "lego-technic-mclaren-senna-gtr-racing-car-building-kit-42123",
    sku: "LGO-TECH-42123",
    name: "LEGO Technic McLaren Senna GTR 42123 Collectible Sports Car Building Set (830 Pieces)",
    brand: "LEGO",
    description: "Packed with authentic features like the detailed V8 engine with moving pistons and iconic dihedral doors that open up and out.",
    specs: {
      "Brand": "LEGO",
      "Pieces": "830",
      "Age": "10+ Years"
},
    priceMinor: 449900,
    mrpMinor: 549900,
    stock: 47,
    rating: 4.4,
    ratingCount: 20791,
    popularity: 83,
    active: true,
    categoryId: "cat-toys",
    category: { id: "cat-toys", name: "Toys", slug: "toys" },
    images: [
      { id: "prod-toys-1-nou2-img1", url: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-toys-1-nou2-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-toys-1-nou2-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: true,
    dealDiscountPercent: 18,
    primeEligible: true
  },
  {
    id: "prod-toys-2-2tyn",
    slug: "hot-wheels-basic-die-cast-car-pack-of-10-assorted",
    sku: "HW-CAR-10PK",
    name: "Hot Wheels 1:64 Scale Die-Cast Toy Vehicles Pack of 10 Assorted Collectible Cars",
    brand: "Hot Wheels",
    description: "10 awesome 1:64 scale vehicles with realistic details and authentic decos ready for high-speed racing on Hot Wheels tracks.",
    specs: {
      "Brand": "Mattel Hot Wheels",
      "Scale": "1:64",
      "Count": "10 Cars"
},
    priceMinor: 119900,
    mrpMinor: 159900,
    stock: 23,
    rating: 4.6,
    ratingCount: 11818,
    popularity: 85,
    active: true,
    categoryId: "cat-toys",
    category: { id: "cat-toys", name: "Toys", slug: "toys" },
    images: [
      { id: "prod-toys-2-2tyn-img1", url: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-toys-2-2tyn-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-toys-2-2tyn-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: true,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-toys-3-rfyz",
    slug: "nerf-elite-2-0-commander-rd-6-blaster-with-12-darts",
    sku: "NRF-EL2-RD6",
    name: "Nerf Elite 2.0 Commander RD-6 Blaster with 6-Dart Rotating Drum & 12 Official Darts",
    brand: "Nerf",
    description: "Customizable blaster with 3 tactical rails and barrel and stock attachment points. Fires darts up to 90 feet (27 meters).",
    specs: {
      "Brand": "Hasbro Nerf",
      "Drum": "6 Darts",
      "Includes": "12 Foam Darts"
},
    priceMinor: 114900,
    mrpMinor: 159900,
    stock: 67,
    rating: 4.5,
    ratingCount: 1971,
    popularity: 93,
    active: true,
    categoryId: "cat-toys",
    category: { id: "cat-toys", name: "Toys", slug: "toys" },
    images: [
      { id: "prod-toys-3-rfyz-img1", url: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-toys-3-rfyz-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-toys-3-rfyz-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: false,
    isDealOfTheDay: true,
    dealDiscountPercent: 28,
    primeEligible: true
  },
  {
    id: "prod-toys-4-8xrf",
    slug: "barbie-fashionistas-doll-in-floral-dress-with-accessories",
    sku: "BRB-FASH-FLR",
    name: "Barbie Fashionistas Doll in Vibrant Summer Floral Dress with Strappy Heeled Shoes",
    brand: "Barbie",
    description: "Designed to reflect the world girls see today, this diverse line of Barbie Fashionistas showcases bright and trendy styles.",
    specs: {
      "Brand": "Barbie Mattel",
      "Height": "11.5 Inches",
      "Age": "3+ Years"
},
    priceMinor: 79900,
    mrpMinor: 109900,
    stock: 33,
    rating: 4.8,
    ratingCount: 10452,
    popularity: 83,
    active: true,
    categoryId: "cat-toys",
    category: { id: "cat-toys", name: "Toys", slug: "toys" },
    images: [
      { id: "prod-toys-4-8xrf-img1", url: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-toys-4-8xrf-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-toys-4-8xrf-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-toys-5-7x9x",
    slug: "funskool-monopoly-deluxe-classic-family-board-game",
    sku: "FUN-MONOP-DLX",
    name: "Funskool Monopoly Deluxe Classic Family Board Game for Kids and Adults",
    brand: "Funskool",
    description: "The world's favorite family property trading game with quality board, metal tokens, Chance & Community Chest cards.",
    specs: {
      "Brand": "Hasbro / Funskool",
      "Players": "2 to 8 Players",
      "Age": "8+ Years"
},
    priceMinor: 99900,
    mrpMinor: 149900,
    stock: 74,
    rating: 4.2,
    ratingCount: 10211,
    popularity: 97,
    active: true,
    categoryId: "cat-toys",
    category: { id: "cat-toys", name: "Toys", slug: "toys" },
    images: [
      { id: "prod-toys-5-7x9x-img1", url: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-toys-5-7x9x-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-toys-5-7x9x-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: false,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-toys-6-6a0r",
    slug: "play-doh-modeling-compound-8-pack-assorted-colors",
    sku: "PD-DOUGH-8PK",
    name: "Play-Doh Modeling Compound 8-Pack Non-Toxic Cans of Creative Dough",
    brand: "Play-Doh",
    description: "Squish, shape, roll, and create limitless wonders with soft non-toxic dough compound in 8 reusable airtight cans.",
    specs: {
      "Brand": "Play-Doh",
      "Net Weight": "448 grams",
      "Colors": "8 Classic Bright Colors"
},
    priceMinor: 49900,
    mrpMinor: 69900,
    stock: 69,
    rating: 4.3,
    ratingCount: 5689,
    popularity: 86,
    active: true,
    categoryId: "cat-toys",
    category: { id: "cat-toys", name: "Toys", slug: "toys" },
    images: [
      { id: "prod-toys-6-6a0r-img1", url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-toys-6-6a0r-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-toys-6-6a0r-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: true,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-toys-7-r2by",
    slug: "fisher-price-rock-a-stack-stacking-rings-baby-toy",
    sku: "FP-ROCK-STACK",
    name: "Fisher-Price Brilliant Basics Rock-a-Stack Stacking Rings for Babies",
    brand: "Fisher-Price",
    description: "Classic rocking base with 5 colorful rings to grasp, shake, and stack, helping develop eye-hand coordination.",
    specs: {
      "Brand": "Fisher-Price",
      "Age": "6+ Months",
      "Rings": "5 Colorful Rings"
},
    priceMinor: 34900,
    mrpMinor: 49900,
    stock: 17,
    rating: 4.8,
    ratingCount: 10732,
    popularity: 85,
    active: true,
    categoryId: "cat-toys",
    category: { id: "cat-toys", name: "Toys", slug: "toys" },
    images: [
      { id: "prod-toys-7-r2by-img1", url: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-toys-7-r2by-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-toys-7-r2by-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-accessories-1-is65",
    slug: "anker-powercore-20000mah-20w-fast-charging-power-bank",
    sku: "ANK-PC-20K-20W",
    name: "Anker PowerCore 20,000mAh 20W PD Ultra-High Capacity Portable Charger with PowerIQ 3.0",
    brand: "Anker",
    description: "Colossal 20,000mAh capacity provides 4+ charges for iPhone 15 and 3+ charges for Galaxy S24 with rapid 20W output.",
    specs: {
      "Brand": "Anker",
      "Capacity": "20,000 mAh",
      "Output": "20W USB-C PD"
},
    priceMinor: 279900,
    mrpMinor: 499900,
    stock: 65,
    rating: 4.3,
    ratingCount: 10199,
    popularity: 86,
    active: true,
    categoryId: "cat-accessories",
    category: { id: "cat-accessories", name: "Accessories", slug: "accessories" },
    images: [
      { id: "prod-accessories-1-is65-img1", url: "https://images.unsplash.com/photo-1609592424361-b51f084fa173?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-accessories-1-is65-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-accessories-1-is65-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: true,
    dealDiscountPercent: 44,
    primeEligible: true
  },
  {
    id: "prod-accessories-2-1i8t",
    slug: "spigen-dura-sync-60w-braided-usb-c-to-usb-c-cable-1-5m",
    sku: "SPG-DS-60W-15M",
    name: "Spigen DuraSync 60W USB-C to USB-C Heavy Duty Braided Charging Cable (1.5m / 5ft)",
    brand: "Spigen",
    description: "Tested to withstand 30,000+ bends. Supports up to 60W Power Delivery charging and 480Mbps fast data syncing.",
    specs: {
      "Brand": "Spigen",
      "Length": "1.5 Meters",
      "Power": "60W PD (20V/3A)"
},
    priceMinor: 79900,
    mrpMinor: 149900,
    stock: 68,
    rating: 4.9,
    ratingCount: 1080,
    popularity: 93,
    active: true,
    categoryId: "cat-accessories",
    category: { id: "cat-accessories", name: "Accessories", slug: "accessories" },
    images: [
      { id: "prod-accessories-2-1i8t-img1", url: "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-accessories-2-1i8t-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-accessories-2-1i8t-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: true,
    isDealOfTheDay: true,
    dealDiscountPercent: 46,
    primeEligible: true
  },
  {
    id: "prod-accessories-3-85ki",
    slug: "tommy-hilfiger-mens-leather-rfid-blocking-passcase-wallet-tan",
    sku: "TH-WAL-RFID-TAN",
    name: "Tommy Hilfiger Men's Genuine Leather Bifold Passcase Wallet with RFID Blocking - Tan Brown",
    brand: "Tommy Hilfiger",
    description: "100% handcrafted genuine leather with embossed logo, 6 card slots, removable ID passcase, and RFID fraud protection.",
    specs: {
      "Brand": "Tommy Hilfiger",
      "Material": "100% Leather",
      "Security": "RFID Blocking"
},
    priceMinor: 189900,
    mrpMinor: 329900,
    stock: 88,
    rating: 4.1,
    ratingCount: 19421,
    popularity: 88,
    active: true,
    categoryId: "cat-accessories",
    category: { id: "cat-accessories", name: "Accessories", slug: "accessories" },
    images: [
      { id: "prod-accessories-3-85ki-img1", url: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-accessories-3-85ki-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-accessories-3-85ki-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: false,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-accessories-4-sqer",
    slug: "ugreen-revodok-7-in-1-usb-c-hub-4k60hz-hdmi-100w-pd",
    sku: "UGR-HUB-7IN1",
    name: "UGREEN Revodok 7-in-1 USB-C Hub Adapter with 4K@60Hz HDMI & 100W PD Pass-Through",
    brand: "UGREEN",
    description: "Transform your single USB-C port into a high-powered workstation hub supporting crisp 4K 60Hz video and 100W power delivery.",
    specs: {
      "Brand": "UGREEN",
      "Ports": "7 Ports",
      "Resolution": "4K@60Hz HDMI"
},
    priceMinor: 269900,
    mrpMinor: 450000,
    stock: 94,
    rating: 4.8,
    ratingCount: 24812,
    popularity: 82,
    active: true,
    categoryId: "cat-accessories",
    category: { id: "cat-accessories", name: "Accessories", slug: "accessories" },
    images: [
      { id: "prod-accessories-4-sqer-img1", url: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-accessories-4-sqer-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-accessories-4-sqer-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: true,
    dealDiscountPercent: 40,
    primeEligible: true
  },
  {
    id: "prod-accessories-5-yz9g",
    slug: "bose-soundlink-micro-bluetooth-speaker-black",
    sku: "BOS-SLM-BLK",
    name: "Bose SoundLink Micro Bluetooth Speaker - Waterproof Outdoor Portable (Black)",
    brand: "Bose",
    description: "Crisp, balanced sound with unmatched bass for its size. Rugged tear-resistant silicone strap attaches anywhere.",
    specs: {
      "Brand": "Bose",
      "Waterproof": "IP67",
      "Battery": "Up to 6 Hours",
      "Weight": "290g"
},
    priceMinor: 990000,
    mrpMinor: 1290000,
    stock: 50,
    rating: 4.1,
    ratingCount: 5306,
    popularity: 82,
    active: true,
    categoryId: "cat-accessories",
    category: { id: "cat-accessories", name: "Accessories", slug: "accessories" },
    images: [
      { id: "prod-accessories-5-yz9g-img1", url: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-accessories-5-yz9g-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-accessories-5-yz9g-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: false,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-accessories-6-xcho",
    slug: "dailyobjects-city-compact-vegan-leather-sling-bag-olive",
    sku: "DO-SLNG-OLV",
    name: "DailyObjects City Compact Vegan Leather Crossbody Messenger Sling Bag - Olive Green",
    brand: "DailyObjects",
    description: "Minimalist urban sling crafted from durable vegan leather with YKK water-repellent zippers and adjustable strap.",
    specs: {
      "Brand": "DailyObjects",
      "Material": "Recycled Vegan Leather",
      "Pockets": "Quick Access Front + Internal Organiser"
},
    priceMinor: 149900,
    mrpMinor: 299900,
    stock: 46,
    rating: 4.6,
    ratingCount: 22715,
    popularity: 94,
    active: true,
    categoryId: "cat-accessories",
    category: { id: "cat-accessories", name: "Accessories", slug: "accessories" },
    images: [
      { id: "prod-accessories-6-xcho-img1", url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-accessories-6-xcho-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-accessories-6-xcho-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: true,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-accessories-7-pmwt",
    slug: "belkin-3-in-1-magsafe-wireless-charging-stand-15w",
    sku: "BELK-MAG3-15W",
    name: "Belkin 3-in-1 MagSafe Fast Wireless Charging Stand 15W for iPhone, Apple Watch & AirPods",
    brand: "Belkin",
    description: "Architectural stainless-steel charging stand delivers ultra-fast 15W magnetic wireless charging to all Apple gear simultaneously.",
    specs: {
      "Brand": "Belkin",
      "MagSafe": "Official 15W Certified",
      "Compatibility": "iPhone, Apple Watch, AirPods"
},
    priceMinor: 1199900,
    mrpMinor: 1499900,
    stock: 49,
    rating: 4.5,
    ratingCount: 5303,
    popularity: 84,
    active: true,
    categoryId: "cat-accessories",
    category: { id: "cat-accessories", name: "Accessories", slug: "accessories" },
    images: [
      { id: "prod-accessories-7-pmwt-img1", url: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-accessories-7-pmwt-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-accessories-7-pmwt-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-electronics-1-212r",
    slug: "sony-bravia-55-inch-4k-ultra-hd-smart-led-google-tv",
    sku: "SNY-TV-55X74L",
    name: "Sony Bravia 55-inch 4K Ultra HD Smart LED Google TV with Dolby Vision & Atmos",
    brand: "Sony",
    description: "X1 4K processor delivers lifelike colors and contrasts. Google TV brings together 700,000+ movies and episodes.",
    specs: {
      "Brand": "Sony",
      "Screen Size": "55 Inch",
      "Resolution": "4K Ultra HD (3840x2160)",
      "Audio": "20W Dolby Audio"
},
    priceMinor: 5499000,
    mrpMinor: 7490000,
    stock: 27,
    rating: 4.2,
    ratingCount: 3159,
    popularity: 89,
    active: true,
    categoryId: "cat-electronics",
    category: { id: "cat-electronics", name: "Electronics", slug: "electronics" },
    images: [
      { id: "prod-electronics-1-212r-img1", url: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-electronics-1-212r-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-electronics-1-212r-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: true,
    dealDiscountPercent: 26,
    primeEligible: true
  },
  {
    id: "prod-electronics-2-qnom",
    slug: "gopro-hero12-black-action-camera-5-3k-video",
    sku: "GP-HERO12-BLK",
    name: "GoPro HERO12 Black - Waterproof Action Camera with 5.3K HDR Video, HyperSmooth 6.0",
    brand: "GoPro",
    description: "Incredible image quality, even better HyperSmooth video stabilization and a huge boost in battery performance.",
    specs: {
      "Brand": "GoPro",
      "Video": "5.3K60 + 4K120",
      "Stabilization": "HyperSmooth 6.0",
      "Waterproof": "Up to 10m"
},
    priceMinor: 3799000,
    mrpMinor: 4500000,
    stock: 86,
    rating: 4.6,
    ratingCount: 7217,
    popularity: 91,
    active: true,
    categoryId: "cat-electronics",
    category: { id: "cat-electronics", name: "Electronics", slug: "electronics" },
    images: [
      { id: "prod-electronics-2-qnom-img1", url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-electronics-2-qnom-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-electronics-2-qnom-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: true,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-electronics-3-k9lj",
    slug: "dji-mini-4-pro-drone-4k-hdr-video",
    sku: "DJI-MINI4-RC2",
    name: "DJI Mini 4 Pro Drone with DJI RC 2 Remote Controller, 4K HDR Video, Omnidirectional Sensing",
    brand: "DJI",
    description: "Weighing less than 249g, Mini 4 Pro supports omnidirectional obstacle sensing, 4K/60fps HDR true vertical shooting.",
    specs: {
      "Brand": "DJI",
      "Weight": "Under 249g",
      "Range": "20km FHD Video Transmission",
      "Flight Time": "34 Mins"
},
    priceMinor: 9999000,
    mrpMinor: 11500000,
    stock: 85,
    rating: 4.8,
    ratingCount: 22640,
    popularity: 84,
    active: true,
    categoryId: "cat-electronics",
    category: { id: "cat-electronics", name: "Electronics", slug: "electronics" },
    images: [
      { id: "prod-electronics-3-k9lj-img1", url: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-electronics-3-k9lj-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-electronics-3-k9lj-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: false,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-electronics-4-6sd7",
    slug: "jbl-flip-6-wireless-portable-bluetooth-speaker",
    sku: "JBL-FLIP6-BLK",
    name: "JBL Flip 6 Wireless Portable Bluetooth Speaker with Powerful Sound & Deep Bass (IP67)",
    brand: "JBL",
    description: "2-way speaker system designed to deliver loud, crystal clear, powerful sound with dual passive radiators.",
    specs: {
      "Brand": "JBL",
      "Battery": "12 Hours",
      "Waterproof": "IP67 Dust & Water Proof",
      "Output": "30W RMS"
},
    priceMinor: 999900,
    mrpMinor: 1399900,
    stock: 29,
    rating: 4.1,
    ratingCount: 24277,
    popularity: 82,
    active: true,
    categoryId: "cat-electronics",
    category: { id: "cat-electronics", name: "Electronics", slug: "electronics" },
    images: [
      { id: "prod-electronics-4-6sd7-img1", url: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-electronics-4-6sd7-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-electronics-4-6sd7-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: true,
    isAmazonChoice: false,
    isDealOfTheDay: true,
    dealDiscountPercent: 28,
    primeEligible: true
  },
  {
    id: "prod-electronics-5-k84z",
    slug: "sony-alpha-7-iv-full-frame-mirrorless-camera-body",
    sku: "SNY-A7M4-BODY",
    name: "Sony Alpha 7 IV Full-Frame Mirrorless Interchangeable Lens Camera Body (33MP, 4K 60p)",
    brand: "Sony",
    description: "Groundbreaking hybrid stills and video performance with BIONZ XR processing engine and real-time eye AF for humans, animals, birds.",
    specs: {
      "Brand": "Sony",
      "Sensor": "33MP Full-Frame Exmor R CMOS",
      "AF": "759 Phase Detection Points",
      "Video": "4K 60p 10-Bit 4:2:2"
},
    priceMinor: 21999000,
    mrpMinor: 24299000,
    stock: 70,
    rating: 4.5,
    ratingCount: 13330,
    popularity: 89,
    active: true,
    categoryId: "cat-electronics",
    category: { id: "cat-electronics", name: "Electronics", slug: "electronics" },
    images: [
      { id: "prod-electronics-5-k84z-img1", url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80", position: 0 }
    ],
    reviews: [
      {
        id: "rev-prod-electronics-5-k84z-1",
        author: "Aditya K.",
        rating: 5,
        title: "Genuine quality, arrived on time!",
        comment: "Excellent product from Renzocart. Delivered in tamper-proof packaging, works flawlessly.",
        date: "10 Oct 2026",
        verified: true
      },
      {
        id: "rev-prod-electronics-5-k84z-2",
        author: "Meera Nair",
        rating: 4,
        title: "Value for money purchase",
        comment: "Really happy with the build and features. Would recommend to friends and family.",
        date: "04 Oct 2026",
        verified: true
      }
    ],
    isBestSeller: false,
    isAmazonChoice: false,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-extra-1-9x5f",
    slug: "apple-watch-series-9-gps-45mm-midnight",
    sku: "APL-WAT-S9-45M",
    name: "Apple Watch Series 9 GPS 45mm Midnight Aluminium Case",
    brand: "Apple",
    description: "Smarter, brighter, and mightier with S9 SiP, double tap gesture, and on-device Siri.",
    specs: {
      "Brand": "Apple",
      "Case": "45mm Aluminium",
      "Display": "Always-On Retina"
},
    priceMinor: 4490000,
    mrpMinor: 4990000,
    stock: 45,
    rating: 4.6,
    ratingCount: 8400,
    popularity: 92,
    active: true,
    categoryId: "cat-accessories",
    category: { id: "cat-accessories", name: "Accessories", slug: "accessories" },
    images: [{ id: "prod-extra-1-9x5f-img1", url: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&auto=format&fit=crop&q=80", position: 0 }],
    reviews: [
      { id: 'rev-1', author: 'Deepak M.', rating: 5, title: 'Superb quality', comment: 'Authentic item from Renzocart, fast shipping.', date: '08 Oct 2026', verified: true }
    ],
    isBestSeller: true,
    isAmazonChoice: true,
    isDealOfTheDay: true,
    dealDiscountPercent: 10,
    primeEligible: true
  },
  {
    id: "prod-extra-2-0in0",
    slug: "logitech-g502-hero-high-performance-gaming-mouse",
    sku: "LOG-G502-HERO",
    name: "Logitech G502 HERO High Performance Wired Gaming Mouse",
    brand: "Logitech",
    description: "Hero 25K optical sensor with customizable RGB lighting and adjustable weights.",
    specs: {
      "Brand": "Logitech",
      "Sensor": "HERO 25K DPI",
      "Buttons": "11 Programmable"
},
    priceMinor: 399500,
    mrpMinor: 549500,
    stock: 45,
    rating: 4.6,
    ratingCount: 8400,
    popularity: 92,
    active: true,
    categoryId: "cat-computers",
    category: { id: "cat-computers", name: "Computers", slug: "computers" },
    images: [{ id: "prod-extra-2-0in0-img1", url: "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?w=800&auto=format&fit=crop&q=80", position: 0 }],
    reviews: [
      { id: 'rev-1', author: 'Deepak M.', rating: 5, title: 'Superb quality', comment: 'Authentic item from Renzocart, fast shipping.', date: '08 Oct 2026', verified: true }
    ],
    isBestSeller: false,
    isAmazonChoice: true,
    isDealOfTheDay: true,
    dealDiscountPercent: 27,
    primeEligible: true
  },
  {
    id: "prod-extra-3-qqci",
    slug: "oneplus-bullets-wireless-z2-earphones-black",
    sku: "OP-BW-Z2-BLK",
    name: "OnePlus Bullets Wireless Z2 Bluetooth in-Ear Earphones with Mic (Magico Black)",
    brand: "OnePlus",
    description: "Massive 12.4mm bass drivers deliver deep, immersive sound with anti-distortion tech.",
    specs: {
      "Brand": "OnePlus",
      "Battery": "30 Hours",
      "Charge": "10 Mins for 20 Hours"
},
    priceMinor: 199900,
    mrpMinor: 229900,
    stock: 45,
    rating: 4.6,
    ratingCount: 8400,
    popularity: 92,
    active: true,
    categoryId: "cat-electronics",
    category: { id: "cat-electronics", name: "Electronics", slug: "electronics" },
    images: [{ id: "prod-extra-3-qqci-img1", url: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=800&auto=format&fit=crop&q=80", position: 0 }],
    reviews: [
      { id: 'rev-1', author: 'Deepak M.', rating: 5, title: 'Superb quality', comment: 'Authentic item from Renzocart, fast shipping.', date: '08 Oct 2026', verified: true }
    ],
    isBestSeller: true,
    isAmazonChoice: true,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-extra-4-f8lg",
    slug: "cosco-light-tennis-cricket-ball-pack-of-6",
    sku: "CSC-BALL-6PK",
    name: "Cosco Light Tennis Cricket Ball Pack of 6 Heavy Duty Red Balls",
    brand: "Cosco",
    description: "Durable interlocking felt fibers for consistent bounce on asphalt and turf.",
    specs: {
      "Brand": "Cosco",
      "Pack": "6 Balls",
      "Core": "Natural Rubber"
},
    priceMinor: 49900,
    mrpMinor: 69900,
    stock: 45,
    rating: 4.6,
    ratingCount: 8400,
    popularity: 92,
    active: true,
    categoryId: "cat-sports",
    category: { id: "cat-sports", name: "Sports", slug: "sports" },
    images: [{ id: "prod-extra-4-f8lg-img1", url: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80", position: 0 }],
    reviews: [
      { id: 'rev-1', author: 'Deepak M.', rating: 5, title: 'Superb quality', comment: 'Authentic item from Renzocart, fast shipping.', date: '08 Oct 2026', verified: true }
    ],
    isBestSeller: false,
    isAmazonChoice: true,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-extra-5-p7ii",
    slug: "pampers-all-round-protection-baby-diapers-l-64",
    sku: "PAM-DIAP-L64",
    name: "Pampers All round Protection Baby Diaper Pants, Large (L) 64 Count",
    brand: "Pampers",
    description: "Anti-rash lotion with Aloe Vera and magic gel layer provides up to 12 hours absorption.",
    specs: {
      "Brand": "Pampers",
      "Size": "Large (9-14 kg)",
      "Count": "64 Pants"
},
    priceMinor: 99900,
    mrpMinor: 129900,
    stock: 45,
    rating: 4.6,
    ratingCount: 8400,
    popularity: 92,
    active: true,
    categoryId: "cat-toys",
    category: { id: "cat-toys", name: "Toys", slug: "toys" },
    images: [{ id: "prod-extra-5-p7ii-img1", url: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&auto=format&fit=crop&q=80", position: 0 }],
    reviews: [
      { id: 'rev-1', author: 'Deepak M.', rating: 5, title: 'Superb quality', comment: 'Authentic item from Renzocart, fast shipping.', date: '08 Oct 2026', verified: true }
    ],
    isBestSeller: true,
    isAmazonChoice: true,
    isDealOfTheDay: true,
    dealDiscountPercent: 23,
    primeEligible: true
  },
  {
    id: "prod-extra-6-mniv",
    slug: "sennheiser-accentum-plus-wireless-headphones-anc",
    sku: "SNN-ACC-PLS",
    name: "Sennheiser Accentum Plus Wireless Bluetooth Over-Ear Headphones (ANC, 50H Battery)",
    brand: "Sennheiser",
    description: "Sennheiser sound with acoustic transducer system, hybrid adaptive ANC, and fast charge.",
    specs: {
      "Brand": "Sennheiser",
      "Battery": "50 Hours",
      "ANC": "Hybrid Adaptive"
},
    priceMinor: 1499000,
    mrpMinor: 1899000,
    stock: 45,
    rating: 4.6,
    ratingCount: 8400,
    popularity: 92,
    active: true,
    categoryId: "cat-electronics",
    category: { id: "cat-electronics", name: "Electronics", slug: "electronics" },
    images: [{ id: "prod-extra-6-mniv-img1", url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80", position: 0 }],
    reviews: [
      { id: 'rev-1', author: 'Deepak M.', rating: 5, title: 'Superb quality', comment: 'Authentic item from Renzocart, fast shipping.', date: '08 Oct 2026', verified: true }
    ],
    isBestSeller: false,
    isAmazonChoice: true,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-extra-7-n4un",
    slug: "cadbury-celebrations-rich-dry-fruit-chocolate-gift-pack-400g",
    sku: "CAD-DF-400G",
    name: "Cadbury Celebrations Rich Dry Fruit Assorted Chocolate Gift Pack, 400g",
    brand: "Cadbury",
    description: "Rich chocolate coated almonds and cashews packaged in an elegant festive gift box.",
    specs: {
      "Brand": "Cadbury",
      "Weight": "400 grams",
      "Assortment": "Almonds & Cashews in Chocolate"
},
    priceMinor: 45000,
    mrpMinor: 55000,
    stock: 45,
    rating: 4.6,
    ratingCount: 8400,
    popularity: 92,
    active: true,
    categoryId: "cat-grocery",
    category: { id: "cat-grocery", name: "Grocery", slug: "grocery" },
    images: [{ id: "prod-extra-7-n4un-img1", url: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800&auto=format&fit=crop&q=80", position: 0 }],
    reviews: [
      { id: 'rev-1', author: 'Deepak M.', rating: 5, title: 'Superb quality', comment: 'Authentic item from Renzocart, fast shipping.', date: '08 Oct 2026', verified: true }
    ],
    isBestSeller: true,
    isAmazonChoice: true,
    isDealOfTheDay: true,
    dealDiscountPercent: 18,
    primeEligible: true
  },
  {
    id: "prod-extra-8-rb4n",
    slug: "ray-ban-wayfarer-classic-polarized-black-sunglasses",
    sku: "RB-2140-POL",
    name: "Ray-Ban Wayfarer Classic Polarized Black Sunglasses (RB2140)",
    brand: "Ray-Ban",
    description: "Since its design in 1952, Wayfarer gained popularity among celebrities and artists.",
    specs: {
      "Brand": "Ray-Ban",
      "Lens": "Polarized Green Classic G-15",
      "Frame": "Acetate Black"
},
    priceMinor: 999000,
    mrpMinor: 1199000,
    stock: 45,
    rating: 4.6,
    ratingCount: 8400,
    popularity: 92,
    active: true,
    categoryId: "cat-accessories",
    category: { id: "cat-accessories", name: "Accessories", slug: "accessories" },
    images: [{ id: "prod-extra-8-rb4n-img1", url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80", position: 0 }],
    reviews: [
      { id: 'rev-1', author: 'Deepak M.', rating: 5, title: 'Superb quality', comment: 'Authentic item from Renzocart, fast shipping.', date: '08 Oct 2026', verified: true }
    ],
    isBestSeller: false,
    isAmazonChoice: true,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  },
  {
    id: "prod-extra-9-7mwi",
    slug: "prestige-iris-plus-750w-mixer-grinder-4-jars",
    sku: "PRS-IRIS-750W",
    name: "Prestige IRIS Plus 750 Watt Mixer Grinder with 4 Jars (3 Stainless Steel + Juicer)",
    brand: "Prestige",
    description: "Heavy duty 750W motor with all-round flow breaker jars and ergonomic handles.",
    specs: {
      "Brand": "Prestige",
      "Wattage": "750 Watts",
      "Jars": "4 (Juicer jar included)"
},
    priceMinor: 299900,
    mrpMinor: 619500,
    stock: 45,
    rating: 4.6,
    ratingCount: 8400,
    popularity: 92,
    active: true,
    categoryId: "cat-home",
    category: { id: "cat-home", name: "Home & Kitchen", slug: "home-and-kitchen" },
    images: [{ id: "prod-extra-9-7mwi-img1", url: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=800&auto=format&fit=crop&q=80", position: 0 }],
    reviews: [
      { id: 'rev-1', author: 'Deepak M.', rating: 5, title: 'Superb quality', comment: 'Authentic item from Renzocart, fast shipping.', date: '08 Oct 2026', verified: true }
    ],
    isBestSeller: true,
    isAmazonChoice: true,
    isDealOfTheDay: true,
    dealDiscountPercent: 51,
    primeEligible: true
  },
  {
    id: "prod-extra-10-i0fg",
    slug: "maybelline-super-stay-matte-ink-liquid-lipstick-ruler",
    sku: "MAYB-SS-80R",
    name: "Maybelline New York Super Stay Matte Ink Liquid Lipstick - 80 Ruler, 5ml",
    brand: "Maybelline",
    description: "Intensely pigmented liquid matte formula with unique arrow precision applicator.",
    specs: {
      "Brand": "Maybelline",
      "Shade": "80 Ruler (Mauve)",
      "Stay": "Up to 16 Hours"
},
    priceMinor: 52000,
    mrpMinor: 69900,
    stock: 45,
    rating: 4.6,
    ratingCount: 8400,
    popularity: 92,
    active: true,
    categoryId: "cat-beauty",
    category: { id: "cat-beauty", name: "Beauty", slug: "beauty" },
    images: [{ id: "prod-extra-10-i0fg-img1", url: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80", position: 0 }],
    reviews: [
      { id: 'rev-1', author: 'Deepak M.', rating: 5, title: 'Superb quality', comment: 'Authentic item from Renzocart, fast shipping.', date: '08 Oct 2026', verified: true }
    ],
    isBestSeller: false,
    isAmazonChoice: true,
    isDealOfTheDay: false,
    dealDiscountPercent: 15,
    primeEligible: true
  }
];
