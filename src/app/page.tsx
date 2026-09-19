
import { getTrendingMovies, getNowPlayingMovies } from "@/lib/api/tmdb";
import { HeroBannerComponent } from "@/components/landing/HeroBannerComponent";
import { GenresShowcaseComponent } from "@/components/landing/GenresShowcaseComponent";
import { FeaturedMoviesComponent } from "@/components/landing/FeaturedMoviesComponent";
import { TrendingPreviewComponent } from "@/components/landing/TrendingPreviewComponent";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: {
    template: "%s | CineVerse",
    default: "CineVerse",
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
export default async function LandingPage() {
  const [trendingData, nowPlayingData] = await Promise.all([
    getTrendingMovies("day"),
    getNowPlayingMovies(),
  ]);

  const heroMovies = trendingData?.results?.slice(0, 5) || [];

  return (
    <main className="min-h-screen">
      <HeroBannerComponent movies={heroMovies} />
      <GenresShowcaseComponent />
      <FeaturedMoviesComponent movies={nowPlayingData?.results || []} />
      <TrendingPreviewComponent movies={trendingData?.results || []} />
    </main>
  );
}