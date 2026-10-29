import { AnalysisResult } from "@/lib/analysisResults";

export interface SavedReport extends AnalysisResult {
  id: string;
  date: string;
  fileName: string;
}

const REPORT_HISTORY_KEY = "epivision-report-history";

export const getSavedReports = (): SavedReport[] => {
  try {
    const storedReports = localStorage.getItem(REPORT_HISTORY_KEY);
    if (!storedReports) return [];

    const parsedReports: unknown = JSON.parse(storedReports);
    return Array.isArray(parsedReports) ? (parsedReports as SavedReport[]) : [];
  } catch (error) {
    console.error("Unable to load saved report history", error);
    return [];
  }
};

export const saveReport = (report: SavedReport) => {
  try {
    const existingReports = getSavedReports().filter((item) => item.id !== report.id);
    localStorage.setItem(
      REPORT_HISTORY_KEY,
      JSON.stringify([report, ...existingReports].slice(0, 25)),
    );
  } catch (error) {
    console.error("Unable to save report history", error);
  }
};
