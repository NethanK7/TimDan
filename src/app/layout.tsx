import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { site } from "@/lib/content";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
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
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: [{ url: "/images/timothy.jpg", width: 1024, height: 1536, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: ["/images/timothy.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B0A0C",
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
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
