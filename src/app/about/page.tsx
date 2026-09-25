"use client";

import Image from "next/image";
import { Send, Mail } from "lucide-react";

export default function AboutUs() {
  const team = [
    {
      name: "Seng SilKhema",
      role: "FRONTEND",
      tag: "UX/UI",
      blurb: "Leads product vision and long-term strategy for CineVerse.",
      image: "/Seng SilKhema.jpg",
      telegram: "#",
      github: "#",
      email: "mailto:example@gmail.com",
    },
    {
      name: "Mom Lisa",
      role: "FRONTEND",
      tag: "UX/UI",
      blurb: "Builds the systems that keep ticket transactions fast and secure.",
      image: "/lisa.jpg",
      telegram: "#",
      github: "#",
      email: "mailto:example@gmail.com",
    },
    {
      name: "Vat Laihoun",
      role: "FRONTEND",
      tag: "CS",
      blurb: "Makes sure every buyer and seller has a smooth experience.",
      image: "/Laihoun.jpg",
      telegram: "#",
      github: "#",
      email: "mailto:example@gmail.com",
    },
    {
      name: "Pharoth Chhun",
      role: "FRONTEND",
      tag: "DES",
      blurb: "Designs a simple, trustworthy marketplace experience.",
      image: "",
      telegram: "#",
      github: "#",
      email: "mailto:example@gmail.com",
    },
    {
      name: "HEANH CHANRAKSMEY",
      role: "FRONTEND",
      tag: "GRW",
      blurb: "Connects CineVerse with theaters and movie communities.",
      image: "/HEANH CHANRAKSMEY.jpg",
      telegram: "#",
      github: "#",
      email: "mailto:example@gmail.com",
    },
    {
      name: "Thong prominea",
      role: "FRONTEND",
      tag: "T&S",
      blurb: "Keeps listings verified and transactions fraud-free.",
      image: "/Promnea.jpg",
      telegram: "#",
      github: "#",
      email: "mailto:example@gmail.com",
    },
  ];

  const testimonials = [
    { name: "Laihoun V.", role: "Frequent Buyer", quote: "Found a last-minute ticket to a sold-out premiere in minutes." },
    { name: "Khema S.", role: "Ticket Seller", quote: "Listed my extra tickets and got paid within the hour." },
    { name: "Lisa M.", role: "Movie Club Lead", quote: "Our group uses CineVerse every week to swap tickets." },
  ];

  const partners = ["Cloudly", "Software", "Camera", "Startup", "Natural", "Techlify"];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#0a2541] text-black dark:text-white transition-colors">
      {/* Hero */}
      <section className="text-center px-6 py-20 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          <span className="text-orange-500">Hello Everyone </span> Movie
          Tickets with Confidence
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          CineVerse connects movie fans who have tickets
          to spare with fans who need one - fast, secure, and hassle-free.
        </p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-medium mt-4 transition-colors">
          List or Find a Trending
        </button>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-14 text-left">
          <div className="bg-orange-50 border border-orange-200 dark:bg-gray-800 dark:border-gray-700 rounded-xl p-4">
            <p className="text-xs text-orange-700 dark:text-orange-400">Trusted By</p>
            <p className="font-semibold text-black dark:text-white">10,000 users</p>
          </div>
          <div className="bg-orange-500 text-white border border-orange-400 rounded-xl p-4">
            <p className="text-xs text-orange-100 mb-1">Tickets Traded</p>
            <p className="font-semibold text-white">25,000+</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 dark:bg-gray-800 dark:border-gray-700 rounded-xl p-4">
            <p className="text-xs text-black dark:text-gray-300 mb-1">Satisfaction</p>
            <p className="font-semibold text-black dark:text-white">98%</p>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="px-6 py-14 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-semibold mb-5 text-center">Our Partners</h2>
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {partners.map((p) => (
            <div
              key={p}
              className="bg-orange-50 dark:bg-gray-800 border border-orange-200 dark:border-gray-700 rounded-xl px-8 py-5 text-center text-black dark:text-white font-medium"
            >
              {p}
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="px-5 py-10 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold">Our Story</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            CineVerse started with a simple frustration: unused tickets going
            to waste while other fans missed sold-out shows. We built a
            marketplace where movie lovers can buy and sell tickets directly,
            safely, and without the markup of scalpers.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 py-16 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-center mb-2">Meet Our Team</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-12 max-w-xl mx-auto text-sm">
          The people building a fair, simple way to trade movie tickets.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {team.map((m) => (
            <div
              key={m.name}
              className="relative bg-white dark:bg-gray-800 rounded-[32px] p-6 border-[2.5px] border-orange-600/80 shadow-sm flex flex-col items-center overflow-hidden"
            >
              {/* Top-Left Accent Lines & Dot */}
              <div className="absolute top-5 left-5 flex items-center gap-1.5 z-10">
                <div className="w-8 h-[2.5px] bg-orange-600 rounded-full" />
                <div className="w-3.5 h-3.5 bg-orange-600 rounded-full" />
              </div>

              {/* Top-Right Accent Dot */}
              <div className="absolute top-5 right-9 z-10">
                <div className="w-3.5 h-3.5 bg-orange-600 rounded-full" />
              </div>

              {/* Bottom-Left Accent Line */}
              <div className="absolute bottom-20 left-5 w-[2.5px] h-12 bg-orange-600 rounded-full" />

              {/* Circular Avatar */}
              <div className="relative w-44 h-44 rounded-full overflow-hidden border-2 border-gray-100 dark:border-gray-700 mt-6 mb-3 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                {m.image ? (
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="text-2xl font-bold text-orange-600">
                    {m.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                )}
              </div>

              {/* Member Name */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2 text-center leading-snug">
                {m.name}
              </h3>

              {/* Role Badge */}
              <div className="mt-3 bg-orange-600 text-white font-bold text-xs tracking-wider px-7 py-2 rounded-full uppercase shadow-sm">
                {m.role}
              </div>

              {/* Social Action Buttons */}
              <div className="flex items-center space-x-3 mt-6 mb-2 z-10">
                <a
                  href={m.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-100 dark:bg-gray-700 flex items-center justify-center text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Telegram"
                >
                  <Send className="w-4 h-4 -translate-x-[1px] translate-y-[1px]" />
                </a>
                <a
                  href={m.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-100 dark:bg-gray-700 flex items-center justify-center text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-600 transition-colors"
                  aria-label="GitHub"
                >
                  <div className="w-4 h-4" />
                </a>
                <a
                  href={m.email}
                  className="w-10 h-10 rounded-full bg-slate-100 dark:bg-gray-700 flex items-center justify-center text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-center mb-10">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-orange-50 dark:bg-gray-800 border border-orange-200 dark:border-gray-700 rounded-xl p-6"
            >
              <p className="text-orange-600 dark:text-orange-400 text-2xl mb-2">"</p>
              <p className="text-sm text-gray-800 dark:text-gray-200 mb-4">{t.quote}</p>
              <p className="font-semibold text-sm text-black dark:text-white">{t.name}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{t.role}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}





