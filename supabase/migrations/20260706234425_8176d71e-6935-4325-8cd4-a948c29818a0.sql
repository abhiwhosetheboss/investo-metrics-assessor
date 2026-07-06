CREATE TABLE public.risk_calls (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  symbol TEXT NOT NULL,
  company_name TEXT NOT NULL,
  previous_score INTEGER NOT NULL,
  new_score INTEGER NOT NULL,
  delta INTEGER NOT NULL,
  direction TEXT NOT NULL CHECK (direction IN ('risk_up', 'risk_down')),
  reasoning TEXT NOT NULL,
  price_at_call NUMERIC,
  called_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  grade_due_at TIMESTAMP WITH TIME ZONE NOT NULL,
  graded BOOLEAN NOT NULL DEFAULT false,
  price_at_grading NUMERIC,
  price_change_pct NUMERIC,
  outcome TEXT CHECK (outcome IN ('correct', 'incorrect', 'inconclusive')),
  graded_at TIMESTAMP WITH TIME ZONE
);

GRANT SELECT ON public.risk_calls TO anon, authenticated;
GRANT ALL ON public.risk_calls TO service_role;

ALTER TABLE public.risk_calls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view risk calls"
  ON public.risk_calls
  FOR SELECT
  USING (true);

CREATE INDEX idx_risk_calls_symbol ON public.risk_calls(symbol);
CREATE INDEX idx_risk_calls_called_at ON public.risk_calls(called_at DESC);
CREATE INDEX idx_risk_calls_grading_due ON public.risk_calls(grade_due_at) WHERE graded = false;

ALTER PUBLICATION supabase_realtime ADD TABLE public.risk_calls;