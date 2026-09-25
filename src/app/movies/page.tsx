import { getMovies } from "@/lib/api/tmdb";
import { MovieCardListComponent } from "@/components/movies/MovieCardListComponent";
import { MovieFilterComponent } from "@/components/movies/MovieFilterComponent";
import Pagination from "@/components/pagination";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: {
    template: "%s | CineVerse",
    default: "Movies",
  },
  keywords: "movies, films, cinema, movie discovery, movie reviews, actors, genres",
  description:
    "CineVerse is a modern movie discovery platform built for people who believe every film has a story worth experiencing. Explore movies from different genres, discover new favorites, and dive deeper into the world of cinema—all in one place.",
  openGraph: {
    title: "CineVerse",
    description:
      "CineVerse brings the world of cinema closer to you. Discover movies, explore stories, find new favorites, and experience the magic behind every film.",
    images: ["/thumbnail.png"],
  },
};
interface MoviesPageProps {
  searchParams: Promise<{
    query?: string;
    sortBy?: string;
    page?: string;
  }>;
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || "";
  const sortBy = resolvedSearchParams?.sortBy || "popularity.desc";
  const page = Math.max(1, Number(resolvedSearchParams?.page) || 1);

  const { results: movies, totalPages } = await getMovies({
    query,
    sortBy,
    page,
  });

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Explore Movies
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse popular titles, search your favorites, or sort by top ratings.
        </p>
      </div>

      <MovieFilterComponent
        currentQuery={query}
        currentSortBy={sortBy}
      />

      <MovieCardListComponent movies={movies} />

      <Pagination totalPages={totalPages} />
    </main>
  );
}
