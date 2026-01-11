import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export function BetaDisclaimer() {
  return (
    <div className="space-y-2 mb-4">
      <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <AlertTriangle className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
        <AlertDescription className="text-xs text-blue-800 dark:text-blue-200">
          Beta Version – Some features may be unavailable
        </AlertDescription>
      </Alert>
      <Alert className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
        <AlertTriangle className="h-4 w-4 mr-2 text-amber-600 dark:text-amber-400" />
        <AlertDescription className="text-xs text-amber-800 dark:text-amber-200">
          Sign in and saved analysis features might not work as expected
        </AlertDescription>
      </Alert>
    </div>
  );
}