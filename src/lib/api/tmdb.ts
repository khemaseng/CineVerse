
import type { Movie, MovieDetails } from "./types/movie";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export const tmdbImage = (path: string | null, size = "w500") => {
  if (!path) return "/placeholder-movie.jpg";
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
};

async function fetchTMDB<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.append(
    "api_key",
    process.env.NEXT_PUBLIC_TMDB_API_KEY || ""
  );

  Object.entries(params).forEach(([key, val]) => {
    if (val) url.searchParams.append(key, val);
  });

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`TMDB API Error: ${res.statusText}`);
  return res.json();
}

export const getTrendingMovies = (
  timeWindow: "day" | "week" = "day"
): Promise<{ results: Movie[] }> =>
  fetchTMDB<{ results: Movie[] }>(`/trending/movie/${timeWindow}`);

export const getNowPlayingMovies = (): Promise<{ results: Movie[] }> =>
  fetchTMDB<{ results: Movie[] }>("/movie/now_playing");

export const getTopRatedMovies = (): Promise<{ results: Movie[] }> =>
  fetchTMDB<{ results: Movie[] }>("/movie/top_rated");

export const getUpcomingMovies = (): Promise<{ results: Movie[] }> =>
  fetchTMDB<{ results: Movie[] }>("/movie/upcoming");

export const getMovieDetails = (id: string): Promise<MovieDetails> =>
  fetchTMDB<MovieDetails>(`/movie/${id}`, {
    append_to_response: "videos,credits",
  });