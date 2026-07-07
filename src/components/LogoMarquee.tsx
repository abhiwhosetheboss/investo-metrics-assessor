import { CompanyLogo } from "@/components/CompanyLogo";

const FEATURED = [
  { symbol: "aapl", name: "Apple" },
  { symbol: "msft", name: "Microsoft" },
  { symbol: "nvda", name: "NVIDIA" },
  { symbol: "googl", name: "Alphabet" },
  { symbol: "amzn", name: "Amazon" },
  { symbol: "meta", name: "Meta" },
  { symbol: "tsla", name: "Tesla" },
  { symbol: "spacex", name: "SpaceX" },
  { symbol: "brk-b", name: "Berkshire" },
  { symbol: "jpm", name: "JPMorgan" },
  { symbol: "v", name: "Visa" },
  { symbol: "ma", name: "Mastercard" },
  { symbol: "nflx", name: "Netflix" },
  { symbol: "orcl", name: "Oracle" },
  { symbol: "adbe", name: "Adobe" },
  { symbol: "crm", name: "Salesforce" },
  { symbol: "amd", name: "AMD" },
  { symbol: "shop", name: "Shopify" },
  { symbol: "uber", name: "Uber" },
  { symbol: "abnb", name: "Airbnb" },
];

export function LogoMarquee() {
  // Duplicate for a seamless loop
  const row = [...FEATURED, ...FEATURED];

  return (
    <section className="border-t border-border/60 py-20 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-10 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Coverage across the names that move the market
        </p>
      </div>

      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="flex w-max gap-10 animate-[marquee_60s_linear_infinite]">
          {row.map((c, i) => (
            <div
              key={`${c.symbol}-${i}`}
              className="flex items-center gap-3 whitespace-nowrap opacity-70 transition-opacity hover:opacity-100"
            >
              <CompanyLogo symbol={c.symbol} companyName={c.name} size="lg" />
              <span className="text-sm font-medium tracking-tight text-foreground/80">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
