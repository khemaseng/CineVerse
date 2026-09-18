// app/product/page.tsx
import { Metadata } from "next";
import GenreListComponent from "@/components/genre/GenreListComponent";

const res = await fetch("https://api.themoviedb.org/3", {
  headers: {
    "User-Agent": "Mozilla/5.0 (compatible; MyApp/1.0)",
  },
  cache: "no-store",
});
export const metadata: Metadata = {
  title: "Movies", // This hooks cleanly into layout %s templates
  description: "Tos Tinh is a modern platform and modern vibe for all customers.",
};

export default function ProductPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Our Products</h1>
        <p className="text-muted-foreground text-base max-w-xl mx-auto">
          Explore our collection of top-rated items with competitive pricing and fast delivery.
        </p>
      </div>
      <GenreListComponent />
    </div>
  );
}
