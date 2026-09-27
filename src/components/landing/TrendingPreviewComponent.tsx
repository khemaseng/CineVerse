import Link from "next/link";
import { MovieCardComponent } from "@/components/movies/MovieCardComponent";
import type { Movie } from "@/lib/api/types/movie";
import Pagination from "@/components/pagination";

export function TrendingPreviewComponent({
  movies,
  page,
}: {
  movies: Movie[];
  page: number;
}) {
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(movies.length / pageSize));
  const pageMovies = movies.slice((page - 1) * pageSize, page * pageSize);
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-4xl font-bold text-foreground">Trending Today</h2>
        <Link
          href="/trending"
          className="text-lg font-semibold text-primary-red hover:underline"
        >
          See All
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
        {pageMovies.map((movie) => (
          <MovieCardComponent key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination totalPages={totalPages} paramName="trendingPage" />
    </section>
  );
}
