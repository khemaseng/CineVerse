import { MovieCardComponent } from "@/components/movies/MovieCardComponent";
import type { Movie } from "@/lib/api/types/movie";

interface Props {
  movies?: Movie[];
}

export function MovieCardListComponent({ movies = [] }: Props) {
  if (!movies.length) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 p-8 text-center bg-card/20">
        <p className="text-lg font-medium text-muted-foreground">
          No movies found.
        </p>
        <p className="text-sm text-muted-foreground/60 mt-1">
          Try adjusting your search query or selected genre filter.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Mobile: Horizontal Snap Scroll (One Card at a time) */}
      {/* sm / md / lg / xl: Standard Responsive Grid */}
      <div className="flex w-full gap-4 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:pb-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="w-[84vw] max-w-[320px] shrink-0 snap-center sm:w-auto sm:max-w-none sm:shrink"
          >
            <MovieCardComponent movie={movie} />
          </div>
        ))}
      </div>

      {/* Mobile Swipe Hint Badge */}
      <div className="mt-2 flex items-center justify-center gap-1.5 text-xs text-muted-foreground/70 sm:hidden">
        <span>← Swipe to explore →</span>
      </div>
    </div>
  );
}
