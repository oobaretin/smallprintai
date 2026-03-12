import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";

// We keep the metadata separate and simple to avoid the red squiggly lines
export const metadata = {
  title: "Terms of Service — SmallPrintsAI",
  description:
    "Terms of Service for SmallPrintsAI. Use of our AI-powered legal document analysis tool.",
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

        <h1 className="font-sans text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          SmallPrintsAI Terms of Service
        </h1>
        <p className="text-sm text-slate-500 mb-10">
          Effective Date: {LAST_UPDATED}
        </p>

        <article className="text-slate-700 space-y-10">
          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="leading-relaxed text-[var(--muted-foreground)]">
              By accessing or using SmallPrintsAI (&quot;Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service. We may update these terms from time to time; continued use after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              2. Description of Service
            </h2>
            <p className="leading-relaxed text-[var(--muted-foreground)]">
              SmallPrintsAI provides AI-powered analysis of legal documents (e.g., PDFs and DOCX files), including risk assessments, summaries, and negotiation guidance. The Service is for informational and decision-support purposes only and does not constitute legal advice.
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
            <p className="leading-relaxed text-[var(--muted-foreground)]">
              SmallPrintsAI does not provide legal, tax, or professional advice. Our outputs are guidance only. You should consult a qualified professional for decisions that have legal or financial consequences.
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
            <p className="leading-relaxed text-[var(--muted-foreground)]">
              To the maximum extent permitted by law, SmallPrintsAI and its affiliates shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service. Our total liability shall not exceed the amount you paid us in the twelve months preceding the claim.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 font-sans text-lg font-semibold text-[var(--foreground)]">
              7. Termination
            </h2>
            <p className="leading-relaxed text-[var(--muted-foreground)]">
              We may suspend or terminate your access to the Service at any time for violation of these terms or for any other reason. You may stop using the Service at any time. Provisions that by their nature should survive (e.g., liability limits, intellectual property) will survive termination.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 font-sans text-lg font-semibold text-[var(--foreground)]">
              8. Contact
            </h2>
            <p className="leading-relaxed text-[var(--muted-foreground)]">
              For questions about these Terms of Service, please contact us via our{" "}
              <Link href="/contact" className="text-[var(--primary)] hover:underline">
                Contact
              </Link>{" "}
              page.
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