
import Link from "next/link";
import Image from "next/image";
import { Star, Play } from "lucide-react";
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

      {/* Play Icon on Hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-gold text-navy-blue shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Play size={20} className="fill-navy-blue ml-0.5" />
        </div>
      </div>

      {/* Bottom Content Metadata */}
      <div className="absolute bottom-0 inset-x-0 p-4 transition-transform duration-300 group-hover:-translate-y-1">
        <p className="text-[11px] font-semibold tracking-wider uppercase text-primary-gold">
          {movie.release_date ? movie.release_date.slice(0, 4) : "Movie"}
        </p>
        <h3 className="line-clamp-1 text-base font-bold text-white transition-colors group-hover:text-primary-gold">
          {movie.title}
        </h3>
      </div>
    </Link>
  );
}