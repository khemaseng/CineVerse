import { notFound } from "next/navigation";
import { GenreListComponent } from "@/components/genre/GenreListComponent";
import { getGenreById, getGenreBySlug } from "@/lib/api/genres";
import { getMoviesByGenre } from "@/lib/api/tmdb";

interface GenrePageProps {
  params: Promise<{ genreId: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function GenrePage({ params, searchParams }: GenrePageProps) {
  const [{ genreId: segment }, query] = await Promise.all([params, searchParams]);
  const page = Math.max(1, Number(query.page) || 1);
  const genre = /^\d+$/.test(segment)
    ? getGenreById(Number(segment))
    : getGenreBySlug(segment);

  if (!genre) {
    notFound();
  }

  const { results, totalPages } = await getMoviesByGenre(genre.id, page);
  return <GenreListComponent genre={genre} movies={results} totalPages={totalPages} />;
}
