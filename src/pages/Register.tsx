import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate registration - will be replaced with real auth
    setTimeout(() => {
      toast({
        title: "Account Created!",
        description: "Welcome to Epivision AI. Redirecting to your dashboard...",
      });
      setIsLoading(false);
      window.location.href = "/dashboard";
    }, 1500);
  };

  const benefits = [
    "Free preliminary skin lesion analysis",
    "Secure, encrypted data storage",
    "Downloadable PDF reports",
    "Track changes over time",
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex flex-1 bg-gradient-hero items-center justify-center p-12">
        <div className="max-w-md">
          <div className="w-24 h-24 rounded-2xl bg-primary/20 flex items-center justify-center mb-8 animate-float">
            <Eye className="w-12 h-12 text-primary-foreground" />
          </div>
          <h2 className="font-display text-2xl font-bold text-primary-foreground mb-4">
            Join Epivision AI Today
          </h2>
          <p className="text-primary-foreground/70 mb-8">
            Create your free account and start analyzing skin lesions with our advanced AI technology.
          </p>
          <ul className="space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-primary-foreground/80">
                <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-fade-in">
          {/* Back Link */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold mb-2">Create Your Account</h1>
            <p className="text-muted-foreground">
              Start your free skin health journey today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                I agree to the{" "}
                <Link to="/about" className="text-primary hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link to="/about" className="text-primary hover:underline">Privacy Policy</Link>
                , and I understand that this tool is for educational purposes only.
              </label>
            </div>

            <Button 
              type="submit" 
              variant="hero" 
              size="lg" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
