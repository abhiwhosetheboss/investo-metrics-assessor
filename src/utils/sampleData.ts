import { AnalysisResult } from './analysisUtils';

// Sample data for top 50 US stocks with analysis based on P&L and balance sheet metrics
export const sampleData: AnalysisResult[] = [
  {
    id: "aapl",
    startupName: "Apple Inc. (AAPL)",
    industry: "Technology",
    investibilityScore: 94,
    overallRisk: 22,
    businessModel: "b2c",
    founderTrustRating: 10,
    pmfScore: 98,
    growthExpected: "8% YoY",
    riskFactors: [
      { name: "Market Risk", score: 20, description: "Dominant market position with strong brand loyalty and ecosystem lock-in." },
      { name: "Team Risk", score: 15, description: "Exceptional leadership with proven track record of innovation and execution." },
      { name: "Financial Risk", score: 18, description: "$162B cash reserves, 44% gross margin, consistent dividend growth." },
      { name: "Technology Risk", score: 25, description: "Strong R&D investment but facing AI catch-up with competitors." }
    ],
    strengths: [
      { text: "$383B annual revenue with $97B net income - exceptional profitability", impact: "critical" },
      { text: "Services segment growing 14% YoY reaching $85B - high margin recurring revenue", impact: "critical" },
      { text: "2.2B active devices creating powerful ecosystem moat", impact: "high" }
    ],
    weaknesses: [
      { text: "iPhone dependency at 52% of revenue creates concentration risk", impact: "medium" },
      { text: "China exposure at 19% of revenue amid geopolitical tensions", impact: "high" },
      { text: "Premium pricing limits market share growth in emerging markets", impact: "low" }
    ],
    suggestions: [
      { title: "Accelerate AI Integration", description: "Invest aggressively in on-device AI to compete with Google and Microsoft in the AI race.", priority: "high" },
      { title: "Diversify Manufacturing", description: "Reduce China manufacturing dependency by expanding India and Vietnam production capacity.", priority: "high" },
      { title: "Expand Services Portfolio", description: "Continue building high-margin services revenue through new subscription offerings.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 98 },
      { name: "Founder-Market Fit", value: 95 },
      { name: "Team Composition", value: 95 },
      { name: "Financials", value: 96 },
      { name: "Exit Strategy", value: 90 },
      { name: "Intangibles", value: 95 }
    ]
  },
  {
    id: "msft",
    startupName: "Microsoft Corp (MSFT)",
    industry: "Technology",
    investibilityScore: 95,
    overallRisk: 20,
    businessModel: "b2b",
    founderTrustRating: 10,
    pmfScore: 97,
    growthExpected: "15% YoY",
    riskFactors: [
      { name: "Market Risk", score: 18, description: "Dominant in enterprise software and cloud with Azure growing 29% YoY." },
      { name: "Team Risk", score: 12, description: "Satya Nadella's leadership has transformed company culture and strategy." },
      { name: "Financial Risk", score: 15, description: "70% gross margin, $80B+ operating cash flow, AAA credit rating." },
      { name: "Technology Risk", score: 20, description: "Leading AI integration with OpenAI partnership and Copilot rollout." }
    ],
    strengths: [
      { text: "$227B annual revenue with Azure cloud growing 29% YoY", impact: "critical" },
      { text: "OpenAI partnership provides significant AI competitive advantage", impact: "critical" },
      { text: "Enterprise software moat with 400M+ Office 365 users", impact: "high" }
    ],
    weaknesses: [
      { text: "Gaming division underperforming despite Activision acquisition", impact: "medium" },
      { text: "LinkedIn growth slowing amid tech layoffs", impact: "low" },
      { text: "Regulatory scrutiny increasing on AI and cloud market share", impact: "medium" }
    ],
    suggestions: [
      { title: "Accelerate Copilot Monetization", description: "Expand AI Copilot across all products to drive premium pricing and new revenue streams.", priority: "high" },
      { title: "Gaming Turnaround", description: "Leverage Activision IP to build sustainable gaming revenue through Game Pass subscriptions.", priority: "medium" },
      { title: "Edge Computing Expansion", description: "Invest in edge computing infrastructure to complement Azure cloud offerings.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 97 },
      { name: "Founder-Market Fit", value: 98 },
      { name: "Team Composition", value: 95 },
      { name: "Financials", value: 97 },
      { name: "Exit Strategy", value: 92 },
      { name: "Intangibles", value: 96 }
    ]
  },
  {
    id: "nvda",
    startupName: "NVIDIA Corp (NVDA)",
    industry: "Semiconductors",
    investibilityScore: 92,
    overallRisk: 32,
    businessModel: "b2b",
    founderTrustRating: 10,
    pmfScore: 96,
    growthExpected: "55% YoY",
    riskFactors: [
      { name: "Market Risk", score: 25, description: "Dominant in AI chips but facing increased competition from AMD and custom silicon." },
      { name: "Team Risk", score: 15, description: "Jensen Huang is a visionary leader with deep technical expertise." },
      { name: "Financial Risk", score: 28, description: "75% gross margin but valuation stretched at 60x forward PE." },
      { name: "Technology Risk", score: 35, description: "Technology leadership could be challenged by next-gen architectures." }
    ],
    strengths: [
      { text: "$61B revenue with 122% YoY growth - unprecedented AI-driven demand", impact: "critical" },
      { text: "Data center revenue at $47B represents 80%+ market share in AI chips", impact: "critical" },
      { text: "CUDA ecosystem creates significant switching costs for developers", impact: "high" }
    ],
    weaknesses: [
      { text: "Extreme valuation at $3T+ market cap requires continued hypergrowth", impact: "high" },
      { text: "China export restrictions limit 25% of potential addressable market", impact: "high" },
      { text: "Customer concentration with major cloud providers", impact: "medium" }
    ],
    suggestions: [
      { title: "Software Revenue Expansion", description: "Accelerate NVIDIA AI Enterprise and omniverse subscription revenue to diversify from hardware.", priority: "high" },
      { title: "Edge AI Market", description: "Expand into automotive and edge computing to reduce data center dependency.", priority: "medium" },
      { title: "Geographic Diversification", description: "Build non-China supply chains and customer base to mitigate geopolitical risk.", priority: "high" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 96 },
      { name: "Founder-Market Fit", value: 98 },
      { name: "Team Composition", value: 92 },
      { name: "Financials", value: 90 },
      { name: "Exit Strategy", value: 85 },
      { name: "Intangibles", value: 95 }
    ]
  },
  {
    id: "amzn",
    startupName: "Amazon.com Inc (AMZN)",
    industry: "E-Commerce/Cloud",
    investibilityScore: 89,
    overallRisk: 28,
    businessModel: "b2c",
    founderTrustRating: 9,
    pmfScore: 94,
    growthExpected: "12% YoY",
    riskFactors: [
      { name: "Market Risk", score: 25, description: "Dominant e-commerce but facing Temu, Shein competition and AWS slowdown." },
      { name: "Team Risk", score: 20, description: "Andy Jassy proving capable but lacks Bezos's founder mystique." },
      { name: "Financial Risk", score: 30, description: "Improving margins but lower than cloud peers, heavy capex needs." },
      { name: "Technology Risk", score: 28, description: "AWS losing share to Azure, Alexa/devices struggling for profitability." }
    ],
    strengths: [
      { text: "$575B revenue with AWS generating $90B at 30% margins", impact: "critical" },
      { text: "200M+ Prime members creating recurring revenue and logistics moat", impact: "critical" },
      { text: "Advertising business at $47B growing 24% with high margins", impact: "high" }
    ],
    weaknesses: [
      { text: "E-commerce margins compressed by logistics and competition", impact: "high" },
      { text: "Retail segment growth slowing to single digits", impact: "medium" },
      { text: "Massive capex requirements for AI and logistics infrastructure", impact: "medium" }
    ],
    suggestions: [
      { title: "AWS AI Acceleration", description: "Invest aggressively in custom AI chips and Bedrock to compete with Azure OpenAI.", priority: "high" },
      { title: "Advertising Growth", description: "Expand high-margin advertising across Prime Video and logistics network.", priority: "high" },
      { title: "Healthcare Push", description: "Leverage One Medical and pharmacy for healthcare services expansion.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 94 },
      { name: "Founder-Market Fit", value: 88 },
      { name: "Team Composition", value: 90 },
      { name: "Financials", value: 85 },
      { name: "Exit Strategy", value: 88 },
      { name: "Intangibles", value: 92 }
    ]
  },
  {
    id: "googl",
    startupName: "Alphabet Inc (GOOGL)",
    industry: "Technology",
    investibilityScore: 88,
    overallRisk: 30,
    businessModel: "b2c",
    founderTrustRating: 8,
    pmfScore: 93,
    growthExpected: "10% YoY",
    riskFactors: [
      { name: "Market Risk", score: 32, description: "Search dominance threatened by AI chatbots and regulatory action." },
      { name: "Team Risk", score: 22, description: "Leadership stable but culture issues and layoffs affecting morale." },
      { name: "Financial Risk", score: 20, description: "$100B+ cash, 55% margins, but growth slowing." },
      { name: "Technology Risk", score: 35, description: "Playing catch-up in AI despite Gemini launch, search disruption risk." }
    ],
    strengths: [
      { text: "$307B revenue with 90%+ search market share globally", impact: "critical" },
      { text: "YouTube at $32B revenue is largest video platform worldwide", impact: "high" },
      { text: "Google Cloud growing 26% reaching $33B annual run rate", impact: "high" }
    ],
    weaknesses: [
      { text: "AI search disruption threatens core advertising business model", impact: "critical" },
      { text: "Antitrust rulings could force Search/Chrome divestiture", impact: "high" },
      { text: "Other Bets losing $4B+ annually with no clear path to profitability", impact: "medium" }
    ],
    suggestions: [
      { title: "AI Search Transformation", description: "Aggressively integrate Gemini into Search to defend against ChatGPT disruption.", priority: "high" },
      { title: "Cloud AI Focus", description: "Differentiate Google Cloud with best-in-class AI/ML infrastructure and models.", priority: "high" },
      { title: "Other Bets Rationalization", description: "Spin off or shut down non-performing Other Bets to improve capital allocation.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 93 },
      { name: "Founder-Market Fit", value: 85 },
      { name: "Team Composition", value: 88 },
      { name: "Financials", value: 92 },
      { name: "Exit Strategy", value: 80 },
      { name: "Intangibles", value: 88 }
    ]
  },
  {
    id: "meta",
    startupName: "Meta Platforms (META)",
    industry: "Social Media",
    investibilityScore: 85,
    overallRisk: 35,
    businessModel: "b2c",
    founderTrustRating: 7,
    pmfScore: 90,
    growthExpected: "18% YoY",
    riskFactors: [
      { name: "Market Risk", score: 32, description: "Advertising recovery strong but TikTok competition and regulation risks persist." },
      { name: "Team Risk", score: 28, description: "Zuckerberg's control is double-edged; metaverse pivot concerns investors." },
      { name: "Financial Risk", score: 25, description: "80% gross margin, strong FCF, but heavy Reality Labs losses." },
      { name: "Technology Risk", score: 40, description: "Metaverse bet may not pay off; AI pivot shows promise." }
    ],
    strengths: [
      { text: "$135B revenue with 3.3B daily active users across family of apps", impact: "critical" },
      { text: "Reels successfully competing with TikTok, driving engagement growth", impact: "high" },
      { text: "AI investments improving ad targeting after iOS privacy changes", impact: "high" }
    ],
    weaknesses: [
      { text: "Reality Labs losing $16B+ annually with unclear path to profit", impact: "high" },
      { text: "Regulatory threats in EU and potential US antitrust action", impact: "high" },
      { text: "Youth demographic shifting away from Facebook/Instagram to TikTok", impact: "medium" }
    ],
    suggestions: [
      { title: "Reality Labs Discipline", description: "Set clear milestones and budget caps for metaverse investments to restore investor confidence.", priority: "high" },
      { title: "AI Monetization", description: "Expand Meta AI and business messaging to create new revenue streams beyond advertising.", priority: "high" },
      { title: "Creator Economy", description: "Invest heavily in creator tools and monetization to compete for talent with TikTok.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 90 },
      { name: "Founder-Market Fit", value: 80 },
      { name: "Team Composition", value: 85 },
      { name: "Financials", value: 88 },
      { name: "Exit Strategy", value: 75 },
      { name: "Intangibles", value: 82 }
    ]
  },
  {
    id: "tsla",
    startupName: "Tesla Inc (TSLA)",
    industry: "Automotive/Energy",
    investibilityScore: 75,
    overallRisk: 48,
    businessModel: "b2c",
    founderTrustRating: 7,
    pmfScore: 82,
    growthExpected: "5% YoY",
    riskFactors: [
      { name: "Market Risk", score: 55, description: "EV competition intensifying with legacy automakers and Chinese brands." },
      { name: "Team Risk", score: 45, description: "Musk's divided attention across companies and controversial behavior." },
      { name: "Financial Risk", score: 40, description: "Margins compressing from price cuts; still profitable but challenged." },
      { name: "Technology Risk", score: 35, description: "FSD promises delayed; battery tech lead narrowing." }
    ],
    strengths: [
      { text: "Leading EV brand with 1.8M vehicles delivered annually", impact: "critical" },
      { text: "Energy storage growing 200%+ YoY with Megapack demand", impact: "high" },
      { text: "Supercharger network becoming industry standard, new revenue opportunity", impact: "high" }
    ],
    weaknesses: [
      { text: "Automotive gross margin declined from 28% to 17% due to price cuts", impact: "critical" },
      { text: "No new mass-market vehicle since Model Y in 2020", impact: "high" },
      { text: "Full Self-Driving promises consistently delayed, regulatory risk", impact: "high" }
    ],
    suggestions: [
      { title: "Launch Affordable Model", description: "Prioritize sub-$30K vehicle to compete with BYD and capture mass market.", priority: "high" },
      { title: "Energy Business Focus", description: "Accelerate energy storage and solar to diversify from automotive dependency.", priority: "high" },
      { title: "Robotaxi Reality Check", description: "Set realistic timelines for autonomous technology to manage expectations.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 82 },
      { name: "Founder-Market Fit", value: 75 },
      { name: "Team Composition", value: 70 },
      { name: "Financials", value: 72 },
      { name: "Exit Strategy", value: 80 },
      { name: "Intangibles", value: 85 }
    ]
  },
  {
    id: "brk-b",
    startupName: "Berkshire Hathaway (BRK.B)",
    industry: "Diversified Financials",
    investibilityScore: 91,
    overallRisk: 22,
    businessModel: "b2b",
    founderTrustRating: 10,
    pmfScore: 95,
    growthExpected: "8% YoY",
    riskFactors: [
      { name: "Market Risk", score: 20, description: "Diversified holdings reduce single-sector exposure." },
      { name: "Team Risk", score: 25, description: "Buffett succession planned but untested; key man risk." },
      { name: "Financial Risk", score: 15, description: "$200B+ cash hoard, minimal debt, fortress balance sheet." },
      { name: "Technology Risk", score: 28, description: "Traditional businesses may face tech disruption." }
    ],
    strengths: [
      { text: "$364B revenue across insurance, rail, energy, and manufacturing", impact: "critical" },
      { text: "$200B+ cash provides flexibility for acquisitions and opportunities", impact: "critical" },
      { text: "GEICO and insurance float provides low-cost permanent capital", impact: "high" }
    ],
    weaknesses: [
      { text: "Size limits opportunities for needle-moving acquisitions", impact: "medium" },
      { text: "Buffett age 94 creates succession uncertainty", impact: "high" },
      { text: "Below-market returns in recent years vs S&P 500", impact: "medium" }
    ],
    suggestions: [
      { title: "Succession Communication", description: "Provide more clarity on Greg Abel's strategic vision and capital allocation approach.", priority: "high" },
      { title: "Tech Investment", description: "Increase technology holdings beyond Apple to modernize portfolio.", priority: "medium" },
      { title: "Cash Deployment", description: "Use cash pile for meaningful acquisitions during market dislocations.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 95 },
      { name: "Founder-Market Fit", value: 98 },
      { name: "Team Composition", value: 88 },
      { name: "Financials", value: 96 },
      { name: "Exit Strategy", value: 85 },
      { name: "Intangibles", value: 92 }
    ]
  },
  {
    id: "jpm",
    startupName: "JPMorgan Chase (JPM)",
    industry: "Banking",
    investibilityScore: 88,
    overallRisk: 28,
    businessModel: "b2b",
    founderTrustRating: 9,
    pmfScore: 92,
    growthExpected: "6% YoY",
    riskFactors: [
      { name: "Market Risk", score: 30, description: "Economic sensitivity but well-positioned for rate environment." },
      { name: "Team Risk", score: 18, description: "Jamie Dimon is highly regarded; succession planning in progress." },
      { name: "Financial Risk", score: 25, description: "Strong capital ratios, $430B+ equity, 17% ROTCE." },
      { name: "Technology Risk", score: 30, description: "Heavy tech investment but fintech disruption risk remains." }
    ],
    strengths: [
      { text: "$158B revenue with industry-leading 17% return on tangible equity", impact: "critical" },
      { text: "Dominant investment banking franchise with #1 market share", impact: "high" },
      { text: "$15B annual tech spend creating competitive moat", impact: "high" }
    ],
    weaknesses: [
      { text: "Regulatory burden and capital requirements increasing", impact: "medium" },
      { text: "Commercial real estate exposure amid office market stress", impact: "high" },
      { text: "Net interest income may decline with rate cuts", impact: "medium" }
    ],
    suggestions: [
      { title: "Fintech Partnerships", description: "Partner with or acquire fintechs to accelerate digital transformation.", priority: "medium" },
      { title: "CRE Risk Management", description: "Proactively manage commercial real estate exposure and build reserves.", priority: "high" },
      { title: "Wealth Management Growth", description: "Expand private banking and wealth management for stable fee income.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 92 },
      { name: "Founder-Market Fit", value: 90 },
      { name: "Team Composition", value: 90 },
      { name: "Financials", value: 88 },
      { name: "Exit Strategy", value: 85 },
      { name: "Intangibles", value: 88 }
    ]
  },
  {
    id: "v",
    startupName: "Visa Inc (V)",
    industry: "Financial Services",
    investibilityScore: 92,
    overallRisk: 22,
    businessModel: "b2b",
    founderTrustRating: 9,
    pmfScore: 96,
    growthExpected: "10% YoY",
    riskFactors: [
      { name: "Market Risk", score: 20, description: "Dominant network with limited competition; regulatory risk exists." },
      { name: "Team Risk", score: 18, description: "Experienced leadership with smooth CEO transition." },
      { name: "Financial Risk", score: 15, description: "68% operating margin, minimal credit risk as payment processor." },
      { name: "Technology Risk", score: 25, description: "Well-positioned for digital payments; stablecoin uncertainty." }
    ],
    strengths: [
      { text: "$33B revenue with 68% operating margin - exceptional profitability", impact: "critical" },
      { text: "Processing 15B+ transactions across 200+ countries", impact: "critical" },
      { text: "Cross-border payments growing 15%+ with high take rates", impact: "high" }
    ],
    weaknesses: [
      { text: "DOJ antitrust scrutiny on debit card practices", impact: "high" },
      { text: "Real-time payment systems could bypass card networks", impact: "medium" },
      { text: "Cryptocurrency and stablecoins present long-term disruption risk", impact: "medium" }
    ],
    suggestions: [
      { title: "B2B Payments Expansion", description: "Accelerate commercial and B2B payments to diversify from consumer.", priority: "high" },
      { title: "Stablecoin Strategy", description: "Develop clear strategy for integrating stablecoins into Visa network.", priority: "medium" },
      { title: "Value-Added Services", description: "Expand consulting, fraud prevention, and data services for higher margins.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 96 },
      { name: "Founder-Market Fit", value: 90 },
      { name: "Team Composition", value: 92 },
      { name: "Financials", value: 95 },
      { name: "Exit Strategy", value: 88 },
      { name: "Intangibles", value: 92 }
    ]
  },
  {
    id: "unh",
    startupName: "UnitedHealth Group (UNH)",
    industry: "Healthcare",
    investibilityScore: 86,
    overallRisk: 32,
    businessModel: "b2b",
    founderTrustRating: 8,
    pmfScore: 90,
    growthExpected: "8% YoY",
    riskFactors: [
      { name: "Market Risk", score: 28, description: "Healthcare demand stable but regulatory and political risks elevated." },
      { name: "Team Risk", score: 30, description: "Recent CEO tragedy creates leadership uncertainty." },
      { name: "Financial Risk", score: 25, description: "Strong cash flow but medical cost ratios under pressure." },
      { name: "Technology Risk", score: 35, description: "Optum growth strong but Change Healthcare breach damaged trust." }
    ],
    strengths: [
      { text: "$372B revenue making it largest US healthcare company", impact: "critical" },
      { text: "Optum services growing 14% with 100M+ patients served", impact: "critical" },
      { text: "Vertically integrated model creates operational synergies", impact: "high" }
    ],
    weaknesses: [
      { text: "Political scrutiny on healthcare profits and PBM practices", impact: "high" },
      { text: "Change Healthcare cyberattack exposed significant vulnerabilities", impact: "high" },
      { text: "Medical cost trends rising faster than premium increases", impact: "medium" }
    ],
    suggestions: [
      { title: "Cybersecurity Investment", description: "Dramatically increase security infrastructure and transparency post-breach.", priority: "high" },
      { title: "Value-Based Care Acceleration", description: "Shift more business to value-based arrangements to improve outcomes and margins.", priority: "high" },
      { title: "Political Engagement", description: "Proactively address regulatory concerns to reduce legislative risk.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 90 },
      { name: "Founder-Market Fit", value: 82 },
      { name: "Team Composition", value: 80 },
      { name: "Financials", value: 88 },
      { name: "Exit Strategy", value: 85 },
      { name: "Intangibles", value: 80 }
    ]
  },
  {
    id: "xom",
    startupName: "Exxon Mobil (XOM)",
    industry: "Energy",
    investibilityScore: 78,
    overallRisk: 38,
    businessModel: "b2b",
    founderTrustRating: 8,
    pmfScore: 85,
    growthExpected: "3% YoY",
    riskFactors: [
      { name: "Market Risk", score: 45, description: "Oil demand stable near-term but energy transition creates long-term uncertainty." },
      { name: "Team Risk", score: 25, description: "Experienced management with clear strategy execution." },
      { name: "Financial Risk", score: 30, description: "Strong FCF and balance sheet; commodity price volatility." },
      { name: "Technology Risk", score: 40, description: "Carbon capture investments but core business model challenged." }
    ],
    strengths: [
      { text: "$344B revenue with $36B net income and 6% dividend yield", impact: "critical" },
      { text: "Pioneer acquisition adds premier Permian Basin position", impact: "high" },
      { text: "Lowest cost producer globally enables profitability across cycles", impact: "high" }
    ],
    weaknesses: [
      { text: "Long-term oil demand decline from energy transition", impact: "high" },
      { text: "ESG concerns limiting institutional investor interest", impact: "medium" },
      { text: "Capital intensity of upstream business", impact: "medium" }
    ],
    suggestions: [
      { title: "Low Carbon Acceleration", description: "Accelerate carbon capture, hydrogen, and biofuels to position for transition.", priority: "high" },
      { title: "Capital Returns", description: "Maintain industry-leading buybacks and dividends to attract income investors.", priority: "medium" },
      { title: "Cost Leadership", description: "Continue driving costs down to remain profitable at lower oil prices.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 85 },
      { name: "Founder-Market Fit", value: 80 },
      { name: "Team Composition", value: 85 },
      { name: "Financials", value: 82 },
      { name: "Exit Strategy", value: 70 },
      { name: "Intangibles", value: 75 }
    ]
  },
  {
    id: "lly",
    startupName: "Eli Lilly (LLY)",
    industry: "Pharmaceuticals",
    investibilityScore: 90,
    overallRisk: 30,
    businessModel: "b2b",
    founderTrustRating: 9,
    pmfScore: 94,
    growthExpected: "25% YoY",
    riskFactors: [
      { name: "Market Risk", score: 22, description: "GLP-1 market exploding; Lilly has best-in-class products." },
      { name: "Team Risk", score: 20, description: "Strong R&D leadership with excellent pipeline execution." },
      { name: "Financial Risk", score: 28, description: "High valuation at 60x earnings requires continued outperformance." },
      { name: "Technology Risk", score: 35, description: "GLP-1 competition intensifying; next-gen pipeline critical." }
    ],
    strengths: [
      { text: "Mounjaro/Zepbound GLP-1 franchise generating $20B+ annually", impact: "critical" },
      { text: "Alzheimer's drug Kisunla first disease-modifying therapy approved", impact: "high" },
      { text: "Manufacturing capacity expansion to meet unprecedented demand", impact: "high" }
    ],
    weaknesses: [
      { text: "Valuation at $800B+ requires sustained hypergrowth", impact: "high" },
      { text: "GLP-1 supply constraints limiting near-term revenue", impact: "medium" },
      { text: "Competition from Novo Nordisk and emerging entrants", impact: "medium" }
    ],
    suggestions: [
      { title: "Manufacturing Expansion", description: "Continue aggressive capacity buildout to capture GLP-1 demand.", priority: "high" },
      { title: "Oral GLP-1 Development", description: "Accelerate oral formulations for convenience and market expansion.", priority: "high" },
      { title: "Obesity Ecosystem", description: "Build comprehensive obesity treatment ecosystem beyond drugs.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 94 },
      { name: "Founder-Market Fit", value: 88 },
      { name: "Team Composition", value: 92 },
      { name: "Financials", value: 85 },
      { name: "Exit Strategy", value: 88 },
      { name: "Intangibles", value: 90 }
    ]
  },
  {
    id: "cost",
    startupName: "Costco Wholesale (COST)",
    industry: "Retail",
    investibilityScore: 89,
    overallRisk: 24,
    businessModel: "b2c",
    founderTrustRating: 9,
    pmfScore: 95,
    growthExpected: "8% YoY",
    riskFactors: [
      { name: "Market Risk", score: 20, description: "Membership model creates loyalty and recurring revenue." },
      { name: "Team Risk", score: 18, description: "Strong culture and employee satisfaction drives execution." },
      { name: "Financial Risk", score: 22, description: "Low margins but high inventory turns; membership fees are pure profit." },
      { name: "Technology Risk", score: 28, description: "E-commerce growing but still behind Amazon." }
    ],
    strengths: [
      { text: "92.7% membership renewal rate with 130M+ cardholders", impact: "critical" },
      { text: "$242B revenue with best-in-class inventory management", impact: "critical" },
      { text: "Kirkland private label at $75B sales with premium quality perception", impact: "high" }
    ],
    weaknesses: [
      { text: "Low 2.5% operating margin limits pricing flexibility", impact: "medium" },
      { text: "E-commerce still small vs Amazon Prime competition", impact: "medium" },
      { text: "International expansion slower than peers", impact: "low" }
    ],
    suggestions: [
      { title: "Digital Enhancement", description: "Invest in e-commerce and delivery capabilities to compete with Amazon.", priority: "high" },
      { title: "Membership Tiers", description: "Consider premium membership tiers with additional benefits.", priority: "medium" },
      { title: "International Growth", description: "Accelerate expansion in underpenetrated markets like China.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 95 },
      { name: "Founder-Market Fit", value: 92 },
      { name: "Team Composition", value: 90 },
      { name: "Financials", value: 88 },
      { name: "Exit Strategy", value: 85 },
      { name: "Intangibles", value: 92 }
    ]
  },
  {
    id: "wmt",
    startupName: "Walmart Inc (WMT)",
    industry: "Retail",
    investibilityScore: 85,
    overallRisk: 26,
    businessModel: "b2c",
    founderTrustRating: 8,
    pmfScore: 92,
    growthExpected: "5% YoY",
    riskFactors: [
      { name: "Market Risk", score: 25, description: "Dominant retailer with strong omnichannel execution." },
      { name: "Team Risk", score: 20, description: "Doug McMillon providing steady leadership and transformation." },
      { name: "Financial Risk", score: 22, description: "Thin margins but massive scale and improving mix." },
      { name: "Technology Risk", score: 30, description: "Heavy tech investment closing gap with Amazon." }
    ],
    strengths: [
      { text: "$648B revenue - largest company by revenue globally", impact: "critical" },
      { text: "E-commerce growing 21% with 4,600 pickup locations", impact: "high" },
      { text: "Walmart+ membership at 25M+ subscribers growing rapidly", impact: "high" }
    ],
    weaknesses: [
      { text: "Operating margin at 4% well below peers", impact: "medium" },
      { text: "Labor costs rising with minimum wage pressure", impact: "medium" },
      { text: "Store footprint requires significant maintenance capex", impact: "low" }
    ],
    suggestions: [
      { title: "Advertising Growth", description: "Scale Walmart Connect advertising business as high-margin revenue stream.", priority: "high" },
      { title: "Automation Investment", description: "Continue store and fulfillment automation to improve margins.", priority: "high" },
      { title: "Healthcare Services", description: "Expand health clinics and pharmacy services for customer stickiness.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 92 },
      { name: "Founder-Market Fit", value: 85 },
      { name: "Team Composition", value: 88 },
      { name: "Financials", value: 82 },
      { name: "Exit Strategy", value: 85 },
      { name: "Intangibles", value: 88 }
    ]
  },
  {
    id: "jnj",
    startupName: "Johnson & Johnson (JNJ)",
    industry: "Healthcare",
    investibilityScore: 84,
    overallRisk: 30,
    businessModel: "b2c",
    founderTrustRating: 8,
    pmfScore: 88,
    growthExpected: "5% YoY",
    riskFactors: [
      { name: "Market Risk", score: 25, description: "Diversified healthcare leader with defensive characteristics." },
      { name: "Team Risk", score: 22, description: "New CEO Joaquin Duato executing on transformation." },
      { name: "Financial Risk", score: 28, description: "AAA credit rating, strong FCF but talc litigation overhang." },
      { name: "Technology Risk", score: 35, description: "Pharma pipeline needs to offset Stelara biosimilar competition." }
    ],
    strengths: [
      { text: "$85B revenue with 65+ years of consecutive dividend increases", impact: "critical" },
      { text: "MedTech segment growing with surgical robotics and orthopedics", impact: "high" },
      { text: "Strong pharma pipeline with $55B+ peak sales potential", impact: "high" }
    ],
    weaknesses: [
      { text: "Talc litigation liability uncertainty (though bankruptcy strategy progressing)", impact: "high" },
      { text: "Stelara facing biosimilar competition starting 2025", impact: "high" },
      { text: "Consumer Health spinoff (Kenvue) removed diversification benefit", impact: "medium" }
    ],
    suggestions: [
      { title: "Pipeline Execution", description: "Focus on key pipeline approvals to offset Stelara losses.", priority: "high" },
      { title: "Litigation Resolution", description: "Pursue final talc settlement to remove legal overhang.", priority: "high" },
      { title: "MedTech Innovation", description: "Accelerate robotic surgery and digital health investments.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 88 },
      { name: "Founder-Market Fit", value: 82 },
      { name: "Team Composition", value: 85 },
      { name: "Financials", value: 85 },
      { name: "Exit Strategy", value: 82 },
      { name: "Intangibles", value: 85 }
    ]
  },
  {
    id: "pg",
    startupName: "Procter & Gamble (PG)",
    industry: "Consumer Goods",
    investibilityScore: 86,
    overallRisk: 24,
    businessModel: "b2c",
    founderTrustRating: 9,
    pmfScore: 93,
    growthExpected: "4% YoY",
    riskFactors: [
      { name: "Market Risk", score: 22, description: "Defensive consumer staples leader with pricing power." },
      { name: "Team Risk", score: 18, description: "Jon Moeller providing strong operational leadership." },
      { name: "Financial Risk", score: 20, description: "Strong FCF, 68 years of dividend growth, manageable debt." },
      { name: "Technology Risk", score: 28, description: "Digital transformation improving marketing efficiency." }
    ],
    strengths: [
      { text: "$84B revenue across 65+ leading brands in 180 countries", impact: "critical" },
      { text: "Pricing power demonstrated with 7% price increases absorbed by consumers", impact: "high" },
      { text: "Productivity savings funding consistent margin expansion", impact: "high" }
    ],
    weaknesses: [
      { text: "Organic growth slowing as pricing benefits fade", impact: "medium" },
      { text: "Private label and local brand competition in value segment", impact: "medium" },
      { text: "Emerging market currency headwinds", impact: "low" }
    ],
    suggestions: [
      { title: "Premium Innovation", description: "Focus R&D on premium products where pricing power is strongest.", priority: "high" },
      { title: "E-commerce Acceleration", description: "Build direct-to-consumer and marketplace capabilities.", priority: "medium" },
      { title: "Sustainability Leadership", description: "Leverage sustainability initiatives for brand differentiation.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 93 },
      { name: "Founder-Market Fit", value: 88 },
      { name: "Team Composition", value: 90 },
      { name: "Financials", value: 88 },
      { name: "Exit Strategy", value: 85 },
      { name: "Intangibles", value: 90 }
    ]
  },
  {
    id: "ko",
    startupName: "Coca-Cola Company (KO)",
    industry: "Beverages",
    investibilityScore: 85,
    overallRisk: 25,
    businessModel: "b2c",
    founderTrustRating: 9,
    pmfScore: 94,
    growthExpected: "5% YoY",
    riskFactors: [
      { name: "Market Risk", score: 22, description: "Iconic brand with global distribution; health trends a concern." },
      { name: "Team Risk", score: 20, description: "James Quincey executing well on portfolio transformation." },
      { name: "Financial Risk", score: 22, description: "62 years of dividend increases, strong FCF, moderate debt." },
      { name: "Technology Risk", score: 28, description: "Digital marketing and supply chain investments paying off." }
    ],
    strengths: [
      { text: "$46B revenue with distribution in 200+ countries", impact: "critical" },
      { text: "Brand portfolio including Sprite, Fanta, Minute Maid diversifies beyond cola", impact: "high" },
      { text: "Pricing power with 11% price/mix growth demonstrating brand strength", impact: "high" }
    ],
    weaknesses: [
      { text: "Sugar tax and health concerns pressuring core carbonated drinks", impact: "medium" },
      { text: "Emerging market currency volatility impacting results", impact: "medium" },
      { text: "Competition from energy drinks and alternative beverages", impact: "medium" }
    ],
    suggestions: [
      { title: "Health Portfolio Expansion", description: "Accelerate growth in water, sports drinks, and low-sugar options.", priority: "high" },
      { title: "Premium Positioning", description: "Expand premium offerings and packaging for margin improvement.", priority: "medium" },
      { title: "Sustainability Goals", description: "Meet packaging sustainability targets to address ESG concerns.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 94 },
      { name: "Founder-Market Fit", value: 88 },
      { name: "Team Composition", value: 88 },
      { name: "Financials", value: 86 },
      { name: "Exit Strategy", value: 85 },
      { name: "Intangibles", value: 92 }
    ]
  },
  {
    id: "pep",
    startupName: "PepsiCo Inc (PEP)",
    industry: "Beverages/Snacks",
    investibilityScore: 86,
    overallRisk: 24,
    businessModel: "b2c",
    founderTrustRating: 9,
    pmfScore: 93,
    growthExpected: "5% YoY",
    riskFactors: [
      { name: "Market Risk", score: 22, description: "Diversified beverages and snacks provide stability." },
      { name: "Team Risk", score: 18, description: "Ramon Laguarta executing on strategic priorities." },
      { name: "Financial Risk", score: 22, description: "51 years of dividend growth, strong FCF generation." },
      { name: "Technology Risk", score: 26, description: "Digital transformation improving go-to-market efficiency." }
    ],
    strengths: [
      { text: "$91B revenue with Frito-Lay commanding 60%+ salty snack market share", impact: "critical" },
      { text: "Snacks business provides 55% of revenue at higher margins than beverages", impact: "critical" },
      { text: "Strong pricing power with successful premium innovation", impact: "high" }
    ],
    weaknesses: [
      { text: "GLP-1 weight loss drugs could reduce snack consumption", impact: "high" },
      { text: "Quaker recall hurt brand reputation and near-term results", impact: "medium" },
      { text: "North America beverage share losses to energy drinks", impact: "medium" }
    ],
    suggestions: [
      { title: "Better-For-You Portfolio", description: "Expand low-calorie and healthier snack options to address GLP-1 concerns.", priority: "high" },
      { title: "Quaker Recovery", description: "Rebuild consumer trust in Quaker brand through quality initiatives.", priority: "high" },
      { title: "Energy Drink Strategy", description: "Strengthen Rockstar and develop energy drink innovation.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 93 },
      { name: "Founder-Market Fit", value: 88 },
      { name: "Team Composition", value: 90 },
      { name: "Financials", value: 87 },
      { name: "Exit Strategy", value: 85 },
      { name: "Intangibles", value: 90 }
    ]
  },
  // Low-scoring stocks for balance
  {
    id: "intc",
    startupName: "Intel Corp (INTC)",
    industry: "Semiconductors",
    investibilityScore: 38,
    overallRisk: 72,
    businessModel: "b2b",
    founderTrustRating: 5,
    pmfScore: 45,
    growthExpected: "-5% YoY",
    riskFactors: [
      { name: "Market Risk", score: 75, description: "Lost technology leadership to TSMC and AMD; market share eroding." },
      { name: "Team Risk", score: 65, description: "Pat Gelsinger turnaround ambitious but execution struggling." },
      { name: "Financial Risk", score: 80, description: "Dividend cut, massive losses, $100B+ foundry buildout risk." },
      { name: "Technology Risk", score: 70, description: "18A node critical but years behind TSMC's leading edge." }
    ],
    strengths: [
      { text: "US government support through CHIPS Act funding ($8.5B)", impact: "high" },
      { text: "Foundry services could serve geopolitical demand for US manufacturing", impact: "medium" },
      { text: "Still dominant in PC CPUs with 70%+ market share", impact: "medium" }
    ],
    weaknesses: [
      { text: "$16B operating loss in foundry business with years to profitability", impact: "critical" },
      { text: "Data center market share collapsed from 90%+ to under 70%", impact: "critical" },
      { text: "Dividend eliminated, workforce cut by 15,000+", impact: "high" }
    ],
    suggestions: [
      { title: "Foundry Focus Decision", description: "Make clear strategic decision on foundry vs product company focus.", priority: "high" },
      { title: "Cost Restructuring", description: "Continue aggressive cost cuts to reach cash flow positive.", priority: "high" },
      { title: "Strategic Partnerships", description: "Consider partial foundry spinoff or joint venture to reduce capital burden.", priority: "high" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 45 },
      { name: "Founder-Market Fit", value: 50 },
      { name: "Team Composition", value: 55 },
      { name: "Financials", value: 30 },
      { name: "Exit Strategy", value: 40 },
      { name: "Intangibles", value: 45 }
    ]
  },
  {
    id: "ba",
    startupName: "Boeing Company (BA)",
    industry: "Aerospace",
    investibilityScore: 42,
    overallRisk: 68,
    businessModel: "b2b",
    founderTrustRating: 4,
    pmfScore: 55,
    growthExpected: "15% YoY",
    riskFactors: [
      { name: "Market Risk", score: 55, description: "Aerospace duopoly but quality crisis damaging customer trust." },
      { name: "Team Risk", score: 75, description: "Leadership turnover, cultural problems, FAA scrutiny." },
      { name: "Financial Risk", score: 78, description: "$45B+ debt, no dividend, negative free cash flow." },
      { name: "Technology Risk", score: 60, description: "737 MAX issues resolved but quality systems still concerning." }
    ],
    strengths: [
      { text: "8,600+ plane backlog worth $500B+ provides revenue visibility", impact: "critical" },
      { text: "Aerospace duopoly with Airbus limits competitive alternatives", impact: "high" },
      { text: "Defense segment provides stable government revenue", impact: "medium" }
    ],
    weaknesses: [
      { text: "Quality and safety culture eroded - multiple fatal crashes and incidents", impact: "critical" },
      { text: "$45B debt load with years of negative cash flow ahead", impact: "critical" },
      { text: "FAA production caps limiting ability to work through backlog", impact: "high" }
    ],
    suggestions: [
      { title: "Quality System Overhaul", description: "Fundamental rebuild of manufacturing quality systems and culture.", priority: "high" },
      { title: "Balance Sheet Repair", description: "Equity raise or asset sales to reduce dangerous debt levels.", priority: "high" },
      { title: "Leadership Stability", description: "Recruit and retain experienced aerospace leadership.", priority: "high" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 55 },
      { name: "Founder-Market Fit", value: 35 },
      { name: "Team Composition", value: 40 },
      { name: "Financials", value: 25 },
      { name: "Exit Strategy", value: 60 },
      { name: "Intangibles", value: 50 }
    ]
  },
  {
    id: "pypl",
    startupName: "PayPal Holdings (PYPL)",
    industry: "Fintech",
    investibilityScore: 55,
    overallRisk: 52,
    businessModel: "b2c",
    founderTrustRating: 6,
    pmfScore: 68,
    growthExpected: "6% YoY",
    riskFactors: [
      { name: "Market Risk", score: 55, description: "Intense competition from Apple Pay, Block, and buy-now-pay-later." },
      { name: "Team Risk", score: 45, description: "New CEO Alex Chriss rebuilding strategy and focus." },
      { name: "Financial Risk", score: 40, description: "Profitable with $5B+ FCF but growth stalling." },
      { name: "Technology Risk", score: 55, description: "Platform aging; needs modernization to compete." }
    ],
    strengths: [
      { text: "430M+ active accounts with trusted consumer brand", impact: "high" },
      { text: "Venmo with 90M+ users growing peer-to-peer payments", impact: "medium" },
      { text: "$5B+ free cash flow enabling buybacks and investment", impact: "high" }
    ],
    weaknesses: [
      { text: "Transaction margin dollars declining as competition intensifies", impact: "critical" },
      { text: "Apple Pay and Google Pay gaining share in mobile payments", impact: "high" },
      { text: "Branded checkout losing share to Shop Pay and alternatives", impact: "high" }
    ],
    suggestions: [
      { title: "Merchant Value Proposition", description: "Rebuild value for merchants beyond just payment processing.", priority: "high" },
      { title: "Venmo Monetization", description: "Accelerate Venmo business payments and debit card adoption.", priority: "high" },
      { title: "Cost Efficiency", description: "Continue operational improvements to maintain profitability.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 68 },
      { name: "Founder-Market Fit", value: 60 },
      { name: "Team Composition", value: 65 },
      { name: "Financials", value: 70 },
      { name: "Exit Strategy", value: 55 },
      { name: "Intangibles", value: 60 }
    ]
  },
  {
    id: "dis",
    startupName: "Walt Disney Company (DIS)",
    industry: "Entertainment",
    investibilityScore: 62,
    overallRisk: 45,
    businessModel: "b2c",
    founderTrustRating: 7,
    pmfScore: 75,
    growthExpected: "4% YoY",
    riskFactors: [
      { name: "Market Risk", score: 42, description: "Iconic IP and parks but streaming losses and cord-cutting pressure." },
      { name: "Team Risk", score: 40, description: "Bob Iger back but succession remains unclear." },
      { name: "Financial Risk", score: 45, description: "Streaming nearing profitability but linear TV declining." },
      { name: "Technology Risk", score: 48, description: "Disney+ competitive but content costs challenging." }
    ],
    strengths: [
      { text: "Unmatched IP portfolio with Marvel, Star Wars, Pixar, Disney brands", impact: "critical" },
      { text: "Parks and Experiences generating $8B+ operating income", impact: "critical" },
      { text: "Disney+ at 150M+ subscribers reaching profitability", impact: "high" }
    ],
    weaknesses: [
      { text: "Linear TV networks losing $1B+ annually as cord-cutting accelerates", impact: "high" },
      { text: "Content investment needs of $25B+ annually", impact: "high" },
      { text: "Theme park growth slowing after post-COVID surge", impact: "medium" }
    ],
    suggestions: [
      { title: "Linear TV Transition", description: "Accelerate transition of ESPN to streaming to address cord-cutting.", priority: "high" },
      { title: "Content Efficiency", description: "Reduce content spend while focusing on quality over quantity.", priority: "high" },
      { title: "Succession Planning", description: "Clearly identify and prepare Iger's successor.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 75 },
      { name: "Founder-Market Fit", value: 70 },
      { name: "Team Composition", value: 72 },
      { name: "Financials", value: 65 },
      { name: "Exit Strategy", value: 70 },
      { name: "Intangibles", value: 85 }
    ]
  },
  {
    id: "nke",
    startupName: "Nike Inc (NKE)",
    industry: "Apparel/Footwear",
    investibilityScore: 68,
    overallRisk: 40,
    businessModel: "b2c",
    founderTrustRating: 7,
    pmfScore: 78,
    growthExpected: "3% YoY",
    riskFactors: [
      { name: "Market Risk", score: 38, description: "Leading athletic brand but losing share to emerging competitors." },
      { name: "Team Risk", score: 42, description: "New CEO Elliott Hill rebuilding strategy and culture." },
      { name: "Financial Risk", score: 35, description: "Strong balance sheet but margins under pressure." },
      { name: "Technology Risk", score: 42, description: "DTC strategy struggling; wholesale relationships damaged." }
    ],
    strengths: [
      { text: "World's most valuable athletic brand worth $30B+", impact: "critical" },
      { text: "Jordan Brand at $7B+ revenue with cultural relevance", impact: "high" },
      { text: "Strong balance sheet with $10B+ cash and minimal debt", impact: "high" }
    ],
    weaknesses: [
      { text: "Market share losses to On Running, Hoka, and New Balance", impact: "high" },
      { text: "Innovation pipeline perceived as stale vs competitors", impact: "high" },
      { text: "DTC strategy hurt wholesale relationships and inventory", impact: "medium" }
    ],
    suggestions: [
      { title: "Innovation Acceleration", description: "Reinvigorate product innovation to compete with emerging brands.", priority: "high" },
      { title: "Wholesale Repair", description: "Rebuild relationships with key retail partners.", priority: "high" },
      { title: "China Recovery", description: "Address China market challenges and competition from local brands.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 78 },
      { name: "Founder-Market Fit", value: 70 },
      { name: "Team Composition", value: 68 },
      { name: "Financials", value: 75 },
      { name: "Exit Strategy", value: 72 },
      { name: "Intangibles", value: 82 }
    ]
  },
  {
    id: "crm",
    startupName: "Salesforce Inc (CRM)",
    industry: "Enterprise Software",
    investibilityScore: 82,
    overallRisk: 30,
    businessModel: "b2b",
    founderTrustRating: 8,
    pmfScore: 88,
    growthExpected: "9% YoY",
    riskFactors: [
      { name: "Market Risk", score: 28, description: "CRM market leader but growth slowing as market matures." },
      { name: "Team Risk", score: 25, description: "Marc Benioff refocused on efficiency and AI." },
      { name: "Financial Risk", score: 25, description: "Strong FCF margins at 30%+; acquisitions largely digested." },
      { name: "Technology Risk", score: 35, description: "AI agents strategy promising but execution unproven." }
    ],
    strengths: [
      { text: "$35B revenue with 23% market share in CRM - clear leader", impact: "critical" },
      { text: "Operating margin improved from 2% to 20%+ under activist pressure", impact: "critical" },
      { text: "Agentforce AI strategy positions for next wave of enterprise AI", impact: "high" }
    ],
    weaknesses: [
      { text: "Revenue growth slowed from 20%+ to single digits", impact: "high" },
      { text: "Competition from Microsoft Dynamics, HubSpot intensifying", impact: "medium" },
      { text: "Customer spending optimization reducing expansion revenue", impact: "medium" }
    ],
    suggestions: [
      { title: "AI Monetization", description: "Execute on Agentforce to drive new revenue and pricing power.", priority: "high" },
      { title: "Platform Consolidation", description: "Better integrate acquisitions for unified customer experience.", priority: "medium" },
      { title: "International Expansion", description: "Accelerate growth in underpenetrated international markets.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 88 },
      { name: "Founder-Market Fit", value: 85 },
      { name: "Team Composition", value: 82 },
      { name: "Financials", value: 85 },
      { name: "Exit Strategy", value: 80 },
      { name: "Intangibles", value: 82 }
    ]
  },
  {
    id: "amd",
    startupName: "Advanced Micro Devices (AMD)",
    industry: "Semiconductors",
    investibilityScore: 80,
    overallRisk: 35,
    businessModel: "b2b",
    founderTrustRating: 9,
    pmfScore: 85,
    growthExpected: "20% YoY",
    riskFactors: [
      { name: "Market Risk", score: 30, description: "Gaining share in CPUs and GPUs but NVIDIA dominates AI." },
      { name: "Team Risk", score: 20, description: "Lisa Su is exceptional leader with strong execution track record." },
      { name: "Financial Risk", score: 32, description: "Profitable but significantly smaller scale than NVIDIA." },
      { name: "Technology Risk", score: 45, description: "AI chip roadmap competitive but CUDA ecosystem advantage for NVIDIA." }
    ],
    strengths: [
      { text: "Data center revenue growing 122% YoY to $12B+ annually", impact: "critical" },
      { text: "Server CPU market share at 33% and growing from Intel", impact: "high" },
      { text: "MI300X AI chips winning hyperscaler design wins", impact: "high" }
    ],
    weaknesses: [
      { text: "AI GPU market share still under 10% vs NVIDIA's dominance", impact: "high" },
      { text: "Gaming and embedded segments declining offsetting data center gains", impact: "medium" },
      { text: "ROCm software ecosystem significantly behind CUDA", impact: "high" }
    ],
    suggestions: [
      { title: "ROCm Investment", description: "Massively invest in software ecosystem to compete with CUDA.", priority: "high" },
      { title: "AI Chip Roadmap", description: "Accelerate MI400 and beyond to close gap with NVIDIA.", priority: "high" },
      { title: "Embedded Recovery", description: "Stabilize Xilinx and embedded business for diversification.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 85 },
      { name: "Founder-Market Fit", value: 92 },
      { name: "Team Composition", value: 88 },
      { name: "Financials", value: 78 },
      { name: "Exit Strategy", value: 75 },
      { name: "Intangibles", value: 82 }
    ]
  },
  {
    id: "orcl",
    startupName: "Oracle Corp (ORCL)",
    industry: "Enterprise Software",
    investibilityScore: 79,
    overallRisk: 32,
    businessModel: "b2b",
    founderTrustRating: 8,
    pmfScore: 82,
    growthExpected: "12% YoY",
    riskFactors: [
      { name: "Market Risk", score: 30, description: "Cloud transition progressing; legacy database still dominant." },
      { name: "Team Risk", score: 25, description: "Larry Ellison still deeply involved; Safra Catz executing well." },
      { name: "Financial Risk", score: 30, description: "High debt from Cerner but strong cash generation." },
      { name: "Technology Risk", score: 35, description: "OCI growing but significantly behind AWS/Azure/GCP." }
    ],
    strengths: [
      { text: "Cloud revenue at $20B+ growing 25%+ annually", impact: "critical" },
      { text: "Database market leadership with loyal enterprise customer base", impact: "critical" },
      { text: "Multi-cloud partnerships with Azure and Google expanding addressable market", impact: "high" }
    ],
    weaknesses: [
      { text: "OCI is distant #4 in cloud infrastructure market", impact: "high" },
      { text: "Cerner integration challenging with healthcare IT complexity", impact: "medium" },
      { text: "$80B+ debt load from acquisitions", impact: "medium" }
    ],
    suggestions: [
      { title: "AI Infrastructure", description: "Capitalize on AI infrastructure demand for OCI growth.", priority: "high" },
      { title: "Healthcare Integration", description: "Complete Cerner integration to realize healthcare synergies.", priority: "medium" },
      { title: "Debt Reduction", description: "Use strong FCF to reduce debt levels over time.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 82 },
      { name: "Founder-Market Fit", value: 85 },
      { name: "Team Composition", value: 80 },
      { name: "Financials", value: 75 },
      { name: "Exit Strategy", value: 78 },
      { name: "Intangibles", value: 80 }
    ]
  },
  {
    id: "nflx",
    startupName: "Netflix Inc (NFLX)",
    industry: "Entertainment",
    investibilityScore: 81,
    overallRisk: 32,
    businessModel: "b2c",
    founderTrustRating: 8,
    pmfScore: 88,
    growthExpected: "14% YoY",
    riskFactors: [
      { name: "Market Risk", score: 28, description: "Streaming leader with subscriber growth reacceleration." },
      { name: "Team Risk", score: 25, description: "Greg Peters and Ted Sarandos executing well as co-CEOs." },
      { name: "Financial Risk", score: 28, description: "Strong margins and FCF; content spend stabilizing." },
      { name: "Technology Risk", score: 38, description: "Ad tier and password crackdown working; gaming uncertain." }
    ],
    strengths: [
      { text: "283M+ paid subscribers - largest streaming platform globally", impact: "critical" },
      { text: "Ad-supported tier driving subscriber growth and ARPU expansion", impact: "high" },
      { text: "Operating margin at 28% - highest in streaming industry", impact: "high" }
    ],
    weaknesses: [
      { text: "Content costs of $17B+ annually required to maintain library", impact: "high" },
      { text: "Streaming market saturating in developed markets", impact: "medium" },
      { text: "Gaming and live events expansion unproven at scale", impact: "medium" }
    ],
    suggestions: [
      { title: "Advertising Scale", description: "Build advertising business to $5B+ revenue for margin expansion.", priority: "high" },
      { title: "Live Programming", description: "Expand live sports and events to drive engagement and ad revenue.", priority: "high" },
      { title: "Content Efficiency", description: "Improve content ROI through better data-driven decisions.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 88 },
      { name: "Founder-Market Fit", value: 82 },
      { name: "Team Composition", value: 85 },
      { name: "Financials", value: 82 },
      { name: "Exit Strategy", value: 78 },
      { name: "Intangibles", value: 85 }
    ]
  },
  {
    id: "adbe",
    startupName: "Adobe Inc (ADBE)",
    industry: "Software",
    investibilityScore: 83,
    overallRisk: 28,
    businessModel: "b2b",
    founderTrustRating: 8,
    pmfScore: 90,
    growthExpected: "10% YoY",
    riskFactors: [
      { name: "Market Risk", score: 25, description: "Creative software leader with strong moat; AI disruption risk." },
      { name: "Team Risk", score: 22, description: "Shantanu Narayen providing steady long-term leadership." },
      { name: "Financial Risk", score: 22, description: "88% gross margin, strong FCF, minimal debt." },
      { name: "Technology Risk", score: 38, description: "Firefly AI promising but competition from Canva, Figma alternatives." }
    ],
    strengths: [
      { text: "$21B ARR with 95%+ retention in Creative Cloud", impact: "critical" },
      { text: "Experience Cloud at $5B+ serving enterprise marketing", impact: "high" },
      { text: "Firefly generative AI integrated across product suite", impact: "high" }
    ],
    weaknesses: [
      { text: "Figma acquisition blocked - lost strategic opportunity", impact: "high" },
      { text: "AI tools could commoditize creative software", impact: "medium" },
      { text: "SMB pricing pressure from Canva and free alternatives", impact: "medium" }
    ],
    suggestions: [
      { title: "AI Monetization", description: "Accelerate Firefly credits and AI premium pricing.", priority: "high" },
      { title: "Enterprise Focus", description: "Expand enterprise content management and DAM capabilities.", priority: "medium" },
      { title: "Video Expansion", description: "Build video editing leadership to compete with emerging tools.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 90 },
      { name: "Founder-Market Fit", value: 85 },
      { name: "Team Composition", value: 88 },
      { name: "Financials", value: 88 },
      { name: "Exit Strategy", value: 80 },
      { name: "Intangibles", value: 85 }
    ]
  },
  {
    id: "csco",
    startupName: "Cisco Systems (CSCO)",
    industry: "Networking",
    investibilityScore: 72,
    overallRisk: 35,
    businessModel: "b2b",
    founderTrustRating: 7,
    pmfScore: 78,
    growthExpected: "3% YoY",
    riskFactors: [
      { name: "Market Risk", score: 32, description: "Enterprise networking leader but cloud shift reducing hardware demand." },
      { name: "Team Risk", score: 28, description: "Chuck Robbins managing transition to software and security." },
      { name: "Financial Risk", score: 28, description: "Strong FCF and balance sheet; dividend sustainable." },
      { name: "Technology Risk", score: 42, description: "Software transition progressing but hardware commoditizing." }
    ],
    strengths: [
      { text: "$54B revenue with dominant enterprise networking position", impact: "critical" },
      { text: "Software and subscription revenue growing to 50%+ of total", impact: "high" },
      { text: "Splunk acquisition adds $4B cybersecurity and observability revenue", impact: "high" }
    ],
    weaknesses: [
      { text: "Hardware revenue declining as cloud shifts workloads", impact: "high" },
      { text: "Competition from Arista, Juniper, and cloud providers", impact: "medium" },
      { text: "Enterprise IT spending cycles creating revenue volatility", impact: "medium" }
    ],
    suggestions: [
      { title: "Security Portfolio Integration", description: "Integrate Splunk and security assets into unified platform.", priority: "high" },
      { title: "AI Networking", description: "Lead in AI data center networking infrastructure.", priority: "high" },
      { title: "Subscription Acceleration", description: "Continue software transition for recurring revenue.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 78 },
      { name: "Founder-Market Fit", value: 75 },
      { name: "Team Composition", value: 78 },
      { name: "Financials", value: 80 },
      { name: "Exit Strategy", value: 75 },
      { name: "Intangibles", value: 72 }
    ]
  },
  {
    id: "cvx",
    startupName: "Chevron Corp (CVX)",
    industry: "Energy",
    investibilityScore: 76,
    overallRisk: 38,
    businessModel: "b2b",
    founderTrustRating: 8,
    pmfScore: 82,
    growthExpected: "2% YoY",
    riskFactors: [
      { name: "Market Risk", score: 45, description: "Oil demand stable but energy transition creates long-term risk." },
      { name: "Team Risk", score: 25, description: "Mike Wirth providing consistent strategic leadership." },
      { name: "Financial Risk", score: 30, description: "Strong balance sheet; FCF supports dividend and buybacks." },
      { name: "Technology Risk", score: 42, description: "Low carbon investments but core business model challenged long-term." }
    ],
    strengths: [
      { text: "$200B revenue with industry-leading balance sheet", impact: "critical" },
      { text: "Hess acquisition adds premier Guyana assets with low breakeven", impact: "high" },
      { text: "Permian Basin position provides low-cost US production", impact: "high" }
    ],
    weaknesses: [
      { text: "Hess arbitration with Exxon creates deal uncertainty", impact: "high" },
      { text: "Energy transition reducing long-term oil demand outlook", impact: "high" },
      { text: "California legal and regulatory challenges on refining", impact: "medium" }
    ],
    suggestions: [
      { title: "Hess Deal Completion", description: "Resolve arbitration and complete Guyana asset acquisition.", priority: "high" },
      { title: "Capital Returns", description: "Maintain industry-leading shareholder returns to attract investors.", priority: "medium" },
      { title: "Low Carbon Transition", description: "Accelerate renewable fuels and carbon capture investments.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 82 },
      { name: "Founder-Market Fit", value: 80 },
      { name: "Team Composition", value: 82 },
      { name: "Financials", value: 80 },
      { name: "Exit Strategy", value: 68 },
      { name: "Intangibles", value: 75 }
    ]
  },
  {
    id: "abbv",
    startupName: "AbbVie Inc (ABBV)",
    industry: "Pharmaceuticals",
    investibilityScore: 80,
    overallRisk: 35,
    businessModel: "b2b",
    founderTrustRating: 8,
    pmfScore: 85,
    growthExpected: "5% YoY",
    riskFactors: [
      { name: "Market Risk", score: 32, description: "Diversified pharma portfolio but Humira biosimilar pressure." },
      { name: "Team Risk", score: 25, description: "Rob Michael executing well on post-Humira strategy." },
      { name: "Financial Risk", score: 35, description: "High debt from acquisitions but strong FCF for deleveraging." },
      { name: "Technology Risk", score: 38, description: "Pipeline solid but need continued R&D success." }
    ],
    strengths: [
      { text: "Skyrizi and Rinvoq growing 50%+ to offset Humira decline", impact: "critical" },
      { text: "Botox and aesthetics portfolio at $6B+ annually", impact: "high" },
      { text: "12 consecutive years of dividend increases with 3.5% yield", impact: "high" }
    ],
    weaknesses: [
      { text: "Humira revenue declining 35%+ annually from biosimilars", impact: "critical" },
      { text: "High acquisition-related debt needing deleveraging", impact: "medium" },
      { text: "Neuroscience pipeline has mixed results", impact: "medium" }
    ],
    suggestions: [
      { title: "Immunology Leadership", description: "Maximize Skyrizi/Rinvoq opportunity across indications.", priority: "high" },
      { title: "Debt Reduction", description: "Use strong FCF to reduce debt to target levels.", priority: "medium" },
      { title: "Pipeline Diversification", description: "Build oncology and neuroscience pipeline for long-term growth.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 85 },
      { name: "Founder-Market Fit", value: 82 },
      { name: "Team Composition", value: 85 },
      { name: "Financials", value: 78 },
      { name: "Exit Strategy", value: 80 },
      { name: "Intangibles", value: 82 }
    ]
  },
  {
    id: "mrk",
    startupName: "Merck & Co (MRK)",
    industry: "Pharmaceuticals",
    investibilityScore: 82,
    overallRisk: 32,
    businessModel: "b2b",
    founderTrustRating: 8,
    pmfScore: 88,
    growthExpected: "7% YoY",
    riskFactors: [
      { name: "Market Risk", score: 28, description: "Keytruda dominance but concentration risk as it approaches patent cliff." },
      { name: "Team Risk", score: 22, description: "Rob Davis executing on diversification strategy." },
      { name: "Financial Risk", score: 28, description: "Strong balance sheet and FCF supporting dividends and M&A." },
      { name: "Technology Risk", score: 40, description: "Need to build pipeline beyond Keytruda before 2028 LOE." }
    ],
    strengths: [
      { text: "Keytruda at $25B+ annually - world's best-selling drug", impact: "critical" },
      { text: "Gardasil growing to $10B+ on international expansion", impact: "high" },
      { text: "Animal health business provides stable diversification", impact: "medium" }
    ],
    weaknesses: [
      { text: "Keytruda 45% of revenue creates patent cliff risk in 2028", impact: "critical" },
      { text: "Pipeline needs to generate $10B+ in new revenue by 2028", impact: "high" },
      { text: "China vaccine challenges affecting Gardasil growth", impact: "medium" }
    ],
    suggestions: [
      { title: "Pipeline Acceleration", description: "Advance late-stage assets and pursue strategic acquisitions.", priority: "high" },
      { title: "Keytruda Extensions", description: "Maximize Keytruda lifecycle with new combinations and indications.", priority: "high" },
      { title: "BD&L Strategy", description: "Execute on business development to fill pipeline gaps.", priority: "high" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 88 },
      { name: "Founder-Market Fit", value: 82 },
      { name: "Team Composition", value: 85 },
      { name: "Financials", value: 82 },
      { name: "Exit Strategy", value: 78 },
      { name: "Intangibles", value: 85 }
    ]
  },
  {
    id: "mcd",
    startupName: "McDonald's Corp (MCD)",
    industry: "Restaurants",
    investibilityScore: 84,
    overallRisk: 28,
    businessModel: "b2c",
    founderTrustRating: 8,
    pmfScore: 92,
    growthExpected: "4% YoY",
    riskFactors: [
      { name: "Market Risk", score: 25, description: "Iconic QSR brand with global scale and loyal customers." },
      { name: "Team Risk", score: 22, description: "Chris Kempczinski navigating value proposition challenges." },
      { name: "Financial Risk", score: 22, description: "95% franchised model generates stable royalty and rent income." },
      { name: "Technology Risk", score: 35, description: "Digital and loyalty investments driving modernization." }
    ],
    strengths: [
      { text: "$25B revenue with 95% franchise model generating 60%+ margins", impact: "critical" },
      { text: "40,000+ restaurants in 100+ countries with unmatched scale", impact: "critical" },
      { text: "Digital sales at $20B+ annually through app and kiosks", impact: "high" }
    ],
    weaknesses: [
      { text: "Value perception challenged as prices increased significantly", impact: "high" },
      { text: "E. coli outbreak in 2024 affected brand perception", impact: "medium" },
      { text: "Labor cost pressures affecting franchisee profitability", impact: "medium" }
    ],
    suggestions: [
      { title: "Value Restoration", description: "Expand $5 value meals to rebuild value perception with consumers.", priority: "high" },
      { title: "Food Safety", description: "Strengthen supply chain controls after E. coli incident.", priority: "high" },
      { title: "Loyalty Expansion", description: "Grow MyMcDonald's Rewards to 200M+ members.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 92 },
      { name: "Founder-Market Fit", value: 85 },
      { name: "Team Composition", value: 85 },
      { name: "Financials", value: 88 },
      { name: "Exit Strategy", value: 82 },
      { name: "Intangibles", value: 90 }
    ]
  },
  {
    id: "hd",
    startupName: "Home Depot (HD)",
    industry: "Retail",
    investibilityScore: 83,
    overallRisk: 28,
    businessModel: "b2c",
    founderTrustRating: 8,
    pmfScore: 90,
    growthExpected: "3% YoY",
    riskFactors: [
      { name: "Market Risk", score: 28, description: "Home improvement leader but housing market softness affecting demand." },
      { name: "Team Risk", score: 22, description: "Ted Decker managing through challenging cycle." },
      { name: "Financial Risk", score: 25, description: "Strong FCF generation; dividend and buyback program." },
      { name: "Technology Risk", score: 30, description: "Interconnected retail strategy improving customer experience." }
    ],
    strengths: [
      { text: "$152B revenue with dominant 30% home improvement market share", impact: "critical" },
      { text: "Pro segment at 50% of sales provides stable B2B revenue", impact: "high" },
      { text: "SRS Distribution acquisition adds $10B+ roofing and building products", impact: "high" }
    ],
    weaknesses: [
      { text: "DIY spending soft with high interest rates affecting housing", impact: "high" },
      { text: "Comparable sales negative for multiple quarters", impact: "medium" },
      { text: "Large format stores face supply chain complexity", impact: "low" }
    ],
    suggestions: [
      { title: "Pro Acceleration", description: "Integrate SRS and expand Pro ecosystem for share gains.", priority: "high" },
      { title: "Rate Cycle Positioning", description: "Prepare for housing recovery when rates decline.", priority: "medium" },
      { title: "Digital Experience", description: "Continue enhancing online and in-store experience integration.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 90 },
      { name: "Founder-Market Fit", value: 85 },
      { name: "Team Composition", value: 85 },
      { name: "Financials", value: 85 },
      { name: "Exit Strategy", value: 82 },
      { name: "Intangibles", value: 85 }
    ]
  },
  {
    id: "t",
    startupName: "AT&T Inc (T)",
    industry: "Telecommunications",
    investibilityScore: 58,
    overallRisk: 48,
    businessModel: "b2c",
    founderTrustRating: 6,
    pmfScore: 70,
    growthExpected: "1% YoY",
    riskFactors: [
      { name: "Market Risk", score: 42, description: "Stable wireless market but legacy wireline declining." },
      { name: "Team Risk", score: 38, description: "John Stankey refocused but past strategic missteps hurt credibility." },
      { name: "Financial Risk", score: 55, description: "$130B+ debt load constraining flexibility." },
      { name: "Technology Risk", score: 48, description: "5G investment intensive; fiber buildout ongoing." }
    ],
    strengths: [
      { text: "70M+ postpaid phone subscribers - #3 US wireless carrier", impact: "high" },
      { text: "Fiber network expansion reaching 28M+ locations", impact: "high" },
      { text: "Dividend yield at 5%+ attractive for income investors", impact: "medium" }
    ],
    weaknesses: [
      { text: "$130B+ debt constrains investment and M&A flexibility", impact: "critical" },
      { text: "Wireline business declining 5%+ annually", impact: "high" },
      { text: "Past M&A failures (Time Warner, DirecTV) destroyed value", impact: "medium" }
    ],
    suggestions: [
      { title: "Debt Reduction", description: "Prioritize deleveraging to strengthen balance sheet.", priority: "high" },
      { title: "Fiber Focus", description: "Accelerate fiber buildout as wireline replacement.", priority: "high" },
      { title: "Operational Efficiency", description: "Continue cost optimization to improve margins.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 70 },
      { name: "Founder-Market Fit", value: 60 },
      { name: "Team Composition", value: 65 },
      { name: "Financials", value: 50 },
      { name: "Exit Strategy", value: 60 },
      { name: "Intangibles", value: 62 }
    ]
  },
  {
    id: "vz",
    startupName: "Verizon Communications (VZ)",
    industry: "Telecommunications",
    investibilityScore: 62,
    overallRisk: 42,
    businessModel: "b2c",
    founderTrustRating: 7,
    pmfScore: 75,
    growthExpected: "1% YoY",
    riskFactors: [
      { name: "Market Risk", score: 38, description: "Premium wireless network but market saturated." },
      { name: "Team Risk", score: 32, description: "Hans Vestberg managing challenging competitive environment." },
      { name: "Financial Risk", score: 48, description: "High debt but better than AT&T; dividend yield at 6%+." },
      { name: "Technology Risk", score: 42, description: "5G Ultra Wideband limited scale; C-band rollout costly." }
    ],
    strengths: [
      { text: "Best-in-class network quality and reliability reputation", impact: "critical" },
      { text: "94M+ wireless subscribers with premium positioning", impact: "high" },
      { text: "Business segment provides stable enterprise revenue", impact: "medium" }
    ],
    weaknesses: [
      { text: "Subscriber growth lagging T-Mobile significantly", impact: "high" },
      { text: "FiOS growth limited by legacy footprint", impact: "medium" },
      { text: "Premium pricing challenged by T-Mobile competition", impact: "high" }
    ],
    suggestions: [
      { title: "Fixed Wireless Expansion", description: "Accelerate 5G fixed wireless as alternative to fiber.", priority: "high" },
      { title: "Value Tier Strategy", description: "Consider value-tier options to compete with T-Mobile.", priority: "medium" },
      { title: "Enterprise Focus", description: "Expand business solutions and private 5G networks.", priority: "medium" }
    ],
    categories: [
      { name: "Product-Market Fit", value: 75 },
      { name: "Founder-Market Fit", value: 68 },
      { name: "Team Composition", value: 72 },
      { name: "Financials", value: 58 },
      { name: "Exit Strategy", value: 62 },
      { name: "Intangibles", value: 70 }
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
    
    const prefixes = ['Smart', 'Eco', 'Tech', 'Next', 'Pure', 'Pro', 'Zen', 'Swift', 'Nova', 'Vital', 'Peak', 'Prime', 'Flex', 'Lux', 'Bio'];
    const suffixes = ['Solutions', 'Hub', 'Box', 'Connect', 'Craft', 'Labs', 'Ware', 'Boost', 'Genius', 'Mind', 'Wave', 'Sync', 'Blend', 'Go', 'Life'];
    const startupName = `${prefixes[Math.floor(Math.random() * prefixes.length)]}${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
    
    const baseFactor = Math.floor(Math.random() * 20) + 1;
    const valuation = baseFactor * 500000;
    
    let askAmount, askEquity, askString;
    askEquity = Math.floor(Math.random() * 25) + 5;
    askAmount = Math.floor(valuation * (askEquity / 100));
    
    if (source === 'Shark Tank India') {
      askString = `₹${Math.round(askAmount / 10000) / 10} crore for ${askEquity}% equity`;
    } else if (source === 'Dragons\' Den UK') {
      askString = `£${Math.round(askAmount / 100000) * 10}0,000 for ${askEquity}% equity`;
    } else {
      askString = `$${Math.round(askAmount / 10000) * 10},000 for ${askEquity}% equity`;
    }
    
    let investors: string[] = [];
    let dealAmount = 0;
    let dealEquity = 0;
    
    if (outcome === 'deal') {
      const sourceInvestors = possibleInvestors[source as keyof typeof possibleInvestors];
      const numInvestors = Math.random() > 0.7 ? 2 : 1;
      
      for (let j = 0; j < numInvestors; j++) {
        const investor = sourceInvestors[Math.floor(Math.random() * sourceInvestors.length)];
        if (!investors.includes(investor)) {
          investors.push(investor);
        }
      }
      
      const dealFactor = Math.random();
      if (dealFactor < 0.3) {
        dealAmount = askAmount;
        dealEquity = askEquity;
      } else if (dealFactor < 0.6) {
        dealAmount = askAmount;
        dealEquity = askEquity + Math.floor(Math.random() * 15) + 5;
      } else {
        dealAmount = Math.round(askAmount * (0.7 + Math.random() * 0.3));
        dealEquity = askEquity + Math.floor(Math.random() * 10);
      }
    }
    
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

export const additionalEpisodes = generateSharkTankEpisodes(500);
