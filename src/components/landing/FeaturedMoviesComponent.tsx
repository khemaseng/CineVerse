import Link from "next/link";
import { MovieCardComponent } from "@/components/movies/MovieCardComponent";
import type { Movie } from "@/lib/api/types/movie";

interface Props {
  movies?: Movie[];
}

export function FeaturedMoviesComponent({ movies = [] }: Props) {
  const featured = movies.slice(0, 5);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Header Section */}
      <div className="mb-6 flex items-end justify-between border-b border-primary-gold/15 pb-4 sm:mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary-gold">
            In Theaters
          </span>
          <h2 className="text-2xl font-black text-navy-blue dark:text-white sm:text-3xl">
            Now Playing
          </h2>
          <p className="mt-1 text-xs text-navy-blue/70 dark:text-white/60 sm:text-sm">
            Current theater hits and top box office films
          </p>
        </div>
        <Link
          href="/movies"
          className="group flex items-center gap-1 text-xs sm:text-sm font-semibold text-primary-gold transition-colors hover:text-amber-500"
        >
          View All{" "}
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      {/* Mobile: 1 Card Snap-Scroll | Desktop: 5 Cards Grid */}
      <div className="flex w-full gap-4 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0 lg:grid-cols-5">
        {featured.map((movie) => (
          <div
            key={movie.id}
            className="w-[84vw] max-w-[320px] shrink-0 snap-center sm:w-auto sm:max-w-none sm:shrink"
          >
            <MovieCardComponent movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
}
