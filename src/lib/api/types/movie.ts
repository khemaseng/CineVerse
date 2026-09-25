export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count?: number;
  original_language?: string;
  genre_ids?: number[];
  popularity?: number;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface VideoResult {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official?: boolean;
}

export interface MovieDetails extends Movie {
  tagline?: string;
  runtime?: number;
  genres?: { id: number; name: string }[];
  credits?: { cast: CastMember[] };
  videos?: { results: VideoResult[] };
}
