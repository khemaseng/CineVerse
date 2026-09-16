
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Sidebar Navigation */}
        <aside className="space-y-2 rounded-xl border border-border/50 bg-card/40 p-4 backdrop-blur-xl">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Dashboard
          </p>
          <nav className="flex flex-col gap-1 pt-2">
            <Link
              href="/dashboard"
              className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-foreground"
            >
              Overview
            </Link>
            <Link
              href="/dashboard/user"
              className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-foreground"
            >
              User Profile
            </Link>
          </nav>
        </aside>

        {/* Main Dashboard Content */}
        <div className="md:col-span-3">{children}</div>
      </div>
    </div>
  );
}