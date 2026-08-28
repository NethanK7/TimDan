import Contact from "@/components/Contact";
import Family from "@/components/Family";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Ministries from "@/components/Ministries";
import Nav from "@/components/Nav";
import Podcast from "@/components/Podcast";
import Videos from "@/components/Videos";
import Welcome from "@/components/Welcome";
import Work from "@/components/Work";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { getShorts } from "@/lib/youtube";

export default async function Home() {
  const shorts = await getShorts(9);

  return (
    <>
      <SmoothScroll />
      <Nav />

      <main>
        <Hero />
        <Welcome />
        <Ministries />
        <Work shorts={shorts} />
        <Podcast />
        <Videos />
        <Family />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
