import { useState, useRef, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, MessageSquare, Send, Bot, User, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

const InterviewPrep = () => {
  const [file, setFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleStartInterview = () => {
    setIsStarted(true);
    setMessages([
      {
        id: "1",
        role: "bot",
        content: `Hello! I'm your interview preparation assistant. I'll help you prepare for your ${targetRole} interview. Let's start with a common question:\n\n**Tell me about yourself and your relevant experience.**\n\nTake your time to think about your response, then type it below.`,
        timestamp: new Date(),
      },
    ]);
  };

  const simulateBotResponse = (userMessage: string) => {
    setIsTyping(true);
    
    // Simulated responses based on keywords
    const responses = [
      "That's a good start! Here's some feedback:\n\n**Strengths:** You mentioned specific achievements and quantified your impact.\n\n**Areas to improve:** Try to connect your experience more directly to the role you're applying for.\n\n**Next question:** Can you describe a challenging project you worked on and how you overcame obstacles?",
      "Great response! Your answer demonstrates problem-solving skills.\n\n**Tip:** Use the STAR method (Situation, Task, Action, Result) to structure your answers more effectively.\n\n**Follow-up:** How do you handle disagreements with team members during a project?",
      "I appreciate the detailed response. Here's my feedback:\n\n**What worked:** Clear communication and logical structure.\n\n**Suggestion:** Include more specific metrics when discussing achievements.\n\n**Next question:** Where do you see yourself in 5 years, and how does this role fit into your career goals?",
      "Excellent! You're showing good self-awareness.\n\n**Feedback:** Your answer shows you've researched the company and role.\n\n**Final question:** Do you have any questions for the interviewer? (Hint: Always have 2-3 thoughtful questions prepared!)",
    ];

    setTimeout(() => {
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: "bot",
        content: randomResponse,
        timestamp: new Date(),
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    simulateBotResponse(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReset = () => {
    setIsStarted(false);
    setMessages([]);
    setInputValue("");
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Interview Preparation</h1>
              <p className="text-muted-foreground text-sm">
                Practice with AI-powered interview coaching
              </p>
            </div>
          </div>
          {isStarted && (
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          )}
        </div>

        {!isStarted ? (
          /* Setup Section */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
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
                      <p className="text-xs text-muted-foreground">PDF or DOC</p>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div className="glass-card p-5">
              <Label htmlFor="target-role" className="font-medium mb-3 block">
                Target Role
              </Label>
              <Input
                id="target-role"
                placeholder="e.g., Senior Software Engineer"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="h-11 mb-4"
              />
              <Button 
                className="w-full"
                onClick={handleStartInterview}
                disabled={!file || !targetRole}
              >
                Start Interview Practice
              </Button>
            </div>
          </div>
        ) : (
          /* Chat Interface */
          <div className="flex-1 flex flex-col glass-card overflow-hidden">
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3 animate-fade-up",
                    message.role === "user" ? "flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    message.role === "user" ? "bg-primary/10" : "bg-muted"
                  )}>
                    {message.role === "user" ? (
                      <User className="w-4 h-4 text-primary" />
                    ) : (
                      <Bot className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3",
                    message.role === "user" 
                      ? "bg-primary text-primary-foreground rounded-br-md" 
                      : "bg-muted text-foreground rounded-bl-md"
                  )}>
                    <div className="text-sm whitespace-pre-wrap prose prose-sm max-w-none dark:prose-invert">
                      {message.content.split('\n').map((line, i) => {
                        if (line.startsWith('**') && line.endsWith('**')) {
                          return <strong key={i} className="block">{line.slice(2, -2)}</strong>;
                        }
                        if (line.includes('**')) {
                          const parts = line.split(/(\*\*.*?\*\*)/);
                          return (
                            <p key={i} className="mb-1">
                              {parts.map((part, j) => 
                                part.startsWith('**') && part.endsWith('**')
                                  ? <strong key={j}>{part.slice(2, -2)}</strong>
                                  : part
                              )}
                            </p>
                          );
                        }
                        return line ? <p key={i} className="mb-1">{line}</p> : <br key={i} />;
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Bot className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your response..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 h-11"
                  disabled={isTyping}
                />
                <Button 
                  size="icon" 
                  className="h-11 w-11"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                This is a demo interface. Connect to Rasa backend for full functionality.
              </p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;