"use client";

import { useState } from "react";
import Image from "next/image";
import type { VideoResult } from "@/lib/api/types/movie";

interface TrailerSectionProps {
  videos?: VideoResult[];
}

export default function TrailerSection({ videos = [] }: TrailerSectionProps) {
  // Filter for YouTube trailers and teasers
  const youtubeVideos = videos.filter((v) => v.site === "YouTube");

  // Prioritize Official Trailers
  const sortedVideos = [...youtubeVideos].sort((a, b) => {
    if (a.type === "Trailer" && b.type !== "Trailer") return -1;
    if (b.type === "Trailer" && a.type !== "Trailer") return 1;
    if (a.official && !b.official) return -1;
    if (!a.official && b.official) return 1;
    return 0;
  });

  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(
    sortedVideos[0]?.id ?? null
  );
  const selectedVideo =
    sortedVideos.find((video) => video.id === selectedVideoId) ?? sortedVideos[0];

  if (sortedVideos.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 border-t border-zinc-800 pt-10">
      <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            Official Trailers & Videos
          </h2>
          <p className="text-xs text-zinc-400">
            Watch official trailers, teasers, and preview clips.
          </p>
        </div>

        {/* Video Type Badges / Count */}
        <div className="text-xs text-zinc-400">
          <span className="rounded-full bg-zinc-800 px-3 py-1 font-medium text-zinc-300">
            {sortedVideos.length} {sortedVideos.length === 1 ? "Video" : "Videos"} Available
          </span>
        </div>
      </div>

      {/* Main Active Player */}
      {selectedVideo ? (
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
          <div className="relative aspect-video w-full bg-black">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${selectedVideo.key}?rel=0&autoplay=0`}
              title={selectedVideo.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-zinc-900/90 border-t border-zinc-800">
            <div>
              <h3 className="text-sm font-bold text-white sm:text-base">
                {selectedVideo.name}
              </h3>
              <div className="mt-1 flex items-center gap-2 text-xs text-zinc-400">
                <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-amber-400">
                  {selectedVideo.type}
                </span>
                {selectedVideo.official ? (
                  <span className="text-[11px] text-zinc-400">• Official Release</span>
                ) : null}
              </div>
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${selectedVideo.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-zinc-700"
            >
              Open in YouTube &rarr;
            </a>
          </div>
        </div>
      ) : null}

      {/* Video Selector List */}
      {sortedVideos.length > 1 ? (
        <div className="mt-6 flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
          {sortedVideos.map((video) => {
            const isSelected = selectedVideo?.id === video.id;
            return (
              <button
                key={video.id}
                type="button"
                onClick={() => setSelectedVideoId(video.id)}
                className={`group relative flex w-60 shrink-0 flex-col overflow-hidden rounded-xl border text-left transition-all duration-200 ${
                  isSelected
                    ? "border-amber-500 ring-2 ring-amber-500/40 bg-zinc-900"
                    : "border-zinc-800/80 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-900"
                }`}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-800">
                  <Image
                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                    alt={video.name}
                    fill
                    sizes="240px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Play Overlay Icon */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors group-hover:bg-black/20">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500/90 text-black shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 fill-black"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="p-2.5">
                  <span className="inline-block rounded bg-zinc-800 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-400">
                    {video.type}
                  </span>
                  <h4 className="mt-1 line-clamp-1 text-xs font-semibold text-white group-hover:text-amber-400">
                    {video.name}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
