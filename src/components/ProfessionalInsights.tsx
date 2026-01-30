"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Bell, Clock, ArrowUpRight } from "lucide-react";

export interface Milestone {
  label: string;
  date: string;
  type: "deadline" | "renewal" | "payment";
  urgency: "critical" | "standard";
}

interface InsightsProps {
  milestones: Milestone[];
}

export function ProfessionalInsights({ milestones }: InsightsProps) {
  return (
    <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-sm">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">
            Actionable Timeline
          </h3>
          <p className="text-sm text-slate-400">
            Key obligations and critical dates extracted from the &quot;small
            print.&quot;
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-blue-500/10 px-4 py-2 text-xs font-bold text-blue-400 transition-all hover:bg-blue-500/20"
        >
          <Calendar className="h-4 w-4" aria-hidden />
          SYNC TO CALENDAR
        </button>
      </div>

      <div className="space-y-6">
        {milestones.map((item, index) => (
          <motion.div
            key={`${item.date}-${item.label}-${index}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex gap-6 pb-6 last:pb-0"
          >
            {/* Timeline Line */}
            {index !== milestones.length - 1 && (
              <div
                className="absolute left-[19px] top-10 h-full w-[2px] bg-slate-800 transition-colors group-hover:bg-blue-500/30"
                aria-hidden
              />
            )}

            {/* Icon Node */}
            <div
              className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
                item.urgency === "critical"
                  ? "border-rose-500 bg-rose-500/10"
                  : "border-slate-700 bg-slate-800"
              }`}
            >
              {item.type === "deadline" ? (
                <Clock className="h-4 w-4 text-white" aria-hidden />
              ) : (
                <Bell className="h-4 w-4 text-white" aria-hidden />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest ${
                    item.urgency === "critical"
                      ? "text-rose-400"
                      : "text-slate-500"
                  }`}
                >
                  {item.date}
                </span>
                {item.urgency === "critical" && (
                  <span className="flex items-center gap-1 rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] font-bold text-rose-400">
                    CRITICAL
                  </span>
                )}
              </div>
              <h4 className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-200">
                {item.label}
                <ArrowUpRight
                  className="h-3 w-3 text-slate-600 opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
              </h4>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
