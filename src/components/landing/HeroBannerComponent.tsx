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

export function HeroBannerComponent({ movies = [] }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // កំណត់យកតែ 5 ឬ 6 រឿងដំបូងសម្រាប់ Hero Slider ដើម្បីកុំឱ្យវែងហៀរអេក្រង់ទូរស័ព្ទ
  const bannerMovies = movies.slice(0, 5);

  if (!bannerMovies || bannerMovies.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? bannerMovies.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === bannerMovies.length - 1 ? 0 : prev + 1,
    );
  };

  const currentMovie = bannerMovies[currentIndex];

  return (
    <div className="relative w-full max-w-full overflow-hidden bg-[#041226] font-sans">
      {/* Container កម្ពស់សម្រួលតាម Mobile -> Tablet -> Desktop */}
      <div className="relative h-[82vh] min-h-[560px] max-h-[850px] w-full overflow-hidden sm:h-[88vh]">
        {/* Background Image with Cinematic Dark Blue Gradient Vignette */}
        <div className="absolute inset-0">
          <Image
            key={currentMovie.id}
            src={tmdbImage(
              currentMovie.backdrop_path || currentMovie.poster_path,
              "original",
            )}
            alt={currentMovie.title || "Movie Backdrop"}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center transition-all duration-700 ease-out"
          />

          {/* Gradients ការពារភាពច្បាស់នៃអក្សរ */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#041226] via-[#041226]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#041226] via-[#041226]/70 to-transparent sm:via-[#041226]/50" />
        </div>

        {/* Slide Navigation Arrows (លាក់លើ Mobile មិនឱ្យរុញបែក Layout, បង្ហាញចាប់ពី sm ឡើងទៅ) */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-3 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-primary-gold/20 bg-black/50 text-white backdrop-blur-md transition-all hover:scale-105 hover:border-primary-gold hover:bg-primary-gold hover:text-navy-blue sm:flex md:left-6 md:h-12 md:w-12"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="absolute right-3 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-primary-gold/20 bg-black/50 text-white backdrop-blur-md transition-all hover:scale-105 hover:border-primary-gold hover:bg-primary-gold hover:text-navy-blue sm:flex md:right-6 md:h-12 md:w-12"
          aria-label="Next Slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Vertically Centered Banner Content */}
        <div className="relative z-20 mx-auto flex h-full max-w-7xl items-end pb-24 sm:items-center sm:pb-0 px-4 sm:px-8 lg:px-12">
          <div className="w-full max-w-2xl space-y-3 sm:space-y-5">
            {/* Rating Badge & Premiere Date */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="inline-flex items-center gap-1 rounded-full border border-primary-gold/30 bg-black/60 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary-gold backdrop-blur-md sm:px-3.5 sm:py-1 sm:text-xs">
                <Star
                  size={12}
                  className="fill-primary-gold text-primary-gold"
                />
                <span>
                  {currentMovie.vote_average?.toFixed(1) || "N/A"} RATING
                </span>
              </div>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-white/70 sm:text-xs">
                • {currentMovie.release_date?.slice(0, 4) || "New Release"}
              </span>
            </div>

            {/* Title */}
            <h1 className="line-clamp-2 text-2xl font-black tracking-tight text-white drop-shadow-2xl sm:text-5xl lg:text-6xl">
              {currentMovie.title}
            </h1>

            {/* Overview */}
            <p className="line-clamp-3 text-xs font-normal leading-relaxed text-gray-200 drop-shadow sm:text-base md:text-lg">
              {currentMovie.overview}
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1 sm:gap-4 sm:pt-2">
              <Link
                href={`/movies/${currentMovie.id}`}
                className="inline-flex items-center gap-2 rounded-xl bg-primary-gold px-5 py-2.5 text-xs font-bold text-navy-blue shadow-xl transition-all hover:bg-amber-400 active:scale-95 sm:px-7 sm:py-3.5 sm:text-sm"
              >
                <Play size={16} className="fill-current" />
                Watch Details
              </Link>

              <Link
                href="/trending"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95 sm:px-7 sm:py-3.5 sm:text-sm"
              >
                <Info size={16} />
                Explore All
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Centered Slide Dots (កំណត់ត្រឹម 5 គ្រាប់ មិនឱ្យរុញបែក Layout ឡើយ) */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3.5 py-1.5 backdrop-blur-md sm:bottom-8 sm:px-4 sm:py-2">
          {bannerMovies.map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 sm:h-2.5 ${
                currentIndex === index
                  ? "w-6 bg-primary-gold sm:w-8"
                  : "w-2 bg-white/30 hover:bg-white/60 sm:w-2.5"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
