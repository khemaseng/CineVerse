
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { tmdbImage } from "@/lib/api/tmdb";
import type { Movie } from "@/lib/api/types/movie";

export function MovieCardComponent({ movie }: { movie: Movie }) {
  return (
    <Link
      href={`/movies/${movie.id}`}
      className="group relative block aspect-[2/3.2] w-full overflow-hidden rounded-2xl border border-white/10 bg-navy-blue/30 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-primary-gold/60 hover:shadow-2xl hover:shadow-primary-gold/10"
    >
      {/* Tall Poster Image */}
      <Image
        src={tmdbImage(movie.poster_path, "w500")}
        alt={movie.title || "Movie poster"}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Ambient Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#041226] via-[#041226]/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
      <div className="absolute inset-0 bg-primary-gold/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Floating Top Rating Badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full border border-primary-gold/30 bg-black/60 px-2.5 py-1 text-xs font-bold text-primary-gold backdrop-blur-md">
        <Star size={12} className="fill-primary-gold text-primary-gold" />
        <span>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</span>
      </div>
      <div className="p-3">
        <h3 className="truncate text-lg font-semibold text-foreground">
          {movie.title}
        </h3>
        <div className="mt-1 flex items-center gap-1 text-base text-muted-foreground">
          <Star size={12} className="fill-accent-gold text-accent-gold" />
          <span>
            {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </span>
        </div>
      </div>
    </Link>
  );
}
