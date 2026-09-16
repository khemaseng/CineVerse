
"use client";

import Link from "next/link";
import { Film, Globe, Share2, MessageSquare } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Explore",
    links: [
      { href: "/movies", label: "Movies" },
      { href: "/genre", label: "Genre" },
      { href: "/trending", label: "Trending" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/auth/login", label: "Log In" },
      { href: "/auth/register", label: "Sign Up" },
    ],
  },
];

export function FooterComponent() {
  return (
    <footer className="border-t border-border bg-background transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Film className="text-red-600" size={26} />
              <span className="text-lg font-bold text-foreground">
                Cine<span className="text-red-600">Verse</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Discover, explore, and track the movies you love — powered by TMDB.
            </p>
            <div className="mt-4 flex gap-4 text-muted-foreground">
              <Globe
                size={18}
                className="cursor-pointer transition-colors hover:text-red-600 dark:hover:text-amber-400"
              />
              <Share2
                size={18}
                className="cursor-pointer transition-colors hover:text-red-600 dark:hover:text-amber-400"
              />
              <MessageSquare
                size={18}
                className="cursor-pointer transition-colors hover:text-red-600 dark:hover:text-amber-400"
              />
            </div>
          </div>

          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                {section.title}
              </h4>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-red-600 dark:hover:text-amber-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} CineVerse. Movie data provided by TMDB. Not affiliated with TMDB.
        </div>
      </div>
    </footer>
  );
}