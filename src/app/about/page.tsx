"use client";

import Image from "next/image";
import { Send, Mail } from "lucide-react";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

export default function AboutUs() {
  const team = [
    {
      name: "Seng SilKhema",
      role: "FRONTEND",
      blurb: "Leads product vision and long-term strategy for CineVerse.",
      image: "/khema.png",
      telegram: "#",
      github: "#",
      email: "mailto:example@gmail.com",
    },
    {
      name: "Mom Lisa",
      role: "FRONTEND",
      blurb:
        "Builds the systems that keep ticket transactions fast and secure.",
      image: "/lisa.png",
      telegram: "#",
      github: "#",
      email: "mailto:example@gmail.com",
    },
    {
      name: "Vat Laihoun",
      role: "FRONTEND",
      blurb: "Makes sure every buyer and seller has a smooth experience.",
      image: "/laihoun.png",
      telegram: "#",
      github: "#",
      email: "mailto:example@gmail.com",
    },
    {
      name: "Pharoth Chhun",
      role: "FRONTEND",
      blurb: "Designs a simple, trustworthy marketplace experience.",
      image: "/roth.png",
      telegram: "#",
      github: "#",
      email: "mailto:example@gmail.com",
    },
    {
      name: "HEANH CHANRAKSMEY",
      role: "FRONTEND",
      blurb: "Connects CineVerse with theaters and movie communities.",
      image: "/raksmey.png",
      telegram: "#",
      github: "#",
      email: "mailto:example@gmail.com",
    },
    {
      name: "Thong prominea",
      role: "FRONTEND",
      blurb: "Keeps listings verified and transactions fraud-free.",
      image: "/promnea.png",
      telegram: "#",
      github: "#",
      email: "mailto:example@gmail.com",
    },
  ];

  const testimonials = [
    {
      name: "Laihoun V.",
      role: "Frequent Buyer",
      quote: "Found a last-minute ticket to a sold-out premiere in minutes.",
    },
    {
      name: "Khema S.",
      role: "Ticket Seller",
      quote: "Listed my extra tickets and got paid within the hour.",
    },
    {
      name: "Lisa M.",
      role: "Movie Club Lead",
      quote: "Our group uses CineVerse every week to swap tickets.",
    },
  ];

  const partners = [
    "Cloudly",
    "Software",
    "Camera",
    "Startup",
    "Natural",
    "Techlify",
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-[#0B132A] text-gray-900 dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <section className="text-center px-6 pt-16 pb-12 max-w-4xl mx-auto">
        <p className="text-amber-500 font-semibold tracking-wider text-xs md:text-sm uppercase mb-3">
          ABOUT CINEVERSE
        </p>
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 text-gray-900 dark:text-white">
          <span className="text-amber-500">Hello Everyone</span> Movie Tickets
          with Confidence
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-8">
          CineVerse connects movie fans who have tickets to spare with fans who
          need one - fast, secure, and hassle-free.
        </p>
        <button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors">
          List or Find a Trending
        </button>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 text-center">
          <div className="bg-white dark:bg-[#111C35] border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm transition-colors">
            <p className="text-xs text-amber-500 font-medium mb-1">
              Trusted By
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              10,000 users
            </p>
          </div>
          <div className="bg-white dark:bg-[#111C35] border border-amber-500 rounded-xl p-5 shadow-md">
            <p className="text-xs text-amber-500 font-medium mb-1">
              Tickets Traded
            </p>
            <p className="text-xl font-bold text-amber-500">25,000+</p>
          </div>
          <div className="bg-white dark:bg-[#111C35] border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm transition-colors">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">
              Satisfaction
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              98%
            </p>
          </div>
        </div>
      </section>

      {/* Our Partners */}
      <section className="px-6 py-12 border-t border-gray-200 dark:border-gray-800/60 max-w-5xl mx-auto">
        <p className="text-amber-500 font-semibold text-center text-xs tracking-wider uppercase mb-2">
          COLLABORATION
        </p>
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Our Partners
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {partners.map((p) => (
            <div
              key={p}
              className="bg-white dark:bg-[#111C35] border border-gray-200 dark:border-gray-800 hover:border-amber-500/40 rounded-xl py-4 text-center text-gray-700 dark:text-gray-300 font-medium text-sm shadow-sm transition-all hover:text-amber-500"
            >
              {p}
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="px-6 py-12 border-t border-gray-200 dark:border-gray-800/60 max-w-3xl mx-auto text-center">
        <p className="text-amber-500 font-semibold text-xs tracking-wider uppercase mb-2">
          WHO WE ARE
        </p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Our Story
        </h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
          CineVerse started with a simple frustration: unused tickets going to
          waste while other fans missed sold-out shows. We built a marketplace
          where movie lovers can buy and sell tickets directly, safely, and
          without the markup of scalpers.
        </p>
      </section>

      {/* Meet Our Team */}
      <section className="px-6 py-16 border-t border-gray-200 dark:border-gray-800/60 max-w-6xl mx-auto">
        <p className="text-amber-500 font-semibold text-center text-xs tracking-wider uppercase mb-2">
          THE TEAM
        </p>
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">
          Meet Our Team
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-12 text-sm max-w-md mx-auto">
          The people building a fair, simple way to trade movie tickets.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {team.map((m) => (
            <div
              key={m.name}
              className="bg-white dark:bg-[#111C35] border border-gray-200 dark:border-gray-800 hover:border-amber-500/50 rounded-2xl p-6 flex flex-col items-center shadow-sm transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-amber-500/30 mb-4 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                {m.image ? (
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="text-xl font-bold text-amber-500">
                    {m.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-gray-900 dark:text-white text-center mb-1">
                {m.name}
              </h3>

              <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-semibold tracking-wider px-3 py-0.5 rounded-full uppercase mb-3">
                {m.role}
              </span>

              <p className="text-xs text-gray-600 dark:text-gray-400 text-center mb-5 line-clamp-2">
                {m.blurb}
              </p>

              {/* Social Action Buttons */}
              <div className="flex items-center space-x-3 mt-auto">
                <a
                  href={m.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-amber-500 hover:text-black text-amber-500 flex items-center justify-center transition-colors"
                  aria-label="Telegram"
                >
                  <Send className="w-3.5 h-3.5" />
                </a>
                <a
                  href={m.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-amber-500 hover:text-black text-amber-500 flex items-center justify-center transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href={m.email}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-amber-500 hover:text-black text-amber-500 flex items-center justify-center transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16 border-t border-gray-200 dark:border-gray-800/60 max-w-5xl mx-auto pb-24">
        <p className="text-amber-500 font-semibold text-center text-xs tracking-wider uppercase mb-2">
          FEEDBACK
        </p>
        <h2 className="text-2xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white dark:bg-[#111C35] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm transition-colors"
            >
              <span className="text-amber-500 text-3xl font-serif block mb-2">
                “
              </span>
              <p className="text-xs text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {t.quote}
              </p>
              <p className="font-semibold text-sm text-gray-900 dark:text-white">
                {t.name}
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                {t.role}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
