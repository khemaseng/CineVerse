"use client";

import Image from "next/image";
import { Calendar, Clock, Play, Star } from "lucide-react";
import { tmdbImage } from "@/lib/api/tmdb";
import { MovieCastComponent } from "./MovieCastComponent";
import { MovieTrailerComponent } from "./MovieTrailerComponent";
import type { MovieDetails } from "@/lib/api/types/movie";

export function MovieDetailComponent({ movie }: { movie: MovieDetails }) {
  const runtime = movie.runtime || 0;
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  const hasTrailer = movie.videos?.results?.some(
    (video) =>
      video.site === "YouTube" &&
      (video.type === "Trailer" || video.type === "Teaser"),
  );

  return (
    <main className="relative min-h-screen">
      <div className="relative h-[42vh] min-h-64 w-full overflow-hidden sm:h-[55vh]">
        <Image
          src={tmdbImage(movie.backdrop_path, "original")}
          alt={movie.title || "Movie backdrop"}
          fill
          priority
          sizes="100vw"
          className="object-cover object-top opacity-60 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="page-container relative z-10 -mt-32 pb-12 sm:-mt-48 sm:pb-16">
        <div className="flex flex-col items-center gap-6 sm:items-start md:flex-row md:gap-8">
          <div className="relative aspect-[2/3] w-40 shrink-0 overflow-hidden rounded-2xl border-2 border-border shadow-2xl sm:w-56 md:w-64">
            <Image
              src={tmdbImage(movie.poster_path, "w500")}
              alt={movie.title || "Movie poster"}
              fill
              priority
              sizes="(max-width: 640px) 160px, (max-width: 768px) 224px, 256px"
              className="object-cover"
            />
          </div>

          <div className="w-full min-w-0 flex-1 space-y-5 text-foreground sm:space-y-6">
            <div>
              {movie.tagline && (
                <p className="text-sm italic text-muted-foreground sm:text-base">
                  {movie.tagline}
                </p>
              )}
              <h1 className="break-words text-3xl font-bold sm:text-4xl lg:text-5xl">
                {movie.title}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                <strong className="text-foreground">
                  {movie.vote_average?.toFixed(1) || "N/A"}
                </strong>
              </span>
              {runtime > 0 && (
                <span className="inline-flex items-center gap-1">
                  <Clock size={16} /> {hours}h {minutes}m
                </span>
              )}
              {movie.release_date && (
                <span className="inline-flex items-center gap-1">
                  <Calendar size={16} /> {movie.release_date}
                </span>
              )}
            </div>

            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {movie.overview || "No overview available."}
            </p>

            {hasTrailer && (
              <a
                href="#trailer"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary-gold px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-navy-blue shadow-lg transition-colors hover:bg-amber-300"
              >
                <Play size={14} className="fill-current" />
                Watch Official Trailer
              </a>
            )}
          </div>
        </div>

        <section className="mt-12 space-y-12 sm:mt-16">
          {!!movie.credits?.cast?.length && (
            <MovieCastComponent cast={movie.credits.cast} />
          )}
          {!!movie.videos?.results?.length && (
            <div id="trailer" className="flex w-full justify-center scroll-mt-24">
              <div className="w-full max-w-4xl">
                <MovieTrailerComponent videos={movie.videos.results} />
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
