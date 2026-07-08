CREATE TABLE public.stock_score_history (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  symbol text NOT NULL,
  overall_risk integer NOT NULL,
  investibility_score integer NOT NULL,
  price numeric,
  recorded_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX stock_score_history_symbol_recorded_at_idx
  ON public.stock_score_history (symbol, recorded_at DESC);

GRANT SELECT ON public.stock_score_history TO anon, authenticated;
GRANT ALL ON public.stock_score_history TO service_role;

ALTER TABLE public.stock_score_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view stock score history"
  ON public.stock_score_history
  FOR SELECT
  USING (true);