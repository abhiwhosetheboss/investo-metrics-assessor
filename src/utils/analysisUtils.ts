
import { sampleData } from './sampleData';
import { supabase } from "@/integrations/supabase/client";

export interface AnalysisResult {
  id: string;
  startupName: string;
  investibilityScore: number;
  overallRisk: number;
  riskFactors: {
    name: string;
    score: number;
    description: string;
  }[];
  strengths: {
    text: string;
    impact: "critical" | "high" | "medium" | "low";
  }[];
  weaknesses: {
    text: string;
    impact: "critical" | "high" | "medium" | "low";
  }[];
  suggestions: {
    title: string;
    description: string;
    priority: "high" | "medium" | "low";
  }[];
  categories: {
    name: string;
    value: number;
    description?: string;
  }[];
  createdAt?: string;
  aiModel?: {
    name: string;
    provider: string;
  };
  businessModel?: string;
  founderTrustRating?: number;
  pmfScore?: number;
  growthExpected?: string;
  industry?: string;  // Added this property to fix the TypeScript error
  postInvestmentMetrics?: {
    growthRate?: string;
    valuationIncrease?: string;
    successProbability?: number;
  };
  investorMatch?: {
    overall: number;
    industryFit: number;
    stageMatch: number;
    revenueMatch: number;
    valuationMatch: number;
    investorPreferences?: {
      preferredIndustries: string[];
      stagePreference: string;
      minRevenue: string;
      maxValuation: string;
      riskTolerance: number;
    };
  };
}

interface TrainingConfig {
  data: any[];
  metrics: {
    includeGrowth: boolean;
    includeValuationIncrease: boolean;
    includePostInvestmentSuccess: boolean;
  }
}

// Track the training status
let trainingStatus = {
  isTraining: false,
  progress: 0,
  isModelTrained: false,
  dataPoints: 0,
  includedMetrics: [] as string[]
};

// Fetch analysis from database first, then fall back to sample data
export const getAnalysisById = async (id: string): Promise<AnalysisResult> => {
  // Try to fetch from database first
  try {
    const { data, error } = await supabase
      .from('stock_analyses')
      .select('*')
      .eq('symbol', id.toUpperCase())
      .maybeSingle();

    if (data && !error) {
      return {
        id: data.symbol.toLowerCase(),
        startupName: `${data.company_name} (${data.symbol})`,
        industry: data.industry || undefined,
        investibilityScore: data.investibility_score,
        overallRisk: data.overall_risk,
        businessModel: data.business_model || undefined,
        founderTrustRating: data.founder_trust_rating || undefined,
        pmfScore: data.pmf_score || undefined,
        growthExpected: data.growth_expected || undefined,
        riskFactors: (data.risk_factors as any[]) || [],
        strengths: (data.strengths as any[]) || [],
        weaknesses: (data.weaknesses as any[]) || [],
        suggestions: (data.suggestions as any[]) || [],
        categories: (data.categories as any[]) || [],
      };
    }
  } catch (err) {
    console.log('Database fetch failed, using sample data:', err);
  }

  // Fall back to sample data
  let result = sampleData.find(item => item.id === id) || generateMockAnalysis(id);
  
  // Add AI model information if one is selected
  const storedModel = localStorage.getItem("selectedAIModel");
  if (storedModel) {
    const model = JSON.parse(storedModel);
    result = {
      ...result,
      aiModel: {
        name: model.name,
        provider: model.provider
      }
    };
  }
  
  // Add post-investment metrics if those were included in training
  const includedMetrics = localStorage.getItem("includedMetrics");
  if (includedMetrics) {
    const metrics = JSON.parse(includedMetrics);
    
    const postInvestmentMetrics: any = {};
    
    if (metrics.includes('growth')) {
      postInvestmentMetrics.growthRate = `${Math.floor(30 + Math.random() * 70)}%`;
    }
    
    if (metrics.includes('valuationIncrease')) {
      const valIncrease = ['2x', '3x', '5x', '10x', '15x'];
      postInvestmentMetrics.valuationIncrease = valIncrease[Math.floor(Math.random() * valIncrease.length)];
    }
    
    if (metrics.includes('postInvestmentSuccess')) {
      postInvestmentMetrics.successProbability = Math.floor(50 + Math.random() * 40);
    }
    
    if (Object.keys(postInvestmentMetrics).length > 0) {
      result.postInvestmentMetrics = postInvestmentMetrics;
    }
  }
  
  return result;
};

