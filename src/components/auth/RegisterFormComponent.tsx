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
      window.dispatchEvent(new Event("cineverse-auth-change"));
      toast.success("Account created successfully!");
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
        {/* Full Name */}
        <div>
          <label
            htmlFor="name"
            className="text-base font-semibold text-foreground flex items-center gap-1"
          >
            <span>Full Name</span>
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="John Doe"
              {...register("name")}
              className={`h-11 w-full rounded-xl border bg-navy-blue/5 dark:bg-white/5 pl-10 pr-3.5 text-lg font-medium text-foreground placeholder:text-muted-foreground/60 transition-all focus:bg-background focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:border-red-500"
                  : "border-slate-200 focus:border-slate-400"
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-base font-medium text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

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
              autoComplete="new-password"
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

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="text-base font-semibold text-foreground flex items-center gap-1"
          >
            <span>Confirm Password</span>
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••"
              {...register("confirmPassword")}
              className={`h-11 w-full rounded-xl border bg-navy-blue/5 dark:bg-white/5 pl-10 pr-11 text-lg font-medium text-foreground placeholder:text-muted-foreground/60 transition-all focus:bg-background focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "border-red-500 focus:border-red-500"
                  : "border-slate-200 focus:border-slate-400"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            >
              {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-base font-medium text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Register Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-navy-blue text-white font-bold shadow-md shadow-navy-blue/20 transition-all hover:bg-navy-blue/90 hover:shadow-lg active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60 text-lg mt-3"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              <span>Creating account...</span>
            </>
          ) : (
            <span>Register</span>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Demo accounts are saved in this browser only.
      </p>

      {/* Switch to Login */}
      <div className="text-center text-base text-muted-foreground pt-1">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-bold text-navy-blue hover:underline ml-1"
        >
          Sign In
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
