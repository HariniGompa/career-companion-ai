import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shell, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollTo = (sectionId: string) => {
    if (location.pathname === "/") {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to home first, then scroll after a brief delay
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Shell className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold gradient-text">CRAB AI</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => handleScrollTo("features")} 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => handleScrollTo("how-it-works")} 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              How it Works
            </button>
            <Link to="/help" className="text-muted-foreground hover:text-foreground transition-colors">
              Help
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
