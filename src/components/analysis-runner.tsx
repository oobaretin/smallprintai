"use client";

import { useCompletion } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { AnalysisProgressBar } from "@/components/analysis-progress-bar";
import { AnalysisResultView } from "@/components/analysis-result-view";
import { AnalysisSkeleton } from "@/components/analysis-skeleton";
import { logAnalysisComplete, logAnalysisStart } from "@/lib/performance";
import type { LegalAnalysis } from "@/lib/analysis-types";

export interface AnalysisRunnerProps {
  documentText: string;
  onError?: (error: Error) => void;
}

/**
 * Runs streaming legal analysis via /api/completion; shows progress bar, skeleton, then LegalReport.
 * Logs time-to-complete to console for performance monitoring.
 */
export function AnalysisRunner({
  documentText,
  onError,
}: AnalysisRunnerProps) {
  const [parsed, setParsed] = useState<LegalAnalysis | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const analysisStartRef = useRef<number | null>(null);

  const {
    completion,
    complete,
    isLoading,
    error,
    setCompletion,
  } = useCompletion({
    api: "/api/completion",
    body: { documentText },
    streamProtocol: "text",
    onError: (e) => {
      onError?.(e);
    },
  });

  useEffect(() => {
    if (!documentText.trim()) return;
    setParsed(null);
    setParseError(null);
    setCompletion("");
    analysisStartRef.current = logAnalysisStart();
    complete("Analyze this document.");
  }, [documentText]); // eslint-disable-line react-hooks/exhaustive-deps -- run when documentText is set

  useEffect(() => {
    if (error) {
      setParseError(error.message);
      toast.error("Analysis failed. Please try again.");
      return;
    }
    if (isLoading || !completion?.trim()) return;

    if (analysisStartRef.current !== null) {
      logAnalysisComplete(analysisStartRef.current);
      analysisStartRef.current = null;
    }

    try {
      const raw = completion.trim();
      const jsonStr = raw.replace(/^```json\s*|\s*```$/g, "").trim();
      const data = JSON.parse(jsonStr) as Record<string, unknown>;
      if (!data || typeof data.summary !== "string") {
        setParseError("Invalid analysis format.");
        return;
      }
      const analysis: LegalAnalysis = {
        summary: data.summary as string,
        plain_english_summary:
          typeof data.plain_english_summary === "string"
            ? data.plain_english_summary
            : undefined,
        risk_level: ["Low", "Medium", "High"].includes(
          data.risk_level as string
        )
          ? (data.risk_level as LegalAnalysis["risk_level"])
          : undefined,
        keyTerms: Array.isArray(data.keyTerms)
          ? (data.keyTerms as LegalAnalysis["keyTerms"])
          : Array.isArray(data.key_terms)
            ? (data.key_terms as string[]).map((term) => ({
                term,
                definition: "",
              }))
            : [],
        key_terms: Array.isArray(data.key_terms)
          ? (data.key_terms as string[])
          : undefined,
        importantDates: Array.isArray(data.importantDates)
          ? (data.importantDates as LegalAnalysis["importantDates"])
          : [],
        obligations: Array.isArray(data.obligations)
          ? (data.obligations as LegalAnalysis["obligations"])
          : [],
        risks: Array.isArray(data.risks) ? (data.risks as LegalAnalysis["risks"]) : [],
      };
      setParsed(analysis);
      setParseError(null);
      toast.success("Legal analysis ready.");
    } catch {
      setParseError("Could not parse analysis response.");
      toast.error("Analysis failed. Please try again.");
    }
  }, [isLoading, completion, error]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <AnalysisProgressBar isActive />
        <AnalysisSkeleton />
      </div>
    );
  }

  if (parseError) {
    return (
      <div className="rounded-lg border border-[var(--destructive)]/50 bg-[var(--destructive)]/10 p-4 text-sm text-[var(--destructive)]">
        {parseError}
      </div>
    );
  }

  if (parsed) {
    return <AnalysisResultView analysis={parsed} />;
  }

  return null;
}
