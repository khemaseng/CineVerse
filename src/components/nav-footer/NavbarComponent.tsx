"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut, Menu, UserRound, X } from "lucide-react";
import { getCurrentUser, logoutUser } from "@/lib/auth/auth-service";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authMenuOpen, setAuthMenuOpen] = useState(false);
  const sessionSnapshot = useSyncExternalStore(
    (onChange) => {
      window.addEventListener("storage", onChange);
      window.addEventListener("cineverse-auth-change", onChange);
      return () => {
        window.removeEventListener("storage", onChange);
        window.removeEventListener("cineverse-auth-change", onChange);
      };
    },
    () => JSON.stringify({
      user: getCurrentUser(),
      avatarUrl: window.localStorage.getItem("cineverse-demo-avatar"),
    }),
    () => "null",
  );
  const { user: currentUser, avatarUrl } = JSON.parse(sessionSnapshot) as {
    user: ReturnType<typeof getCurrentUser>;
    avatarUrl: string | null;
  };
  const router = useRouter();

  if (pathname?.startsWith("/auth") || pathname === "/login" || pathname === "/signup") {
    return null;
  }

  const handleLogout = () => {
    logoutUser();
    setAuthMenuOpen(false);
    setMobileMenuOpen(false);
    window.dispatchEvent(new Event("cineverse-auth-change"));
    router.push("/");
  };

  const closeMenus = () => {
    setAuthMenuOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary-gold/10 bg-white/80 backdrop-blur-md transition-colors duration-200 dark:bg-[#041226]/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <LogoComponent size="xs" />

        <nav aria-label="Main navigation" className="hidden items-center gap-5 lg:flex xl:gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`whitespace-nowrap text-lg font-medium transition-colors hover:text-primary-gold ${isActive ? "font-semibold text-primary-gold" : "text-navy-blue/80 dark:text-white/80"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <ThemeToggleComponent />
          <div className="relative hidden sm:block">
            <button
              type="button"
              aria-expanded={authMenuOpen}
              aria-controls="desktop-auth-menu"
              onClick={() => setAuthMenuOpen((open) => !open)}
              className={currentUser ? "flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-primary-gold bg-primary-gold text-sm font-bold text-navy-blue shadow-md" : "rounded-lg bg-primary-gold px-4 py-2 text-lg font-semibold text-navy-blue shadow-md transition-colors hover:bg-amber-300"}
              aria-label={currentUser ? "Open account menu" : "Get Started"}
            >
              {currentUser ? (avatarUrl ? <Image src={avatarUrl} alt="" width={40} height={40} unoptimized className="h-full w-full object-cover" /> : <span>{currentUser.name.trim().split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase()}</span>) : "Get Started"}
            </button>
            {authMenuOpen && (
              <div id="desktop-auth-menu" className="absolute right-0 top-full z-50 mt-2 grid min-w-44 gap-1 rounded-xl border-0 bg-white p-2 text-navy-blue shadow-xl dark:bg-[#0b1b32] dark:text-white">
                {currentUser ? (
                  <>
                    <div className="px-3 py-2">
                      <p className="truncate text-sm font-semibold text-navy-blue dark:text-white">{currentUser.name}</p>
                      <p className="truncate text-xs text-navy-blue/70 dark:text-white/70">{currentUser.email}</p>
                    </div>
                    <Link href="/dashboard/user" onClick={closeMenus} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-navy-blue hover:bg-slate-100 dark:text-white dark:hover:bg-white/10"><UserRound size={16} /> Profile</Link>
                    <button type="button" onClick={handleLogout} className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-navy-blue hover:bg-slate-100 dark:text-white dark:hover:bg-white/10"><LogOut size={16} /> Log out</button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" onClick={closeMenus} className="rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted">Log In</Link>
                    <Link href="/auth/register" onClick={closeMenus} className="rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted">Sign Up</Link>
                  </>
                )}
              </div>
            )}
          </div>
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => {
              setMobileMenuOpen((open) => !open);
              setAuthMenuOpen(false);
            }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav aria-label="Mobile navigation" className="border-t border-border bg-background px-4 py-3 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-1 sm:grid-cols-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenus}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-lg px-3 py-2.5 text-lg font-medium transition-colors hover:bg-muted ${isActive ? "bg-muted text-primary-gold" : "text-foreground"}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="sm:hidden">
              <button
                type="button"
                aria-expanded={authMenuOpen}
                aria-controls="mobile-auth-menu"
                onClick={() => setAuthMenuOpen((open) => !open)}
                className="w-full rounded-lg px-3 py-2.5 text-left text-lg font-semibold text-primary-gold hover:bg-muted"
              >
                {currentUser ? `Account · ${currentUser.name}` : "Get Started"}
              </button>
              {authMenuOpen && (
                <div id="mobile-auth-menu" className="ml-3 grid gap-1 border-l border-border pl-3">
                  {currentUser ? (
                    <>
                      <Link href="/dashboard/user" onClick={closeMenus} className="rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted">Profile</Link>
                      <button type="button" onClick={handleLogout} className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-navy-blue hover:bg-slate-100 dark:text-white dark:hover:bg-white/10"><LogOut size={15} /> Log out</button>
                    </>
                  ) : (
                    <>
                      <Link href="/auth/login" onClick={closeMenus} className="rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted">Log In</Link>
                      <Link href="/auth/register" onClick={closeMenus} className="rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted">Sign Up</Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
