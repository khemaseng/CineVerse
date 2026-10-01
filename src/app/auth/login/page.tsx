<<<<<<< HEAD
import type { Metadata } from "next";
import { LoginFormComponent } from "@/components/auth/LoginFormComponent";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to CineVerse to access your account.",
=======
import { LoginFormComponent } from "@/components/auth/LoginFormComponent";
import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    template: "%s | CineVerse",
    default: "Login",
  },
  keywords:
    "movies, films, cinema, movie discovery, movie reviews, actors, genres",
  description:
    "CineVerse is a modern movie discovery platform built for people who believe every film has a story worth experiencing. Explore movies from different genres, discover new favorites, and dive deeper into the world of cinema—all in one place.",
  openGraph: {
    title: "CineVerse",
    description:
      "CineVerse brings the world of cinema closer to you. Discover movies, explore stories, find new favorites, and experience the magic behind every film.",
    images: ["/thumbnail.png"],
  },
>>>>>>> 589a24d73879e2aaa7a4c910514de76929b0a8ef
};

export default function LoginPage() {
  return (
<<<<<<< HEAD
    <div className="flex min-h-[calc(100vh-8rem)] w-full items-center justify-center px-4 py-4 sm:py-6">
      <div className="w-full max-w-[420px] rounded-2xl border border-gray-200 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-[#07162c] sm:p-6">
        <div className="mb-4 text-center">
          <h1 className="text-xl font-black tracking-tight text-gray-900 dark:text-white sm:text-2xl">
            Welcome Back
          </h1>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
            Enter your credentials to access your CineVerse account
          </p>
        </div>
        <LoginFormComponent />
      </div>
    </div>
=======
    <main className="flex min-h-screen w-full items-center justify-center bg-muted/20 p-3 sm:p-6 lg:p-10">
      <div className="grid w-full max-w-6xl min-h-[680px] overflow-hidden rounded-3xl border border-border bg-card shadow-2xl lg:grid-cols-12">
        {/* Left Side: Brand Panel with side-of-form card (5 cols on lg) */}
        <div className="relative hidden lg:col-span-5 lg:flex flex-col justify-between overflow-hidden bg-navy-blue p-8 text-white">
          {/* Decorative SVG concentric circles in background */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border-[30px] border-white/5 opacity-80" />
          <div className="pointer-events-none absolute -right-10 -top-10 h-96 w-96 rounded-full border-[40px] border-primary-gold/10 opacity-60" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-primary-gold/5 blur-3xl" />

          {/* Top Logo */}
          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-white/10 p-1.5 backdrop-blur-md transition-transform group-hover:scale-105 border border-white/10">
                <Image
                  src="/logo-cineverse.png"
                  alt="CineVerse Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <span className="text-4xl font-bold tracking-tight text-white">
                Cine<span className="text-primary-gold">Verse</span>
              </span>
            </Link>
          </div>

          {/* Center Featured Movie Card */}
          <div className="relative z-10 my-auto py-6">
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/40 shadow-xl backdrop-blur-md transition-all hover:border-primary-gold/40">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src="/side-of-form.png"
                  alt="CineVerse Cinema"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
              <div className="flex items-center justify-between p-4">
                <div>
                  <h3 className="text-base font-bold text-white">
                    CineVerse Cinema
                  </h3>
                  <p className="text-base text-white/70 mt-0.5">
                    HD Experience • 10,000+ Movies
                  </p>
                </div>
                <div className="rounded-lg bg-primary-gold px-3 py-1 text-base font-extrabold text-navy-blue shadow">
                  8.9/10
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Quote Card */}
          <div className="relative z-10 rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-md">
            <p className="text-base font-medium leading-relaxed text-white/90">
              &ldquo; Every film has a story worth experiencing. Explore
              stories, discover new favorites. &rdquo;
            </p>
            <p className="mt-1.5 text-[18px] font-bold text-primary-gold">
              CineVerse Movie Platform
            </p>
          </div>
        </div>

        {/* Right Side: Form (7 cols on lg) */}
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-7 lg:p-12">
          <div className="mx-auto w-full max-w-md">
            {/* Tag & Heading */}
            <div className="mb-6 text-left">
              <div className="inline-flex items-center gap-1.5 text-base font-bold text-primary-gold">
                <span className="text-lg leading-none">•</span>
                <span>CineVerse</span>
              </div>
              <h1 className="mt-1 text-4xl font-bold tracking-tight text-foreground sm:text-3xl">
                Welcome Back
              </h1>
              <p className="mt-1.5 text-base text-muted-foreground sm:text-lg">
                Sign in to your CineVerse account to continue
              </p>
            </div>

            {/* Login Form */}
            <LoginFormComponent />
          </div>
        </div>
      </div>
    </main>
>>>>>>> 589a24d73879e2aaa7a4c910514de76929b0a8ef
  );
}
