
import { getTrendingMovies, getNowPlayingMovies } from "@/lib/api/tmdb";
import { HeroBannerComponent } from "@/components/landing/HeroBannerComponent";
import { GenresShowcaseComponent } from "@/components/landing/GenresShowcaseComponent";
import { FeaturedMoviesComponent } from "@/components/landing/FeaturedMoviesComponent";
import { TrendingPreviewComponent } from "@/components/landing/TrendingPreviewComponent";

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