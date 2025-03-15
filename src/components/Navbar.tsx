
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronRight, LineChart, BarChart3, Info, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AuthModal from "./AuthModal";
import UserMenu from "./UserMenu";
import { supabase } from "@/integrations/supabase/client";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { title: "Home", href: "/", icon: ChevronRight },
  { title: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { title: "About", href: "/about", icon: Info }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check authentication status on mount and when auth state changes
  useEffect(() => {
    const checkAuth = async () => {
      // Get the current session
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      
      // Fallback to localStorage for backward compatibility
      if (!session) {
        const localAuth = localStorage.getItem("isAuthenticated") === "true";
        setIsAuthenticated(localAuth);
      }
    };
    
    checkAuth();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Navbar: Auth state changed:", event);
        if (event === 'SIGNED_IN') {
          setIsAuthenticated(true);
        } else if (event === 'SIGNED_OUT') {
          setIsAuthenticated(false);
        }
      }
    );
    
    // Also listen for storage events (for multi-tab support)
    const handleStorageChange = () => {
      console.log("Navbar: Storage changed, checking auth...");
      const localAuth = localStorage.getItem("isAuthenticated") === "true";
      setIsAuthenticated(localAuth);
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      subscription.unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleStartAnalysis = () => {
    navigate("/dashboard");
  };

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled 
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 dark:border-slate-700/50" 
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <LineChart className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold tracking-tight">
              Investometer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.title}
              </Link>
            ))}
            
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <AuthModal buttonVariant="ghost" />
              )}
              
              <Button 
                className="rounded-full px-6"
                onClick={handleStartAnalysis}
              >
                Start Analysis
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center gap-4">
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <AuthModal>
                <Button variant="ghost" size="sm" className="gap-1">
                  <LogIn className="h-4 w-4" />
                </Button>
              </AuthModal>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 shadow-md py-4 border-t border-b border-slate-200 dark:border-slate-700 animate-in">
            <div className="container px-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 py-2 transition-colors rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 px-3",
                    location.pathname === item.href
                      ? "text-primary bg-slate-100 dark:bg-slate-800"
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              ))}
              <Button 
                className="w-full mt-4 rounded-full"
                onClick={handleStartAnalysis}
              >
                Start Analysis
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
