import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { tmdbImage } from "@/lib/api/tmdb";
import type { Movie } from "@/lib/api/types/movie";

export function MovieCardComponent({ movie }: { movie: Movie }) {
  return (
    <Link
      href={`/movies/${movie.id}`}
      className="group relative block overflow-hidden rounded-xl bg-muted/40 transition-transform hover:-translate-y-1"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <Image
          src={tmdbImage(movie.poster_path, "w342")}
          alt={movie.title || "Movie poster"}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 20vw"
        />
      </div>
      <div className="p-3">
        <h3 className="truncate text-sm font-semibold text-foreground">
          {movie.title}
        </h3>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Star size={12} className="fill-accent-gold text-accent-gold" />
          <span>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</span>
        </div>
      </div>
    </Link>
  );
}