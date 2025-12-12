import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Top 50 US stocks with their symbols
const TOP_STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.', industry: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft Corp', industry: 'Technology' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', industry: 'Semiconductors' },
  { symbol: 'AMZN', name: 'Amazon.com Inc', industry: 'E-Commerce/Cloud' },
  { symbol: 'GOOGL', name: 'Alphabet Inc', industry: 'Technology' },
  { symbol: 'META', name: 'Meta Platforms', industry: 'Social Media' },
  { symbol: 'TSLA', name: 'Tesla Inc', industry: 'Automotive/Energy' },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway', industry: 'Diversified Financials' },
  { symbol: 'JPM', name: 'JPMorgan Chase', industry: 'Banking' },
  { symbol: 'V', name: 'Visa Inc', industry: 'Financial Services' },
  { symbol: 'UNH', name: 'UnitedHealth Group', industry: 'Healthcare' },
  { symbol: 'XOM', name: 'Exxon Mobil', industry: 'Energy' },
  { symbol: 'LLY', name: 'Eli Lilly', industry: 'Pharmaceuticals' },
  { symbol: 'COST', name: 'Costco Wholesale', industry: 'Retail' },
  { symbol: 'WMT', name: 'Walmart Inc', industry: 'Retail' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', industry: 'Healthcare' },
  { symbol: 'PG', name: 'Procter & Gamble', industry: 'Consumer Goods' },
  { symbol: 'KO', name: 'Coca-Cola Company', industry: 'Beverages' },
  { symbol: 'PEP', name: 'PepsiCo Inc', industry: 'Beverages/Snacks' },
  { symbol: 'INTC', name: 'Intel Corp', industry: 'Semiconductors' },
  { symbol: 'BA', name: 'Boeing Company', industry: 'Aerospace' },
  { symbol: 'PYPL', name: 'PayPal Holdings', industry: 'Fintech' },
  { symbol: 'DIS', name: 'Walt Disney Company', industry: 'Entertainment' },
  { symbol: 'NKE', name: 'Nike Inc', industry: 'Apparel/Footwear' },
  { symbol: 'CRM', name: 'Salesforce Inc', industry: 'Enterprise Software' },
  { symbol: 'AMD', name: 'Advanced Micro Devices', industry: 'Semiconductors' },
  { symbol: 'ORCL', name: 'Oracle Corp', industry: 'Enterprise Software' },
  { symbol: 'NFLX', name: 'Netflix Inc', industry: 'Entertainment' },
  { symbol: 'ADBE', name: 'Adobe Inc', industry: 'Software' },
  { symbol: 'CSCO', name: 'Cisco Systems', industry: 'Networking' },
  { symbol: 'CVX', name: 'Chevron Corp', industry: 'Energy' },
  { symbol: 'ABBV', name: 'AbbVie Inc', industry: 'Pharmaceuticals' },
  { symbol: 'MRK', name: 'Merck & Co', industry: 'Pharmaceuticals' },
  { symbol: 'MCD', name: "McDonald's Corp", industry: 'Restaurants' },
  { symbol: 'HD', name: 'Home Depot', industry: 'Retail' },
  { symbol: 'T', name: 'AT&T Inc', industry: 'Telecommunications' },
  { symbol: 'VZ', name: 'Verizon Communications', industry: 'Telecommunications' },
  { symbol: 'MA', name: 'Mastercard Inc', industry: 'Financial Services' },
  { symbol: 'BAC', name: 'Bank of America', industry: 'Banking' },
  { symbol: 'AVGO', name: 'Broadcom Inc', industry: 'Semiconductors' },
  { symbol: 'TMO', name: 'Thermo Fisher Scientific', industry: 'Life Sciences' },
  { symbol: 'PFE', name: 'Pfizer Inc', industry: 'Pharmaceuticals' },
  { symbol: 'ACN', name: 'Accenture', industry: 'Consulting' },
  { symbol: 'DHR', name: 'Danaher Corp', industry: 'Life Sciences' },
  { symbol: 'TXN', name: 'Texas Instruments', industry: 'Semiconductors' },
  { symbol: 'ABT', name: 'Abbott Laboratories', industry: 'Healthcare' },
  { symbol: 'NEE', name: 'NextEra Energy', industry: 'Utilities' },
  { symbol: 'PM', name: 'Philip Morris International', industry: 'Consumer Goods' },
  { symbol: 'RTX', name: 'RTX Corp', industry: 'Aerospace/Defense' },
  { symbol: 'QCOM', name: 'Qualcomm', industry: 'Semiconductors' },
];

