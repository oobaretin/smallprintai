"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type SeverityLevel = "low" | "medium" | "high";

const severityConfig: Record<
  SeverityLevel,
  { label: string; icon: LucideIcon; className: string }
> = {
  low: {
    label: "Low",
    icon: CheckCircle2,
    className:
      "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  },
  medium: {
    label: "Medium",
    icon: AlertTriangle,
    className:
      "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
  },
  high: {
    label: "High",
    icon: ShieldAlert,
    className:
      "bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30",
  },
};

export interface RiskBadgeProps {
  severity: SeverityLevel;
  label?: string;
  className?: string;
}

/**
 * Color-coded risk indicator with Lucide icon for legal/contract risk severity.
 */
export function RiskBadge({ severity, label, className }: RiskBadgeProps) {
  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        config.className,
        className
      )}
    >
      <Icon className="size-3.5 shrink-0" aria-hidden />
      <span>{label ?? config.label}</span>
    </motion.span>
  );
}
