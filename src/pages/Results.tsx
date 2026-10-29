import { useEffect, useMemo, useState } from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DisclaimerBanner from "@/components/shared/DisclaimerBanner";
import { 
  Download, 
  ArrowLeft, 
  CheckCircle2,
  Info,
  Stethoscope,
  Calendar,
  FileText,
  MapPin,
  Layers,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AnalysisResult, getAnalysisResult } from "@/lib/analysisResults";
import { downloadPdfReport } from "@/lib/pdfReport";
import { saveReport } from "@/lib/reportHistory";

interface PatientInputs {
  affectedArea: string | null;
  affectedAreaId: number | null;
  areaSize: string | null;
  areaSizeId: string | null;
  duration: string | null;
  durationId: string | null;
}

const Results = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [isFindingDermatologist, setIsFindingDermatologist] = useState(false);
  const { imagePreview, fileName, patientInputs, analysisResult } = location.state || {};

  const inputs = patientInputs as PatientInputs | undefined;

  const results = useMemo(() => {
    const selectedAnalysis = (analysisResult as AnalysisResult | undefined) ??
      (imagePreview ? getAnalysisResult(imagePreview) : {
        predictedClass: "Unknown",
        confidence: 0,
        riskLevel: "Low" as const,
      });

    return {
      ...selectedAnalysis,
      analysisDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      reportId: `EPI-${Date.now().toString(36).toUpperCase()}`,
    };
  }, [analysisResult, imagePreview]);

  useEffect(() => {
    if (!imagePreview) return;

    saveReport({
      id: results.reportId,
      date: results.analysisDate,
      fileName: fileName ?? "Uploaded image",
      predictedClass: results.predictedClass,
      confidence: results.confidence,
      riskLevel: results.riskLevel,
    });
  }, [fileName, imagePreview, results]);

  // If no image data, redirect to upload
  if (!imagePreview) {
    return <Navigate to="/upload" replace />;
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "text-success bg-success/10 border-success/20";
      case "Medium": return "text-warning bg-warning/10 border-warning/20";
      case "High": return "text-destructive bg-destructive/10 border-destructive/20";
      default: return "text-muted-foreground bg-muted";
    }
  };

  const handleDownload = () => {
    try {
      const reportLines = [
        "EpiVision Insight Hub Report",
        `Report ID: ${results.reportId}`,
        `Analysis date: ${results.analysisDate}`,
        "",
        `Uploaded image: ${fileName ?? "Not provided"}`,
        `Predicted class: ${results.predictedClass}`,
        `AI confidence: ${results.confidence}%`,
        `Risk indication: ${results.riskLevel} Risk`,
        "",
        "Patient-provided clinical information",
        `Affected body area: ${inputs?.affectedArea ?? "Not provided"}`,
        `Extent of area: ${inputs?.areaSize ?? "Not provided"}`,
        `Duration of condition: ${inputs?.duration ?? "Not provided"}`,
        "",
        "This is a preliminary screening result, not a medical diagnosis.",
        "Please consult a qualified healthcare professional.",
      ];

      downloadPdfReport(reportLines, `${results.reportId}-report.pdf`);
      toast({
        title: "Report Downloaded",
        description: "Your PDF report has been saved.",
      });
    } catch (error) {
      console.error("Unable to generate PDF report", error);
      toast({
        title: "Download Failed",
        description: "The report could not be generated. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFindDermatologist = () => {
    const mapsWindow = window.open("about:blank", "_blank");

    if (!mapsWindow) {
      toast({
        title: "Popup Blocked",
        description: "Please allow popups to open the nearby dermatologist search.",
        variant: "destructive",
      });
      return;
    }

    const openNearbySearch = (url: string, description: string) => {
      mapsWindow.location.href = url;
      setIsFindingDermatologist(false);
      toast({
        title: "Dermatologist Search Opened",
        description,
      });
    };

    setIsFindingDermatologist(true);

    if (!navigator.geolocation) {
      openNearbySearch(
        "https://www.google.com/maps/search/dermatologist",
        "Showing dermatologist locations. Enable location services for a nearby search.",
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        openNearbySearch(
          `https://www.google.com/maps/search/dermatologist/@${coords.latitude},${coords.longitude},14z`,
          "Showing dermatologists near your current location.",
        );
      },
      () => {
        openNearbySearch(
          "https://www.google.com/maps/search/dermatologist",
          "Location access was unavailable, so showing a general dermatologist search.",
        );
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Link */}
          <Link 
            to="/upload" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Upload
          </Link>

          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-success/10 text-success rounded-full px-4 py-2 mb-4">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm font-medium">Analysis Complete</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              AI Assessment Summary
            </h1>
            <p className="text-muted-foreground">
              Report ID: {results.reportId}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Image & Results */}
            <div className="space-y-6 animate-slide-up">
              {/* Patient-Provided Clinical Information */}
              {inputs && (
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Patient-Provided Clinical Information
                  </h3>
                  <div className="space-y-3">
                    {inputs.affectedArea && (
                      <div className="flex items-center gap-3 bg-muted/50 rounded-lg p-3">
                        <MapPin className="w-5 h-5 text-primary shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">Affected Body Area</p>
                          <p className="font-medium">{inputs.affectedArea}</p>
                        </div>
                      </div>
                    )}
                    {inputs.areaSize && (
                      <div className="flex items-center gap-3 bg-muted/50 rounded-lg p-3">
                        <Layers className="w-5 h-5 text-primary shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">Extent of Area</p>
                          <p className="font-medium">{inputs.areaSize}</p>
                        </div>
                      </div>
                    )}
                    {inputs.duration && (
                      <div className="flex items-center gap-3 bg-muted/50 rounded-lg p-3">
                        <Clock className="w-5 h-5 text-primary shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">Duration of Condition</p>
                          <p className="font-medium">{inputs.duration}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Uploaded Image */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-display font-semibold mb-4">Analyzed Image</h3>
                <img
                  src={imagePreview}
                  alt="Analyzed lesion"
                  className="w-full rounded-xl shadow-soft"
                />
                <p className="text-xs text-muted-foreground mt-3">{fileName}</p>
              </div>

              {/* Prediction Results */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  Preliminary Screening Result
                </h3>

                <div className="space-y-4">
                  {/* Predicted Class */}
                  <div className="bg-muted/50 rounded-xl p-4">
                    <p className="text-sm text-muted-foreground mb-1">Predicted Class</p>
                    <p className="text-xl font-display font-semibold">{results.predictedClass}</p>
                  </div>

                  {/* Confidence Score */}
                  <div className="bg-muted/50 rounded-xl p-4">
                    <p className="text-sm text-muted-foreground mb-2">AI Confidence Score</p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-primary rounded-full transition-all duration-1000"
                          style={{ width: `${results.confidence}%` }}
                        />
                      </div>
                      <span className="font-display font-bold text-lg">{results.confidence}%</span>
                    </div>
                  </div>

                  {/* Risk Level */}
                  <div className={`rounded-xl p-4 border ${getRiskColor(results.riskLevel)}`}>
                    <p className="text-sm opacity-80 mb-1">Risk Indication</p>
                    <p className="text-xl font-display font-semibold">{results.riskLevel} Risk</p>
                  </div>

                  {/* Analysis Date */}
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{results.analysisDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Actions & Disclaimer */}
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
              {/* Download Report */}
              <div className="bg-gradient-primary rounded-2xl p-6 text-primary-foreground">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-lg mb-2">Download PDF Report</h3>
                    <p className="text-primary-foreground/80 text-sm mb-4">
                      Get a detailed PDF report including your clinical information to share with your healthcare provider.
                    </p>
                    <Button 
                      variant="hero" 
                      className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90"
                      onClick={handleDownload}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                  </div>
                </div>
              </div>

              {/* Consult a Dermatologist */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                    <Stethoscope className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-2">Consult a Dermatologist</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      For proper diagnosis and treatment, please schedule an appointment with a 
                      qualified dermatologist. Share this report during your consultation.
                    </p>
                    <Button
                      variant="medical"
                      onClick={handleFindDermatologist}
                      disabled={isFindingDermatologist}
                    >
                      {isFindingDermatologist ? "Finding nearby..." : "Find a Dermatologist Near You"}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <DisclaimerBanner variant="warning" showNextSteps />

              {/* Actions */}
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/dashboard">View Dashboard</Link>
                </Button>
                <Button variant="secondary" className="flex-1" asChild>
                  <Link to="/upload">New Analysis</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Results;
