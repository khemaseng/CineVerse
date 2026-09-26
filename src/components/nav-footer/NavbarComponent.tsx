"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggleComponent } from "./ThemeToggleComponent";
import { LogoComponent } from "@/components/brand/LogoComponent";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/movies" },
  { label: "Genre", href: "/genre" },
  { label: "Trending", href: "/trending" },
  { label: "About Us", href: "/about" },
  { label: "Explore Premium", href: "/explore-premium" },
];

export function NavbarComponent() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary-gold/10 bg-white/80 backdrop-blur-md transition-colors duration-200 dark:bg-[#041226]/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Brand Logo */}
        <LogoComponent size="xs" />

        {/* Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary-gold ${
                  isActive
                    ? "font-semibold text-primary-gold"
                    : "text-navy-blue/70 dark:text-white/70"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <ThemeToggleComponent />
          <div className="flex items-center gap-2">
            <Link
              href="/auth/register"
              className="rounded-lg bg-primary-gold px-4 py-2 text-sm font-semibold text-navy-blue shadow-md transition-all hover:bg-navy-blue hover:text-primary-gold"
            >
              Get Start
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
