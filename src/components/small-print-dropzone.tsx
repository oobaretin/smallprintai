"use client";

import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { FileText, Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { AnalysisProgressBar } from "@/components/analysis-progress-bar";
import { analyzeDocument } from "@/app/actions/analyze";
import { cn } from "@/lib/utils";

const ACCEPT = {
  "application/pdf": [".pdf"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
  "application/msword": [".doc"],
};
const MAX_SIZE_MB = 10;

export interface SmallPrintDropzoneProps {
  onAnalyzeComplete: (extractedText: string) => void;
  onError?: (message: string) => void;
  className?: string;
}

/**
 * SmallPrintAI dropzone: react-dropzone + "Lightning Fast" progress bar.
 * On drop, calls analyzeDocument server action; on completion, passes extracted text
 * so the parent can run AI analysis and display RiskAssessmentCards.
 */
export function SmallPrintDropzone({
  onAnalyzeComplete,
  onError,
  className,
}: SmallPrintDropzoneProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDropAccepted = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setError(null);
      setIsAnalyzing(true);
      toast.loading("Analyzing small print…", { id: "analyze-doc" });

      try {
        const formData = new FormData();
        formData.set("file", file);
        const result = await analyzeDocument(formData);

        if (result.ok) {
          toast.success("Analysis complete! 🚀", { id: "analyze-doc" });
          onAnalyzeComplete(result.extractedText);
        } else {
          toast.error("Failed to parse document. Please try a different format.", {
            id: "analyze-doc",
          });
          setError(result.error);
          onError?.(result.error);
        }
      } catch (e) {
        const message =
          e instanceof Error ? e.message : "Analysis failed.";
        toast.error("Failed to parse document. Please try a different format.", {
          id: "analyze-doc",
        });
        setError(message);
        onError?.(message);
      } finally {
        setIsAnalyzing(false);
      }
    },
    [onAnalyzeComplete, onError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    accept: ACCEPT,
    maxSize: MAX_SIZE_MB * 1024 * 1024,
    maxFiles: 1,
    disabled: isAnalyzing,
  });

  if (isAnalyzing) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn("space-y-4", className)}
      >
        <div className="rounded-xl border border-[var(--border)] bg-[var(--muted)]/50 p-6">
          <p className="mb-4 text-sm font-medium text-[var(--foreground)]">
            Extracting text…
          </p>
          <AnalysisProgressBar isActive />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("w-full", className)}
    >
      <div
        {...getRootProps()}
        className={cn(
          "flex min-h-[200px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-6 transition-colors sm:min-h-[240px]",
          isDragActive
            ? "border-[var(--primary)] bg-[var(--primary)]/5"
            : "border-[var(--border)] bg-[var(--muted)]/50 hover:border-[var(--primary)]/50 hover:bg-[var(--muted)]"
        )}
      >
        <input {...getInputProps()} aria-describedby="dropzone-hint dropzone-error" />
        <span className="rounded-full bg-[var(--primary)]/10 p-3 text-[var(--primary)]">
          <Upload className="size-8 sm:size-10" aria-hidden />
        </span>
        <span className="text-center text-sm font-medium text-[var(--foreground)]">
          Drag & drop your contract here, or click to browse
        </span>
        <span
          id="dropzone-hint"
          className="text-xs text-[var(--muted-foreground)]"
        >
          PDF, DOC, or DOCX — max {MAX_SIZE_MB}MB
        </span>
        <span className="text-[10px] text-[var(--muted-foreground)]">
          🔒 Your documents are encrypted and never used for AI training.
        </span>
        {error && (
          <span
            id="dropzone-error"
            className="text-sm text-[var(--destructive)]"
            role="alert"
          >
            {error}
          </span>
        )}
        <FileText className="size-10 text-[var(--muted-foreground)]/40 sm:size-12" />
      </div>
    </motion.div>
  );
}
