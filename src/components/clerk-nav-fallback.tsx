"use client";

import React, { Component, type ReactNode } from "react";
import Link from "next/link";

interface Props {
  clerkNav: ReactNode;
  staticNav: ReactNode;
}

interface State {
  useStatic: boolean;
}

/**
 * Renders clerkNav; if Clerk context is missing (e.g. error boundary fallback), catches and renders staticNav.
 */
export class ClerkNavFallback extends Component<Props, State> {
  state: State = { useStatic: false };

  static getDerivedStateFromError(): State {
    return { useStatic: true };
  }

  componentDidCatch() {
    this.setState({ useStatic: true });
  }

  render() {
    if (this.state.useStatic) {
      return this.props.staticNav;
    }
    return this.props.clerkNav;
  }
}

export function StaticNavActions() {
  return (
    <>
      <Link
        href="/signin"
        className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
      >
        Sign In
      </Link>
      <Link
        href="/dashboard"
        className="inline-block bg-[#475569] text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:bg-[#334155] transition-all"
      >
        Get Started
      </Link>
    </>
  );
}
