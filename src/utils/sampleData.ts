import { AnalysisResult } from './analysisUtils';

// Sample data for demo purposes
export const sampleData: AnalysisResult[] = [
  {
    id: "startup-1",
    startupName: "EcoTech Solutions",
    investibilityScore: 78,
    overallRisk: 42,
    riskFactors: [
      {
        name: "Market Risk",
        score: 35,
        description: "Moderate market risk due to emerging competition but growing market size."
      },
      {
        name: "Team Risk",
        score: 25,
        description: "Strong founding team with complementary skills and previous startup experience."
      },
      {
        name: "Financial Risk",
        score: 60,
        description: "Higher financial risk due to burn rate and longer path to profitability."
      },
      {
        name: "Technology Risk",
        score: 45,
        description: "Some technical challenges with scalability but core technology is proven."
      }
    ],
    strengths: [
      {
        text: "Strong founding team with previous exits",
        impact: "critical"
      },
      {
        text: "Patent-protected technology with barriers to entry",
        impact: "high"
      },
      {
        text: "Large addressable market with clear pain point",
        impact: "high"
      }
    ],
    weaknesses: [
      {
        text: "High burn rate relative to revenue",
        impact: "critical"
      },
      {
        text: "Customer acquisition costs trending upward",
        impact: "high"
      },
      {
        text: "Key technical hire needed for scaling",
        impact: "medium"
      }
    ],
    suggestions: [
      {
        title: "Optimize Customer Acquisition",
        description: "Focus on reducing CAC by 20% through more targeted marketing channels and improving conversion rates.",
        priority: "high"
      },
      {
        title: "Strategic Technical Hire",
        description: "Prioritize hiring a senior backend developer with scalability experience to address technical debt.",
        priority: "medium"
      },
      {
        title: "Explore Alternative Revenue Streams",
        description: "Investigate subscription-based model to complement the current transactional approach.",
        priority: "medium"
      }
    ],
    categories: [
      { name: "Product-Market Fit", value: 80 },
      { name: "Founder-Market Fit", value: 85 },
      { name: "Team Composition", value: 75 },
      { name: "Financials", value: 60 },
      { name: "Exit Strategy", value: 70 },
      { name: "Intangibles", value: 85 }
    ],
    createdAt: "2023-10-15T14:30:00Z"
  },
  {
    id: "startup-2",
    startupName: "HealthMinder AI",
    investibilityScore: 65,
    overallRisk: 55,
    riskFactors: [
      {
        name: "Market Risk",
        score: 45,
        description: "Healthcare market has regulatory hurdles but strong growth potential."
      },
      {
        name: "Team Risk",
        score: 40,
        description: "Good technical team but lacks healthcare industry experience."
      },
      {
        name: "Financial Risk",
        score: 70,
        description: "Long sales cycles and high customer acquisition costs in healthcare."
      },
      {
        name: "Technology Risk",
        score: 35,
        description: "Technology is innovative with working prototypes and early validation."
      }
    ],
    strengths: [
      {
        text: "Novel AI approach with demonstrated accuracy improvements",
        impact: "high"
      },
      {
        text: "Strong partnerships with two major hospital networks",
        impact: "critical"
      },
      {
        text: "Growing team with technical excellence",
        impact: "medium"
      }
    ],
    weaknesses: [
      {
        text: "Regulatory approval timeline uncertainty",
        impact: "high"
      },
      {
        text: "Limited healthcare industry expertise on founding team",
        impact: "medium"
      },
      {
        text: "Cash runway concerns with current burn rate",
        impact: "critical"
      }
    ],
    suggestions: [
      {
        title: "Healthcare Industry Advisor",
        description: "Bring on an experienced healthcare executive as advisor or board member to navigate regulatory landscape.",
        priority: "high"
      },
      {
        title: "Extend Runway",
        description: "Identify non-dilutive funding opportunities such as grants or strategic partnerships to extend cash runway.",
        priority: "high"
      },
      {
        title: "Simplify Initial Product",
        description: "Consider focusing on a smaller feature set for initial regulatory approval to accelerate time to market.",
        priority: "medium"
      }
    ],
    categories: [
      { name: "Product-Market Fit", value: 75 },
      { name: "Founder-Market Fit", value: 55 },
      { name: "Team Composition", value: 65 },
      { name: "Financials", value: 50 },
      { name: "Exit Strategy", value: 70 },
      { name: "Intangibles", value: 80 }
    ],
    createdAt: "2023-09-20T10:15:00Z"
  },
  {
    id: "startup-3",
    startupName: "LogisticsHub",
    investibilityScore: 82,
    overallRisk: 33,
    riskFactors: [
      {
        name: "Market Risk",
        score: 30,
        description: "Large established market with clear inefficiencies the product addresses."
      },
      {
        name: "Team Risk",
        score: 25,
        description: "Founding team has deep industry experience and previous startup success."
      },
      {
        name: "Financial Risk",
        score: 45,
        description: "Healthy margins but requires significant capital for expansion."
      },
      {
        name: "Technology Risk",
        score: 30,
        description: "Technology is proven with multiple successful deployments."
      }
    ],
    strengths: [
      {
        text: "Founders have 25+ years combined logistics experience",
        impact: "critical"
      },
      {
        text: "Product demonstrating 30% efficiency improvements for clients",
        impact: "high"
      },
      {
        text: "Strong unit economics with 75% gross margins",
        impact: "high"
      }
    ],
    weaknesses: [
      {
        text: "Enterprise sales cycles longer than initially projected",
        impact: "medium"
      },
      {
        text: "Competition from well-funded startups entering the space",
        impact: "medium"
      },
      {
        text: "Integration challenges with legacy systems",
        impact: "low"
      }
    ],
    suggestions: [
      {
        title: "Develop Mid-Market Strategy",
        description: "Create a streamlined offering for mid-market companies to reduce sales cycle and increase growth rate.",
        priority: "medium"
      },
      {
        title: "Build API Ecosystem",
        description: "Accelerate development of API connectors for common legacy systems to reduce integration friction.",
        priority: "medium"
      },
      {
        title: "Customer Success Program",
        description: "Implement structured customer success program to drive referrals and reduce acquisition costs.",
        priority: "low"
      }
    ],
    categories: [
      { name: "Product-Market Fit", value: 85 },
      { name: "Founder-Market Fit", value: 90 },
      { name: "Team Composition", value: 80 },
      { name: "Financials", value: 75 },
      { name: "Exit Strategy", value: 80 },
      { name: "Intangibles", value: 75 }
    ],
    createdAt: "2023-11-05T09:45:00Z"
  }
];

