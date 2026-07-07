import { useState } from "react";
import { Building2 } from "lucide-react";

const LOGO_DEV_TOKEN = import.meta.env.VITE_LOVABLE_CONNECTOR_LOGO_DEV_API_KEY as string | undefined;

// Fallback domain map — covers non-listed names (SpaceX, OpenAI) and any symbol
// where the Logo.dev ticker endpoint has no coverage yet.
const domainMap: Record<string, string> = {
  spacex: "spacex.com",
  openai: "openai.com",
  anthropic: "anthropic.com",
  stripe: "stripe.com",
  spx: "spacex.com",
  aapl: "apple.com",
  msft: "microsoft.com",
  nvda: "nvidia.com",
  amzn: "amazon.com",
  googl: "google.com",
  meta: "meta.com",
  tsla: "tesla.com",
  "brk-b": "berkshirehathaway.com",
  jpm: "jpmorganchase.com",
  v: "visa.com",
  ma: "mastercard.com",
  unh: "unitedhealthgroup.com",
  xom: "exxonmobil.com",
  jnj: "jnj.com",
  wmt: "walmart.com",
  dis: "disney.com",
  nflx: "netflix.com",
  amd: "amd.com",
  orcl: "oracle.com",
  crm: "salesforce.com",
  adbe: "adobe.com",
  intc: "intel.com",
  ibm: "ibm.com",
  ko: "coca-cola.com",
  pep: "pepsico.com",
  nke: "nike.com",
  mcd: "mcdonalds.com",
  bac: "bankofamerica.com",
  gs: "goldmansachs.com",
  ms: "morganstanley.com",
  cvx: "chevron.com",
  pfe: "pfizer.com",
  mrk: "merck.com",
  abbv: "abbvie.com",
  avgo: "broadcom.com",
  qcom: "qualcomm.com",
  cost: "costco.com",
  hd: "homedepot.com",
  csco: "cisco.com",
  cat: "caterpillar.com",
  ups: "ups.com",
  spgi: "spglobal.com",
  pg: "pg.com",
  abt: "abbott.com",
  tmo: "thermofisher.com",
  dhr: "danaher.com",
  txn: "ti.com",
  lin: "linde.com",
  wfc: "wellsfargo.com",
  cmcsa: "comcast.com",
  uber: "uber.com",
  abnb: "airbnb.com",
  shop: "shopify.com",
  pltr: "palantir.com",
};

function buildLogoUrl(symbol: string): string | null {
  if (!LOGO_DEV_TOKEN) return null;
  const key = symbol.toLowerCase();
  const domain = domainMap[key];
  if (domain) {
    return `https://img.logo.dev/${domain}?token=${LOGO_DEV_TOKEN}&size=120&format=png`;
  }
  // Fall back to Logo.dev's ticker endpoint for anything not in our domain map.
  return `https://img.logo.dev/ticker/${key.toUpperCase()}?token=${LOGO_DEV_TOKEN}&size=120&format=png`;
}

interface CompanyLogoProps {
  symbol: string;
  companyName: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function CompanyLogo({ symbol, companyName, size = "md", className = "" }: CompanyLogoProps) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    xl: "w-20 h-20",
  };

  const logoUrl = buildLogoUrl(symbol);

  if (!logoUrl) {
    return (
      <div className={`${sizeClasses[size]} rounded-lg bg-muted flex items-center justify-center ${className}`}>
        <Building2 className={size === "sm" ? "w-3 h-3" : size === "md" ? "w-5 h-5" : "w-7 h-7"} />
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} rounded-lg bg-white dark:bg-slate-800 p-1.5 shadow-sm border border-border overflow-hidden flex items-center justify-center ${className}`}>
      {imageError ? (
        <span className="text-xs font-bold text-primary">
          {symbol.slice(0, 2).toUpperCase()}
        </span>
      ) : (
        <img
          src={logoUrl}
          alt={`${companyName} logo`}
          className="w-full h-full object-contain"
          loading="lazy"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
}
