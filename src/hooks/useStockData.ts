import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AnalysisResult } from '@/utils/analysisUtils';
import { useToast } from '@/components/ui/use-toast';

interface StockAnalysis {
  id: string;
  symbol: string;
  company_name: string;
  industry: string | null;
  investibility_score: number;
  overall_risk: number;
  business_model: string | null;
  founder_trust_rating: number | null;
  pmf_score: number | null;
  growth_expected: string | null;
  risk_factors: any;
  strengths: any;
  weaknesses: any;
  suggestions: any;
  categories: any;
  market_data: any;
  last_updated: string;
}

// Transform database record to AnalysisResult format
function transformToAnalysisResult(stock: StockAnalysis): AnalysisResult {
  return {
    id: stock.symbol.toLowerCase(),
    startupName: `${stock.company_name} (${stock.symbol})`,
    industry: stock.industry || undefined,
    investibilityScore: stock.investibility_score,
    overallRisk: stock.overall_risk,
    businessModel: stock.business_model || undefined,
    founderTrustRating: stock.founder_trust_rating || undefined,
    pmfScore: stock.pmf_score || undefined,
    growthExpected: stock.growth_expected || undefined,
    riskFactors: stock.risk_factors || [],
    strengths: stock.strengths || [],
    weaknesses: stock.weaknesses || [],
    suggestions: stock.suggestions || [],
    categories: stock.categories || [],
  };
}

export function useStockData() {
  const [stocks, setStocks] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchStocks = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('stock_analyses')
        .select('*')
        .order('investibility_score', { ascending: false });

      if (fetchError) throw fetchError;

      if (data && data.length > 0) {
        const transformed = data.map(transformToAnalysisResult);
        setStocks(transformed);
        
        // Get the most recent update time
        const latestUpdate = data.reduce((latest, stock) => {
          const stockDate = new Date(stock.last_updated);
          return stockDate > latest ? stockDate : latest;
        }, new Date(0));
        setLastUpdated(latestUpdate);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching stocks:', err);
      setError('Failed to fetch stock data');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    try {
      toast({
        title: "Updating stock data...",
        description: "This may take a few minutes to fetch data for all stocks.",
      });

      const { data, error } = await supabase.functions.invoke('update-stock-data');
      
      if (error) throw error;

      toast({
        title: "Update complete",
        description: `Updated ${data.updated} stocks with latest market data.`,
      });

      // Refetch the data
      await fetchStocks();
    } catch (err) {
      console.error('Error refreshing data:', err);
      toast({
        title: "Update failed",
        description: "Failed to refresh stock data. Please try again later.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchStocks();

    // Set up realtime subscription
    const channel = supabase
      .channel('stock-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'stock_analyses',
        },
        (payload) => {
          console.log('Stock update received:', payload);
          fetchStocks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    stocks,
    loading,
    lastUpdated,
    error,
    refreshData,
    refetch: fetchStocks,
  };
}

export function useStockById(symbol: string) {
  const [stock, setStock] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('stock_analyses')
          .select('*')
          .eq('symbol', symbol.toUpperCase())
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (data) {
          setStock(transformToAnalysisResult(data));
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching stock:', err);
        setError('Failed to fetch stock data');
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      fetchStock();
    }
  }, [symbol]);

  return { stock, loading, error };
}
