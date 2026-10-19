import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Starfield from "@/components/Starfield";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Galassia 5 | AI CubeSat by NUS", template: "%s | Galassia" },
  description:
    "Galassia 5 is a 6U CubeSat from the National University of Singapore demonstrating onboard AI Earth observation and a Ku-band direct-to-VSAT downlink. We're recruiting.",
  openGraph: {
    title: "Galassia 5 | AI CubeSat by NUS",
    description: "Space-based AI, built by students at NUS. Join the mission.",
    images: [{ url: "/images/hero-orbit.jpg", width: 1760, height: 1030 }],
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/images/hero-orbit.jpg"] },
};

export const viewport: Viewport = { themeColor: "#05060a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${mono.variable}`}>
      <body className="bg-void font-sans text-ink antialiased">
        <Starfield />
        <Nav />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
