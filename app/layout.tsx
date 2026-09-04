import { Geist, Geist_Mono, Permanent_Marker, Rubik_Glitch, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { data } from "@/lib/metadata";
import { Metadata } from "next";
import Schema from "@/components/Schema";
import SpaceshipCursor from "@/components/SpaceshipCursor";
import { LanguageProvider } from "@/lib/context/LanguageContext";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ConstellationBackground from "@/components/background/ConstellationBackground";


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
        <LanguageProvider>
          <Analytics />
          <SpeedInsights />
          <Schema />
          <SpaceshipCursor />
          <ConstellationBackground />
          <div className="noise-overlay opacity-[0.02] z-50"></div>

          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}