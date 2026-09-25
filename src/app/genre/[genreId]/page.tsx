import { notFound } from "next/navigation";
import { GenreListComponent } from "@/components/genre/GenreListComponent";
import { getGenreById, getGenreBySlug } from "@/lib/api/genres";
import { getMoviesByGenre } from "@/lib/api/tmdb";

interface GenrePageProps {
  params: Promise<{ genreId: string }>;
}

export default async function GenreDynamicPage({ params }: GenrePageProps) {
  const { genreId: segment } = await params;
  const genre = /^\d+$/.test(segment)
    ? getGenreById(Number(segment))
    : getGenreBySlug(segment);

  if (!genre) notFound();

  const { results } = await getMoviesByGenre(genre.id);

  return <GenreListComponent genre={genre} movies={results} />;
}
