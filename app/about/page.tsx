import Header from "@/app/components/Header";
import JourneyTimeline from "@/app/components/JourneyTimeline";
import Footer from "@/app/components/Footer";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col gap-0">
      <Header />
      <JourneyTimeline />
      <Footer />
    </div>
  );
}
