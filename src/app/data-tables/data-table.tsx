"use client";

import type { Movie } from "@/lib/api/types/movie";
import type { ColumnDef } from "./columns";

interface DataTableProps {
  columns: ColumnDef<Movie>[];
  data: Movie[];
  isLoading?: boolean;
}

export function DataTable({
  columns,
  data = [],
  isLoading = false,
}: DataTableProps) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm shadow-gray-200/50 backdrop-blur-sm dark:border-white/10 dark:bg-[#061426]/70 dark:shadow-2xl dark:shadow-black/40">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50 text-xs font-semibold text-gray-500 dark:border-white/10 dark:bg-white/[0.02] dark:text-gray-400">
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`px-5 py-3.5 font-medium tracking-normal ${col.className || ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-16 text-center text-sm text-gray-400 dark:text-gray-500"
                >
                  Loading movie catalog...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-16 text-center text-sm text-gray-400 dark:text-gray-500"
                >
                  No movies found.
                </td>
              </tr>
            ) : (
              data.map((movie, rowIndex) => (
                <tr
                  key={movie.id}
                  className="transition-colors hover:bg-gray-50/70 dark:hover:bg-white/[0.03]"
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={`px-5 py-3.5 align-middle tracking-normal text-gray-700 dark:text-gray-200 ${col.className || ""}`}
                    >
                      {col.cell(movie, rowIndex)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
