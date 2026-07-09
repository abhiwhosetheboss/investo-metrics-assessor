import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

// Lightweight live-quote endpoint. Given a stock symbol, returns just the
// current price and percent change from Finnhub's /quote endpoint. No DB
// writes, no analysis — designed to be polled every ~20s from the client.
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const symbolRaw = url.searchParams.get('symbol');
    if (!symbolRaw) {
      return new Response(
        JSON.stringify({ error: 'Missing required query param: symbol' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Basic validation: tickers are 1-6 uppercase letters/dots only.
    const symbol = symbolRaw.trim().toUpperCase();
    if (!/^[A-Z.\-]{1,10}$/.test(symbol)) {
      return new Response(
        JSON.stringify({ error: 'Invalid symbol' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('FINNHUB_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'FINNHUB_API_KEY is not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const resp = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${apiKey}`
    );
    if (!resp.ok) {
      const text = await resp.text();
      return new Response(
        JSON.stringify({ error: `Finnhub error ${resp.status}`, detail: text }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const quote = await resp.json();
    const price = typeof quote.c === 'number' ? quote.c : null;
    const previousClose = typeof quote.pc === 'number' ? quote.pc : null;
    const percentChange =
      price !== null && previousClose && previousClose > 0
        ? ((price - previousClose) / previousClose) * 100
        : null;

    return new Response(
      JSON.stringify({
        symbol,
        price,
        previousClose,
        percentChange,
        timestamp: new Date().toISOString(),
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          // Short cache to soak up bursts if multiple clients ask at once.
          'Cache-Control': 'public, max-age=10',
        },
      }
    );
  } catch (err) {
    console.error('get-live-quote error:', err);
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
