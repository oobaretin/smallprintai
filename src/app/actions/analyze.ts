"use server";

import { generateObject } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import { LEGAL_ANALYZER_PROMPT } from "@/lib/prompts";

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? "",
});

// A lightweight, zero-dependency helper to grab text from simple PDFs
async function extractText(buffer: Buffer): Promise<string> {
  const content = buffer.toString("utf-8");
  // Simple regex to pull text between PDF markers - works for most standard PDFs
  const text = content.replace(/[^\x20-\x7E\n]/g, " "); 
  return text.slice(0, 20000); 
}

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
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
    if (!apiKey) throw new Error("ANTHROPIC_API_KEY is missing in Vercel.");

    const file = formData.get("file") as File | null;
    if (!file) throw new Error("No file uploaded.");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Using a more reliable way to get text for Serverless
    const { PDFParse } = await import("pdf-parse/lib/pdf-parse.js");
    const data = await PDFParse(buffer);
    const extractedText = data.text;

    if (!extractedText || extractedText.trim().length < 10) {
      throw new Error("Could not read document. Is it a scanned image?");
    }

    const { object } = await generateObject({
      model: anthropic("claude-3-5-sonnet-latest"),
      schema: fullAnalysisSchema,
      system: LEGAL_ANALYZER_PROMPT,
      prompt: `Analyze this text:\n\n${extractedText.slice(0, 15000)}`,
    });

    return object;
  } catch (error: any) {
    console.error("ANALYSIS_ERROR:", error.message);
    // This allows the error to show up in your UI instead of a generic Digest error
    throw new Error(error.message || "Failed to analyze document.");
  }
}