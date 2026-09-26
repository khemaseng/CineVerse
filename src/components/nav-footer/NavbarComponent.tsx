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
  { label: "About Us", href: "/about" },
  { label: "Explore Premium", href: "/explore-premium" },
];

export function NavbarComponent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary-gold/10 bg-white/90 backdrop-blur-md transition-colors duration-200 dark:bg-[#041226]/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <LogoComponent size="xs" />

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
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

        {/* Right Actions: Theme Toggle + Auth Button + Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <ThemeToggleComponent />

          {/* Desktop "Get Started" Button */}
          <Link
            href="/auth/register"
            className="hidden rounded-lg bg-primary-gold px-4 py-2 text-xs font-semibold text-navy-blue shadow-md transition-all hover:bg-navy-blue hover:text-primary-gold sm:inline-block"
          >
            Get Start
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="inline-flex items-center justify-center rounded-lg p-2 text-navy-blue transition hover:bg-gray-100 dark:text-white dark:hover:bg-white/10 md:hidden"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Responsive Dropdown Drawer */}
      {isMobileMenuOpen && (
        <div className="border-b border-primary-gold/15 bg-white/95 px-4 pt-3 pb-6 shadow-xl backdrop-blur-lg transition-all duration-200 dark:bg-[#041226]/95 md:hidden">
          <nav className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary-gold/15 font-semibold text-primary-gold"
                      : "text-navy-blue/80 hover:bg-gray-100 dark:text-white/80 dark:hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Mobile Auth Button */}
            <div className="pt-4">
              <Link
                href="/auth/register"
                className="flex w-full items-center justify-center rounded-lg bg-primary-gold py-2.5 text-sm font-semibold text-navy-blue shadow-md transition-all hover:bg-navy-blue hover:text-primary-gold"
              >
                Get Start
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
