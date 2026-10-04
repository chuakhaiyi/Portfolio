import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header, Footer } from "@/components/chrome";
import "./globals.css";

const inter = localFont({ src: "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2", display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  title: { default: "Louis Chua — AI & Software", template: "%s — Louis Chua" },
  description: "Louis Chua Khai Yi, an Artificial Intelligence undergraduate at Xiamen University Malaysia. Explore personal software and team hackathon projects.",
  icons: { icon: "/icon.svg" },
  openGraph: { title: "Louis Chua — AI & Software", description: "Personal software. Team hackathons. An AI undergraduate’s selected work.", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={inter.variable}><body><Header />{children}<Footer /></body></html>;
}
