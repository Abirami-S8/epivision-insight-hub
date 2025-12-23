import { useCallback } from "react";
import { Upload as UploadIcon, Image, X, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadStepProps {
  selectedFile: File | null;
  preview: string | null;
  onFileSelect: (file: File | null, preview: string | null) => void;
}

const guidelines = [
  "Use good lighting - natural daylight works best",
  "Keep the camera steady and in focus",
  "Capture the entire lesion with some surrounding skin",
  "Avoid shadows or reflections on the lesion",
];

const ImageUploadStep = ({ selectedFile, preview, onFileSelect }: ImageUploadStepProps) => {
  const { toast } = useToast();

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

    const reader = new FileReader();
    reader.onloadend = () => {
      onFileSelect(file, reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [toast, onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const clearSelection = () => {
    onFileSelect(null, null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold mb-2">Upload Skin Lesion Image</h2>
        <p className="text-muted-foreground">Take or upload a clear photo of the affected area</p>
      </div>

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

      {/* Photo Guidelines */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
          <Camera className="w-5 h-5 text-primary" />
          Photo Guidelines
        </h3>
        <ul className="space-y-2">
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
    </div>
  );
};

export default ImageUploadStep;
