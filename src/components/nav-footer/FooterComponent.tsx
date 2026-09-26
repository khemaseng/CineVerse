"use client";

import Link from "next/link";
import { Globe, Share2, MessageSquare } from "lucide-react";
import { LogoComponent } from "@/components/brand/LogoComponent";

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
    <footer className="border-t border-primary-gold/10 bg-white transition-colors duration-200 dark:bg-[#041226]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand Info */}
          <div>
            <LogoComponent size="md" />
            <p className="mt-3 max-w-xs text-sm text-navy-blue/70 dark:text-white/70">
              Discover, explore, and track the movies you love — powered by
              TMDB.
            </p>
            <div className="mt-4 flex gap-4 text-navy-blue/70 dark:text-white/70">
              <Globe
                size={18}
                className="cursor-pointer transition-colors hover:text-primary-gold dark:hover:text-primary-gold"
              />
              <Share2
                size={18}
                className="cursor-pointer transition-colors hover:text-primary-gold dark:hover:text-primary-gold"
              />
              <MessageSquare
                size={18}
                className="cursor-pointer transition-colors hover:text-primary-gold dark:hover:text-primary-gold"
              />
            </div>
          </div>

          {/* Nav Links */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-navy-blue dark:text-white">
                {section.title}
              </h4>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-navy-blue/70 transition-colors hover:text-primary-gold dark:text-white/70 dark:hover:text-primary-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-primary-gold/10 pt-6 text-center text-xs text-navy-blue/60 dark:text-white/60">
          © {new Date().getFullYear()} CineVerse. Movie data provided by TMDB.
          Not affiliated with TMDB.
        </div>
      </div>
    </footer>
  );
}
