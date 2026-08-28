import Link from "next/link";
import { nav, site, socials, wordAndDeedUrl } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1180px] px-6 py-16 sm:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-display text-2xl">
              Timothy <span className="text-muted">Daniel</span>
            </p>
            <p className="mt-4 max-w-[34ch] text-sm uppercase tracking-wide text-fire-soft">
              {site.slogan}
            </p>
            <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-muted">{site.tagline}</p>
          </div>

          <div className="lg:col-span-3">
            <p className="mb-5 text-[0.68rem] uppercase tracking-[0.2em] text-muted">Explore</p>
            <ul className="space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-sm text-dim transition-colors hover:text-gold">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={wordAndDeedUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-dim transition-colors hover:text-gold"
                >
                  Word & Deed Lanka
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="mb-5 text-[0.68rem] uppercase tracking-[0.2em] text-muted">Elsewhere</p>
            <ul className="space-y-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm text-dim transition-colors hover:text-gold"
                  >
                    {s.label} <span className="text-muted">{s.handle}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm text-dim transition-colors hover:text-gold"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-7 text-[0.72rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} Timothy Daniel &middot; The Father&rsquo;s House Church &middot; Kingdom
            Kidz &middot; Word &amp; Deed Lanka
          </p>
          <div className="flex items-center gap-5">
            {/* TODO: link once a privacy policy page exists */}
            <span>Privacy policy</span>
            <p>{site.location}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
