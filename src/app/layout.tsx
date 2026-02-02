import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

// 1. Safe Font Setup - Simplified to remove common Next.js build errors
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

// 2. Safe Clerk Check - Uses "Optional Chaining" (?.) to stop the red lines
const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const isClerkConfigured = !!(
  clerkPubKey && 
  clerkPubKey.length > 0 && 
  (clerkPubKey.startsWith("pk_test_") || clerkPubKey.startsWith("pk_live_"))
);

export const metadata: Metadata = {
  title: "SmallPrintAI — Understand the small print before you sign",
  description: "Analyze contracts and documents for legal clarity in minutes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // We define the base HTML structure here
  const content = (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );

  // 3. Conditional Wrap - Only use Clerk if the key is actually present
  if (isClerkConfigured) {
    return (
      <ClerkProvider publishableKey={clerkPubKey}>
        {content}
      </ClerkProvider>
    );
  }

  return content;
}