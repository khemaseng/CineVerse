import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Khmer } from "next/font/google";
import "./globals.css";
import { NavbarComponent } from "@/components/nav-footer/NavbarComponent";
import { FooterComponent } from "@/components/nav-footer/FooterComponent";
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
    template: '%s | Tos Tinh',
    default: 'Tos Tinh'
  },
  keywords: 'T-Shirts for women, jewelery, E-commerce, men clothing, women clothing',
  description: "Tos Tinh is a modern platform and modern vibe for all costumers.",
  openGraph: {
    title: "Tos Tinh - M2",
    description: "Tos Tinh refers to small retail and online lifestyle or fashion businesses in Phnom Penh, such as Tos Tinh 356 Store and Tos tinh-21, offering modern clothing and products through social media platforms.",
    images: ['/thumbnail.png']
  }
};

// 2. Define proper TypeScript layout props
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${notoKhmer.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <NavbarComponent />
        
        {/* The grow class ensures the main content fills the space, pushing the footer down */}
        <main className="grow">
          {children}
        </main>
        
        <FooterComponent />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}

