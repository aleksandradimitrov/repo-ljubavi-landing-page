import { Link } from "react-router-dom";
import { Camera, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-foreground hover:text-primary transition-colors">
            <Camera className="h-6 w-6 text-primary" />
            <span>EventSnap</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            <Button variant="hero" size="sm" className="ml-2" asChild>
              <Link to="/contact" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Try Demo Free
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
