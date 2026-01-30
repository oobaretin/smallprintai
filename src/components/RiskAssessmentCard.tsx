"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type RiskLevel = "Low" | "Medium" | "High";

interface RiskCardProps {
  title: string;
  description: string;
  level: RiskLevel;
  actionItem: string;
  /** Called when user clicks "Draft Counter-Offer" (High/Medium only). */
  onNegotiate?: (title: string, description: string) => void;
}

const severityConfig = {
  Low: {
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    icon: CheckCircle2,
    label: "Safe to Proceed",
  },
  Medium: {
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    icon: AlertCircle,
    label: "Proceed with Caution",
  },
  High: {
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    icon: AlertTriangle,
    label: "Immediate Review Required",
  },
};

export function RiskAssessmentCard({
  title,
  description,
  level,
  actionItem,
  onNegotiate,
}: RiskCardProps) {
  const config = severityConfig[level];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "group relative overflow-hidden rounded-xl border p-5 transition-all hover:shadow-lg",
        config.bg,
        config.border
      )}
    >
      <div className="flex items-start justify-between">
        <div className={cn("rounded-full p-2", config.bg)}>
          <Icon className={cn("h-5 w-5", config.color)} />
        </div>
        <span
          className={cn(
            "text-xs font-bold uppercase tracking-widest",
            config.color
          )}
        >
          {config.label}
        </span>
      </div>

      <div className="mt-4">
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          {description}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/5 pt-4">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-medium uppercase text-slate-500">
            Recommendation
          </p>
          <p className="text-sm text-slate-200">{actionItem}</p>
        </div>
        {(level === "High" || level === "Medium") && onNegotiate && (
          <button
            type="button"
            onClick={() => onNegotiate(title, description)}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-colors",
              level === "High"
                ? "bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"
                : "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
            )}
          >
            Draft Counter-Offer
          </button>
        )}
        <ArrowRight className="h-4 w-4 shrink-0 text-slate-600 transition-transform group-hover:translate-x-1" />
      </div>
    </motion.div>
  );
}
