<<<<<<< HEAD
import type { Metadata } from "next";
import Link from "next/link";
import { TMDB_GENRES } from "@/lib/api/tmdb";
import { Film } from "lucide-react";

export const metadata: Metadata = {
  title: "Movie Genres | CineVerse",
  description: "Explore all movie genres and categories on CineVerse.",
};

export default function GenrePage() {
=======
import Link from "next/link";
import { genres } from "@/lib/api/genres";

export const metadata = {
  title: "Movie Genres - Cineverse",
  description: "Explore all movie genres and categories.",
};

export default function GenresIndexPage() {
>>>>>>> fff9fa6eac36a2dcaa73d705a1bae94b6f643a6b
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-12">
      <div className="mb-10 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-primary-gold">
          Categories
        </span>
        <h1 className="mt-2 text-3xl font-black text-navy-blue sm:text-5xl dark:text-white">
          Explore Movie Genres
        </h1>
        <p className="mt-2 text-sm text-navy-blue/60 dark:text-white/60">
          Select a category to discover curated movies and cinema classics.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {TMDB_GENRES.map((genre) => (
          <Link
            key={genre.id}
            href={`/genre/${genre.id}`}
            className="group relative flex flex-col items-center justify-center rounded-2xl border border-primary-gold/20 bg-white/50 p-6 text-center shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary-gold hover:bg-primary-gold/10 hover:shadow-2xl dark:bg-[#041226]/60"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-gold/10 text-primary-gold transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary-gold group-hover:text-navy-blue">
              <Film size={22} />
            </div>
            <h3 className="mt-4 font-bold text-navy-blue transition-colors group-hover:text-primary-gold dark:text-white">
              {genre.name}
            </h3>
          </Link>
        ))}
      </div>
    </main>
  );
}
