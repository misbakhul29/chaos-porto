import { Geist, Geist_Mono, Permanent_Marker, Rubik_Glitch, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { GravityStarsBackground } from "@/components/animate-ui/components/backgrounds/gravity-stars";
import { data } from "@/lib/metadata";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fontGlitch = Rubik_Glitch({
  variable: "--font-rubik-glitch",
  weight: "400",
  subsets: ["latin"],
})

const permanentMarker = Permanent_Marker({
  variable: "--font-permanent-marker",
  weight: "400",
  subsets: ["latin"],
})

const spaceGrostek = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
})

export const metadata: Metadata = data;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fontGlitch.variable} ${permanentMarker.variable} ${spaceGrostek.variable} antialiased`}
      >
        <GravityStarsBackground className="fixed z-10 bg-[--void-black]" />
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-[0.07] bg-[url('data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E')] z-50"></div>
        
        {children}
      </body>
    </html>
  );
}