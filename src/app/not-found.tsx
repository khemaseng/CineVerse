import Image from "next/image";
import Link from "next/link";
import { Film, House, Search } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-[#050914] text-white">
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <Image
          src="/side-of-form.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-35 grayscale"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#050914_3%,rgba(5,9,20,.94)_38%,rgba(5,9,20,.52)_75%,rgba(5,9,20,.72)),linear-gradient(0deg,#050914_0%,transparent_45%,rgba(5,9,20,.3))]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-36 bg-[radial-gradient(ellipse_at_50%_100%,rgba(243,168,18,.2),transparent_70%)]"
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:px-10 lg:py-20">
        <section className="relative z-10 max-w-2xl lg:col-span-7">
          <p className="mb-2 text-base font-bold uppercase tracking-[0.55em] text-primary-gold sm:text-lg">
            Oops!
          </p>
          <div className="relative mb-2 w-fit">
            <h1
              aria-label="404"
              className="select-none text-[clamp(9rem,27vw,19rem)] font-extrabold leading-[0.82] tracking-[-0.09em] text-white drop-shadow-[0_12px_28px_rgba(0,0,0,.6)]"
            >
              404
            </h1>
            <span
              aria-hidden="true"
              className="absolute left-[35%] top-[8%] flex h-[58%] w-[28%] rotate-[-12deg] items-center justify-center rounded-full border-[clamp(5px,1vw,12px)] border-primary-gold bg-[#0a101b] shadow-[0_0_35px_rgba(243,168,18,.45)]"
            >
              <span className="absolute inset-[11%] rounded-full border-2 border-white/40" />
              <Film
                className="h-[53%] w-[53%] text-primary-gold"
                strokeWidth={1.2}
              />
            </span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Page <span className="text-primary-gold">Not Found</span>
          </h2>
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-base">
            The page you’re looking for might have been moved, deleted, or never
            existed.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-primary-gold px-7 text-lg font-semibold text-[#09101c] shadow-[0_8px_28px_rgba(243,168,18,.22)] transition hover:bg-amber-300"
            >
              <House size={18} fill="currentColor" />
              Go to Home
            </Link>
            <Link
              href="/movies"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-slate-400/50 bg-slate-950/35 px-7 text-lg font-semibold text-white transition hover:border-primary-gold hover:text-primary-gold"
            >
              <Search size={18} />
              Search Movies
            </Link>
          </div>
        </section>
        <div aria-hidden="true" className="hidden lg:col-span-5 lg:block" />
      </div>
    </main>
  );
}
