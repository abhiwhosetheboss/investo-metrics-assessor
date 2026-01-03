import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!lovableApiKey) {
      console.error('LOVABLE_API_KEY is not configured');
      throw new Error('AI service is not configured');
    }

    const { startupData, modelId } = await req.json();
    
    console.log('Analyzing startup:', startupData.name, 'with model:', modelId);

    const systemPrompt = `You are an expert startup investment analyst with deep expertise in venture capital, financial analysis, and market evaluation. Analyze the provided startup data and return a comprehensive investment analysis in JSON format.

Your analysis must be data-driven, objective, and actionable for investors. Consider:
- Market opportunity and timing
- Product-market fit indicators
- Financial health and unit economics
- Team capabilities and experience
- Competitive positioning
- Growth potential and scalability
- Risk factors and mitigation strategies

Return ONLY valid JSON with this exact structure:
{
  "investibilityScore": <number 0-100>,
  "overallRisk": <number 0-100>,
  "riskFactors": [{"name": "<string>", "score": <number 0-100>, "description": "<string>"}],
  "strengths": [{"text": "<string>", "impact": "<critical|high|medium|low>"}],
  "weaknesses": [{"text": "<string>", "impact": "<critical|high|medium|low>"}],
  "suggestions": [{"title": "<string>", "description": "<string>", "priority": "<high|medium|low>"}],
  "categories": [{"name": "<string>", "value": <number 0-100>, "description": "<string>"}],
  "founderTrustRating": <number 0-100>,
  "postInvestmentMetrics": {
    "growthRate": "<string e.g. 45%>",
    "valuationIncrease": "<string e.g. 3x>",
    "successProbability": <number 0-100>
  }
}`;

    const userPrompt = `Analyze this startup for investment potential:

Startup Name: ${startupData.name || 'Unnamed Startup'}
Business Model: ${startupData.businessModel}

FINANCIAL METRICS:
- Revenue: ${startupData.revenue || 'Not provided'}
- Valuation: ${startupData.valuation || 'Not provided'}
- Expected Growth: ${startupData.growthExpected || 'Not provided'}
- Margins: ${startupData.margins || 'Not provided'}
- Burn Rate: ${startupData.burnRate || 'Not provided'}
- Marketing Spend: ${startupData.marketingSpend || 'Not provided'}
- EBITDA: ${startupData.ebitda || 'Not provided'}
- Unit Economics: ${startupData.unitEconomics || 'Not provided'}

MARKET & PRODUCT:
- Product-Market Fit Score: ${startupData.pmfScore || 'Not provided'}/100
- Customer Repeat Rate: ${startupData.repeatRate || 'Not provided'}%
- Customer Feedback: ${startupData.customerFeedback || 'Not provided'}
- Social Media Engagement: ${startupData.socialMediaEngagement || 'Not provided'}

TEAM:
- Team Size: ${startupData.teamSize || 'Not provided'}
- Founders Education: ${startupData.foundersEducation || 'Not provided'}
- Founders History: ${startupData.foundersHistory || 'Not provided'}

${startupData.investorThesis ? `
INVESTOR PREFERENCES:
- Investment Thesis: ${startupData.investorThesis.investmentThesis || 'Not provided'}
- Preferred Industries: ${startupData.investorThesis.preferredIndustries?.join(', ') || 'Any'}
- Stage Preference: ${startupData.investorThesis.stagePreference || 'Any'}
- Min Revenue Required: ${startupData.investorThesis.minRevenue || 'None'}
- Max Valuation: ${startupData.investorThesis.maxValuation || 'No limit'}
- Risk Tolerance: ${startupData.investorThesis.riskTolerance || 50}/100
` : ''}

Provide a thorough analysis considering all available data points.`;

    console.log('Calling Lovable AI gateway...');
    
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: 'Rate limit exceeded. Please wait a moment and try again.',
          code: 'RATE_LIMIT'
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ 
          error: 'AI credits exhausted. Please add funds to continue.',
          code: 'PAYMENT_REQUIRED'
        }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Lovable AI response received');
    
    const analysisContent = data.choices[0].message.content;
    
    let analysis;
    try {
      // Extract JSON from response (handle markdown code blocks)
      let jsonStr = analysisContent;
      const jsonMatch = analysisContent.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        jsonStr = jsonMatch[1].trim();
      }
      analysis = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('Failed to parse AI response:', analysisContent);
      throw new Error('Failed to parse AI response');
    }

    // Generate a unique ID for this analysis
    const analysisId = `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const result = {
      id: analysisId,
      startupName: startupData.name || 'Unnamed Startup',
      businessModel: startupData.businessModel,
      pmfScore: startupData.pmfScore,
      growthExpected: startupData.growthExpected,
      investibilityScore: analysis.investibilityScore,
      overallRisk: analysis.overallRisk,
      riskFactors: analysis.riskFactors || [],
      strengths: analysis.strengths || [],
      weaknesses: analysis.weaknesses || [],
      suggestions: analysis.suggestions || [],
      categories: analysis.categories || [
        { name: "Market Potential", value: analysis.investibilityScore * 0.8, description: "Market size and growth opportunity" },
        { name: "Team Strength", value: analysis.founderTrustRating || 70, description: "Team capability and experience" },
        { name: "Financial Health", value: 100 - analysis.overallRisk, description: "Financial stability and unit economics" },
        { name: "Product-Market Fit", value: startupData.pmfScore || 50, description: "Product alignment with market needs" }
      ],
      founderTrustRating: analysis.founderTrustRating,
      postInvestmentMetrics: analysis.postInvestmentMetrics,
      aiModel: {
        name: 'Gemini 2.5 Flash',
        provider: 'Lovable AI'
      },
      createdAt: new Date().toISOString()
    };

    console.log('Analysis complete, returning result');

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-startup function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
