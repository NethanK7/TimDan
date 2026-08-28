import type { Metadata, Viewport } from "next";
import { League_Spartan, Manrope } from "next/font/google";
import { site } from "@/lib/content";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import "./globals.css";

const heading = League_Spartan({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.slogan}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Timothy Daniel",
    "Pastor Timothy Daniel",
    "Tim Drops Truth",
    "The Altar Talk",
    "Kingdom Kidz",
    "Word & Deed Lanka",
    "The Father's House Church",
    "Colombo Sri Lanka",
    "youth pastor",
    "Christian author",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "profile",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.slogan}`,
    description: site.description,
    images: [{ url: "/images/timothy.jpg", width: 1024, height: 1536, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.slogan}`,
    description: site.description,
    images: ["/images/timothy.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0E0D0C",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Youth and Young Adults Pastor",
  description: site.description,
  url: site.url,
  image: `${site.url}/images/timothy.jpg`,
  address: { "@type": "PostalAddress", addressLocality: "Colombo", addressCountry: "LK" },
  worksFor: [
    { "@type": "Organization", name: "The Father's House Church" },
    { "@type": "Organization", name: "Kingdom Kidz" },
    { "@type": "Organization", name: "Word & Deed Lanka" },
  ],
  knowsAbout: [
    "Identity",
    "Purpose",
    "Inner healing",
    "Mental health",
    "Relationships",
    "Spiritual growth",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="grain antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SmoothScroll />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
