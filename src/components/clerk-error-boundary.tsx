"use client";

import React, { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Rendered when Clerk throws (e.g. invalid publishable key). */
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Catches Clerk init errors (e.g. "Publishable key not valid") and renders fallback
 * so the app still loads with static Sign In / Get Started.
 */
export class ClerkErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    if (
      error?.message?.toLowerCase().includes("publishable key") ||
      error?.message?.toLowerCase().includes("not valid")
    ) {
      console.warn(
        "[SmallPrintAI] Clerk key invalid or misconfigured. Using static Sign In / Get Started. Check NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in .env.local."
      );
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
