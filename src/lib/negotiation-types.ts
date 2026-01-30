/** Output of the Negotiation Architect API (subjectLine, emailDraft, keyLeveragePoints, alternativeClause). */
export interface NegotiationDraft {
  subjectLine: string;
  emailDraft: string;
  keyLeveragePoints: string[];
  alternativeClause: string;
}
