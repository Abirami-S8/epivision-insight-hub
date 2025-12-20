import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { 
  FileText, 
  Download, 
  Search, 
  Calendar,
  ChevronRight,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Reports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  // Mock reports data
  const reports = [
    {
      id: "EPI-ABC123",
      date: "December 18, 2024",
      prediction: "Melanocytic Nevi",
      confidence: 89,
      riskLevel: "Low",
    },
    {
      id: "EPI-DEF456",
      date: "December 15, 2024",
      prediction: "Benign Keratosis",
      confidence: 92,
      riskLevel: "Low",
    },
    {
      id: "EPI-GHI789",
      date: "December 10, 2024",
      prediction: "Dermatofibroma",
      confidence: 78,
      riskLevel: "Low",
    },
    {
      id: "EPI-JKL012",
      date: "December 5, 2024",
      prediction: "Melanocytic Nevi",
      confidence: 85,
      riskLevel: "Low",
    },
  ];

  const filteredReports = reports.filter(
    (report) =>
      report.prediction.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (reportId: string) => {
    toast({
      title: "Downloading Report",
      description: `Generating PDF for ${reportId}...`,
    });
  };

  const getRiskBadgeClass = (risk: string) => {
    switch (risk) {
      case "Low": return "bg-success/10 text-success";
      case "Medium": return "bg-warning/10 text-warning";
      case "High": return "bg-destructive/10 text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Report History
            </h1>
            <p className="text-muted-foreground">
              View and download your previous skin lesion analysis reports
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by prediction or report ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="shrink-0">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Reports List */}
          <div className="space-y-4 animate-slide-up" style={{ animationDelay: "100ms" }}>
            {filteredReports.length > 0 ? (
              filteredReports.map((report, index) => (
                <div
                  key={report.id}
                  className="bg-card rounded-2xl border border-border p-6 hover:border-primary/20 hover:shadow-card transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Left - Report Info */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-lg mb-1">
                          {report.prediction}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {report.date}
                          </span>
                          <span>ID: {report.id}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right - Stats & Actions */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">{report.confidence}%</p>
                        <p className="text-xs text-muted-foreground">Confidence</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskBadgeClass(report.riskLevel)}`}>
                        {report.riskLevel} Risk
                      </span>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDownload(report.id)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-card rounded-2xl border border-border">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-muted flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">No Reports Found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery 
                    ? "No reports match your search criteria" 
                    : "You haven't completed any analyses yet"}
                </p>
                <Button variant="hero" asChild>
                  <Link to="/upload">Start Your First Analysis</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Stats Summary */}
          {filteredReports.length > 0 && (
            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                Showing {filteredReports.length} of {reports.length} reports
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Reports;
