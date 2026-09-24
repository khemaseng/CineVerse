"use client";

import { useState, useTransition, useId } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, X, RotateCcw } from "lucide-react";
import { SORT_OPTIONS } from "@/lib/api/tmdb";

interface Props {
  currentQuery?: string;
  currentSortBy?: string;
}

export function MovieFilterComponent({
  currentQuery = "",
  currentSortBy = "popularity.desc",
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(currentQuery);
  const searchInputId = useId();
  const sortSelectId = useId();

  const updateFilters = (updates: {
    query?: string;
    sortBy?: string;
    page?: string;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    // Reset page to 1 on filter changes unless explicitly specified
    params.set("page", updates.page || "1");

    if (updates.query !== undefined) {
      if (updates.query.trim()) {
        params.set("query", updates.query.trim());
      } else {
        params.delete("query");
      }
    }

    if (updates.sortBy !== undefined) {
      if (updates.sortBy && updates.sortBy !== "popularity.desc") {
        params.set("sortBy", updates.sortBy);
      } else {
        params.delete("sortBy");
      }
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ query: searchTerm });
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    updateFilters({ query: "" });
  };

  const handleSortChange = (sortBy: string) => {
    updateFilters({ sortBy });
  };

  const handleResetAll = () => {
    setSearchTerm("");
    startTransition(() => {
      router.push(pathname);
    });
  };

  const hasActiveFilters = Boolean(
    currentQuery || (currentSortBy && currentSortBy !== "popularity.desc")
  );

  return (
    <div className="mb-8 space-y-4">
      {/* Search & Sort Controls Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search Input Form */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex-1 max-w-lg"
        >
          <div className="relative">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors"
              size={18}
            />
            <input
              id={searchInputId}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search movies by title..."
              className="w-full rounded-xl border border-border bg-muted/40 py-2.5 pl-10 pr-20 text-sm font-medium text-foreground placeholder:text-muted-foreground/70 focus:border-primary-gold focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary-gold/20 transition-all"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="Clear search query"
                className="absolute right-12 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 transition-colors"
              >
                <X size={15} />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-primary-gold px-3 py-1 text-xs font-semibold text-navy-blue transition-all hover:opacity-90 active:scale-95"
            >
              Search
            </button>
          </div>
        </form>

        {/* Dropdowns / Actions Container */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor={sortSelectId} className="text-xs font-semibold text-muted-foreground">
              Sort:
            </label>
            <select
              id={sortSelectId}
              value={currentSortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-xs font-semibold text-foreground focus:border-primary-gold focus:outline-none focus:ring-2 focus:ring-primary-gold/20 transition-all cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters Button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetAll}
              className="flex items-center gap-1 rounded-lg border border-border bg-muted/30 px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted/70 hover:text-foreground transition-all"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Loading feedback during URL transitions */}
      {isPending && (
        <div className="h-0.5 w-full overflow-hidden bg-muted rounded-full">
          <div className="h-full w-1/3 animate-[shimmer_1.5s_infinite] bg-primary-gold" />
        </div>
      )}
    </div>
  );
}