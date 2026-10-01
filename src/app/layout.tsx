import type { Metadata, Viewport } from "next";
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

// Viewport configuration សម្រាប់ Mobile & Tablet
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6fa" },
    { media: "(prefers-color-scheme: dark)", color: "#041226" },
  ],
};

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
        url: "/opengraph-fix.png",
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
    images: ["/opengraph-fix.png"],
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
      <body className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-[#f4f6fa] text-[#082c59] dark:bg-[#041226] dark:text-white transition-colors duration-200">
        <ThemeProvider>
          <NavbarComponent />
          {/* Main Container ធានាថាមិនឱ្យមាន element ណាមួយរុញហៀរផ្ទាំងសខាងស្តាំ */}
          <main className="flex-1 w-full max-w-full overflow-x-hidden">
            {children}
          </main>
          <FooterComponent />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
