"use client";

import { useState } from "react";
import useSWR from "swr";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { DataTableFeatures } from "./data-table-features";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DataTablesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("popular");

  // Fetch either search endpoint or selected category list using SWR
  const apiEndpoint = searchQuery
    ? `/api/movies?query=${encodeURIComponent(searchQuery)}`
    : `/api/movies?category=${category}`;

  const { data, error, isLoading } = useSWR(apiEndpoint, fetcher);
  const movies = data?.results || [];

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">
          Movie Management Table
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Search and filter movies live with SWR
        </p>
      </div>

      <DataTableFeatures
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        category={category}
        setCategory={setCategory}
      />

      {error && (
        <div className="text-red-500 py-4">Failed to fetch movie data.</div>
      )}

      <DataTable columns={columns} data={movies} isLoading={isLoading} />
    </section>
  );
}
