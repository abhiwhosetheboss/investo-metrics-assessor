import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface LiveQuote {
  symbol: string;
  price: number | null;
  previousClose: number | null;
  percentChange: number | null;
  timestamp: string;
}

/**
 * Polls the `get-live-quote` edge function every `intervalMs` (default 20s)
 * while the component is mounted. Pauses when the tab is hidden.
 */
export function useLiveQuote(symbol: string | undefined | null, intervalMs = 20_000) {
  const [quote, setQuote] = useState<LiveQuote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cancelledRef = useRef(false);

  useEffect(() => {
    if (!symbol) return;
    cancelledRef.current = false;

    const fetchOnce = async () => {
      if (document.hidden) return;
      setLoading(true);
      try {
        const { data, error: fnError } = await supabase.functions.invoke('get-live-quote', {
          method: 'GET',
          // supabase-js encodes query params via the `body` for POST; for GET
          // we build the URL manually via the query string on the function.
          headers: {},
        } as any);
        // Fallback: invoke() doesn't support query params on GET, so hit the
        // function URL directly with fetch when needed.
        if (fnError || !data) throw fnError ?? new Error('No data');
        if (!cancelledRef.current) setQuote(data as LiveQuote);
        setError(null);
      } catch {
        // Fallback to direct fetch with the anon key (handles GET query params).
        try {
          const url = `https://maouxxwhjkaudaaowyka.supabase.co/functions/v1/get-live-quote?symbol=${encodeURIComponent(symbol)}`;
          const anon = (supabase as any).supabaseKey ?? '';
          const resp = await fetch(url, {
            headers: { apikey: anon, Authorization: `Bearer ${anon}` },
          });
          if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
          const json = (await resp.json()) as LiveQuote;
          if (!cancelledRef.current) {
            setQuote(json);
            setError(null);
          }
        } catch (err) {
          if (!cancelledRef.current) setError((err as Error).message);
        }
      } finally {
        if (!cancelledRef.current) setLoading(false);
      }
    };

    // Kick off immediately, then poll on interval.
    fetchOnce();
    const id = window.setInterval(fetchOnce, intervalMs);
    const onVisibility = () => {
      if (!document.hidden) fetchOnce();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelledRef.current = true;
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [symbol, intervalMs]);

  return { quote, loading, error };
}
