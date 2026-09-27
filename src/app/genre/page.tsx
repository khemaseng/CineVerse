import type { Metadata } from "next";
import Link from "next/link";
import { TMDB_GENRES } from "@/lib/api/tmdb";

export const metadata: Metadata = {
  title: "Movie Genres | CineVerse",
  description: "Explore all movie genres and categories on CineVerse.",
};

export default function GenrePage() {
  return (
    <main className="page-container min-h-screen">
      <div>
        <div className="page-heading">
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground">
            Movie Genres
          </h1>
          <p className="text-lg">Browse our entire collection of films categorized by genre.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
          {TMDB_GENRES.map((genre) => (
            <Link
              key={genre.id}
              href={`/genre/${genre.id}`}
              className="group flex min-h-32 flex-col justify-between rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:-translate-y-1 hover:border-primary-gold/50 hover:shadow-lg hover:shadow-primary-gold/10 sm:p-5"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-primary-gold transition-colors group-hover:bg-primary-gold group-hover:text-navy-blue">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                  />
                </svg>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary-gold">
                  {genre.name}
                </h3>
                <span className="text-[18px] text-muted-foreground">
                  Explore movies &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
