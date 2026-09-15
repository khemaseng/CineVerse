
import Link from "next/link"

export function FooterComponent() {
  return (
    <footer className="border-t border-border bg-muted/30 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Description */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl tracking-tight">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black text-sm">
                <img className="rounded-lg" src="/tos-tinh.jpg" alt="" />
              </span>
              <span>Tos Tinh</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Your one-stop destination for quality products with seamless shopping, verified customer ratings, and responsive customer care.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/product" className="hover:text-foreground transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/data-tables" className="hover:text-foreground transition-colors">
                  Data Table
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-foreground transition-colors">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Contact */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">
              Account & Support
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/auth/login" className="hover:text-foreground transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="hover:text-foreground transition-colors">
                  Register Account
                </Link>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  Email: support@tostinh.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & policies */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© Copyright {new Date().getFullYear()} Tos Tinh. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}