import { generateObject } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { zodSchema } from "ai";
import { z } from "zod";
import { NEGOTIATION_PROMPT } from "@/lib/prompts";

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? "",
});

export const maxDuration = 30;

const negotiationSchema = z.object({
  subjectLine: z.string(),
  emailDraft: z.string(),
  keyLeveragePoints: z.array(z.string()),
  alternativeClause: z.string(),
});

export type NegotiationDraft = z.infer<typeof negotiationSchema>; // re-export for API consumers; canonical type in @/lib/negotiation-types

/**
 * POST /api/negotiate — Negotiation Architect: draft counter-offer for a High/Medium risk clause.
 * Body: { originalClause: string, riskIdentified: string, userGoal?: string }
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const originalClause =
    typeof body.originalClause === "string" ? body.originalClause : "";
  const riskIdentified =
    typeof body.riskIdentified === "string" ? body.riskIdentified : "";
  const userGoal =
    typeof body.userGoal === "string"
      ? body.userGoal
      : "Fair terms and mutual protection.";

  if (!originalClause.trim() || !riskIdentified.trim()) {
    return new Response(
      JSON.stringify({
        error: "originalClause and riskIdentified are required",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const result = await generateObject({
    model: anthropic("claude-sonnet-4-20250514"),
    schema: zodSchema(negotiationSchema),
    schemaName: "NegotiationDraft",
    schemaDescription:
      "Professional email draft and alternative clause for renegotiation",
    system: NEGOTIATION_PROMPT,
    prompt: `Original Clause:\n${originalClause.slice(0, 2000)}\n\nRisk Identified: ${riskIdentified}\n\nUser's Goal: ${userGoal}`,
    maxOutputTokens: 1024,
  });

  return Response.json(result.object);
}
