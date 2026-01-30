"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { ClerkNavFallback, StaticNavActions } from "@/components/clerk-nav-fallback";

/** Clerk publishable key valid (pk_test_... or pk_live_...) — used when error boundary fallback is active. */
const isClerkConfigured = () => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim();
  return (
    !!key &&
    key !== "your_clerk_pub_key" &&
    (key.startsWith("pk_test_") || key.startsWith("pk_live_"))
  );
};

/**
 * Auth actions when Clerk is configured: official SignedIn / SignedOut with Clerk components.
 */
function ClerkNavActions() {
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <button
            type="button"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Sign In
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#475569] text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:bg-[#334155] transition-all"
          >
            Get Started
          </motion.button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-9 w-9",
            },
          }}
        />
      </SignedIn>
    </>
  );
}

/**
 * SmallPrintAI Navbar: logo (serif), auth via Clerk (SignedIn/SignedOut) or static links when Clerk unavailable.
 */
export function Navbar() {
  const useClerk = isClerkConfigured();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-serif font-bold tracking-tight text-slate-900">
            SmallPrint AI
          </span>
        </Link>

        <div className="flex items-center gap-8">
          {useClerk ? (
            <ClerkNavFallback
              clerkNav={<ClerkNavActions />}
              staticNav={<StaticNavActions />}
            />
          ) : (
            <StaticNavActions />
          )}
        </div>
      </div>
    </nav>
  );
}
