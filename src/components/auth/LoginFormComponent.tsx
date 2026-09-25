"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  Shield,
  FileText,
  HelpCircle,
} from "lucide-react";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import {
  loginWithEmail,
  loginWithGoogle,
  loginWithGithub,
  getAuthErrorMessage,
} from "@/lib/auth/auth-service";

export function LoginFormComponent() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsSubmitting(true);
    try {
      await loginWithEmail(data);
      toast.success("Successfully logged in!");
      router.push("/");
      router.refresh();
    } catch (err) {
      toast.error(getAuthErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setSocialLoading("google");
    try {
      await loginWithGoogle();
      toast.success("Signed in with Google successfully!");
      router.push("/");
      router.refresh();
    } catch (err) {
      toast.error(getAuthErrorMessage(err));
    } finally {
      setSocialLoading(null);
    }
  };

  const handleGithubLogin = async () => {
    setSocialLoading("github");
    try {
      await loginWithGithub();
      toast.success("Signed in with GitHub successfully!");
      router.push("/");
      router.refresh();
    } catch (err) {
      toast.error(getAuthErrorMessage(err));
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <div className="space-y-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2.5"
        noValidate
      >
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-1 flex items-center gap-1 text-[11px] font-semibold text-gray-700 dark:text-gray-200"
          >
            <span>Email</span>
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...register("email")}
              className={`h-9 w-full rounded-lg border bg-gray-50/70 pl-9 pr-3 text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 dark:bg-[#040e1d] dark:text-white dark:placeholder:text-gray-500 ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 dark:border-white/10"
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-0.5 text-[10px] font-medium text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-1 flex items-center gap-1 text-[11px] font-semibold text-gray-700 dark:text-gray-200"
          >
            <span>Password</span>
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password")}
              className={`h-9 w-full rounded-lg border bg-gray-50/70 pl-9 pr-9 text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 dark:bg-[#040e1d] dark:text-white dark:placeholder:text-gray-500 ${
                errors.password
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 dark:border-white/10"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-0.5 text-[10px] font-medium text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember me & Forgot Password */}
        <div className="flex items-center justify-between pt-0.5 pb-0.5">
          <div className="flex items-center gap-1.5">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-gray-300 text-amber-500 focus:ring-amber-400 dark:border-white/20 dark:bg-black/20 cursor-pointer"
            />
            <label
              htmlFor="remember"
              className="text-[11px] text-gray-500 dark:text-gray-400 select-none cursor-pointer"
            >
              Remember me
            </label>
          </div>

          <Link
            href="/auth/forgot-password"
            className="text-[11px] font-semibold text-amber-500 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isSubmitting || Boolean(socialLoading)}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#0d2847] text-xs font-bold text-white shadow-sm transition-all hover:bg-[#11355e] active:scale-[0.99] disabled:opacity-60 dark:bg-amber-500 dark:text-black dark:hover:bg-amber-400 mt-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <span>Login</span>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="my-2.5 flex items-center justify-center gap-3">
        <div className="h-[1px] flex-1 bg-gray-200 dark:bg-white/10" />
        <span className="text-[11px] font-medium text-gray-400">
          or sign in with
        </span>
        <div className="h-[1px] flex-1 bg-gray-200 dark:bg-white/10" />
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={Boolean(socialLoading) || isSubmitting}
          className="flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 active:scale-95 disabled:opacity-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              fill="#EA4335"
            />
          </svg>
          <span>Google</span>
        </button>

        <button
          type="button"
          onClick={handleGithubLogin}
          disabled={Boolean(socialLoading) || isSubmitting}
          className="flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 active:scale-95 disabled:opacity-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
        >
          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
          <span>GitHub</span>
        </button>
      </div>

      {/* Switch to Register */}
      <div className="text-center text-[11px] text-gray-500 dark:text-gray-400">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/register"
          className="font-bold text-[#0d2847] hover:underline dark:text-amber-500"
        >
          Create account
        </Link>
      </div>

      {/* Footer Legal Links */}
      <div className="flex items-center justify-center gap-3 pt-2 text-[10px] text-gray-400">
        <span className="inline-flex items-center gap-1 hover:text-gray-700 dark:hover:text-white cursor-pointer">
          <FileText size={11} />
          Terms
        </span>
        <span>•</span>
        <span className="inline-flex items-center gap-1 hover:text-gray-700 dark:hover:text-white cursor-pointer">
          <Shield size={11} />
          Privacy
        </span>
        <span>•</span>
        <span className="inline-flex items-center gap-1 hover:text-gray-700 dark:hover:text-white cursor-pointer">
          <HelpCircle size={11} />
          Help
        </span>
      </div>
    </div>
  );
}
