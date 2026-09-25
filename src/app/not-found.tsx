import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description:
    "The page or reel you requested is unavailable or has been archived.",
  openGraph: {
    title: "404 - Page Not Found | CineVerse",
    description:
      "The page or reel you requested is unavailable or has been archived.",
    images: ["/opengraph.png"],
  },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#070b14] px-6 text-center text-white font-sans">
      {/* Subtle ambient spotlight glow behind */}
      <div className="pointer-events-none absolute -top-32 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl animate-pulse" />

      {/* Main card */}
      <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in-95 duration-700 ease-out">
        {/* Compact, refined status badge */}
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-medium tracking-wide text-zinc-400 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
          Page Missing
        </span>

        {/* Scaled-down, elegant 404 header */}
        <h1 className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-6xl font-bold tracking-tight text-transparent transition-all sm:text-7xl">
          404
        </h1>

        {/* Minimal text */}
        <div className="mt-4 max-w-sm space-y-1.5">
          <h2 className="text-base font-semibold text-white/90">
            Lost in the CineVerse
          </h2>
          <p className="text-xs leading-relaxed text-zinc-400">
            The page or reel you requested is unavailable or has been archived.
          </p>
        </div>

        {/* Polished interactive button */}
        <div className="mt-8">
          <Link
            href="/"
            className="group relative inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-5 py-2.5 text-xs font-semibold tracking-wide text-white/90 backdrop-blur-md transition-all duration-300 hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-amber-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Return to Home</span>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
