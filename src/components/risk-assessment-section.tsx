"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { RiskBadge } from "@/components/risk-badge";
import type { RiskItem } from "@/lib/analysis-types";
import { cn } from "@/lib/utils";

export interface RiskAssessmentSectionProps {
  risks: RiskItem[];
  overallRiskLevel?: "Low" | "Medium" | "High";
  className?: string;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Risk Assessment cards with Framer Motion entrance. Green (Low), amber (Medium), red (High).
 */
export function RiskAssessmentSection({
  risks,
  overallRiskLevel,
  className,
}: RiskAssessmentSectionProps) {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className={cn("space-y-3", className)}
    >
      <h2 className="flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
        <Shield className="size-4" aria-hidden />
        Risk summary
      </h2>
      {overallRiskLevel && (
        <motion.p
          variants={cardVariants}
          className="text-xs text-[var(--muted-foreground)]"
        >
          Overall risk level:{" "}
          <RiskBadge
            severity={overallRiskLevel.toLowerCase() as "low" | "medium" | "high"}
            label={overallRiskLevel}
          />
        </motion.p>
      )}
      <ul className="space-y-2">
        {risks.map((r, i) => (
          <motion.li
            key={i}
            variants={cardVariants}
            className="flex flex-wrap items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] p-3"
          >
            <RiskBadge severity={r.severity} />
            <span className="text-sm text-[var(--foreground)]">
              {r.description}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}
