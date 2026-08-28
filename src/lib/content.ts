/**
 * ─────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR SITE COPY
 *  Everything the client may want to change lives in this file.
 *  Items marked  // TODO  are placeholders awaiting real details.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Timothy Daniel",
  role: "Pastor · Humanitarian · Author · Creative",
  slogan: "Carrying Fire. Speaking Truth. Serving People.",
  tagline: "Equipping a generation, restoring lives, and demonstrating the love of Jesus.",
  location: "Colombo, Sri Lanka",
  // TODO: replace with the real domain once the client points DNS at Vercel
  url: "https://pastortimothydaniel.com",
  email: "hello@pastortimothydaniel.com", // TODO
  description:
    "Pastor Timothy Daniel is a preacher, humanitarian, author and creative communicator carrying fire, speaking truth, and serving people across Sri Lanka and beyond.",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Messages", href: "#messages" },
  { label: "Outreach", href: "#outreach" },
  { label: "Books & Music", href: "/books" },
  { label: "Contact", href: "#contact" },
];

export const navCta = { label: "Partner with the mission", href: "#contact" };

/* ── HERO ─────────────────────────────────────────────────── */

export const hero = {
  kicker: "Pastor · Humanitarian · Author · Creative",
  lines: ["Carrying fire.", "Speaking truth.", "Serving people."],
  sub: "Equipping a generation, restoring lives, and demonstrating the love of Jesus — in word and deed.",
  primaryCta: { label: "Watch the latest message", href: "#messages" },
  secondaryCta: { label: "Discover my story", href: "#about" },
};

/* ── ABOUT · MEET TIMOTHY ─────────────────────────────────── */

export const meet = {
  eyebrow: "Meet Timothy",
  heading: "One calling, carried in every room.",
  body: [
    "Pastor Timothy Daniel is a preacher, humanitarian, author and creative communicator passionate about helping people discover their identity, encounter the heart of God, and fulfil their God-given purpose.",
    "From preaching and mentoring young people to serving vulnerable communities across Sri Lanka, his calling is expressed through one mission: to carry God's presence, communicate His truth, and make His love visible.",
  ],
  familyNote:
    "He lives in Colombo with his wife, Viji, and their children — the same conviction that shapes his ministry shapes his home: serving God, strengthening family, and living the Gospel in word and deed.",
  cta: { label: "Read my story", href: "#calling" },
};

export const family = {
  caption: "Timothy & Viji",
};

/* ── ONE CALLING. MANY EXPRESSIONS. ──────────────────────────── */

export const calling = {
  eyebrow: "One calling",
  heading: "One calling. Many expressions.",
  cards: [
    {
      no: "01",
      title: "Preach",
      body: "Communicating biblical truth with depth, clarity and relevance.",
    },
    {
      no: "02",
      title: "Equip",
      body: "Raising confident, discerning and Spirit-filled young leaders.",
    },
    {
      no: "03",
      title: "Serve",
      body: "Bringing practical help and lasting hope to vulnerable communities.",
    },
    {
      no: "04",
      title: "Create",
      body: "Sharing truth through books, music, podcasts and digital content.",
    },
  ],
};

/** Where the "Preach / Equip / Serve" expressions are actually lived out. */
export const organisations = [
  {
    name: "The Father's House Church",
    role: "Youth & Young Adults Pastor",
    blurb:
      "Leading the youth and young adults ministry in Colombo, while overseeing the Children's Ministry and the Media Ministry.",
  },
  {
    name: "Kingdom Kidz",
    role: "Founder & CEO",
    blurb:
      "Creating resources, programmes, and experiences that make biblical truth accessible, memorable, and joyful for children.",
  },
  {
    name: "Word & Deed Lanka",
    role: "Chief Executive Officer",
    blurb:
      "A humanitarian organisation serving vulnerable children, families, and underserved communities across Sri Lanka.",
  },
];

/* ── FEATURED MESSAGE / MESSAGES LIBRARY ─────────────────────── */

export const messages = {
  eyebrow: "Messages",
  heading: "Truth for real life.",
  body: "Messages that go beyond inspiration — helping you grow deeper, heal inwardly, and live with purpose.",
  categories: ["Identity & Purpose", "Inner Healing", "Holiness & God's Presence"],
};

/* ── TIM DROPS TRUTH ──────────────────────────────────────── */

export const truth = {
  name: "Tim Drops Truth",
  eyebrow: "60 seconds. Timeless truth.",
  heading: "Tim Drops Truth",
  body: "Tim Drops Truth brings biblical revelation into the real conversations facing today's generation — identity, relationships, mental health, holiness, purpose and culture.",
  kicker: "No filters. No empty hype. Just truth that challenges, heals and transforms.",
  cta: { label: "Watch Tim Drops Truth", href: "/truth" },
  // TODO: swap in real @handles once confirmed
  handle: "@timdropstruth",
  socials: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "TikTok", href: "https://tiktok.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
  ],
  // The drops grid itself is pulled live from YouTube (src/lib/youtube.ts,
  // getShorts) — anything under 3 minutes on the connected channel. See README.
  themes: [
    "Identity",
    "Purpose",
    "Holiness",
    "Emotional Healing",
    "Mental Health",
    "Relationships",
    "Spiritual Growth",
  ],
};

export const wordAndDeedUrl = "https://worddeedlanka.org"; // TODO: confirm real URL

/* ── HUMANITARIAN IMPACT · WORD & DEED LANKA ─────────────────── */

