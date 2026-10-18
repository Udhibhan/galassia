import SmoothScroll from "@/components/SmoothScroll";
import Starfield from "@/components/Starfield";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Galassia5 from "@/components/Galassia5";
import ConOps from "@/components/ConOps";
import Specs from "@/components/Specs";
import Join from "@/components/Join";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="grain relative">
        <Starfield />
        <Nav />
        <main className="relative z-10">
          <Hero />
          <Ticker />
          <About />
          <Timeline />
          <Galassia5 />
          <ConOps />
          <Specs />
          <Join />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
