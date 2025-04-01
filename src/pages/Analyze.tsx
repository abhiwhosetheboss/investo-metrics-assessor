
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AnalysisInputForm from "@/components/AnalysisInputForm";
import AIModelSelector from "@/components/AIModelSelector";
import { analyzeStartupWithAI, getTrainingStatus } from "@/utils/analysisUtils";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { sampleData } from "@/utils/sampleData";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Analyze() {
  const [modelId, setModelId] = useState("openai-gpt4");
  const [isModelTrained, setIsModelTrained] = useState(false);
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
      
      toast({
        title: "Analysis Complete",
        description: "Your startup analysis is ready to view.",
      });
      
      // If the analysis was successful, navigate to the result
      if (result && result.id) {
        navigate(`/analysis/${result.id}`);
      }
      
      return result;
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
                    <p className="text-sm text-amber-800 dark:text-amber-400 mb-3">
                      Your AI model must be trained before analyzing startups.
                    </p>
                    <Button 
                      variant="warning"
                      className="w-full"
                      onClick={() => {
                        navigate('/dashboard');
                        localStorage.setItem('dashboardTab', 'data');
                      }}
                    >
                      Train Model First
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="md:col-span-1">
              <AIModelSelector onModelSelect={handleModelSelect} className="h-full" />
            </div>
            <div className="md:col-span-2">
              <AnalysisInputForm modelId={modelId} onAnalyze={handleAnalysis} />
            </div>
          </>
        )}
      </div>

      {/* Sample Reports Section */}
      <div className="mt-12">
        <div className="flex flex-col space-y-2 mb-6">
          <h2 className="text-2xl font-bold">Sample Reports</h2>
          <p className="text-muted-foreground">
            View example analyses to see what insights our platform provides
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredSamples.map((sample) => (
            <Card key={sample.id} className="hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{sample.startupName}</CardTitle>
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
                  <span className="text-sm text-slate-500">Investibility Score:</span>
                  <span className={`font-medium ${
                    sample.investibilityScore > 75 
                      ? 'text-green-600' 
                      : sample.investibilityScore > 60 
                      ? 'text-yellow-600' 
                      : 'text-red-600'
                  }`}>{sample.investibilityScore}/100</span>
                </div>
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
                <Button asChild className="w-full mt-2">
                  <Link to={`/analysis/${sample.id}`}>View Analysis</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button asChild variant="outline">
            <Link to="/dashboard">
              View All Sample Analyses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
