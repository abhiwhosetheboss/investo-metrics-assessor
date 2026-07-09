import { useLiveQuote } from '@/hooks/useLiveQuote';
import { cn } from '@/lib/utils';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface LivePriceProps {
  symbol: string;
  className?: string;
  /** Compact = single-line badge for list rows. Full = larger stacked layout. */
  variant?: 'compact' | 'full';
}

/**
 * Renders a live-updating price + percent change for a given ticker.
 * Polls `get-live-quote` every 20s under the hood.
 */
const LivePrice = ({ symbol, className, variant = 'compact' }: LivePriceProps) => {
  const { quote, loading, error } = useLiveQuote(symbol, 20_000);

  if (error && !quote) {
    return null; // Fail silently — this is a decorative live indicator.
  }

  const price = quote?.price ?? null;
  const pct = quote?.percentChange ?? null;
  const positive = pct !== null && pct >= 0;

  if (price === null) {
    return (
      <span className={cn('text-xs text-muted-foreground animate-pulse', className)}>
        {loading ? 'Loading…' : '—'}
      </span>
    );
  }

  const priceStr = `$${price.toFixed(2)}`;
  const pctStr = pct !== null ? `${positive ? '+' : ''}${pct.toFixed(2)}%` : '';

  if (variant === 'full') {
    return (
      <div className={cn('flex items-baseline gap-3', className)}>
        <span className="text-3xl font-semibold tabular-nums">{priceStr}</span>
        {pct !== null && (
          <span
            className={cn(
              'inline-flex items-center gap-1 text-sm font-medium tabular-nums',
              positive ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'
            )}
          >
            {positive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            {pctStr}
          </span>
        )}
        <span className="text-xs text-muted-foreground">Live</span>
      </div>
    );
  }

  return (
    <span className={cn('inline-flex items-center gap-1.5 text-xs tabular-nums', className)}>
      <span className="font-semibold">{priceStr}</span>
      {pct !== null && (
        <span
          className={cn(
            'inline-flex items-center gap-0.5 font-medium',
            positive ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'
          )}
        >
          {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {pctStr}
        </span>
      )}
    </span>
  );
};

export default LivePrice;
