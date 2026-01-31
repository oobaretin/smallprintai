import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare, HelpCircle } from "lucide-react";
import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "Contact Support — SmallPrintAI",
  description:
    "Get in touch with SmallPrintAI support. Questions, feedback, or help with legal document analysis.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />

      <main className="mx-auto max-w-2xl px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back
        </Link>

        <h1 className="font-sans text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Contact Support
        </h1>
        <p className="mt-2 font-sans text-[var(--muted-foreground)]">
          Have a question, feedback, or need help? We&apos;re here to assist.
        </p>

        <div className="mt-12 space-y-8">
          <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                <Mail className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h2 className="font-sans text-lg font-semibold text-[var(--foreground)]">
                  Email support
                </h2>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                  For account, billing, or technical issues, email us and we&apos;ll respond as soon as we can.
                </p>
                <a
                  href="mailto:support@smallprintai.com"
                  className="mt-3 inline-block text-sm font-medium text-[var(--primary)] hover:underline"
                >
                  support@smallprintai.com
                </a>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                <MessageSquare className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h2 className="font-sans text-lg font-semibold text-[var(--foreground)]">
                  Feedback &amp; feature requests
                </h2>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                  We&apos;d love to hear how we can improve SmallPrintAI. Send suggestions to the same email above with the subject &quot;Feedback&quot;.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                <HelpCircle className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h2 className="font-sans text-lg font-semibold text-[var(--foreground)]">
                  Help &amp; documentation
                </h2>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                  Check our{" "}
                  <Link href="/privacy" className="text-[var(--primary)] hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms" className="text-[var(--primary)] hover:underline">
                    Terms of Service
                  </Link>{" "}
                  for more information about how we work.
                </p>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-16 border-t border-[var(--border)] pt-8 text-center text-sm text-[var(--muted-foreground)]">
          <Link href="/" className="text-[var(--primary)] hover:underline">
            Return home
          </Link>
        </footer>
      </main>
    </div>
  );
}
