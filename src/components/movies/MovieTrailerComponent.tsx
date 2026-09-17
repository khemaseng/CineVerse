import type { VideoResult } from "@/lib/api/types/movie";

export function MovieTrailerComponent({ videos }: { videos?: VideoResult[] }) {
  const trailer = videos?.find((v) => v.type === "Trailer" && v.site === "YouTube");
  if (!trailer) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-foreground">Official Trailer</h3>
      <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-2xl border border-border shadow-lg">
        <iframe
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title={trailer.name}
          className="h-full w-full border-0"
          allowFullScreen
        />
      </div>
    </div>
  );
}