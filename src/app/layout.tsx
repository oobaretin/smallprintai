import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import { ClerkErrorBoundary } from "@/components/clerk-error-boundary";
import "./globals.css";

const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim();
const isClerkConfigured =
  !!clerkPubKey &&
  clerkPubKey !== "your_clerk_pub_key" &&
  (clerkPubKey.startsWith("pk_test_") || clerkPubKey.startsWith("pk_live_"));

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  preload: false, // avoids "preloaded but not used" warning when serif is used below the fold
});

export const metadata: Metadata = {
  title: "SmallPrintAI — Understand the small print before you sign",
  description:
    "Analyze contracts and documents for key terms, dates, and obligations. Legal clarity in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const body = (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
      >
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );

  return isClerkConfigured ? (
    <ClerkErrorBoundary fallback={body}>
      <ClerkProvider>
        {body}
      </ClerkProvider>
    </ClerkErrorBoundary>
  ) : (
    body
  );
}
