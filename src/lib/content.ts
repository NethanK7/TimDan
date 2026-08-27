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
  { label: "Story", href: "#story" },
  { label: "Mission", href: "#mission" },
  { label: "The Work", href: "#work" },
  { label: "Watch", href: "#watch" },
  { label: "Connect", href: "#connect" },
];

export const hero = {
  kicker: "Youth & Young Adults Pastor · The Father's House, Colombo",
  lines: ["Reveal", "the Father's", "Heart"],
  sub: "Preacher. Humanitarian. Author. Counsellor. Helping a generation discover identity, find healing, and carry the presence of God.",
  stats: [
    { value: "1000s", label: "Lives reached" },
    { value: "3", label: "Organisations led" },
    { value: "20+", label: "Communities served" },
  ],
};

export const about = {
  eyebrow: "The Story",
  heading: "Faith that becomes visible.",
  body: [
    "Pastor Timothy Daniel is a preacher, humanitarian, author, counsellor, and creative communicator with a deep passion for helping people discover their identity, experience inner healing, and fulfil their God-given purpose.",
    "He serves as the Youth and Young Adults Pastor at The Father's House Church in Colombo, Sri Lanka, where he also oversees the Children's Ministry and Media Ministry. With a heart for the next generation, Timothy communicates biblical truth in a relevant, practical, and thought-provoking way — addressing real-life issues such as identity, purpose, holiness, emotional healing, mental health, relationships, and spiritual growth.",
    "As an author and storyteller, Timothy creates resources that make biblical truth accessible to both children and adults. His work reflects his conviction that faith must move beyond words and become visible through compassion, courage, and action.",
    "Timothy lives in Colombo with his wife, Viji, and their children. Together, they remain committed to serving God, strengthening families, and demonstrating the love of Jesus in both word and deed.",
  ],
  pull: "Whether preaching from a platform, counselling a young person, serving a forgotten community, writing a book, or creating digital content, Timothy carries one central mission.",
};

export const roles = [
  "Preacher",
  "Humanitarian",
  "Author",
  "Counsellor",
  "Creative Communicator",
  "Podcast Host",
];

export const mission = {
  eyebrow: "The Mission",
  heading: "One central mission, four movements.",
  pillars: [
    {
      no: "01",
      title: "Reveal the heart of the Father",
      body: "Preaching that moves past religion and introduces people to a Father who is not distant, disappointed, or done with them.",
    },
    {
      no: "02",
      title: "Awaken purpose",
      body: "Helping young people trade borrowed identity for God-given calling — clarity about who they are before what they do.",
    },
    {
      no: "03",
      title: "Restore broken lives",
      body: "Counselling and teaching around inner healing, mental health, emotional wholeness, holiness, and relationships.",
    },
    {
      no: "04",
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
    accent: "gold" as const,
  },
  {
    name: "Kingdom Kidz",
    role: "Founder & CEO",
    blurb:
      "Creating resources, programmes, and experiences that make biblical truth accessible, memorable, and joyful for children.",
    tags: ["Children", "Resources", "Discipleship"],
    accent: "ember" as const,
  },
  {
    name: "Word & Deed Lanka",
    role: "Chief Executive Officer",
    blurb:
      "A humanitarian organisation serving vulnerable children, families, and underserved communities across Sri Lanka — alongside his wife Viji and a dedicated team of volunteers.",
    tags: ["Relief", "Outreach", "Training"],
    accent: "steel" as const,
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
  // TODO: replace with real drop copy — these are written in Timothy's stated themes
  drops: [
    {
      topic: "Identity",
      title: "You are not your worst week.",
      body: "Shame wants to name you. God already did — before the failure, before the applause, before you had anything to prove.",
    },
    {
      topic: "Purpose",
      title: "Calling is carried, not chased.",
      body: "Purpose is not a destination you hunt down. It is a weight you learn to carry faithfully in the room you are already standing in.",
    },
    {
      topic: "Mental Health",
      title: "Honest is holy.",
      body: "Pretending is not spiritual maturity. The Psalms are full of people who told God the truth about how bad it hurt.",
    },
    {
      topic: "Holiness",
      title: "Holiness is not a cage.",
      body: "It is not God withholding joy from you. It is God protecting the version of you He is still building.",
    },
    {
      topic: "Relationships",
      title: "Choose slow.",
      body: "Everything real in your life will be built at a pace that the internet will call boring.",
    },
    {
      topic: "Healing",
      title: "You can be free and still be tender.",
      body: "Healing does not mean the memory stops mattering. It means the memory stops driving.",
    },
  ],
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
