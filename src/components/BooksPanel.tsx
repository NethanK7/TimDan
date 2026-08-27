"use client";

import { books, booksIntro } from "@/lib/content";
import { Stagger, StaggerItem } from "./ui/Reveal";
import Tilt from "./ui/Tilt";

export default function BooksPanel() {
  return (
    <div>
      <div className="mb-14 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h3 className="display-lg mb-6 max-w-[13ch]">
            Truth you can <span className="gold-text">hold.</span>
          </h3>
          <p className="lede max-w-[54ch]">{booksIntro.body}</p>
        </div>

        <div className="flex items-end lg:col-span-5 lg:justify-end">
          <p className="max-w-[30ch] text-sm leading-relaxed text-muted lg:text-right">
            Three audiences, one conviction: truth is only finished when someone can carry it
            home.
          </p>
        </div>
      </div>

      <Stagger className="grid gap-6 md:grid-cols-3">
        {books.map((book) => (
          <StaggerItem key={`${book.title}-${book.audience}`}>
            <article className="group h-full">
              <Tilt className="relative">
                {/* cover */}
                <div
                  className="relative aspect-[3/4.3] overflow-hidden rounded-sm shadow-[0_28px_70px_-30px_rgba(0,0,0,0.9)]"
                  style={{ background: book.spine }}
                >
                  {/* spine + gutter shading */}
                  <div className="absolute inset-y-0 left-0 w-[11%] bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
                  <div className="absolute inset-y-0 left-[11%] w-px bg-white/15" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/55 via-black/10 to-white/15" />
                  {/* paper tooth */}
                  <div
                    className="absolute inset-0 opacity-[0.13] mix-blend-overlay"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    }}
                  />

                  {/* travelling sheen */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full" />

                  <div className="relative flex h-full flex-col justify-between p-6">
                    <span className="text-[0.6rem] uppercase tracking-[0.26em] text-black/60">
                      {book.audience}
                    </span>

                    <div>
                      <span className="mb-4 block h-px w-10 bg-black/35" />
                      <p className="font-display text-[1.55rem] leading-[1.05] text-black/85">
                        {book.title}
                      </p>
                      <p className="mt-2.5 text-[0.7rem] uppercase tracking-[0.18em] text-black/55">
                        Timothy Daniel
                      </p>
                    </div>
                  </div>
                </div>
              </Tilt>

              <div className="mt-6">
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] ${
                      book.status === "available"
                        ? "bg-gold/15 text-gold"
                        : "border border-line text-muted"
                    }`}
                  >
                    {book.status === "available" ? "Available" : "Coming soon"}
                  </span>
                  <span className="text-[0.7rem] text-muted">{book.year}</span>
                </div>

                <h4 className="font-display text-xl">{book.subtitle}</h4>
                <p className="mt-3 text-[0.92rem] leading-[1.72] text-bone-dim">{book.blurb}</p>

                {book.status === "available" && book.link ? (
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group/link mt-5 inline-flex items-center gap-2 text-sm text-gold"
                  >
                    Get the book
                    <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-x-1">
                      &rarr;
                    </span>
                  </a>
                ) : (
                  <a
                    href="#connect"
                    className="group/link mt-5 inline-flex items-center gap-2 text-sm text-bone-dim transition-colors hover:text-gold"
                  >
                    Get notified
                    <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-x-1">
                      &rarr;
                    </span>
                  </a>
                )}
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="hairline mt-16" />

      <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[46ch] text-sm leading-relaxed text-muted">
          Kingdom Kidz resources and new titles are released through the mailing list first.
        </p>
        <a
          href="#connect"
          className="inline-flex w-fit items-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-6 py-3 text-sm text-gold transition-colors duration-300 hover:bg-gold hover:text-ink"
        >
          Join the list
        </a>
      </div>
    </div>
  );
}
