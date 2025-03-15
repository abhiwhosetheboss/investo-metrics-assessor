
import { useState, useEffect } from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, LogOut, Settings, History } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface UserData {
  name: string;
  email: string;
}

const UserMenu = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check auth when component mounts
    const checkAuth = async () => {
      // First try to get session from Supabase
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session && session.user) {
        // User is authenticated in Supabase
        setUser({
          email: session.user.email || "",
          name: session.user.user_metadata?.name || "User"
        });
      } else {
        // Fallback to localStorage for backward compatibility
        const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
        if (isAuthenticated) {
          const userData = localStorage.getItem("user");
          if (userData) {
            try {
              setUser(JSON.parse(userData));
            } catch (error) {
              console.error("Failed to parse user data:", error);
              // Reset invalid user data
              localStorage.removeItem("user");
              localStorage.removeItem("isAuthenticated");
            }
          }
        } else {
          setUser(null);
        }
      }
    };
    
    checkAuth();
    
    // Setup auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setUser({
            email: session.user.email || "",
            name: session.user.user_metadata?.name || "User"
          });
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );
    
    // Also listen for storage events (for multi-tab support)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      subscription.unsubscribe();
      window.removeEventListener('storage', checkAuth);
    };
  }, []);
  
  const handleLogout = async () => {
    // Sign out from Supabase
    await supabase.auth.signOut();
    
    // Also clear localStorage for backward compatibility
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    
    setUser(null);
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    
    // Navigate to home page without full page reload
    navigate("/");
  };
  
  if (!user) {
    return null;
  }
  
  const initials = user.name
    .split(" ")
    .map(name => name[0])
    .join("")
    .toUpperCase();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
        <Avatar className="h-8 w-8">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col gap-1">
          <span className="font-medium">{user.name}</span>
          <span className="text-xs text-muted-foreground">{user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <User className="h-4 w-4 mr-2" />
          My Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <History className="h-4 w-4 mr-2" />
          Analysis History
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="h-4 w-4 mr-2" />
          Account Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 dark:text-red-400">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
