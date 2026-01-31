"use server";

import { generateObject, streamText } from "ai";
import { zodSchema } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import OfficeParser from "officeparser";
import { z } from "zod";
import { LEGAL_ANALYZER_PROMPT } from "@/lib/prompts";

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? "",
});

/**
 * Extracts text from a PDF buffer. Uses pdf-parse (PDFParse class) in Node runtime.
 * Falls back to empty string if parsing fails (e.g. in Edge or missing deps).
 */
async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  try {
    const { PDFParse } = await import("pdf-parse");
    const parser = new PDFParse({ data: new Uint8Array(buffer) });
    const result = await parser.getText();
    await parser.destroy();
    return result?.text ?? "";
  } catch {
    return "";
  }
}

/**
 * Extracts text from DOCX/Office buffer via officeparser.
 */
async function extractTextFromOffice(buffer: Buffer): Promise<string> {
  try {
    const ast = await OfficeParser.parseOffice(buffer);
    return (typeof ast.toText === "function" ? ast.toText() : "") ?? "";
  } catch {
    return "";
  }
}

/** Result of server-side document analysis (extraction only). */
export type AnalyzeDocumentResult =
  | { ok: true; extractedText: string; textLength: number; preview: string }
  | { ok: false; error: string };

/**
 * Professional-grade server action: extracts text from PDF or DOCX server-side.
 * Keeps API keys secure and frontend fast. Use for "Lightning Fast" multi-format support.
 */
export async function analyzeDocument(
  formData: FormData
): Promise<AnalyzeDocumentResult> {
  const file = formData.get("file") as File | null;
  if (!file) {
    return { ok: false, error: "No file uploaded." };
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  let extractedText = "";

  const type = file.type?.toLowerCase() ?? "";
  const name = (file.name ?? "").toLowerCase();

  if (type === "application/pdf" || name.endsWith(".pdf")) {
    extractedText = await extractTextFromPdf(buffer);
    if (!extractedText.trim()) {
      return {
        ok: false,
        error:
          "Could not extract text from this PDF. Try copying and pasting the text instead.",
      };
    }
  } else if (
    type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    name.endsWith(".docx") ||
    name.endsWith(".doc")
  ) {
    extractedText = await extractTextFromOffice(buffer);
    if (!extractedText.trim()) {
      return {
        ok: false,
        error:
          "Could not extract text from this document. Try PDF or paste the text.",
      };
    }
  } else {
    return {
      ok: false,
      error: "Unsupported format. Please upload PDF or DOCX.",
    };
  }

  const text = extractedText.trim();
  return {
    ok: true,
    extractedText: text,
    textLength: text.length,
    preview: text.substring(0, 200) + (text.length > 200 ? "..." : ""),
  };
}

/** Schema for full document analysis (extract + AI in one call). */
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

/**
 * Server Action: extract text from uploaded file (PDF/DOCX) and run AI analysis in one call.
 * Returns structured analysis (summary, riskScore, assessments, milestones) for the home-page flow.
 */
export async function analyzeDocumentWithAI(
  formData: FormData
): Promise<FullAnalysisResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Add it to .env.local (and Vercel env vars for production)."
    );
  }

  const extractResult = await analyzeDocument(formData);
  if (!extractResult.ok) {
    throw new Error(extractResult.error);
  }

  const { object } = await generateObject({
    model: anthropic("claude-sonnet-4-20250514"),
    schema: zodSchema(fullAnalysisSchema),
    schemaName: "LegalAnalysis",
    schemaDescription:
      "Structured legal document analysis with risk assessments and milestones",
    system: LEGAL_ANALYZER_PROMPT,
    prompt: `Analyze the following document text:\n\n${extractResult.extractedText.slice(0, 12000)}`,
    maxOutputTokens: 2048,
  });

  return object;
}

/**
 * Server Action: streams a legal analysis (Key Terms, Important Dates, Obligations)
 * from uploaded document text. Uses Vercel AI SDK + Anthropic.
 */
export async function streamLegalAnalysis(documentText: string) {
  if (!documentText?.trim()) {
    throw new Error("No document text provided.");
  }

  const systemPrompt = `You are a legal document analyst. Analyze the provided contract/document and respond with a structured legal analysis in the following JSON shape only (no markdown, no code fences):
{
  "summary": "2-3 sentence executive summary",
  "keyTerms": [{"term": "string", "definition": "string"}],
  "importantDates": [{"label": "string", "date": "string", "context": "string"}],
  "obligations": [{"party": "string", "obligation": "string", "deadline": "string or null"}],
  "risks": [{"description": "string", "severity": "low" | "medium" | "high"}]
}
Limit keyTerms to 5, importantDates to 5, obligations to 5, risks to 5. Use severity only as low, medium, or high.`;

  const result = streamText({
    model: anthropic("claude-sonnet-4-20250514"),
    system: systemPrompt,
    prompt: `Analyze this document:\n\n${documentText.slice(0, 12000)}`,
    maxOutputTokens: 2048,
  });

  return result.toTextStreamResponse();
}

/**
 * Server Action: parse uploaded file (PDF buffer or plain text) and return extracted text.
 */
export async function extractDocumentText(
  formData: FormData
): Promise<{ text: string; error?: string }> {
  const file = formData.get("file") as File | null;
  if (!file) {
    return { text: "", error: "No file provided." };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const name = (file.name ?? "").toLowerCase();

  if (name.endsWith(".pdf")) {
    const text = await extractTextFromPdf(buffer);
    if (!text.trim()) {
      return {
        text: "",
        error:
          "Could not extract text from this PDF. Try copying and pasting the text instead.",
      };
    }
    return { text: text.trim() };
  }

  if (name.endsWith(".doc") || name.endsWith(".docx")) {
    const text = await extractTextFromOffice(buffer);
    if (!text.trim()) {
      return {
        text: "",
        error:
          "Could not extract text from this document. Try PDF or paste the text.",
      };
    }
    return { text: text.trim() };
  }

  return { text: "", error: "Unsupported file type. Use PDF or paste text." };
}
