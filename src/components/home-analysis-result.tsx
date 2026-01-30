"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { ProfessionalInsights } from "@/components/ProfessionalInsights";
import { RiskAssessmentCard } from "@/components/RiskAssessmentCard";
import { NegotiationModal } from "@/components/NegotiationModal";
import { deriveAnalyticsDataFromFull } from "@/lib/analytics";
import { downloadPDFReport } from "@/lib/exportReport";
import type { FullAnalysisResult } from "@/app/actions/analyze";
import type { NegotiationDraft } from "@/lib/negotiation-types";

export interface HomeAnalysisResultProps {
  data: FullAnalysisResult;
  onReset?: () => void;
}

/**
 * Renders full analysis on the home page: dashboard, milestones, summary, risk cards, and negotiation modal.
 */
export function HomeAnalysisResult({ data, onReset }: HomeAnalysisResultProps) {
  const [negotiationDraft, setNegotiationDraft] =
    useState<NegotiationDraft | null>(null);
  const [negotiationClauseTitle, setNegotiationClauseTitle] = useState("");

  const analyticsData = deriveAnalyticsDataFromFull(data);

  const handleNegotiate = useCallback(
    async (title: string, description: string) => {
      toast.loading("Drafting counter-offer…", { id: "negotiate" });
      try {
        const res = await fetch("/api/negotiate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            originalClause: description,
            riskIdentified: title,
            userGoal: "Fair terms and mutual protection.",
          }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error((err as { error?: string }).error ?? "Request failed");
        }
        const draft = (await res.json()) as NegotiationDraft;
        setNegotiationDraft(draft);
        setNegotiationClauseTitle(title);
        toast.success("Counter-offer draft ready.", { id: "negotiate" });
      } catch (e) {
        toast.error(
          e instanceof Error ? e.message : "Failed to draft counter-offer.",
          { id: "negotiate" }
        );
      }
    },
    []
  );

  const closeNegotiation = useCallback(() => {
    setNegotiationDraft(null);
    setNegotiationClauseTitle("");
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-wrap items-center justify-end gap-3"
      >
        <button
          type="button"
          onClick={() => downloadPDFReport(data)}
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-800 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-slate-700"
        >
          <Download className="h-4 w-4 text-blue-400" aria-hidden />
          <span>Export PDF Report</span>
        </button>
      </motion.div>

      <AnalyticsDashboard data={analyticsData} />

      {data.milestones.length > 0 && (
        <ProfessionalInsights milestones={data.milestones} />
      )}

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 sm:p-5"
      >
        <h2 className="mb-2 text-sm font-semibold text-[var(--foreground)]">
          Summary
        </h2>
        <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
          {data.summary}
        </p>
      </motion.section>

      {data.assessments.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <h2 className="mb-3 text-sm font-semibold text-[var(--foreground)]">
            Risk overview
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.assessments.map((a, i) => (
              <RiskAssessmentCard
                key={`${a.title}-${i}`}
                level={a.level}
                title={a.title}
                description={a.description}
                actionItem={a.actionItem}
                onNegotiate={handleNegotiate}
              />
            ))}
          </div>
        </motion.section>
      )}

      {onReset && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <button
            type="button"
            onClick={onReset}
            className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)]"
          >
            Analyze another document
          </button>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {negotiationDraft && (
          <NegotiationModal
            key="negotiation-modal"
            clauseTitle={negotiationClauseTitle}
            draft={negotiationDraft}
            onClose={closeNegotiation}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
