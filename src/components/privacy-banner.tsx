"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";

/**
 * Short privacy notice for legal documents: processed securely, not used for training.
 */
export function PrivacyBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.3 }}
      className="flex flex-wrap items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--muted)]/50 px-4 py-3 text-sm text-[var(--muted-foreground)]"
    >
      <Lock className="size-4 shrink-0" aria-hidden />
      <span>
        Your documents are processed securely and are not used to train AI
        models.
      </span>
    </motion.div>
  );
}
