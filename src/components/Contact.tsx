"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { contact, site, socials } from "@/lib/content";
import { Reveal, RevealWords } from "./ui/Reveal";
import Magnetic from "./ui/Magnetic";

const FIELD =
  "w-full rounded-sm border border-line bg-surface/40 px-5 py-4 text-[0.95rem] text-bone placeholder:text-muted outline-none transition-colors duration-300 focus:border-gold/60";

export default function Contact() {
  const [sent, setSent] = useState(false);

  /**
   * No mail provider is wired up yet, so submitting composes the message in the
   * visitor's own mail client. Swap this for a server action + Resend/Formspree
   * when the client picks a provider — the markup stays identical.
   */
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const reason = String(data.get("reason") ?? "");
    const message = String(data.get("message") ?? "");
    const email = String(data.get("email") ?? "");

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Regarding: ${reason}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `${reason} — ${name}`
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  };

  return (
    <section id="connect" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* ── left rail ──────────────────────── */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow mb-6">{contact.eyebrow}</p>
            </Reveal>
            <h2 className="display-lg mb-7 max-w-[11ch]">
              <RevealWords text={contact.heading} />
            </h2>
            <Reveal delay={0.1}>
              <p className="lede mb-12 max-w-[42ch]">{contact.body}</p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="space-y-px overflow-hidden rounded-sm border border-line bg-line">
                <div className="bg-ink px-6 py-5">
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-muted">Email</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-1.5 block font-display text-lg text-bone transition-colors hover:text-gold"
                  >
                    {site.email}
                  </a>
                </div>
                <div className="bg-ink px-6 py-5">
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-muted">Based in</p>
                  <p className="mt-1.5 font-display text-lg text-bone">{site.location}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {socials.map((s) => (
                  <Magnetic key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-block rounded-full border border-line px-5 py-2.5 text-sm text-bone-dim transition-colors duration-300 hover:border-gold/50 hover:text-gold"
                    >
                      {s.label}
                    </a>
                  </Magnetic>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ── form ───────────────────────────── */}
          <div className="lg:col-span-7">
            <Reveal delay={0.08}>
              <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label htmlFor="name" className="mb-2 block text-[0.7rem] uppercase tracking-[0.2em] text-muted">
                    Name
                  </label>
                  <input id="name" name="name" required placeholder="Your name" className={FIELD} />
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="email" className="mb-2 block text-[0.7rem] uppercase tracking-[0.2em] text-muted">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className={FIELD}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="reason" className="mb-2 block text-[0.7rem] uppercase tracking-[0.2em] text-muted">
                    Regarding
                  </label>
                  <div className="relative">
                    <select id="reason" name="reason" className={`${FIELD} appearance-none pr-12`}>
                      {contact.reasons.map((r) => (
                        <option key={r} value={r} className="bg-ink">
                          {r}
                        </option>
                      ))}
                    </select>
                    <svg
                      aria-hidden
                      width="11"
                      height="7"
                      viewBox="0 0 11 7"
                      className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-muted"
                    >
                      <path d="M1 1 L5.5 5.5 L10 1" stroke="currentColor" fill="none" />
                    </svg>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-2 block text-[0.7rem] uppercase tracking-[0.2em] text-muted">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    placeholder="Tell Timothy about the event, the date, and who will be in the room."
                    className={`${FIELD} resize-none`}
                  />
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-5 sm:col-span-2">
                  <Magnetic>
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-3 rounded-full bg-bone px-8 py-4 text-sm font-medium text-ink transition-colors duration-300 hover:bg-gold"
                    >
                      Send the invitation
                      <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </button>
                  </Magnetic>

                  {sent && (
                    <motion.p
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm text-gold"
                    >
                      Your mail app should be opening &mdash; press send there.
                    </motion.p>
                  )}
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
