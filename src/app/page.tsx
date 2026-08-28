import BooksTeaser from "@/components/BooksTeaser";
import Calling from "@/components/Calling";
import Contact from "@/components/Contact";
import FinalCta from "@/components/FinalCta";
import Hero from "@/components/Hero";
import Impact from "@/components/Impact";
import Meet from "@/components/Meet";
import Messages from "@/components/Messages";
import MusicPodcast from "@/components/MusicPodcast";
import TruthTeaser from "@/components/TruthTeaser";

export default function Home() {
  return (
    <main>
      <Hero />
      <Meet />
      <Calling />
      <Messages />
      <TruthTeaser />
      <Impact />
      <BooksTeaser />
      <MusicPodcast />
      <FinalCta />
      <Contact />
    </main>
  );
}