export const impact = {
  eyebrow: "Word & Deed Lanka",
  heading: "Love must become visible.",
  body: "Through Word & Deed Lanka, Timothy and a committed team serve children, families and underserved communities across Sri Lanka — bringing practical assistance, spiritual hope and opportunities for lasting transformation.",
  kicker: "Because the Gospel must be heard through our words and experienced through our actions.",
  primaryCta: { label: "Explore our impact", href: wordAndDeedUrl, external: true },
  secondaryCta: { label: "Partner with us", href: "#contact" },
  // TODO: update these figures as the ministry's reach grows
  counters: [
    { value: "3,000+", label: "Children reached" },
    { value: "9", label: "Regions served across Sri Lanka" },
    { value: "21", label: "Committed volunteers" },
    { value: "1", label: "Mission: hope in word and deed" },
  ],
};

/* ── BOOKS ────────────────────────────────────────────────── */

export type Book = {
  title: string;
  subtitle: string;
  audience: "Children" | "Adults" | "Youth";
  year: string;
  blurb: string;
  status: "available" | "coming-soon";
  featured?: boolean;
  link?: string;
  spine: string; // cover gradient
};

// TODO: confirm release years and purchase links once titles go live
export const books: Book[] = [
  {
    title: "Built to Carry Fire",
    subtitle: "You were built to carry fire.",
    audience: "Youth",
    year: "—",
    blurb:
      "A call to awaken faith, deepen spiritual understanding, and carry what God has placed within you — without apology.",
    status: "coming-soon",
    featured: true,
    spine: "linear-gradient(150deg,#F0824E,#E2572B 55%,#7A2410)",
  },
  {
    title: "Grasshopper or Grapetaster Mentality",
    subtitle: "A book on identity and perspective",
    audience: "Youth",
    year: "—",
    blurb:
      "On seeing yourself the way God sees you — trading a grasshopper mentality for the courage to taste the grapes of the promise.",
    status: "coming-soon",
    spine: "linear-gradient(150deg,#C99A4E,#8A6530 58%,#3D2C14)",
  },
  {
    title: "Courage Over Fear",
    subtitle: "A book for adults",
    audience: "Adults",
    year: "—",
    blurb:
      "On facing what frightens you with a faith that is bigger — practical courage for anxiety, doubt, and the unknown.",
    status: "coming-soon",
    spine: "linear-gradient(150deg,#7F8B93,#3C464C 58%,#1A1F22)",
  },
  {
    title: "Kingdom Kidz Storybooks",
    subtitle: "Teaching resources for children",
    audience: "Children",
    year: "—",
    blurb:
      "Storytelling and discipleship resources created through Kingdom Kidz — biblical truth made vivid and memorable for young readers.",
    status: "coming-soon",
    spine: "linear-gradient(150deg,#E0BC7E,#C99A4E 58%,#6B4A1E)",
  },
];

export const booksIntro = {
  eyebrow: "Books & Resources",
  heading: "You were built to carry fire.",
  body: "Discover books, devotionals and discipleship resources created to awaken faith, deepen spiritual understanding, and equip you to carry what God has placed within you.",
  cta: { label: "Explore the books", href: "/books" },
};

/* ── HOME · LATEST RELEASES ───────────────────────────────── */

export const latest = {
  eyebrow: "Latest",
  heading: "Fresh off the desk.",
  body: "A running log of what's new — the newest drop from Tim Drops Truth and the latest title in print.",
};

/* ── MUSIC & PODCAST ──────────────────────────────────────── */

export const music = {
  name: "TIMDAN",
  eyebrow: "Original Worship Music",
  tagline: "Songs to lead you into His presence.",
  body: "Songs created to lead people into reflection, worship and the presence of God.",
  cta: { label: "Listen to the music", href: "#" }, // TODO: real streaming links
  // TODO: real streaming links
  links: [
    { label: "Spotify", href: "https://spotify.com/" },
    { label: "Apple Music", href: "https://music.apple.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
  ],
};

export const podcast = {
  name: "The Altar Talk",
  eyebrow: "Podcast",
  tagline: "Where real life meets God's truth.",
  body: "Unhurried conversations about the things people actually wrestle with — doubt, healing, calling, relationships, and the slow work of becoming whole.",
  cta: { label: "Hear the podcast", href: "#" },
  // TODO: real podcast links
  links: [
    { label: "Spotify", href: "https://spotify.com/" },
    { label: "Apple Podcasts", href: "https://podcasts.apple.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
  ],
};

/* ── FINAL CALL TO ACTION ─────────────────────────────────── */

export const finalCta = {
  eyebrow: "Join the mission",
  heading: "Let's carry the fire together.",
  body: "Invite Pastor Timothy to speak, partner with the humanitarian mission, access life-changing resources, or connect with the growing online community.",
  kicker: "The next life transformed could begin with your yes.",
  ctas: [
    { label: "Invite Timothy", href: "#contact" },
    { label: "Become a partner", href: "#contact" },
    { label: "Get in touch", href: "#contact" },
  ],
};

/* ── CONTACT ──────────────────────────────────────────────── */

export const contact = {
  eyebrow: "Contact",
  heading: "Let's carry the fire together.",
  body: "For preaching invitations, conferences, youth events, school programmes, counselling enquiries, media, or partnership with Word & Deed Lanka.",
  reasons: [
    "Speaking / preaching invitation",
    "Youth or young adults event",
    "Kingdom Kidz / children's programme",
    "Word & Deed Lanka partnership",
    "Podcast or media request",
    "Something else",
  ],
};

/* ── SOCIAL / FOOTER ──────────────────────────────────────── */

export const socials = [
  { label: "YouTube", handle: "@PsTimDan", href: "https://youtube.com/@PsTimDan" },
  { label: "Instagram", handle: "@tim_daniel85", href: "https://instagram.com/tim_daniel85" },
  { label: "TikTok", handle: "@tim.daniel85", href: "https://tiktok.com/@tim.daniel85" },
];

