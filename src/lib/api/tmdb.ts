
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

export const TMDB_GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

export const SORT_OPTIONS = [
  { label: "Popularity", value: "popularity.desc" },
  { label: "Highest Rated", value: "vote_average.desc" },
  { label: "Release Date (Newest)", value: "primary_release_date.desc" },
  { label: "Release Date (Oldest)", value: "primary_release_date.asc" },
  { label: "Title (A-Z)", value: "title.asc" },
];

export interface GetMoviesParams {
  query?: string;
  genre?: string;
  sortBy?: string;
  page?: number;
}

export interface GetMoviesResponse {
  results: Movie[];
  page: number;
  totalPages: number;
  totalResults: number;
}

export async function getMovies({
  query = "",
  genre = "",
  sortBy = "popularity.desc",
  page = 1,
}: GetMoviesParams = {}): Promise<GetMoviesResponse> {
  const uiPage = Math.max(1, page);
  // TMDB returns 20 items per page. Since we want 10 items per UI page (2 rows x 5 cards):
  const tmdbPage = Math.ceil(uiPage / 2);

  let endpoint = "/discover/movie";
  const params: Record<string, string> = {
    page: tmdbPage.toString(),
  };

  if (query.trim()) {
    endpoint = "/search/movie";
    params.query = query.trim();
  } else {
    if (genre) {
      params.with_genres = genre;
    }
    params.sort_by = sortBy;
    if (sortBy === "vote_average.desc") {
      params["vote_count.gte"] = "100";
    }
  }

  const data = await fetchTMDB<{
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }>(endpoint, params);

  const isFirstHalf = uiPage % 2 === 1;
  const startIdx = isFirstHalf ? 0 : 10;
  const endIdx = isFirstHalf ? 10 : 20;

  const results = (data.results || []).slice(startIdx, endIdx);
  const totalResults = data.total_results || 0;
  const totalPages = Math.min(
    Math.ceil(totalResults / 10),
    (data.total_pages || 1) * 2
  );

  return {
    results,
    page: uiPage,
    totalPages: Math.max(1, totalPages),
    totalResults,
  };
}

export const getTrendingMovies = (
  timeWindow: "day" | "week" = "day"
): Promise<{ results: Movie[] }> =>
  fetchTMDB<{ results: Movie[] }>(`/trending/movie/${timeWindow}`);

export const getNowPlayingMovies = (): Promise<{ results: Movie[] }> =>
  fetchTMDB<{ results: Movie[] }>("/movie/now_playing");

export const getMovieDetails = (id: string): Promise<MovieDetails> =>
  fetchTMDB<MovieDetails>(`/movie/${id}`, {
    append_to_response: "videos,credits",
  });