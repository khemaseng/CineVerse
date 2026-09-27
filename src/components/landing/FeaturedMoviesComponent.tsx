
import Link from "next/link";
import { MovieCardComponent } from "@/components/movies/MovieCardComponent";
import type { Movie } from "@/lib/api/types/movie";
import Pagination from "@/components/pagination";

interface Props {
  movies: Movie[];
  page: number;
}

export function FeaturedMoviesComponent({ movies = [], page }: Props) {
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(movies.length / pageSize));
  const pageMovies = movies.slice((page - 1) * pageSize, page * pageSize);
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 flex items-end justify-between border-b border-primary-gold/10 pb-4">
        <div>
          <h2 className="text-4xl font-bold text-foreground">Now Playing</h2>
          <p className="text-base text-muted-foreground mt-1">
            Movies currently showing in theaters
          </p>
        </div>
        <Link
          href="/movies"
          className="text-lg font-semibold text-primary-red hover:underline"
        >
          View All <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
        {pageMovies.map((movie) => (
          <MovieCardComponent key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination totalPages={totalPages} paramName="nowPlayingPage" />
    </section>
  );
}
