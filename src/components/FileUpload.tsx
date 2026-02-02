"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { analyzeDocumentWithAI } from "@/app/actions/analyze";
import type { FullAnalysisResult } from "@/app/actions/analyze";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const MAX_SIZE_MB = 10;

export interface FileUploadProps {
  onAnalysisComplete: (data: FullAnalysisResult) => void;
  className?: string;
}

export function FileUpload({ onAnalysisComplete, className }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      toast.success("File ready for analysis!");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/msword": [".doc"],
    },
    maxSize: MAX_SIZE_MB * 1024 * 1024,
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await analyzeDocumentWithAI(formData);
      onAnalysisComplete(result);
      toast.success("Analysis complete!");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error processing document";
      toast.error(message);
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={cn("w-full max-w-2xl mx-auto p-4 relative z-[100]", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-2xl p-10 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[240px]",
          isDragActive
            ? "border-blue-500 bg-blue-500/10 scale-[1.02]"
            : "border-slate-700 hover:border-slate-500 bg-slate-900/50"
        )}
      >
        <input {...getInputProps()} />
        <div className="bg-slate-800 p-4 rounded-full mb-4 text-blue-400">
          <Upload className={cn("h-8 w-8 transition-transform", isDragActive && "scale-110")} />
        </div>
        <h3 className="text-xl font-semibold text-white">
          {isDragActive ? "Drop to Upload" : "Upload Legal Document"}
        </h3>
        <p className="text-slate-400 text-sm mt-2 text-center">
          Drag & drop your PDF or DOCX here, or click to browse.
          <br />
          <span className="text-xs italic text-slate-500">Max size: {MAX_SIZE_MB}MB</span>
        </p>
      </div>

      <AnimatePresence>
        {file && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 p-4 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <FileText className="text-blue-400 h-5 w-5 shrink-0" />
              <span className="text-sm text-slate-200 font-medium truncate">
                {file.name}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents triggering the dropzone
                  setFile(null);
                }}
                className="text-slate-500 hover:text-red-400 p-1"
              >
                <X className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpload();
                }}
                disabled={isUploading}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
              >
                {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Run Analysis"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}