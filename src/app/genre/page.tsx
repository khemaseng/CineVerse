import Link from "next/link";
import { genres } from "@/lib/api/genres";

export const metadata = {
  title: "Movie Genres - Cineverse",
  description: "Explore all movie genres and categories.",
};

export default function GenresIndexPage() {
  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Movie Genres
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Browse our entire collection of films categorized by genre.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {genres.map((genre) => (
            <Link
              key={genre.id}
              href={`/genre/${genre.id}`}
              className="group flex h-32 flex-col justify-between rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-amber-400 transition-colors group-hover:bg-amber-500 group-hover:text-black">
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
                <h3 className="text-base font-bold text-white group-hover:text-amber-400">
                  {genre.name}
                </h3>
                <span className="text-[11px] text-zinc-500">Explore movies &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
