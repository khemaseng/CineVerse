
"use client";

import Image from "next/image";
import { Star, Clock, Calendar } from "lucide-react";
import { tmdbImage } from "@/lib/api/tmdb";
import { MovieCastComponent } from "./MovieCastComponent";
import { MovieTrailerComponent } from "./MovieTrailerComponent";
import type { MovieDetails } from "@/lib/api/types/movie";

export function MovieDetailComponent({ movie }: { movie: MovieDetails }) {
  const hours = Math.floor((movie.runtime || 0) / 60);
  const minutes = (movie.runtime || 0) % 60;

  return (
    <div className="relative min-h-screen">
      <div className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src={tmdbImage(movie.backdrop_path, "original")}
          alt={movie.title}
          fill
          priority
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 -mt-64 pb-16">
        <div className="flex flex-col gap-8 md:flex-row items-start">
          <div className="relative aspect-[2/3] w-64 flex-shrink-0 overflow-hidden rounded-2xl border-2 border-border shadow-2xl">
            <Image
              src={tmdbImage(movie.poster_path, "w500")}
              alt={movie.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 space-y-6 text-foreground">
            <div>
              {movie.tagline && (
                <p className="text-sm italic text-muted-foreground">
                  {movie.tagline}
                </p>
              )}
              <h1 className="text-4xl font-bold sm:text-5xl">{movie.title}</h1>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                <strong className="text-foreground">
                  {movie.vote_average?.toFixed(1)}
                </strong>
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} /> {hours}h {minutes}m
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={16} /> {movie.release_date}
              </span>
            </div>

            <p className="max-w-3xl text-muted-foreground leading-relaxed">
              {movie.overview}
            </p>

            <MovieCastComponent cast={movie.credits?.cast || []} />
            <MovieTrailerComponent videos={movie.videos?.results} />
          </div>
        </div>
      </div>
    </div>
  );
}