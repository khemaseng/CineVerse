"use client";

import { ArrowUp, ArrowDown } from "lucide-react";
import type { SortField, SortOrder } from "./columns";

interface Props {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  category: string;
  setCategory: (cat: string) => void;
  sortField: SortField | null;
  setSortField: (field: SortField | null) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
}

export function DataTableFeatures({
  searchQuery,
  setSearchQuery,
  category,
  setCategory,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
}: Props) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 py-4">
      {/* Search Input with Light Yellow Border */}
      <div className="w-full lg:w-80">
        <input
          type="text"
          placeholder="Search movie name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-10 w-full rounded-xl border border-amber-300/80 bg-white px-3.5 text-xs text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300/40 dark:border-amber-400/40 dark:bg-[#07162c] dark:text-white dark:placeholder:text-gray-400 transition-all"
        />
      </div>

      {/* Control Actions: Category Dropdown + Sort By Dropdown + Sort Direction Button */}
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-10 rounded-xl border border-amber-300/80 bg-white px-3.5 text-xs font-semibold text-gray-800 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300/40 cursor-pointer dark:border-amber-400/40 dark:bg-[#07162c] dark:text-white transition-all"
          >
            <option value="popular">Category: Popular</option>
            <option value="now_playing">Category: Now Playing</option>
            <option value="top_rated">Category: Top Rated</option>
            <option value="upcoming">Category: Upcoming</option>
          </select>
        </div>

        <div className="relative">
          <select
            value={sortField || "default"}
            onChange={(e) => {
              const val = e.target.value;
              setSortField(val === "default" ? null : (val as SortField));
            }}
            className="h-10 rounded-xl border border-amber-300/80 bg-white px-3.5 text-xs font-semibold text-gray-800 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300/40 cursor-pointer dark:border-amber-400/40 dark:bg-[#07162c] dark:text-white transition-all"
          >
            <option value="default">Sort By: Default</option>
            <option value="id">Sort By: ID</option>
            <option value="price">Sort By: Price</option>
            <option value="rating">Sort By: Rating</option>
          </select>
        </div>

        <button
          type="button"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-amber-300/80 bg-white px-3 text-xs font-bold text-gray-800 shadow-sm transition-all hover:bg-amber-400/10 focus:outline-none focus:ring-2 focus:ring-amber-300/40 dark:border-amber-400/40 dark:bg-[#07162c] dark:text-white"
          title={`Order: ${sortOrder.toUpperCase()}`}
        >
          {sortOrder === "asc" ? (
            <>
              <ArrowUp size={14} className="text-amber-500" />
              <span>Asc</span>
            </>
          ) : (
            <>
              <ArrowDown size={14} className="text-amber-500" />
              <span>Desc</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
