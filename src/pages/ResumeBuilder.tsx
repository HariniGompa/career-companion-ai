import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileEdit, Plus, Trash2, Download, Eye } from "lucide-react";

interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    summary: "",
    skills: "",
  });
  
  const [experiences, setExperiences] = useState<Experience[]>([
    { id: "1", title: "", company: "", duration: "", description: "" }
  ]);
  
  const [education, setEducation] = useState<Education[]>([
    { id: "1", degree: "", institution: "", year: "" }
  ]);

  const [showPreview, setShowPreview] = useState(false);

  const addExperience = () => {
    setExperiences([...experiences, { 
      id: Date.now().toString(), 
      title: "", 
      company: "", 
      duration: "", 
      description: "" 
    }]);
  };

  const removeExperience = (id: string) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter(e => e.id !== id));
    }
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperiences(experiences.map(e => 
      e.id === id ? { ...e, [field]: value } : e
    ));
  };

  const addEducation = () => {
    setEducation([...education, { 
      id: Date.now().toString(), 
      degree: "", 
      institution: "", 
      year: "" 
    }]);
  };

  const removeEducation = (id: string) => {
    if (education.length > 1) {
      setEducation(education.filter(e => e.id !== id));
    }
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map(e => 
      e.id === id ? { ...e, [field]: value } : e
    ));
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileEdit className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Resume Builder</h1>
              <p className="text-muted-foreground text-sm">
                Create a professional resume
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
            >
              <Eye className="w-4 h-4 mr-1.5" />
              {showPreview ? "Edit" : "Preview"}
            </Button>
            <Button size="sm">
              <Download className="w-4 h-4 mr-1.5" />
              Download
            </Button>
          </div>
        </div>

        {showPreview ? (
          <div className="glass-card p-8 max-w-3xl mx-auto">
            <div className="text-center border-b border-border pb-5 mb-5">
              <h2 className="text-2xl font-bold mb-1">{formData.fullName || "Your Name"}</h2>
              <p className="text-muted-foreground text-sm">
                {formData.email} {formData.phone && `• ${formData.phone}`}
              </p>
            </div>

            {formData.summary && (
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Summary</h3>
                <p className="text-muted-foreground text-sm">{formData.summary}</p>
              </div>
            )}

            {formData.skills && (
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Skills</h3>
                <div className="flex flex-wrap gap-1.5">
                  {formData.skills.split(",").map((skill, i) => (
                    <span key={i} className="px-2 py-0.5 bg-muted rounded text-xs">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-5">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Experience</h3>
              {experiences.filter(e => e.title).map((exp) => (
                <div key={exp.id} className="mb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-sm">{exp.title}</h4>
                      <p className="text-primary text-sm">{exp.company}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{exp.duration}</span>
                  </div>
                  <p className="text-muted-foreground mt-1 text-xs">{exp.description}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Education</h3>
              {education.filter(e => e.degree).map((edu) => (
                <div key={edu.id} className="mb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-sm">{edu.degree}</h4>
                      <p className="text-primary text-sm">{edu.institution}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{edu.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Personal Info */}
            <div className="glass-card p-5">
              <h2 className="font-medium mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="fullName" className="text-sm">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm">Phone</Label>
                  <Input
                    id="phone"
                    placeholder="+1 234 567 890"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="glass-card p-5">
              <h2 className="font-medium mb-3">Professional Summary</h2>
              <Textarea
                placeholder="Brief summary of your professional background..."
                value={formData.summary}
                onChange={(e) => setFormData({...formData, summary: e.target.value})}
                className="min-h-[80px] resize-none"
              />
            </div>

            {/* Skills */}
            <div className="glass-card p-5">
              <h2 className="font-medium mb-3">Skills</h2>
              <Input
                placeholder="JavaScript, React, Node.js, Python (comma separated)"
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
              />
            </div>

            {/* Experience */}
            <div className="glass-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-medium">Work Experience</h2>
                <Button variant="outline" size="sm" onClick={addExperience}>
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="p-4 bg-muted/50 rounded-lg relative">
                    {experiences.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:text-destructive"
                        onClick={() => removeExperience(exp.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div>
                        <Label className="text-xs">Job Title</Label>
                        <Input
                          placeholder="Software Engineer"
                          value={exp.title}
                          onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Company</Label>
                        <Input
                          placeholder="Tech Corp"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <Label className="text-xs">Duration</Label>
                      <Input
                        placeholder="Jan 2020 - Present"
                        value={exp.duration}
                        onChange={(e) => updateExperience(exp.id, "duration", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Description</Label>
                      <Textarea
                        placeholder="Describe your responsibilities..."
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                        className="mt-1 min-h-[60px] resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="glass-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-medium">Education</h2>
                <Button variant="outline" size="sm" onClick={addEducation}>
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="p-4 bg-muted/50 rounded-lg relative">
                    {education.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:text-destructive"
                        onClick={() => removeEducation(edu.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <Label className="text-xs">Degree</Label>
                        <Input
                          placeholder="Bachelor of Science"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Institution</Label>
                        <Input
                          placeholder="University Name"
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Year</Label>
                        <Input
                          placeholder="2020"
                          value={edu.year}
                          onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ResumeBuilder;