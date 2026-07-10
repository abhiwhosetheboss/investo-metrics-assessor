// Search + on-demand analyze for any US-listed stock.
//   GET  ?q=<query>            → Finnhub symbol search, returns candidates
//   POST { symbol, name?, industry? } → fetches quote + financials, scores,
//        upserts stock_analyses, and returns the analysis row so the caller
//        can immediately navigate to /analysis/<symbol>.
//
// Scoring uses the same 0-100 methodology as update-stock-data (weights:
// Valuation 20 / Profitability 20 / Growth 25 / Financial Health 20 /
// Momentum 10 / Income 5).

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple in-process throttle in case of rapid clicks. Finnhub free tier is
// ~1 req/sec so we keep a 1.1s minimum interval between outbound calls.
let lastCallAt = 0;
async function finnhubFetch(url: string): Promise<Response> {
  const wait = Math.max(0, lastCallAt + 1100 - Date.now());
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastCallAt = Date.now();
  return fetch(url);
}

function calculateAnalysis(quote: any, basicFinancials: any, stockInfo: { symbol: string; name: string; industry: string }) {
  const m = basicFinancials?.metric || {};
  const currentPrice = quote?.c || 0;
  const previousClose = quote?.pc || 0;
  const percentChange = previousClose ? ((currentPrice - previousClose) / previousClose) * 100 : 0;

  const peRatio = m.peNormalizedAnnual ?? m.peTTM ?? 20;
  const dividendYield = m.dividendYieldIndicatedAnnual ?? 0;
  const roe = m.roeTTM ?? m.roeRfy ?? 15;
  const grossMargin = m.grossMarginTTM ?? m.grossMargin5Y ?? 40;
  const debtEquity = m.totalDebtToTotalEquityQuarterly ?? m.totalDebt2TotalEquityAnnual ?? 0.5;
  const beta = m.beta ?? 1;
  const revenueGrowth = m.revenueGrowthTTMYoy ?? m.revenueGrowthQuarterlyYoy ?? m.revenueGrowth5Y ?? 0;
  const epsGrowth = m.epsGrowthTTMYoy ?? m.epsGrowthQuarterlyYoy ?? m.epsGrowth5Y ?? 0;
  const currentRatio = m.currentRatioQuarterly ?? m.currentRatioAnnual ?? 1.5;

  const week52High = m['52WeekHigh'] ?? quote?.h ?? currentPrice;
  const week52Low = m['52WeekLow'] ?? quote?.l ?? currentPrice;
  const rangeSpan = week52High - week52Low;
  const rangePosition = rangeSpan > 0
    ? Math.max(0, Math.min(100, ((currentPrice - week52Low) / rangeSpan) * 100))
    : 50;

  let valuationPts = 0;
  if (peRatio <= 0) valuationPts = 4;
  else if (peRatio < 15) valuationPts = 20;
  else if (peRatio < 25) valuationPts = 16;
  else if (peRatio < 40) valuationPts = 10;
  else if (peRatio < 60) valuationPts = 5;

  const profitabilityPts =
    Math.max(0, Math.min(12, (roe / 25) * 12)) +
    Math.max(0, Math.min(8, (grossMargin / 60) * 8));

  const growthPts = Math.max(
    0,
    Math.max(-6, Math.min(13, (revenueGrowth / 20) * 13)) +
      Math.max(-6, Math.min(12, (epsGrowth / 25) * 12)),
  );

  const financialHealthPts =
    Math.max(0, Math.min(12, 12 - ((debtEquity - 0.3) / 2.2) * 12)) +
    Math.max(0, Math.min(8, ((currentRatio - 1) / 1) * 8));

  const momentumPts = (rangePosition / 100) * 10;
  const incomePts = Math.max(0, Math.min(5, (dividendYield / 4) * 5));

  const investibilityScore = Math.max(
    5,
    Math.min(98, Math.round(valuationPts + profitabilityPts + growthPts + financialHealthPts + momentumPts + incomePts)),
  );

  let riskScore = 50;
  if (beta > 1.5) riskScore += 20; else if (beta > 1.2) riskScore += 10; else if (beta < 0.8) riskScore -= 10;
  if (debtEquity > 2) riskScore += 15; else if (debtEquity > 1) riskScore += 5; else if (debtEquity < 0.5) riskScore -= 10;
  if (currentRatio < 1) riskScore += 10; else if (currentRatio > 2) riskScore -= 5;
  if (peRatio > 50) riskScore += 15; else if (peRatio > 30) riskScore += 5;
  if (revenueGrowth < 0) riskScore += 10;
  riskScore = Math.max(15, Math.min(85, riskScore));

  const strengths: any[] = [];
  if (grossMargin > 40) strengths.push({ text: `Strong gross margin of ${grossMargin.toFixed(1)}% indicates pricing power`, impact: 'critical' });
  if (roe > 20) strengths.push({ text: `High return on equity at ${roe.toFixed(1)}% shows efficient capital use`, impact: 'high' });
  if (revenueGrowth > 10) strengths.push({ text: `Revenue growing ${revenueGrowth.toFixed(1)}% YoY signals expanding business`, impact: 'critical' });
  if (epsGrowth > 15) strengths.push({ text: `EPS up ${epsGrowth.toFixed(1)}% YoY reflects rising profitability`, impact: 'high' });
  if (currentRatio > 1.5) strengths.push({ text: `Current ratio of ${currentRatio.toFixed(2)} indicates healthy short-term liquidity`, impact: 'medium' });
  if (dividendYield > 2) strengths.push({ text: `Attractive dividend yield of ${dividendYield.toFixed(2)}% for income investors`, impact: 'medium' });
  if (peRatio > 0 && peRatio < 20) strengths.push({ text: `Reasonable P/E ratio of ${peRatio.toFixed(1)}x suggests fair valuation`, impact: 'high' });
  if (strengths.length < 3) strengths.push({ text: `Established position in ${stockInfo.industry} sector`, impact: 'medium' });

  const weaknesses: any[] = [];
  if (peRatio > 40) weaknesses.push({ text: `Elevated P/E ratio of ${peRatio.toFixed(1)}x may indicate overvaluation`, impact: 'high' });
  if (debtEquity > 1.5) weaknesses.push({ text: `High debt-to-equity ratio of ${debtEquity.toFixed(2)} creates leverage risk`, impact: 'critical' });
  if (currentRatio < 1) weaknesses.push({ text: `Current ratio of ${currentRatio.toFixed(2)} is below 1 — short-term liquidity concern`, impact: 'critical' });
  if (revenueGrowth < 0) weaknesses.push({ text: `Revenue shrinking ${Math.abs(revenueGrowth).toFixed(1)}% YoY`, impact: 'critical' });
  if (epsGrowth < 0) weaknesses.push({ text: `EPS down ${Math.abs(epsGrowth).toFixed(1)}% YoY — profitability weakening`, impact: 'high' });
  if (beta > 1.3) weaknesses.push({ text: `High beta of ${beta.toFixed(2)} indicates above-average volatility`, impact: 'medium' });
  if (roe < 10) weaknesses.push({ text: `Low ROE of ${roe.toFixed(1)}% suggests inefficient capital deployment`, impact: 'high' });
  if (weaknesses.length < 3) weaknesses.push({ text: `Macroeconomic headwinds may affect near-term growth`, impact: 'low' });

  const suggestions: any[] = [
    { title: 'Diversification', description: 'Consider position sizing relative to portfolio concentration.', priority: 'medium' },
    { title: 'Earnings Watch', description: 'Monitor upcoming earnings reports for guidance updates.', priority: 'high' },
  ];
  if (peRatio > 30) suggestions.push({ title: 'Monitor Valuation', description: 'Watch for potential valuation compression if growth slows.', priority: 'high' });
  if (debtEquity > 1) suggestions.push({ title: 'Track Debt Levels', description: 'Monitor debt reduction efforts and interest coverage.', priority: 'medium' });

  const categories = [
    { name: 'Valuation', value: Math.round(peRatio > 0 ? Math.max(10, Math.min(95, 100 - (peRatio - 10) * 1.8)) : 30), description: peRatio > 0 ? `Trading at ${peRatio.toFixed(1)}x earnings` : 'No positive P/E' },
    { name: 'Profitability', value: Math.round(Math.max(10, Math.min(95, (roe * 2 + grossMargin) / 3))), description: `ROE ${roe.toFixed(1)}%, gross margin ${grossMargin.toFixed(1)}%` },
    { name: 'Growth', value: Math.round(Math.max(10, Math.min(95, 50 + revenueGrowth * 1.5 + epsGrowth * 0.8))), description: `Revenue ${revenueGrowth >= 0 ? '+' : ''}${revenueGrowth.toFixed(1)}% YoY, EPS ${epsGrowth >= 0 ? '+' : ''}${epsGrowth.toFixed(1)}% YoY` },
    { name: 'Financial Health', value: Math.round(Math.max(10, Math.min(95, 60 - debtEquity * 20 + Math.min(35, currentRatio * 15)))), description: `D/E ${debtEquity.toFixed(2)}, current ratio ${currentRatio.toFixed(2)}` },
    { name: 'Momentum', value: Math.round(rangePosition), description: `At ${rangePosition.toFixed(0)}% of its 52-week range` },
    { name: 'Income Stability', value: Math.round(Math.max(10, Math.min(95, 50 + dividendYield * 8 - Math.abs(beta - 1) * 15))), description: `${dividendYield.toFixed(2)}% dividend yield, beta ${beta.toFixed(2)}` },
  ];

  const riskFactors = [
    { name: 'Market Risk', score: Math.round(30 + beta * 20), description: `Beta of ${beta.toFixed(2)}` },
    { name: 'Financial Risk', score: Math.round(30 + debtEquity * 20), description: `D/E ${debtEquity.toFixed(2)}, current ratio ${currentRatio.toFixed(2)}` },
    { name: 'Valuation Risk', score: Math.round(20 + Math.min(peRatio, 50)), description: `${peRatio.toFixed(1)}x earnings` },
    { name: 'Growth Risk', score: Math.round(Math.max(10, Math.min(90, 50 - revenueGrowth * 1.5))), description: `Revenue trend ${revenueGrowth >= 0 ? '+' : ''}${revenueGrowth.toFixed(1)}% YoY` },
  ];

  return {
    investibilityScore,
    overallRisk: Math.round(riskScore),
    founderTrustRating: Math.min(10, Math.round(7 + roe / 10)),
    pmfScore: Math.round(60 + grossMargin / 3),
    growthExpected: Number.isFinite(revenueGrowth) && Math.abs(revenueGrowth) > 0.1 ? `${revenueGrowth.toFixed(1)}% YoY` : '5% YoY',
    strengths, weaknesses, suggestions, categories, riskFactors,
    marketData: {
      currentPrice, previousClose,
      percentChange: percentChange.toFixed(2),
      week52High, week52Low,
      rangePosition: rangePosition.toFixed(1),
      peRatio: peRatio.toFixed(2),
      dividendYield: dividendYield.toFixed(2),
      beta: beta.toFixed(2),
      roe: roe.toFixed(2),
      grossMargin: grossMargin.toFixed(2),
      revenueGrowthYoy: Number(revenueGrowth).toFixed(2),
      epsGrowthYoy: Number(epsGrowth).toFixed(2),
      currentRatio: Number(currentRatio).toFixed(2),
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
      return new Response(JSON.stringify({ error: 'FINNHUB_API_KEY not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // ── GET: symbol search ───────────────────────────────────────────────
    if (req.method === 'GET') {
      const url = new URL(req.url);
      const q = (url.searchParams.get('q') || '').trim();
      if (!q || q.length < 1) {
        return new Response(JSON.stringify({ results: [] }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      const resp = await finnhubFetch(
        `https://finnhub.io/api/v1/search?q=${encodeURIComponent(q)}&exchange=US&token=${finnhubApiKey}`,
      );
      if (!resp.ok) {
        return new Response(JSON.stringify({ error: `Finnhub error ${resp.status}` }),
          { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      const data = await resp.json();

      // Keep common-stock-ish results, drop weird symbols with dots/colons that
      // aren't standard tickers, dedupe by symbol, cap to 12.
      const seen = new Set<string>();
      const results = (data.result || [])
        .filter((r: any) => r?.symbol && !r.symbol.includes(':') && r.type && !r.type.toLowerCase().includes('warrant'))
        .filter((r: any) => {
          const s = r.symbol.toUpperCase();
          if (seen.has(s)) return false;
          seen.add(s);
          return true;
        })
        .slice(0, 12)
        .map((r: any) => ({
          symbol: r.symbol.toUpperCase(),
          description: r.description,
          type: r.type,
        }));

      return new Response(JSON.stringify({ results }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // ── POST: on-demand analyze ──────────────────────────────────────────
    if (req.method === 'POST') {
      const body = await req.json().catch(() => ({}));
      const rawSymbol = String(body.symbol || '').toUpperCase().trim();
      if (!rawSymbol || !/^[A-Z0-9.\-]{1,10}$/.test(rawSymbol)) {
        return new Response(JSON.stringify({ error: 'Invalid symbol' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, serviceKey);

      // Fetch quote + financials + company profile in sequence (throttled).
      const quoteResp = await finnhubFetch(
        `https://finnhub.io/api/v1/quote?symbol=${rawSymbol}&token=${finnhubApiKey}`,
      );
      const quote = await quoteResp.json();

      if (!quote?.c || quote.c === 0) {
        return new Response(JSON.stringify({
          error: 'Symbol not found or no market data available',
          detail: 'Only publicly listed US-market companies are supported. Private companies (e.g. SpaceX, OpenAI) cannot be analyzed.',
        }), { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      const finResp = await finnhubFetch(
        `https://finnhub.io/api/v1/stock/metric?symbol=${rawSymbol}&metric=all&token=${finnhubApiKey}`,
      );
      const basicFinancials = await finResp.json();

      let name: string = body.name || rawSymbol;
      let industry: string = body.industry || 'General';
      try {
        const profileResp = await finnhubFetch(
          `https://finnhub.io/api/v1/stock/profile2?symbol=${rawSymbol}&token=${finnhubApiKey}`,
        );
        const profile = await profileResp.json();
        if (profile?.name) name = profile.name;
        if (profile?.finnhubIndustry) industry = profile.finnhubIndustry;
      } catch (_e) { /* profile is optional */ }

      const stockInfo = { symbol: rawSymbol, name, industry };
      const analysis = calculateAnalysis(quote, basicFinancials, stockInfo);

      const row = {
        symbol: rawSymbol,
        company_name: name,
        industry,
        investibility_score: analysis.investibilityScore,
        overall_risk: analysis.overallRisk,
        business_model: industry.toLowerCase().includes('consumer') || industry.toLowerCase().includes('retail') ? 'b2c' : 'b2b',
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
      };

      const { error: upsertError } = await supabase
        .from('stock_analyses')
        .upsert(row, { onConflict: 'symbol' });
      if (upsertError) {
        console.error('Upsert error:', upsertError);
        return new Response(JSON.stringify({ error: upsertError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      // Append a history snapshot so the per-stock chart has at least one point.
      await supabase.from('stock_score_history').insert({
        symbol: rawSymbol,
        overall_risk: analysis.overallRisk,
        investibility_score: analysis.investibilityScore,
        price: quote.c,
      });

      return new Response(JSON.stringify({ success: true, symbol: rawSymbol, analysis: row }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('search-stock error:', err);
    return new Response(JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
