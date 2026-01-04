import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn, UserPlus, User, Mail, Lock, Chrome } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

interface AuthModalProps {
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link";
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AuthModal = ({ buttonVariant = "outline", children, open, onOpenChange }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState("login");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(open || false);
  const navigate = useNavigate();
  
  // Sync with parent component's open state
  useEffect(() => {
    if (open !== undefined) {
      setModalOpen(open);
    }
  }, [open]);
  
  // Handle internal open change
  const handleOpenChange = (open: boolean) => {
    setModalOpen(open);
    if (onOpenChange) {
      onOpenChange(open);
    }
  };
  
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setAuthError(null);
    
    try {
      console.log("Attempting Google sign in...");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      
      if (error) {
        console.error("Google sign in error:", error);
        throw error;
      }
    } catch (error: any) {
      console.error("Google sign in error:", error);
      setAuthError(error.message || "Failed to sign in with Google");
      toast({
        title: "Google sign in failed",
        description: error.message || "Failed to sign in with Google. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const onLoginSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    setAuthError(null);
    
    try {
      console.log("Attempting to sign in with:", values.email);
      
      // Try to sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      
      if (error) {
        console.error("Supabase login error:", error);
        throw error;
      }
      
      // If successful, store user info
      if (data && data.user) {
        console.log("Login successful, user data:", data.user);
        
        // Store auth state in localStorage for backward compatibility
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify({ 
          email: data.user.email, 
          name: data.user.user_metadata?.name || "User" 
        }));
        
        toast({
          title: "Success!",
          description: "You are now logged in.",
        });
        
        // Close the modal
        handleOpenChange(false);
        
        // Trigger session change event for other tabs
        window.dispatchEvent(new Event('storage'));
        
        // Navigate to dashboard
        navigate("/dashboard");
      } else {
        // This should not happen if there's no error, but just in case
        throw new Error("Login successful but no user data returned");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      
      // Show a more user-friendly error message
      let errorMessage = "Failed to sign in. Please check your credentials.";
      if (error.message) {
        if (error.message.includes("Invalid login credentials")) {
          errorMessage = "Invalid email or password. Please try again.";
        } else {
          errorMessage = error.message;
        }
      }
      
      setAuthError(errorMessage);
      
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const onSignupSubmit = async (values: SignupFormValues) => {
    setIsSubmitting(true);
    setAuthError(null);
    
    try {
      console.log("Attempting to sign up with:", values.email);
      
      // Try to sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            name: values.name,
          },
        },
      });
      
      if (error) {
        console.error("Supabase signup error:", error);
        throw error;
      }
      
      // If successful, store user info
      if (data && data.user) {
        console.log("Signup successful, user data:", data.user);
        
        // Store auth state in localStorage for backward compatibility
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify({ 
          email: data.user.email, 
          name: values.name 
        }));
        
        toast({
          title: "Account created!",
          description: data.session ? "Your account has been created and you are now logged in." : 
                      "Your account has been created. Please check your email for confirmation.",
        });
        
        // Close the modal
        handleOpenChange(false);
        
        // Trigger session change event for other tabs
        window.dispatchEvent(new Event('storage'));
        
        // Navigate to dashboard
        navigate("/dashboard");
      } else {
        throw new Error("Signup successful but no user data returned");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      
      // Show a more user-friendly error message
      let errorMessage = "Failed to create account. Please try again later.";
      
      if (error.message) {
        if (error.message.includes("already exists")) {
          errorMessage = "This email is already registered. Please use a different email or try logging in.";
        } else {
          errorMessage = error.message;
        }
      }
      
      setAuthError(errorMessage);
      
      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={modalOpen} onOpenChange={handleOpenChange}>
      {children ? (
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button variant={buttonVariant} size="sm" className="gap-1.5">
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {activeTab === "login" ? "Sign In" : "Create Account"}
          </DialogTitle>
          <DialogDescription>
            {activeTab === "login" 
              ? "Sign in to your account to access all features." 
              : "Create a new account to get started."}
          </DialogDescription>
        </DialogHeader>
        
        {authError && (
          <div className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
            {authError}
          </div>
        )}
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-2">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login" className="flex gap-1.5">
              <LogIn className="h-4 w-4" />
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="flex gap-1.5">
              <UserPlus className="h-4 w-4" />
              Sign Up
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-4">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="you@example.com" 
                            {...field} 
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input 
                            type="password" 
                            placeholder="********" 
                            {...field} 
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </Button>
                
                <div className="relative my-4">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                    or continue with
                  </span>
                </div>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full gap-2" 
                  onClick={handleGoogleSignIn}
                  disabled={isSubmitting}
                >
                  <Chrome className="h-4 w-4" />
                  Sign in with Google
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="signup" className="mt-4">
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                <FormField
                  control={signupForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="John Doe" 
                            {...field} 
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="you@example.com" 
                            {...field} 
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input 
                            type="password" 
                            placeholder="********" 
                            {...field} 
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input 
                            type="password" 
                            placeholder="********" 
                            {...field} 
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Creating account..." : "Sign Up"}
                </Button>
                
                <div className="relative my-4">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                    or continue with
                  </span>
                </div>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full gap-2" 
                  onClick={handleGoogleSignIn}
                  disabled={isSubmitting}
                >
                  <Chrome className="h-4 w-4" />
                  Sign up with Google
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
