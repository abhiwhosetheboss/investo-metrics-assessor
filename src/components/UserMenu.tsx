
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

interface UserData {
  name: string;
  email: string;
}

const UserMenu = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check authentication status on component mount and whenever localStorage changes
    const checkAuth = () => {
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
    };
    
    // Initial check
    checkAuth();
    
    // Listen for storage events (for multi-tab support)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);
  
  const handleLogout = () => {
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
