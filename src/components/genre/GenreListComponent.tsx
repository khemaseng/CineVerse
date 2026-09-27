import { MovieCardListComponent } from "@/components/movies/MovieCardListComponent";
import type { Genre } from "@/lib/api/genres";
import type { Movie } from "@/lib/api/types/movie";
import Pagination from "@/components/pagination";

interface GenreListComponentProps {
  genre: Genre;
  movies: Movie[];
  totalPages: number;
}

export function GenreListComponent({
  genre,
  movies,
  totalPages,
}: GenreListComponentProps) {
  return (
    <main className="page-container min-h-screen">
      <div>
        <header className="page-heading">
          <p className="!mt-0 font-medium text-primary-gold">Movie genre</p>
          <h1 className="text-5xl mt-2 font-extrabold tracking-tight text-foreground">
            {genre.name} Movies
          </h1>
          <p className="text-lg">
            Popular movies in the {genre.name.toLowerCase()} genre.
          </p>
        </header>
        <MovieCardListComponent movies={movies} />
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
