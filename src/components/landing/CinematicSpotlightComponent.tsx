
"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Play, Film, Bookmark, ArrowUpRight } from "lucide-react";
import { tmdbImage } from "@/lib/api/tmdb";
import type { Movie } from "@/lib/api/types/movie";

interface SpotlightProps {
  movie?: Movie;
  badgeText?: string;
  layout?: "left" | "right";
}

export function CinematicSpotlightComponent({
  movie,
  badgeText = "PREMIERE SPOTLIGHT",
  layout = "left",
}: SpotlightProps) {
  if (!movie) return null;

  const isRight = layout === "right";

  return (
    <section className="mx-auto my-14 max-w-7xl px-6">
      <div className="relative min-h-[480px] overflow-hidden rounded-3xl border border-primary-gold/30 bg-[#041226] p-6 shadow-2xl transition-all duration-500 hover:border-primary-gold/60 md:p-10 lg:p-12">
        {/* Dynamic High-Opacity Movie Backdrop Scene */}
        <div className="absolute inset-0">
          <Image
            src={tmdbImage(movie.backdrop_path, "original")}
            alt={movie.title || "Movie Backdrop"}
            fill
            priority
            className={`object-cover opacity-70 transition-transform duration-1000 ease-out hover:scale-105 ${
              isRight ? "object-left" : "object-right"
            }`}
          />
          <div
            className={`absolute inset-0 ${
              isRight
                ? "bg-gradient-to-l from-[#041226]/60 via-[#041226]/85 to-[#041226]"
                : "bg-gradient-to-r from-[#041226] via-[#041226]/85 to-[#041226]/50"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041226] via-transparent to-[#041226]/40" />
        </div>

        {/* Content Container */}
        <div
          className={`relative z-10 flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-12 lg:gap-14 ${
            isRight ? "md:justify-between" : ""
          }`}
        >
          {/* Floating Poster */}
          <div
            className={`relative shrink-0 ${
              isRight ? "order-1 md:order-2" : "order-1"
            }`}
          >
            <div className="absolute -inset-1 rounded-2xl bg-primary-gold/25 blur-lg" />

            <Link
              href={`/movies/${movie.id}`}
              className="group relative block aspect-[2/3] w-56 sm:w-64 lg:w-72 overflow-hidden rounded-2xl border-2 border-primary-gold/40 shadow-2xl transition-transform duration-500 hover:scale-105 hover:border-primary-gold"
            >
              <Image
                src={tmdbImage(movie.poster_path, "w500")}
                alt={movie.title || "Poster"}
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute left-3 top-3 rounded-md bg-black/70 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-primary-gold backdrop-blur-md border border-primary-gold/30">
                4K ULTRA HD
              </div>
            </Link>
          </div>

          {/* Details & Information */}
          <div
            className={`max-w-2xl space-y-4 text-left ${
              isRight ? "order-2 md:order-1" : "order-2"
            }`}
          >
            {/* Spotlight Eyebrow Badge (Icon Removed) */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-primary-gold/40 bg-primary-gold/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-gold backdrop-blur-md">
                {badgeText}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-white/70">
                <Film size={13} /> TMDB Verified
              </span>
            </div>

            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl drop-shadow-lg">
              {movie.title}
            </h2>

            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <div className="flex items-center gap-1.5 rounded-lg border border-primary-gold/30 bg-black/50 px-3 py-1.5 font-bold text-primary-gold backdrop-blur-md">
                <Star size={14} className="fill-primary-gold text-primary-gold" />
                <span>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} / 10</span>
              </div>
              <span className="rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 font-medium text-white/90 backdrop-blur-md">
                Year: {movie.release_date ? movie.release_date.slice(0, 4) : "2026"}
              </span>
              <span className="rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 font-medium text-white/90 backdrop-blur-md">
                Original Audio
              </span>
            </div>

            <p className="line-clamp-3 text-sm leading-relaxed text-gray-200 drop-shadow md:text-base">
              {movie.overview}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={`/movies/${movie.id}`}
                className="inline-flex items-center gap-2 rounded-xl bg-primary-gold px-7 py-3 text-sm font-bold text-navy-blue shadow-lg transition-all duration-300 hover:border hover:border-primary-gold hover:bg-navy-blue hover:text-primary-gold"
              >
                <Play size={16} className="fill-current" />
                Watch Details
              </Link>

              <Link
                href="/movies"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-primary-gold hover:text-primary-gold"
              >
                Explore Category
                <ArrowUpRight size={15} />
              </Link>

              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:border-primary-gold hover:text-primary-gold"
                aria-label="Add to Watchlist"
              >
                <Bookmark size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}