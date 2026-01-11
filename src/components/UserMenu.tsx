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
import { Session } from "@supabase/supabase-js";

interface UserData {
  name: string;
  email: string;
}

const UserMenu = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("UserMenu: Auth state changed:", event, session?.user?.email);
        setSession(session);
        
        if (session?.user) {
          setUser({
            email: session.user.email || "",
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || "User"
          });
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("UserMenu: Initial session check:", session?.user?.email);
      setSession(session);
      
      if (session?.user) {
        setUser({
          email: session.user.email || "",
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || "User"
        });
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      await supabase.auth.signOut();
      
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
      
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
  
  // Show loading state briefly
  if (isLoading) {
    return (
      <Avatar className="h-8 w-8 animate-pulse">
        <AvatarFallback>...</AvatarFallback>
      </Avatar>
    );
  }
  
  if (!user || !session) {
    return null;
  }
  
  const initials = user.name
    .split(" ")
    .map(name => name[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          type="button"
          className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
          onClick={(e) => e.stopPropagation()}
        >
          <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
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
