import type { ImportantDate, Obligation } from "@/lib/analysis-types";
import type { Milestone } from "@/components/ProfessionalInsights";

/** Parse a date string; returns null if unparseable. */
function parseDate(dateStr: string): Date | null {
  const trimmed = dateStr.trim();
  const d = new Date(trimmed);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** True if the date is within the next 30 days (critical). */
function isWithinNext30Days(dateStr: string): boolean {
  const d = parseDate(dateStr);
  if (!d) return false;
  const now = new Date();
  const in30 = new Date(now);
  in30.setDate(in30.getDate() + 30);
  return d >= now && d <= in30;
}

/** Infer milestone type from label/context. */
function inferType(
  label: string,
  context?: string
): "deadline" | "renewal" | "payment" {
  const text = `${label} ${context ?? ""}`.toLowerCase();
  if (/renew|renewal|auto-renew/.test(text)) return "renewal";
  if (/payment|pay|fee|due/.test(text)) return "payment";
  return "deadline";
}

/**
 * Convert LegalAnalysis dates + obligations into milestones for ProfessionalInsights.
 * Dates within the next 30 days are marked urgency: "critical".
 */
export function deriveMilestones(
  importantDates: ImportantDate[],
  obligations: Obligation[]
): Milestone[] {
  const items: Milestone[] = [];

  for (const d of importantDates) {
    items.push({
      label: d.label,
      date: d.date,
      type: inferType(d.label, d.context),
      urgency: isWithinNext30Days(d.date) ? "critical" : "standard",
    });
  }

  for (const ob of obligations) {
    if (!ob.deadline) continue;
    items.push({
      label: `${ob.party}: ${ob.obligation.slice(0, 60)}${ob.obligation.length > 60 ? "…" : ""}`,
      date: ob.deadline,
      type: "deadline",
      urgency: isWithinNext30Days(ob.deadline) ? "critical" : "standard",
    });
  }

  // Sort by date where parseable, then by label
  items.sort((a, b) => {
    const da = parseDate(a.date)?.getTime();
    const db = parseDate(b.date)?.getTime();
    if (da != null && db != null) return da - db;
    if (da != null) return -1;
    if (db != null) return 1;
    return a.label.localeCompare(b.label);
  });

  return items;
}
