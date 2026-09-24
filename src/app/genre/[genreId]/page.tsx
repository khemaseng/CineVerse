import { getMovies, TMDB_GENRES } from "@/lib/api/tmdb";
import { MovieCardListComponent } from "@/components/movies/MovieCardListComponent";
import Pagination from "@/components/pagination";

interface GenrePageProps {
  params: Promise<{ genreId: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function GenrePage({ params, searchParams }: GenrePageProps) {
  const { genreId } = await params;
  const resolvedSearchParams = await searchParams;
  const page = Math.max(1, Number(resolvedSearchParams?.page) || 1);

  const currentGenre = TMDB_GENRES.find((g) => g.id.toString() === genreId);
  const genreName = currentGenre ? currentGenre.name : "Genre";

  const { results: movies, totalPages } = await getMovies({
    genre: genreId,
    page,
  });

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {genreName} Movies
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Discover the top movies in {genreName}.
        </p>
      </div>

      <MovieCardListComponent movies={movies} />

      <Pagination totalPages={totalPages} />
    </main>
  );
}
