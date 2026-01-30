import type { SeverityLevel } from "@/components/risk-badge";

export interface KeyTerm {
  term: string;
  definition: string;
}

export interface ImportantDate {
  label: string;
  date: string;
  context?: string;
}

export interface Obligation {
  party: string;
  obligation: string;
  deadline?: string;
}

export interface RiskItem {
  description: string;
  severity: SeverityLevel;
}

/** Overall risk level for the document (guide / API compatibility). */
export type RiskLevel = "Low" | "Medium" | "High";

export interface LegalAnalysis {
  summary: string;
  /** Plain English 2-sentence explanation (guide / API compatibility). */
  plain_english_summary?: string;
  /** Overall risk level (guide / API compatibility). */
  risk_level?: RiskLevel;
  keyTerms: KeyTerm[];
  /** Key terms as strings (guide / API compatibility). */
  key_terms?: string[];
  importantDates: ImportantDate[];
  obligations: Obligation[];
  risks: RiskItem[];
}

export interface CompareClauseData {
  clauseName: string;
  standardText: string;
  documentText: string;
}
