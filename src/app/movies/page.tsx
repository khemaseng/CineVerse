import { getNowPlayingMovies } from "@/lib/api/tmdb";
import { MovieCardListComponent } from "@/components/movies/MovieCardListComponent";

export default async function MoviesPage() {
  const data = await getNowPlayingMovies();
  const movies = data?.results || [];

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-6 text-3xl font-bold text-foreground">Explore Movies</h1>
      <MovieCardListComponent movies={movies} />
    </main>
  );
}