// Generator function to create more Shark Tank episodes with realistic data
const generateSharkTankEpisodes = (count: number) => {
  const sources = ['US Shark Tank', 'Shark Tank India', 'Shark Tank Australia', 'Dragons\' Den UK', 'Shark Tank Colombia', 'Shark Tank Mexico', 'Dragons\' Den Canada', 'Shark Tank Vietnam'];
  const possibleInvestors = {
    'US Shark Tank': ['Mark Cuban', 'Kevin O\'Leary', 'Lori Greiner', 'Barbara Corcoran', 'Daymond John', 'Robert Herjavec', 'Daniel Lubetzky', 'Emma Grede'],
    'Shark Tank India': ['Aman Gupta', 'Anupam Mittal', 'Namita Thapar', 'Vineeta Singh', 'Peyush Bansal', 'Ghazal Alagh', 'Amit Jain'],
    'Shark Tank Australia': ['Janine Allis', 'Andrew Banks', 'Steve Baxter', 'Naomi Simson', 'Glen Richards', 'Boost John', 'Marissa Payne'],
    'Dragons\' Den UK': ['Peter Jones', 'Deborah Meaden', 'Touker Suleyman', 'Sara Davies', 'Steven Bartlett', 'Tej Lalvani', 'Duncan Bannatyne'],
    'Shark Tank Colombia': ['Alexander Torrenegra', 'Alejandra Torres', 'Ricardo Leyva', 'Andrea Arnau', 'Carlos Cubillos'],
    'Shark Tank Mexico': ['Carlos Bremer', 'Arturo Elías Ayub', 'Marcus Dantus', 'Rodrigo Herrera', 'Deborah Dana'],
    'Dragons\' Den Canada': ['Jim Treliving', 'Arlene Dickinson', 'Michele Romanow', 'Manjit Minhas', 'Vincenzo Guzzo'],
    'Shark Tank Vietnam': ['Phạm Thanh Hưng', 'Nguyễn Hòa Bình', 'Nguyễn Ngọc Thủy', 'Đỗ Liên', 'Trần Anh Vương']
  };
  
  const industries = ['Food & Beverage', 'Tech', 'Health & Wellness', 'Fashion', 'Education', 'Sustainable Products', 'Home Solutions', 'Beauty', 'Fitness', 'Pet Products', 'Children\'s Products', 'Entertainment', 'Outdoors', 'Travel', 'Financial Services'];
  
  const outcomes = ['deal', 'no deal'];
  
  const episodes = [];
  
  for (let i = 0; i < count; i++) {
    const source = sources[Math.floor(Math.random() * sources.length)];
    const season = Math.floor(Math.random() * 15) + 1;
    const episode = Math.floor(Math.random() * 24) + 1;
    const industry = industries[Math.floor(Math.random() * industries.length)];
    const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];
    
    // Create a startup name using industry keywords
    const prefixes = ['Smart', 'Eco', 'Tech', 'Next', 'Pure', 'Pro', 'Zen', 'Swift', 'Nova', 'Vital', 'Peak', 'Prime', 'Flex', 'Lux', 'Bio'];
    const suffixes = ['Solutions', 'Hub', 'Box', 'Connect', 'Craft', 'Labs', 'Ware', 'Boost', 'Genius', 'Mind', 'Wave', 'Sync', 'Blend', 'Go', 'Life'];
    const startupName = `${prefixes[Math.floor(Math.random() * prefixes.length)]}${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
    
    // Generate a realistic valuation
    const baseFactor = Math.floor(Math.random() * 20) + 1;
    const valuation = baseFactor * 500000;
    
    // Create ask string based on source (different currencies)
    let askAmount, askEquity, askString;
    askEquity = Math.floor(Math.random() * 25) + 5; // 5% to 30%
    askAmount = Math.floor(valuation * (askEquity / 100));
    
    if (source === 'Shark Tank India') {
      askString = `₹${Math.round(askAmount / 10000) / 10} crore for ${askEquity}% equity`;
    } else if (source === 'Dragons\' Den UK') {
      askString = `£${Math.round(askAmount / 100000) * 10}0,000 for ${askEquity}% equity`;
    } else {
      askString = `$${Math.round(askAmount / 10000) * 10},000 for ${askEquity}% equity`;
    }
    
    // Generate investors if there was a deal
    let investors: string[] = [];
    let dealAmount = 0;
    let dealEquity = 0;
    
    if (outcome === 'deal') {
      const sourceInvestors = possibleInvestors[source as keyof typeof possibleInvestors];
      const numInvestors = Math.random() > 0.7 ? 2 : 1; // 30% chance of 2 investors
      
      for (let j = 0; j < numInvestors; j++) {
        const investor = sourceInvestors[Math.floor(Math.random() * sourceInvestors.length)];
        if (!investors.includes(investor)) {
          investors.push(investor);
        }
      }
      
      // Sometimes the deal is different than the ask
      const dealFactor = Math.random();
      if (dealFactor < 0.3) {
        // Same deal
        dealAmount = askAmount;
        dealEquity = askEquity;
      } else if (dealFactor < 0.6) {
        // More equity
        dealAmount = askAmount;
        dealEquity = askEquity + Math.floor(Math.random() * 15) + 5;
      } else {
        // Different amount
        dealAmount = Math.round(askAmount * (0.7 + Math.random() * 0.3));
        dealEquity = askEquity + Math.floor(Math.random() * 10);
      }
    }
    
    // Generate a description based on industry
    const descriptionPhrases = {
      'Food & Beverage': ['healthy snacks', 'plant-based', 'specialty drink', 'meal delivery', 'superfood', 'gourmet', 'organic'],
      'Tech': ['app', 'software platform', 'smart device', 'AI-powered', 'IoT solution', 'digital marketplace', 'wearable tech'],
      'Health & Wellness': ['wellness product', 'medical device', 'health tracker', 'therapy solution', 'supplement', 'mental health', 'telehealth'],
      'Fashion': ['sustainable fashion', 'customizable clothing', 'fashion tech', 'accessory brand', 'direct-to-consumer', 'athleisure'],
      'Education': ['learning platform', 'educational toy', 'e-learning solution', 'skill development', 'interactive curriculum', 'STEM kit'],
      'Sustainable Products': ['eco-friendly alternative', 'plastic-free', 'compostable', 'upcycled', 'carbon-negative', 'zero-waste'],
      'Home Solutions': ['smart home', 'cleaning innovation', 'space-saving furniture', 'home automation', 'kitchen gadget', 'organization solution'],
      'Beauty': ['clean beauty', 'personalized skincare', 'beauty device', 'innovative makeup', 'hair care', 'anti-aging'],
      'Fitness': ['workout equipment', 'fitness app', 'recovery tool', 'performance wear', 'digital fitness', 'wellness community'],
      'Pet Products': ['pet health', 'pet tech', 'sustainable pet product', 'pet food', 'pet accessory', 'pet service'],
      'Children\'s Products': ['educational toy', 'baby product', 'children\'s apparel', 'parenting solution', 'child safety', 'developmental'],
      'Entertainment': ['gaming platform', 'content creation', 'social app', 'interactive experience', 'streaming service', 'entertainment tech'],
      'Outdoors': ['camping gear', 'adventure equipment', 'outdoor apparel', 'travel accessory', 'sports innovation', 'recreational'],
      'Travel': ['travel platform', 'luggage innovation', 'accommodations', 'experience marketplace', 'travel tech', 'tourism solution'],
      'Financial Services': ['fintech solution', 'investing platform', 'payment innovation', 'financial education', 'personal finance', 'crypto']
    };
    
    const industryPhrases = descriptionPhrases[industry as keyof typeof descriptionPhrases] || ['innovative product', 'consumer solution'];
    const phrase1 = industryPhrases[Math.floor(Math.random() * industryPhrases.length)];
    const phrase2 = industryPhrases[Math.floor(Math.random() * industryPhrases.length)];
    const description = `${phrase1} with ${phrase2}`;
    
    episodes.push({
      id: `st-gen-s${season}e${episode}-${i}`,
      season,
      episode,
      startupName,
      description,
      ask: askString,
      valuation,
      outcome,
      investors,
      amount: outcome === 'deal' ? dealAmount : undefined,
      equity: outcome === 'deal' ? dealEquity : undefined,
      source
    });
  }
  
  return episodes;
};

// Generate 500 episodes
export const additionalEpisodes = generateSharkTankEpisodes(500);
