import { Link } from "react-router-dom";
import { Eye, Mail, Shield, FileText } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Eye className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">
                Epivision<span className="text-gradient">AI</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm mb-4">
              AI-powered skin lesion analysis for early detection support. 
              Empowering individuals with preliminary screening tools.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-4 h-4 text-primary" />
              <span>HIPAA-aware design principles</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About Epivision AI
              </Link>
              <Link to="/upload" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Start Analysis
              </Link>
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold mb-4">Legal</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                <FileText className="w-3 h-3" />
                Ethical Use Policy
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6">
            <p className="text-xs text-warning-foreground leading-relaxed">
              <strong>Medical Disclaimer:</strong> This AI tool is for educational purposes and preliminary screening only. 
              It is not a substitute for professional medical diagnosis. Always consult with a qualified dermatologist 
              or healthcare provider for proper medical evaluation and treatment.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Epivision AI. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <Mail className="w-3 h-3" />
              <span>support@epivision.ai</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
