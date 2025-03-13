
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Scale, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";

interface RiskToRewardMeterProps {
  risk: number; // 0-100, where 0 is lowest risk, 100 is highest
  reward: number; // 0-100, where 0 is lowest reward, 100 is highest
  className?: string;
}

const RiskToRewardMeter = ({ risk, reward, className }: RiskToRewardMeterProps) => {
  // Calculate the ratio (higher is better)
  const ratio = reward / (risk || 1); // Prevent division by zero
  
  // Determine the rating based on the ratio
  const getRatingInfo = () => {
    if (ratio >= 2.5) return { 
      label: "Excellent", 
      description: "Very high reward compared to risk",
      color: "text-green-500", 
      bg: "bg-green-100 dark:bg-green-900/20",
      icon: TrendingUp 
    };
    if (ratio >= 1.75) return { 
      label: "Good", 
      description: "Good reward compared to risk",
      color: "text-emerald-500", 
      bg: "bg-emerald-100 dark:bg-emerald-900/20",
      icon: TrendingUp 
    };
    if (ratio >= 1.25) return { 
      label: "Fair", 
      description: "Acceptable reward for the risk",
      color: "text-yellow-500", 
      bg: "bg-yellow-100 dark:bg-yellow-900/20",
      icon: Scale 
    };
    if (ratio >= 0.75) return { 
      label: "Risky", 
      description: "Risk may outweigh potential reward",
      color: "text-orange-500", 
      bg: "bg-orange-100 dark:bg-orange-900/20",
      icon: AlertTriangle 
    };
    return { 
      label: "Poor", 
      description: "Risk significantly outweighs potential reward",
      color: "text-red-500", 
      bg: "bg-red-100 dark:bg-red-900/20",
      icon: TrendingDown 
    };
  };
  
  const ratingInfo = getRatingInfo();
  const RatingIcon = ratingInfo.icon;
  
  // Calculate the visual position on the meter (0-100)
  const meterPosition = Math.min(Math.max(Math.round((ratio / 3) * 100), 0), 100);

  return (
    <div className={cn("bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-6", className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-medium flex items-center gap-2">
          <Scale className="h-5 w-5 text-primary" />
          Risk-to-Reward Assessment
        </h3>
        <div className={cn("px-3 py-1 rounded-full flex items-center space-x-1", ratingInfo.bg)}>
          <RatingIcon className={cn("h-4 w-4 mr-1", ratingInfo.color)} />
          <span className={cn("text-sm font-medium", ratingInfo.color)}>
            {ratingInfo.label} 
          </span>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Risk-Reward Explanation */}
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {ratingInfo.description}. This startup has a risk-to-reward ratio of {ratio.toFixed(2)}.
        </p>
        
        {/* Risk-Reward Meter */}
        <div className="space-y-2">
          <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-full relative overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-50"></div>
            
            {/* Position indicator */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white dark:bg-slate-200 shadow-lg z-10 transition-all duration-1000 ease-out"
              style={{ left: `${meterPosition}%`, transform: 'translateX(-50%)' }}
            ></div>
            
            {/* Labels */}
            <div className="absolute inset-0 flex justify-between items-center px-4 text-xs font-medium">
              <span className="text-white dark:text-slate-200 mix-blend-difference">High Risk / Low Reward</span>
              <span className="text-white dark:text-slate-200 mix-blend-difference">Low Risk / High Reward</span>
            </div>
          </div>
        </div>
        
        {/* Individual metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Risk Score</span>
              <span 
                className={cn(
                  "text-xs font-medium",
                  risk < 20 ? "text-green-500" :
                  risk < 40 ? "text-emerald-500" :
                  risk < 60 ? "text-yellow-500" :
                  risk < 80 ? "text-orange-500" : "text-red-500"
                )}
              >
                {risk}/100
              </span>
            </div>
            <Progress 
              value={risk} 
              className="h-2"
              indicatorClassName={
                risk < 20 ? "bg-green-500" :
                risk < 40 ? "bg-emerald-500" :
                risk < 60 ? "bg-yellow-500" :
                risk < 80 ? "bg-orange-500" : "bg-red-500"
              }
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {risk < 30 ? "Low risk level" :
               risk < 50 ? "Moderate risk level" :
               risk < 70 ? "High risk level" : "Very high risk level"}
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Potential Reward</span>
              <span 
                className={cn(
                  "text-xs font-medium",
                  reward > 80 ? "text-green-500" :
                  reward > 60 ? "text-emerald-500" :
                  reward > 40 ? "text-yellow-500" :
                  reward > 20 ? "text-orange-500" : "text-red-500"
                )}
              >
                {reward}/100
              </span>
            </div>
            <Progress 
              value={reward} 
              className="h-2"
              indicatorClassName={
                reward > 80 ? "bg-green-500" :
                reward > 60 ? "bg-emerald-500" :
                reward > 40 ? "bg-yellow-500" :
                reward > 20 ? "bg-orange-500" : "bg-red-500"
              }
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {reward > 70 ? "High potential reward" :
               reward > 50 ? "Moderate potential reward" :
               reward > 30 ? "Low potential reward" : "Very low potential reward"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskToRewardMeter;
