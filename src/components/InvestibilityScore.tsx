
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface InvestibilityScoreProps {
  score: number;
  className?: string;
}

const InvestibilityScore = ({ score, className }: InvestibilityScoreProps) => {
  const [currentScore, setCurrentScore] = useState(0);
  
  // Determine color based on score
  const getColor = () => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-blue-500";
    if (score >= 40) return "text-yellow-500";
    if (score >= 20) return "text-orange-500";
    return "text-red-500";
  };
  
  // Determine background color for meter
  const getBgColor = () => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-blue-500";
    if (score >= 40) return "bg-yellow-500";
    if (score >= 20) return "bg-orange-500";
    return "bg-red-500";
  };
  
  // Animate score counting up
  useEffect(() => {
    if (currentScore < score) {
      const timer = setTimeout(() => {
        setCurrentScore((prev) => Math.min(prev + 1, score));
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [currentScore, score]);

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative w-48 h-48 mb-4">
        {/* Gray background circle */}
        <div className="absolute inset-0 rounded-full bg-slate-100 dark:bg-slate-800"></div>
        
        {/* Colored progress circle */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-slate-200 dark:text-slate-700 stroke-current"
            strokeWidth="10"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
          <circle
            className={`${getBgColor()} stroke-current transition-all duration-1000 ease-out`}
            strokeWidth="10"
            strokeLinecap="round"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
            strokeDasharray={`${(currentScore / 100) * 251.2} 251.2`}
            transform="rotate(-90 50 50)"
          />
        </svg>
        
        {/* Score display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${getColor()} transition-colors`}>
            {currentScore}
          </span>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            out of 100
          </span>
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-xl font-medium mb-1">Investibility Score</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {score >= 80
            ? "Excellent investment opportunity"
            : score >= 60
            ? "Strong potential with some risks"
            : score >= 40
            ? "Moderate potential with significant risks"
            : score >= 20
            ? "High risk investment"
            : "Not recommended for investment"}
        </p>
      </div>
    </div>
  );
};

export default InvestibilityScore;
