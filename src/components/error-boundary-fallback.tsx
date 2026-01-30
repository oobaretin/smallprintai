"use client";

import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ErrorBoundaryFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

/**
 * Fallback UI when AI analysis or dashboard fails. Allows user to retry.
 */
export function ErrorBoundaryFallback({
  error,
  resetErrorBoundary,
}: ErrorBoundaryFallbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-[320px] flex-col items-center justify-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 text-center"
    >
      <span className="rounded-full bg-[var(--destructive)]/15 p-3 text-[var(--destructive)]">
        <AlertCircle className="size-10" aria-hidden />
      </span>
      <h2 className="text-lg font-semibold text-[var(--foreground)]">
        Something went wrong
      </h2>
      <p className="max-w-md text-sm text-[var(--muted-foreground)]">
        {error?.message ??
          "We couldn’t complete the analysis. This can happen if the document is too large or the service is temporarily unavailable."}
      </p>
      {resetErrorBoundary && (
        <Button
          onClick={resetErrorBoundary}
          variant="outline"
          className="gap-2"
        >
          <RefreshCw className="size-4" aria-hidden />
          Retry
        </Button>
      )}
    </motion.div>
  );
}
