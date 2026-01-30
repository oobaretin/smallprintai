"use client";

import { lazy, Suspense, useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, FileText, Scale } from "lucide-react";
import { toast } from "sonner";
import { NegotiationModal } from "@/components/NegotiationModal";
import { RiskAssessmentCard } from "@/components/RiskAssessmentCard";
import { CompareClause } from "@/components/compare-clause";
import type {
  LegalAnalysis,
  CompareClauseData,
  RiskLevel,
} from "@/lib/analysis-types";
import type { NegotiationDraft } from "@/lib/negotiation-types";
import { cn } from "@/lib/utils";

const RiskAssessmentSection = lazy(
  () =>
    import("@/components/risk-assessment-section").then((m) => ({
      default: m.RiskAssessmentSection,
    }))
);

export interface LegalReportProps {
  analysis: LegalAnalysis;
  compareClauses?: CompareClauseData[];
  className?: string;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.3 },
  }),
};

function RiskAssessmentFallback() {
  return (
    <div className="space-y-3">
      <div className="h-5 w-28 animate-pulse rounded bg-[var(--muted)]" />
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-14 animate-pulse rounded-lg bg-[var(--muted)]"
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Renders the final legal analysis: summary, key terms, dates, obligations, risks (lazy), negotiation modal, and optional compare view.
 */
export function LegalReport({
  analysis,
  compareClauses = [],
  className,
}: LegalReportProps) {
  const summaryText =
    analysis.plain_english_summary ?? analysis.summary;

  const [negotiationOpen, setNegotiationOpen] = useState(false);
  const [negotiationDraft, setNegotiationDraft] =
    useState<NegotiationDraft | null>(null);
  const [negotiationClauseTitle, setNegotiationClauseTitle] = useState("");
  const [negotiationLoading, setNegotiationLoading] = useState(false);

  const handleNegotiate = useCallback(
    async (title: string, description: string) => {
      setNegotiationLoading(true);
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
        setNegotiationOpen(true);
        toast.success("Counter-offer draft ready.", { id: "negotiate" });
      } catch (e) {
        toast.error(
          e instanceof Error ? e.message : "Failed to draft counter-offer.",
          { id: "negotiate" }
        );
      } finally {
        setNegotiationLoading(false);
      }
    },
    []
  );

  const closeNegotiation = useCallback(() => {
    setNegotiationOpen(false);
    setNegotiationDraft(null);
    setNegotiationClauseTitle("");
  }, []);

  return (
    <motion.article
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      className={cn("space-y-8", className)}
    >
      {/* Summary / Plain English */}
      <motion.section
        variants={sectionVariants}
        custom={0}
        className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 sm:p-5"
      >
        <h2 className="mb-2 text-sm font-semibold text-[var(--foreground)]">
          Summary
        </h2>
        <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
          {summaryText}
        </p>
      </motion.section>

      {/* Key Terms */}
      <motion.section variants={sectionVariants} custom={1}>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
          <Scale className="size-4" aria-hidden />
          Key Terms
        </h2>
        <ul className="space-y-2">
          {analysis.keyTerms.map((kt, i) => (
            <li
              key={i}
              className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-3"
            >
              <span className="font-medium text-[var(--foreground)]">
                {kt.term}
              </span>
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                {kt.definition}
              </p>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Important Dates */}
      <motion.section variants={sectionVariants} custom={2}>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
          <Calendar className="size-4" aria-hidden />
          Important Dates
        </h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {analysis.importantDates.map((d, i) => (
            <div
              key={i}
              className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-3"
            >
              <span className="font-medium text-[var(--foreground)]">
                {d.label}
              </span>
              <p className="text-xs text-[var(--muted-foreground)]">
                {d.date}
                {d.context ? ` — ${d.context}` : ""}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Obligations */}
      <motion.section variants={sectionVariants} custom={3}>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
          <FileText className="size-4" aria-hidden />
          Obligations
        </h2>
        <ul className="space-y-2">
          {analysis.obligations.map((ob, i) => (
            <li
              key={i}
              className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-3"
            >
              <span className="font-medium text-[var(--foreground)]">
                {ob.party}
              </span>
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                {ob.obligation}
                {ob.deadline ? ` (by ${ob.deadline})` : ""}
              </p>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Risk Assessment — lazy-loaded with Suspense */}
      {/* Risk cards — AI-generated insights */}
      {analysis.risks.length > 0 && (
        <motion.section variants={sectionVariants} custom={4}>
          <h2 className="mb-3 text-sm font-semibold text-[var(--foreground)]">
            Risk overview
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {analysis.risks.map((r, i) => (
              <RiskAssessmentCard
                key={i}
                level={(r.severity.charAt(0).toUpperCase() + r.severity.slice(1)) as RiskLevel}
                title={r.description.length > 60 ? `${r.description.slice(0, 57)}…` : r.description}
                description={r.description}
                actionItem="Review with legal counsel and negotiate if needed."
                onNegotiate={handleNegotiate}
              />
            ))}
          </div>
        </motion.section>
      )}

      <motion.section variants={sectionVariants} custom={5}>
        <Suspense fallback={<RiskAssessmentFallback />}>
          <RiskAssessmentSection
            risks={analysis.risks}
            overallRiskLevel={analysis.risk_level}
          />
        </Suspense>
      </motion.section>

      {/* Negotiation modal overlay */}
      <AnimatePresence mode="wait">
        {negotiationOpen && negotiationDraft && (
          <NegotiationModal
            key="negotiation-modal"
            clauseTitle={negotiationClauseTitle}
            draft={negotiationDraft}
            onClose={closeNegotiation}
          />
        )}
      </AnimatePresence>

      {/* Standard vs. Reality (Compare) */}
      {compareClauses.length > 0 && (
        <motion.section variants={sectionVariants} custom={6}>
          <h2 className="mb-3 text-sm font-semibold text-[var(--foreground)]">
            Standard vs. your document
          </h2>
          <div className="space-y-6">
            {compareClauses.map((cc, i) => (
              <CompareClause
                key={i}
                title={cc.clauseName}
                standardText={cc.standardText}
                documentText={cc.documentText}
              />
            ))}
          </div>
        </motion.section>
      )}
    </motion.article>
  );
}
