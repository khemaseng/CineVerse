import type { Metadata } from "next";
import Link from "next/link";
import { LoginFormComponent } from "@/components/auth/LoginFormComponent";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Log In | CineVerse",
  description: "Log in to your CineVerse account to enjoy premium movies.",
};

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#f4f6fa] dark:bg-[#041226] text-navy-blue dark:text-white">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-[#08192d] p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight">Welcome Back</h2>
          <p className="text-sm text-navy-blue/70 dark:text-slate-400">
            Log in to continue your movie experience on <span className="text-primary-gold font-bold">CineVerse</span>.
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-4 text-xs">Loading login form...</div>}>
          <LoginFormComponent />
        </Suspense>

        <div className="text-center text-xs text-navy-blue/70 dark:text-slate-400 pt-2">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="font-bold text-primary-gold hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
