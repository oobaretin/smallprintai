"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";
import { Activity, ShieldAlert } from "lucide-react";
import type { AnalyticsDashboardData } from "@/lib/analytics";

interface DashboardProps {
  data: AnalyticsDashboardData;
}

const COLORS = ["#10b981", "#f59e0b", "#ef4444"]; // Emerald, Amber, Rose

export function AnalyticsDashboard({ data }: DashboardProps) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Risk Score Gauge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 p-6"
      >
        <div className="flex items-center gap-2 text-slate-400">
          <ShieldAlert className="h-4 w-4" />
          <span className="text-xs font-medium uppercase tracking-tighter">
            Overall Risk
          </span>
        </div>

        <div className="relative mt-4 h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { value: data.riskScore },
                  { value: Math.max(0, 100 - data.riskScore) },
                ]}
                innerRadius={60}
                outerRadius={80}
                startAngle={180}
                endAngle={0}
                dataKey="value"
              >
                <Cell
                  fill={
                    data.riskScore > 70
                      ? "#ef4444"
                      : data.riskScore > 40
                        ? "#f59e0b"
                        : "#3b82f6"
                  }
                />
                <Cell fill="#1e293b" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-10">
            <span className="text-4xl font-bold text-white">
              {data.riskScore}
            </span>
            <span className="text-[10px] font-bold uppercase text-slate-500">
              Risk Rating
            </span>
          </div>
        </div>
      </motion.div>

      {/* Contract Composition Bar Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 lg:col-span-2"
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400">
            <Activity className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-tighter">
              Clause Density
            </span>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-slate-400">Low</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="text-[10px] text-slate-400">Med</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-rose-500" />
              <span className="text-[10px] text-slate-400">High</span>
            </div>
          </div>
        </div>

        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.stats}>
              <XAxis
                dataKey="name"
                stroke="#475569"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#475569"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                }}
                itemStyle={{ fontSize: "12px" }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.stats.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
