import type { Metadata } from "next";
import { site, truth } from "@/lib/content";
import { getShorts } from "@/lib/youtube";
import TruthGrid from "@/components/TruthGrid";
import { Reveal, RevealWords } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Tim Drops Truth",
  description: truth.body,
  openGraph: { title: `Tim Drops Truth — ${site.name}`, description: truth.body },
};

export default async function TruthPage() {
  const shorts = await getShorts(24);

  return (
    <main className="pt-[var(--nav-h)]">
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
          <div className="mb-14 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow mb-6">{truth.eyebrow}</p>
              </Reveal>
              <h1 className="h-hero mb-7">
                <RevealWords text={truth.heading} />
              </h1>
              <Reveal delay={0.15}>
                <p className="lede max-w-[54ch]">{truth.body}</p>
              </Reveal>
            </div>

            <div className="flex flex-col justify-end gap-5 lg:col-span-5 lg:items-end">
              <p className="font-display text-2xl text-dim">{truth.handle}</p>
              <div className="flex flex-wrap gap-2.5 lg:justify-end">
                {truth.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-dim transition-colors duration-300 hover:border-gold/50 hover:text-gold"
                  >
                    {s.label}
                    <svg width="9" height="9" viewBox="0 0 9 9" aria-hidden className="opacity-60">
                      <path d="M1 8 L8 1 M2.6 1 H8 V6.4" stroke="currentColor" fill="none" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-12 flex flex-wrap gap-2">
            {truth.themes.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line bg-raise/50 px-4 py-1.5 text-[0.78rem] text-dim"
              >
                {t}
              </span>
            ))}
          </div>

          <TruthGrid videos={shorts.videos} configured={shorts.configured} error={shorts.error} />
        </div>
      </section>
    </main>
  );
}
