"use client";

import dynamic from "next/dynamic";
import { LegalReport } from "@/components/legal-report";
import { ProfessionalInsights } from "@/components/ProfessionalInsights";
import { deriveAnalyticsData } from "@/lib/analytics";
import { deriveMilestones } from "@/lib/milestones";
import type { LegalAnalysis } from "@/lib/analysis-types";

const AnalyticsDashboard = dynamic(
  () =>
    import("@/components/AnalyticsDashboard").then((m) => ({
      default: m.AnalyticsDashboard,
    })),
  {
    loading: () => (
      <div className="mb-8 h-64 animate-pulse rounded-2xl bg-slate-800/50" />
    ),
    ssr: false,
  }
);

export interface AnalysisResultViewProps {
  analysis: LegalAnalysis;
}

/**
 * Renders analytics charts (code-split), actionable timeline, and legal report when analysis is ready.
 */
export function AnalysisResultView({ analysis }: AnalysisResultViewProps) {
  const analyticsData = deriveAnalyticsData(analysis);
  const milestones = deriveMilestones(
    analysis.importantDates,
    analysis.obligations
  );

  return (
    <div className="space-y-8">
      <AnalyticsDashboard data={analyticsData} />
      {milestones.length > 0 && (
        <ProfessionalInsights milestones={milestones} />
      )}
      <LegalReport analysis={analysis} />
    </div>
  );
}