// Get all analyses - fetch from database first, then fall back to sample data
export const getAllAnalyses = async (): Promise<AnalysisResult[]> => {
  try {
    const { data, error } = await supabase
      .from('stock_analyses')
      .select('*')
      .order('investibility_score', { ascending: false });

    if (data && data.length > 0 && !error) {
      return data.map(stock => ({
        id: stock.symbol.toLowerCase(),
        startupName: `${stock.company_name} (${stock.symbol})`,
        industry: stock.industry || undefined,
        investibilityScore: stock.investibility_score,
        overallRisk: stock.overall_risk,
        businessModel: stock.business_model || undefined,
        founderTrustRating: stock.founder_trust_rating || undefined,
        pmfScore: stock.pmf_score || undefined,
        growthExpected: stock.growth_expected || undefined,
        riskFactors: (stock.risk_factors as any[]) || [],
        strengths: (stock.strengths as any[]) || [],
        weaknesses: (stock.weaknesses as any[]) || [],
        suggestions: (stock.suggestions as any[]) || [],
        categories: (stock.categories as any[]) || [],
      }));
    }
  } catch (err) {
    console.log('Database fetch failed, using sample data:', err);
  }

  // Fall back to sample data
  return sampleData;
};

// Since we're removing save functionality as requested, we'll create mock functions 
// that maintain the API but don't actually save anything
export const getSavedAnalyses = (): Promise<AnalysisResult[]> => {
  return new Promise((resolve) => {
    // Return a subset of sampleData as "saved" analyses
    const savedItems = sampleData.slice(0, 3);
    resolve(savedItems);
  });
};

export const saveAnalysis = async (analysisData: any): Promise<{ success: boolean, message: string }> => {
  console.log("Save analysis functionality has been disabled", analysisData);
  return { success: true, message: "Analysis saved (mock)" };
};

export const deleteSavedAnalysis = async (id: string): Promise<{ success: boolean, message: string }> => {
  console.log("Delete analysis functionality has been disabled", id);
  return { success: true, message: "Analysis deleted (mock)" };
};

// Train the AI model on the dataset
export const trainAIModel = async (config: TrainingConfig | any[]): Promise<{success: boolean, message: string}> => {
  // In a real application, this would send the data to an actual AI training pipeline
  return new Promise((resolve) => {
    // Handle both new config format and legacy array format
    const dataset = Array.isArray(config) ? config : config.data;
    const metrics = Array.isArray(config) ? { 
      includeGrowth: false, 
      includeValuationIncrease: false, 
      includePostInvestmentSuccess: false 
    } : config.metrics;
    
    // Set training status
    trainingStatus.isTraining = true;
    trainingStatus.progress = 0;
    trainingStatus.dataPoints = dataset.length;
    
    // Track which metrics are being included
    const includedMetrics = [];
    if (metrics.includeGrowth) includedMetrics.push('growth');
    if (metrics.includeValuationIncrease) includedMetrics.push('valuationIncrease');
    if (metrics.includePostInvestmentSuccess) includedMetrics.push('postInvestmentSuccess');
    
    trainingStatus.includedMetrics = includedMetrics;
    
    // Store the included metrics in localStorage for persistence
    localStorage.setItem("includedMetrics", JSON.stringify(includedMetrics));
    
    // Simulate training process with progress updates
    const totalSteps = 10;
    let currentStep = 0;
    
    const trainingInterval = setInterval(() => {
      currentStep++;
      trainingStatus.progress = Math.round((currentStep / totalSteps) * 100);
      
      if (currentStep >= totalSteps) {
        clearInterval(trainingInterval);
        trainingStatus.isTraining = false;
        trainingStatus.isModelTrained = true;
        
        // Store training completion in localStorage for persistence
        localStorage.setItem("aiModelTrained", "true");
        localStorage.setItem("trainedDataPoints", dataset.length.toString());
        
        resolve({
          success: true,
          message: `Model successfully trained on ${dataset.length} data points with advanced metrics`
        });
      }
    }, 500);
  });
};

