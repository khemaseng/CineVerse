import type { Metadata } from "next";
import { RegisterFormComponent } from "@/components/auth/RegisterFormComponent";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Create an account on CineVerse to start streaming and managing movies.",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] w-full items-center justify-center px-4 py-4 sm:py-6">
      <div className="w-full max-w-[420px] rounded-2xl border border-gray-200 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-[#07162c] sm:p-6">
        <div className="mb-4 text-center">
          <h1 className="text-xl font-black tracking-tight text-gray-900 dark:text-white sm:text-2xl">
            Create an Account
          </h1>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
            Sign up to discover, rent, and stream movies in HD
          </p>
        </div>
        <RegisterFormComponent />
      </div>
    </div>
  );
}
