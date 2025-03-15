import { sampleData } from './sampleData';

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
  createdAt: string;
  aiModel?: {
    name: string;
    provider: string;
  };
  businessModel?: string;
  founderTrustRating?: number;
  pmfScore?: number;
  growthExpected?: string;
}

// Track the training status
let trainingStatus = {
  isTraining: false,
  progress: 0,
  isModelTrained: false,
  dataPoints: 0
};

// In a real application, this would make an API call to an AI model
export const getAnalysisById = (id: string): Promise<AnalysisResult> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
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
      
      resolve(result);
    }, 800);
  });
};

// Get all analyses (for dashboard)
export const getAllAnalyses = (): Promise<AnalysisResult[]> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve(sampleData);
    }, 800);
  });
};

// Train the AI model on the dataset
export const trainAIModel = async (dataset: any[]): Promise<{success: boolean, message: string}> => {
  // In a real application, this would send the data to an actual AI training pipeline
  return new Promise((resolve) => {
    // Set training status
    trainingStatus.isTraining = true;
    trainingStatus.progress = 0;
    trainingStatus.dataPoints = dataset.length;
    
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
          message: `Model successfully trained on ${dataset.length} data points`
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
    }
  }
  return { ...trainingStatus };
};

// This function would be replaced with actual API calls to the AI model in a real app
export const analyzeStartupWithAI = async (startupData: any, modelId: string): Promise<AnalysisResult> => {
  // Check if model is trained
  const trainStatus = getTrainingStatus();
  
  if (!trainStatus.isModelTrained) {
    // If model is not trained, throw error
    throw new Error("Please train the AI model before running analysis");
  }
  
  // In a real application, you would:
  // 1. Get the AI model details based on modelId
  // 2. Make an API call to the appropriate endpoint (OpenAI, Hugging Face, etc.)
  // 3. Process the response and return it
  
  // For now, we'll simulate this with a delay and more intelligent mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      // Get the model info if available
      const storedModel = localStorage.getItem("selectedAIModel");
      const modelInfo = storedModel ? JSON.parse(storedModel) : null;
      
      // Generate a more customized analysis based on input data
      const result = generateSmartAnalysis(startupData);
      
      // Add the startup name from the input data
      result.startupName = startupData.name || "Unnamed Startup";
      
      // Add AI model information if available
      if (modelInfo) {
        result.aiModel = {
          name: modelInfo.name,
          provider: modelInfo.provider
        };
      }
      
      resolve(result);
    }, 2000);
  });
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
