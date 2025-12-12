
import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface SuggestionItem {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

interface SuggestionsProps {
  suggestions: SuggestionItem[];
  className?: string;
}

const Suggestions = ({ suggestions, className }: SuggestionsProps) => {
  // Get priority styles
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30";
      case "medium":
        return "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30";
      case "low":
        return "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30";
      default:
        return "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/30";
    }
  };
  
  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "High Priority";
      case "medium":
        return "Medium Priority";
      case "low":
        return "Low Priority";
      default:
        return "Priority";
    }
  };
  
  const getPriorityTextColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 dark:text-red-400";
      case "medium":
        return "text-amber-600 dark:text-amber-400";
      case "low":
        return "text-blue-600 dark:text-blue-400";
      default:
        return "text-slate-600 dark:text-slate-400";
    }
  };

  const safeSuggestions = suggestions || [];

  if (safeSuggestions.length === 0) {
    return (
      <div className={cn("text-center py-8 text-muted-foreground", className)}>
        <p>No improvement suggestions available for this analysis.</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-4">
        {safeSuggestions.map((suggestion, index) => (
          <div 
            key={index}
            className={cn(
              "p-4 rounded-lg border animate-in",
              getPriorityStyles(suggestion.priority)
            )}
            style={{ "--index": index } as React.CSSProperties}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-base">{suggestion.title}</h4>
                  <span 
                    className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full",
                      getPriorityTextColor(suggestion.priority)
                    )}
                  >
                    {getPriorityLabel(suggestion.priority)}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {suggestion.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
