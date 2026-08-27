import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Nav from "@/components/Nav";
import Preloader from "@/components/Preloader";
import Videos from "@/components/Videos";
import Work from "@/components/Work";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { getShorts } from "@/lib/youtube";

export default async function Home() {
  const shorts = await getShorts(9);

  return (
    <>
      <Preloader />
      <SmoothScroll />
      <Nav />

      <main>
        <Hero />
        <About />
        <Mission />
        <Work shorts={shorts} />
        <Videos />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
