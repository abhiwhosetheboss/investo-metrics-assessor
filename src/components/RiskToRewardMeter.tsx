import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Scale, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";

interface RiskToRewardMeterProps {
  risk: number;
  reward: number;
  className?: string;
  interactive?: boolean;
  onRiskChange?: (risk: number) => void;
  onRewardChange?: (reward: number) => void;
}

const RiskToRewardMeter = ({ 
  risk: initialRisk, 
  reward: initialReward, 
  className,
  interactive = false,
  onRiskChange,
  onRewardChange 
}: RiskToRewardMeterProps) => {
  const [risk, setRisk] = useState(initialRisk);
  const [reward, setReward] = useState(initialReward);

  useEffect(() => {
    setRisk(initialRisk);
  }, [initialRisk]);

  useEffect(() => {
    setReward(initialReward);
  }, [initialReward]);

  // Calculate the ratio
  const ratio = reward / (risk || 1);
  
  const getRatingInfo = () => {
    if (ratio >= 2.5) return { 
      label: "Excellent", 
      description: "Very high reward compared to risk",
      color: "text-green-500", 
      bg: "bg-green-100 dark:bg-green-900/30",
      icon: TrendingUp 
    };
    if (ratio >= 1.75) return { 
      label: "Good", 
      description: "Good reward compared to risk",
      color: "text-emerald-500", 
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      icon: TrendingUp 
    };
    if (ratio >= 1.25) return { 
      label: "Fair", 
      description: "Acceptable reward for the risk",
      color: "text-yellow-500", 
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      icon: Scale 
    };
    if (ratio >= 0.75) return { 
      label: "Risky", 
      description: "Risk may outweigh potential reward",
      color: "text-orange-500", 
      bg: "bg-orange-100 dark:bg-orange-900/30",
      icon: AlertTriangle 
    };
    return { 
      label: "Poor", 
      description: "Risk significantly outweighs potential reward",
      color: "text-red-500", 
      bg: "bg-red-100 dark:bg-red-900/30",
      icon: TrendingDown 
    };
  };
  
  const ratingInfo = getRatingInfo();
  const RatingIcon = ratingInfo.icon;
  
  const meterPosition = Math.min(Math.max(Math.round((ratio / 3) * 100), 0), 100);

  const handleRiskChange = (value: number[]) => {
    const newRisk = value[0];
    setRisk(newRisk);
    onRiskChange?.(newRisk);
  };

  const handleRewardChange = (value: number[]) => {
    const newReward = value[0];
    setReward(newReward);
    onRewardChange?.(newReward);
  };

  // Circular gauge for the main meter
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (meterPosition / 100) * circumference;

  const getRiskColor = () => {
    if (risk < 30) return "bg-green-500";
    if (risk < 50) return "bg-yellow-500";
    if (risk < 70) return "bg-orange-500";
    return "bg-red-500";
  };

  const getRewardColor = () => {
    if (reward > 70) return "bg-green-500";
    if (reward > 50) return "bg-emerald-500";
    if (reward > 30) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "bg-card border border-border rounded-2xl shadow-xl p-6 backdrop-blur-sm",
        "hover:shadow-2xl transition-shadow duration-500",
        className
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Scale className="h-5 w-5 text-primary" />
          Risk-to-Reward Assessment
        </h3>
        <motion.div 
          key={ratingInfo.label}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={cn("px-4 py-1.5 rounded-full flex items-center gap-2", ratingInfo.bg)}
        >
          <RatingIcon className={cn("h-4 w-4", ratingInfo.color)} />
          <span className={cn("text-sm font-semibold", ratingInfo.color)}>
            {ratingInfo.label} 
          </span>
        </motion.div>
      </div>
      
      <div className="space-y-8">
        {/* Main Circular Gauge */}
        <div className="flex flex-col items-center justify-center py-4">
          <div className="relative">
            <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
              {/* Background track */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-muted/20"
              />
              {/* Gradient definition */}
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(0, 84%, 60%)" />
                  <stop offset="50%" stopColor="hsl(45, 93%, 47%)" />
                  <stop offset="100%" stopColor="hsl(142, 71%, 45%)" />
                </linearGradient>
              </defs>
              {/* Progress arc */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#gaugeGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span 
                key={ratio.toFixed(2)}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-3xl font-bold"
              >
                {ratio.toFixed(2)}
              </motion.span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Ratio</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground text-center mt-4 max-w-xs">
            {ratingInfo.description}
          </p>
        </div>
        
        {/* Linear Gradient Meter */}
        <div className="space-y-2">
          <div className="h-12 bg-muted/30 rounded-2xl relative overflow-hidden shadow-inner">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-60" />
            
            {/* Glass overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
            
            {/* Position indicator */}
            <motion.div 
              className="absolute top-1 bottom-1 w-2 bg-white rounded-full shadow-lg z-10"
              initial={{ left: 0 }}
              animate={{ left: `calc(${meterPosition}% - 4px)` }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-0 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </motion.div>
            
            {/* Labels */}
            <div className="absolute inset-0 flex justify-between items-center px-4 text-xs font-medium">
              <span className="text-white/90 drop-shadow-sm">High Risk</span>
              <span className="text-white/90 drop-shadow-sm">High Reward</span>
            </div>
          </div>
        </div>
        
        {/* Interactive Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Risk Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label htmlFor="risk-slider" className="text-sm font-medium">Risk Score</label>
              <motion.span 
                key={risk}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className={cn(
                  "text-sm font-bold px-2 py-0.5 rounded-md",
                  risk < 30 ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" :
                  risk < 50 ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" :
                  risk < 70 ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" : 
                  "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                )}
              >
                {risk}
              </motion.span>
            </div>
            
            <Slider
              id="risk-slider"
              value={[risk]}
              onValueChange={handleRiskChange}
              max={100}
              min={0}
              step={1}
              disabled={!interactive}
              className={cn(
                "w-full",
                interactive ? "cursor-pointer" : "cursor-default opacity-70"
              )}
              aria-label="Risk score slider"
            />
            
            <p className="text-xs text-muted-foreground">
              {risk < 30 ? "Low risk level" :
               risk < 50 ? "Moderate risk level" :
               risk < 70 ? "High risk level" : "Very high risk level"}
            </p>
          </div>
          
          {/* Reward Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label htmlFor="reward-slider" className="text-sm font-medium">Potential Reward</label>
              <motion.span 
                key={reward}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className={cn(
                  "text-sm font-bold px-2 py-0.5 rounded-md",
                  reward > 70 ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" :
                  reward > 50 ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" :
                  reward > 30 ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" : 
                  "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                )}
              >
                {reward}
              </motion.span>
            </div>
            
            <Slider
              id="reward-slider"
              value={[reward]}
              onValueChange={handleRewardChange}
              max={100}
              min={0}
              step={1}
              disabled={!interactive}
              className={cn(
                "w-full",
                interactive ? "cursor-pointer" : "cursor-default opacity-70"
              )}
              aria-label="Potential reward slider"
            />
            
            <p className="text-xs text-muted-foreground">
              {reward > 70 ? "High potential reward" :
               reward > 50 ? "Moderate potential reward" :
               reward > 30 ? "Low potential reward" : "Very low potential reward"}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RiskToRewardMeter;