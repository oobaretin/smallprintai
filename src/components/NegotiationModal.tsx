"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send, Copy, X } from "lucide-react";
import { toast } from "sonner";
import type { NegotiationDraft } from "@/lib/negotiation-types";

interface NegotiationModalProps {
  clauseTitle: string;
  draft: NegotiationDraft;
  onClose: () => void;
}

export function NegotiationModal({
  clauseTitle,
  draft,
  onClose,
}: NegotiationModalProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(draft.emailDraft);
    toast.success("Draft copied to clipboard!");
  };

  const handleFinalizeSend = () => {
    const mailto = `mailto:?subject=${encodeURIComponent(draft.subjectLine)}&body=${encodeURIComponent(draft.emailDraft)}`;
    window.open(mailto, "_blank", "noopener,noreferrer");
    toast.success("Opening your email client…");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Blur overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      {/* Modal */}
      <motion.div
        role="dialog"
        aria-labelledby="negotiation-modal-title"
        aria-modal="true"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-blue-500/30 bg-slate-900 p-6 shadow-2xl focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3
            id="negotiation-modal-title"
            className="text-xl font-bold text-white"
          >
            Negotiation Strategy: {clauseTitle}
          </h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={copyToClipboard}
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              aria-label="Copy draft to clipboard"
            >
              <Copy className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              aria-label="Close"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>

        <div className="mb-4 rounded-xl border border-white/5 bg-black/40 p-4">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-blue-400">
            Suggested Email Draft
          </p>
          <div className="whitespace-pre-line text-sm leading-relaxed text-slate-300">
            {draft.emailDraft}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
            <p className="mb-1 text-[10px] font-bold uppercase text-emerald-400">
              Proposed Wording
            </p>
            <p className="text-xs italic text-slate-400">
              &quot;{draft.alternativeClause}&quot;
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
            <p className="mb-1 text-[10px] font-bold uppercase text-amber-400">
              Leverage
            </p>
            <ul className="ml-3 list-disc text-xs text-slate-400">
              {draft.keyLeveragePoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        </div>

        <button
          type="button"
          onClick={handleFinalizeSend}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-bold text-white transition-colors hover:bg-blue-500"
        >
          <Send className="h-4 w-4" aria-hidden />
          Finalize &amp; Send
        </button>
      </motion.div>
    </motion.div>
  );
}
