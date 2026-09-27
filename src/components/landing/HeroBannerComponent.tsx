
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, Star, Info } from "lucide-react";
import { tmdbImage } from "@/lib/api/tmdb";
import type { Movie } from "@/lib/api/types/movie";

interface HeroBannerProps {
  movies: Movie[];
}

export function HeroBannerComponent({ movies }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!movies || movies.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
  };

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative h-[76svh] min-h-[460px] max-h-[780px] w-full overflow-hidden bg-background sm:h-[80svh]">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0">
        <Image
          key={currentMovie.id}
          src={tmdbImage(currentMovie.backdrop_path, "original")}
          alt={currentMovie.title || "Movie Backdrop"}
          fill
          priority
          className="object-cover object-center transition-all duration-1000 ease-out"
        />

        {/* Multi-layered dark navy shadows for enhanced text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#041226] via-[#041226]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041226]/95 via-[#041226]/60 to-transparent" />
      </div>

      {/* Slide Navigation Arrows */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-primary-red hover:border-primary-red hover:scale-110 sm:left-4 sm:h-11 sm:w-11"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={26} />
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-primary-red hover:border-primary-red hover:scale-110 sm:right-4 sm:h-11 sm:w-11"
        aria-label="Next Slide"
      >
        <ChevronRight size={26} />
      </button>

      {/* Banner Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-12 pb-20 sm:px-16 sm:pb-24 lg:px-6">
        <div className="max-w-2xl space-y-4">
          {/* Rating Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-base font-bold text-amber-400 backdrop-blur-md">
            <Star size={14} className="fill-amber-400" />
            <span>{currentMovie.vote_average?.toFixed(1) || "N/A"} RATING</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {currentMovie.title}
          </h1>

          {/* Description */}
          <p className="line-clamp-3 text-lg text-gray-300 sm:text-base">
            {currentMovie.overview}
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href={`/movies/${currentMovie.id}`}
              className="inline-flex items-center gap-2 rounded-xl bg-primary-red px-6 py-3 text-lg font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Play size={18} className="fill-current" />
              Watch Details
            </Link>

            <Link
              href="/trending"
              className="inline-flex items-center gap-2.5 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
            >
              <Info size={18} />
              Explore All
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Centered Slide Dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-md">
        {movies.map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "w-8 bg-primary-gold"
                : "w-2.5 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
