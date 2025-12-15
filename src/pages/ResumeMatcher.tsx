import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, FileSearch, TrendingUp, Lightbulb } from "lucide-react";

const ResumeMatcher = () => {
  const [file, setFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    matchPercentage: number;
    recommendedSkills: string[];
    improvements: string[];
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setResult({
        matchPercentage: 68,
        recommendedSkills: ["React.js", "Node.js", "PostgreSQL", "GraphQL", "CI/CD", "System Design"],
        improvements: [
          "Add more projects showcasing full-stack development",
          "Include experience with cloud platforms (AWS/GCP/Azure)",
          "Highlight leadership and mentoring experience",
          "Add certifications relevant to the role",
        ],
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileSearch className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Resume Matcher</h1>
            <p className="text-muted-foreground text-sm">
              Match your resume to job roles and get recommendations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="glass-card p-5">
              <h2 className="font-medium mb-3">Upload Resume</h2>
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
              <Label htmlFor="target-role" className="font-medium">
                Target Job Role
              </Label>
              <p className="text-xs text-muted-foreground mb-3">
                Enter the job title you're targeting
              </p>
              <Input
                id="target-role"
                placeholder="e.g., Senior Software Engineer"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="h-11"
              />
            </div>

            <Button 
              size="lg" 
              className="w-full"
              onClick={handleAnalyze}
              disabled={!file || !targetRole || isAnalyzing}
            >
              {isAnalyzing ? "Matching..." : "Match Resume"}
            </Button>
          </div>

          {/* Output Section */}
          <div className="space-y-4">
            {result ? (
              <>
                <div className="glass-card p-5">
                  <h2 className="font-medium mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    Match Percentage
                  </h2>
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-primary">
                        {result.matchPercentage}%
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {result.matchPercentage >= 70 ? "Good Match" : "Needs Improvement"}
                      </span>
                    </div>
                    <Progress value={result.matchPercentage} className="h-2" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your resume matches {result.matchPercentage}% of the requirements for {targetRole}
                  </p>
                </div>

                <div className="glass-card p-5">
                  <h2 className="font-medium mb-3">Recommended Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {result.recommendedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-sm"
                      >
                        + {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="glass-card p-5">
                  <h2 className="font-medium mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-primary" />
                    Improvement Suggestions
                  </h2>
                  <ul className="space-y-2">
                    {result.improvements.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="glass-card p-10 text-center">
                <FileSearch className="w-12 h-12 mx-auto mb-4 text-muted-foreground/40" />
                <h3 className="font-medium mb-1">No Results Yet</h3>
                <p className="text-muted-foreground text-sm">
                  Upload your resume and enter a target role to see matching results.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ResumeMatcher;