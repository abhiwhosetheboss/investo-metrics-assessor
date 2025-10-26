import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllAnalyses, getSavedAnalyses, deleteSavedAnalysis } from "@/utils/analysisUtils";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { BarChart, LineChart, MessageSquare, FileText, ChevronRight, BookOpen, Database, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AICustomization from "@/components/AICustomization";
import TrainingData from "@/components/TrainingData";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("recent");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>(null);
  
  // Check if user is authenticated
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };
    
    checkUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  // Get all analyses
  const { data: recentAnalyses, isLoading: isLoadingRecent } = useQuery({
    queryKey: ["analyses"],
    queryFn: getAllAnalyses,
  });
  
  // Get saved analyses
  const { data: savedAnalyses, isLoading: isLoadingSaved, refetch: refetchSaved } = useQuery({
    queryKey: ["savedAnalyses"],
    queryFn: getSavedAnalyses,
    enabled: !!user, // Only fetch if user is authenticated
  });
  
  // Check for requested tab from localStorage on component mount
  useEffect(() => {
    const requestedTab = localStorage.getItem('dashboardTab');
    if (requestedTab) {
      setActiveTab(requestedTab);
      // Clear after using
      localStorage.removeItem('dashboardTab');
    }
  }, []);
  
  const handleDeleteAnalysis = async (id: string) => {
    try {
      const result = await deleteSavedAnalysis(id);
      
      if (result.success) {
        toast({
          title: "Analysis deleted",
          description: "The analysis has been successfully deleted.",
        });
        
        // Refetch saved analyses
        queryClient.invalidateQueries({ queryKey: ["savedAnalyses"] });
      } else {
        toast({
          title: "Deletion failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Deletion failed",
        description: "An error occurred while deleting the analysis.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your startup analyses and customize the AI model
        </p>
      </div>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="recent">Recent Analyses</TabsTrigger>
          <TabsTrigger value="saved" disabled={!user}>Saved Analyses</TabsTrigger>
          <TabsTrigger value="data">Training Data</TabsTrigger>
          <TabsTrigger value="model">AI Model</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-primary/5 border-dashed border-primary/20 cursor-pointer hover:bg-primary/10 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-primary">New Analysis</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm">
                  Create a new startup analysis with AI
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => navigate("/analyze")}
                >
                  Start Analysis
                </Button>
              </CardFooter>
            </Card>

            {isLoadingRecent ? (
              Array(3).fill(0).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="pb-3">
                    <div className="h-5 bg-muted rounded w-3/4"></div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </CardContent>
                  <CardFooter>
                    <div className="h-10 bg-muted rounded w-full"></div>
                  </CardFooter>
                </Card>
              ))
            ) : recentAnalyses && recentAnalyses.length > 0 ? (
              recentAnalyses.map((analysis) => (
                <Card key={analysis.id} className="cursor-pointer hover:bg-accent/10 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{analysis.startupName}</CardTitle>
                      <Badge variant={analysis.investibilityScore > 70 ? "success" : analysis.investibilityScore > 40 ? "warning" : "destructive"}>
                        {analysis.investibilityScore}/100
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {analysis.businessModel && (
                      <Badge variant="outline" className="mt-2">
                        {analysis.businessModel.toUpperCase()}
                      </Badge>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={() => navigate(`/analysis/${analysis.id}`)}
                    >
                      View Analysis
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Card className="col-span-full">
                <CardHeader>
                  <CardTitle>No Recent Analyses</CardTitle>
                  <CardDescription>
                    You haven't created any analyses yet
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Start by creating a new analysis from the dashboard
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => navigate("/analyze")}
                  >
                    Create Analysis
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="saved" className="space-y-4 mt-6">
          {!user ? (
            <Alert>
              <AlertTitle>Authentication Required</AlertTitle>
              <AlertDescription>
                Please sign in to view your saved analyses.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoadingSaved ? (
                Array(3).fill(0).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader className="pb-3">
                      <div className="h-5 bg-muted rounded w-3/4"></div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                    </CardContent>
                    <CardFooter>
                      <div className="h-10 bg-muted rounded w-full"></div>
                    </CardFooter>
                  </Card>
                ))
              ) : savedAnalyses && Array.isArray(savedAnalyses) && savedAnalyses.length > 0 ? (
                savedAnalyses.map((analysis) => (
                  <Card key={analysis.id} className="cursor-pointer hover:bg-accent/10 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{analysis.startupName}</CardTitle>
                        <Badge variant={analysis.investibilityScore > 70 ? "success" : analysis.investibilityScore > 40 ? "warning" : "destructive"}>
                          {analysis.investibilityScore}/100
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {analysis.businessModel && (
                        <Badge variant="outline" className="mt-2">
                          {analysis.businessModel.toUpperCase()}
                        </Badge>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between gap-2">
                      <Button
                        variant="secondary"
                        className="flex-1"
                        onClick={() => navigate(`/analysis/${analysis.id}`)}
                      >
                        View
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteAnalysis(analysis.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <Card className="col-span-full">
                  <CardHeader>
                    <CardTitle>No Saved Analyses</CardTitle>
                    <CardDescription>
                      You haven't saved any analyses yet
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Create a new analysis and use the "Save" button to store it for future reference
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => navigate("/analyze")}
                    >
                      Create Analysis
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="data" className="space-y-4 mt-6">
          <TrainingData />
        </TabsContent>

        <TabsContent value="model" className="space-y-4 mt-6">
          <AICustomization />
        </TabsContent>
      </Tabs>
    </div>
  );
}
