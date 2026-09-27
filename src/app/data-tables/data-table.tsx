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
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50 text-base font-semibold uppercase text-muted-foreground">
              {columns.map((column) => (
                <th
                  key={column.id}
                  className={`px-4 py-3 ${column.className || ""}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-12 text-center text-muted-foreground"
                >
                  Loading movie catalog...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-12 text-center text-muted-foreground"
                >
                  No movies found.
                </td>
              </tr>
            ) : (
              data.map((movie, rowIndex) => (
                <tr
                  key={movie.id}
                  className="transition-colors hover:bg-muted/30"
                >
                  {columns.map((column) => (
                    <td
                      key={column.id}
                      className={`px-4 py-3 align-middle ${column.className || ""}`}
                    >
                      {column.cell(movie, rowIndex)}
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
