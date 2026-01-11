import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Scale, TrendingDown, TrendingUp, AlertTriangle, GripHorizontal } from "lucide-react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

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
  const [isDragging, setIsDragging] = useState<'risk' | 'reward' | null>(null);
  
  // Animated values for smooth transitions
  const animatedRisk = useMotionValue(0);
  const animatedReward = useMotionValue(0);
  
  useEffect(() => {
    animate(animatedRisk, risk, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
  }, [risk, animatedRisk]);
  
  useEffect(() => {
    animate(animatedReward, reward, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
  }, [reward, animatedReward]);

  // Calculate the ratio
  const ratio = reward / (risk || 1);
  
  const getRatingInfo = () => {
    if (ratio >= 2.5) return { 
      label: "Excellent", 
      description: "Very high reward compared to risk",
      color: "text-green-500", 
      bg: "bg-green-100 dark:bg-green-900/30",
      gradient: "from-green-500 to-emerald-500",
      icon: TrendingUp 
    };
    if (ratio >= 1.75) return { 
      label: "Good", 
      description: "Good reward compared to risk",
      color: "text-emerald-500", 
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      gradient: "from-emerald-500 to-teal-500",
      icon: TrendingUp 
    };
    if (ratio >= 1.25) return { 
      label: "Fair", 
      description: "Acceptable reward for the risk",
      color: "text-yellow-500", 
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      gradient: "from-yellow-500 to-amber-500",
      icon: Scale 
    };
    if (ratio >= 0.75) return { 
      label: "Risky", 
      description: "Risk may outweigh potential reward",
      color: "text-orange-500", 
      bg: "bg-orange-100 dark:bg-orange-900/30",
      gradient: "from-orange-500 to-red-500",
      icon: AlertTriangle 
    };
    return { 
      label: "Poor", 
      description: "Risk significantly outweighs potential reward",
      color: "text-red-500", 
      bg: "bg-red-100 dark:bg-red-900/30",
      gradient: "from-red-500 to-rose-600",
      icon: TrendingDown 
    };
  };
  
  const ratingInfo = getRatingInfo();
  const RatingIcon = ratingInfo.icon;
  
  const meterPosition = Math.min(Math.max(Math.round((ratio / 3) * 100), 0), 100);

  const handleSliderChange = (type: 'risk' | 'reward', value: number) => {
    const clampedValue = Math.max(0, Math.min(100, value));
    if (type === 'risk') {
      setRisk(clampedValue);
      onRiskChange?.(clampedValue);
    } else {
      setReward(clampedValue);
      onRewardChange?.(clampedValue);
    }
  };

  const handleDrag = useCallback((type: 'risk' | 'reward', e: React.MouseEvent | React.TouchEvent, container: HTMLDivElement | null) => {
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    handleSliderChange(type, Math.round(percentage));
  }, []);

  // Circular gauge for the main meter
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (meterPosition / 100) * circumference;

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
              style={{ left: `calc(${meterPosition}% - 4px)` }}
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
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Risk Score</span>
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
            
            <div 
              className={cn(
                "relative h-3 bg-muted rounded-full overflow-hidden",
                interactive && "cursor-pointer"
              )}
              onMouseDown={(e) => {
                if (!interactive) return;
                setIsDragging('risk');
                handleDrag('risk', e, e.currentTarget);
              }}
              onMouseMove={(e) => {
                if (isDragging === 'risk') {
                  handleDrag('risk', e, e.currentTarget);
                }
              }}
              onMouseUp={() => setIsDragging(null)}
              onMouseLeave={() => setIsDragging(null)}
            >
              <motion.div 
                className={cn(
                  "absolute inset-y-0 left-0 rounded-full",
                  risk < 30 ? "bg-green-500" :
                  risk < 50 ? "bg-yellow-500" :
                  risk < 70 ? "bg-orange-500" : "bg-red-500"
                )}
                initial={{ width: 0 }}
                animate={{ width: `${risk}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
              {interactive && (
                <motion.div 
                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing"
                  style={{ left: `calc(${risk}% - 10px)` }}
                  animate={{ left: `calc(${risk}% - 10px)` }}
                  transition={{ duration: 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <GripHorizontal className="h-3 w-3 text-muted-foreground" />
                </motion.div>
              )}
            </div>
            
            <p className="text-xs text-muted-foreground">
              {risk < 30 ? "Low risk level" :
               risk < 50 ? "Moderate risk level" :
               risk < 70 ? "High risk level" : "Very high risk level"}
            </p>
          </div>
          
          {/* Reward Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Potential Reward</span>
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
            
            <div 
              className={cn(
                "relative h-3 bg-muted rounded-full overflow-hidden",
                interactive && "cursor-pointer"
              )}
              onMouseDown={(e) => {
                if (!interactive) return;
                setIsDragging('reward');
                handleDrag('reward', e, e.currentTarget);
              }}
              onMouseMove={(e) => {
                if (isDragging === 'reward') {
                  handleDrag('reward', e, e.currentTarget);
                }
              }}
              onMouseUp={() => setIsDragging(null)}
              onMouseLeave={() => setIsDragging(null)}
            >
              <motion.div 
                className={cn(
                  "absolute inset-y-0 left-0 rounded-full",
                  reward > 70 ? "bg-green-500" :
                  reward > 50 ? "bg-emerald-500" :
                  reward > 30 ? "bg-yellow-500" : "bg-red-500"
                )}
                initial={{ width: 0 }}
                animate={{ width: `${reward}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
              {interactive && (
                <motion.div 
                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing"
                  style={{ left: `calc(${reward}% - 10px)` }}
                  animate={{ left: `calc(${reward}% - 10px)` }}
                  transition={{ duration: 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <GripHorizontal className="h-3 w-3 text-muted-foreground" />
                </motion.div>
              )}
            </div>
            
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
