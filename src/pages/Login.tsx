import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shell, ArrowLeft, Mail, KeyRound, CheckCircle } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

type Step = "email" | "otp" | "success";

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
    }, 1000);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="glass-card p-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-11 h-11 rounded-lg primary-gradient flex items-center justify-center">
              <Shell className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">CRAB AI</span>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className={`w-8 h-1 rounded-full transition-colors ${step === "email" || step === "otp" ? "bg-primary" : "bg-muted"}`} />
            <div className={`w-8 h-1 rounded-full transition-colors ${step === "otp" ? "bg-primary" : "bg-muted"}`} />
          </div>

          {step === "email" && (
            <>
              <h1 className="text-xl font-bold text-center mb-1">Welcome back</h1>
              <p className="text-muted-foreground text-center mb-6 text-sm">
                Enter your email to sign in
              </p>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-11 pl-10"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-11" 
                  disabled={isLoading}
                >
                  {isLoading ? "Sending code..." : "Continue"}
                </Button>
              </form>

              <div className="mt-6 text-center space-y-3">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-primary hover:underline block"
                >
                  Forgot password?
                </Link>
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary hover:underline font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            </>
          )}

          {step === "otp" && (
            <>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-4">
                <KeyRound className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-xl font-bold text-center mb-1">Enter verification code</h1>
              <p className="text-muted-foreground text-center mb-6 text-sm">
                We sent a code to <span className="font-medium text-foreground">{email}</span>
              </p>

              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="flex justify-center">
                  <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-11" 
                  disabled={otp.length < 6 || isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify & Sign In"}
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Didn't receive the code?{" "}
                <button 
                  type="button"
                  onClick={() => {/* Resend logic */}}
                  className="text-primary hover:underline font-medium"
                >
                  Resend
                </button>
              </p>

              <button 
                type="button"
                onClick={() => setStep("email")}
                className="w-full mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Use a different email
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;