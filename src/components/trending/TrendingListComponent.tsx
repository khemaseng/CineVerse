
"use client";

import { useState } from "react";
import useSWR from "swr";
import { MovieCardComponent } from "@/components/movies/MovieCardComponent";
import type { Movie } from "@/lib/api/types/movie";

interface Props {
  initialMovies?: Movie[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function TrendingListComponent({ initialMovies = [] }: Props) {
  const [timeWindow, setTimeWindow] = useState<"day" | "week">("day");

  // Fetch updated data when timeWindow changes
  const { data, isLoading } = useSWR(
    `/api/movies?category=trending&timeWindow=${timeWindow}`,
    fetcher,
    { fallbackData: { results: initialMovies } }
  );

  const movies: Movie[] = data?.results || initialMovies;

  return (
    <div className="space-y-6">
      {/* Time Window Switcher */}
      <div className="flex w-fit items-center gap-2 rounded-xl border border-primary-gold/20 bg-white/50 p-1.5 backdrop-blur-md dark:bg-navy-blue/30">
        <button
          type="button"
          onClick={() => setTimeWindow("day")}
          className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all ${
            timeWindow === "day"
              ? "bg-primary-gold text-navy-blue shadow-md"
              : "text-navy-blue/70 hover:text-primary-gold dark:text-white/70 dark:hover:text-primary-gold"
          }`}
        >
          Today
        </button>
        <button
          type="button"
          onClick={() => setTimeWindow("week")}
          className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all ${
            timeWindow === "week"
              ? "bg-primary-gold text-navy-blue shadow-md"
              : "text-navy-blue/70 hover:text-primary-gold dark:text-white/70 dark:hover:text-primary-gold"
          }`}
        >
          This Week
        </button>
      </div>

      {/* Grid Display: Exactly 5 cards per row on desktop */}
      {isLoading ? (
        <div className="py-12 text-center text-sm text-navy-blue/60 dark:text-white/60">
          Loading trending movies...
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
          {movies.map((movie) => (
            <MovieCardComponent key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}