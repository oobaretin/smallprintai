"use server";

import { generateObject } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import { LEGAL_ANALYZER_PROMPT } from "@/lib/prompts";

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? "",
});

const fullAnalysisSchema = z.object({
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
  milestones: z.array(
    z.object({
      label: z.string(),
      date: z.string(),
      type: z.enum(["deadline", "renewal", "payment"]),
      urgency: z.enum(["critical", "standard"]),
    })
  ),
});

export type FullAnalysisResult = z.infer<typeof fullAnalysisSchema>;

export async function analyzeDocumentWithAI(formData: FormData): Promise<FullAnalysisResult> {
  try {
    const file = formData.get("file") as File | null;
    if (!file) throw new Error("No file uploaded.");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // This is the specific fix for the squiggly line/Vercel crash
    // We use a standard require inside the server action
    const pdf = require("pdf-parse");
    const data = await pdf(buffer);
    const extractedText = data.text;

    if (!extractedText || extractedText.trim().length < 10) {
      throw new Error("Could not extract text. Try a different PDF.");
    }

    const { object } = await generateObject({
      model: anthropic("claude-3-5-sonnet-latest"),
      schema: fullAnalysisSchema,
      system: LEGAL_ANALYZER_PROMPT,
      prompt: `Analyze this document text:\n\n${extractedText.slice(0, 15000)}`,
    });

    return object as FullAnalysisResult;
  } catch (error: any) {
    console.error("Server Action Error:", error);
    throw new Error(error.message || "Analysis failed.");
  }
}