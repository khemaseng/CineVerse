import Image from "next/image";
import Link from "next/link";
import { tmdbImage } from "@/lib/api/tmdb";
import type { Movie } from "@/lib/api/types/movie";

interface MovieCardProps {
  movie: Movie;
  priority?: boolean;
}

export default function MovieCard({ movie, priority = false }: MovieCardProps) {
  const posterUrl = movie.poster_path ? tmdbImage(movie.poster_path, "w500") : null;
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <Link
      href={`/movies/${movie.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-800/60 bg-zinc-900/60 transition-all duration-300 hover:-translate-y-1.5 hover:border-zinc-700 hover:shadow-xl hover:shadow-black/50"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-800">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-4 text-center text-xs text-zinc-500">
            No Poster Available
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-xs font-semibold text-amber-400 backdrop-blur-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 fill-amber-400"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <span>{rating}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <h3
          className="line-clamp-1 text-sm font-semibold text-white transition-colors group-hover:text-amber-400"
          title={movie.title}
        >
          {movie.title}
        </h3>
        <div className="mt-1.5 flex items-center justify-between text-xs text-zinc-400">
          <span>{year || "Unknown"}</span>
          <span className="text-[11px] text-zinc-500">
            {movie.vote_count ? `${movie.vote_count.toLocaleString()} votes` : ""}
          </span>
        </div>
      </div>
    </Link>
  );
}
