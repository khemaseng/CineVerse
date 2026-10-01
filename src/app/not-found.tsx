import type { Metadata } from "next";
import Link from "next/link";
import { Film, Home, ArrowLeft, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Page Not Found | CineVerse",
  description:
    "The page or movie you are looking for does not exist on CineVerse.",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden bg-[#041226] px-4 py-16 text-white font-sans sm:px-6 lg:px-8">
      {/* Background Cinematic Radial & Glow Highlights */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(243,168,18,0.08)_0%,_transparent_60%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary-gold/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-lg text-center">
        {/* 404 Header with Gold Gradient */}
        <h1 className="text-7xl font-black tracking-tight sm:text-8xl">
          4
          <span className="bg-gradient-to-r from-amber-300 via-primary-gold to-amber-500 bg-clip-text text-transparent">
            0
          </span>
          4
        </h1>

        {/* Subtitle & Description */}
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Scene Not Found
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-400 sm:text-base">
          Sorry, the movie, reel, or page you were looking for has vanished from
          the screen or was moved to another timeline.
        </p>

        {/* Action Buttons with Light Yellow Accent */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary-gold px-6 text-sm font-bold text-navy-blue shadow-lg shadow-primary-gold/15 transition-all hover:bg-amber-400 active:scale-95 sm:w-auto"
          >
            <Home size={16} />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/movies"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-amber-300/40 bg-black/40 px-6 text-sm font-semibold text-gray-200 backdrop-blur-md transition-all hover:border-amber-400 hover:bg-white/5 hover:text-white active:scale-95 sm:w-auto"
          >
            <Search size={16} className="text-primary-gold" />
            <span>Explore Movies</span>
          </Link>
        </div>

        {/* Quick Help Footer */}
        <p className="mt-10 text-xs text-gray-500">
          Error Code: 404_PAGE_NOT_FOUND • CineVerse Platform
        </p>
      </div>
    </main>
  );
}
