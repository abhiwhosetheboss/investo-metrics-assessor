
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
  }
}

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

// This function would be replaced with actual API calls to the AI model
export const analyzeStartupWithAI = async (startupData: any, modelId: string): Promise<AnalysisResult> => {
  // In a real application, you would:
  // 1. Get the AI model details based on modelId
  // 2. Make an API call to the appropriate endpoint (OpenAI, Hugging Face, etc.)
  // 3. Process the response and return it
  
  // For now, we'll simulate this with a delay and mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      // Get the model info if available
      const storedModel = localStorage.getItem("selectedAIModel");
      const modelInfo = storedModel ? JSON.parse(storedModel) : null;
      
      // Generate a mock analysis
      const result = generateMockAnalysis(`mock-${Date.now()}`);
      
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

// Generate mock data for demo purposes
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
    createdAt: new Date().toISOString()
  };
};