// Get current training status
export const getTrainingStatus = (): typeof trainingStatus => {
  // Check if we have stored training status
  if (!trainingStatus.isModelTrained) {
    const trained = localStorage.getItem("aiModelTrained");
    if (trained === "true") {
      trainingStatus.isModelTrained = true;
      trainingStatus.dataPoints = parseInt(localStorage.getItem("trainedDataPoints") || "0");
      trainingStatus.progress = 100;
      
      // Retrieve the included metrics
      const includedMetrics = localStorage.getItem("includedMetrics");
      if (includedMetrics) {
        trainingStatus.includedMetrics = JSON.parse(includedMetrics);
      }
    }
  }
  return { ...trainingStatus };
};

// Call the OpenAI-powered edge function for real AI analysis
export const analyzeStartupWithAI = async (startupData: any, modelId: string): Promise<AnalysisResult> => {
  // Check if model is trained
  const trainStatus = getTrainingStatus();
  
  if (!trainStatus.isModelTrained) {
    // If model is not trained, throw error
    throw new Error("Please train the AI model before running analysis");
  }
  
  try {
    console.log('Calling analyze-startup edge function with data:', startupData);

    // Use the backend function invocation so the user's session JWT is sent automatically
    const { data, error } = await supabase.functions.invoke('analyze-startup', {
      body: {
        startupData,
        modelId,
      },
    });

    if (error) {
      const anyErr: any = error;
      const status = anyErr?.status;

      if (status === 401) {
        throw new Error('Please sign in again to analyze startups.');
      }
      if (status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment and try again.');
      }
      if (status === 402) {
        throw new Error('AI credits exhausted. Please add funds to continue.');
      }

      throw new Error(anyErr?.message || 'Analysis failed. Please try again.');
    }

    const result = data as any;
    
    // Add investor match analysis if investor thesis was provided
    if (startupData.investorThesis) {
      const thesis = startupData.investorThesis;
      const investorMatch = calculateInvestorMatch(startupData, thesis);
      result.investorMatch = investorMatch;
      
      // Adjust investibility score based on investor preferences
      result.investibilityScore = adjustScoreBasedOnInvestorPreferences(
        result.investibilityScore, 
        investorMatch,
        startupData,
        thesis
      );
    }

    // Save analysis to database if user is authenticated
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { error: insertError } = await supabase
          .from('analyses')
          .insert({
            user_id: session.user.id,
            startup_name: startupData.name || startupData.startupName || 'Unnamed Startup',
            industry: startupData.industry,
            business_model: startupData.businessModel,
            investibility_score: result.investibilityScore,
            overall_risk: result.overallRisk,
            founder_trust_rating: result.founderTrustRating,
            pmf_score: result.pmfScore,
            growth_expected: result.growthExpected,
            strengths: result.strengths,
            weaknesses: result.weaknesses,
            suggestions: result.suggestions,
            risk_factors: result.riskFactors,
            categories: result.categories,
            raw_input: startupData,
          });
        
        if (insertError) {
          console.error('Error saving analysis to database:', insertError);
        } else {
          console.log('Analysis saved to database successfully');
        }
      }
    } catch (saveError) {
      console.error('Error saving analysis:', saveError);
      // Don't throw - analysis still succeeded, just didn't save
    }
    
    return result;
  } catch (error) {
    console.error('Error calling analyze-startup edge function:', error);
    throw error;
  }
};

