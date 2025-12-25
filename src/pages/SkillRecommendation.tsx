import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Lightbulb, TrendingUp, BookOpen, Target } from "lucide-react";

interface SkillRecommendation {
  skill: string;
  relevance: "high" | "medium" | "low";
  category: string;
  reason: string;
}

const SkillRecommendationPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [careerGoal, setCareerGoal] = useState("");
  const [currentSkills, setCurrentSkills] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<SkillRecommendation[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setRecommendations([
        {
          skill: "TypeScript",
          relevance: "high",
          category: "Technical",
          reason: "Essential for modern frontend development and increasingly required in job postings for senior roles.",
        },
        {
          skill: "System Design",
          relevance: "high",
          category: "Architecture",
          reason: "Critical for senior positions. Focus on scalability patterns and distributed systems.",
        },
        {
          skill: "Cloud Services (AWS/GCP)",
          relevance: "high",
          category: "Infrastructure",
          reason: "Most companies require cloud experience. Start with core services like compute, storage, and serverless.",
        },
        {
          skill: "GraphQL",
          relevance: "medium",
          category: "Technical",
          reason: "Growing adoption in modern APIs. Complements your REST experience.",
        },
        {
          skill: "CI/CD Pipelines",
          relevance: "medium",
          category: "DevOps",
          reason: "Understanding deployment automation is valuable for full-stack roles.",
        },
        {
          skill: "Technical Leadership",
          relevance: "medium",
          category: "Soft Skills",
          reason: "Essential for career progression. Practice mentoring and leading technical discussions.",
        },
      ]);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getRelevanceColor = (relevance: string) => {
    switch (relevance) {
      case "high":
        return "bg-primary/10 text-primary border-primary/20";
      case "medium":
        return "bg-accent/10 text-accent border-accent/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Course Recommendation</h1>
            <p className="text-muted-foreground text-sm">
              Get personalized skill recommendations for your career goals
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="glass-card p-5">
              <h2 className="font-medium mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Upload Resume (Optional)
              </h2>
              <div className="border border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  id="resume-upload"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                  {file ? (
                    <div className="flex items-center justify-center gap-2 text-primary">
                      <FileText className="w-4 h-4" />
                      <span className="font-medium text-sm">{file.name}</span>
                    </div>
                  ) : (
                    <>
                      <p className="font-medium text-sm mb-1">Click to upload</p>
                      <p className="text-xs text-muted-foreground">PDF or DOC (max 5MB)</p>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div className="glass-card p-5">
              <Label htmlFor="career-goal" className="font-medium flex items-center gap-2 mb-3">
                <Target className="w-4 h-4" />
                Career Goal
              </Label>
              <Input
                id="career-goal"
                placeholder="e.g., Senior Software Engineer at a FAANG company"
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                className="h-11"
              />
            </div>

            <div className="glass-card p-5">
              <Label htmlFor="current-skills" className="font-medium flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4" />
                Current Skills
              </Label>
              <Textarea
                id="current-skills"
                placeholder="List your current skills, separated by commas (e.g., JavaScript, React, Node.js, SQL)"
                value={currentSkills}
                onChange={(e) => setCurrentSkills(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>

            <Button 
              size="lg" 
              className="w-full"
              onClick={handleAnalyze}
              disabled={!careerGoal || isAnalyzing}
            >
              {isAnalyzing ? "Analyzing..." : "Get Recommendations"}
            </Button>
          </div>

          {/* Output Section */}
          <div className="space-y-4">
            {recommendations.length > 0 ? (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="font-medium flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Recommended Skills
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    {recommendations.length} recommendations
                  </span>
                </div>
                <div className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <div 
                      key={rec.skill}
                      className="glass-card p-4 animate-fade-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-semibold">{rec.skill}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full border capitalize ${getRelevanceColor(rec.relevance)}`}>
                          {rec.relevance}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground mb-2 block">{rec.category}</span>
                      <p className="text-sm text-muted-foreground">{rec.reason}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="glass-card p-10 text-center">
                <Lightbulb className="w-12 h-12 mx-auto mb-4 text-muted-foreground/40" />
                <h3 className="font-medium mb-1">No Recommendations Yet</h3>
                <p className="text-muted-foreground text-sm">
                  Enter your career goal to get personalized skill recommendations.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SkillRecommendationPage;