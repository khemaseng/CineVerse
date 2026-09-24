"use client";

import Link from "next/link";
import { Bookmark, Heart, Star, Clock, Film, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Watchlist",
      value: "12",
      description: "Movies saved for later",
      icon: Bookmark,
    },
    {
      title: "Favorites",
      value: "8",
      description: "Liked titles",
      icon: Heart,
    },
    {
      title: "Reviews",
      value: "3",
      description: "Written reviews",
      icon: Star,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      title: "Inception",
      category: "Sci-Fi",
      rating: "8.8",
      time: "2 hours ago",
      status: "Added to Watchlist",
    },
    {
      id: 2,
      title: "The Dark Knight",
      category: "Action",
      rating: "9.0",
      time: "Yesterday",
      status: "Liked",
    },
    {
      id: 3,
      title: "Interstellar",
      category: "Sci-Fi",
      rating: "8.6",
      time: "3 days ago",
      status: "Reviewed (5/5)",
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Dashboard Overview
          </h1>
          <p className="text-sm text-muted-foreground">
            Welcome back to CineVerse. Here is a summary of your activity.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/movies"
            className="flex items-center justify-center gap-2 rounded-lg bg-primary-red px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Film size={14} />
            Browse Movies
          </Link>
          <Link
            href="/dashboard/user"
            className="flex items-center justify-center rounded-lg border border-border bg-background/50 px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-accent"
          >
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl border border-border/50 bg-card/40 p-5 backdrop-blur-xl"
            >
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-[11px] text-muted-foreground/80">
                  {stat.description}
                </p>
              </div>
              <div className="rounded-lg bg-primary-red/10 p-3 text-primary-red">
                <Icon size={22} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Activity & Recommendations */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Recent Activity Section */}
        <div className="space-y-4 rounded-xl border border-border/50 bg-card/40 p-6 backdrop-blur-xl lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">
              Recent Activity
            </h2>
            <Link
              href="/movies"
              className="flex items-center gap-1 text-xs font-semibold text-primary-red hover:underline"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>

          <div className="divide-y divide-border/40">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-3.5 first:pt-1 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground">
                    <Film size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground">
                      {item.title}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {item.category} • {item.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock size={12} />
                  <span>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links / Watch Status Card */}
        <div className="flex flex-col justify-between rounded-xl border border-border/50 bg-card/40 p-6 backdrop-blur-xl space-y-6">
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">
              Continue Exploring
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Find new trending releases or manage your custom watch lists across devices.
            </p>
          </div>

          <div className="space-y-2">
            <Link
              href="/trending"
              className="flex w-full items-center justify-between rounded-lg border border-border bg-background/50 px-4 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
            >
              <span>Explore Trending Movies</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/genre"
              className="flex w-full items-center justify-between rounded-lg border border-border bg-background/50 px-4 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
            >
              <span>Browse by Category</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}