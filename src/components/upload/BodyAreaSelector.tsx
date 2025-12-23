import { cn } from "@/lib/utils";

interface BodyAreaSelectorProps {
  selectedArea: number | null;
  onSelect: (areaId: number) => void;
}

const bodyAreas = [
  { id: 0, name: "Head / Face / Scalp", position: { top: "5%", left: "50%", transform: "translateX(-50%)" } },
  { id: 1, name: "Chest / Upper torso", position: { top: "22%", left: "50%", transform: "translateX(-50%)" } },
  { id: 2, name: "Left arm", position: { top: "30%", left: "25%", transform: "translateX(-50%)" } },
  { id: 3, name: "Abdomen / Lower torso", position: { top: "38%", left: "50%", transform: "translateX(-50%)" } },
  { id: 4, name: "Right arm", position: { top: "30%", left: "75%", transform: "translateX(-50%)" } },
  { id: 5, name: "Left leg", position: { top: "65%", left: "38%", transform: "translateX(-50%)" } },
  { id: 6, name: "Right leg", position: { top: "65%", left: "62%", transform: "translateX(-50%)" } },
];

const BodyAreaSelector = ({ selectedArea, onSelect }: BodyAreaSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold mb-2">Where is the affected area?</h2>
        <p className="text-muted-foreground">Select the body region where the lesion is located</p>
      </div>

      <div className="relative w-full max-w-xs mx-auto aspect-[1/2]">
        {/* Body Silhouette SVG */}
        <svg
          viewBox="0 0 200 400"
          className="w-full h-full text-muted-foreground/20"
          fill="currentColor"
        >
          {/* Head */}
          <ellipse cx="100" cy="35" rx="28" ry="32" />
          {/* Neck */}
          <rect x="88" y="65" width="24" height="15" />
          {/* Torso */}
          <path d="M60 80 L140 80 L145 180 L55 180 Z" />
          {/* Arms */}
          <path d="M60 85 L35 100 L20 170 L35 175 L50 120 L55 95" />
          <path d="M140 85 L165 100 L180 170 L165 175 L150 120 L145 95" />
          {/* Legs */}
          <path d="M60 180 L55 280 L45 380 L70 380 L75 280 L85 180" />
          <path d="M140 180 L145 280 L155 380 L130 380 L125 280 L115 180" />
        </svg>

        {/* Clickable Markers */}
        {bodyAreas.map((area) => (
          <button
            key={area.id}
            onClick={() => onSelect(area.id)}
            className={cn(
              "absolute w-8 h-8 rounded-full border-2 transition-all duration-200 flex items-center justify-center",
              "hover:scale-125 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              selectedArea === area.id
                ? "bg-primary border-primary text-primary-foreground scale-125 shadow-lg"
                : "bg-background border-primary/50 text-primary hover:bg-primary/10"
            )}
            style={area.position as React.CSSProperties}
            title={area.name}
          >
            <span className="text-xs font-bold">{area.id + 1}</span>
          </button>
        ))}
      </div>

      {/* Selected Area Display */}
      {selectedArea !== null && (
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2">
            <span className="font-medium">Selected: {bodyAreas[selectedArea].name}</span>
          </div>
        </div>
      )}

      {/* Area List (Alternative Selection) */}
      <div className="grid grid-cols-2 gap-2 mt-6">
        {bodyAreas.map((area) => (
          <button
            key={area.id}
            onClick={() => onSelect(area.id)}
            className={cn(
              "text-left px-4 py-3 rounded-xl border transition-all duration-200",
              selectedArea === area.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border hover:border-primary/50 hover:bg-accent/50"
            )}
          >
            <span className="text-sm font-medium">{area.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BodyAreaSelector;
