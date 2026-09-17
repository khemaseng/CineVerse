
"use client";

interface Props {
  columns: any[];
  data: any[];
  isLoading: boolean;
}

export function DataTable({ columns, data, isLoading }: Props) {
  if (isLoading) {
    return <div className="py-12 text-center text-sm text-muted-foreground">Loading data...</div>;
  }

  if (!data.length) {
    return <div className="py-12 text-center text-sm text-muted-foreground">No movies found.</div>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground">
          <tr>
            {columns.map((col) => (
              <th key={col.accessorKey} className="px-4 py-3 font-semibold">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-muted/30">
              {columns.map((col) => (
                <td key={col.accessorKey} className="px-4 py-3">
                  {col.cell({ row: { original: row } })}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}