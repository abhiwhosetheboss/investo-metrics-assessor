-- Create table for stock analysis data
CREATE TABLE public.stock_analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  symbol TEXT NOT NULL UNIQUE,
  company_name TEXT NOT NULL,
  industry TEXT,
  investibility_score INTEGER NOT NULL DEFAULT 50,
  overall_risk INTEGER NOT NULL DEFAULT 50,
  business_model TEXT DEFAULT 'b2c',
  founder_trust_rating INTEGER DEFAULT 7,
  pmf_score INTEGER DEFAULT 70,
  growth_expected TEXT DEFAULT '5% YoY',
  risk_factors JSONB DEFAULT '[]'::jsonb,
  strengths JSONB DEFAULT '[]'::jsonb,
  weaknesses JSONB DEFAULT '[]'::jsonb,
  suggestions JSONB DEFAULT '[]'::jsonb,
  categories JSONB DEFAULT '[]'::jsonb,
  market_data JSONB DEFAULT '{}'::jsonb,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.stock_analyses ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read stock analyses (public data)
CREATE POLICY "Anyone can view stock analyses"
  ON public.stock_analyses
  FOR SELECT
  USING (true);

-- Create index for faster lookups
CREATE INDEX idx_stock_analyses_symbol ON public.stock_analyses(symbol);
CREATE INDEX idx_stock_analyses_last_updated ON public.stock_analyses(last_updated);

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.stock_analyses;