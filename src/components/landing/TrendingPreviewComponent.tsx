
import Link from "next/link";
import { MovieCardComponent } from "@/components/movies/MovieCardComponent";
import type { Movie } from "@/lib/api/types/movie";

export function TrendingPreviewComponent({ movies }: { movies: Movie[] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Trending Today</h2>
        <Link href="/trending" className="text-sm font-semibold text-primary-red hover:underline">
          See All
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