
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AnalysisInputForm from "@/components/AnalysisInputForm";
import { analyzeStartupWithAI } from "@/utils/analysisUtils";
import { useToast } from "@/components/ui/use-toast";

export default function Analyze() {
  const [modelId, setModelId] = useState("default-model");
  const { toast } = useToast();

  const handleAnalysis = async (formData) => {
    try {
      const result = await analyzeStartupWithAI(formData, modelId);
      return result;
    } catch (error) {
      toast({
        title: "Analysis Error",
        description: error.message || "Failed to analyze startup data. Please check if the AI model is trained.",
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

      <div className="grid grid-cols-1 gap-6">
        <AnalysisInputForm modelId={modelId} onAnalyze={handleAnalysis} />
      </div>
    </div>
  );
}
