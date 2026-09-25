import type { Metadata } from "next";
import {
  getTrendingMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/lib/api/tmdb";
import { HeroBannerComponent } from "@/components/landing/HeroBannerComponent";
import { GenresShowcaseComponent } from "@/components/landing/GenresShowcaseComponent";
import { FeaturedMoviesComponent } from "@/components/landing/FeaturedMoviesComponent";
import { TrendingPreviewComponent } from "@/components/landing/TrendingPreviewComponent";
import { CinematicSpotlightComponent } from "@/components/landing/CinematicSpotlightComponent";
import { UpcomingMoviesComponent } from "@/components/landing/UpcomingMoviesComponent";
import { CoverFlowCarouselComponent } from "@/components/landing/CoverFlowCarouselComponent";

export const metadata: Metadata = {
  title: {
    template: "%s | CineVerse",
    default: "CineVerse",
  },
  keywords:
    "movies, films, cinema, movie discovery, movie reviews, actors, genres",
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
  const [trendingData, nowPlayingData, topRatedData, upcomingData] =
    await Promise.all([
      getTrendingMovies("day"),
      getNowPlayingMovies(),
      getTopRatedMovies(),
      getUpcomingMovies(),
    ]);

  // Top 5 movies for the full-screen hero carousel
  const heroMovies = trendingData?.results?.slice(0, 5) || [];

  // Spotlight 1: Top Rated pick (Card on LEFT)
  const spotlightLeftMovie =
    topRatedData?.results?.[0] || trendingData?.results?.[5];

  // Spotlight 2: Upcoming premiere (Card on RIGHT)
  const spotlightRightMovie =
    upcomingData?.results?.[0] || topRatedData?.results?.[1];

  return (
    <main className="min-h-screen pb-16">
      {/* 1. Full-Height Hero Banner */}
      <HeroBannerComponent movies={heroMovies} />

      {/* 2. Quick Genre Filter Pills */}
      <GenresShowcaseComponent />

      {/* 3. Now Playing In Theaters (4 Cards) */}
      <FeaturedMoviesComponent movies={nowPlayingData?.results || []} />

      {/* 4. Cinematic Spotlight 1 (Card on the LEFT) */}
      <CinematicSpotlightComponent
        movie={spotlightLeftMovie}
        badgeText="PREMIERE SPOTLIGHT"
        layout="left"
      />

      {/* 5. Trending Collection (4 Cards) */}
      <TrendingPreviewComponent movies={trendingData?.results || []} />

      {/* 6. CoverFlowCarousel */}
      <CoverFlowCarouselComponent movies={upcomingData?.results || []} />

      {/* 7. Upcoming Releases (4 Cards) */}
      <UpcomingMoviesComponent movies={upcomingData?.results || []} />
    </main>
  );
}
