
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, Calendar } from "lucide-react";
import { tmdbImage } from "@/lib/api/tmdb";
import type { Movie } from "@/lib/api/types/movie";

interface CoverFlowProps {
  movies: Movie[];
}

export function CoverFlowCarouselComponent({ movies = [] }: CoverFlowProps) {
  const [activeIndex, setActiveIndex] = useState(
    movies.length > 2 ? 2 : 0
  );

  const total = movies.length;

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  if (!movies || movies.length === 0) return null;

  const activeMovie = movies[activeIndex] || movies[0];

  return (
    <section className="relative mx-auto my-12 max-w-7xl px-6 select-none">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[650px] rounded-full bg-primary-gold/5 blur-[100px]" />

      {/* Matched Section Header */}
      <div className="mb-8 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-primary-gold">
          Exclusive Showcase
        </span>
        <h2 className="mt-1 text-2xl font-black text-navy-blue sm:text-3xl dark:text-white">
          Coming Next to Theaters
        </h2>
        <p className="mt-1 text-xs text-navy-blue/60 dark:text-white/60">
          Upcoming blockbusters arriving next to the big screen
        </p>
      </div>

      {/* 3D Coverflow Stage (Reduced Height) */}
      <div className="relative flex h-[480px] w-full items-center justify-center overflow-visible [perspective:1200px]">
        <div className="relative flex h-full w-full max-w-5xl items-center justify-center [transform-style:preserve-3d]">
          {movies.map((movie, index) => {
            const offset = index - activeIndex;
            const absOffset = Math.abs(offset);

            if (absOffset > 2) return null;

            const isCenter = offset === 0;
            const translateX = offset * 190;
            const translateZ = isCenter ? 100 : -absOffset * 110;
            const rotateY = isCenter ? 0 : offset > 0 ? -14 : 14;
            const scale = isCenter ? 1.02 : 0.88;
            const zIndex = 30 - absOffset * 10;
            const opacity = isCenter ? 1 : Math.max(0.4, 1 - absOffset * 0.35);

            return (
              <div
                key={movie.id}
                onClick={() => setActiveIndex(index)}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex,
                  opacity,
                }}
                className={`absolute h-[420px] w-[250px] sm:w-[270px] cursor-pointer overflow-hidden rounded-[22px] border transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isCenter
                    ? "border-primary-gold/60 shadow-[0_20px_45px_rgba(4,18,38,0.85),0_0_25px_rgba(243,168,18,0.2)] ring-1 ring-primary-gold/40"
                    : "border-white/10 shadow-xl filter brightness-[0.7] hover:brightness-95 hover:scale-[0.92]"
                }`}
              >
                <Image
                  src={tmdbImage(movie.poster_path, "w780")}
                  alt={movie.title || "Poster"}
                  fill
                  priority={isCenter}
                  sizes="300px"
                  className="object-cover pointer-events-none"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#041226] via-[#041226]/40 to-transparent opacity-95" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#041226]/80 via-transparent to-transparent opacity-70" />

                {/* Top Badge Strip */}
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                  <span className="rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-white backdrop-blur-md">
                    {movie.release_date ? movie.release_date.slice(0, 4) : "2026"}
                  </span>

                  {isCenter && (
                    <span className="flex items-center gap-1 rounded-full bg-primary-gold px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-navy-blue shadow-lg">
                      <span className="h-1.5 w-1.5 rounded-full bg-navy-blue animate-ping" />
                      Next Up
                    </span>
                  )}
                </div>

                {/* Bottom Details */}
                <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-4">
                  <h3 className="line-clamp-1 text-base font-black tracking-tight text-white drop-shadow-md">
                    {movie.title}
                  </h3>

                  <div className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-primary-gold">
                    <Calendar size={12} />
                    <span>{movie.release_date || "Premiere 2026"}</span>
                  </div>

                  {isCenter && (
                    <Link
                      href={`/movies/${movie.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary-gold py-2 text-[11px] font-black uppercase tracking-wider text-navy-blue shadow-lg transition-all duration-300 hover:bg-navy-blue hover:text-primary-gold hover:border hover:border-primary-gold active:scale-95"
                    >
                      <Play size={12} className="fill-current" />
                      Preview Details
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Controller Pill */}
      <div className="mt-4 flex items-center justify-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-primary-gold/20 bg-[#082c59]/80 px-3.5 py-1.5 shadow-2xl backdrop-blur-xl">
          <button
            type="button"
            onClick={handlePrev}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-primary-gold hover:text-navy-blue hover:border-primary-gold"
            aria-label="Previous Poster"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-2.5 px-2">
            <div className="relative h-7 w-7 overflow-hidden rounded-full border border-primary-gold shadow-md">
              <Image
                src={tmdbImage(activeMovie.poster_path, "w200")}
                alt={activeMovie.title || "Active"}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-left">
              <p className="line-clamp-1 text-[11px] font-extrabold text-white max-w-[130px]">
                {activeMovie.title}
              </p>
              <p className="text-[10px] font-medium text-primary-gold">
                {activeMovie.release_date || "Coming Soon"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-primary-gold hover:text-navy-blue hover:border-primary-gold"
            aria-label="Next Poster"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}