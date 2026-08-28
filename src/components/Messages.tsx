import { getChannelVideos } from "@/lib/youtube";
import { messages } from "@/lib/content";
import { Reveal } from "./ui/Reveal";
import VideoGrid from "./VideoGrid";

/** Server component: the API key never reaches the browser. */
export default async function Messages() {
  const { configured, videos, channel, error } = await getChannelVideos(10);

  return (
    <section id="messages" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
        <div className="mb-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow mb-6">{messages.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-section mb-6 max-w-[13ch]">{messages.heading}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lede max-w-[48ch]">{messages.body}</p>
            </Reveal>
          </div>

          {channel && (
            <Reveal delay={0.14}>
              <div className="rounded-lg border border-line bg-raise/40 px-6 py-4">
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
            </Reveal>
          )}
        </div>

        <Reveal delay={0.06}>
          <div className="mb-14 flex flex-wrap gap-2">
            {messages.categories.map((c) => (
              <span
                key={c}
                className="rounded-full border border-line bg-raise/50 px-4 py-1.5 text-[0.78rem] text-dim"
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>

        {videos.length > 0 ? (
          <VideoGrid videos={videos} channelUrl={channel?.url} />
        ) : (
          <Reveal>
            <div className="overflow-hidden rounded-lg border border-line bg-raise/30">
              <div className="flex flex-col gap-6 border-b border-line px-8 py-7 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-fire/40 text-fire">
                    <svg width="11" height="13" viewBox="0 0 11 13" aria-hidden>
                      <path d="M0 0 L11 6.5 L0 13 Z" fill="currentColor" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-display text-xl text-bone">
                      {configured ? "No uploads came back yet" : "YouTube channel not connected"}
                    </p>
                    <p className="mt-1.5 max-w-[56ch] text-sm leading-relaxed text-dim">
                      {configured
                        ? "The channel is connected. New messages will appear here automatically as they are published."
                        : "Add the two environment variables below and the latest uploads land here automatically — no code changes, no manual updates."}
                    </p>
                  </div>
                </div>

                {!configured && (
                  <div className="shrink-0 rounded-lg border border-line bg-ink px-5 py-3 font-mono text-[0.7rem] leading-relaxed text-muted">
                    <p>YOUTUBE_API_KEY=…</p>
                    <p>YOUTUBE_CHANNEL_ID=UC…</p>
                  </div>
                )}
              </div>

              {error && (
                <p className="border-b border-line bg-ink px-8 py-4 font-mono text-[0.72rem] text-fire-soft">
                  {error}
                </p>
              )}

              <div className="grid gap-5 p-8 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="opacity-40">
                    <div className="aspect-video rounded-lg border border-line bg-gradient-to-br from-raise-2 to-raise" />
                    <div className="mt-4 h-3 w-4/5 rounded-full bg-raise-2" />
                    <div className="mt-2.5 h-3 w-2/5 rounded-full bg-raise-2" />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
