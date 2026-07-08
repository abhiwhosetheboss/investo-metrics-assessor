import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, CheckCircle2, XCircle, MinusCircle, Clock } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

interface Props {
  symbol: string;
}

const OUTCOME_CONFIG = {
  correct: { label: "Correct", icon: CheckCircle2, className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" },
  incorrect: { label: "Missed", icon: XCircle, className: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400 border-red-200 dark:border-red-800" },
  inconclusive: { label: "Inconclusive", icon: MinusCircle, className: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700" },
  pending: { label: "Pending", icon: Clock, className: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400 border-amber-200 dark:border-amber-800" },
} as const;

export default function StockHistorySection({ symbol }: Props) {
  const sym = symbol.toUpperCase();

  const { data: history, isLoading: historyLoading } = useQuery({
    queryKey: ["score-history", sym],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stock_score_history")
        .select("overall_risk, investibility_score, price, recorded_at")
        .eq("symbol", sym)
        .order("recorded_at", { ascending: true })
        .limit(365);
      if (error) throw error;
      return data || [];
    },
  });

  const { data: calls, isLoading: callsLoading } = useQuery({
    queryKey: ["risk-calls", sym],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("risk_calls")
        .select("*")
        .eq("symbol", sym)
        .order("called_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data || [];
    },
  });

  const chartData = (history || []).map((row) => ({
    date: format(new Date(row.recorded_at), "MMM d"),
    risk: row.overall_risk,
  }));

  return (
    <div className="space-y-8 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Risk Score History</CardTitle>
          <CardDescription>
            How our model's overall risk score for {sym} has moved over time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {historyLoading ? (
            <Skeleton className="h-64 w-full" />
          ) : chartData.length < 2 ? (
            <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
              Not enough history yet — check back after a few daily updates.
            </div>
          ) : (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ReLineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.5rem",
                      fontSize: "0.875rem",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="risk"
                    name="Overall Risk"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                  />
                </ReLineChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Signal Deck — {sym}</CardTitle>
          <CardDescription>
            Every logged risk-score call for this stock. Timestamped, never edited.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {callsLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full rounded-xl" />
              ))}
            </div>
          ) : !calls || calls.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No risk calls have been logged for {sym} yet.
            </p>
          ) : (
            <div className="space-y-4">
              {calls.map((call: any) => {
                const outcomeKey = call.graded ? (call.outcome || "inconclusive") : "pending";
                const outcome = OUTCOME_CONFIG[outcomeKey as keyof typeof OUTCOME_CONFIG];
                const OutcomeIcon = outcome.icon;
                const DirectionIcon = call.direction === "risk_up" ? TrendingUp : TrendingDown;
                return (
                  <div
                    key={call.id}
                    className="flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-start sm:justify-between"
                  >
                    <div className="flex-1">
                      <p className="flex items-center gap-1.5 text-sm font-medium">
                        <DirectionIcon
                          className={`h-3.5 w-3.5 ${call.direction === "risk_up" ? "text-red-500" : "text-emerald-500"}`}
                        />
                        Risk {call.direction === "risk_up" ? "up" : "down"} {call.previous_score} → {call.new_score}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{call.reasoning}</p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Called {formatDistanceToNow(new Date(call.called_at), { addSuffix: true })}
                        {call.graded && call.graded_at && (
                          <> · Graded {format(new Date(call.graded_at), "MMM d, yyyy")}</>
                        )}
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-2 sm:items-end">
                      <Badge className={`gap-1.5 border ${outcome.className}`}>
                        <OutcomeIcon className="h-3.5 w-3.5" />
                        {outcome.label}
                      </Badge>
                      {call.graded && call.price_change_pct !== null && call.price_change_pct !== undefined && (
                        <span
                          className={`text-sm font-medium ${Number(call.price_change_pct) >= 0 ? "text-emerald-600" : "text-red-600"}`}
                        >
                          {Number(call.price_change_pct) >= 0 ? "+" : ""}
                          {call.price_change_pct}% since call
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
