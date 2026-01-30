import Link from "next/link";
import { Source_Serif_4 } from "next/font/google";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Privacy Policy — SmallPrintAI",
  description:
    "How SmallPrintAI handles your documents and data. Ephemeral analysis, no long-term storage, TLS encryption.",
};

const LAST_UPDATED = "January 30, 2026";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back
        </Link>

        <div className="mb-10 inline-block rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
          Last updated: {LAST_UPDATED}
        </div>

        <h1 className="font-sans text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          SmallPrintAI Privacy Policy
        </h1>
        <p className="mt-2 font-sans text-sm text-[var(--muted-foreground)]">
          Effective Date: {LAST_UPDATED}
        </p>

        <article className={`mt-12 text-[var(--foreground)] ${sourceSerif.className}`}>
          <section className="mb-10">
            <h2 className="mb-3 font-sans text-lg font-semibold text-[var(--foreground)]">
              1. Our Commitment to Your Privacy
            </h2>
            <p className="leading-relaxed text-[var(--muted-foreground)]">
              At SmallPrintAI, we believe that your legal documents are your
              business—not ours. We have designed our &quot;Professional-grade
              AI&quot; infrastructure to minimize data footprint and maximize
              security.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 font-sans text-lg font-semibold text-[var(--foreground)]">
              2. Data Processing (How We Handle Your Documents)
            </h2>
            <ul className="list-inside list-disc space-y-2 leading-relaxed text-[var(--muted-foreground)]">
              <li>
                <strong className="text-[var(--foreground)]">
                  Ephemeral Analysis:
                </strong>{" "}
                When you upload a PDF or DOCX, the text is extracted and
                processed in real-time. We do not use your documents to train our
                underlying AI models.
              </li>
              <li>
                <strong className="text-[var(--foreground)]">
                  No Long-Term Storage:
                </strong>{" "}
                Unless you explicitly save a report to your &quot;My
                Documents&quot; dashboard, uploaded files are deleted from our
                temporary processing cache immediately after the analysis is
                complete.
              </li>
              <li>
                <strong className="text-[var(--foreground)]">Encryption:</strong>{" "}
                All document transfers are protected by TLS 1.3 encryption,
                ensuring that your data remains private between your browser and
                our secure servers.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 font-sans text-lg font-semibold text-[var(--foreground)]">
              3. AI Transparency
            </h2>
            <ul className="list-inside list-disc space-y-2 leading-relaxed text-[var(--muted-foreground)]">
              <li>
                <strong className="text-[var(--foreground)]">
                  Third-Party Processing:
                </strong>{" "}
                To provide high-fidelity insights, we utilize specialized AI
                sub-processors (like OpenAI or Anthropic). These partners are
                bound by strict data privacy agreements that prohibit them from
                using your data for their own purposes.
              </li>
              <li>
                <strong className="text-[var(--foreground)]">
                  Human-in-the-Loop:
                </strong>{" "}
                SmallPrintAI provides automated analysis. We encourage all users
                to treat our &quot;Risk Assessments&quot; as guidance, not
                formal legal advice.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 font-sans text-lg font-semibold text-[var(--foreground)]">
              4. Your Rights
            </h2>
            <p className="leading-relaxed text-[var(--muted-foreground)]">
              You retain full ownership of all documents and the resulting
              analysis. You may request the deletion of your account and all
              associated metadata at any time through your &quot;Smart
              Navigation&quot; profile settings.
            </p>
          </section>
        </article>

        <footer className="mt-16 border-t border-[var(--border)] pt-8 text-center text-sm text-[var(--muted-foreground)]">
          <Link href="/" className="text-[var(--primary)] hover:underline">
            Return home
          </Link>
        </footer>
      </main>
    </div>
  );
}
