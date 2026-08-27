import { nav, site, socials } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line/70 pt-20">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-12 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-display text-3xl">
              Timothy <span className="text-bone-dim">Daniel</span>
            </p>
            <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-muted">
              {site.tagline}
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="mb-5 text-[0.65rem] uppercase tracking-[0.22em] text-muted">Explore</p>
            <ul className="space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-bone-dim transition-colors hover:text-gold"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="mb-5 text-[0.65rem] uppercase tracking-[0.22em] text-muted">Elsewhere</p>
            <ul className="space-y-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm text-bone-dim transition-colors hover:text-gold"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line/70 py-7 text-[0.72rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} Timothy Daniel. The Father&rsquo;s House Church &middot; Kingdom Kidz
            &middot; Word &amp; Deed Lanka.
          </p>
          <p>{site.location}</p>
        </div>
      </div>

      {/* oversized wordmark, faded rather than hard-clipped at the page edge */}
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden pt-6 pb-2"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 35%, black 75%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 35%, black 75%, transparent)",
        }}
      >
        <p className="font-display whitespace-nowrap text-center text-[19vw] leading-[0.82] tracking-tight text-bone/[0.07]">
          Timothy Daniel
        </p>
      </div>
    </footer>
  );
}
