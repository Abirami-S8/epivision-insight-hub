import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

const StepIndicator = ({ currentStep, totalSteps, stepLabels }: StepIndicatorProps) => {
  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="relative mb-4">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-primary rounded-full transition-all duration-500"
            style={{ width: `${((currentStep) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isCurrent = currentStep === stepNumber;
          
          return (
            <div key={index} className="flex flex-col items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                isCompleted && "bg-primary text-primary-foreground",
                isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
              )}>
                {isCompleted ? <Check className="w-4 h-4" /> : stepNumber}
              </div>
              <span className={cn(
                "text-xs mt-2 hidden sm:block transition-colors",
                (isCompleted || isCurrent) ? "text-foreground font-medium" : "text-muted-foreground"
              )}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
