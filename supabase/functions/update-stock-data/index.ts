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

// ─────────────────────────────────────────────────────────────────────────────
// InvestibilityScore methodology (0-100, weights sum to 100)
// ─────────────────────────────────────────────────────────────────────────────
//   Valuation           (P/E ratio)                              max 20 pts
//   Profitability       (ROE + gross margin)                     max 20 pts
//   Growth              (revenue YoY + EPS YoY)                  max 25 pts
//   Financial Health    (debt-to-equity + current ratio)         max 20 pts
//   Momentum            (position in 52-week range)              max 10 pts
//   Income              (dividend yield)                          max  5 pts
//                                                                ─────────
//                                                                    100 pts
//
// Growth and liquidity are pulled from Finnhub's basicFinancials.metric object
// (revenueGrowthTTMYoy / epsGrowthTTMYoy / currentRatioQuarterly). Momentum is
// derived from rangePosition (where the price sits between the 52-week high
// and low), replacing the noisier single-day percentChange signal.
// ─────────────────────────────────────────────────────────────────────────────
function calculateAnalysis(quote: any, basicFinancials: any, symbol: string, stockInfo: any) {
  const m = basicFinancials?.metric || {};
  const currentPrice = quote?.c || 0;
  const previousClose = quote?.pc || 0;
  const percentChange = previousClose ? ((currentPrice - previousClose) / previousClose) * 100 : 0;

  // Core metrics
  const peRatio = m.peNormalizedAnnual ?? m.peTTM ?? 20;
  const pbRatio = m.pbQuarterly ?? m.pbAnnual ?? 3;
  const dividendYield = m.dividendYieldIndicatedAnnual ?? 0;
  const roe = m.roeTTM ?? m.roeRfy ?? 15;
  const grossMargin = m.grossMarginTTM ?? m.grossMargin5Y ?? 40;
  const debtEquity = m.totalDebtToTotalEquityQuarterly ?? m.totalDebt2TotalEquityAnnual ?? 0.5;
  const beta = m.beta ?? 1;

  // Growth (Finnhub's YoY growth fields — prefer TTM, fall back to 5Y trend)
  const revenueGrowth =
    m.revenueGrowthTTMYoy ?? m.revenueGrowthQuarterlyYoy ?? m.revenueGrowth5Y ?? 0;
  const epsGrowth =
    m.epsGrowthTTMYoy ?? m.epsGrowthQuarterlyYoy ?? m.epsGrowth5Y ?? 0;

  // Liquidity
  const currentRatio = m.currentRatioQuarterly ?? m.currentRatioAnnual ?? 1.5;

  // 52-week range
  const week52High = m['52WeekHigh'] ?? quote?.h ?? currentPrice;
  const week52Low = m['52WeekLow'] ?? quote?.l ?? currentPrice;
  const rangeSpan = week52High - week52Low;
  const rangePosition = rangeSpan > 0
    ? Math.max(0, Math.min(100, ((currentPrice - week52Low) / rangeSpan) * 100))
    : 50;

  // ─── Factor sub-scores (each normalized 0..maxWeight) ─────────────────────
  // Valuation: reward reasonable P/E, penalize very high or negative earnings.
  let valuationPts = 0;
  if (peRatio <= 0) valuationPts = 4;
  else if (peRatio < 15) valuationPts = 20;
  else if (peRatio < 25) valuationPts = 16;
  else if (peRatio < 40) valuationPts = 10;
  else if (peRatio < 60) valuationPts = 5;
  else valuationPts = 0;

  // Profitability: blend of ROE and gross margin.
  const roePts = Math.max(0, Math.min(12, (roe / 25) * 12));            // up to 12
  const marginPts = Math.max(0, Math.min(8, (grossMargin / 60) * 8));   // up to 8
  const profitabilityPts = roePts + marginPts;

  // Growth: revenue YoY + EPS YoY. Growth values are in percent.
  const revGrowthPts = Math.max(-6, Math.min(13, (revenueGrowth / 20) * 13));
  const epsGrowthPts = Math.max(-6, Math.min(12, (epsGrowth / 25) * 12));
  const growthPts = Math.max(0, revGrowthPts + epsGrowthPts); // clamp floor at 0

  // Financial Health: leverage + short-term liquidity.
  //   Leverage: 12 pts at D/E<=0.3, down to 0 at D/E>=2.5
  //   Liquidity: 8 pts if currentRatio>=2, 0 pts if <1
  const leveragePts = Math.max(0, Math.min(12, 12 - ((debtEquity - 0.3) / 2.2) * 12));
  const liquidityPts = Math.max(0, Math.min(8, ((currentRatio - 1) / 1) * 8));
  const financialHealthPts = leveragePts + liquidityPts;

  // Momentum: position in 52-week range (0-100) scaled to 0-10 pts.
  const momentumPts = (rangePosition / 100) * 10;

  // Income: dividend yield, capped.
  const incomePts = Math.max(0, Math.min(5, (dividendYield / 4) * 5));

  const investibilityScoreRaw =
    valuationPts + profitabilityPts + growthPts + financialHealthPts + momentumPts + incomePts;
  const investibilityScore = Math.max(5, Math.min(98, Math.round(investibilityScoreRaw)));

  // ─── Risk score (unchanged in structure) ──────────────────────────────────
  let riskScore = 50;
  if (beta > 1.5) riskScore += 20;
  else if (beta > 1.2) riskScore += 10;
  else if (beta < 0.8) riskScore -= 10;
  if (debtEquity > 2) riskScore += 15;
  else if (debtEquity > 1) riskScore += 5;
  else if (debtEquity < 0.5) riskScore -= 10;
  if (currentRatio < 1) riskScore += 10;
  else if (currentRatio > 2) riskScore -= 5;
  if (peRatio > 50) riskScore += 15;
  else if (peRatio > 30) riskScore += 5;
  if (revenueGrowth < 0) riskScore += 10;
  riskScore = Math.max(15, Math.min(85, riskScore));

  // ─── Strengths / weaknesses / suggestions ─────────────────────────────────
  const strengths = [];
  if (grossMargin > 40) strengths.push({ text: `Strong gross margin of ${grossMargin.toFixed(1)}% indicates pricing power`, impact: 'critical' });
  if (roe > 20) strengths.push({ text: `High return on equity at ${roe.toFixed(1)}% shows efficient capital use`, impact: 'high' });
  if (revenueGrowth > 10) strengths.push({ text: `Revenue growing ${revenueGrowth.toFixed(1)}% YoY signals expanding business`, impact: 'critical' });
  if (epsGrowth > 15) strengths.push({ text: `EPS up ${epsGrowth.toFixed(1)}% YoY reflects rising profitability`, impact: 'high' });
  if (currentRatio > 1.5) strengths.push({ text: `Current ratio of ${currentRatio.toFixed(2)} indicates healthy short-term liquidity`, impact: 'medium' });
  if (dividendYield > 2) strengths.push({ text: `Attractive dividend yield of ${dividendYield.toFixed(2)}% for income investors`, impact: 'medium' });
  if (peRatio > 0 && peRatio < 20) strengths.push({ text: `Reasonable P/E ratio of ${peRatio.toFixed(1)}x suggests fair valuation`, impact: 'high' });
  if (strengths.length < 3) strengths.push({ text: `Established market position in ${stockInfo.industry} sector`, impact: 'high' });

  const weaknesses = [];
  if (peRatio > 40) weaknesses.push({ text: `Elevated P/E ratio of ${peRatio.toFixed(1)}x may indicate overvaluation`, impact: 'high' });
  if (debtEquity > 1.5) weaknesses.push({ text: `High debt-to-equity ratio of ${debtEquity.toFixed(2)} creates leverage risk`, impact: 'critical' });
  if (currentRatio < 1) weaknesses.push({ text: `Current ratio of ${currentRatio.toFixed(2)} is below 1 — short-term liquidity concern`, impact: 'critical' });
  if (revenueGrowth < 0) weaknesses.push({ text: `Revenue shrinking ${Math.abs(revenueGrowth).toFixed(1)}% YoY — top line under pressure`, impact: 'critical' });
  if (epsGrowth < 0) weaknesses.push({ text: `EPS down ${Math.abs(epsGrowth).toFixed(1)}% YoY — profitability weakening`, impact: 'high' });
  if (beta > 1.3) weaknesses.push({ text: `High beta of ${beta.toFixed(2)} indicates above-average volatility`, impact: 'medium' });
  if (roe < 10) weaknesses.push({ text: `Low ROE of ${roe.toFixed(1)}% suggests inefficient capital deployment`, impact: 'high' });
  if (weaknesses.length < 3) {
    weaknesses.push({ text: `Market conditions and sector rotation could impact performance`, impact: 'medium' });
    weaknesses.push({ text: `Macroeconomic headwinds may affect near-term growth`, impact: 'low' });
  }

  const suggestions = [];
  if (peRatio > 30) suggestions.push({ title: 'Monitor Valuation', description: 'Watch for potential valuation compression if growth slows.', priority: 'high' });
  if (debtEquity > 1) suggestions.push({ title: 'Track Debt Levels', description: 'Monitor debt reduction efforts and interest coverage ratios.', priority: 'medium' });
  if (currentRatio < 1.2) suggestions.push({ title: 'Watch Liquidity', description: 'Follow working-capital trends and near-term cash needs.', priority: 'high' });
  suggestions.push({ title: 'Diversification', description: 'Consider position sizing relative to portfolio concentration.', priority: 'medium' });
  suggestions.push({ title: 'Earnings Watch', description: 'Monitor upcoming earnings reports for guidance updates.', priority: 'high' });
  if (dividendYield > 0) suggestions.push({ title: 'Dividend Sustainability', description: 'Verify payout ratio supports continued dividend growth.', priority: 'low' });

  // Growth expectation based on actual reported growth, with sector fallback.
  let growthExpected: string;
  if (Number.isFinite(revenueGrowth) && Math.abs(revenueGrowth) > 0.1) {
    growthExpected = `${revenueGrowth.toFixed(1)}% YoY`;
  } else if (stockInfo.industry.includes('Technology') || stockInfo.industry.includes('Semiconductors')) {
    growthExpected = peRatio > 30 ? '15% YoY' : '10% YoY';
  } else if (stockInfo.industry.includes('Healthcare') || stockInfo.industry.includes('Pharmaceuticals')) {
    growthExpected = '8% YoY';
  } else if (stockInfo.industry.includes('Banking') || stockInfo.industry.includes('Financial')) {
    growthExpected = '6% YoY';
  } else if (stockInfo.industry.includes('Energy')) {
    growthExpected = '3% YoY';
  } else {
    growthExpected = '5% YoY';
  }

  // ─── Radar categories ─────────────────────────────────────────────────────
  const valuationScore = peRatio > 0
    ? Math.max(10, Math.min(95, 100 - (peRatio - 10) * 1.8))
    : 30;
  const profitabilityScore = Math.max(10, Math.min(95, (roe * 2 + grossMargin) / 3));
  // Financial Health now blends leverage AND liquidity to match the new formula.
  const financialHealthScore = Math.max(
    10,
    Math.min(95, 60 - debtEquity * 20 + Math.min(35, currentRatio * 15))
  );
  const growthScore = Math.max(10, Math.min(95, 50 + revenueGrowth * 1.5 + epsGrowth * 0.8));
  const momentumScore = Math.round(rangePosition);
  const incomeStabilityScore = Math.max(10, Math.min(95, 50 + dividendYield * 8 - Math.abs(beta - 1) * 15));

  const categories = [
    {
      name: 'Valuation',
      value: Math.round(valuationScore),
      description: peRatio > 0 ? `Trading at ${peRatio.toFixed(1)}x earnings` : 'No positive P/E (unprofitable on a trailing basis)',
    },
    {
      name: 'Profitability',
      value: Math.round(profitabilityScore),
      description: `ROE of ${roe.toFixed(1)}%, gross margin of ${grossMargin.toFixed(1)}%`,
    },
    {
      name: 'Growth',
      value: Math.round(growthScore),
      description: `Revenue ${revenueGrowth >= 0 ? '+' : ''}${revenueGrowth.toFixed(1)}% YoY, EPS ${epsGrowth >= 0 ? '+' : ''}${epsGrowth.toFixed(1)}% YoY`,
    },
    {
      name: 'Financial Health',
      value: Math.round(financialHealthScore),
      description: `Debt/equity ${debtEquity.toFixed(2)}, current ratio ${currentRatio.toFixed(2)}`,
    },
    {
      name: 'Momentum',
      value: momentumScore,
      description: `At ${rangePosition.toFixed(0)}% of its 52-week range (low → high)`,
    },
    {
      name: 'Income Stability',
      value: Math.round(incomeStabilityScore),
      description: `${dividendYield.toFixed(2)}% dividend yield, beta of ${beta.toFixed(2)}`,
    },
  ];

  const volatilityRisk = currentPrice > 0
    ? Math.max(10, Math.min(90, (rangeSpan / currentPrice) * 100))
    : 40;

  const riskFactors = [
    { name: 'Market Risk', score: Math.round(30 + beta * 20), description: `Market volatility exposure with beta of ${beta.toFixed(2)}` },
    { name: 'Financial Risk', score: Math.round(30 + debtEquity * 20), description: `Balance sheet risk: D/E ${debtEquity.toFixed(2)}, current ratio ${currentRatio.toFixed(2)}` },
    { name: 'Valuation Risk', score: Math.round(20 + Math.min(peRatio, 50)), description: `Valuation at ${peRatio.toFixed(1)}x earnings` },
    { name: 'Volatility Risk', score: Math.round(volatilityRisk), description: `52-week range spans ${((rangeSpan / (currentPrice || 1)) * 100).toFixed(0)}% of current price` },
    { name: 'Growth Risk', score: Math.round(Math.max(10, Math.min(90, 50 - revenueGrowth * 1.5))), description: `Revenue trend ${revenueGrowth >= 0 ? '+' : ''}${revenueGrowth.toFixed(1)}% YoY` },
  ];

  return {
    investibilityScore,
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
      revenueGrowthYoy: Number(revenueGrowth).toFixed(2),
      epsGrowthYoy: Number(epsGrowth).toFixed(2),
      currentRatio: Number(currentRatio).toFixed(2),
      scoreBreakdown: {
        valuation: Math.round(valuationPts),
        profitability: Math.round(profitabilityPts),
        growth: Math.round(growthPts),
        financialHealth: Math.round(financialHealthPts),
        momentum: Math.round(momentumPts),
        income: Math.round(incomePts),
      },
    },
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

    // Two legitimate callers:
    //  1) A logged-in user clicking "Refresh" -> valid Supabase JWT.
    //  2) The daily pg_cron job -> no user session, authenticates with the
    //     shared CRON_SECRET passed in the x-cron-secret header.
    const cronSecret = Deno.env.get('CRON_SECRET');
    const providedCronSecret = req.headers.get('x-cron-secret');
    const isScheduledRun = !!cronSecret && providedCronSecret === cronSecret;

    if (isScheduledRun) {
      console.log('Authenticated as scheduled job (cron secret)');
    } else {
      const authHeader = req.headers.get('Authorization');
      if (!authHeader?.startsWith('Bearer ')) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized - Missing or invalid authorization header' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

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

      console.log('Authenticated user:', claimsData.claims.sub);
    }

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
    // Also acts as the source of truth for symbols added on-demand via search-stock.
    const { data: previousRows } = await supabase
      .from('stock_analyses')
      .select('symbol, company_name, industry, overall_risk, market_data');
    const previousBySymbol = new Map(
      (previousRows || []).map((row: any) => [row.symbol, row])
    );

    // Merge the hardcoded TOP_STOCKS list with every symbol currently present
    // in stock_analyses (which grows as users search for new tickers). Dedupe
    // by symbol; TOP_STOCKS entries win for name/industry metadata.
    const stockMap = new Map<string, { symbol: string; name: string; industry: string }>();
    for (const s of TOP_STOCKS) stockMap.set(s.symbol, s);
    for (const row of previousRows || []) {
      if (!stockMap.has(row.symbol)) {
        stockMap.set(row.symbol, {
          symbol: row.symbol,
          name: row.company_name || row.symbol,
          industry: row.industry || 'General',
        });
      }
    }
    const allStocks = Array.from(stockMap.values());

    // A risk score swing of this size or more (0-100 scale) gets logged as a
    // public, dated call in risk_calls. Smaller day-to-day noise is ignored.
    const RISK_CALL_THRESHOLD = 15;
    const GRADE_WINDOW_DAYS = 90;

    const updates = [];
    const riskCalls = [];
    const historyRows = [];
    let successCount = 0;
    let errorCount = 0;

    // Batching: each stock takes ~2 API calls × 1.1s ≈ 2.2s of throttled fetch
    // time. Edge functions have a wall-time budget of ~150s; keep each batch
    // comfortably under that at ~30 stocks (~66s of Finnhub time + overhead).
    // The scheduler calls ?batch=1 and ?batch=2 today — if the combined list
    // outgrows what 2 batches can safely cover, automatically compute more
    // batches (still evenly split) so no single run risks timing out.
    const MAX_STOCKS_PER_BATCH = 30;
    const url = new URL(req.url);
    const batchParam = url.searchParams.get('batch');
    let stocksToProcess = allStocks;
    let totalBatches = 1;

    if (batchParam) {
      const batchNum = parseInt(batchParam, 10);
      totalBatches = Math.max(2, Math.ceil(allStocks.length / MAX_STOCKS_PER_BATCH));
      if (!Number.isFinite(batchNum) || batchNum < 1 || batchNum > totalBatches) {
        return new Response(
          JSON.stringify({
            error: `Invalid batch ${batchParam}. Valid range: 1..${totalBatches}`,
            totalBatches,
          }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const perBatch = Math.ceil(allStocks.length / totalBatches);
      const start = (batchNum - 1) * perBatch;
      stocksToProcess = allStocks.slice(start, start + perBatch);
      console.log(
        `Processing batch ${batchNum}/${totalBatches}: ${stocksToProcess.length} of ${allStocks.length} stocks`
      );
    } else {
      console.log(`Processing all ${allStocks.length} stocks (no batch param)`);
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

          // Snapshot today's scores + price into the historical ledger so we
          // can render a line chart per stock over time. One row per stock per run.
          historyRows.push({
            symbol: stock.symbol,
            overall_risk: analysis.overallRisk,
            investibility_score: analysis.investibilityScore,
            price: quote.c,
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

    // Append today's score snapshot to the historical ledger
    if (historyRows.length > 0) {
      const { error: historyError } = await supabase
        .from('stock_score_history')
        .insert(historyRows);

      if (historyError) {
        console.error('Error inserting score history:', historyError);
      } else {
        console.log(`Recorded ${historyRows.length} score history rows.`);
      }
    }

    console.log(`Update complete. Success: ${successCount}, Errors: ${errorCount}`);

    return new Response(
      JSON.stringify({
        success: true,
        batch: batchParam ?? 'all',
        totalBatches,
        processed: stocksToProcess.length,
        totalTracked: allStocks.length,
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
