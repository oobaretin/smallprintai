"use server";

import { generateObject } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import { LEGAL_ANALYZER_PROMPT } from "@/lib/prompts";

// 1. Updated model name to the standard stable version
const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? "",
});

/**
 * Simplified PDF extraction using a more stable approach for Vercel.
 */
async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  try {
    const pdf = await import("pdf-parse/lib/pdf-parse.js");
    const data = await pdf.default(buffer);
    return data.text || "";
  } catch (error) {
    console.error("PDF extraction error:", error);
    return "";
  }
}

/**
 * Simplified Office extraction.
 */
async function extractTextFromOffice(buffer: Buffer): Promise<string> {
  try {
    const OfficeParser = await import("officeparser");
    const text = await OfficeParser.parseOffice(buffer);
    return typeof text === "string" ? text : "";
  } catch (error) {
    console.error("Office extraction error:", error);
    return "";
  }
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

export type FullAnalysisResult = z.infer<typeof fullAnalysisSchema>;

export async function analyzeDocumentWithAI(
  formData: FormData
): Promise<FullAnalysisResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  
  if (!apiKey) {
    throw new Error("Missing ANTHROPIC_API_KEY. Please add it to Vercel variables.");
  }

  const file = formData.get("file") as File | null;
  if (!file) throw new Error("No file uploaded.");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  let extractedText = "";

  const name = file.name.toLowerCase();

  // Route extraction based on file type
  if (name.endsWith(".pdf")) {
    extractedText = await extractTextFromPdf(buffer);
  } else if (name.endsWith(".docx") || name.endsWith(".doc")) {
    extractedText = await extractTextFromOffice(buffer);
  } else {
    throw new Error("Unsupported format. Use PDF or DOCX.");
  }

  if (!extractedText.trim()) {
    throw new Error("Could not read text from file. Is the document empty or encrypted?");
  }

  // 2. Using the widely supported model name 'claude-3-5-sonnet-latest'
  const { object } = await generateObject({
    model: anthropic("claude-3-5-sonnet-latest"),
    schema: fullAnalysisSchema,
    system: LEGAL_ANALYZER_PROMPT,
    prompt: `Analyze the following document text:\n\n${extractedText.slice(0, 15000)}`,
  });

  return object;
}