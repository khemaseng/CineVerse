
import React from 'react'
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: {
    template: "%s | CineVerse",
    default: "Genre",
  },
  keywords: "movies, films, cinema, movie discovery, movie reviews, actors, genres",
  description:
    "CineVerse is a modern movie discovery platform built for people who believe every film has a story worth experiencing. Explore movies from different genres, discover new favorites, and dive deeper into the world of cinema—all in one place.",
  openGraph: {
    title: "CineVerse",
    description:
      "CineVerse brings the world of cinema closer to you. Discover movies, explore stories, find new favorites, and experience the magic behind every film.",
    images: ["/thumbnail.png"],
  },
};
export default function GenrePage() {
  return (
    <div>page</div>
  )
}
