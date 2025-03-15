
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface StrengthWeaknessItem {
  text: string;
  impact: "critical" | "high" | "medium" | "low";
}

interface StrengthsWeaknessesProps {
  strengths: StrengthWeaknessItem[];
  weaknesses: StrengthWeaknessItem[];
  className?: string;
  showStrengths?: boolean;
  showWeaknesses?: boolean;
}

const StrengthsWeaknesses = ({ 
  strengths, 
  weaknesses, 
  className,
  showStrengths = true,
  showWeaknesses = true
}: StrengthsWeaknessesProps) => {
  // Get impact color and weight
  const getImpactStyles = (impact: string, type: "strengths" | "weaknesses") => {
    const baseColors = {
      strengths: {
        critical: "text-green-600 dark:text-green-400 border-green-600 dark:border-green-400 bg-green-50 dark:bg-green-950/30",
        high: "text-emerald-600 dark:text-emerald-400 border-emerald-600 dark:border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30",
        medium: "text-teal-600 dark:text-teal-400 border-teal-600 dark:border-teal-400 bg-teal-50 dark:bg-teal-950/30",
        low: "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/30"
      },
      weaknesses: {
        critical: "text-red-600 dark:text-red-400 border-red-600 dark:border-red-400 bg-red-50 dark:bg-red-950/30",
        high: "text-orange-600 dark:text-orange-400 border-orange-600 dark:border-orange-400 bg-orange-50 dark:bg-orange-950/30",
        medium: "text-amber-600 dark:text-amber-400 border-amber-600 dark:border-amber-400 bg-amber-50 dark:bg-amber-950/30",
        low: "text-yellow-600 dark:text-yellow-400 border-yellow-600 dark:border-yellow-400 bg-yellow-50 dark:bg-yellow-950/30"
      }
    };
    
    return baseColors[type][impact as keyof typeof baseColors.strengths] || "";
  };

  return (
    <div className={cn("space-y-6", className)}>
      {showStrengths && strengths.length > 0 && (
        <div>
          {!showWeaknesses && (
            <h3 className="text-xl font-medium mb-4">Key Strengths</h3>
          )}
          <ul className="space-y-3">
            {strengths.map((strength, index) => (
              <li 
                key={index} 
                className="flex items-start space-x-3 animate-in"
                style={{ "--index": index } as React.CSSProperties}
              >
                <div className={cn(
                  "flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center border",
                  getImpactStyles(strength.impact, "strengths")
                )}>
                  <Check className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-sm">{strength.text}</p>
                  <span className={cn(
                    "inline-block text-xs px-2 py-0.5 rounded-full mt-1 font-medium border",
                    getImpactStyles(strength.impact, "strengths")
                  )}>
                    {strength.impact === "critical" ? "Critical advantage" :
                     strength.impact === "high" ? "Major advantage" :
                     strength.impact === "medium" ? "Moderate advantage" : "Minor advantage"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {showWeaknesses && weaknesses.length > 0 && (
        <div>
          {!showStrengths && (
            <h3 className="text-xl font-medium mb-4">Key Weaknesses</h3>
          )}
          <ul className="space-y-3">
            {weaknesses.map((weakness, index) => (
              <li 
                key={index} 
                className="flex items-start space-x-3 animate-in"
                style={{ "--index": index } as React.CSSProperties}
              >
                <div className={cn(
                  "flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center border",
                  getImpactStyles(weakness.impact, "weaknesses")
                )}>
                  <X className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-sm">{weakness.text}</p>
                  <span className={cn(
                    "inline-block text-xs px-2 py-0.5 rounded-full mt-1 font-medium border",
                    getImpactStyles(weakness.impact, "weaknesses")
                  )}>
                    {weakness.impact === "critical" ? "Critical concern" :
                     weakness.impact === "high" ? "Major concern" :
                     weakness.impact === "medium" ? "Moderate concern" : "Minor concern"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StrengthsWeaknesses;
