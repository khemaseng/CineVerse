import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Khmer } from "next/font/google";
import "./globals.css";
import { NavbarComponent } from "@/components/nav-footer/NavbarComponent";
import { FooterComponent } from "@/components/nav-footer/FooterComponent";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "sonner";

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

const getMetadataBase = (): URL => {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : null) ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
    "https://cine-verse-8i8.vercel.app";

  try {
    const formattedUrl = envUrl.startsWith("http")
      ? envUrl
      : `https://${envUrl}`;
    return new URL(formattedUrl);
  } catch {
    return new URL("https://cine-verse-8i8.vercel.app");
  }
};

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
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
    url: "/",
    siteName: "CineVerse",
    title: "CineVerse - Stream & Discover Movies",
    description:
      "Explore movies, discover new favorites, and experience cinema in high definition.",
    images: [
      {
        url: "/opengraph.png",
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
    images: ["/opengraph.png"],
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
      <body className="flex min-h-screen flex-col font-sans bg-white dark:bg-[#041226] text-[#041226] dark:text-white transition-colors duration-200">
        <ThemeProvider>
          <NavbarComponent />
          <main className="flex-1 w-full">{children}</main>
          <FooterComponent />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
