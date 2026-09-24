import Link from "next/link";

const GENRES = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 878, name: "Sci-Fi" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
];

export function GenresShowcaseComponent() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <h2 className="mb-4 text-xl font-bold text-foreground">Explore Genres</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {GENRES.map((g) => (
          <Link
            key={g.id}
            href={`/genre/${g.id}`}
            className="flex-shrink-0 rounded-full border border-border bg-muted/50 px-5 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-primary-red hover:text-white"
          >
            {g.name}
          </Link>
        ))}
      </div>
    </section>
  );
}