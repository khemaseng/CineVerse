import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const category = searchParams.get("category") || "popular";
  const timeWindow = searchParams.get("timeWindow") === "week" ? "week" : "day";

  const TMDB_BASE_URL = "https://api.themoviedb.org/3";
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const path = query
    ? "/search/movie"
    : category === "trending"
      ? `/trending/movie/${timeWindow}`
      : `/movie/${category}`;
  const endpoint = new URL(`${TMDB_BASE_URL}${path}`);
  endpoint.searchParams.set("api_key", apiKey || "");
  if (query) endpoint.searchParams.set("query", query);

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch movies" }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
