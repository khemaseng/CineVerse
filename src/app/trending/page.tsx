
import { getTrendingMovies } from "@/lib/api/tmdb";
import { TrendingListComponent } from "@/components/trending/TrendingListComponent";

export const revalidate = 3600;

export default async function TrendingPage() {
  const data = await getTrendingMovies("day");
  const initialMovies = data?.results || [];

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Trending Movies
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Discover the most popular movies trending across the globe.
        </p>
      </div>

      <TrendingListComponent initialMovies={initialMovies} />
    </main>
  );
}