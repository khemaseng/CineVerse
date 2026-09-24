"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, Star } from "lucide-react";
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
    <div className="relative h-[80vh] min-h-[500px] w-full overflow-hidden bg-background">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0">
        <Image
          src={tmdbImage(currentMovie.backdrop_path, "original")}
          alt={currentMovie.title || "Movie Backdrop"}
          fill
          priority
          className="object-cover transition-all duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
      </div>

      {/* Navigation Arrow Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-primary-red hover:border-primary-red hover:scale-110"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-primary-red hover:border-primary-red hover:scale-110"
        aria-label="Next Slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Banner Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-20">
        <div className="max-w-2xl space-y-4">
          {/* Rating Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-xs font-bold text-amber-400 backdrop-blur-md">
            <Star size={14} className="fill-amber-400" />
            <span>{currentMovie.vote_average?.toFixed(1) || "N/A"} RATING</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            {currentMovie.title}
          </h1>

          {/* Description */}
          <p className="line-clamp-3 text-sm text-gray-300 sm:text-base">
            {currentMovie.overview}
          </p>

          {/* CTA Button */}
          <div className="pt-2">
            <Link
              href={`/movies/${currentMovie.id}`}
              className="inline-flex items-center gap-2 rounded-xl bg-primary-red px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Play size={16} className="fill-white" />
              Watch Details
            </Link>
          </div>
        </div>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-6 left-6 flex gap-2">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === index
                  ? "w-8 bg-primary-red"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}