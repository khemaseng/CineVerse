import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMovieDetails } from "@/lib/api/tmdb";
import { MovieDetailComponent } from "@/components/movies/MovieDetailComponent";

interface Props {
  params: Promise<{ movieId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { movieId } = await params;

  try {
    const movie = await getMovieDetails(movieId);

    if (!movie || !movie.id) {
      return {
        title: "Movie Not Found | CineVerse",
        description: "The movie details you are looking for are unavailable.",
      };
    }

    const title = `${movie.title} (${movie.release_date ? movie.release_date.slice(0, 4) : "Movie"})`;
    const description =
      movie.overview ||
      `Watch ${movie.title} on CineVerse. HD Streaming, Official Trailers, and Reviews.`;

    // យក Backdrop កម្រិត 1280x720 ឬ Poster សម្រាប់ Telegram Card
    const imagePath = movie.backdrop_path || movie.poster_path;
    const imageUrl = imagePath
      ? `https://image.tmdb.org/t/p/w1280${imagePath}`
      : "https://cine-verse-8i8.vercel.app/thumbnail.png";

    return {
      title: `${title} | CineVerse`,
      description,
      openGraph: {
        title: `${title} | CineVerse`,
        description,
        type: "video.movie",
        siteName: "CineVerse",
        images: [
          {
            url: imageUrl,
            width: 1280,
            height: 720,
            alt: movie.title,
            type: "image/jpeg",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | CineVerse`,
        description,
        images: [imageUrl],
      },
    };
  } catch {
    return {
      title: "Movie Details | CineVerse",
      description: "Discover films and cinema details on CineVerse.",
    };
  }
}

export default async function MovieDetailPage({ params }: Props) {
  const { movieId } = await params;

  try {
    const movie = await getMovieDetails(movieId);

    if (!movie || !movie.id) {
      notFound();
    }

    return (
      <main className="min-h-screen bg-white dark:bg-[#041226] text-foreground transition-colors duration-200">
        <MovieDetailComponent movie={movie} />
      </main>
    );
  } catch {
    notFound();
  }
}
