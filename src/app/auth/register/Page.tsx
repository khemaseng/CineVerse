
import Link from "next/link";
import { RegisterFormComponent } from "@/components/auth/RegisterFormComponent";

export default function RegisterPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-border/50 bg-card/40 p-8 shadow-2xl backdrop-blur-xl">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Create an Account
          </h1>
          <p className="text-sm text-muted-foreground">
            Join CineVerse to track and explore your favorite movies
          </p>
        </div>

        <RegisterFormComponent />

        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary-red hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}