
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
}

// In a real application, this would be an API call
export const getAnalysisById = (id: string): Promise<AnalysisResult> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const result = sampleData.find(item => item.id === id) || generateMockAnalysis(id);
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
