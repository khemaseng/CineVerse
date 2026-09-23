"use client";

import Link from "next/link";
import { genres } from "@/lib/api/genres";

export default function GenreDropdown() {
  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center gap-1.5 py-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
        aria-haspopup="true"
      >
        Genres
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div className="invisible absolute left-0 top-full z-50 w-56 translate-y-2 rounded-xl border border-zinc-800 bg-zinc-950/95 p-2 shadow-2xl backdrop-blur-md opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 max-h-96 overflow-y-auto scrollbar-thin">
        <div className="grid grid-cols-1 gap-1">
          {genres.map((genre) => (
            <Link
              key={genre.id}
              href={`/genre/${genre.id}`}
              className="rounded-lg px-3 py-2 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              {genre.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
