"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { AnalysisRunner } from "@/components/analysis-runner";
import { DashboardErrorBoundary } from "@/components/dashboard-error-boundary";
import { SmallPrintDropzone } from "@/components/small-print-dropzone";
import { PrivacyBanner } from "@/components/privacy-banner";

export default function DashboardPage() {
  const [documentText, setDocumentText] = useState<string>("");
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleAnalyzeComplete = useCallback((extractedText: string) => {
    setUploadError(null);
    setDocumentText(extractedText);
  }, []);

  const showUpload = !documentText;
  const showAnalysis = !!documentText.trim();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/80">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)]"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back
          </Link>
          <span className="text-sm font-semibold text-[var(--foreground)]">
            SmallPrintAI
          </span>
          <span className="w-20" aria-hidden />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
              Document analysis
            </h1>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              Upload a contract to get key terms, dates, obligations, and risk
              insights.
            </p>
          </div>

          <PrivacyBanner />

          {showUpload && (
            <SmallPrintDropzone
              onAnalyzeComplete={handleAnalyzeComplete}
              onError={setUploadError}
            />
          )}

          {uploadError && (
            <div
              className="rounded-lg border border-[var(--destructive)]/50 bg-[var(--destructive)]/10 p-4 text-sm text-[var(--destructive)]"
              role="alert"
            >
              {uploadError}
            </div>
          )}

          {showAnalysis && (
            <DashboardErrorBoundary>
              <AnalysisRunner
                documentText={documentText}
                onError={(e) => setUploadError(e.message)}
              />
            </DashboardErrorBoundary>
          )}
        </motion.div>
      </main>
    </div>
  );
}
