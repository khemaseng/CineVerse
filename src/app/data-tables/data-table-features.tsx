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
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-4">
      {/* Search Input */}
      <div className="w-full sm:w-72">
        <input
          type="text"
          placeholder="Search movie name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-10 w-full rounded-xl border border-gray-200/80 bg-white px-3.5 text-xs text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-primary-gold focus:outline-none focus:ring-1 focus:ring-primary-gold/50 dark:border-white/10 dark:bg-[#07162c] dark:text-white dark:placeholder:text-gray-400 dark:shadow-none transition-colors"
        />
      </div>

      {/* Category / Filter Select */}
      <div className="flex items-center gap-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-10 rounded-xl border border-gray-200/80 bg-white px-3.5 text-xs font-medium text-gray-800 shadow-sm focus:border-primary-gold focus:outline-none focus:ring-1 focus:ring-primary-gold/50 cursor-pointer dark:border-white/10 dark:bg-[#07162c] dark:text-white dark:shadow-none transition-colors"
        >
          <option value="popular" className="dark:bg-[#07162c] dark:text-white">
            Popular
          </option>
          <option
            value="now_playing"
            className="dark:bg-[#07162c] dark:text-white"
          >
            Now Playing
          </option>
          <option
            value="top_rated"
            className="dark:bg-[#07162c] dark:text-white"
          >
            Top Rated
          </option>
          <option
            value="upcoming"
            className="dark:bg-[#07162c] dark:text-white"
          >
            Upcoming
          </option>
        </select>
      </div>
    </div>
  );
}
