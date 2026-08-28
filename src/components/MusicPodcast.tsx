import Image from "next/image";
import { music, podcast } from "@/lib/content";

function LinksList({ links }: { links: { label: string; href: string }[] }) {
  return (
    <div className="mt-7 flex flex-col gap-2.5">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noreferrer noopener"
          className="group flex items-center justify-between rounded-lg border border-line px-6 py-4 transition-colors duration-500 hover:border-gold/45"
        >
          <span className="text-sm text-bone">{l.label}</span>
          <span className="text-dim transition-all duration-500 group-hover:translate-x-1 group-hover:text-gold">
            &rarr;
          </span>
        </a>
      ))}
    </div>
  );
}

export default function MusicPodcast() {
  return (
    <section id="music" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          {/* TIMDAN — original worship music */}
          <div className="relative overflow-hidden rounded-lg border border-line p-9 sm:p-12">
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(120% 100% at 100% 0%, rgba(226,87,43,0.22) 0%, transparent 55%)",
              }}
            />
            <p className="eyebrow mb-5">{music.eyebrow}</p>
            <h3 className="h-section mb-4 text-fire-soft">{music.name}</h3>
            <p className="h-card mb-5 text-bone/90">{music.tagline}</p>
            <p className="body-copy max-w-[42ch]">{music.body}</p>
            <LinksList links={music.links} />
          </div>

          {/* The Altar Talk — podcast, paired with the studio photo */}
          <div className="overflow-hidden rounded-lg border border-line">
            <div className="relative aspect-[16/10] bg-raise">
              <Image
                src="/images/podcast.jpg"
                alt="Timothy Daniel standing on an oversized phone playing an episode"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
            <div className="p-9 sm:p-12">
              <p className="eyebrow mb-5">{podcast.eyebrow}</p>
              <h3 className="h-section mb-4">{podcast.name}</h3>
              <p className="h-card mb-5 text-gold-soft">{podcast.tagline}</p>
              <p className="body-copy max-w-[42ch]">{podcast.body}</p>
              <LinksList links={podcast.links} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
