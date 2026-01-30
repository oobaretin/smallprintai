"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <main className="mx-auto max-w-md px-4 py-16 sm:px-6">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back
        </Link>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          Sign In
        </h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Authentication is not implemented yet. Use{" "}
          <Link href="/dashboard" className="font-medium text-[var(--primary)] hover:underline">
            Get Started
          </Link>{" "}
          to analyze documents.
        </p>
      </main>
    </div>
  );
}
