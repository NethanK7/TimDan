import { getChannelVideos } from "@/lib/youtube";
import { podcast } from "@/lib/content";
import { Reveal, RevealWords } from "./ui/Reveal";
import VideoGrid from "./VideoGrid";

/** Server component: the API key never reaches the browser. */
export default async function Videos() {
  const { configured, videos, channel, error } = await getChannelVideos(10);

  return (
    <section id="watch" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow mb-6">Watch</p>
            </Reveal>
            <h2 className="display-lg max-w-[13ch]">
              <RevealWords text="Messages that meet you where you are." />
            </h2>
          </div>

          {channel && (
            <Reveal delay={0.1}>
              <div className="flex items-center gap-5 rounded-sm border border-line bg-surface/40 px-6 py-4">
                <div>
                  <p className="font-display text-lg">{channel.title}</p>
                  <p className="mt-1 text-[0.72rem] uppercase tracking-[0.18em] text-muted">
                    {[
                      channel.subscribers && `${channel.subscribers} subscribers`,
                      channel.videoCount && `${channel.videoCount} videos`,
                    ]
                      .filter(Boolean)
                      .join("  ·  ")}
                  </p>
                </div>
              </div>
            </Reveal>
          )}
        </div>

        {videos.length > 0 ? (
          <VideoGrid videos={videos} channelUrl={channel?.url} />
        ) : (
          <Reveal>
            <div className="overflow-hidden rounded-sm border border-line bg-surface/30">
              <div className="flex flex-col gap-6 border-b border-line px-8 py-7 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/40 text-gold">
                    <svg width="11" height="13" viewBox="0 0 11 13" aria-hidden>
                      <path d="M0 0 L11 6.5 L0 13 Z" fill="currentColor" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-display text-xl text-bone">
                      {configured ? "No uploads came back yet" : "YouTube channel not connected"}
                    </p>
                    <p className="mt-1.5 max-w-[56ch] text-sm leading-relaxed text-bone-dim">
                      {configured
                        ? "The channel is connected. New messages will appear here automatically as they are published."
                        : "Add the two environment variables below and the latest uploads land here automatically — no code changes, no manual updates."}
                    </p>
                  </div>
                </div>

                {!configured && (
                  <div className="shrink-0 rounded-sm border border-line bg-ink px-5 py-3 font-mono text-[0.7rem] leading-relaxed text-muted">
                    <p>YOUTUBE_API_KEY=…</p>
                    <p>YOUTUBE_CHANNEL_ID=UC…</p>
                  </div>
                )}
              </div>

              {error && (
                <p className="border-b border-line bg-ink px-8 py-4 font-mono text-[0.72rem] text-ember">
                  {error}
                </p>
              )}

              {/* placeholder grid so the section still reads as designed */}
              <div className="grid gap-5 p-8 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="opacity-40">
                    <div className="aspect-video rounded-sm border border-line bg-gradient-to-br from-surface-2 to-surface" />
                    <div className="mt-4 h-3 w-4/5 rounded-full bg-surface-2" />
                    <div className="mt-2.5 h-3 w-2/5 rounded-full bg-surface-2" />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* ── podcast band ───────────────────────── */}
        <div className="mt-28 overflow-hidden rounded-sm border border-line bg-gradient-to-br from-surface/70 via-ink-2 to-ink">
          <div className="grid gap-10 p-9 sm:p-14 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow mb-5">{podcast.eyebrow}</p>
              </Reveal>
              <h3 className="display-lg mb-5">
                <span className="gold-text">{podcast.name}</span>
              </h3>
              <p className="display-md mb-6 text-bone/85">{podcast.tagline}</p>
              <p className="lede max-w-[50ch]">{podcast.body}</p>
            </div>

            <div className="lg:col-span-5 lg:justify-self-end">
              <Reveal delay={0.1}>
                <div className="flex flex-col gap-3">
                  {podcast.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-center justify-between gap-12 rounded-sm border border-line bg-ink/60 px-6 py-4 transition-colors duration-500 hover:border-gold/50"
                    >
                      <span className="text-sm text-bone">{l.label}</span>
                      <span className="text-bone-dim transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-gold">
                        &rarr;
                      </span>
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
