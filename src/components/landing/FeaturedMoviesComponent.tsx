import Link from "next/link";
import { MovieCardComponent } from "@/components/movies/MovieCardComponent";
import type { Movie } from "@/lib/api/types/movie";

interface Props {
  movies: Movie[];
}

export function FeaturedMoviesComponent({ movies = [] }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Now Playing</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Movies currently showing in theaters
          </p>
        </div>
        <Link
          href="/movies"
          className="text-sm font-semibold text-primary-red hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {movies.slice(0, 5).map((movie) => (
          <MovieCardComponent key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}