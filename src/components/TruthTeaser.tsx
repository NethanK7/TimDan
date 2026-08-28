import { getShorts } from "@/lib/youtube";
import { truth } from "@/lib/content";
import { Reveal } from "./ui/Reveal";
import TruthGrid from "./TruthGrid";

/** Server component: the API key never reaches the browser. */
export default async function TruthTeaser() {
  const shorts = await getShorts(3);

  return (
    <section id="drops" className="relative border-y border-line bg-raise/25 py-24 sm:py-32">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
        <div className="mb-12 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="eyebrow mb-6">{truth.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-hero mb-6 text-fire-soft">{truth.heading}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lede mb-4 max-w-[58ch]">{truth.body}</p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="max-w-[58ch] text-sm italic text-muted">{truth.kicker}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <Reveal delay={0.1}>
              <p className="font-display mb-4 text-xl text-dim">{truth.handle}</p>
              <a
                href={truth.cta.href}
                className="inline-flex items-center gap-3 rounded-full bg-fire px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-ink transition-colors duration-300 hover:bg-fire-soft"
              >
                {truth.cta.label}
              </a>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}>
          <TruthGrid
            videos={shorts.videos}
            configured={shorts.configured}
            error={shorts.error}
            columns="grid-cols-3 sm:grid-cols-3"
          />
        </Reveal>
      </div>
    </section>
  );
}
