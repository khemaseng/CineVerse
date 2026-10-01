"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggleComponent } from "./ThemeToggleComponent";
import { LogoComponent } from "@/components/brand/LogoComponent";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/movies" },
  { label: "Genre", href: "/genre" },
  { label: "Trending", href: "/trending" },
  { label: "Data Tables", href: "/data-tables" }, // បន្ថែម Tab ថ្មីត្រង់នេះ
  { label: "About Us", href: "/about" },
  { label: "Explore Premium", href: "/explore-premium" },
];

export function NavbarComponent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary-gold/15 bg-white/90 backdrop-blur-md transition-colors duration-200 dark:bg-[#041226]/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <LogoComponent size="xs" />

        <nav className="hidden items-center gap-5 lg:gap-7 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary-gold ${
                  isActive
                    ? "font-semibold text-primary-gold"
                    : "text-navy-blue/80 dark:text-white/80"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggleComponent />
          <Link
            href="/auth/register"
            className="hidden rounded-xl bg-primary-gold px-4 py-2 text-xs font-bold text-navy-blue shadow-md transition-all hover:bg-navy-blue hover:text-primary-gold sm:inline-block"
          >
            Get Started
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle Navigation Menu"
            className="inline-flex items-center justify-center rounded-xl p-2 text-navy-blue transition hover:bg-slate-100 dark:text-white dark:hover:bg-white/10 md:hidden"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-b border-primary-gold/15 bg-white/95 px-4 pt-3 pb-6 shadow-xl backdrop-blur-xl transition-all duration-200 dark:bg-[#041226]/95 md:hidden">
          <nav className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary-gold/15 font-semibold text-primary-gold"
                      : "text-navy-blue/80 hover:bg-slate-100 dark:text-white/80 dark:hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-4">
              <Link
                href="/auth/register"
                className="flex w-full items-center justify-center rounded-xl bg-primary-gold py-2.5 text-sm font-bold text-navy-blue shadow-md transition-all hover:bg-navy-blue hover:text-primary-gold"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
