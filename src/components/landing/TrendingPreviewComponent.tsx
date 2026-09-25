
import Link from "next/link";
import { MovieCardComponent } from "@/components/movies/MovieCardComponent";
import type { Movie } from "@/lib/api/types/movie";

export function TrendingPreviewComponent({ movies = [] }: { movies: Movie[] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 flex items-end justify-between border-b border-primary-gold/10 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary-gold">
            Trending
          </span>
          <h2 className="text-2xl font-black text-navy-blue sm:text-3xl dark:text-white">
            Popular Right Now
          </h2>
          <p className="mt-1 text-xs text-navy-blue/60 dark:text-white/60">
            Top trending entertainment chosen by CineVerse audiences
          </p>
        </div>
        <Link
          href="/trending"
          className="group flex items-center gap-1 text-sm font-semibold text-primary-gold transition-colors hover:text-primary-dark"
        >
          See All <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>

      {/* 5 Cards Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {movies.slice(0, 5).map((movie) => (
          <MovieCardComponent key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
