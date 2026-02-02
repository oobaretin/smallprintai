"use server";

import { generateObject } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import { LEGAL_ANALYZER_PROMPT } from "@/lib/prompts";

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? "",
});

/**
 * Robust PDF text extraction using pdfjs-dist (Vercel Friendly)
 */
async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  try {
    // We use the 'legacy' build which is more stable in Node.js/Vercel environments
    const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
    
    const data = new Uint8Array(buffer);
    const loadingTask = pdfjs.getDocument({
      data,
      useSystemFonts: true,
      disableFontFace: true,
    });
    
    const pdf = await loadingTask.promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(" ");
      fullText += pageText + "\n";
    }

    return fullText;
  } catch (error) {
    console.error("PDF Extraction Error:", error);
    throw new Error("Failed to read PDF content.");
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

export async function analyzeDocumentWithAI(formData: FormData) {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is missing.");

  const file = formData.get("file") as File | null;
  if (!file) throw new Error("No file uploaded.");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  let extractedText = "";

  if (file.name.toLowerCase().endsWith(".pdf")) {
    extractedText = await extractTextFromPdf(buffer);
  } else {
    throw new Error("Please upload a PDF for this version.");
  }

  if (!extractedText.trim()) {
    throw new Error("The PDF appears to be empty or an image (OCR not supported yet).");
  }

  const { object } = await generateObject({
    model: anthropic("claude-3-5-sonnet-latest"),
    schema: fullAnalysisSchema,
    system: LEGAL_ANALYZER_PROMPT,
    prompt: `Analyze this document:\n\n${extractedText.slice(0, 15000)}`,
  });

  return object;
}