// Calculate analysis scores based on market data
function calculateAnalysis(quote: any, basicFinancials: any, symbol: string, stockInfo: any) {
  const currentPrice = quote?.c || 0;
  const previousClose = quote?.pc || 0;
  const percentChange = previousClose ? ((currentPrice - previousClose) / previousClose) * 100 : 0;
  const high52Week = quote?.h || currentPrice;
  const low52Week = quote?.l || currentPrice;
  
  // Get financial metrics
  const peRatio = basicFinancials?.metric?.peNormalizedAnnual || basicFinancials?.metric?.peTTM || 20;
  const pbRatio = basicFinancials?.metric?.pbQuarterly || basicFinancials?.metric?.pbAnnual || 3;
  const dividendYield = basicFinancials?.metric?.dividendYieldIndicatedAnnual || 0;
  const roe = basicFinancials?.metric?.roeTTM || basicFinancials?.metric?.roeRfy || 15;
  const grossMargin = basicFinancials?.metric?.grossMarginTTM || basicFinancials?.metric?.grossMargin5Y || 40;
  const debtEquity = basicFinancials?.metric?.totalDebt\/totalEquityQuarterly || 0.5;
  const beta = basicFinancials?.metric?.beta || 1;
  
  // Calculate investibility score (0-100)
  let investibilityScore = 50;
  
  // PE ratio scoring (lower is generally better, but not too low)
  if (peRatio > 0 && peRatio < 15) investibilityScore += 15;
  else if (peRatio >= 15 && peRatio < 25) investibilityScore += 10;
  else if (peRatio >= 25 && peRatio < 40) investibilityScore += 5;
  else if (peRatio >= 40) investibilityScore -= 10;
  
  // ROE scoring (higher is better)
  if (roe > 25) investibilityScore += 15;
  else if (roe > 15) investibilityScore += 10;
  else if (roe > 10) investibilityScore += 5;
  else investibilityScore -= 5;
  
  // Gross margin scoring
  if (grossMargin > 50) investibilityScore += 10;
  else if (grossMargin > 30) investibilityScore += 5;
  
  // Price momentum scoring
  if (percentChange > 2) investibilityScore += 5;
  else if (percentChange < -2) investibilityScore -= 5;
  
  // Dividend scoring for stability
  if (dividendYield > 2) investibilityScore += 5;
  
  investibilityScore = Math.max(20, Math.min(98, investibilityScore));
  
  // Calculate risk score (0-100)
  let riskScore = 50;
  
  // Beta-based risk
  if (beta > 1.5) riskScore += 20;
  else if (beta > 1.2) riskScore += 10;
  else if (beta < 0.8) riskScore -= 10;
  
  // Debt-based risk
  if (debtEquity > 2) riskScore += 15;
  else if (debtEquity > 1) riskScore += 5;
  else if (debtEquity < 0.5) riskScore -= 10;
  
  // Valuation risk
  if (peRatio > 50) riskScore += 15;
  else if (peRatio > 30) riskScore += 5;
  
  riskScore = Math.max(15, Math.min(85, riskScore));
  
  // Generate dynamic strengths based on metrics
  const strengths = [];
  if (grossMargin > 40) {
    strengths.push({ text: `Strong gross margin of ${grossMargin.toFixed(1)}% indicates pricing power`, impact: 'critical' });
  }
  if (roe > 20) {
    strengths.push({ text: `High return on equity at ${roe.toFixed(1)}% shows efficient capital use`, impact: 'high' });
  }
  if (dividendYield > 2) {
    strengths.push({ text: `Attractive dividend yield of ${dividendYield.toFixed(2)}% for income investors`, impact: 'medium' });
  }
  if (peRatio > 0 && peRatio < 20) {
    strengths.push({ text: `Reasonable P/E ratio of ${peRatio.toFixed(1)}x suggests fair valuation`, impact: 'high' });
  }
  if (percentChange > 0) {
    strengths.push({ text: `Positive price momentum with ${percentChange.toFixed(2)}% daily gain`, impact: 'medium' });
  }
  if (strengths.length < 3) {
    strengths.push({ text: `Established market position in ${stockInfo.industry} sector`, impact: 'high' });
  }
  
  // Generate dynamic weaknesses based on metrics
  const weaknesses = [];
  if (peRatio > 40) {
    weaknesses.push({ text: `Elevated P/E ratio of ${peRatio.toFixed(1)}x may indicate overvaluation`, impact: 'high' });
  }
  if (debtEquity > 1.5) {
    weaknesses.push({ text: `High debt-to-equity ratio of ${debtEquity.toFixed(2)} creates leverage risk`, impact: 'critical' });
  }
  if (beta > 1.3) {
    weaknesses.push({ text: `High beta of ${beta.toFixed(2)} indicates above-average volatility`, impact: 'medium' });
  }
  if (percentChange < -2) {
    weaknesses.push({ text: `Negative price action today with ${percentChange.toFixed(2)}% decline`, impact: 'medium' });
  }
  if (roe < 10) {
    weaknesses.push({ text: `Low ROE of ${roe.toFixed(1)}% suggests inefficient capital deployment`, impact: 'high' });
  }
  if (weaknesses.length < 3) {
    weaknesses.push({ text: `Market conditions and sector rotation could impact performance`, impact: 'medium' });
    weaknesses.push({ text: `Macroeconomic headwinds may affect near-term growth`, impact: 'low' });
  }
  
  // Generate suggestions based on metrics
  const suggestions = [];
  if (peRatio > 30) {
    suggestions.push({ title: 'Monitor Valuation', description: 'Watch for potential valuation compression if growth slows.', priority: 'high' });
  }
  if (debtEquity > 1) {
    suggestions.push({ title: 'Track Debt Levels', description: 'Monitor debt reduction efforts and interest coverage ratios.', priority: 'medium' });
  }
  suggestions.push({ title: 'Diversification', description: 'Consider position sizing relative to portfolio concentration.', priority: 'medium' });
  suggestions.push({ title: 'Earnings Watch', description: 'Monitor upcoming earnings reports for guidance updates.', priority: 'high' });
  if (dividendYield > 0) {
    suggestions.push({ title: 'Dividend Sustainability', description: 'Verify payout ratio supports continued dividend growth.', priority: 'low' });
  }
  
  // Growth expectation based on sector and metrics
  let growthExpected = '5% YoY';
  if (stockInfo.industry.includes('Technology') || stockInfo.industry.includes('Semiconductors')) {
    if (peRatio > 30) growthExpected = '15% YoY';
    else growthExpected = '10% YoY';
  } else if (stockInfo.industry.includes('Healthcare') || stockInfo.industry.includes('Pharmaceuticals')) {
    growthExpected = '8% YoY';
  } else if (stockInfo.industry.includes('Banking') || stockInfo.industry.includes('Financial')) {
    growthExpected = '6% YoY';
  } else if (stockInfo.industry.includes('Energy')) {
    growthExpected = '3% YoY';
  }
  
  // Categories for radar chart
  const categories = [
    { name: 'Product-Market Fit', value: Math.min(95, 60 + (grossMargin / 2)) },
    { name: 'Founder-Market Fit', value: Math.min(95, 70 + (roe / 3)) },
    { name: 'Team Composition', value: Math.min(95, 65 + Math.random() * 20) },
    { name: 'Financials', value: Math.min(95, 50 + (100 - riskScore) / 2) },
    { name: 'Exit Strategy', value: Math.min(95, 70 + Math.random() * 15) },
    { name: 'Intangibles', value: Math.min(95, 65 + (investibilityScore / 5)) },
  ];
  
  // Risk factors
  const riskFactors = [
    { name: 'Market Risk', score: Math.round(30 + beta * 20), description: `Market volatility exposure with beta of ${beta.toFixed(2)}` },
    { name: 'Financial Risk', score: Math.round(30 + debtEquity * 20), description: `Balance sheet risk with debt/equity of ${debtEquity.toFixed(2)}` },
    { name: 'Valuation Risk', score: Math.round(20 + Math.min(peRatio, 50)), description: `Valuation at ${peRatio.toFixed(1)}x earnings` },
    { name: 'Sector Risk', score: Math.round(35 + Math.random() * 20), description: `Industry-specific headwinds and competition` },
  ];
  
  return {
    investibilityScore: Math.round(investibilityScore),
    overallRisk: Math.round(riskScore),
    founderTrustRating: Math.min(10, Math.round(7 + (roe / 10))),
    pmfScore: Math.round(60 + (grossMargin / 3)),
    growthExpected,
    strengths,
    weaknesses,
    suggestions,
    categories,
    riskFactors,
    marketData: {
      currentPrice,
      previousClose,
      percentChange: percentChange.toFixed(2),
      high52Week,
      low52Week,
      peRatio: peRatio.toFixed(2),
      dividendYield: dividendYield.toFixed(2),
      beta: beta.toFixed(2),
      roe: roe.toFixed(2),
      grossMargin: grossMargin.toFixed(2),
    },
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const finnhubApiKey = Deno.env.get('FINNHUB_API_KEY');
    if (!finnhubApiKey) {
      throw new Error('FINNHUB_API_KEY not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Starting stock data update...');
    
    const updates = [];
    let successCount = 0;
    let errorCount = 0;

    // Process stocks in batches to avoid rate limits
    for (const stock of TOP_STOCKS) {
      try {
        // Fetch quote data
        const quoteResponse = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${finnhubApiKey}`
        );
        const quote = await quoteResponse.json();

        // Fetch basic financials
        const financialsResponse = await fetch(
          `https://finnhub.io/api/v1/stock/metric?symbol=${stock.symbol}&metric=all&token=${finnhubApiKey}`
        );
        const basicFinancials = await financialsResponse.json();

        if (quote.c) { // Only process if we got valid data
          const analysis = calculateAnalysis(quote, basicFinancials, stock.symbol, stock);

          updates.push({
            symbol: stock.symbol,
            company_name: stock.name,
            industry: stock.industry,
            investibility_score: analysis.investibilityScore,
            overall_risk: analysis.overallRisk,
            business_model: stock.industry.includes('Consumer') || stock.industry.includes('Retail') ? 'b2c' : 'b2b',
            founder_trust_rating: analysis.founderTrustRating,
            pmf_score: analysis.pmfScore,
            growth_expected: analysis.growthExpected,
            risk_factors: analysis.riskFactors,
            strengths: analysis.strengths,
            weaknesses: analysis.weaknesses,
            suggestions: analysis.suggestions,
            categories: analysis.categories,
            market_data: analysis.marketData,
            last_updated: new Date().toISOString(),
          });
          
          successCount++;
        } else {
          console.log(`No data for ${stock.symbol}`);
          errorCount++;
        }

        // Rate limiting - Finnhub free tier allows 60 calls/minute
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        console.error(`Error fetching ${stock.symbol}:`, error);
        errorCount++;
      }
    }

    // Upsert all updates to database
    if (updates.length > 0) {
      const { error: upsertError } = await supabase
        .from('stock_analyses')
        .upsert(updates, { onConflict: 'symbol' });

      if (upsertError) {
        console.error('Error upserting data:', upsertError);
        throw upsertError;
      }
    }

    console.log(`Update complete. Success: ${successCount}, Errors: ${errorCount}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        updated: successCount, 
        errors: errorCount,
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in update-stock-data:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
