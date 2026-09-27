import type { VideoResult } from "@/lib/api/types/movie";

export function MovieTrailerComponent({ videos = [] }: { videos?: VideoResult[] }) {
  const trailer = videos.find(
    (video) =>
      video.site === "YouTube" &&
      (video.type === "Trailer" || video.type === "Teaser"),
  );

  if (!trailer) return null;

  return (
    <section className="space-y-4" aria-labelledby="trailer-heading">
      <h2 id="trailer-heading" className="text-xl font-bold text-foreground sm:text-2xl">
        Official Trailer
      </h2>
      <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-2xl border border-border shadow-lg">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${trailer.key}`}
          title={trailer.name || "Movie trailer"}
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </section>
  );
}
