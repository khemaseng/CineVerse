
"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { tmdbImage } from "@/lib/api/tmdb";
import type { Movie } from "@/lib/api/types/movie";

export const columns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }: any) => <span className="font-mono text-xs">{row.original.id}</span>,
  },
  {
    accessorKey: "poster_path",
    header: "Poster",
    cell: ({ row }: any) => (
      <div className="relative h-12 w-8 overflow-hidden rounded">
        <Image
          src={tmdbImage(row.original.poster_path, "w92")}
          alt={row.original.title || "Poster"}
          fill
          className="object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }: any) => (
      <span className="font-semibold text-foreground">{row.original.title}</span>
    ),
  },
  {
    accessorKey: "release_date",
    header: "Release Date",
    cell: ({ row }: any) => <span>{row.original.release_date || "N/A"}</span>,
  },
  {
    accessorKey: "vote_average",
    header: "Rating",
    cell: ({ row }: any) => (
      <div className="flex items-center gap-1">
        <Star size={14} className="fill-accent-gold text-accent-gold" />
        <span>{row.original.vote_average?.toFixed(1) || "N/A"}</span>
      </div>
    ),
  },
];