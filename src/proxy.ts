import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim();
const isClerkConfigured =
  !!clerkPubKey &&
  clerkPubKey !== "your_clerk_pub_key" &&
  (clerkPubKey.startsWith("pk_test_") || clerkPubKey.startsWith("pk_live_"));

/**
 * Proxy: run Clerk middleware only when publishable key is valid.
 * When key is missing/invalid, pass through so the app still loads (static Sign In / Get Started).
 */
export default isClerkConfigured
  ? clerkMiddleware()
  : function passThrough(_req: NextRequest) {
      return NextResponse.next();
    };

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
