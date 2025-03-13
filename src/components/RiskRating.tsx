
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, ShieldAlert, ShieldCheck } from "lucide-react";

interface RiskFactor {
  name: string;
  score: number;
  description: string;
}

interface RiskRatingProps {
  overallRisk: number; // 0-100, where 0 is lowest risk, 100 is highest
  factors: RiskFactor[];
  className?: string;
}

const RiskRating = ({ overallRisk, factors, className }: RiskRatingProps) => {
  const [currentRisk, setCurrentRisk] = useState(0);
  
  // Animate risk score counting up
  useEffect(() => {
    if (currentRisk < overallRisk) {
      const timer = setTimeout(() => {
        setCurrentRisk((prev) => Math.min(prev + 1, overallRisk));
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [currentRisk, overallRisk]);
  
  // Risk level categories
  const getRiskLevel = () => {
    if (overallRisk < 20) return { label: "Very Low", color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/20", icon: ShieldCheck };
    if (overallRisk < 40) return { label: "Low", color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/20", icon: ShieldCheck };
    if (overallRisk < 60) return { label: "Moderate", color: "text-yellow-500", bg: "bg-yellow-100 dark:bg-yellow-900/20", icon: AlertTriangle };
    if (overallRisk < 80) return { label: "High", color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/20", icon: ShieldAlert };
    return { label: "Very High", color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/20", icon: ShieldAlert };
  };
  
  const riskLevel = getRiskLevel();
  const RiskIcon = riskLevel.icon;

  return (
    <div className={cn("", className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-medium">Risk Assessment</h3>
        <div className={cn("px-3 py-1 rounded-full flex items-center space-x-1", riskLevel.bg)}>
          <RiskIcon className={cn("h-4 w-4 mr-1", riskLevel.color)} />
          <span className={cn("text-sm font-medium", riskLevel.color)}>
            {riskLevel.label} Risk
          </span>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between mb-1 items-center">
          <span className="text-sm text-slate-500 dark:text-slate-400">Overall Risk Score</span>
          <span className={cn("text-sm font-medium", riskLevel.color)}>
            {currentRisk}/100
          </span>
        </div>
        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full transition-all duration-1000 ease-out rounded-full",
              overallRisk < 20 ? "bg-green-500" :
              overallRisk < 40 ? "bg-emerald-500" :
              overallRisk < 60 ? "bg-yellow-500" :
              overallRisk < 80 ? "bg-orange-500" : "bg-red-500"
            )}
            style={{ width: `${currentRisk}%` }}
          ></div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Risk Factor Breakdown</h4>
        {factors.map((factor, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{factor.name}</span>
              <span 
                className={cn(
                  "text-xs font-medium",
                  factor.score < 20 ? "text-green-500" :
                  factor.score < 40 ? "text-emerald-500" :
                  factor.score < 60 ? "text-yellow-500" :
                  factor.score < 80 ? "text-orange-500" : "text-red-500"
                )}
              >
                {factor.score}/100
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full transition-all duration-1000 ease-out rounded-full",
                  factor.score < 20 ? "bg-green-500" :
                  factor.score < 40 ? "bg-emerald-500" :
                  factor.score < 60 ? "bg-yellow-500" :
                  factor.score < 80 ? "bg-orange-500" : "bg-red-500"
                )}
                style={{ width: `${factor.score}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{factor.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskRating;
