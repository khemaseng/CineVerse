import type { Metadata } from "next";
import { Film, Heart, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "About CineVerse",
  description: "Learn about CineVerse, a place to discover and explore movies.",
};

const values = [
  {
    title: "Discover",
    description: "Find popular titles and hidden gems across every genre.",
    icon: Search,
  },
  {
    title: "Explore",
    description:
      "Learn about stories, casts, ratings, and trailers in one place.",
    icon: Film,
  },
  {
    title: "Enjoy",
    description: "Build a personal connection with the movies you love.",
    icon: Heart,
  },
];

export default function AboutPage() {
  return (
    <main className="page-container">
      <header className="page-heading max-w-3xl">
        <p className="!mt-0 mb-2 text-lg font-semibold text-primary-gold">
          About CineVerse
        </p>
        <h1 className="font-bold text-foreground">
          Every film has a story worth experiencing.
        </h1>
        <p>
          CineVerse helps movie fans discover what to watch next, explore the
          details behind each film, and keep their favorite stories close.
        </p>
      </header>
      <section
        aria-label="What you can do with CineVerse"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {values.map(({ title, description, icon: Icon }) => (
          <article
            key={title}
            className="rounded-2xl border border-border bg-card p-5 sm:p-6"
          >
            <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-gold/10 text-primary-gold">
              <Icon size={21} />
            </span>
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            <p className="mt-2 text-lg text-muted-foreground">{description}</p>
          </article>
        ))}
      </section>
      <p className="mt-8 text-base text-muted-foreground">
        Movie information and images are provided by TMDB. CineVerse is not
        affiliated with TMDB.
      </p>
    </main>
  );
}
