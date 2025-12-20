import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FeatureCard from "@/components/shared/FeatureCard";
import { 
  Eye, 
  Upload, 
  Brain, 
  FileText, 
  Shield, 
  Clock,
  ArrowRight,
  CheckCircle2,
  Stethoscope
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Upload,
      title: "Easy Image Upload",
      description: "Simply upload a clear photo of your skin lesion for instant AI-powered analysis.",
    },
    {
      icon: Brain,
      title: "Advanced AI Analysis",
      description: "Our CNN-CBAM model analyzes patterns to provide preliminary risk assessments.",
    },
    {
      icon: FileText,
      title: "Detailed Reports",
      description: "Receive comprehensive PDF reports with confidence scores and recommendations.",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is encrypted and handled with the highest security standards.",
    },
    {
      icon: Clock,
      title: "Instant Results",
      description: "Get preliminary screening results within seconds of uploading your image.",
    },
    {
      icon: Stethoscope,
      title: "Clinical Support",
      description: "Share reports with your dermatologist to support professional consultations.",
    },
  ];

  const steps = [
    { step: 1, title: "Create Account", description: "Sign up securely in seconds" },
    { step: 2, title: "Upload Image", description: "Take a clear photo of the lesion" },
    { step: 3, title: "Get Analysis", description: "Receive AI-powered assessment" },
    { step: 4, title: "Consult Doctor", description: "Share results with your dermatologist" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-hero opacity-[0.02]" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/30 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent rounded-full px-4 py-2 mb-8 animate-fade-in">
              <Eye className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-accent-foreground">AI-Powered Skin Analysis</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
              Early Detection Starts with{" "}
              <span className="text-gradient">Epivision AI</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
              Advanced AI technology for preliminary skin lesion screening. 
              Empowering you with insights to support early conversations with your dermatologist.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <Button variant="hero" size="xl" asChild>
                <Link to="/register" className="flex items-center gap-2">
                  Start Free Analysis
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/about">Learn How It Works</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "300ms" }}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>HIPAA-aware design</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Results in seconds</span>
              </div>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="mt-16 max-w-5xl mx-auto animate-scale-in" style={{ animationDelay: "400ms" }}>
            <div className="relative bg-gradient-card rounded-2xl border border-border shadow-elevated overflow-hidden">
              <div className="aspect-[16/9] bg-muted flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 animate-float">
                    <Eye className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <p className="text-muted-foreground">Interactive Demo Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for <span className="text-gradient">Early Detection Support</span>
            </h2>
            <p className="text-muted-foreground">
              Our platform combines cutting-edge AI with user-friendly design to provide 
              accessible preliminary skin lesion screening.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              Four simple steps to get your preliminary skin lesion assessment
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {steps.map((item, index) => (
                <div key={item.step} className="relative animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[calc(50%+24px)] w-[calc(100%-48px)] h-0.5 bg-border" />
                  )}
                  
                  <div className="text-center">
                    <div className="relative inline-flex">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-glow">
                        {item.step}
                      </div>
                    </div>
                    <h3 className="font-display font-semibold mt-4 mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
              Ready to Take Control of Your Skin Health?
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
              Join thousands who use Epivision AI for preliminary skin lesion screening. 
              Start your free analysis today.
            </p>
            <Button variant="hero" size="xl" asChild className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90">
              <Link to="/register" className="flex items-center gap-2">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
