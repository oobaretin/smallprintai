"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

const MAX_DURATION_MS = 60_000; // "under 60 seconds"

export interface AnalysisProgressBarProps {
  isActive: boolean;
  className?: string;
}

/**
 * "Lightning Fast" progress bar: simulates document scan progress over up to 60s while analysis runs.
 */
export function AnalysisProgressBar({
  isActive,
  className,
}: AnalysisProgressBarProps) {
  const progress = useMotionValue(0);
  const widthPercent = useTransform(progress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    if (!isActive) return;
    progress.set(0);
    const controls = animate(progress, 1, {
      duration: MAX_DURATION_MS / 1000,
      ease: "easeInOut",
    });
    return () => controls.stop();
  }, [isActive, progress]);

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-1 flex items-center justify-between text-xs text-[var(--muted-foreground)]">
        <span>Scanning document…</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--muted)]">
        <motion.div
          className="h-full rounded-full bg-[var(--primary)]"
          style={{ width: widthPercent }}
        />
      </div>
    </div>
  );
}
