
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getAllAnalyses } from "@/utils/analysisUtils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, LineChart, ArrowUpRight, Database, Brain } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIModelSelector, { AIModel } from "@/components/AIModelSelector";
import SharkTankDataCollector from "@/components/SharkTankDataCollector";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const { data: analyses, isLoading, error } = useQuery({
    queryKey: ['analyses'],
    queryFn: getAllAnalyses
  });
  
  const [activeTab, setActiveTab] = useState("analyses");
  const { toast } = useToast();
  
  const handleModelSelect = (model: AIModel) => {
    console.log("Selected model:", model);
    // In a real app, you would store this in context or state management
    localStorage.setItem("selectedAIModel", JSON.stringify(model));
    
    toast({
      title: "AI Model Updated",
      description: `Now using ${model.name} for all new analyses.`,
    });
  };
  
  const handleDataCollected = (episodes: any[]) => {
    console.log("Collected episodes:", episodes);
    // In a real app, you would store this data or send it to your backend
    localStorage.setItem("sharkTankData", JSON.stringify(episodes));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 space-y-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>Error loading dashboard data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold">Startup Analysis Dashboard</h1>
        <div className="flex gap-2">
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            New Analysis
          </Link>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="analyses">
            <BarChart className="h-4 w-4 mr-2" />
            Analyses
          </TabsTrigger>
          <TabsTrigger value="ai-models">
            <Brain className="h-4 w-4 mr-2" />
            AI Models
          </TabsTrigger>
          <TabsTrigger value="data">
            <Database className="h-4 w-4 mr-2" />
            Training Data
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="analyses" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analyses?.map((analysis) => (
              <Card key={analysis.id} className="overflow-hidden hover:shadow-md transition-all">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{analysis.startupName}</CardTitle>
                    <Badge 
                      variant={analysis.investibilityScore > 70 ? "default" : 
                        analysis.investibilityScore > 50 ? "secondary" : "outline"}
                    >
                      {analysis.investibilityScore}/100
                    </Badge>
                  </div>
                  <CardDescription>
                    Created {new Date(analysis.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Risk Level:</span>
                      <span className={
                        analysis.overallRisk < 30 ? "text-green-500" :
                        analysis.overallRisk < 50 ? "text-amber-500" :
                        analysis.overallRisk < 70 ? "text-orange-500" : "text-red-500"
                      }>
                        {analysis.overallRisk < 30 ? "Low" :
                        analysis.overallRisk < 50 ? "Moderate" :
                        analysis.overallRisk < 70 ? "High" : "Very High"}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Top Category:</span>
                      <span className="font-medium">
                        {analysis.categories.sort((a, b) => b.value - a.value)[0].name}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Key Strength:</span>
                      <span className="font-medium max-w-[180px] truncate">
                        {analysis.strengths.sort((a, b) => {
                          const impactOrder = { critical: 0, high: 1, medium: 2, low: 3 };
                          return impactOrder[a.impact] - impactOrder[b.impact];
                        })[0].text}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link 
                    to={`/analysis/${analysis.id}`}
                    className="w-full inline-flex items-center justify-center gap-1 px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-md transition-colors"
                  >
                    View Full Analysis
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {analyses?.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <BarChart className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">No analyses yet</h3>
              <p className="text-muted-foreground mb-6">
                Start by creating your first startup analysis
              </p>
              <Link 
                to="/" 
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                <LineChart className="h-4 w-4 mr-2" />
                New Analysis
              </Link>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="ai-models">
          <AIModelSelector onModelSelect={handleModelSelect} />
        </TabsContent>
        
        <TabsContent value="data">
          <SharkTankDataCollector onDataCollected={handleDataCollected} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
