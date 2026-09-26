"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  FileText,
  Shield,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-140px)] w-full items-center justify-center p-4 md:p-8">
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-2xl md:flex-row">
        {/* Left Dark Cinema Showcase Card */}
        <div className="flex flex-col justify-between bg-[#042454] p-8 md:w-[45%] md:p-10">
          <div>
            {/* CineVerse Logo */}
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">
                <span className="text-[#f5a524]">Cine</span>Verse
              </span>
            </div>

            {/* Showcase Poster Card */}
            <div className="relative mt-8 aspect-4/3 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#07367b] shadow-inner">
              <Image
                src="/side-of-form.png"
                alt="CineVerse Cinema"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Badge & Title */}
            <div className="mt-6 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Welcome Back</h3>
                <p className="text-xs text-white/60">
                  Pick up where you left off
                </p>
              </div>
              <span className="rounded-lg bg-[#f5a524] px-3 py-1 text-xs font-black text-black">
                8.9/10
              </span>
            </div>
          </div>

          {/* Quote Footer */}
          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-xs leading-relaxed text-white/80">
              &ldquo;Cinema is a matter of what&#39;s in the frame and
              what&#39;s out.&rdquo;
            </p>
            <p className="mt-3 text-xs font-semibold text-[#f5a524]">
              CineVerse Movie Platform
            </p>
          </div>
        </div>

        {/* Right Form Container */}
        <div className="flex flex-1 flex-col justify-between p-8 md:p-12">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#f5a524]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f5a524]" />
              CineVerse
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#041226]">
              Sign In
            </h1>
            <p className="mt-1 text-xs text-gray-500">
              Access your personalized movie watchlist and recommendations
            </p>

            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700">
                  Email <span className="text-[#f5a524]">*</span>
                </label>
                <div className="relative mt-1">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Mail size={15} />
                  </span>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pr-4 pl-10 text-xs text-gray-900 placeholder:text-gray-400 focus:border-[#042454] focus:outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-gray-700">
                    Password <span className="text-[#f5a524]">*</span>
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-[11px] font-semibold text-[#f5a524] hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative mt-1">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Lock size={15} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pr-10 pl-10 text-xs text-gray-900 placeholder:text-gray-400 focus:border-[#042454] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="mt-2 w-full rounded-xl bg-[#042454] py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-[#07367b] active:scale-[0.99]"
              >
                Sign In
              </button>
            </form>

            {/* Social Separator */}
            <div className="relative my-5 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>
              <span className="relative bg-white px-3 text-[11px] text-gray-400">
                or sign in with
              </span>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Google
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
              >
                <svg
                  className="h-4 w-4 fill-current text-gray-900"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
                GitHub
              </button>
            </div>

            <div className="mt-5 text-center text-xs text-gray-500">
              Don&#39;t have an account?{" "}
              <Link
                href="/auth/register"
                className="font-semibold text-[#042454] hover:underline"
              >
                Create Account
              </Link>
            </div>
          </div>

          {/* Bottom Legal / Help Links */}
          <div className="mt-8 flex items-center justify-center gap-6 text-[11px] text-gray-400">
            <span className="flex items-center gap-1 hover:text-gray-600 cursor-pointer">
              <FileText size={12} /> Terms
            </span>
            <span className="flex items-center gap-1 hover:text-gray-600 cursor-pointer">
              <Shield size={12} /> Privacy
            </span>
            <span className="flex items-center gap-1 hover:text-gray-600 cursor-pointer">
              <HelpCircle size={12} /> Help
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
