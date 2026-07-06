import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRiskCalls, getRiskCallStats } from "@/utils/riskCalls";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, CheckCircle2, XCircle, MinusCircle, Clock } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { CompanyLogo } from "@/components/CompanyLogo";

const OUTCOME_CONFIG = {
  correct: { label: "Correct", icon: CheckCircle2, className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" },
  incorrect: { label: "Missed", icon: XCircle, className: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400 border-red-200 dark:border-red-800" },
  inconclusive: { label: "Inconclusive", icon: MinusCircle, className: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700" },
  pending: { label: "Pending", icon: Clock, className: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400 border-amber-200 dark:border-amber-800" },
};

const SignalDeck = () => {
  const [tab, setTab] = useState<"all" | "pending" | "graded">("all");

  const { data: calls, isLoading } = useQuery({
    queryKey: ["risk-calls"],
    queryFn: () => getRiskCalls(150),
    staleTime: 5 * 60 * 1000,
  });

  const stats = calls ? getRiskCallStats(calls) : null;

  const filtered = (calls || []).filter((c) => {
    if (tab === "pending") return !c.graded;
    if (tab === "graded") return c.graded;
    return true;
  });

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          The Signal Deck
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-tight">
          Every call. Timestamped.
          <br />
          <span className="italic font-light text-muted-foreground">Never edited.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base md:text-lg font-light leading-relaxed text-muted-foreground">
          Whenever our model's risk score for a stock swings by 15+ points, it's logged here —
          before we know what happens next. 90 days later, each call is graded against what the
          price actually did. Right or wrong, nothing gets removed.
        </p>

        {/* Track record */}
        {stats && (
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-4">
            <div className="bg-card p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Hit Rate</p>
              <p className="mt-2 text-3xl font-light tracking-tight">
                {stats.hitRate !== null ? `${stats.hitRate}%` : "—"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">of graded, decisive calls</p>
            </div>
            <div className="bg-card p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Graded</p>
              <p className="mt-2 text-3xl font-light tracking-tight">{stats.gradedCalls}</p>
              <p className="mt-1 text-xs text-muted-foreground">calls closed out</p>
            </div>
            <div className="bg-card p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Pending</p>
              <p className="mt-2 text-3xl font-light tracking-tight">{stats.pendingCalls}</p>
              <p className="mt-1 text-xs text-muted-foreground">awaiting their 90-day grade</p>
            </div>
            <div className="bg-card p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Total Calls</p>
              <p className="mt-2 text-3xl font-light tracking-tight">{stats.totalCalls}</p>
              <p className="mt-1 text-xs text-muted-foreground">since launch</p>
            </div>
          </div>
        )}

        <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)} className="mt-16">
          <TabsList>
            <TabsTrigger value="all">All Calls</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="graded">Graded</TabsTrigger>
          </TabsList>

          <TabsContent value={tab} className="mt-8">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-28 w-full rounded-2xl" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center text-muted-foreground">
                  No calls in this category yet. Check back after the next daily update.
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filtered.map((call) => {
                  const outcomeKey = call.graded ? (call.outcome || "inconclusive") : "pending";
                  const outcome = OUTCOME_CONFIG[outcomeKey];
                  const OutcomeIcon = outcome.icon;
                  const DirectionIcon = call.direction === "risk_up" ? TrendingUp : TrendingDown;

                  return (
                    <Card key={call.id} className="overflow-hidden">
                      <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-4">
                          <CompanyLogo symbol={call.symbol} companyName={call.companyName} size="md" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{call.companyName}</span>
                              <Badge variant="outline" className="text-xs">{call.symbol}</Badge>
                            </div>
                            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                              <DirectionIcon className={`h-3.5 w-3.5 ${call.direction === "risk_up" ? "text-red-500" : "text-emerald-500"}`} />
                              Risk {call.direction === "risk_up" ? "up" : "down"} {call.previousScore} → {call.newScore}
                            </p>
                            <p className="mt-2 max-w-xl text-sm text-muted-foreground">{call.reasoning}</p>
                            <p className="mt-2 text-xs text-muted-foreground">
                              Called {formatDistanceToNow(new Date(call.calledAt), { addSuffix: true })}
                              {call.graded && call.gradedAt && (
                                <> · Graded {format(new Date(call.gradedAt), "MMM d, yyyy")}</>
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col items-start gap-2 sm:items-end">
                          <Badge className={`gap-1.5 border ${outcome.className}`}>
                            <OutcomeIcon className="h-3.5 w-3.5" />
                            {outcome.label}
                          </Badge>
                          {call.graded && call.priceChangePct !== null && (
                            <span className={`text-sm font-medium ${call.priceChangePct >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                              {call.priceChangePct >= 0 ? "+" : ""}{call.priceChangePct}% since call
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <p className="mt-16 text-xs leading-relaxed text-muted-foreground">
          Educational and informational only — not investment advice. Risk-score calls are generated
          automatically from public market data and reflect a model's assessment of changing risk, not
          a prediction of future price movement.
        </p>
      </div>
    </div>
  );
};

export default SignalDeck;
