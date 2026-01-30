"use client";

import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { HomeAnalysisResult } from "@/components/home-analysis-result";
import type { FullAnalysisResult } from "@/app/actions/analyze";

/**
 * Home-page upload + result: when no analysis, show FileUpload; when complete, show HomeAnalysisResult.
 */
export function HomeUploadSection() {
  const [analysisData, setAnalysisData] = useState<FullAnalysisResult | null>(
    null
  );

  if (!analysisData) {
    return (
      <FileUpload
        onAnalysisComplete={(data) => setAnalysisData(data)}
      />
    );
  }

  return (
    <HomeAnalysisResult
      data={analysisData}
      onReset={() => setAnalysisData(null)}
    />
  );
}
