import type { LegalAnalysis, RiskLevel } from "@/lib/analysis-types";

export interface AnalyticsDashboardData {
  riskScore: number;
  stats: { name: string; value: number }[];
  totalObligations: number;
}

/** Map risk_level to a 0–100 risk score for the gauge. */
function riskLevelToScore(level: RiskLevel | undefined): number {
  switch (level) {
    case "High":
      return 75;
    case "Medium":
      return 50;
    case "Low":
      return 25;
    default:
      return 40;
  }
}

/** Derive risk score from risks array when risk_level is missing. */
function risksToScore(risks: LegalAnalysis["risks"]): number {
  if (!risks.length) return 20;
  const sum = risks.reduce((acc, r) => {
    const n = r.severity === "high" ? 80 : r.severity === "medium" ? 50 : 25;
    return acc + n;
  }, 0);
  return Math.round(sum / risks.length);
}

/**
 * Derive analytics dashboard data from a LegalAnalysis for the Risk Score Gauge and Clause Density chart.
 */
export function deriveAnalyticsData(analysis: LegalAnalysis): AnalyticsDashboardData {
  const riskScore =
    analysis.risk_level !== undefined
      ? riskLevelToScore(analysis.risk_level)
      : risksToScore(analysis.risks);

  const stats = [
    { name: "Key Terms", value: analysis.keyTerms.length },
    { name: "Dates", value: analysis.importantDates.length },
    { name: "Obligations", value: analysis.obligations.length },
    { name: "Risks", value: analysis.risks.length },
  ];

  return {
    riskScore,
    stats,
    totalObligations: analysis.obligations.length,
  };
}

import type { FullAnalysisResult } from "@/app/actions/analyze";

/**
 * Derive analytics dashboard data from FullAnalysisResult (home-page flow).
 */
export function deriveAnalyticsDataFromFull(
  data: FullAnalysisResult
): AnalyticsDashboardData {
  const low = data.assessments.filter((a) => a.level === "Low").length;
  const med = data.assessments.filter((a) => a.level === "Medium").length;
  const high = data.assessments.filter((a) => a.level === "High").length;
  const stats = [
    { name: "Low", value: low },
    { name: "Medium", value: med },
    { name: "High", value: high },
    { name: "Milestones", value: data.milestones.length },
  ];
  return {
    riskScore: data.riskScore,
    stats,
    totalObligations: data.milestones.length,
  };
}