// Calculate how well the startup matches with investor preferences
const calculateInvestorMatch = (startupData: any, investorThesis: any) => {
  let industryFit = 0;
  let stageMatch = 0;
  let revenueMatch = 0;
  let valuationMatch = 0;
  
  // Check industry fit
  if (investorThesis.preferredIndustries && investorThesis.preferredIndustries.length > 0) {
    // Simplified check - in a real app would do more sophisticated matching
    if (investorThesis.preferredIndustries.some((industry: string) => 
        startupData.industry && startupData.industry.toLowerCase().includes(industry.toLowerCase()))) {
      industryFit = 100;
    } else {
      industryFit = 20; // Some base score if industries don't match exactly
    }
  } else {
    industryFit = 80; // No specific industry preference specified
  }
  
  // Check stage match
  if (investorThesis.stagePreference && investorThesis.stagePreference !== "any") {
    // This is a simplified match - would be more sophisticated in a real app
    // Based on revenue, team size, etc.
    const startupStage = determineStartupStage(startupData);
    if (startupStage === investorThesis.stagePreference) {
      stageMatch = 100;
    } else {
      stageMatch = 30; // Some base score if stage doesn't match exactly
    }
  } else {
    stageMatch = 80; // No specific stage preference
  }
  
  // Check revenue match
  if (investorThesis.minRevenue && investorThesis.minRevenue !== "0") {
    const minRevenue = parseInt(investorThesis.minRevenue);
    // Extract numeric value from revenue string (e.g. "$100K ARR" -> 100000)
    const startupRevenue = extractNumericValue(startupData.revenue);
    
    if (startupRevenue >= minRevenue) {
      revenueMatch = 100;
    } else if (startupRevenue >= minRevenue * 0.7) {
      revenueMatch = 70; // Close to minimum requirement
    } else {
      revenueMatch = 20; // Far below minimum requirement
    }
  } else {
    revenueMatch = 100; // No minimum revenue required
  }
  
  // Check valuation match
  if (investorThesis.maxValuation && investorThesis.maxValuation !== "no-limit") {
    const maxValuation = parseInt(investorThesis.maxValuation);
    // Extract numeric value from valuation string
    const startupValuation = extractNumericValue(startupData.valuation);
    
    if (startupValuation <= maxValuation) {
      valuationMatch = 100;
    } else if (startupValuation <= maxValuation * 1.3) {
      valuationMatch = 70; // Slightly above max valuation
    } else {
      valuationMatch = 30; // Far above max valuation
    }
  } else {
    valuationMatch = 100; // No maximum valuation limit
  }
  
  // Calculate overall match score (weighted average)
  const overallMatch = Math.round(
    (industryFit * 0.3) + 
    (stageMatch * 0.3) + 
    (revenueMatch * 0.2) + 
    (valuationMatch * 0.2)
  );
  
  return {
    overall: overallMatch,
    industryFit,
    stageMatch,
    revenueMatch,
    valuationMatch,
    investorPreferences: {
      preferredIndustries: investorThesis.preferredIndustries,
      stagePreference: investorThesis.stagePreference,
      minRevenue: investorThesis.minRevenue,
      maxValuation: investorThesis.maxValuation,
      riskTolerance: investorThesis.riskTolerance
    }
  };
};

// Helper function to determine startup stage based on various metrics
const determineStartupStage = (startupData: any) => {
  // This is a simplified determination - would be more sophisticated in a real app
  
  // Extract numeric value from revenue string
  const revenue = extractNumericValue(startupData.revenue || '0');
  
  if (revenue === 0) {
    return "pre-seed";
  } else if (revenue < 100000) {
    return "seed";
  } else if (revenue < 1000000) {
    return "series a";
  } else if (revenue < 10000000) {
    return "series b";
  } else {
    return "series c+";
  }
};

