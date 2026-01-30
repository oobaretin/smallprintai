import { streamText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { LEGAL_ANALYZER_PROMPT } from "@/lib/prompts";

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? "",
});

export const maxDuration = 60;

const STREAMING_OUTPUT_FORMAT = `
Respond strictly in JSON only (no markdown, no code fences). Use this structure for the UI:
{
  "summary": "2-3 sentence executive summary",
  "plain_english_summary": "Exactly 2 sentences in plain English explaining what the document means and main implications.",
  "risk_level": "Low" | "Medium" | "High",
  "key_terms": ["term1", "term2", ...],
  "keyTerms": [{"term": "string", "definition": "string"}],
  "importantDates": [{"label": "string", "date": "string", "context": "string"}],
  "obligations": [{"party": "string", "obligation": "string", "deadline": "string or null"}],
  "risks": [{"description": "string", "severity": "low" | "medium" | "high"}]
}
Limit key_terms and keyTerms to 5 each, importantDates to 5, obligations to 5, risks to 5. Use severity only as low, medium, or high. risk_level must be exactly one of Low, Medium, or High.`;

/**
 * POST /api/completion — streams legal analysis as plain text (for useCompletion).
 * Uses LEGAL_ANALYZER_PROMPT objectives; returns JSON shape for existing UI.
 * Body: { prompt?: string, documentText: string }
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

  const systemPrompt =
    LEGAL_ANALYZER_PROMPT +
    "\n\n---\n" +
    STREAMING_OUTPUT_FORMAT;

  const result = streamText({
    model: anthropic("claude-sonnet-4-20250514"),
    system: systemPrompt,
    prompt: `Analyze this document:\n\n${documentText.slice(0, 12000)}`,
    maxOutputTokens: 2048,
  });

  return result.toTextStreamResponse();
}
