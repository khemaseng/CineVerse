import { MovieCardComponent } from "@/components/movies/MovieCardComponent";
import type { Movie } from "@/lib/api/types/movie";

interface Props {
  movies: Movie[];
}

export function MovieCardListComponent({ movies = [] }: Props) {
  if (!movies.length) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border p-8 text-center">
        <p className="text-lg font-medium text-muted-foreground">
          No movies found.
        </p>
        <p className="text-sm text-muted-foreground/60">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies.map((movie) => (
        <MovieCardComponent key={movie.id} movie={movie} />
      ))}
    </div>
  );
}