// Helper function to extract numeric value from string like "$100K ARR" or "$5M"
const extractNumericValue = (valueString: string) => {
  if (!valueString) return 0;
  
  // Remove non-numeric characters except for K, M, B (thousands, millions, billions)
  const numericPart = valueString.replace(/[^0-9\.KMB]/gi, "");
  
  // Extract the base number
  const numMatch = numericPart.match(/^(\d+\.?\d*)/);
  if (!numMatch) return 0;
  
  const baseNumber = parseFloat(numMatch[0]);
  
  // Apply multiplier based on K, M, B suffix
  if (numericPart.toUpperCase().includes("K")) {
    return baseNumber * 1000;
  } else if (numericPart.toUpperCase().includes("M")) {
    return baseNumber * 1000000;
  } else if (numericPart.toUpperCase().includes("B")) {
    return baseNumber * 1000000000;
  } else {
    return baseNumber;
  }
};

// Adjust investibility score based on investor preferences
const adjustScoreBasedOnInvestorPreferences = (
  originalScore: number, 
  investorMatch: any,
  startupData: any,
  investorThesis: any
) => {
  let adjustedScore = originalScore;
  
  // Factor in the overall match
  const matchAdjustment = ((investorMatch.overall - 50) / 50) * 20; // Scale to -20 to +20
  adjustedScore += matchAdjustment;
  
  // Apply risk tolerance adjustment
  // Lower tolerance means more conservative, so they want safer investments with higher scores
  const riskToleranceAdjustment = ((50 - investorThesis.riskTolerance) / 50) * 10;
  if (originalScore < 60) {
    // For riskier startups, conservative investors would rate them lower
    adjustedScore += riskToleranceAdjustment * -1;
  } else {
    // For safer startups, conservative investors would rate them higher
    adjustedScore += riskToleranceAdjustment;
  }
  
  // Apply team importance factor if the investor cares a lot about team
  if (investorThesis.teamImportance > 70) {
    const teamScore = (
      (startupData.founderTrustRating || 5) * 10 + 
      (startupData.teamCapability || 5) * 10
    ) / 2;
    
    const teamAdjustment = ((teamScore - 50) / 50) * 15 * (investorThesis.teamImportance / 100);
    adjustedScore += teamAdjustment;
  }
  
  // Apply market size preference
  // If investor prefers large markets and startup has large TAM, increase score
  if (investorThesis.marketSizePreference > 70 && startupData.targetMarketSize) {
    const targetMarketSize = startupData.targetMarketSize.toString().toUpperCase();
    if (targetMarketSize.includes("B") || parseInt(extractNumericValue(targetMarketSize).toString()) > 1000000000) {
      adjustedScore += 10;
    }
  }
  
  // If investor prefers niche markets and startup has niche focus, increase score
  if (investorThesis.marketSizePreference < 30 && startupData.targetMarketSize) {
    const targetMarketSize = startupData.targetMarketSize.toString().toUpperCase();
    if (!targetMarketSize.includes("B") && parseInt(extractNumericValue(targetMarketSize).toString()) < 100000000) {
      adjustedScore += 10;
    }
  }
  
  // Cap the score between 0 and 100
  return Math.min(Math.max(Math.round(adjustedScore), 0), 100);
};

