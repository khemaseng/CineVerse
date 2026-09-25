import { notFound } from "next/navigation";
import { GenreListComponent } from "@/components/genre/GenreListComponent";
import { getGenreById, getGenreBySlug } from "@/lib/api/genres";
import { getMoviesByGenre } from "@/lib/api/tmdb";

interface GenrePageProps {
  params: Promise<{ genreId: string }>;
}

export default async function GenreDynamicPage({ params }: GenrePageProps) {
  const { genreId: segment } = await params;

  // Resolve whether user passed a numeric ID (e.g. "28") or a slug name (e.g. "action")
  const genre = /^\d+$/.test(segment)
    ? getGenreById(Number(segment))
    : getGenreBySlug(segment);

  if (!genre) {
    notFound();
  }

  // Fetch movies belonging to the resolved genre ID
  const response = await getMoviesByGenre(genre.id);
  const movies = response?.results ?? [];

  return <GenreListComponent genre={genre} movies={movies} />;
}
