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
  // Expanded coverage — high-signal names across AI, fintech, semis, biotech, EV, industrials.
  { symbol: 'PLTR', name: 'Palantir Technologies', industry: 'AI/Defense Software' },
  { symbol: 'COIN', name: 'Coinbase Global', industry: 'Crypto Exchange' },
  { symbol: 'SQ', name: 'Block Inc', industry: 'Fintech' },
  { symbol: 'CRWD', name: 'CrowdStrike Holdings', industry: 'Cybersecurity' },
  { symbol: 'PANW', name: 'Palo Alto Networks', industry: 'Cybersecurity' },
  { symbol: 'SMCI', name: 'Super Micro Computer', industry: 'AI Infrastructure' },
  { symbol: 'MU', name: 'Micron Technology', industry: 'Semiconductors' },
  { symbol: 'ASML', name: 'ASML Holding', industry: 'Semiconductor Equipment' },
  { symbol: 'TSM', name: 'Taiwan Semiconductor', industry: 'Semiconductors' },
  { symbol: 'BABA', name: 'Alibaba Group', industry: 'E-Commerce' },
  { symbol: 'RIVN', name: 'Rivian Automotive', industry: 'EV' },
  { symbol: 'ENPH', name: 'Enphase Energy', industry: 'Clean Energy' },
  { symbol: 'MRNA', name: 'Moderna Inc', industry: 'Biotech' },
  { symbol: 'VRTX', name: 'Vertex Pharmaceuticals', industry: 'Biotech' },
  { symbol: 'DAL', name: 'Delta Air Lines', industry: 'Airlines' },
  { symbol: 'ABNB', name: 'Airbnb Inc', industry: 'Travel/Hospitality' },
  { symbol: 'SHOP', name: 'Shopify Inc', industry: 'E-Commerce Software' },
  { symbol: 'ROKU', name: 'Roku Inc', industry: 'Streaming' },
  { symbol: 'LULU', name: 'Lululemon Athletica', industry: 'Apparel' },
  { symbol: 'CAT', name: 'Caterpillar Inc', industry: 'Industrials' },
  { symbol: 'DE', name: 'Deere & Company', industry: 'Industrials' },
  { symbol: 'SCHW', name: 'Charles Schwab', industry: 'Financial Services' },
  { symbol: 'O', name: 'Realty Income', industry: 'REIT' },
  { symbol: 'UBER', name: 'Uber Technologies', industry: 'Mobility' },
  { symbol: 'SOFI', name: 'SoFi Technologies', industry: 'Fintech' },
];

// Finnhub free tier allows ~1 request/second. Every fetch to Finnhub must
// wait at least this long AFTER the previous fetch, regardless of which stock
// it belongs to. 1100ms gives a safety margin.
const FINNHUB_MIN_INTERVAL_MS = 1100;
let lastFinnhubCallAt = 0;
async function finnhubFetch(url: string): Promise<Response> {
  const now = Date.now();
  const wait = Math.max(0, lastFinnhubCallAt + FINNHUB_MIN_INTERVAL_MS - now);
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastFinnhubCallAt = Date.now();
  return fetch(url);
}

