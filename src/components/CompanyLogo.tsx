import { useState } from "react";
import { Building2 } from "lucide-react";

// Map of company symbols to their logo URLs (using public CDN logos)
const logoMap: Record<string, string> = {
  aapl: "https://logo.clearbit.com/apple.com",
  msft: "https://logo.clearbit.com/microsoft.com",
  nvda: "https://logo.clearbit.com/nvidia.com",
  amzn: "https://logo.clearbit.com/amazon.com",
  googl: "https://logo.clearbit.com/google.com",
  meta: "https://logo.clearbit.com/meta.com",
  tsla: "https://logo.clearbit.com/tesla.com",
  "brk-b": "https://logo.clearbit.com/berkshirehathaway.com",
  jpm: "https://logo.clearbit.com/jpmorganchase.com",
  v: "https://logo.clearbit.com/visa.com",
  unh: "https://logo.clearbit.com/unitedhealthgroup.com",
  xom: "https://logo.clearbit.com/exxonmobil.com",
  ma: "https://logo.clearbit.com/mastercard.com",
  pg: "https://logo.clearbit.com/pg.com",
  jnj: "https://logo.clearbit.com/jnj.com",
  hd: "https://logo.clearbit.com/homedepot.com",
  cost: "https://logo.clearbit.com/costco.com",
  abbv: "https://logo.clearbit.com/abbvie.com",
  crm: "https://logo.clearbit.com/salesforce.com",
  cvx: "https://logo.clearbit.com/chevron.com",
  bac: "https://logo.clearbit.com/bankofamerica.com",
  ko: "https://logo.clearbit.com/coca-cola.com",
  pep: "https://logo.clearbit.com/pepsico.com",
  wmt: "https://logo.clearbit.com/walmart.com",
  dis: "https://logo.clearbit.com/disney.com",
  csco: "https://logo.clearbit.com/cisco.com",
  adbe: "https://logo.clearbit.com/adobe.com",
  nflx: "https://logo.clearbit.com/netflix.com",
  intc: "https://logo.clearbit.com/intel.com",
  amd: "https://logo.clearbit.com/amd.com",
  orcl: "https://logo.clearbit.com/oracle.com",
  cmcsa: "https://logo.clearbit.com/comcast.com",
  nke: "https://logo.clearbit.com/nike.com",
  mrk: "https://logo.clearbit.com/merck.com",
  pfe: "https://logo.clearbit.com/pfizer.com",
  abt: "https://logo.clearbit.com/abbott.com",
  tmo: "https://logo.clearbit.com/thermofisher.com",
  dhr: "https://logo.clearbit.com/danaher.com",
  txn: "https://logo.clearbit.com/ti.com",
  avgo: "https://logo.clearbit.com/broadcom.com",
  lin: "https://logo.clearbit.com/linde.com",
  qcom: "https://logo.clearbit.com/qualcomm.com",
  wfc: "https://logo.clearbit.com/wellsfargo.com",
  mcd: "https://logo.clearbit.com/mcdonalds.com",
  ups: "https://logo.clearbit.com/ups.com",
  gs: "https://logo.clearbit.com/goldmansachs.com",
  ms: "https://logo.clearbit.com/morganstanley.com",
  spgi: "https://logo.clearbit.com/spglobal.com",
  cat: "https://logo.clearbit.com/caterpillar.com",
  ibm: "https://logo.clearbit.com/ibm.com",
};

interface CompanyLogoProps {
  symbol: string;
  companyName: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function CompanyLogo({ symbol, companyName, size = "md", className = "" }: CompanyLogoProps) {
  const [imageError, setImageError] = useState(false);
  
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  const logoUrl = logoMap[symbol.toLowerCase()];

  if (!logoUrl) {
    return (
      <div className={`${sizeClasses[size]} rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center ${className}`}>
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
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
}
