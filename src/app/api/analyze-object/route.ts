import { generateObject } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { zodSchema } from "ai";
import { z } from "zod";
import { LEGAL_ANALYZER_PROMPT } from "@/lib/prompts";

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? "",
});

export const maxDuration = 60;

/** Type-safe schema for LEGAL_ANALYZER_PROMPT output (Technical Excellence). */
const analysisSchema = z.object({
  summary: z.string(),
  riskScore: z.number(),
  assessments: z.array(
    z.object({
      level: z.enum(["Low", "Medium", "High"]),
      title: z.string(),
      description: z.string(),
      actionItem: z.string(),
    })
  ),
  dates: z.array(
    z.object({
      label: z.string(),
      date: z.string(),
    })
  ),
});

export type LegalAnalyzerOutput = z.infer<typeof analysisSchema>;

/**
 * POST /api/analyze-object — structured legal analysis via generateObject.
 * Body: { documentText: string }
 * Returns JSON matching analysisSchema (summary, riskScore, assessments, dates).
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const documentText =
    typeof body.documentText === "string" ? body.documentText : "";

  if (!documentText.trim()) {
    return new Response(
      JSON.stringify({ error: "documentText is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const result = await generateObject({
    model: anthropic("claude-sonnet-4-20250514"),
    schema: zodSchema(analysisSchema),
    schemaName: "LegalAnalysis",
    schemaDescription: "Structured legal document analysis with risk assessments",
    system: LEGAL_ANALYZER_PROMPT,
    prompt: `Analyze the following document text:\n\n${documentText.slice(0, 12000)}`,
    maxOutputTokens: 2048,
  });

  return result.toJsonResponse();
}
