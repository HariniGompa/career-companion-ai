import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lightbulb, TrendingUp, BookOpen, Target } from "lucide-react";

interface SkillRecommendation {
  skill: string;
  relevance: "high" | "medium" | "low";
  category: string;
  reason: string;
}

const SkillRecommendationPage = () => {
  const [careerGoal, setCareerGoal] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<SkillRecommendation[]>([]);

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

            {/* Required Skills for Career Goal - Read-only */}
            {careerGoal && (
              <div className="glass-card p-5">
                <h2 className="font-medium flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4" />
                  Required Skills for Career Goal
                </h2>
                <p className="text-xs text-muted-foreground mb-3">
                  Based on your selected career goal
                </p>
                <div className="flex flex-wrap gap-2">
                  {careerGoal.toLowerCase().includes("software") || careerGoal.toLowerCase().includes("developer") || careerGoal.toLowerCase().includes("engineer") ? (
                    <>
                      <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-sm">JavaScript</span>
                      <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-sm">React</span>
                      <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-sm">Node.js</span>
                      <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-sm">TypeScript</span>
                      <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-sm">SQL</span>
                    </>
                  ) : careerGoal.toLowerCase().includes("data") ? (
                    <>
                      <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-sm">Python</span>
                      <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-sm">SQL</span>
                      <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-sm">Machine Learning</span>
                      <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-sm">Statistics</span>
                    </>
                  ) : careerGoal.toLowerCase().includes("design") ? (
                    <>
                      <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-sm">Figma</span>
                      <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-sm">UI/UX</span>
                      <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-sm">Prototyping</span>
                      <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-sm">Design Systems</span>
                    </>
                  ) : (
                    <>
                      <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-sm">Communication</span>
                      <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-sm">Problem Solving</span>
                      <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-sm">Leadership</span>
                      <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-sm">Teamwork</span>
                    </>
                  )}
                </div>
              </div>
            )}

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