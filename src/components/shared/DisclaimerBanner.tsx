import { AlertTriangle, Info } from "lucide-react";

interface DisclaimerBannerProps {
  variant?: "warning" | "info";
  showNextSteps?: boolean;
}

const DisclaimerBanner = ({ variant = "warning", showNextSteps = false }: DisclaimerBannerProps) => {
  const isWarning = variant === "warning";

  return (
    <div
      className={`rounded-xl p-4 border ${
        isWarning
          ? "bg-warning/10 border-warning/20"
          : "bg-accent border-primary/10"
      }`}
    >
      <div className="flex items-start gap-3">
        {isWarning ? (
          <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
        ) : (
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        )}
        <div className="space-y-3">
          <div>
            <h4 className={`font-semibold text-sm ${isWarning ? "text-warning-foreground" : "text-foreground"}`}>
              Medical Disclaimer
            </h4>
            <p className={`text-sm mt-1 ${isWarning ? "text-warning-foreground/80" : "text-muted-foreground"}`}>
              This AI tool is for educational purposes and preliminary screening only. It is not a substitute 
              for professional medical diagnosis. Always consult with a qualified dermatologist or healthcare 
              provider for proper medical evaluation and treatment.
            </p>
          </div>

          {showNextSteps && (
            <div>
              <h4 className={`font-semibold text-sm ${isWarning ? "text-warning-foreground" : "text-foreground"}`}>
                Next Steps
              </h4>
              <p className={`text-sm mt-1 ${isWarning ? "text-warning-foreground/80" : "text-muted-foreground"}`}>
                Save these results and share them with your dermatologist during your consultation. 
                Continue monitoring the lesion and seek immediate medical attention if you notice rapid changes.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisclaimerBanner;
