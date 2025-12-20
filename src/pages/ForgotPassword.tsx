import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate password reset email
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast({
        title: "Email Sent!",
        description: "Check your inbox for password reset instructions.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-md animate-fade-in">
        {/* Back Link */}
        <Link 
          to="/login" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>

        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="font-display text-3xl font-bold mb-2">Reset Password</h1>
              <p className="text-muted-foreground">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
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

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-success/20 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
            <h1 className="font-display text-2xl font-bold mb-2">Check Your Email</h1>
            <p className="text-muted-foreground mb-6">
              We've sent password reset instructions to <strong>{email}</strong>
            </p>
            <Button variant="outline" asChild>
              <Link to="/login">Return to Login</Link>
            </Button>
          </div>
        )}

        {/* Register Link */}
        {!isSubmitted && (
          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Create one now
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
