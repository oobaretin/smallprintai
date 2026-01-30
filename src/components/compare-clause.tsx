"use client";

import { motion } from "framer-motion";
import { FileText, Scale } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CompareClauseProps {
  standardText: string;
  documentText: string;
  title?: string;
  className?: string;
}

/**
 * "Standard vs. Reality" view: shows a typical clause vs. the one in the user's document.
 */
export function CompareClause({
  standardText,
  documentText,
  title = "Clause comparison",
  className,
}: CompareClauseProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("space-y-4", className)}
    >
      <h3 className="text-sm font-semibold text-[var(--foreground)]">
        {title}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--muted)]/30 p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-[var(--muted-foreground)]">
            <Scale className="size-3.5" aria-hidden />
            Standard / typical
          </div>
          <p className="text-sm leading-relaxed text-[var(--foreground)]">
            {standardText}
          </p>
        </div>
        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-[var(--muted-foreground)]">
            <FileText className="size-3.5" aria-hidden />
            Your document
          </div>
          <p className="text-sm leading-relaxed text-[var(--foreground)]">
            {documentText}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
