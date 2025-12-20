import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DisclaimerBanner from "@/components/shared/DisclaimerBanner";
import { 
  Upload, 
  FileText, 
  Clock, 
  TrendingUp,
  User,
  ChevronRight,
  Calendar
} from "lucide-react";

const Dashboard = () => {
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    memberSince: "December 2024",
  };

  // Mock recent reports
  const recentReports = [
    {
      id: "1",
      date: "Dec 18, 2024",
      prediction: "Benign Keratosis",
      confidence: 87,
      riskLevel: "Low",
    },
    {
      id: "2",
      date: "Dec 15, 2024",
      prediction: "Melanocytic Nevi",
      confidence: 92,
      riskLevel: "Low",
    },
  ];

  const stats = [
    { label: "Total Analyses", value: "12", icon: TrendingUp },
    { label: "This Month", value: "3", icon: Calendar },
    { label: "Reports Saved", value: "8", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-8 animate-fade-in">
            <h1 className="font-display text-3xl font-bold mb-2">
              Welcome back, {user.name.split(" ")[0]}!
            </h1>
            <p className="text-muted-foreground">
              Manage your skin health analyses and access your reports
            </p>
          </div>

          {/* Disclaimer Banner */}
          <div className="mb-8 animate-slide-up">
            <DisclaimerBanner variant="info" />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Upload New Image */}
            <Link 
              to="/upload"
              className="group bg-gradient-primary rounded-2xl p-6 text-primary-foreground shadow-glow hover:shadow-elevated transition-all duration-300 animate-slide-up"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-1">New Analysis</h3>
              <p className="text-primary-foreground/80 text-sm">Upload a skin lesion image for AI analysis</p>
            </Link>

            {/* View Reports */}
            <Link 
              to="/reports"
              className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/20 shadow-soft hover:shadow-card transition-all duration-300 animate-slide-up"
              style={{ animationDelay: "100ms" }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-1">View Reports</h3>
              <p className="text-muted-foreground text-sm">Access all your previous analysis reports</p>
            </Link>

            {/* Profile */}
            <div 
              className="group bg-card rounded-2xl p-6 border border-border shadow-soft animate-slide-up"
              style={{ animationDelay: "200ms" }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                <User className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-1">Your Profile</h3>
              <p className="text-muted-foreground text-sm">{user.email}</p>
              <p className="text-xs text-muted-foreground mt-1">Member since {user.memberSince}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="bg-card rounded-xl p-4 border border-border text-center animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="font-display text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Recent Reports */}
          <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up" style={{ animationDelay: "300ms" }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Recent Reports
              </h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/reports" className="flex items-center gap-1">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            {recentReports.length > 0 ? (
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div 
                    key={report.id}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{report.prediction}</p>
                        <p className="text-sm text-muted-foreground">{report.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{report.confidence}% confidence</p>
                        <p className={`text-xs ${
                          report.riskLevel === "Low" ? "text-success" : 
                          report.riskLevel === "Medium" ? "text-warning" : "text-destructive"
                        }`}>
                          {report.riskLevel} Risk
                        </p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No analyses yet</p>
                <Button variant="hero" asChild>
                  <Link to="/upload">Start Your First Analysis</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
