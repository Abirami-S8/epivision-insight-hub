import { cn } from "@/lib/utils";
import { Circle, Layers, Maximize } from "lucide-react";

interface AreaSizeSelectorProps {
  selectedSize: string | null;
  onSelect: (size: string) => void;
}

const sizeOptions = [
  {
    id: "single",
    label: "Single Lesion",
    description: "A single lesion or growth",
    icon: Circle,
  },
  {
    id: "limited",
    label: "Limited Area",
    description: "Multiple lesions or localized rash",
    icon: Layers,
  },
  {
    id: "widespread",
    label: "Widespread",
    description: "Affecting most of the body",
    icon: Maximize,
  },
];

const AreaSizeSelector = ({ selectedSize, onSelect }: AreaSizeSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold mb-2">How much of the body is affected?</h2>
        <p className="text-muted-foreground">Select the extent of the affected area</p>
      </div>

      <div className="space-y-3">
        {sizeOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedSize === option.id;
          
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={cn(
                "w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 text-left",
                "hover:shadow-soft focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                isSelected
                  ? "bg-primary/5 border-primary"
                  : "bg-card border-border hover:border-primary/50"
              )}
            >
              <div className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                isSelected ? "bg-primary text-primary-foreground" : "bg-accent text-primary"
              )}>
                <Icon className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h3 className={cn(
                  "font-display font-semibold text-lg mb-1",
                  isSelected ? "text-primary" : "text-foreground"
                )}>
                  {option.label}
                </h3>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
              <div className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                isSelected 
                  ? "border-primary bg-primary" 
                  : "border-muted-foreground/30"
              )}>
                {isSelected && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-foreground" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AreaSizeSelector;
