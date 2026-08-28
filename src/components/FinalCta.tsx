import { finalCta } from "@/lib/content";
import { Reveal } from "./ui/Reveal";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-br from-ink via-raise to-ink"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(90% 70% at 50% 0%, rgba(226,87,43,0.24) 0%, transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-[900px] px-6 text-center sm:px-10">
        <Reveal>
          <p className="eyebrow mb-7">{finalCta.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="h-hero mb-7">{finalCta.heading}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="lede mx-auto mb-3 max-w-[58ch]">{finalCta.body}</p>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mb-12 text-sm italic text-muted">{finalCta.kicker}</p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            {finalCta.ctas.map((c, i) => (
              <a
                key={c.label}
                href={c.href}
                className={
                  i === 0
                    ? "inline-flex items-center justify-center whitespace-nowrap rounded-full bg-fire px-8 py-4 text-sm font-semibold uppercase tracking-wide text-ink transition-colors duration-300 hover:bg-fire-soft"
                    : "inline-flex items-center justify-center whitespace-nowrap rounded-full border border-bone/30 px-8 py-4 text-sm uppercase tracking-wide text-bone/90 transition-colors duration-300 hover:border-gold/60 hover:text-gold-soft"
                }
              >
                {c.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
