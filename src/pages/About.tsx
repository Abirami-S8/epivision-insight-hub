import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DisclaimerBanner from "@/components/shared/DisclaimerBanner";
import { 
  Eye, 
  Brain, 
  Database, 
  Shield, 
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  Info,
  BookOpen,
  ArrowRight
} from "lucide-react";

const About = () => {
  const modelInfo = {
    name: "CNN-CBAM (Convolutional Neural Network with CBAM)",
    dataset: "HAM10000 (Human Against Machine with 10,000 training images)",
    performance: "~0.75 F1-Score",
    classes: [
      "Melanoma",
      "Melanocytic Nevi",
      "Basal Cell Carcinoma",
      "Actinic Keratoses",
      "Benign Keratosis",
      "Dermatofibroma",
      "Vascular Lesions",
    ],
  };

  const limitations = [
    "Cannot replace professional dermatological examination",
    "May not detect all types of skin conditions",
    "Accuracy depends on image quality and lighting",
    "Not validated for clinical diagnostic use",
    "Training data may not represent all skin types equally",
  ];

  const ethicalPrinciples = [
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your images and data are encrypted and never shared with third parties.",
    },
    {
      icon: Info,
      title: "Transparency",
      description: "We clearly communicate our AI's capabilities and limitations.",
    },
    {
      icon: BookOpen,
      title: "Educational Purpose",
      description: "This tool is designed for awareness and preliminary screening only.",
    },
    {
      icon: CheckCircle2,
      title: "Continuous Improvement",
      description: "We regularly update our models and incorporate user feedback.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-accent rounded-full px-4 py-2 mb-6">
              <Eye className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-accent-foreground">About Epivision AI</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Education & Transparency
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Understanding how Epivision AI works, its limitations, and our commitment 
              to ethical AI usage in healthcare support.
            </p>
          </div>

          {/* What is Epivision AI */}
          <section className="mb-12 animate-slide-up">
            <div className="bg-card rounded-2xl border border-border p-8">
              <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Eye className="w-5 h-5 text-primary-foreground" />
                </div>
                What is Epivision AI?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Epivision AI is an educational tool designed to provide preliminary screening 
                assistance for skin lesion analysis. Using advanced deep learning technology, 
                our system analyzes uploaded images to identify patterns that may be associated 
                with various skin lesion types.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Important:</strong> Epivision AI is NOT a 
                diagnostic tool and should never replace professional medical consultation. 
                It is designed to raise awareness and encourage individuals to seek proper 
                dermatological care when needed.
              </p>
            </div>
          </section>

          {/* AI Model Information */}
          <section className="mb-12 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
              <Brain className="w-6 h-6 text-primary" />
              Our AI Technology
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold mb-3">Model Architecture</h3>
                <p className="text-sm text-muted-foreground mb-4">{modelInfo.name}</p>
                <p className="text-xs text-muted-foreground">
                  CBAM (Convolutional Block Attention Module) enhances feature extraction 
                  by focusing on important spatial and channel features in the image.
                </p>
              </div>

              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Training Dataset</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{modelInfo.dataset}</p>
                <p className="text-xs text-muted-foreground">
                  A large collection of dermatoscopic images from different populations, 
                  curated for machine learning research.
                </p>
              </div>

              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Model Performance</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Approximate F1-Score: <strong className="text-foreground">{modelInfo.performance}</strong>
                </p>
                <p className="text-xs text-muted-foreground">
                  F1-score measures the balance between precision and recall. Our model 
                  performs well but is not perfect and requires human oversight.
                </p>
              </div>

              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold mb-3">Detectable Classes</h3>
                <div className="flex flex-wrap gap-2">
                  {modelInfo.classes.map((cls) => (
                    <span 
                      key={cls}
                      className="text-xs bg-accent px-2 py-1 rounded-full"
                    >
                      {cls}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Limitations */}
          <section className="mb-12 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <div className="bg-warning/10 border border-warning/20 rounded-2xl p-8">
              <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3 text-warning-foreground">
                <AlertTriangle className="w-6 h-6" />
                Important Limitations
              </h2>
              <ul className="space-y-3">
                {limitations.map((limitation, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-warning/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-warning">{index + 1}</span>
                    </div>
                    <span className="text-warning-foreground/90">{limitation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Ethical Use Policy */}
          <section className="mb-12 animate-slide-up" style={{ animationDelay: "300ms" }}>
            <h2 className="font-display text-2xl font-bold mb-6">
              Ethical Use Policy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ethicalPrinciples.map((principle) => (
                <div key={principle.title} className="bg-card rounded-2xl border border-border p-6">
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mb-4">
                    <principle.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{principle.title}</h3>
                  <p className="text-sm text-muted-foreground">{principle.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Full Disclaimer */}
          <section className="mb-12 animate-slide-up" style={{ animationDelay: "400ms" }}>
            <DisclaimerBanner variant="warning" showNextSteps />
          </section>

          {/* CTA */}
          <section className="text-center animate-slide-up" style={{ animationDelay: "500ms" }}>
            <p className="text-muted-foreground mb-6">
              Ready to try our preliminary screening tool?
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/upload" className="flex items-center gap-2">
                Start Free Analysis
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
