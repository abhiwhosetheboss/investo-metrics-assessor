
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAnalysisById } from "@/utils/analysisUtils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Share2, ArrowLeft, Brain, TrendingUp, Building2, Users, ShoppingCart, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import InvestibilityScore from "@/components/InvestibilityScore";
import RiskRating from "@/components/RiskRating";
import StrengthsWeaknesses from "@/components/StrengthsWeaknesses";
import Suggestions from "@/components/Suggestions";
import DataVisualizer from "@/components/DataVisualizer";
import RiskToRewardMeter from "@/components/RiskToRewardMeter";
import { useEffect, useState } from "react";
import { AIModel } from "@/components/AIModelSelector";
import { supabase } from "@/integrations/supabase/client";
import StockHistorySection from "@/components/StockHistorySection";
import LivePrice from "@/components/LivePrice";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const Analysis = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
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


  // Generate AI-based strengths based on startup data
  const generateStrengths = (analysisData: any) => {
    const strengths = [];
    
    // Business model based strength
    if (analysisData.businessModel) {
      const businessModelMap: Record<string, string> = {
        'b2b': 'Business-to-business model provides stable revenue streams and longer customer relationships',
        'b2c': 'Direct-to-consumer approach allows for higher margins and brand control',
        'saas': 'Subscription-based model enables predictable recurring revenue',
        'marketplace': 'Two-sided marketplace creates network effects and multiple revenue streams'
      };
      
      strengths.push({
        text: businessModelMap[analysisData.businessModel.toLowerCase()] || 'Business model shows potential for scalable growth',
        impact: "high"
      });
    }
    
    // Product-market fit strength
    if (analysisData.pmfScore && analysisData.pmfScore > 60) {
      strengths.push({
        text: `Strong product-market fit score of ${analysisData.pmfScore} indicates validated customer demand`,
        impact: "critical"
      });
    }
    
    // Founder trust strength
    if (analysisData.founderTrustRating && analysisData.founderTrustRating > 6) {
      strengths.push({
        text: `High founder credibility rating of ${analysisData.founderTrustRating}/10 suggests strong leadership`,
        impact: "high"
      });
    }
    
    // Growth potential strength
    if (analysisData.growthExpected && !analysisData.growthExpected.includes('-')) {
      strengths.push({
        text: `Projected growth rate of ${analysisData.growthExpected} demonstrates market expansion potential`,
        impact: "medium"
      });
    }
    
    // Add general strengths if we don't have enough specific ones
    if (strengths.length < 3) {
      strengths.push({
        text: "Potential for strategic partnerships to accelerate market entry",
        impact: "medium"
      });
      
      strengths.push({
        text: "Innovative approach to solving customer pain points",
        impact: "high"
      });
    }
    
    return strengths;
  };
  
  // Generate AI-based weaknesses based on startup data
  const generateWeaknesses = (analysisData: any) => {
    const weaknesses = [];
    
    // Risk-based weakness
    if (analysisData.overallRisk && analysisData.overallRisk > 60) {
      weaknesses.push({
        text: `High overall risk assessment (${analysisData.overallRisk}%) indicates significant investment challenges`,
        impact: "critical"
      });
    }
    
    // Product-market fit weakness
    if (analysisData.pmfScore && analysisData.pmfScore < 50) {
      weaknesses.push({
        text: `Low product-market fit score of ${analysisData.pmfScore} suggests need for further customer validation`,
        impact: "high"
      });
    }
    
    // Investibility weakness
    if (analysisData.investibilityScore && analysisData.investibilityScore < 50) {
      weaknesses.push({
        text: `Below-average investibility score of ${analysisData.investibilityScore} may limit funding opportunities`,
        impact: "high"
      });
    }
    
    // Add general weaknesses if we don't have enough specific ones
    if (weaknesses.length < 3) {
      weaknesses.push({
        text: "Potential scaling challenges in competitive market environment",
        impact: "medium"
      });
      
      weaknesses.push({
        text: "Limited track record of financial performance",
        impact: "medium"
      });
      
      weaknesses.push({
        text: "Potential customer acquisition costs may impact profitability",
        impact: "low"
      });
    }
    
    return weaknesses;
  };
  
  // Generate AI-based suggestions based on startup data
  const generateSuggestions = (analysisData: any) => {
    const suggestions = [];
    
    // Financial suggestion
    suggestions.push({
      title: "Develop Clear Financial Projections",
      description: "Create detailed 18-month financial projections with realistic customer acquisition costs and revenue targets to strengthen investor confidence.",
      priority: "high"
    });
    
    // Team suggestion
    suggestions.push({
      title: "Fill Key Leadership Gaps",
      description: "Identify and recruit experienced talent for critical roles, particularly in areas of technological development and market expansion.",
      priority: "medium"
    });
    
    // Product suggestion
    suggestions.push({
      title: "Enhance Product Differentiation",
      description: "Clearly articulate unique value proposition and competitive advantages against established market players.",
      priority: "medium"
    });
    
    // Market validation suggestion
    suggestions.push({
      title: "Expand Market Validation",
      description: "Conduct additional customer interviews and gather quantitative feedback to strengthen product-market fit evidence.",
      priority: "high"
    });
    
    // Scaling suggestion
    suggestions.push({
      title: "Create Scalable Operations Plan",
      description: "Develop systems and processes that can scale efficiently with growth to maintain quality and customer satisfaction.",
      priority: "low"
    });
    
    return suggestions;
  };

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

  // Prepare derived values from analysis data
  const businessModel = analysis.businessModel ? analysis.businessModel.toUpperCase() : "Unknown";
  const strengthsData = analysis.strengths && analysis.strengths.length > 0
    ? analysis.strengths
    : generateStrengths(analysis);
  const weaknessesData = analysis.weaknesses && analysis.weaknesses.length > 0
    ? analysis.weaknesses
    : generateWeaknesses(analysis);
  const suggestionsData = analysis.suggestions && analysis.suggestions.length > 0
    ? analysis.suggestions
    : generateSuggestions(analysis);

  console.log('Evaluation insights data', {
    id,
    strengthsLength: strengthsData.length,
    weaknessesLength: weaknessesData.length,
    suggestionsLength: suggestionsData.length,
  });

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
          {id && !UUID_PATTERN.test(id) && (
            <LivePrice symbol={id.toUpperCase()} variant="full" className="mt-2" />
          )}
          <div className="flex flex-wrap items-center gap-2 mt-1">
          {analysis.createdAt && (
            <p className="text-muted-foreground">
              Analysis created on {new Date(analysis.createdAt).toLocaleDateString()}
            </p>
          )}
            
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

      {id && !UUID_PATTERN.test(id) && <StockHistorySection symbol={id} />}

      {/* Add Investor Match section if available */}
      {analysis.investorMatch && (
        <div className="mb-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-medium mb-4">Investor Criteria Match</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Overall Match</span>
                  <span className="text-sm font-medium text-primary">{analysis.investorMatch.overall}%</span>
                </div>
                <Progress 
                  value={analysis.investorMatch.overall} 
                  className="h-2"
                  indicatorClassName={
                    analysis.investorMatch.overall > 80 ? "bg-green-500" :
                    analysis.investorMatch.overall > 60 ? "bg-emerald-500" :
                    analysis.investorMatch.overall > 40 ? "bg-yellow-500" :
                    analysis.investorMatch.overall > 20 ? "bg-orange-500" : "bg-red-500"
                  }
                />
                <p className="text-xs text-muted-foreground">
                  {analysis.investorMatch.overall > 80 ? "Excellent match with your investment criteria" :
                   analysis.investorMatch.overall > 60 ? "Good match with your investment criteria" :
                   analysis.investorMatch.overall > 40 ? "Moderate match with your investment criteria" :
                   "Low match with your investment criteria"}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs font-medium">Industry Fit</span>
                    <span className="text-xs">{analysis.investorMatch.industryFit}%</span>
                  </div>
                  <Progress value={analysis.investorMatch.industryFit} className="h-1" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs font-medium">Stage Match</span>
                    <span className="text-xs">{analysis.investorMatch.stageMatch}%</span>
                  </div>
                  <Progress value={analysis.investorMatch.stageMatch} className="h-1" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs font-medium">Revenue Match</span>
                    <span className="text-xs">{analysis.investorMatch.revenueMatch}%</span>
                  </div>
                  <Progress value={analysis.investorMatch.revenueMatch} className="h-1" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs font-medium">Valuation Match</span>
                    <span className="text-xs">{analysis.investorMatch.valuationMatch}%</span>
                  </div>
                  <Progress value={analysis.investorMatch.valuationMatch} className="h-1" />
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Your Investment Criteria</h3>
              {analysis.investorMatch.investorPreferences && (
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground w-32">Preferred Industries:</span>
                    <span>
                      {analysis.investorMatch.investorPreferences.preferredIndustries?.length > 0 
                        ? analysis.investorMatch.investorPreferences.preferredIndustries.join(", ") 
                        : "Any industry"}
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground w-32">Preferred Stage:</span>
                    <span className="capitalize">
                      {analysis.investorMatch.investorPreferences.stagePreference || "Any stage"}
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground w-32">Min Revenue:</span>
                    <span>
                      {analysis.investorMatch.investorPreferences.minRevenue === "0" 
                        ? "No minimum" 
                        : `$${parseInt(analysis.investorMatch.investorPreferences.minRevenue).toLocaleString()}`}
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground w-32">Max Valuation:</span>
                    <span>
                      {analysis.investorMatch.investorPreferences.maxValuation === "no-limit" 
                        ? "No limit" 
                        : `$${parseInt(analysis.investorMatch.investorPreferences.maxValuation).toLocaleString()}`}
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground w-32">Risk Tolerance:</span>
                    <span>
                      {analysis.investorMatch.investorPreferences.riskTolerance > 70 
                        ? "High" 
                        : analysis.investorMatch.investorPreferences.riskTolerance > 40 
                        ? "Moderate" 
                        : "Conservative"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-medium mb-6">Evaluation Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Strengths Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircle2 className="h-5 w-5" />
              Key Strengths
            </h3>
            <ul className="space-y-3">
              {strengthsData.map((strength, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5">
                    <CheckCircle2 className="h-3 w-3 text-green-600 dark:text-green-400" />
                  </span>
                  <span>{strength.text}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Weaknesses Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2 text-red-600 dark:text-red-400">
              <XCircle className="h-5 w-5" />
              Key Weaknesses
            </h3>
            <ul className="space-y-3">
              {weaknessesData.map((weakness, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mt-0.5">
                    <XCircle className="h-3 w-3 text-red-600 dark:text-red-400" />
                  </span>
                  <span>{weakness.text}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Suggestions Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <TrendingUp className="h-5 w-5" />
              Improvement Areas
            </h3>
            <ul className="space-y-3">
              {suggestionsData.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mt-0.5">
                    <TrendingUp className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                  </span>
                  <div>
                    <span className="font-medium">{suggestion.title}</span>
                    <p className="text-muted-foreground text-xs mt-0.5">{suggestion.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
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
