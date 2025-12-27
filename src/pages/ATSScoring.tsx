import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, FileText, AlertCircle, CheckCircle, Target } from "lucide-react";

const ATSScoring = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    missingSkills: string[];
    feedback: string[];
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
        score: 72,
        missingSkills: ["TypeScript", "AWS", "Docker", "Agile Methodology"],
        feedback: [
          "Add more quantifiable achievements",
          "Include relevant keywords from the job description",
          "Consider adding a skills section at the top",
          "Use action verbs to start bullet points",
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
            <Target className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">ATS Scoring</h1>
            <p className="text-muted-foreground text-sm">
              Score your resume against ATS systems
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
              <Label htmlFor="job-description" className="font-medium">
                Job Description
              </Label>
              <p className="text-xs text-muted-foreground mb-3">
                Paste the job description to compare against
              </p>
              <Textarea
                id="job-description"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[160px] resize-none"
              />
            </div>

            <Button 
              size="lg" 
              className="w-full"
              onClick={handleAnalyze}
              disabled={!file || !jobDescription || isAnalyzing}
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
            </Button>
          </div>

          {/* Output Section */}
          <div className="space-y-4">
            {result ? (
              <>
                <div className="glass-card p-5">
                  <h2 className="font-medium mb-4">ATS Score</h2>
                  <div className="text-center">
                    <div className="relative w-28 h-28 mx-auto mb-3">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="56"
                          cy="56"
                          r="48"
                          fill="none"
                          stroke="hsl(var(--muted))"
                          strokeWidth="10"
                        />
                        <circle
                          cx="56"
                          cy="56"
                          r="48"
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="10"
                          strokeLinecap="round"
                          strokeDasharray={`${result.score * 3.02} 302`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-primary">
                          {result.score}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your resume scores {result.score}% against ATS requirements
                    </p>
                  </div>
                </div>

                <div className="glass-card p-5">
                  <h2 className="font-medium mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-destructive" />
                    Missing Sections / Columns
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {result.missingSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-destructive/10 text-destructive rounded-md text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="glass-card p-5">
                  <h2 className="font-medium mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Recommendations
                  </h2>
                  <ul className="space-y-2">
                    {result.feedback.map((item, index) => (
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
                <Target className="w-12 h-12 mx-auto mb-4 text-muted-foreground/40" />
                <h3 className="font-medium mb-1">No Results Yet</h3>
                <p className="text-muted-foreground text-sm">
                  Upload your resume and paste a job description to see your ATS score.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ATSScoring;