import { supabase } from "@/integrations/supabase/client";

export interface RiskCall {
  id: string;
  symbol: string;
  companyName: string;
  previousScore: number;
  newScore: number;
  delta: number;
  direction: "risk_up" | "risk_down";
  reasoning: string;
  priceAtCall: number | null;
  calledAt: string;
  gradeDueAt: string;
  graded: boolean;
  priceAtGrading: number | null;
  priceChangePct: number | null;
  outcome: "correct" | "incorrect" | "inconclusive" | null;
  gradedAt: string | null;
}

// The public, ungated call ledger behind the "Signal Deck" feature. This is
// deliberately a straight read of everything in risk_calls — graded or not,
// right or wrong — since the whole point is a track record nothing gets
// quietly edited out of.
export const getRiskCalls = async (limit = 100): Promise<RiskCall[]> => {
  const { data, error } = await supabase
    .from("risk_calls")
    .select("*")
    .order("called_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching risk calls:", error);
    return [];
  }

  return (data || []).map((row: any) => ({
    id: row.id,
    symbol: row.symbol,
    companyName: row.company_name,
    previousScore: row.previous_score,
    newScore: row.new_score,
    delta: row.delta,
    direction: row.direction,
    reasoning: row.reasoning,
    priceAtCall: row.price_at_call,
    calledAt: row.called_at,
    gradeDueAt: row.grade_due_at,
    graded: row.graded,
    priceAtGrading: row.price_at_grading,
    priceChangePct: row.price_change_pct,
    outcome: row.outcome,
    gradedAt: row.graded_at,
  }));
};

// Simple aggregate stats for the ledger's track-record header — computed
// only from calls that have actually been graded, never from pending ones.
export const getRiskCallStats = (calls: RiskCall[]) => {
  const graded = calls.filter((c) => c.graded && c.outcome !== "inconclusive");
  const correct = graded.filter((c) => c.outcome === "correct").length;
  const total = graded.length;
  return {
    totalCalls: calls.length,
    gradedCalls: calls.filter((c) => c.graded).length,
    pendingCalls: calls.filter((c) => !c.graded).length,
    correct,
    incorrect: total - correct,
    hitRate: total > 0 ? Math.round((correct / total) * 100) : null,
  };
};
