"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MoreHorizontal } from "lucide-react";
import { tmdbImage } from "@/lib/api/tmdb";
import type { Movie } from "@/lib/api/types/movie";

export interface ColumnDef<T> {
  header: string;
  className?: string;
  cell: (row: T, index?: number) => React.ReactNode;
}

export const columns: ColumnDef<Movie>[] = [
  {
    header: "ID",
    className: "w-16 text-gray-400 dark:text-gray-400 font-mono text-xs",
    cell: (movie) => <span>#{movie.id.toString().slice(-4)}</span>,
  },
  {
    header: "Image",
    className: "w-16",
    cell: (movie) => (
      <div className="relative h-12 w-9 overflow-hidden rounded-md border border-gray-200 bg-gray-100 shadow-sm dark:border-white/10 dark:bg-white/5">
        <Image
          src={tmdbImage(movie.poster_path, "w200")}
          alt={movie.title || "Poster"}
          fill
          className="object-cover"
        />
      </div>
    ),
  },
  {
    header: "Movie Name",
    className: "min-w-[200px] max-w-[280px]",
    cell: (movie) => (
      <Link
        href={`/movies/${movie.id}`}
        className="block font-semibold text-gray-900 transition-colors line-clamp-1 hover:text-primary-gold dark:text-white dark:hover:text-primary-gold"
      >
        {movie.title}
      </Link>
    ),
  },
  {
    header: "Release Date",
    className:
      "w-28 text-gray-500 text-xs whitespace-nowrap dark:text-gray-400",
    cell: (movie) => <span>{movie.release_date || "N/A"}</span>,
  },
  {
    header: "LANGUAGE",
    className: "w-20 text-gray-500 uppercase text-xs dark:text-gray-400",
    cell: (movie: any) => (
      <span className="rounded bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-700 dark:bg-white/10 dark:text-gray-200">
        {(movie.original_language || "en").toUpperCase()}
      </span>
    ),
  },
  {
    header: "Rating",
    className: "w-28 whitespace-nowrap",
    cell: (movie) => (
      <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-500">
        <Star size={13} className="fill-amber-500 text-amber-500" />
        <span>
          {movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"}
        </span>
        <span className="text-[11px] font-normal text-gray-400 dark:text-gray-400">
          ({movie.vote_count ?? 0})
        </span>
      </div>
    ),
  },
  {
    header: "Action",
    className: "w-16 text-right",
    cell: (movie) => (
      <Link
        href={`/movies/${movie.id}`}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
        title="View Details"
      >
        <MoreHorizontal size={16} />
      </Link>
    ),
  },
];
