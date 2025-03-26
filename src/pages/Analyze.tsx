
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AnalysisInputForm from "@/components/AnalysisInputForm";
import AIModelSelector from "@/components/AIModelSelector";
import { analyzeStartupWithAI } from "@/utils/analysisUtils";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export default function Analyze() {
  const [modelId, setModelId] = useState("openai-gpt4");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleModelSelect = (model: any) => {
    console.log("Model selected:", model);
    setModelId(model.id);
  };

  const handleAnalysis = async (formData: any) => {
    try {
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

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Startup Analysis</h1>
        <p className="text-muted-foreground">
          Enter your startup details to get a comprehensive AI-powered analysis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <AIModelSelector onModelSelect={handleModelSelect} className="h-full" />
        </div>
        
        <div className="md:col-span-2">
          <AnalysisInputForm modelId={modelId} onAnalyze={handleAnalysis} />
        </div>
      </div>
    </div>
  );
}
