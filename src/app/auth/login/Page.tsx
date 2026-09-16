
import Link from "next/link";
import { LoginFormComponent } from "@/components/auth/LoginFormComponent";

export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-border/50 bg-card/40 p-8 shadow-2xl backdrop-blur-xl">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome Back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>

        <LoginFormComponent />

        <p className="text-center text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-primary-red hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}