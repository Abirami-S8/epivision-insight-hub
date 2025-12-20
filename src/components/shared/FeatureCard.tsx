import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <div 
      className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/20 transition-all duration-300 shadow-soft hover:shadow-card animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
