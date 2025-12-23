import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DisclaimerBanner from "@/components/shared/DisclaimerBanner";
import StepIndicator from "@/components/upload/StepIndicator";
import BodyAreaSelector from "@/components/upload/BodyAreaSelector";
import AreaSizeSelector from "@/components/upload/AreaSizeSelector";
import DurationSelector from "@/components/upload/DurationSelector";
import ImageUploadStep from "@/components/upload/ImageUploadStep";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const bodyAreaLabels: Record<number, string> = {
  0: "Head / Face / Scalp",
  1: "Chest / Upper torso",
  2: "Left arm",
  3: "Abdomen / Lower torso",
  4: "Right arm",
  5: "Left leg",
  6: "Right leg",
};

const areaSizeLabels: Record<string, string> = {
  "single": "Single Lesion",
  "limited": "Limited Area",
  "widespread": "Widespread",
};

const durationLabels: Record<string, string> = {
  "minutes-hours": "Minutes to Hours",
  "days-weeks": "Days to Weeks",
  "weeks-months": "Weeks to Months",
  "months-years": "Months to Years",
  "recurring": "Recurring Episodes",
};

const stepLabels = ["Body Area", "Area Size", "Duration", "Upload"];

const Upload = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [affectedArea, setAffectedArea] = useState<number | null>(null);
  const [areaSize, setAreaSize] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [agreedToDisclaimer, setAgreedToDisclaimer] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const canProceed = () => {
    switch (currentStep) {
      case 1: return affectedArea !== null;
      case 2: return areaSize !== null;
      case 3: return duration !== null;
      case 4: return selectedFile !== null && agreedToDisclaimer;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileSelect = (file: File | null, previewUrl: string | null) => {
    setSelectedFile(file);
    setPreview(previewUrl);
  };

  const handleAnalyze = async () => {
    if (!agreedToDisclaimer) {
      toast({
        title: "Disclaimer Required",
        description: "Please acknowledge the medical disclaimer before proceeding.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate AI analysis - will be replaced with real API call
    setTimeout(() => {
      toast({
        title: "Analysis Complete",
        description: "Your results are ready!",
      });
      navigate("/results", { 
        state: { 
          imagePreview: preview,
          fileName: selectedFile?.name,
          patientInputs: {
            affectedArea: affectedArea !== null ? bodyAreaLabels[affectedArea] : null,
            affectedAreaId: affectedArea,
            areaSize: areaSize ? areaSizeLabels[areaSize] : null,
            areaSizeId: areaSize,
            duration: duration ? durationLabels[duration] : null,
            durationId: duration,
          }
        } 
      });
    }, 3000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BodyAreaSelector
            selectedArea={affectedArea}
            onSelect={setAffectedArea}
          />
        );
      case 2:
        return (
          <AreaSizeSelector
            selectedSize={areaSize}
            onSelect={setAreaSize}
          />
        );
      case 3:
        return (
          <DurationSelector
            selectedDuration={duration}
            onSelect={setDuration}
          />
        );
      case 4:
        return (
          <div className="space-y-6">
            <ImageUploadStep
              selectedFile={selectedFile}
              preview={preview}
              onFileSelect={handleFileSelect}
            />

            {/* Disclaimer Checkbox */}
            <div className="bg-warning/10 border border-warning/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="disclaimer"
                  checked={agreedToDisclaimer}
                  onCheckedChange={(checked) => setAgreedToDisclaimer(checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="disclaimer" className="text-sm cursor-pointer">
                  <span className="font-medium text-warning-foreground">
                    I understand this is not a medical diagnosis
                  </span>
                  <p className="text-warning-foreground/80 mt-1">
                    This AI tool provides preliminary screening only. I will consult a healthcare 
                    professional for proper diagnosis and treatment.
                  </p>
                </label>
              </div>
            </div>

            <DisclaimerBanner variant="info" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
              AI Skin Analysis
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Complete the following steps to receive your AI-powered skin assessment
            </p>
          </div>

          {/* Step Indicator */}
          <div className="mb-8">
            <StepIndicator 
              currentStep={currentStep} 
              totalSteps={4} 
              stepLabels={stepLabels}
            />
          </div>

          {/* Step Content */}
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-6 animate-slide-up">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            {currentStep < 4 ? (
              <Button
                variant="hero"
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center gap-2"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                variant="hero"
                size="lg"
                disabled={!canProceed() || isAnalyzing}
                onClick={handleAnalyze}
                className="min-w-[160px]"
              >
                {isAnalyzing ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </span>
                ) : (
                  "Analyze Image"
                )}
              </Button>
            )}
          </div>

          {/* Summary (shown after step 1) */}
          {currentStep > 1 && (
            <div className="mt-6 p-4 bg-muted/50 rounded-xl animate-fade-in">
              <h4 className="text-sm font-medium mb-2">Your Selections:</h4>
              <div className="flex flex-wrap gap-2">
                {affectedArea !== null && (
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {bodyAreaLabels[affectedArea]}
                  </span>
                )}
                {areaSize && (
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {areaSizeLabels[areaSize]}
                  </span>
                )}
                {duration && (
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {durationLabels[duration]}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Upload;
