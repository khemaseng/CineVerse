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
import { loginWithEmail, getAuthErrorMessage } from "@/lib/auth/auth-service";

export function LoginFormComponent() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      window.dispatchEvent(new Event("cineverse-auth-change"));
      toast.success("Successfully logged in!");
      // បញ្ជូនទៅកាន់ Home Page និងធ្វើការ Refresh
      router.push("/");
      router.refresh();
    } catch (err) {
      toast.error(getAuthErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3.5"
        noValidate
      >
        {/* Email Address */}
        <div>
          <label
            htmlFor="email"
            className="text-base font-semibold text-foreground flex items-center gap-1"
          >
            <span>Email</span>
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              {...register("email")}
              className={`h-11 w-full rounded-xl border bg-navy-blue/5 dark:bg-white/5 pl-10 pr-3.5 text-lg font-medium text-foreground placeholder:text-muted-foreground/60 transition-all focus:bg-background focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-slate-200 focus:border-slate-400"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-base font-medium text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="text-base font-semibold text-foreground flex items-center gap-1"
          >
            <span>Password</span>
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              {...register("password")}
              className={`h-11 w-full rounded-xl border bg-navy-blue/5 dark:bg-white/5 pl-10 pr-11 text-lg font-medium text-foreground placeholder:text-muted-foreground/60 transition-all focus:bg-background focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:border-red-500"
                  : "border-slate-200 focus:border-slate-400"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-base font-medium text-red-500">
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
              className="h-3.5 w-3.5 rounded border-slate-300 cursor-pointer focus:ring-0"
            />
            <label
              htmlFor="remember"
              className="text-base text-muted-foreground select-none cursor-pointer"
            >
              Remember me
            </label>
          </div>

          <Link
            href="/auth/forgot-password"
            className="text-base font-semibold text-navy-blue dark:text-primary-gold hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Login Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-navy-blue text-white font-bold shadow-md shadow-navy-blue/20 transition-all hover:bg-navy-blue/90 hover:shadow-lg active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60 text-lg mt-2"
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

      <p className="text-center text-sm text-muted-foreground">
        Demo accounts are saved in this browser only.
      </p>

      {/* Switch to Register */}
      <div className="text-center text-base text-muted-foreground pt-1">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/register"
          className="font-bold text-navy-blue hover:underline ml-1"
        >
          Create account
        </Link>
      </div>

      {/* Footer Legal Links */}
      <div className="flex items-center justify-center gap-4 pt-3 border-t border-border/60 text-[18px] text-muted-foreground">
        <span className="inline-flex items-center gap-1 hover:text-foreground cursor-pointer">
          <FileText size={12} />
          Terms
        </span>
        <span>•</span>
        <span className="inline-flex items-center gap-1 hover:text-slate-600 cursor-pointer">
          <Shield size={11} />
          Privacy
        </span>
        <span>•</span>
        <span className="inline-flex items-center gap-1 hover:text-slate-600 cursor-pointer">
          <HelpCircle size={11} />
          Help
        </span>
      </div>
    </div>
  );
}
