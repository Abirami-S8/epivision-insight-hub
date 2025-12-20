import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DisclaimerBanner from "@/components/shared/DisclaimerBanner";
import { 
  Upload as UploadIcon, 
  Image, 
  X, 
  AlertTriangle,
  Info,
  Camera
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [agreedToDisclaimer, setAgreedToDisclaimer] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreview(null);
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
          fileName: selectedFile?.name 
        } 
      });
    }, 3000);
  };

  const guidelines = [
    "Use good lighting - natural daylight works best",
    "Keep the camera steady and in focus",
    "Capture the entire lesion with some surrounding skin",
    "Avoid shadows or reflections on the lesion",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Upload Skin Lesion Image
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Take or upload a clear photo of the skin lesion you'd like analyzed. 
              Our AI will provide a preliminary assessment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Area */}
            <div className="space-y-6 animate-slide-up">
              {/* Dropzone */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                  preview 
                    ? "border-primary bg-accent/50" 
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                {preview ? (
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Selected lesion"
                      className="max-h-64 mx-auto rounded-xl shadow-card"
                    />
                    <button
                      onClick={clearSelection}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center shadow-soft hover:scale-110 transition-transform"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <p className="mt-4 text-sm text-muted-foreground">{selectedFile?.name}</p>
                  </div>
                ) : (
                  <div className="py-8">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-accent flex items-center justify-center mb-4">
                      <UploadIcon className="w-8 h-8 text-primary" />
                    </div>
                    <p className="font-medium mb-2">Drag and drop your image here</p>
                    <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Image className="w-4 h-4" />
                      <span>JPG, PNG up to 10MB</span>
                    </div>
                  </div>
                )}
              </div>

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

              {/* Analyze Button */}
              <Button
                variant="hero"
                size="xl"
                className="w-full"
                disabled={!selectedFile || !agreedToDisclaimer || isAnalyzing}
                onClick={handleAnalyze}
              >
                {isAnalyzing ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Analyzing...
                  </span>
                ) : (
                  "Analyze Image"
                )}
              </Button>
            </div>

            {/* Guidelines */}
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
              {/* Photo Guidelines */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-primary" />
                  Photo Guidelines
                </h3>
                <ul className="space-y-3">
                  {guidelines.map((guideline, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-primary">{index + 1}</span>
                      </div>
                      <span className="text-muted-foreground">{guideline}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Info Card */}
              <div className="bg-accent/50 rounded-2xl border border-primary/10 p-6">
                <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  What We Analyze
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our AI model is trained on the HAM10000 dataset and can identify patterns 
                  associated with various skin lesion types including:
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Melanoma", "Basal Cell Carcinoma", "Benign Keratosis", "Dermatofibroma", "Melanocytic Nevi", "Vascular Lesions"].map((type) => (
                    <span key={type} className="text-xs bg-background px-3 py-1.5 rounded-full border border-border">
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <DisclaimerBanner variant="info" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Upload;
