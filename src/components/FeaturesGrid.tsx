"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  Zap,
  ShieldCheck,
  BarChart3,
  Clock,
  Globe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const features: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "AI-Powered Analysis",
    description:
      "Professional-grade extraction of key terms, dates, and obligations using state-of-the-art LLMs.",
    icon: Search,
  },
  {
    title: "Lightning Fast",
    description:
      "Complete document analysis in under 60 seconds, allowing you to move at the speed of business.",
    icon: Zap,
  },
  {
    title: "Risk Assessment",
    description:
      "Color-coded indicators with plain English explanations of complex legal liabilities.",
    icon: ShieldCheck,
  },
  {
    title: "Real-time Analytics",
    description:
      "Visualize contract density and obligation types through our intuitive insights dashboard.",
    icon: BarChart3,
  },
  {
    title: "Smart Deadlines",
    description:
      "Never miss a renewal or termination window with automated milestone tracking.",
    icon: Clock,
  },
  {
    title: "Multi-Format Support",
    description:
      "Seamlessly process PDF, DOC, and DOCX files with high-fidelity text extraction.",
    icon: Globe,
  },
];

/**
 * Professional-Grade Features grid: six feature cards with icons, scroll-in animation.
 */
export function FeaturesGrid() {
  return (
    <section
      id="features"
      className="py-24 bg-white"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2
            id="features-heading"
            className="text-4xl font-bold text-slate-900 tracking-tight"
          >
            Professional-Grade Features
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            Everything you need to analyze legal documents with confidence and
            precision.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="mb-4 inline-block p-3 rounded-xl bg-slate-50 text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
