"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[var(--muted)]",
        className
      )}
      aria-hidden
    />
  );
}

/**
 * Skeleton loader that mimics the layout of the final legal report.
 */
export function AnalysisSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Header block */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-3/4 max-w-sm" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>

      {/* Key Terms section */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-32" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-5 w-full" />
          ))}
        </div>
      </div>

      {/* Important Dates section */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-40" />
        <div className="grid gap-2 sm:grid-cols-2">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>

      {/* Obligations section */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-36" />
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-5 w-full" />
          ))}
        </div>
      </div>

      {/* Risk summary */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-28" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-16 rounded-full" />
        </div>
      </div>
    </motion.div>
  );
}
