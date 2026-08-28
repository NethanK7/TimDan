import Link from "next/link";
import { books, booksIntro } from "@/lib/content";
import { Reveal } from "./ui/Reveal";
import BookGrid from "./BookGrid";

export default function BooksTeaser() {
  const featured = books.find((b) => b.featured) ?? books[0];

  return (
    <section id="books" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6 lg:order-2">
            <Reveal>
              <div className="mx-auto max-w-[300px]">
                <BookGrid books={[featured]} columns="grid-cols-1" />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:order-1">
            <Reveal>
              <p className="eyebrow mb-6">{booksIntro.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-hero mb-7">{booksIntro.heading}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lede mb-10 max-w-[46ch]">{booksIntro.body}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <Link
                href={booksIntro.cta.href}
                className="inline-flex items-center gap-3 rounded-full bg-fire px-8 py-4 text-sm font-semibold uppercase tracking-wide text-ink transition-colors duration-300 hover:bg-fire-soft"
              >
                {booksIntro.cta.label}
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
