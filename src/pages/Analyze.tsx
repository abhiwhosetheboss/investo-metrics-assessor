import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import AnalysisInputForm from "@/components/AnalysisInputForm";
import AIModelSelector from "@/components/AIModelSelector";
import { analyzeStartupWithAI, getTrainingStatus } from "@/utils/analysisUtils";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { sampleData } from "@/utils/sampleData";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Trophy, Rocket, AlertTriangle, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Analyze() {
  const [modelId, setModelId] = useState("openai-gpt4");
  const [isModelTrained, setIsModelTrained] = useState(false);
  const [activeTab, setActiveTab] = useState("form");
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Check if model is trained on component mount
    const trainStatus = getTrainingStatus();
    setIsModelTrained(trainStatus.isModelTrained);
  }, []);

  const handleModelSelect = (model: any) => {
    console.log("Model selected:", model);
    setModelId(model.id);
    
    // Check if model is trained after selection
    const trainStatus = getTrainingStatus();
    setIsModelTrained(trainStatus.isModelTrained);
  };

  const handleAnalysis = async (formData: any) => {
    try {
      console.log("handleAnalysis called with data:", formData);
      
      // Check if model is trained before analysis
      if (!isModelTrained) {
        toast({
          title: "Model Not Trained",
          description: "Please train your AI model before analyzing startups.",
          variant: "destructive"
        });
        navigate("/dashboard");
        localStorage.setItem('dashboardTab', 'data');
        return null;
      }
      
      console.log("Starting analysis with data:", formData);
      toast({
        title: "Analysis Started",
        description: "Processing your startup data...",
      });
      
      const result = await analyzeStartupWithAI(formData, modelId);
      console.log("Analysis result:", result);
      
      toast({
        title: "Analysis Complete",
        description: "Your startup analysis is ready to view.",
      });
      
      // If the analysis was successful, navigate to the result
      if (result && result.id) {
        navigate(`/analysis/${result.id}`);
        return result;
      } else {
        throw new Error("Analysis result missing ID");
      }
    } catch (error: any) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Error",
        description: error.message || "Failed to analyze startup data. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Only show the first 4 sample reports
  const featuredSamples = sampleData.slice(0, 4);

  return (
    <div className="container mx-auto py-6 md:py-10 px-4 md:px-6 space-y-6 md:space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">Startup Analysis</h1>
        <p className="text-muted-foreground">
          Enter your startup details to get a comprehensive AI-powered analysis
        </p>
      </div>

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="form" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Start Analysis
          </TabsTrigger>
          <TabsTrigger value="samples" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Sample Reports
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="form" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {isMobile ? (
              <>
                <div className="col-span-1 order-1">
                  <AIModelSelector onModelSelect={handleModelSelect} className="h-full" />
                </div>
                <div className="col-span-1 order-2">
                  <AnalysisInputForm modelId={modelId} onAnalyze={handleAnalysis} />
                  
                  {/* Mobile warning about model training if not trained */}
                  {!isModelTrained && (
                    <Card className="mt-4 border-yellow-400/50 bg-yellow-50/50 dark:bg-yellow-900/20">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                          <div>
                            <p className="font-medium text-amber-800 dark:text-amber-400">
                              Model Not Trained
                            </p>
                            <p className="text-sm text-amber-800/80 dark:text-amber-400/80 mb-3">
                              Your AI model must be trained before analyzing startups.
                            </p>
                            <Button 
                              variant="outline"
                              className="w-full border-amber-400 text-amber-700 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-900/50"
                              onClick={() => {
                                navigate('/dashboard');
                                localStorage.setItem('dashboardTab', 'data');
                              }}
                            >
                              Train Model First
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="md:col-span-1">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Brain className="h-5 w-5 text-primary" />
                        AI Model Selection
                      </CardTitle>
                      <CardDescription>
                        Choose the AI model that will analyze your startup
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AIModelSelector onModelSelect={handleModelSelect} className="h-full" />
                    </CardContent>
                    {!isModelTrained && (
                      <CardFooter className="border-t pt-4">
                        <div className="w-full flex flex-col space-y-2">
                          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-sm font-medium">Model requires training</span>
                          </div>
                          <Button 
                            variant="outline"
                            size="sm"
                            className="w-full border-amber-400 text-amber-700 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-900/50"
                            onClick={() => {
                              navigate('/dashboard');
                              localStorage.setItem('dashboardTab', 'data');
                            }}
                          >
                            Train Model First
                          </Button>
                        </div>
                      </CardFooter>
                    )}
                  </Card>
                </div>
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Rocket className="h-5 w-5 text-primary" />
                        Startup Information
                      </CardTitle>
                      <CardDescription>
                        Enter details about the startup you want to analyze
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AnalysisInputForm modelId={modelId} onAnalyze={handleAnalysis} />
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 flex items-start gap-3 mt-6">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium text-slate-800 dark:text-slate-200">How does the analysis work?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Our AI models analyze your startup using multiple criteria including market fit, team composition, 
                financials, and growth potential. The analysis produces an investibility score, risk assessment, 
                and actionable recommendations.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="samples">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {featuredSamples.map((sample) => (
              <Card key={sample.id} className="overflow-hidden hover:shadow-md transition-all group">
                <CardHeader className="pb-2 relative">
                  <div className="absolute top-3 right-3">
                    <Badge className={`px-2 ${
                      sample.investibilityScore > 75 
                        ? 'bg-green-500' 
                        : sample.investibilityScore > 60 
                        ? 'bg-yellow-500' 
                        : 'bg-red-500'
                    }`}>
                      {sample.investibilityScore}/100
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {sample.startupName}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {sample.investibilityScore > 75 
                      ? "Highly investible startup with strong potential" 
                      : sample.investibilityScore > 60 
                      ? "Promising startup with moderate risk factors"
                      : "Startup with significant risk factors to consider"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Risk Level:</span>
                    <span className={`font-medium ${
                      sample.overallRisk < 35 
                        ? 'text-green-600' 
                        : sample.overallRisk < 50 
                        ? 'text-yellow-600' 
                        : 'text-red-600'
                    }`}>
                      {sample.overallRisk < 35 ? 'Low' : sample.overallRisk < 50 ? 'Moderate' : 'High'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Industry:</span>
                    <span className="text-sm font-medium">{sample.industry}</span>
                  </div>
                  
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-2">
                    <div 
                      className={`h-2 rounded-full ${
                        sample.investibilityScore > 75 
                          ? 'bg-green-500' 
                          : sample.investibilityScore > 60 
                          ? 'bg-yellow-500' 
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${sample.investibilityScore}%` }}
                    ></div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button asChild className="w-full gap-1 mt-2 group-hover:bg-primary/90">
                    <Link to={`/analysis/${sample.id}`}>
                      View Analysis
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Button asChild variant="outline">
              <Link to="/dashboard" className="flex items-center">
                View All Sample Analyses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
