import Link from "next/link";
import type { Book } from "@/lib/content";
import { Stagger, StaggerItem } from "./ui/Reveal";

function Cover({ book }: { book: Book }) {
  return (
    <div className="group relative">
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
    </div>
  );
}

function BookCard({ book }: { book: Book }) {
  return (
    <article className="h-full">
      <Cover book={book} />
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
        <p className="mt-3 text-[0.92rem] leading-[1.72] text-dim">{book.blurb}</p>

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
          <Link
            href="/#contact"
            className="group/link mt-5 inline-flex items-center gap-2 text-sm text-dim transition-colors hover:text-gold"
          >
            Get notified
            <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-x-1">
              &rarr;
            </span>
          </Link>
        )}
      </div>
    </article>
  );
}

/** Book cover grid. Used on both the home teaser and the full /books page. */
export default function BookGrid({
  books,
  columns = "md:grid-cols-3",
}: {
  books: Book[];
  columns?: string;
}) {
  return (
    <Stagger className={`grid gap-6 ${columns}`}>
      {books.map((book) => (
        <StaggerItem key={`${book.title}-${book.audience}`}>
          <BookCard book={book} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
