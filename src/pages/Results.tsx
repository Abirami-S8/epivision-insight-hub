import { useLocation, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DisclaimerBanner from "@/components/shared/DisclaimerBanner";
import { 
  Download, 
  ArrowLeft, 
  AlertTriangle,
  CheckCircle2,
  Info,
  Stethoscope,
  Calendar,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Results = () => {
  const location = useLocation();
  const { toast } = useToast();
  const { imagePreview, fileName } = location.state || {};

  // If no image data, redirect to upload
  if (!imagePreview) {
    return <Navigate to="/upload" replace />;
  }

  // Mock AI results
  const results = {
    predictedClass: "Melanocytic Nevi",
    confidence: 89,
    riskLevel: "Low" as "Low" | "Medium" | "High",
    analysisDate: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    reportId: `EPI-${Date.now().toString(36).toUpperCase()}`,
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "text-success bg-success/10 border-success/20";
      case "Medium": return "text-warning bg-warning/10 border-warning/20";
      case "High": return "text-destructive bg-destructive/10 border-destructive/20";
      default: return "text-muted-foreground bg-muted";
    }
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your PDF report is being generated...",
    });
    // In real app, generate and download PDF
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
                    <p className="text-sm text-muted-foreground mb-2">Model Confidence</p>
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
                      Get a detailed PDF report to share with your healthcare provider.
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
                    <Button variant="medical">
                      Find a Dermatologist Near You
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
