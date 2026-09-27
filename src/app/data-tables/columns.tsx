"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { Star } from "lucide-react";
import { tmdbImage } from "@/lib/api/tmdb";
import type { Movie } from "@/lib/api/types/movie";

export interface ColumnDef<T> {
  id: string;
  header: string;
  className?: string;
  cell: (row: T, index?: number) => ReactNode;
}

export const columns: ColumnDef<Movie>[] = [
  {
    id: "id",
    header: "ID",
    className: "w-16 font-mono text-xs text-gray-500",
    cell: (movie) => <span>#{movie.id.toString().slice(-4)}</span>,
  },
  {
    id: "poster",
    header: "Poster",
    className: "w-16",
    cell: (movie) => (
      <div className="relative h-12 w-9 overflow-hidden rounded-md border border-border bg-muted">
        <Image
          src={tmdbImage(movie.poster_path, "w200")}
          alt={movie.title || "Movie poster"}
          fill
          sizes="36px"
          className="object-cover"
        />
      </div>
    ),
  },
  {
    id: "title",
    header: "Title",
    cell: (movie) => <span className="font-semibold">{movie.title}</span>,
  },
  {
    id: "release-date",
    header: "Release Date",
    className: "w-28 whitespace-nowrap text-xs text-muted-foreground",
    cell: (movie) => <span>{movie.release_date || "N/A"}</span>,
  },
  {
    id: "language",
    header: "Language",
    className: "w-20 text-xs uppercase text-muted-foreground",
    cell: (movie) => <span>{(movie.original_language || "en").toUpperCase()}</span>,
  },
  {
    id: "rating",
    header: "Rating",
    className: "w-28 whitespace-nowrap",
    cell: (movie) => (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-500">
        <Star size={13} className="fill-amber-500 text-amber-500" />
        {movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"}
        <span className="font-normal text-muted-foreground">({movie.vote_count ?? 0})</span>
      </span>
    ),
  },
];
