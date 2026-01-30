import Link from "next/link";
import { ArrowLeft, Shield, Zap, Target } from "lucide-react";
import { Navbar } from "@/components/navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back
        </Link>

        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          We read the fine print so you don&apos;t have to.
        </h1>

        <section className="mt-8 space-y-6 text-[var(--muted-foreground)]">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            The Problem
          </h2>
          <p className="leading-relaxed">
            Modern contracts are designed to be dense. Hidden in the &quot;small
            print&quot; are auto-renewals, unilateral changes, and liability
            shifts that can cost you thousands. Most people sign because they
            don&apos;t have time—or a law degree.
          </p>

          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            The Solution
          </h2>
          <p className="leading-relaxed">
            SmallPrintAI was born from a simple mission: to democratize legal
            clarity. We built a professional-grade AI layer that speaks your
            language. Our system doesn&apos;t just summarize; it protects. By
            analyzing thousands of data points across your PDF or DOCX files, we
            surface the risks, the deadlines, and the obligations that actually
            matter.
          </p>

          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            Our Core Pillars
          </h2>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                <Shield className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <span className="font-medium text-[var(--foreground)]">
                  Precision
                </span>
                <p className="text-sm">
                  Legal-grade extraction that goes beyond basic summaries.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                <Zap className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <span className="font-medium text-[var(--foreground)]">
                  Speed
                </span>
                <p className="text-sm">
                  Insight in seconds, not days.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                <Target className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <span className="font-medium text-[var(--foreground)]">
                  Action
                </span>
                <p className="text-sm">
                  We don&apos;t just tell you what&apos;s wrong; we tell you what
                  to do next.
                </p>
              </div>
            </li>
          </ul>
        </section>

        <p className="mt-10">
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90"
          >
            Get Started
          </Link>
        </p>

        <footer className="mt-16 border-t border-[var(--border)] pt-8 text-center text-sm text-[var(--muted-foreground)]">
          Making the fine print legible since 2026.
        </footer>
      </main>
    </div>
  );
}
