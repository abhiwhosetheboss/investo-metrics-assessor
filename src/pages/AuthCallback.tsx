import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    let cancelled = false;

    const finish = async () => {
      // Handle provider errors passed back via query params
      const params = new URLSearchParams(window.location.search);
      const providerError = params.get("error");
      const providerErrorDescription = params.get("error_description");

      if (providerError) {
        toast({
          title: "Sign-in failed",
          description: providerErrorDescription || providerError,
          variant: "destructive",
        });
        if (!cancelled) navigate("/login", { replace: true });
        return;
      }

      try {
        // If a session is already present, we're done.
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData.session) {
          if (!cancelled) navigate("/dashboard", { replace: true });
          return;
        }

        // For PKCE flows, we may need to exchange the "code" for a session.
        const code = params.get("code");
        if (code) {
          const { data, error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;

          if (data?.session) {
            toast({
              title: "Welcome!",
              description: "You have successfully signed in.",
            });
            if (!cancelled) navigate("/dashboard", { replace: true });
            return;
          }
        }

        toast({
          title: "Sign-in incomplete",
          description: "Please try signing in again.",
          variant: "destructive",
        });
        if (!cancelled) navigate("/login", { replace: true });
      } catch (e: any) {
        toast({
          title: "Sign-in failed",
          description: e?.message || "Unable to complete sign-in.",
          variant: "destructive",
        });
        if (!cancelled) navigate("/login", { replace: true });
      }
    };

    finish();

    return () => {
      cancelled = true;
    };
  }, [navigate, toast]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Signing you in…</CardTitle>
          <CardDescription>Finishing authentication securely.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Please wait</span>
        </CardContent>
      </Card>
    </div>
  );
}
