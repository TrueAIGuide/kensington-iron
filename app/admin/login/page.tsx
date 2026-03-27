"use client";

import { useState, useTransition } from "react";
import { login } from "./actions";

export default function AdminLogin() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-on-surface">
      {/* Brand */}
      <div className="mb-10 text-center">
        <h1 className="font-serif text-3xl text-primary tracking-tight">
          Kensington Iron
        </h1>
        <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-on-surface-variant/60 mt-1">
          Staff Portal
        </p>
      </div>

      <div className="w-full max-w-sm">
        <div className="bg-surface-container-lowest border border-outline-variant/15 p-8 rounded-xl shadow-2xl glass">
          <h2 className="font-serif text-xl tracking-tight mb-6">
            Sign In
          </h2>

          <form action={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label 
                htmlFor="email"
                className="block font-sans text-xs uppercase tracking-[0.1em] text-on-surface-variant/60 mb-2"
              >
                Email Address
              </label>
              <input 
                id="email"
                name="email"
                type="email" 
                required
                disabled={isPending}
                className="w-full bg-transparent border-b border-outline text-on-surface font-sans py-2 outline-none transition-all focus:border-primary disabled:opacity-50"
                placeholder="admin@kensingtonfe.com"
              />
            </div>

            <div>
              <label 
                htmlFor="password"
                className="block font-sans text-xs uppercase tracking-[0.1em] text-on-surface-variant/60 mb-2"
              >
                Password
              </label>
              <input 
                id="password"
                name="password"
                type="password" 
                required
                disabled={isPending}
                className="w-full bg-transparent border-b border-outline text-on-surface font-sans py-2 outline-none transition-all focus:border-primary disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="mt-2 text-red-400 text-xs font-sans tracking-wide">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="mt-6 w-full bg-gradient-primary text-on-primary py-3 rounded-sm font-sans text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {isPending ? "Authenticating..." : "Enter Portal"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
