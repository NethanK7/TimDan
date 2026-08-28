/**
 * ─────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR SITE COPY
 *  Everything the client may want to change lives in this file.
 *  Items marked  // TODO  are placeholders awaiting real details.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Timothy Daniel",
  role: "Pastor · Author · Humanitarian",
  tagline: "Reveal the Father. Awaken purpose. Restore what was broken.",
  location: "Colombo, Sri Lanka",
  // TODO: replace with the real domain once the client points DNS at Vercel
  url: "https://pastortimothydaniel.com",
  email: "hello@pastortimothydaniel.com", // TODO
  description:
    "Pastor Timothy Daniel is a preacher, humanitarian, author, counsellor and creative communicator helping people discover identity, experience inner healing and fulfil their God-given purpose.",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Ministries", href: "#ministries" },
  { label: "The Work", href: "#work" },
  { label: "Listen", href: "#listen" },
  { label: "Connect", href: "#connect" },
];

export const hero = {
  kicker: "Colombo, Sri Lanka",
  title: "Revealing the heart of the Father.",
  sub: "Pastor, humanitarian and author helping a generation discover who they are, find healing, and walk in the purpose God gave them.",
  primaryCta: { label: "Invite Timothy to speak", href: "#connect" },
  secondaryCta: { label: "Watch a message", href: "#watch" },
};

export const welcome = {
  eyebrow: "Hello there",
  heading: "One man. Many callings.",
  body: [
    "I'm Timothy — a preacher, humanitarian, author and counsellor based in Colombo. I serve as the Youth and Young Adults Pastor at The Father's House Church, where I also oversee our Children's and Media ministries.",
    "Most weeks look like this: preaching on a Sunday, sitting with a young person who is struggling on a Monday, loading a van for a village outreach midweek, and writing late at night. Different rooms, one mission.",
  ],
  roles: [
    "Preacher",
    "Humanitarian",
    "Author",
    "Counsellor",
    "Podcast host",
    "Creative communicator",
  ],
  stats: [
    { value: "1000s", label: "Lives reached" },
    { value: "3", label: "Organisations led" },
    { value: "20+", label: "Communities served" },
  ],
};

export const family = {
  eyebrow: "Home",
  heading: "Ministry begins at the kitchen table.",
  body: "Timothy lives in Colombo with his wife, Viji, and their children. Viji serves alongside him in every part of the work — from village outreaches to the quiet, unglamorous hours that hold a ministry together. Together they remain committed to serving God, strengthening families, and demonstrating the love of Jesus in both word and deed.",
  caption: "Timothy & Viji",
};

export const mission = {
  eyebrow: "The Mission",
  heading: "What the work is really for.",
  pillars: [
    {
      title: "Reveal the heart of the Father",
      body: "Preaching that moves past religion and introduces people to a Father who is not distant, disappointed, or done with them.",
    },
    {
      title: "Awaken purpose",
      body: "Helping young people trade borrowed identity for God-given calling — clarity about who they are before what they do.",
    },
    {
      title: "Restore broken lives",
      body: "Counselling and teaching around inner healing, mental health, emotional wholeness, holiness, and relationships.",
    },
    {
      title: "Prepare a generation",
      body: "Raising leaders who carry the presence of God into schools, estates, villages, and every space they walk into.",
    },
  ],
};

export const ministries = [
  {
    name: "The Father's House Church",
    role: "Youth & Young Adults Pastor",
    blurb:
      "Leading the youth and young adults ministry in Colombo, while overseeing the Children's Ministry and the Media Ministry.",
    tags: ["Youth", "Children", "Media"],
  },
  {
    name: "Kingdom Kidz",
    role: "Founder & CEO",
    blurb:
      "Creating resources, programmes, and experiences that make biblical truth accessible, memorable, and joyful for children.",
    tags: ["Children", "Resources", "Discipleship"],
  },
  {
    name: "Word & Deed Lanka",
    role: "Chief Executive Officer",
    blurb:
      "A humanitarian organisation serving vulnerable children, families, and underserved communities across Sri Lanka — alongside his wife Viji and a dedicated team of volunteers.",
    tags: ["Relief", "Outreach", "Training"],
  },
];

export const impact = {
  eyebrow: "Word & Deed Lanka",
  heading: "Compassion, courage, action.",
  body: "Humanitarian relief, children's programmes, school ministry, leadership training, and community outreach across rural villages, tea estates, juvenile homes, and disaster-affected communities. Through these initiatives, thousands of children and adults have received practical support, hope, and the message of Jesus Christ.",
  areas: [
    "Rural villages",
    "Tea estates",
    "Juvenile homes",
    "Disaster-affected communities",
    "Schools",
    "Underserved families",
  ],
};

/* ── TAB 1 · TIM DROPS TRUTH ──────────────────────────────── */

