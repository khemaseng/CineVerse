"use client";

interface Props {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  category: string;
  setCategory: (cat: string) => void;
}

export function DataTableFeatures({
  searchQuery,
  setSearchQuery,
  category,
  setCategory,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-4 py-4">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="h-10 w-full max-w-xs rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-red"
      />
      
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-red"
      >
        <option value="now_playing">Now Playing</option>
        <option value="popular">Popular</option>
        <option value="top_rated">Top Rated</option>
        <option value="upcoming">Upcoming</option>
      </select>
    </div>
  );
}