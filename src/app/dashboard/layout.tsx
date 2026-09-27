import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page-container">
      <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-4 md:gap-8">
        {/* Sidebar Navigation */}
        <aside className="space-y-2 rounded-xl border border-border/50 bg-card/40 p-4 backdrop-blur-xl">
          <p className="px-3 text-base font-semibold uppercase tracking-wider text-muted-foreground">
            Dashboard
          </p>
          <nav className="flex flex-row gap-1 overflow-x-auto pt-2 md:flex-col">
            <Link
              href="/dashboard"
              className="rounded-lg px-3 py-2 text-lg font-medium transition-colors hover:bg-accent hover:text-foreground"
            >
              Overview
            </Link>
            <Link
              href="/dashboard/user"
              className="rounded-lg px-3 py-2 text-lg font-medium transition-colors hover:bg-accent hover:text-foreground"
            >
              User Profile
            </Link>
          </nav>
        </aside>

        {/* Main Dashboard Content */}
        <div className="min-w-0 md:col-span-3">{children}</div>
      </div>
    </div>
  );
}
