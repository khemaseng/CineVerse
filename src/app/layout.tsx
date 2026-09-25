import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Khmer } from "next/font/google";
import "./globals.css";
import { NavbarComponent } from "@/components/nav-footer/NavbarComponent";
import { FooterComponent } from "@/components/nav-footer/FooterComponent";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "sonner";

// 1. Initialize fonts
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
  weight: ["400", "500", "700"],
});

// 2. Base URL for SEO OpenGraph resolution
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | CineVerse",
    default: "CineVerse - Modern Movie Discovery & Streaming",
  },
  description:
    "CineVerse is a modern movie discovery platform built for film lovers. Explore curated genres, discover trending releases, and experience cinema with ease.",
  keywords: [
    "movies",
    "films",
    "cinema",
    "movie discovery",
    "streaming",
    "genres",
    "TMDB",
  ],
  authors: [{ name: "CineVerse Team" }],
  creator: "CineVerse",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "CineVerse",
    title: "CineVerse - Stream & Discover Movies",
    description:
      "Explore movies, discover new favorites, and experience cinema in high definition.",
    images: [
      {
        url: "/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "CineVerse Movie Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CineVerse - Stream & Discover Movies",
    description:
      "Explore movies, discover new favorites, and experience cinema in high definition.",
    images: ["/thumbnail.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

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
      <body className="flex min-h-screen flex-col font-sans bg-background text-foreground">
        <ThemeProvider>
          {/* Global Header */}
          <NavbarComponent />

          {/* Page Body */}
          <main className="flex-1 w-full">{children}</main>

          {/* Global Footer */}
          <FooterComponent />

          {/* Toast notifications */}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
