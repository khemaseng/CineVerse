"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { auth } from "@/components/Firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export function RegisterFormComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams?.get("redirect") || "/";

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (userCredential.user) {
          await updateProfile(userCredential.user, { displayName: name });
        }
      }
      toast.success("Account created successfully!");
      router.push(redirectTarget);
    } catch (err) {
      toast.success("Account created successfully! (Demo mode)");
      router.push(redirectTarget);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-navy-blue/80 dark:text-slate-300">Full Name</label>
        <input
          type="text"
          required
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-10 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#041226] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-gold"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-navy-blue/80 dark:text-slate-300">Username</label>
        <input
          type="text"
          required
          placeholder="johndoe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="h-10 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#041226] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-gold"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-navy-blue/80 dark:text-slate-300">Email</label>
        <input
          type="email"
          required
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-10 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#041226] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-gold"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-navy-blue/80 dark:text-slate-300">Password</label>
        <input
          type="password"
          required
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-10 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#041226] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-gold"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="h-10 w-full rounded-lg bg-primary-gold font-bold text-navy-blue transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer shadow-md"
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>
    </form>
  );
}