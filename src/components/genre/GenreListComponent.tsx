import { MovieCardListComponent } from "@/components/movies/MovieCardListComponent";
import type { Genre } from "@/lib/api/genres";
import type { Movie } from "@/lib/api/types/movie";

interface GenreListComponentProps {
  genre: Genre;
  movies: Movie[];
}

export function GenreListComponent({ genre, movies }: GenreListComponentProps) {
  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="text-sm font-medium text-amber-500 dark:text-amber-400">
            Movie genre
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#041226] transition-colors dark:text-white sm:text-4xl">
            {genre.name} Movies
          </h1>
          <p className="mt-2 text-sm text-gray-600 transition-colors dark:text-zinc-400">
            Popular movies in the {genre.name.toLowerCase()} genre.
          </p>
        </header>
        <MovieCardListComponent movies={movies} />
      </div>
    </main>
  );
}
