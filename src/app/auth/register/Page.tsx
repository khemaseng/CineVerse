import type { Metadata } from "next";
import Link from "next/link";
import { RegisterFormComponent } from "@/components/auth/RegisterFormComponent";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign Up | CineVerse",
  description: "Create a new CineVerse account to get started.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#f4f6fa] dark:bg-[#041226] text-navy-blue dark:text-white">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-[#08192d] p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight">Create Account</h2>
          <p className="text-sm text-navy-blue/70 dark:text-slate-400">
            Sign up to unlock thousands of movies on <span className="text-primary-gold font-bold">CineVerse</span>.
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-4 text-xs">Loading sign up form...</div>}>
          <RegisterFormComponent />
        </Suspense>

        <div className="text-center text-xs text-navy-blue/70 dark:text-slate-400 pt-2">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-bold text-primary-gold hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
