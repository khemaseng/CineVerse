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
      `Watch ${movie.title} on CineVerse. Explore trailers, cast, reviews, and storyline in HD.`;

    // ជ្រើសរើស Backdrop (16:9) ជាអាទិភាព ឬយក Poster (2:3) បើគ្មាន Backdrop
    const imagePath = movie.backdrop_path || movie.poster_path;
    const imageUrl = imagePath
      ? `https://image.tmdb.org/t/p/w1280${imagePath}`
      : "https://cine-verse-7tfx.vercel.app/side-of-form.png";

    return {
      title: `${title} | CineVerse`,
      description,
      openGraph: {
        title: `${title} | CineVerse`,
        description,
        type: "video.movie",
        siteName: "CineVerse",
        url: `https://cine-verse-7tfx.vercel.app/movies/${movie.id}`,
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
      <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-white dark:bg-[#041226] text-foreground transition-colors duration-200">
        <MovieDetailComponent movie={movie} />
      </main>
    );
  } catch {
    notFound();
  }
}
