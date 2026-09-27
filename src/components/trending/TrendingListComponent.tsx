
"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { MovieCardComponent } from "@/components/movies/MovieCardComponent";
import Pagination from "@/components/pagination";
import type { Movie } from "@/lib/api/types/movie";

interface Props {
  initialMovies?: Movie[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function TrendingListComponent({ initialMovies = [] }: Props) {
  const [timeWindow, setTimeWindow] = useState<"day" | "week">("day");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  // Fetch updated data when timeWindow changes
  const { data, isLoading } = useSWR(
    `/api/movies?category=trending&timeWindow=${timeWindow}`,
    fetcher,
    { fallbackData: { results: initialMovies } },
  );

  const movies: Movie[] = data?.results || initialMovies;
  const pageSize = 10;
  const pageMovies = movies.slice((page - 1) * pageSize, page * pageSize);
  const setTimeWindowAndResetPage = (window: "day" | "week") => {
    setTimeWindow(window);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="space-y-6">
      {/* Time Window Switcher */}
      <div className="flex w-fit items-center gap-2 rounded-xl border border-primary-gold/20 bg-white/50 p-1.5 backdrop-blur-md dark:bg-navy-blue/30">
        <button
          onClick={() => setTimeWindowAndResetPage("day")}
          className={`rounded-md px-4 py-1.5 text-base font-semibold transition-all ${
            timeWindow === "day"
              ? "bg-primary-gold text-navy-blue shadow-md"
              : "text-navy-blue/70 hover:text-primary-gold dark:text-white/70 dark:hover:text-primary-gold"
          }`}
        >
          Today
        </button>
        <button
          onClick={() => setTimeWindowAndResetPage("week")}
          className={`rounded-md px-4 py-1.5 text-base font-semibold transition-all ${
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
        <div className="py-12 text-center text-lg text-muted-foreground">
          Loading trending movies...
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
          {pageMovies.map((movie) => (
            <MovieCardComponent key={movie.id} movie={movie} />
          ))}
        </div>
      )}
      {!isLoading && (
        <Pagination
          totalPages={Math.max(1, Math.ceil(movies.length / pageSize))}
        />
      )}
    </div>
  );
}
