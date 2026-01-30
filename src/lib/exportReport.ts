import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { FullAnalysisResult } from "@/app/actions/analyze";

/**
 * Generates and downloads a professional PDF report from full analysis data.
 * Uses SmallPrintAI branding and color-coded risk levels (High=rose, Medium=amber).
 */
export function downloadPDFReport(data: FullAnalysisResult): void {
  const doc = new jsPDF();
  const timestamp = new Date().toLocaleDateString();

  // 1. Header & Branding
  doc.setFontSize(22);
  doc.setTextColor(30, 41, 59); // Slate-800
  doc.text("SmallPrintAI Analysis Report", 14, 22);

  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139); // Slate-400
  doc.text(`Generated on: ${timestamp}`, 14, 30);
  doc.text("Confidential Legal Analysis", 140, 30);

  // 2. Executive Summary
  doc.setFontSize(14);
  doc.setTextColor(51, 65, 85); // Slate-700
  doc.text("Executive Summary", 14, 45);

  doc.setFontSize(11);
  doc.setTextColor(71, 85, 105); // Slate-600
  const splitSummary = doc.splitTextToSize(data.summary, 180);
  doc.text(splitSummary, 14, 52);

  // 3. Risk Assessment Table
  doc.setFontSize(14);
  doc.setTextColor(51, 65, 85);
  doc.text("Risk Assessments", 14, 80);

  autoTable(doc, {
    startY: 85,
    head: [["Risk Level", "Issue", "Recommendation"]],
    body: data.assessments.map((a) => [
      a.level.toUpperCase(),
      a.title,
      a.actionItem,
    ]),
    headStyles: { fillColor: [30, 41, 59] },
    columnStyles: {
      0: { cellWidth: 30, fontStyle: "bold" },
      1: { cellWidth: 70 },
      2: { cellWidth: 80 },
    },
    didParseCell: (hookData) => {
      if (hookData.section === "body" && hookData.column.index === 0) {
        const raw = String(hookData.cell.raw);
        if (raw === "HIGH")
          hookData.cell.styles.textColor = [225, 29, 72] as [number, number, number]; // Rose-600
        if (raw === "MEDIUM")
          hookData.cell.styles.textColor = [217, 119, 6] as [number, number, number]; // Amber-600
      }
    },
  });

  // 4. Save the file
  const safeDate = timestamp.replace(/\//g, "-");
  doc.save(`SmallPrintAI_Report_${safeDate}.pdf`);
}
