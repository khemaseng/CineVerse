"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ArrowUpDown, ChevronUp, ChevronDown } from "lucide-react";
import { tmdbImage } from "@/lib/api/tmdb";
import type { Movie } from "@/lib/api/types/movie";

export type SortField = "id" | "price" | "rating";
export type SortOrder = "asc" | "desc";

export interface ColumnDef<T> {
  header: React.ReactNode;
  className?: string;
  cell: (row: T, index?: number) => React.ReactNode;
}

interface ColumnOptions {
  sortField: SortField | null;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

function SortButton({
  label,
  field,
  currentField,
  currentOrder,
  onSort,
}: {
  label: string;
  field: SortField;
  currentField: SortField | null;
  currentOrder: SortOrder;
  onSort: (field: SortField) => void;
}) {
  const isActive = currentField === field;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onSort(field);
      }}
      className="group inline-flex items-center gap-1.5 transition-colors hover:text-amber-500 font-semibold"
    >
      <span>{label}</span>
      {isActive ? (
        currentOrder === "asc" ? (
          <ChevronUp size={14} className="text-amber-500" />
        ) : (
          <ChevronDown size={14} className="text-amber-500" />
        )
      ) : (
        <ArrowUpDown
          size={13}
          className="text-gray-400 group-hover:text-amber-500 opacity-60"
        />
      )}
    </button>
  );
}

export function getMoviePrice(movie: Movie): number {
  const base = 3.99;
  const ratingBonus = ((movie.vote_average || 5) / 10) * 4;
  return parseFloat((base + ratingBonus).toFixed(2));
}

export function getColumns({
  sortField,
  sortOrder,
  onSort,
}: ColumnOptions): ColumnDef<Movie>[] {
  return [
    {
      header: (
        <SortButton
          label="ID"
          field="id"
          currentField={sortField}
          currentOrder={sortOrder}
          onSort={onSort}
        />
      ),
      className: "w-20 text-gray-400 dark:text-gray-400 font-mono text-xs",
      cell: (movie) => <span>#{movie.id.toString().slice(-4)}</span>,
    },
    {
      header: "Poster",
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
      className: "min-w-[200px] max-w-[260px]",
      cell: (movie) => (
        <div>
          <span className="block font-semibold text-gray-900 transition-colors line-clamp-1 group-hover:text-amber-500 dark:text-white dark:group-hover:text-amber-400">
            {movie.title}
          </span>
          <span className="text-[11px] text-gray-400 dark:text-gray-400">
            {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
          </span>
        </div>
      ),
    },
    {
      header: (
        <SortButton
          label="Price"
          field="price"
          currentField={sortField}
          currentOrder={sortOrder}
          onSort={onSort}
        />
      ),
      className: "w-24 text-xs font-semibold",
      cell: (movie) => (
        <span className="rounded-md bg-amber-500/10 px-2 py-1 font-mono text-xs font-bold text-amber-500">
          ${getMoviePrice(movie).toFixed(2)}
        </span>
      ),
    },
    {
      header: "Language",
      className: "w-20 text-gray-500 uppercase text-xs dark:text-gray-400",
      cell: (movie) => (
        <span className="rounded bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-700 dark:bg-white/10 dark:text-gray-200">
          {(movie.original_language || "en").toUpperCase()}
        </span>
      ),
    },
    {
      header: (
        <SortButton
          label="Rating"
          field="rating"
          currentField={sortField}
          currentOrder={sortOrder}
          onSort={onSort}
        />
      ),
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
      className: "w-20 text-right",
      cell: (movie) => (
        <Link
          href={`/movies/${movie.id}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold text-amber-500 hover:bg-amber-500/10 transition-colors"
        >
          <span>View</span>
          <span>→</span>
        </Link>
      ),
    },
  ];
}
