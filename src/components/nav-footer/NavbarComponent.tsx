
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LogOut, User } from "lucide-react"
import { toast } from "sonner"

export function NavbarComponent() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = React.useState<{ username?: string; email?: string } | null>(null)

  React.useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch {
      setUser(null)
    }
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("user")
    setUser(null)
    toast.success("Logged out successfully")
    router.push("/auth/login")
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/product", label: "Products" },
    { href: "/data-tables", label: "Data Table" },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-border bg-background/85 py-2.5 px-4 shadow-sm backdrop-blur-md md:top-4 md:rounded-2xl lg:max-w-screen-lg">
      <div className="flex items-center justify-between gap-4">
        {/* Brand logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight"> 
       <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black text-sm"> 
          <img className="rounded-lg" src="/tos-tinh.jpg" alt="Tos Tinh Logo" /> 
        </span> 
        <span className="hidden sm:inline-block">Tos Tinh</span> 
        </Link>


        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-2.5 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-muted text-foreground font-semibold"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Auth / Action zone */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden md:flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <User className="h-3.5 w-3.5" />
                {user.username || user.email}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors"
                title="Log out"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/auth/register"
                className="hidden sm:inline-flex items-center justify-center rounded-lg border border-border px-3 py-1.5 text-xs sm:text-sm font-medium hover:bg-muted transition-colors"
              >
                Sign up
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-3 py-1.5 text-xs sm:text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

// Backward compatibility alias
export const NavbarComponet = NavbarComponent