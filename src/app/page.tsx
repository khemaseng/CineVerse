import type { Metadata } from "next";
import {
  getNowPlayingMovies,
  getTopRatedMovies,
  getTrendingMovies,
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
  title: "Home | CineVerse",
  description:
    "Discover movies, explore stories, find new favorites, and experience the magic behind every film with CineVerse.",
};

interface LandingPageProps {
  searchParams: Promise<{ nowPlayingPage?: string; trendingPage?: string }>;
}

export default async function LandingPage({ searchParams }: LandingPageProps) {
  const params = await searchParams;
  const nowPlayingPage = Math.max(1, Number(params.nowPlayingPage) || 1);
  const trendingPage = Math.max(1, Number(params.trendingPage) || 1);
  const [trendingData, nowPlayingData, topRatedData, upcomingData] =
    await Promise.all([
      getTrendingMovies("day"),
      getNowPlayingMovies(),
      getTopRatedMovies(),
      getUpcomingMovies(),
    ]);

  const trendingMovies = trendingData?.results || [];
  const topRatedMovies = topRatedData?.results || [];
  const upcomingMovies = upcomingData?.results || [];

  return (
    <main className="min-h-screen pb-16">
      <HeroBannerComponent movies={trendingMovies.slice(0, 5)} />
      <GenresShowcaseComponent />
      <FeaturedMoviesComponent
        movies={nowPlayingData?.results || []}
        page={nowPlayingPage}
      />
      <CinematicSpotlightComponent
        movie={topRatedMovies[0] || trendingMovies[5]}
        badgeText="PREMIERE SPOTLIGHT"
        layout="left"
      />
      <TrendingPreviewComponent movies={trendingMovies} page={trendingPage} />
      <CoverFlowCarouselComponent movies={upcomingMovies} />
      <UpcomingMoviesComponent movies={upcomingMovies} />
    </main>
  );
}
