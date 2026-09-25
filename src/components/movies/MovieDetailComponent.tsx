"use client";

import Image from "next/image";
import { Star, Clock, Calendar, Play } from "lucide-react";
import { tmdbImage } from "@/lib/api/tmdb";
import { MovieCastComponent } from "./MovieCastComponent";
import { MovieTrailerComponent } from "./MovieTrailerComponent";
import type { MovieDetails } from "@/lib/api/types/movie";

export function MovieDetailComponent({ movie }: { movie: MovieDetails }) {
  const hours = Math.floor((movie.runtime || 0) / 60);
  const minutes = (movie.runtime || 0) % 60;
  const hasTrailer = movie.videos?.results?.some(
    (v) =>
      v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"),
  );

  return (
    <div className="relative min-h-screen bg-background">
      {/* 1. Cinematic Hero with Backdrop */}
      <section className="relative min-h-[560px] w-full overflow-hidden bg-[#041226]">
        <Image
          src={tmdbImage(movie.backdrop_path, "original")}
          alt={movie.title || "Movie Backdrop"}
          fill
          priority
          className="object-cover object-top opacity-60 filter brightness-90"
        />

        {/* Cinematic Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-[#041226]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041226]/95 via-[#041226]/50 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 px-6 pt-24 pb-16 md:flex-row md:items-end">
          {/* Poster */}
          <div className="relative aspect-[2/3] w-56 flex-shrink-0 overflow-hidden rounded-2xl border-2 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] sm:w-64">
            <Image
              src={tmdbImage(movie.poster_path, "w500")}
              alt={movie.title || "Poster"}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex-1 space-y-4 text-white">
            {movie.tagline && (
              <p className="text-xs font-bold uppercase tracking-widest text-primary-gold">
                &ldquo;{movie.tagline}&rdquo;
              </p>
            )}

            <h1 className="text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl drop-shadow-md">
              {movie.title}
            </h1>

            {/* Badges / Metrics */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 rounded-lg border border-amber-400/30 bg-amber-400/15 px-3 py-1.5 font-bold text-amber-300 backdrop-blur-md">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span>
                  {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} /
                  10
                </span>
                {movie.vote_count ? (
                  <span className="text-white/60">
                    ({movie.vote_count.toLocaleString()})
                  </span>
                ) : null}
              </div>

              {movie.runtime ? (
                <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-medium text-white/90 backdrop-blur-md">
                  <Clock size={14} className="text-white/60" />
                  <span>
                    {hours > 0 ? `${hours}h ` : ""}
                    {minutes}m
                  </span>
                </div>
              ) : null}

              {movie.release_date ? (
                <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-medium text-white/90 backdrop-blur-md">
                  <Calendar size={14} className="text-white/60" />
                  <span>{movie.release_date}</span>
                </div>
              ) : null}

              {movie.original_language && (
                <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white/80">
                  {movie.original_language}
                </span>
              )}
            </div>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-0.5 text-xs font-medium text-white/90 backdrop-blur-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            <p className="max-w-3xl text-sm leading-relaxed text-white/80 sm:text-base pt-2">
              {movie.overview || "No overview available."}
            </p>

            {/* Trailer Action CTA Button */}
            {hasTrailer && (
              <div className="pt-2">
                <a
                  href="#trailer"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary-gold px-5 py-2.5 text-xs font-black uppercase tracking-wider text-navy-blue shadow-lg transition-all hover:bg-white hover:text-navy-blue"
                >
                  <Play size={14} className="fill-current" />
                  Watch Official Trailer
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Page Content: Cast & Trailers (No duplicate headings) */}
      <section className="mx-auto max-w-7xl px-6 py-12 space-y-16">
        {/* Cast */}
        {movie.credits?.cast && movie.credits.cast.length > 0 && (
          <div>
            <MovieCastComponent cast={movie.credits.cast} />
          </div>
        )}

        {/* Video Trailer (Centered) */}
        {movie.videos?.results && movie.videos.results.length > 0 && (
          <div id="trailer" className="w-full flex justify-center">
            <div className="w-full max-w-4xl">
              <MovieTrailerComponent videos={movie.videos.results} />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
