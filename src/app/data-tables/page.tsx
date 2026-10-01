"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import {
  getColumns,
  getMoviePrice,
  type SortField,
  type SortOrder,
} from "./columns";
import { DataTable } from "./data-table";
import { DataTableFeatures } from "./data-table-features";
import type { Movie } from "@/lib/api/types/movie";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DataTablesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("popular");
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const apiEndpoint = searchQuery
    ? `/api/movies?query=${encodeURIComponent(searchQuery)}`
    : `/api/movies?category=${category}`;

  const { data, error, isLoading } = useSWR(apiEndpoint, fetcher);
  const rawMovies: Movie[] = data?.results || [];

  const sortedMovies = useMemo(() => {
    if (!sortField) return rawMovies;

    return [...rawMovies].sort((a, b) => {
      let valA = 0;
      let valB = 0;

      if (sortField === "id") {
        valA = Number(a.id) || 0;
        valB = Number(b.id) || 0;
      } else if (sortField === "price") {
        valA = getMoviePrice(a);
        valB = getMoviePrice(b);
      } else if (sortField === "rating") {
        valA = a.vote_average || 0;
        valB = b.vote_average || 0;
      }

      return sortOrder === "asc" ? valA - valB : valB - valA;
    });
  }, [rawMovies, sortField, sortOrder]);

  const columns = useMemo(
    () =>
      getColumns({
        sortField,
        sortOrder,
        onSort: handleSort,
      }),
    [sortField, sortOrder],
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Movie Management Table
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Explore movies with custom sorting and quick navigation
        </p>
      </div>

      <DataTableFeatures
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        category={category}
        setCategory={setCategory}
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {error && (
        <div className="text-red-500 py-4 text-sm font-medium">
          Failed to fetch movie data.
        </div>
      )}

      <DataTable columns={columns} data={sortedMovies} isLoading={isLoading} />
    </section>
  );
}
