import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, TableProperties } from "lucide-react";

interface Props {
  params: Promise<{ productName: string }>;
}
export const metadata: Metadata = {
  title: {
    template: '%s | Tos Tinh',
    default: 'Tos Tinh'
  },
  keywords: "T-shirts for women",
  description: "Tos Tinh is a modern platform and modern vibe for all costumers.",
  openGraph: {
    title: "Tos Tinh - M2",
    description: "Tos Tinh refers to small retail and online lifestyle or fashion businesses in Phnom Penh, such as Tos Tinh 356 Store and Tos tinh-21, offering modern clothing and products through social media platforms.",
    images: ['/thumbnail.png']
  }
};
export default async function Home({ params }: Props) {
   const resolvedParams = await params;
  const decodedName = decodeURIComponent(resolvedParams?.productName || "");
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 py-12 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Ecommerce Platform with Zod Validation & TanStack Table
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground">
          Discover Premium Products with Seamless Experience
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
          Explore our wide range of products, inspect details, browse through the interactive data table, or register your account with instant validation.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/product"
            className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors gap-2 shadow-sm"
          >
            <ShoppingBag className="h-4 w-4" />
            Browse Products
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/data-tables"
            className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors gap-2 shadow-sm"
          >
            <TableProperties className="h-4 w-4" />
            View Data Table
          </Link>
        </div>
      </section>
    </div>
  );
}