export const truth = {
  name: "Tim Drops Truth",
  eyebrow: "Digital Platform",
  heading: "Short messages. Long shadows.",
  body: "A digital platform delivering short, culturally relevant, and deeply reflective messages for youth and young adults — truth that meets you where the scroll happens.",
  // TODO: swap in real @handles
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

/* ── TAB 2 · BOOKS ────────────────────────────────────────── */

export type Book = {
  title: string;
  subtitle: string;
  audience: "Children" | "Adults" | "Youth";
  year: string;
  blurb: string;
  status: "available" | "coming-soon";
  link?: string;
  spine: string; // cover gradient
};

// TODO: replace titles, blurbs, years and purchase links with the real catalogue
export const books: Book[] = [
  {
    title: "Title To Be Confirmed",
    subtitle: "A book for children",
    audience: "Children",
    year: "—",
    blurb:
      "A storytelling resource that makes biblical truth accessible, vivid, and memorable for young readers.",
    status: "coming-soon",
    spine: "linear-gradient(150deg,#E0A75E,#B8813C 58%,#6B4A1E)",
  },
  {
    title: "Title To Be Confirmed",
    subtitle: "A book for youth & young adults",
    audience: "Youth",
    year: "—",
    blurb:
      "Practical, thought-provoking teaching on identity, purpose, and the questions this generation is actually asking.",
    status: "coming-soon",
    spine: "linear-gradient(150deg,#D8763C,#8E3F1C 60%,#40190B)",
  },
  {
    title: "Title To Be Confirmed",
    subtitle: "A book for adults",
    audience: "Adults",
    year: "—",
    blurb:
      "On inner healing, emotional wholeness, and a faith that moves beyond words into compassion and action.",
    status: "coming-soon",
    spine: "linear-gradient(150deg,#7F93AE,#3C4A5E 58%,#1A212C)",
  },
];

export const booksIntro = {
  eyebrow: "Published Work",
  heading: "Truth you can hold.",
  body: "As an author and storyteller, Timothy creates resources that make biblical truth accessible to both children and adults — books built to be read aloud, marked up, and passed on.",
};

/* ── PODCAST ──────────────────────────────────────────────── */

export const podcast = {
  name: "The Altar Talk",
  eyebrow: "Podcast",
  tagline: "Where real life meets God's truth.",
  body: "Unhurried conversations about the things people actually wrestle with — doubt, healing, calling, relationships, and the slow work of becoming whole.",
  // TODO: real podcast links
  links: [
    { label: "Spotify", href: "https://spotify.com/" },
    { label: "Apple Podcasts", href: "https://podcasts.apple.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
  ],
};

/* ── CONTACT ──────────────────────────────────────────────── */

export const contact = {
  eyebrow: "Connect",
  heading: "Invite Timothy to speak.",
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

export const socials = [
  { label: "Instagram", href: "https://instagram.com/" }, // TODO
  { label: "YouTube", href: "https://youtube.com/" }, // TODO
  { label: "Facebook", href: "https://facebook.com/" }, // TODO
  { label: "Spotify", href: "https://spotify.com/" }, // TODO
];
