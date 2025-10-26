import { AnalysisResult } from './analysisUtils';

// Sample data for demo purposes
export const sampleData: AnalysisResult[] = [
  {
    id: "scrub-daddy",
    startupName: "Scrub Daddy",
    industry: "Consumer Goods",
    investibilityScore: 92,
    overallRisk: 28,
    businessModel: "b2c",
    founderTrustRating: 9,
    pmfScore: 95,
    growthExpected: "75% YoY",
    riskFactors: [
      {
        name: "Market Risk",
        score: 25,
        description: "Low market risk due to universal need and established market."
      },
      {
        name: "Team Risk",
        score: 20,
        description: "Strong founder with deep industry expertise and proven execution ability."
      },
      {
        name: "Financial Risk",
        score: 30,
        description: "Strong margins with manageable cost structure and clear path to profitability."
      },
      {
        name: "Technology Risk",
        score: 35,
        description: "Patented technology with unique material properties that competitors cannot easily replicate."
      }
    ],
    strengths: [
      {
        text: "Patented smile-shaped design with temperature-responsive material",
        impact: "critical"
      },
      {
        text: "Versatile product with multiple use cases in every household",
        impact: "high"
      },
      {
        text: "Charismatic founder with strong pitching and sales skills",
        impact: "high"
      }
    ],
    weaknesses: [
      {
        text: "Scaling production to meet potential demand could be challenging",
        impact: "medium"
      },
      {
        text: "Potential for competition with similar cleaning products",
        impact: "low"
      },
      {
        text: "Need for continual innovation to maintain market leadership",
        impact: "low"
      }
    ],
    suggestions: [
      {
        title: "Expand Product Line",
        description: "Develop complementary products using the same material technology to create a family of branded cleaning solutions.",
        priority: "high"
      },
      {
        title: "International Expansion",
        description: "Prepare for global distribution by securing international patents and adapting marketing for different markets.",
        priority: "medium"
      },
      {
        title: "Retail Partnerships",
        description: "Secure exclusive partnerships with major retailers to guarantee shelf space and promotional opportunities.",
        priority: "medium"
      }
    ],
    categories: [
      { name: "Product-Market Fit", value: 95 },
      { name: "Founder-Market Fit", value: 90 },
      { name: "Team Composition", value: 85 },
      { name: "Financials", value: 85 },
      { name: "Exit Strategy", value: 90 },
      { name: "Intangibles", value: 95 }
    ]
  },
  {
    id: "reddit-ipo",
    startupName: "Reddit",
    industry: "Social Media",
    investibilityScore: 85,
    overallRisk: 35,
    businessModel: "b2c",
    founderTrustRating: 9,
    pmfScore: 88,
    growthExpected: "65% YoY",
    riskFactors: [
      {
        name: "Market Risk",
        score: 30,
        description: "Established platform with strong community engagement, but facing competition from newer social platforms."
      },
      {
        name: "Team Risk",
        score: 25,
        description: "Experienced leadership team with proven ability to scale and monetize user-generated content platforms."
      },
      {
        name: "Financial Risk",
        score: 40,
        description: "Solid revenue growth through advertising and premium subscriptions, but profitability remains a challenge."
      },
      {
        name: "Technology Risk",
        score: 35,
        description: "Robust platform infrastructure with proven ability to handle massive traffic, though moderation at scale remains challenging."
      }
    ],
    strengths: [
      {
        text: "430+ million monthly active users across thousands of communities",
        impact: "critical"
      },
      {
        text: "Strong network effects with deeply engaged user base averaging 30+ minutes per visit",
        impact: "high"
      },
      {
        text: "Diversified revenue streams including advertising, Reddit Premium, and avatar marketplace",
        impact: "high"
      }
    ],
    weaknesses: [
      {
        text: "Reliance on advertising revenue (98% of total) creates vulnerability to economic downturns",
        impact: "high"
      },
      {
        text: "Content moderation challenges and potential regulatory scrutiny",
        impact: "medium"
      },
      {
        text: "User privacy concerns and resistance to increased monetization",
        impact: "medium"
      }
    ],
    suggestions: [
      {
        title: "Accelerate Premium Subscriptions",
        description: "Expand Reddit Premium features and introduce tiered subscription models to reduce advertising dependency.",
        priority: "high"
      },
      {
        title: "AI-Powered Content Discovery",
        description: "Leverage machine learning to improve content recommendation and user retention while maintaining authentic community feel.",
        priority: "high"
      },
      {
        title: "International Expansion",
        description: "Invest in localization and regional content moderation to capture growth in non-US markets.",
        priority: "medium"
      }
    ],
    categories: [
      { name: "Product-Market Fit", value: 88 },
      { name: "Founder-Market Fit", value: 90 },
      { name: "Team Composition", value: 85 },
      { name: "Financials", value: 80 },
      { name: "Exit Strategy", value: 85 },
      { name: "Intangibles", value: 85 }
    ]
  },
  {
    id: "moderate",
    startupName: "Moderate",
    industry: "AI/SaaS",
    investibilityScore: 78,
    overallRisk: 38,
    businessModel: "b2b",
    founderTrustRating: 8,
    pmfScore: 80,
    growthExpected: "55% YoY",
    riskFactors: [
      {
        name: "Market Risk",
        score: 35,
        description: "Growing demand for content moderation solutions but with varying regulatory requirements across regions."
      },
      {
        name: "Team Risk",
        score: 30,
        description: "Strong technical team with AI expertise and domain knowledge in content policies."
      },
      {
        name: "Financial Risk",
        score: 45,
        description: "Good unit economics but requires continual investment in AI capabilities to stay competitive."
      },
      {
        name: "Technology Risk",
        score: 40,
        description: "Advanced AI algorithms but facing challenges with context-sensitive content and evolving methods of policy violation."
      }
    ],
    strengths: [
      {
        text: "Sophisticated AI platform with high accuracy in detecting problematic content",
        impact: "critical"
      },
      {
        text: "Technical founders with deep expertise in machine learning and natural language processing",
        impact: "high"
      },
      {
        text: "Scalable solution addressing a growing need for all online platforms",
        impact: "high"
      }
    ],
    weaknesses: [
      {
        text: "High computation costs that scale with content volume",
        impact: "medium"
      },
      {
        text: "Need for continuous training with new data to maintain effectiveness",
        impact: "medium"
      },
      {
        text: "Exposure to reputational risk if moderation fails on high-profile cases",
        impact: "high"
      }
    ],
    suggestions: [
      {
        title: "Tiered Service Model",
        description: "Develop different service tiers with varying levels of human oversight to address different client needs and budgets.",
        priority: "high"
      },
      {
        title: "Regional Customization",
        description: "Create adaptable moderation policies that can be customized for different cultural contexts and regulatory environments.",
        priority: "high"
      },
      {
        title: "Strategic Partnerships",
        description: "Partner with major platform providers to integrate as the default moderation solution for their developers.",
        priority: "medium"
      }
    ],
    categories: [
      { name: "Product-Market Fit", value: 80 },
      { name: "Founder-Market Fit", value: 85 },
      { name: "Team Composition", value: 75 },
      { name: "Financials", value: 70 },
      { name: "Exit Strategy", value: 75 },
      { name: "Intangibles", value: 80 }
    ]
  },
  {
    id: "bombs-away",
    startupName: "Bombs Away Bath",
    industry: "Beauty & Wellness",
    investibilityScore: 82,
    overallRisk: 32,
    businessModel: "b2c",
    founderTrustRating: 9,
    pmfScore: 85,
    growthExpected: "60% YoY",
    riskFactors: [
      {
        name: "Market Risk",
        score: 30,
        description: "Well-established market with strong consumer demand for bath and personal care products."
      },
      {
        name: "Team Risk",
        score: 25,
        description: "Passionate founder with strong marketing skills and product development expertise."
      },
      {
        name: "Financial Risk",
        score: 40,
        description: "Good margins but faces challenges in scaling production while maintaining quality."
      },
      {
        name: "Technology Risk",
        score: 30,
        description: "Innovative formulations but limited technical barriers to entry for competitors."
      }
    ],
    strengths: [
      {
        text: "Unique, engaging product design appealing to multiple demographics",
        impact: "high"
      },
      {
        text: "Strong brand identity with cohesive marketing and packaging",
        impact: "high"
      },
      {
        text: "Profitable unit economics with healthy margins",
        impact: "critical"
      }
    ],
    weaknesses: [
      {
        text: "Seasonal sales fluctuations requiring careful inventory management",
        impact: "medium"
      },
      {
        text: "Limited patent protection for core product designs",
        impact: "medium"
      },
      {
        text: "Dependency on social media marketing effectiveness",
        impact: "low"
      }
    ],
    suggestions: [
      {
        title: "Expand Product Categories",
        description: "Develop complementary personal care products to create a complete brand ecosystem and increase customer lifetime value.",
        priority: "high"
      },
      {
        title: "Subscription Model",
        description: "Launch a subscription service for regular product delivery to stabilize revenue and improve customer retention.",
        priority: "medium"
      },
      {
        title: "Retail Expansion Strategy",
        description: "Create a phased approach to expanding retail presence while balancing direct-to-consumer sales channels.",
        priority: "medium"
      }
    ],
    categories: [
      { name: "Product-Market Fit", value: 85 },
      { name: "Founder-Market Fit", value: 90 },
      { name: "Team Composition", value: 75 },
      { name: "Financials", value: 80 },
      { name: "Exit Strategy", value: 75 },
      { name: "Intangibles", value: 85 }
    ]
  },
  {
    id: "startup-1",
    startupName: "EcoTech Solutions",
    investibilityScore: 78,
    overallRisk: 42,
    businessModel: "b2b",
    founderTrustRating: 8,
    pmfScore: 80,
    growthExpected: "35% YoY",
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
    ]
  },
  {
    id: "startup-2",
    startupName: "HealthMinder AI",
    investibilityScore: 65,
    overallRisk: 55,
    businessModel: "b2c",
    founderTrustRating: 6,
    pmfScore: 75,
    growthExpected: "50% YoY",
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
    ]
  },
  {
    id: "startup-3",
    startupName: "LogisticsHub",
    investibilityScore: 82,
    overallRisk: 33,
    businessModel: "b2b",
    founderTrustRating: 9,
    pmfScore: 85,
    growthExpected: "40% YoY",
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
    ]
  },
  {
    id: "failed-metaverse",
    startupName: "MetaverseNow",
    industry: "Virtual Reality",
    investibilityScore: 32,
    overallRisk: 78,
    businessModel: "b2c",
    founderTrustRating: 4,
    pmfScore: 35,
    growthExpected: "10% YoY",
    riskFactors: [
      {
        name: "Market Risk",
        score: 80,
        description: "Entering oversaturated metaverse market with declining consumer interest and no clear differentiation."
      },
      {
        name: "Team Risk",
        score: 75,
        description: "Inexperienced founding team with no prior exits and limited domain expertise in VR/AR."
      },
      {
        name: "Financial Risk",
        score: 85,
        description: "Burning through cash rapidly with minimal revenue and unrealistic financial projections."
      },
      {
        name: "Technology Risk",
        score: 70,
        description: "Technology relies heavily on third-party platforms with no proprietary innovation."
      }
    ],
    strengths: [
      {
        text: "Passionate founding team with commitment to the vision",
        impact: "low"
      },
      {
        text: "Some early user engagement on social media",
        impact: "low"
      },
      {
        text: "Partnership discussions with one small gaming studio",
        impact: "medium"
      }
    ],
    weaknesses: [
      {
        text: "No clear product-market fit with declining user retention",
        impact: "critical"
      },
      {
        text: "Burning $150K/month with only $5K MRR",
        impact: "critical"
      },
      {
        text: "Founders have equity disputes and unclear roles",
        impact: "high"
      }
    ],
    suggestions: [
      {
        title: "Pivot or Shutdown Decision",
        description: "Critically evaluate whether a pivot is viable or if resources should be preserved by shutting down operations.",
        priority: "high"
      },
      {
        title: "Immediate Cost Reduction",
        description: "Cut burn rate by at least 70% immediately to extend runway while exploring pivot options.",
        priority: "high"
      },
      {
        title: "Clarify Team Structure",
        description: "Address founder equity disputes and establish clear roles with written agreements.",
        priority: "high"
      }
    ],
    categories: [
      { name: "Product-Market Fit", value: 35 },
      { name: "Founder-Market Fit", value: 30 },
      { name: "Team Composition", value: 40 },
      { name: "Financials", value: 20 },
      { name: "Exit Strategy", value: 25 },
      { name: "Intangibles", value: 35 }
    ]
  },
  {
    id: "struggling-foodtech",
    startupName: "FreshBite Delivery",
    industry: "Food Tech",
    investibilityScore: 41,
    overallRisk: 72,
    businessModel: "b2c",
    founderTrustRating: 5,
    pmfScore: 48,
    growthExpected: "5% YoY",
    riskFactors: [
      {
        name: "Market Risk",
        score: 75,
        description: "Highly competitive market dominated by well-funded players with established logistics networks."
      },
      {
        name: "Team Risk",
        score: 65,
        description: "Team lacks operations expertise critical for food delivery logistics and has high turnover."
      },
      {
        name: "Financial Risk",
        score: 80,
        description: "Negative unit economics with customer acquisition costs exceeding lifetime value."
      },
      {
        name: "Technology Risk",
        score: 60,
        description: "Technology platform is functional but lacks features of major competitors."
      }
    ],
    strengths: [
      {
        text: "Focus on healthy meal options appeals to health-conscious consumers",
        impact: "medium"
      },
      {
        text: "Partnership with 50+ local restaurants in target area",
        impact: "medium"
      },
      {
        text: "Some positive customer reviews for food quality",
        impact: "low"
      }
    ],
    weaknesses: [
      {
        text: "Customer acquisition cost is $120 while LTV is only $85",
        impact: "critical"
      },
      {
        text: "Operating in only one city with no viable expansion plan",
        impact: "high"
      },
      {
        text: "75% customer churn rate after first order due to delivery delays",
        impact: "critical"
      }
    ],
    suggestions: [
      {
        title: "Fix Unit Economics Immediately",
        description: "Address fundamental profitability issues by either increasing order values, reducing delivery costs, or adjusting pricing.",
        priority: "high"
      },
      {
        title: "Improve Delivery Operations",
        description: "Hire operations expert to fix delivery delays and reduce churn from current 75% to at least 40%.",
        priority: "high"
      },
      {
        title: "Narrow Focus to Niche",
        description: "Instead of competing broadly, focus exclusively on premium healthy meal delivery for corporate lunch programs.",
        priority: "medium"
      }
    ],
    categories: [
      { name: "Product-Market Fit", value: 48 },
      { name: "Founder-Market Fit", value: 40 },
      { name: "Team Composition", value: 35 },
      { name: "Financials", value: 25 },
      { name: "Exit Strategy", value: 30 },
      { name: "Intangibles", value: 45 }
    ]
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
