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
  User,
  Mail,
  Lock,
  Shield,
  FileText,
  HelpCircle,
} from "lucide-react";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import {
  registerWithEmail,
  getAuthErrorMessage,
} from "@/lib/auth/auth-service";

export function RegisterFormComponent() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsSubmitting(true);
    try {
      await registerWithEmail(data);
      toast.success("Account created successfully! Please sign in.");
      router.push("/auth/login");
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
        {/* Full Name */}
        <div>
          <label
            htmlFor="name"
            className="text-sm font-semibold text-foreground flex items-center gap-1 mb-1.5"
          >
            <span>Full Name</span>
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/70"
            />
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="John Doe"
              {...register("name")}
              className={`h-11 w-full rounded-xl border bg-white/70 dark:bg-white/[0.04] pl-10 pr-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all focus:bg-background focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:border-red-500 focus:ring-red-400/20"
                  : "border-amber-400/40 hover:border-amber-400/60 focus:border-amber-400 focus:ring-amber-300/30 dark:border-amber-400/30 dark:focus:border-amber-400"
              }`}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-xs font-medium text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label
            htmlFor="email"
            className="text-sm font-semibold text-foreground flex items-center gap-1 mb-1.5"
          >
            <span>Email</span>
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/70"
            />
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              {...register("email")}
              className={`h-11 w-full rounded-xl border bg-white/70 dark:bg-white/[0.04] pl-10 pr-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all focus:bg-background focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-400/20"
                  : "border-amber-400/40 hover:border-amber-400/60 focus:border-amber-400 focus:ring-amber-300/30 dark:border-amber-400/30 dark:focus:border-amber-400"
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs font-medium text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="text-sm font-semibold text-foreground flex items-center gap-1 mb-1.5"
          >
            <span>Password</span>
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/70"
            />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••"
              {...register("password")}
              className={`h-11 w-full rounded-xl border bg-white/70 dark:bg-white/[0.04] pl-10 pr-11 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all focus:bg-background focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:border-red-500 focus:ring-red-400/20"
                  : "border-amber-400/40 hover:border-amber-400/60 focus:border-amber-400 focus:ring-amber-300/30 dark:border-amber-400/30 dark:focus:border-amber-400"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-amber-500 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs font-medium text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="text-sm font-semibold text-foreground flex items-center gap-1 mb-1.5"
          >
            <span>Confirm Password</span>
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/70"
            />
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••"
              {...register("confirmPassword")}
              className={`h-11 w-full rounded-xl border bg-white/70 dark:bg-white/[0.04] pl-10 pr-11 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all focus:bg-background focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "border-red-500 focus:border-red-500 focus:ring-red-400/20"
                  : "border-amber-400/40 hover:border-amber-400/60 focus:border-amber-400 focus:ring-amber-300/30 dark:border-amber-400/30 dark:focus:border-amber-400"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-amber-500 transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-xs font-medium text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Register Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary-gold text-[#041226] font-bold shadow-md shadow-primary-gold/15 transition-all hover:bg-amber-400 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60 text-sm mt-3"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Creating account...</span>
            </>
          ) : (
            <span>Register</span>
          )}
        </button>
      </form>

      <p className="text-center text-xs text-muted-foreground pt-1">
        Demo accounts are saved in this browser only.
      </p>

      {/* Switch to Login */}
      <div className="text-center text-xs sm:text-sm text-muted-foreground pt-2">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-bold text-amber-500 hover:text-amber-600 dark:hover:text-amber-400 ml-1 transition-colors"
        >
          Sign In
        </Link>
      </div>

      {/* Footer Legal Links */}
      <div className="flex items-center justify-center gap-4 pt-4 border-t border-amber-400/15 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1 hover:text-amber-500 cursor-pointer transition-colors">
          <FileText size={12} />
          Terms
        </span>
        <span>•</span>
        <span className="inline-flex items-center gap-1 hover:text-amber-500 cursor-pointer transition-colors">
          <Shield size={12} />
          Privacy
        </span>
        <span>•</span>
        <span className="inline-flex items-center gap-1 hover:text-amber-500 cursor-pointer transition-colors">
          <HelpCircle size={12} />
          Help
        </span>
      </div>
    </div>
  );
}
