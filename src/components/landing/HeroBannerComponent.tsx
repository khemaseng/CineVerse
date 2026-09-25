
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
    <div className="relative h-screen min-h-[700px] w-full overflow-hidden bg-[#041226] font-sans">
      {/* Background Image with Cinematic Dark Blue Gradient Vignette */}
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
        className="absolute left-6 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-primary-gold/20 bg-black/40 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-primary-gold hover:bg-primary-gold hover:text-navy-blue"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={26} />
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="absolute right-6 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-primary-gold/20 bg-black/40 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-primary-gold hover:bg-primary-gold hover:text-navy-blue"
        aria-label="Next Slide"
      >
        <ChevronRight size={26} />
      </button>

      {/* Vertically Centered Banner Content */}
      <div className="relative z-20 mx-auto flex h-full max-w-7xl items-center px-8 lg:px-12">
        <div className="max-w-3xl space-y-6 pt-16">
          {/* Rating Badge & Premiere Date */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary-gold/30 bg-black/60 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-gold backdrop-blur-md">
              <Star size={14} className="fill-primary-gold text-primary-gold" />
              <span>{currentMovie.vote_average?.toFixed(1) || "N/A"} RATING</span>
            </div>
            <span className="text-xs font-semibold tracking-wider uppercase text-white/70">
              • Release {currentMovie.release_date?.slice(0, 4) || "New"}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-black tracking-tight text-white drop-shadow-2xl sm:text-6xl lg:text-7xl">
            {currentMovie.title}
          </h1>

          {/* Overview */}
          <p className="line-clamp-3 max-w-2xl text-base font-normal leading-relaxed text-gray-200 drop-shadow md:text-lg">
            {currentMovie.overview}
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href={`/movies/${currentMovie.id}`}
              className="inline-flex items-center gap-2.5 rounded-xl bg-primary-gold px-7 py-3.5 text-sm font-bold text-navy-blue shadow-xl transition-all duration-300 hover:border hover:border-primary-gold hover:bg-navy-blue hover:text-primary-gold"
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