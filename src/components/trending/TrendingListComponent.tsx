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
      <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-1 w-fit border border-border">
        <button
          onClick={() => setTimeWindow("day")}
          className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-all ${
            timeWindow === "day"
              ? "bg-primary-red text-white shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Today
        </button>
        <button
          onClick={() => setTimeWindow("week")}
          className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-all ${
            timeWindow === "week"
              ? "bg-primary-red text-white shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          This Week
        </button>
      </div>

      {/* Grid Display */}
      {isLoading ? (
        <div className="py-12 text-center text-sm text-muted-foreground">
          Loading trending movies...
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie) => (
            <MovieCardComponent key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}