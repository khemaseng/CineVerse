import Link from "next/link";
import { MovieCardComponent } from "@/components/movies/MovieCardComponent";
import type { Movie } from "@/lib/api/types/movie";

export function TrendingPreviewComponent({ movies = [] }: { movies: Movie[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-6 flex items-end justify-between border-b border-primary-gold/10 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary-gold">
            Trending
          </span>
          <h2 className="text-xl font-black text-navy-blue sm:text-3xl dark:text-white">
            Popular Right Now
          </h2>
          <p className="mt-1 text-xs text-navy-blue/60 dark:text-white/60">
            Top trending entertainment chosen by CineVerse audiences
          </p>
        </div>
        <Link
          href="/trending"
          className="group flex items-center gap-1 text-xs font-semibold text-primary-gold transition-colors hover:text-primary-dark sm:text-sm"
        >
          See All{" "}
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      {/* Mobile: Horizontal Scroll with Snap | Desktop: 5 Cards Grid */}
      <div className="-mx-4 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5 scrollbar-none">
        {movies.slice(0, 5).map((movie) => (
          <div
            key={movie.id}
            className="w-[155px] flex-none snap-start sm:w-auto"
          >
            <MovieCardComponent movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
}
