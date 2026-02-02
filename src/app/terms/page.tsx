import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";

// We keep the metadata separate and simple to avoid the red squiggly lines
export const metadata = {
  title: "Terms of Service — SmallPrintAI",
  description: "Terms of Service for SmallPrintAI document analysis.",
};

const LAST_UPDATED = "January 30, 2026";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 py-12 sm:px-10 sm:py-16 lg:px-16 mt-10">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="mb-6 inline-block rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-slate-500">
          Last updated: {LAST_UPDATED}
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-2">
          SmallPrintAI Terms of Service
        </h1>
        <p className="text-sm text-slate-500 mb-10">
          Effective Date: {LAST_UPDATED}
        </p>

        <article className="text-slate-700 space-y-10">
          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="leading-relaxed">
              By accessing or using SmallPrintAI (&quot;Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              2. Description of Service
            </h2>
            <p className="leading-relaxed">
              SmallPrintAI provides AI-powered analysis of legal documents. The Service is for informational purposes only and does not constitute legal advice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              3. Use of the Service
            </h2>
            <ul className="list-inside list-disc space-y-2 leading-relaxed">
              <li>Provide accurate information for your account.</li>
              <li>Use the Service only for lawful purposes.</li>
              <li>You are responsible for your account security.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              4. No Legal Advice
            </h2>
            <p className="leading-relaxed font-medium text-slate-900">
              SmallPrintAI does not provide legal, tax, or professional advice. Our outputs are guidance only.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              5. Intellectual Property
            </h2>
            <p className="leading-relaxed">
              You retain ownership of documents you upload. By using the Service, you grant us a limited license to process your documents solely to provide the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              6. Limitation of Liability
            </h2>
            <p className="leading-relaxed">
              SmallPrintAI shall not be liable for any indirect or consequential damages arising from your use of the Service.
            </p>
          </section>
        </article>

        <footer className="mt-16 border-t border-slate-100 pt-8 text-center text-sm text-slate-500">
          <Link href="/" className="text-emerald-600 hover:underline">
            Return home
          </Link>
        </footer>
      </main>
    </div>
  );
}