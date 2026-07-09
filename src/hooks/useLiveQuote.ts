import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface LiveQuote {
  symbol: string;
  price: number | null;
  previousClose: number | null;
  percentChange: number | null;
  timestamp: string;
}

const FUNCTION_URL = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/get-live-quote`;

/**
 * Polls the `get-live-quote` edge function every `intervalMs` (default 20s)
 * while the component is mounted. Pauses when the tab is hidden.
 */
export function useLiveQuote(symbol: string | undefined | null, intervalMs = 20_000) {
  const [quote, setQuote] = useState<LiveQuote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol) return;
    let cancelled = false;

    const anonKey = (supabase as any).supabaseKey as string;

    const fetchOnce = async () => {
      if (document.hidden) return;
      setLoading(true);
      try {
        const resp = await fetch(
          `${FUNCTION_URL}?symbol=${encodeURIComponent(symbol)}`,
          { headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` } }
        );
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const json = (await resp.json()) as LiveQuote;
        if (!cancelled) {
          setQuote(json);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) setError((err as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchOnce();
    const id = window.setInterval(fetchOnce, intervalMs);
    const onVisibility = () => {
      if (!document.hidden) fetchOnce();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelled = true;
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [symbol, intervalMs]);

  return { quote, loading, error };
}
