import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { getMovieDetails } from "@/lib/api/tmdb";
import { MovieDetailComponent } from "@/components/movies/MovieDetailComponent";

interface Props {
  params: Promise<{ movieId: string }>;
}

// មុខងារទាញយក Dynamic SEO & Movie Poster ស្វ័យប្រវត្តិតាម Movie ID
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
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
      `Explore ${movie.title} on CineVerse. View cast, official trailers, ratings, and storyline.`;

    // ជ្រើសរើសយក Backdrop (ផ្ទាំងដេក 16:9 ស័ក្តិសមជាមួយ Social Card) ឬ Poster បើគ្មាន Backdrop
    const posterPath = movie.backdrop_path || movie.poster_path;
    const ogImageUrl = posterPath
      ? `https://image.tmdb.org/t/p/w1280${posterPath}`
      : "https://cine-verse-8i8.vercel.app/thumbnail.png";

    return {
      title,
      description,
      openGraph: {
        title: `${title} | CineVerse`,
        description,
        type: "video.movie",
        siteName: "CineVerse",
        images: [
          {
            url: ogImageUrl,
            width: 1280,
            height: 720,
            alt: movie.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | CineVerse`,
        description,
        images: [ogImageUrl],
      },
    };
  } catch {
    return {
      title: "Movie Details | CineVerse",
      description: "Discover films and cinema details on CineVerse.",
    };
  }
}

// ទំព័រ Server Component បង្ហាញ UI
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
