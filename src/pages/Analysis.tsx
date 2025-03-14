
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAnalysisById } from "@/utils/analysisUtils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, Share2, ArrowLeft, Brain, TrendingUp, Building2, Users, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import InvestibilityScore from "@/components/InvestibilityScore";
import RiskRating from "@/components/RiskRating";
import StrengthsWeaknesses from "@/components/StrengthsWeaknesses";
import Suggestions from "@/components/Suggestions";
import DataVisualizer from "@/components/DataVisualizer";
import RiskToRewardMeter from "@/components/RiskToRewardMeter";
import { useEffect, useState } from "react";
import { AIModel } from "@/components/AIModelSelector";

const Analysis = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  
  // Load the selected model from localStorage on component mount
  useEffect(() => {
    const storedModel = localStorage.getItem("selectedAIModel");
    if (storedModel) {
      setSelectedModel(JSON.parse(storedModel));
    }
  }, []);
  
  const { data: analysis, isLoading, error } = useQuery({
    queryKey: ['analysis', id],
    queryFn: () => getAnalysisById(id || ''),
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 space-y-8">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-1/3" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="container mx-auto py-10">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>Error loading analysis data. Please try again later.</p>
        </div>
      </div>
    );
  }

  // Get business model from analysis data
  const businessModel = analysis.businessModel ? analysis.businessModel.toUpperCase() : "Unknown";

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold">{analysis.startupName}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <p className="text-muted-foreground">
              Analysis created on {new Date(analysis.createdAt).toLocaleDateString()}
            </p>
            
            {businessModel && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                {businessModel}
              </Badge>
            )}
            
            {selectedModel && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Brain className="h-3 w-3" />
                {selectedModel.name}
              </Badge>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <InvestibilityScore score={analysis.investibilityScore} />
        <RiskRating 
          overallRisk={analysis.overallRisk} 
          factors={analysis.riskFactors} 
        />
      </div>

      <div className="mb-8">
        <RiskToRewardMeter 
          risk={analysis.overallRisk} 
          reward={analysis.investibilityScore}
        />
      </div>

      {analysis.founderTrustRating && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">Founder Trust Rating</h3>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold">{analysis.founderTrustRating}</p>
              <p className="text-sm text-muted-foreground mb-1">/10</p>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {analysis.founderTrustRating >= 8 ? "Exceptional founder potential" : 
               analysis.founderTrustRating >= 6 ? "Strong founder potential" : 
               analysis.founderTrustRating >= 4 ? "Average founder potential" : 
               "Needs development"}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">Product-Market Fit</h3>
              <ShoppingCart className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold">{analysis.pmfScore || "N/A"}</p>
              <p className="text-sm text-muted-foreground mb-1">/100</p>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {analysis.pmfScore >= 80 ? "Excellent fit" : 
               analysis.pmfScore >= 60 ? "Good fit" : 
               analysis.pmfScore >= 40 ? "Moderate fit" : 
               "Poor fit"}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">Growth Potential</h3>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold">{analysis.growthExpected || "N/A"}</p>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Projected growth rate
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <StrengthsWeaknesses 
          strengths={analysis.strengths} 
          weaknesses={analysis.weaknesses} 
        />
        <Suggestions suggestions={analysis.suggestions} />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-medium mb-6">Category Analysis</h2>
        <DataVisualizer categories={analysis.categories} />
      </div>
      
      {selectedModel && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium">AI Model Information</h2>
            <Badge variant="outline" className="flex items-center gap-1">
              <Brain className="h-3 w-3" />
              {selectedModel.name}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>This analysis was generated using <span className="font-medium">{selectedModel.name}</span> by {selectedModel.provider}.</p>
            <p>{selectedModel.description}</p>
            <p className="text-xs mt-4">
              AI models improve over time as they receive more training data. For best results, contribute to the Shark Tank dataset in the dashboard.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analysis;
