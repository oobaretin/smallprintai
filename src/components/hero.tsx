"use client";

import { motion } from "framer-motion";
import { Scale } from "lucide-react";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

/**
 * Hero section for SmallPrintAI landing: headline, subline, CTA.
 */
export function Hero() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="relative overflow-hidden px-4 pb-16 pt-12 text-center sm:px-6 sm:pb-24 sm:pt-16 md:px-8"
    >
      <motion.div variants={item} className="mx-auto max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs font-medium text-[var(--muted-foreground)]">
          <Scale className="size-3.5" aria-hidden />
          Legal clarity in minutes
        </span>
      </motion.div>
      <motion.h1
        variants={item}
        className="mt-6 text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl"
      >
        Understand the{" "}
        <span className="text-[var(--primary)]">small print</span> before you
        sign
      </motion.h1>
      <motion.p
        variants={item}
        className="mx-auto mt-4 max-w-2xl text-lg text-[var(--muted-foreground)] sm:text-xl"
      >
        SmallPrintAI analyzes contracts and documents to surface key terms,
        dates, and obligations—so you can make informed decisions with
        confidence.
      </motion.p>
      <motion.div variants={item} className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/dashboard"
          className="inline-flex h-11 min-w-[160px] items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-8 text-sm font-medium text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90"
        >
          Open dashboard
        </Link>
        <a
          href="#upload"
          className="inline-flex h-11 min-w-[160px] items-center justify-center gap-2 rounded-lg border border-[var(--input)] bg-[var(--background)] px-8 text-sm font-medium hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)]"
        >
          Upload a document
        </a>
      </motion.div>
    </motion.section>
  );
}
