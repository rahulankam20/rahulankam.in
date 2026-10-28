import { site } from "./content";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Hero from "./sections/Hero";
import Marquee from "./sections/Marquee";
import Work from "./sections/Work";
import Services from "./sections/Services";
import Process from "./sections/Process";
import WhyMe from "./sections/WhyMe";
import About from "./sections/About";
import Faq from "./sections/Faq";
import CtaBand from "./sections/CtaBand";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        {site.showServices && <Marquee />}
        <Work />
        {site.showServices && (
          <>
            <Services />
            <Process />
            <WhyMe />
          </>
        )}
        <About />
        {site.showServices && (
          <>
            <Faq />
            <CtaBand />
          </>
        )}
        <Contact />
      </main>
      <Footer />
      {site.showServices && <FloatingWhatsApp />}
    </>
  );
}
