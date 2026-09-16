import { getMovieDetails } from "@/lib/api/tmdb";
import { MovieDetailComponent } from "@/components/movies/MovieDetailComponent";

interface Props {
  params: Promise<{ movieId: string }>;
}

export default async function MovieDetailPage({ params }: Props) {
  const { movieId } = await params;
  const movie = await getMovieDetails(movieId);

  return <MovieDetailComponent movie={movie} />;
}