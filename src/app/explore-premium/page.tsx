import type { Metadata } from "next";
import { ExplorePremiumComponent } from "@/components/premium/ExplorePremiumComponent";

export const metadata: Metadata = {
  title: "Explore Premium | CineVerse",
  description: "Choose the plan that fits your account and unlock a better movie experience with CineVerse Premium.",
};

export default function ExplorePremiumPage() {
  return <ExplorePremiumComponent />;
}