// Generate a more intelligent mock analysis based on the input data
const generateSmartAnalysis = (startupData: any): AnalysisResult => {
  // Calculate investibility score based on various factors
  let investibilityScore = 50; // Base score
  
  // Adjust based on team factors
  if (startupData.keyRolesFilled) investibilityScore += 5;
  if (startupData.domainExpertise > 70) investibilityScore += 7;
  if (startupData.technicalSkills > 70) investibilityScore += 5;
  if (startupData.businessSkills > 70) investibilityScore += 5;
  
  // Adjust based on product-market fit
  if (startupData.pmfScore > 70) investibilityScore += 10;
  
  // Adjust based on financials
  const hasRevenue = startupData.revenue && startupData.revenue.trim() !== "";
  if (hasRevenue) investibilityScore += 8;
  
  // Positive growth rate
  if (startupData.growthRate && startupData.growthRate.includes("%") && !startupData.growthRate.includes("-")) {
    investibilityScore += 6;
  }
  
  // Adjust based on intangibles
  if (startupData.passionLevel > 80) investibilityScore += 3;
  if (startupData.leadershipScore > 80) investibilityScore += 3;
  
  // Cap the score at 100
  investibilityScore = Math.min(Math.max(investibilityScore, 0), 100);
  
  // Calculate overall risk (inverse of investibility with some noise)
  const overallRisk = Math.min(Math.max(100 - investibilityScore + (Math.random() * 10 - 5), 0), 100);
  
  // Generate risk factors
  const riskFactors = [
    {
      name: "Market Risk",
      score: 100 - (startupData.pmfScore || 50),
      description: "Risk associated with market conditions and demand."
    },
    {
      name: "Team Risk",
      score: 100 - ((startupData.teamExperience ? 70 : 40) + (startupData.keyRolesFilled ? 20 : 0)),
      description: "Risk associated with team composition and expertise."
    },
    {
      name: "Financial Risk",
      score: hasRevenue ? 50 : 80,
      description: "Risk associated with financial stability and projections."
    },
    {
      name: "Technology Risk",
      score: 100 - (startupData.technicalSkills || 50),
      description: "Risk associated with technological implementation and scalability."
    }
  ];

  // Generate strengths
  const strengths = [];
  if (startupData.domainExpertise > 70) {
    strengths.push({
      text: "Strong domain expertise in the target industry",
      impact: "high" as const
    });
  }
  
  if (startupData.teamExperience && startupData.teamExperience.length > 20) {
    strengths.push({
      text: "Experienced team with relevant background",
      impact: "critical" as const
    });
  }
  
  if (startupData.pmfScore > 70) {
    strengths.push({
      text: "Strong product-market fit with validated demand",
      impact: "critical" as const
    });
  }
  
  if (hasRevenue) {
    strengths.push({
      text: "Revenue-generating business model",
      impact: "high" as const
    });
  }
  
  if (strengths.length === 0) {
    strengths.push({
      text: "Passionate founding team",
      impact: "medium" as const
    });
  }

  // Generate weaknesses
  const weaknesses = [];
  if (startupData.domainExpertise < 50) {
    weaknesses.push({
      text: "Limited domain expertise in the target industry",
      impact: "high" as const
    });
  }
  
  if (!startupData.keyRolesFilled) {
    weaknesses.push({
      text: "Key team roles not fully filled",
      impact: "high" as const
    });
  }
  
  if (!hasRevenue) {
    weaknesses.push({
      text: "Pre-revenue business model",
      impact: "medium" as const
    });
  }
  
  if (weaknesses.length === 0) {
    weaknesses.push({
      text: "Potential scaling challenges in competitive market",
      impact: "low" as const
    });
  }

  // Generate suggestions
  const suggestions = [
    {
      title: "Strengthen Financial Position",
      description: hasRevenue ? 
        "Focus on improving unit economics and extending runway." : 
        "Prioritize finding paying customers to validate business model.",
      priority: "high" as const
    },
    {
      title: startupData.keyRolesFilled ? "Expand Advisory Board" : "Complete Core Team",
      description: startupData.keyRolesFilled ?
        "Add industry experts to advisors to help navigate challenges." :
        "Fill critical gaps in the team with experienced professionals.",
      priority: "medium" as const
    },
    {
      title: "Improve Market Validation",
      description: "Gather more customer feedback and refine product-market fit.",
      priority: "medium" as const
    }
  ];

  // Generate categories based on input data
  const categories = [
    { 
      name: "Product-Market Fit", 
      value: startupData.pmfScore || Math.floor(Math.random() * 100),
      description: "How well the product meets market needs"
    },
    { 
      name: "Founder-Market Fit", 
      value: startupData.domainExpertise || Math.floor(Math.random() * 100),
      description: "How well the founders understand the market"
    },
    { 
      name: "Team Composition", 
      value: startupData.keyRolesFilled ? 80 : 50,
      description: "Quality and completeness of the team"
    },
    { 
      name: "Financials", 
      value: hasRevenue ? 70 : 30,
      description: "Financial health and projections"
    },
    { 
      name: "Exit Strategy", 
      value: startupData.expectedExitValue ? 75 : 40,
      description: "Clarity and feasibility of exit plan"
    },
    { 
      name: "Intangibles", 
      value: startupData.passionLevel || Math.floor(Math.random() * 100),
      description: "Leadership, passion, and other soft factors"
    }
  ];

  return {
    id: `analysis-${Date.now()}`,
    startupName: startupData.name || "Startup",
    investibilityScore,
    overallRisk,
    riskFactors,
    strengths,
    weaknesses,
    suggestions,
    categories,
    createdAt: new Date().toISOString(),
    businessModel: startupData.businessModel || "b2c",
    founderTrustRating: startupData.founderTrustRating || 5,
    pmfScore: startupData.pmfScore || 50,
    growthExpected: startupData.growthExpected || "20%"
  };
};

