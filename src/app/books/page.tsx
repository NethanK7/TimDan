import type { Metadata } from "next";
import Link from "next/link";
import { books, booksIntro, site } from "@/lib/content";
import BookGrid from "@/components/BookGrid";
import MusicPodcast from "@/components/MusicPodcast";
import { Reveal, RevealWords } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Books",
  description: booksIntro.body,
  openGraph: { title: `Books — ${site.name}`, description: booksIntro.body },
};

export default function BooksPage() {
  return (
    <main className="pt-[var(--nav-h)]">
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
          <div className="mb-16 max-w-[62ch]">
            <Reveal>
              <p className="eyebrow mb-6">{booksIntro.eyebrow}</p>
            </Reveal>
            <h1 className="h-hero mb-7">
              <RevealWords text={booksIntro.heading} />
            </h1>
            <Reveal delay={0.15}>
              <p className="lede">{booksIntro.body}</p>
            </Reveal>
          </div>

          <BookGrid books={books} />

          <div className="mt-16 border-t border-line pt-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[46ch] text-sm leading-relaxed text-muted">
                Kingdom Kidz resources and new titles are released through the mailing list
                first.
              </p>
              <Link
                href="/#contact"
                className="inline-flex w-fit items-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-6 py-3 text-sm text-gold transition-colors duration-300 hover:bg-gold hover:text-ink"
              >
                Join the list
              </Link>
            </div>
          </div>
        </div>
      </section>

      <MusicPodcast />
    </main>
  );
}
