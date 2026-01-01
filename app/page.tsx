import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ProjectShowcase from "./components/Projects";

export default function Home() {
  return (
    <div id="home" className="relative min-h-screen w-full flex flex-col gap-0">
      <Header />
      <HeroSection />
      <About />
      <ProjectShowcase />
      <Contact />
      <Footer />
    </div>
  );
}
