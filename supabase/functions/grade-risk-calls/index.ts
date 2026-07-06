import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// A move smaller than this is noise, not a validated or invalidated call —
// graded as "inconclusive" rather than forced into correct/incorrect.
const NOISE_BAND_PCT = 3;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const finnhubApiKey = Deno.env.get('FINNHUB_API_KEY');

    if (!finnhubApiKey) {
      throw new Error('FINNHUB_API_KEY not configured');
    }

    // This function is meant to be triggered on a schedule (e.g. daily via
    // Supabase Cron), not by end users directly, so it uses the service role
    // key rather than requiring a user JWT.
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: dueCalls, error: fetchError } = await supabase
      .from('risk_calls')
      .select('*')
      .eq('graded', false)
      .lte('grade_due_at', new Date().toISOString());

    if (fetchError) throw fetchError;

    if (!dueCalls || dueCalls.length === 0) {
      return new Response(
        JSON.stringify({ success: true, graded: 0, message: 'No calls due for grading.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Grading ${dueCalls.length} due call(s)...`);

    let gradedCount = 0;
    const errors: string[] = [];

    for (const call of dueCalls) {
      try {
        const quoteResponse = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${call.symbol}&token=${finnhubApiKey}`
        );
        const quote = await quoteResponse.json();
        const currentPrice = quote?.c;

        if (!currentPrice || !call.price_at_call) {
          errors.push(`${call.symbol}: missing price data, skipped`);
          continue;
        }

        const priceChangePct = ((currentPrice - call.price_at_call) / call.price_at_call) * 100;

        // A "risk_up" call is validated if the price subsequently fell more
        // than the noise band; a "risk_down" call is validated if it rose.
        // Anything inside the noise band is honestly reported as inconclusive
        // rather than stretched into a win or a loss.
        let outcome: 'correct' | 'incorrect' | 'inconclusive';
        if (Math.abs(priceChangePct) < NOISE_BAND_PCT) {
          outcome = 'inconclusive';
        } else if (call.direction === 'risk_up') {
          outcome = priceChangePct < 0 ? 'correct' : 'incorrect';
        } else {
          outcome = priceChangePct > 0 ? 'correct' : 'incorrect';
        }

        const { error: updateError } = await supabase
          .from('risk_calls')
          .update({
            graded: true,
            price_at_grading: currentPrice,
            price_change_pct: Number(priceChangePct.toFixed(2)),
            outcome,
            graded_at: new Date().toISOString(),
          })
          .eq('id', call.id);

        if (updateError) {
          errors.push(`${call.symbol}: ${updateError.message}`);
        } else {
          gradedCount++;
        }

        // Light rate limiting for Finnhub's free tier
        await new Promise((resolve) => setTimeout(resolve, 200));
      } catch (err) {
        errors.push(`${call.symbol}: ${(err as Error).message}`);
      }
    }

    console.log(`Graded ${gradedCount}/${dueCalls.length} call(s).`);

    return new Response(
      JSON.stringify({ success: true, graded: gradedCount, total: dueCalls.length, errors }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in grade-risk-calls:', error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
