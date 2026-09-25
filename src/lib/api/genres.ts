export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export const genres: Genre[] = [
  { id: 28, name: "Action", slug: "action" },
  { id: 12, name: "Adventure", slug: "adventure" },
  { id: 16, name: "Animation", slug: "animation" },
  { id: 35, name: "Comedy", slug: "comedy" },
  { id: 80, name: "Crime", slug: "crime" },
  { id: 99, name: "Documentary", slug: "documentary" },
  { id: 18, name: "Drama", slug: "drama" },
  { id: 10751, name: "Family", slug: "family" },
  { id: 14, name: "Fantasy", slug: "fantasy" },
  { id: 36, name: "History", slug: "history" },
  { id: 27, name: "Horror", slug: "horror" },
  { id: 10402, name: "Music", slug: "music" },
  { id: 9648, name: "Mystery", slug: "mystery" },
  { id: 10749, name: "Romance", slug: "romance" },
  { id: 878, name: "Science Fiction", slug: "science-fiction" },
  { id: 10770, name: "TV Movie", slug: "tv-movie" },
  { id: 53, name: "Thriller", slug: "thriller" },
  { id: 10752, name: "War", slug: "war" },
  { id: 37, name: "Western", slug: "western" },
];

export function getGenreBySlug(slug: string): Genre | undefined {
  const normalized = slug.toLowerCase().replace(/[\s_]+/g, "-");
  return genres.find(
    (g) =>
      g.slug === normalized ||
      g.name.toLowerCase() === decodeURIComponent(slug).toLowerCase()
  );
}

export function getGenreById(id: number): Genre | undefined {
  return genres.find((g) => g.id === id);
}