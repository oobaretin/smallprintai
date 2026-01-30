"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Language", "Contracts", "Rights", "Future"];

/**
 * Typewriter-style hero header: rotating word in brackets with Framer Motion.
 * Matches the reference design with gradient, emerald brackets, and bold red italic word.
 */
export function HeroHeader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center py-20 px-4 bg-gradient-to-b from-white to-blue-50/30">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight"
      >
        Professional AI Analysis That <br className="hidden md:block" />
        <span className="text-slate-700">Speaks Your </span>
        <span className="relative inline-block whitespace-nowrap">
          <span className="text-emerald-600" aria-hidden>
            [
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={words[index]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="italic text-red-600 px-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {words[index]}
            </motion.span>
          </AnimatePresence>
          <span className="text-emerald-600" aria-hidden>
            ]
          </span>
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
      >
        Turn complex legal documents into clear, actionable insights. Built for
        professionals who demand both speed and accuracy.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Link
          href="/dashboard"
          className="px-8 py-4 bg-gradient-to-r from-slate-700 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-200 transition-all"
        >
          Start Free Trial
        </Link>
        <Link
          href="#upload"
          className="px-8 py-4 bg-white text-slate-700 font-semibold border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
        >
          Watch Demo
        </Link>
      </motion.div>
    </div>
  );
}
