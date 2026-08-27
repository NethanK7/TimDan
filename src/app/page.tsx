import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Nav from "@/components/Nav";
import Preloader from "@/components/Preloader";
import Videos from "@/components/Videos";
import Work from "@/components/Work";
import Cursor from "@/components/ui/Cursor";
import SmoothScroll from "@/components/ui/SmoothScroll";

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <Cursor />
      <Nav />

      <main>
        <Hero />
        <About />
        <Mission />
        <Work />
        <Videos />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