// Calculate analysis scores based on market data
function calculateAnalysis(quote: any, basicFinancials: any, symbol: string, stockInfo: any) {
  const currentPrice = quote?.c || 0;
  const previousClose = quote?.pc || 0;
  const percentChange = previousClose ? ((currentPrice - previousClose) / previousClose) * 100 : 0;
  
  // Get financial metrics
  const peRatio = basicFinancials?.metric?.peNormalizedAnnual || basicFinancials?.metric?.peTTM || 20;
  const pbRatio = basicFinancials?.metric?.pbQuarterly || basicFinancials?.metric?.pbAnnual || 3;
  const dividendYield = basicFinancials?.metric?.dividendYieldIndicatedAnnual || 0;
  const roe = basicFinancials?.metric?.roeTTM || basicFinancials?.metric?.roeRfy || 15;
  const grossMargin = basicFinancials?.metric?.grossMarginTTM || basicFinancials?.metric?.grossMargin5Y || 40;
  const debtEquity = basicFinancials?.metric?.totalDebtToTotalEquityQuarterly || 0.5;
  const beta = basicFinancials?.metric?.beta || 1;

  // NOTE: Finnhub's /quote endpoint returns intraday high/low (quote.h / quote.l),
  // NOT 52-week high/low — the previous version mislabeled these. Pull the real
  // 52-week range from the financials metric object, with the day range as a fallback.
  const week52High = basicFinancials?.metric?.['52WeekHigh'] || quote?.h || currentPrice;
  const week52Low = basicFinancials?.metric?.['52WeekLow'] || quote?.l || currentPrice;
  const rangeSpan = week52High - week52Low;
  const rangePosition = rangeSpan > 0
    ? Math.max(0, Math.min(100, ((currentPrice - week52Low) / rangeSpan) * 100))
    : 50;
  
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
  
  // Categories for radar chart — every value below is derived directly from a
  // real, fetched metric. No randomness, no borrowed VC vocabulary: these are
  // the five dimensions that actually matter for a public equity.
  const valuationScore = peRatio > 0
    ? Math.max(10, Math.min(95, 100 - (peRatio - 10) * 1.8))
    : 30; // negative/no earnings -> can't be valued on a P/E basis, treat as weak
  const profitabilityScore = Math.max(10, Math.min(95, (roe * 2 + grossMargin) / 3));
  const financialHealthScore = Math.max(10, Math.min(95, 90 - debtEquity * 30));
  const momentumScore = Math.round(rangePosition); // position within the real 52-week range
  const incomeStabilityScore = Math.max(10, Math.min(95, 50 + dividendYield * 8 - Math.abs(beta - 1) * 15));

  const categories = [
    {
      name: 'Valuation',
      value: Math.round(valuationScore),
      description: peRatio > 0
        ? `Trading at ${peRatio.toFixed(1)}x earnings`
        : 'No positive P/E (unprofitable on a trailing basis)',
    },
    {
      name: 'Profitability',
      value: Math.round(profitabilityScore),
      description: `ROE of ${roe.toFixed(1)}%, gross margin of ${grossMargin.toFixed(1)}%`,
    },
    {
      name: 'Financial Health',
      value: Math.round(financialHealthScore),
      description: `Debt-to-equity of ${debtEquity.toFixed(2)}`,
    },
    {
      name: 'Momentum',
      value: momentumScore,
      description: `Trading at ${rangePosition.toFixed(0)}% of its 52-week range`,
    },
    {
      name: 'Income Stability',
      value: Math.round(incomeStabilityScore),
      description: `${dividendYield.toFixed(2)}% dividend yield, beta of ${beta.toFixed(2)}`,
    },
  ];

  // Risk factors — "Sector Risk" is now derived from actual price volatility
  // (52-week range width relative to price) instead of a random number.
  const volatilityRisk = currentPrice > 0
    ? Math.max(10, Math.min(90, (rangeSpan / currentPrice) * 100))
    : 40;

  const riskFactors = [
    { name: 'Market Risk', score: Math.round(30 + beta * 20), description: `Market volatility exposure with beta of ${beta.toFixed(2)}` },
    { name: 'Financial Risk', score: Math.round(30 + debtEquity * 20), description: `Balance sheet risk with debt/equity of ${debtEquity.toFixed(2)}` },
    { name: 'Valuation Risk', score: Math.round(20 + Math.min(peRatio, 50)), description: `Valuation at ${peRatio.toFixed(1)}x earnings` },
    { name: 'Volatility Risk', score: Math.round(volatilityRisk), description: `52-week range spans ${((rangeSpan / (currentPrice || 1)) * 100).toFixed(0)}% of current price` },
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
      week52High,
      week52Low,
      rangePosition: rangePosition.toFixed(1),
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
    // Authenticate the user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Missing or invalid authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    
    // Create client for auth verification
    const authClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await authClient.auth.getClaims(token);
    
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Invalid or expired token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = claimsData.claims.sub;
    console.log('Authenticated user:', userId);

    const finnhubApiKey = Deno.env.get('FINNHUB_API_KEY');
    if (!finnhubApiKey) {
      throw new Error('FINNHUB_API_KEY not configured');
    }

    // Use service role key for database operations (after auth verification)
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Starting stock data update...');

    // Pull previous scores in one query so we can detect meaningful risk-score
    // swings as we recompute each stock below (used for the Signal Deck ledger).
    const { data: previousRows } = await supabase
      .from('stock_analyses')
      .select('symbol, overall_risk, market_data');
    const previousBySymbol = new Map(
      (previousRows || []).map((row: any) => [row.symbol, row])
    );

    // A risk score swing of this size or more (0-100 scale) gets logged as a
    // public, dated call in risk_calls. Smaller day-to-day noise is ignored.
    const RISK_CALL_THRESHOLD = 15;
    const GRADE_WINDOW_DAYS = 90;

    const updates = [];
    const riskCalls = [];
    const historyRows = [];
    let successCount = 0;
    let errorCount = 0;


    // Batching: the full list is ~75 stocks × 2 API calls × 1.1s ≈ ~165s,
    // which pushes past typical edge function time budgets. Support an optional
    // ?batch=1 or ?batch=2 query param so the scheduled job can process the
    // list in two halves via two separate runs. No batch param = process all.
    const url = new URL(req.url);
    const batchParam = url.searchParams.get('batch');
    let stocksToProcess = TOP_STOCKS;
    if (batchParam === '1' || batchParam === '2') {
      const mid = Math.ceil(TOP_STOCKS.length / 2);
      stocksToProcess = batchParam === '1'
        ? TOP_STOCKS.slice(0, mid)
        : TOP_STOCKS.slice(mid);
      console.log(`Processing batch ${batchParam}: ${stocksToProcess.length} stocks`);
    }

    for (const stock of stocksToProcess) {
      try {
        // Each Finnhub call is throttled to >=1.1s apart via finnhubFetch,
        // so both the quote and the financials request are individually rate-safe.
        const quoteResponse = await finnhubFetch(
          `https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${finnhubApiKey}`
        );
        const quote = await quoteResponse.json();

        const financialsResponse = await finnhubFetch(
          `https://finnhub.io/api/v1/stock/metric?symbol=${stock.symbol}&metric=all&token=${finnhubApiKey}`
        );
        const basicFinancials = await financialsResponse.json();

        if (quote.c) {
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

          const previous = previousBySymbol.get(stock.symbol);
          if (previous && typeof previous.overall_risk === 'number') {
            const delta = analysis.overallRisk - previous.overall_risk;
            if (Math.abs(delta) >= RISK_CALL_THRESHOLD) {
              const direction = delta > 0 ? 'risk_up' : 'risk_down';
              const topFactor = [...analysis.riskFactors].sort((a, b) => b.score - a.score)[0];
              const reasoning = topFactor
                ? `${direction === 'risk_up' ? 'Risk climbed' : 'Risk eased'} from ${previous.overall_risk} to ${analysis.overallRisk}. Leading factor: ${topFactor.description}`
                : `${direction === 'risk_up' ? 'Risk climbed' : 'Risk eased'} from ${previous.overall_risk} to ${analysis.overallRisk}.`;

              riskCalls.push({
                symbol: stock.symbol,
                company_name: stock.name,
                previous_score: previous.overall_risk,
                new_score: analysis.overallRisk,
                delta: Math.round(delta),
                direction,
                reasoning,
                price_at_call: quote.c,
                grade_due_at: new Date(Date.now() + GRADE_WINDOW_DAYS * 24 * 60 * 60 * 1000).toISOString(),
              });
            }
          }

          successCount++;
        } else {
          console.log(`No data for ${stock.symbol}`);
          errorCount++;
        }
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

    // Log any new calls to the public ledger
    if (riskCalls.length > 0) {
      const { error: callsError } = await supabase
        .from('risk_calls')
        .insert(riskCalls);

      if (callsError) {
        console.error('Error inserting risk calls:', callsError);
      } else {
        console.log(`Logged ${riskCalls.length} new risk call(s).`);
      }
    }

    console.log(`Update complete. Success: ${successCount}, Errors: ${errorCount}`);

    return new Response(
      JSON.stringify({
        success: true,
        batch: batchParam ?? 'all',
        updated: successCount,
        errors: errorCount,
        timestamp: new Date().toISOString(),
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
