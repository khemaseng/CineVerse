import Image from "next/image";
import { tmdbImage } from "@/lib/api/tmdb";
import type { CastMember } from "@/lib/api/types/movie";

export function MovieCastComponent({ cast }: { cast: CastMember[] }) {
  if (!cast?.length) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-foreground">Top Cast</h3>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {cast.slice(0, 10).map((member) => (
          <div key={member.id} className="w-28 flex-shrink-0 text-center">
            <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full border border-border">
              <Image
                src={tmdbImage(member.profile_path, "w185")}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="mt-2 truncate text-xs font-semibold text-foreground">{member.name}</p>
            <p className="truncate text-[10px] text-muted-foreground">{member.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
}