import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const category = searchParams.get("category") || "popular";

  const TMDB_BASE_URL = "https://api.themoviedb.org/3";
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const endpoint = query
    ? `${TMDB_BASE_URL}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`
    : `${TMDB_BASE_URL}/movie/${category}?api_key=${apiKey}`;

  try {
    const res = await fetch(endpoint);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}