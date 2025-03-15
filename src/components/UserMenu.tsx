
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
      try {
        console.log("Checking auth state...");
        
        // First try to get session from Supabase
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session && session.user) {
          // User is authenticated in Supabase
          console.log("User authenticated in Supabase:", session.user);
          setUser({
            email: session.user.email || "",
            name: session.user.user_metadata?.name || "User"
          });
        } else {
          console.log("No Supabase session, checking localStorage...");
          // Fallback to localStorage for backward compatibility
          const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
          if (isAuthenticated) {
            const userData = localStorage.getItem("user");
            if (userData) {
              try {
                const parsedUser = JSON.parse(userData);
                console.log("User found in localStorage:", parsedUser);
                setUser(parsedUser);
              } catch (error) {
                console.error("Failed to parse user data:", error);
                // Reset invalid user data
                localStorage.removeItem("user");
                localStorage.removeItem("isAuthenticated");
                setUser(null);
              }
            } else {
              console.log("No user data in localStorage");
              setUser(null);
            }
          } else {
            console.log("Not authenticated");
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setUser(null);
      }
    };
    
    checkAuth();
    
    // Setup auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        
        if (event === 'SIGNED_IN' && session) {
          setUser({
            email: session.user.email || "",
            name: session.user.user_metadata?.name || "User"
          });
          
          // Update localStorage for backward compatibility
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("user", JSON.stringify({
            email: session.user.email || "",
            name: session.user.user_metadata?.name || "User"
          }));
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          
          // Clear localStorage for backward compatibility
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("user");
        }
      }
    );
    
    // Also listen for storage events (for multi-tab support)
    const handleStorageChange = () => {
      console.log("Storage changed, checking auth...");
      checkAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      subscription.unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      
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
      
      // Trigger storage event for other tabs
      window.dispatchEvent(new Event('storage'));
      
      // Navigate to home page without full page reload
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
      toast({
        title: "Logout failed",
        description: "There was an error logging out. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (!user) {
    console.log("No user, not rendering UserMenu");
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
