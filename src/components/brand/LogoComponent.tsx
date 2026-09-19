import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  href?: string;
}

export function LogoComponent({
  className = "",
  size = "md",
  href = "/",
}: LogoProps) {
  const sizeClasses = {
    xs: "w-20",
    sm: "w-24",
    md: "w-32",
    lg: "w-40",
    xl: "w-48",
  };

  const content = (
    <span
      className={cn(
        "inline-flex items-center transition-colors select-none",
        sizeClasses[size],
        className
      )}
    >
      <img
        src="/logo-cineverse.png"
        alt="CineVerse"
        className="h-auto w-full object-contain"
      />
    </span>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 transition-opacity hover:opacity-95"
    >
      {content}
    </Link>
  );
}