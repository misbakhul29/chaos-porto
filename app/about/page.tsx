import { Metadata } from "next";
import Header from "@/app/components/Header";
import JourneyTimeline from "@/app/components/JourneyTimeline";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "About Misbakhul Munir | Fullstack Web Developer",
  description: "Learn more about Misbakhul Munir's journey, experience, and background as a Full Stack Web Developer and Software Engineer.",
  alternates: {
    canonical: "https://www.misbakhul.com/about",
  },
  openGraph: {
    title: "About Misbakhul Munir | Fullstack Web Developer",
    description: "Learn more about Misbakhul Munir's journey, experience, and background as a Full Stack Web Developer and Software Engineer.",
    url: "https://www.misbakhul.com/about",
  }
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col gap-0">
      <Header />
      <JourneyTimeline />
      <Footer />
    </div>
  );
}
