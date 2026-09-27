import type { Metadata } from "next";
import { Suspense } from "react";
import { getTrendingMovies } from "@/lib/api/tmdb";
import { TrendingListComponent } from "@/components/trending/TrendingListComponent";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: {
    template: "%s | CineVerse",
    default: "Trending",
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
export default async function TrendingPage() {
  const data = await getTrendingMovies("day");
  const initialMovies = data?.results || [];

  return (
    <main className="page-container">
      <div className="page-heading">
        <h1 className="font-bold text-foreground">
          Trending Movies
        </h1>
        <p>
          Discover the most popular movies trending across the globe.
        </p>
      </div>

      <Suspense fallback={<div className="min-h-64" aria-label="Loading trending movies" />}>
        <TrendingListComponent initialMovies={initialMovies} />
      </Suspense>
    </main>
  );
}
