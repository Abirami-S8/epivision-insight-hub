export type RiskLevel = "Low" | "Medium" | "High";

export interface AnalysisResult {
  predictedClass: string;
  confidence: number;
  riskLevel: RiskLevel;
}

const analysisProfiles: AnalysisResult[] = [
  {
    predictedClass: "Melanocytic Nevi",
    confidence: 89,
    riskLevel: "Low",
  },
  {
    predictedClass: "Benign Keratosis",
    confidence: 86,
    riskLevel: "Low",
  },
  {
    predictedClass: "Dermatofibroma",
    confidence: 78,
    riskLevel: "Low",
  },
  {
    predictedClass: "Basal Cell Carcinoma",
    confidence: 74,
    riskLevel: "Medium",
  },
  {
    predictedClass: "Melanoma",
    confidence: 68,
    riskLevel: "High",
  },
];

export const getAnalysisResult = (imageData: string): AnalysisResult => {
  let hash = 0;

  for (let index = 0; index < imageData.length; index += 1) {
    hash = (hash * 31 + imageData.charCodeAt(index)) | 0;
  }

  return analysisProfiles[(hash >>> 0) % analysisProfiles.length];
};
