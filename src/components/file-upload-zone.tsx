"use client";

import { motion } from "framer-motion";
import { FileText, Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

const ACCEPT = ".pdf,.doc,.docx";
const MAX_SIZE_MB = 10;

export interface FileUploadZoneProps {
  onFileSelect?: (file: File) => void;
  className?: string;
}

/**
 * Drag-and-drop zone for PDF/DOCX uploads. Mobile-first, accessible.
 */
export function FileUploadZone({ onFileSelect, className }: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback((file: File): string | null => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    const allowed = ["pdf", "doc", "docx"];
    if (!ext || !allowed.includes(ext)) {
      return "Please upload a PDF, DOC, or DOCX file.";
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return `File must be under ${MAX_SIZE_MB}MB.`;
    }
    return null;
  }, []);

  const handleFile = useCallback(
    (file: File | null) => {
      setError(null);
      if (!file) return;
      const err = validate(file);
      if (err) {
        setError(err);
        return;
      }
      onFileSelect?.(file);
    },
    [onFileSelect, validate]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFile(e.dataTransfer.files[0] ?? null);
    },
    [handleFile]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFile(e.target.files?.[0] ?? null);
      e.target.value = "";
    },
    [handleFile]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("w-full", className)}
    >
      <label
        className={cn(
          "flex min-h-[200px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-6 transition-colors sm:min-h-[240px]",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-[var(--border)] bg-[var(--muted)]/50 hover:border-primary/50 hover:bg-[var(--muted)]",
          className
        )}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        <input
          type="file"
          accept={ACCEPT}
          onChange={onInputChange}
          className="sr-only"
          aria-describedby="upload-hint upload-error"
        />
        <span className="rounded-full bg-[var(--primary)]/10 p-3 text-[var(--primary)]">
          <Upload className="size-8 sm:size-10" aria-hidden />
        </span>
        <span className="text-center text-sm font-medium text-[var(--foreground)]">
          Drag & drop your contract here, or click to browse
        </span>
        <span
          id="upload-hint"
          className="text-xs text-[var(--muted-foreground)]"
        >
          PDF, DOC, or DOCX — max {MAX_SIZE_MB}MB
        </span>
        {error && (
          <span
            id="upload-error"
            className="text-sm text-[var(--destructive)]"
            role="alert"
          >
            {error}
          </span>
        )}
        <FileText className="size-10 text-[var(--muted-foreground)]/40 sm:size-12" />
      </label>
    </motion.div>
  );
}
