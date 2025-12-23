import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

interface DurationSelectorProps {
  selectedDuration: string | null;
  onSelect: (duration: string) => void;
}

const durationOptions = [
  { id: "minutes-hours", label: "Minutes to Hours" },
  { id: "days-weeks", label: "Days to Weeks" },
  { id: "weeks-months", label: "Weeks to Months" },
  { id: "months-years", label: "Months to Years" },
  { id: "recurring", label: "Recurring Episodes" },
];

const DurationSelector = ({ selectedDuration, onSelect }: DurationSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold mb-2">How long have you had this condition?</h2>
        <p className="text-muted-foreground">Select the duration of the condition</p>
      </div>

      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-2xl bg-accent flex items-center justify-center">
          <Clock className="w-10 h-10 text-primary" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {durationOptions.map((option) => {
          const isSelected = selectedDuration === option.id;
          
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={cn(
                "w-full py-4 px-6 rounded-xl border-2 font-medium transition-all duration-200",
                "hover:shadow-soft focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                isSelected
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-accent/50"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DurationSelector;
