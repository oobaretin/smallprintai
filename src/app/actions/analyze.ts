"use server";

import { generateObject } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import { LEGAL_ANALYZER_PROMPT } from "@/lib/prompts";
// Use standard import now that we fixed next.config
import pdf from "pdf-parse";

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

export async function analyzeDocumentWithAI(formData: FormData) {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is missing in Vercel.");

  const file = formData.get("file") as File | null;
  if (!file) throw new Error("No file selected.");

  const buffer = Buffer.from(await file.arrayBuffer());
  let extractedText = "";

  try {
    if (file.name.toLowerCase().endsWith(".pdf")) {
      const data = await pdf(buffer);
      extractedText = data.text;
    } else {
      // For now, let's focus on getting PDF working 100%
      throw new Error("Please upload a PDF for this test.");
    }

    if (!extractedText.trim()) throw new Error("Could not extract text.");

    const { object } = await generateObject({
      model: anthropic("claude-3-5-sonnet-latest"),
      schema: fullAnalysisSchema,
      system: LEGAL_ANALYZER_PROMPT,
      prompt: `Analyze this document:\n\n${extractedText.slice(0, 15000)}`,
    });

    return object;
  } catch (error: any) {
    console.error("Analysis Error:", error);
    throw new Error(error.message || "Server Error during analysis");
  }
}