// Generate mock data for demo purposes (fallback)
const generateMockAnalysis = (id: string): AnalysisResult => {
  const investibilityScore = Math.floor(Math.random() * 100);
  const overallRisk = 100 - investibilityScore;
  
  return {
    id,
    startupName: "Demo Startup",
    investibilityScore,
    overallRisk,
    riskFactors: [
      {
        name: "Market Risk",
        score: Math.floor(Math.random() * 100),
        description: "Risk associated with market conditions and demand."
      },
      {
        name: "Team Risk",
        score: Math.floor(Math.random() * 100),
        description: "Risk associated with team composition and expertise."
      },
      {
        name: "Financial Risk",
        score: Math.floor(Math.random() * 100),
        description: "Risk associated with financial stability and projections."
      },
      {
        name: "Technology Risk",
        score: Math.floor(Math.random() * 100),
        description: "Risk associated with technological implementation and scalability."
      }
    ],
    strengths: [
      {
        text: "Strong founding team with industry experience",
        impact: "high"
      },
      {
        text: "Validated product with early customer traction",
        impact: "medium"
      },
      {
        text: "Scalable business model with high margins",
        impact: "critical"
      }
    ],
    weaknesses: [
      {
        text: "Limited runway with high burn rate",
        impact: "high"
      },
      {
        text: "Market competition from established players",
        impact: "medium"
      },
      {
        text: "Regulatory challenges in target markets",
        impact: "low"
      }
    ],
    suggestions: [
      {
        title: "Strengthen Financial Position",
        description: "Reduce burn rate by 20% and focus on extending runway before next fundraising round.",
        priority: "high"
      },
      {
        title: "Expand Advisory Board",
        description: "Add industry experts to advisors to help navigate regulatory challenges.",
        priority: "medium"
      },
      {
        title: "Improve Customer Retention",
        description: "Implement stronger customer success program to increase retention rates.",
        priority: "medium"
      }
    ],
    categories: [
      { name: "Product-Market Fit", value: Math.floor(Math.random() * 100) },
      { name: "Founder-Market Fit", value: Math.floor(Math.random() * 100) },
      { name: "Team Composition", value: Math.floor(Math.random() * 100) },
      { name: "Financials", value: Math.floor(Math.random() * 100) },
      { name: "Exit Strategy", value: Math.floor(Math.random() * 100) },
      { name: "Intangibles", value: Math.floor(Math.random() * 100) }
    ],
    createdAt: new Date().toISOString(),
    businessModel: ["b2b", "b2c", "d2c", "marketplace"][Math.floor(Math.random() * 4)],
    founderTrustRating: Math.floor(Math.random() * 10) + 1,
    pmfScore: Math.floor(Math.random() * 100),
    growthExpected: `${Math.floor(Math.random() * 100)}%`
  };
};
