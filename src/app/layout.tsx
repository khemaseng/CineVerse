
import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Khmer } from "next/font/google";
import "./globals.css";
import { NavbarComponent } from "@/components/nav-footer/NavbarComponent";
import { FooterComponent } from "@/components/nav-footer/FooterComponent";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "sonner";

// 1. Initialize all fonts with required subsets
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoKhmer = Noto_Sans_Khmer({
  variable: "--font-noto-khmer",
  subsets: ["khmer"],
  weight: ["400", "500", "700"], // Define weights needed for Khmer text
});
export const metadata: Metadata = {
  title: {
    template: "%s | CineVerse",
    default: "CineVerse",
  },
  keywords: "movies, films, cinema, movie discovery, movie reviews, actors, genres",
  description:
    "CineVerse is a modern movie discovery platform built for people who believe every film has a story worth experiencing. Explore movies from different genres, discover new favorites, and dive deeper into the world of cinema—all in one place.",
  openGraph: {
    title: "CineVerse",
    description:
      "CineVerse brings the world of cinema closer to you. Discover movies, explore stories, find new favorites, and experience the magic behind every film.",
    images: ["/thumbnail.png"],
  },
};

// 2. Define proper TypeScript layout props
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${notoKhmer.variable} h-full antialiased`}
    >
      <body className="bg-white dark:bg-[#0d1b2a] text-black dark:text-white transition-colors">
        <ThemeProvider>
          <NavbarComponent />

          {/* The grow class ensures the main content fills the space, pushing the footer down */}
          <main className="grow">{children}</main>

          <FooterComponent />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}