import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, Loader2, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

type Result = { symbol: string; description: string; type: string };

export default function StockSearch() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [searching, setSearching] = useState(false);
  const [analyzing, setAnalyzing] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Debounced search
  useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    const t = setTimeout(async () => {
      setSearching(true);
      try {
        const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
        const base = import.meta.env.VITE_SUPABASE_URL as string;
        const resp = await fetch(
          `${base}/functions/v1/search-stock?q=${encodeURIComponent(q)}`,
          { headers: { apikey: key, Authorization: `Bearer ${key}` } },
        );
        const json = await resp.json();
        if (resp.ok) {
          setResults(json.results || []);
          setOpen(true);
        } else {
          console.error(json);
          setResults([]);
        }
      } catch (e) {
        console.error(e);
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [q]);

  // Close on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleAnalyze = async (r: Result) => {
    setAnalyzing(r.symbol);
    try {
      const { data, error } = await supabase.functions.invoke("search-stock", {
        method: "POST",
        body: { symbol: r.symbol, name: r.description },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      toast({ title: "Analysis ready", description: `${r.symbol} scored and saved.` });
      navigate(`/analysis/${r.symbol}`);
    } catch (e: any) {
      toast({
        title: "Could not analyze",
        description: e?.message?.includes("not found")
          ? "That symbol isn't publicly listed. Only US-market listed stocks are supported (e.g. SpaceX is private)."
          : e?.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(null);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => q && setOpen(true)}
          placeholder="Search any listed stock — try 'AMD', 'Costco', 'Airbnb'…"
          className="pl-10 pr-10 h-11"
        />
        {searching && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {open && (results.length > 0 || (!searching && q.trim())) && (
        <Card className="absolute z-50 mt-2 w-full max-h-96 overflow-auto shadow-xl">
          {results.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground">
              No listed companies match "{q}". Private companies like SpaceX or OpenAI aren't tradable and can't be scored.
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {results.map((r) => (
                <li key={r.symbol}>
                  <button
                    onClick={() => handleAnalyze(r)}
                    disabled={!!analyzing}
                    className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 transition text-left disabled:opacity-50"
                  >
                    <div className="flex-shrink-0 w-14 text-sm font-bold text-primary">{r.symbol}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{r.description}</div>
                      <div className="text-xs text-muted-foreground">{r.type}</div>
                    </div>
                    {analyzing === r.symbol ? (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}
    </div>
  );
}
