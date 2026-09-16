"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Film } from "lucide-react";
import { ThemeToggleComponent } from "./ThemeToggleComponent";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/movies" },
  { label: "Genre", href: "/genre" },
  { label: "Trending", href: "/trending" },
  { label: "About Us", href: "/about" },
];

export function NavbarComponent() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Film className="text-primary-red" size={28} />
          <span className="text-xl font-bold tracking-tight text-foreground">
            Cine<span className="text-primary-red">Verse</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary-red ${
                  isActive ? "text-primary-red font-semibold" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggleComponent />
          <div className="flex items-center gap-2">
            <Link
              href="/auth/login"
              className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary-red transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/auth/register"
              className="rounded-lg bg-primary-red px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-primary-dark transition-all"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}