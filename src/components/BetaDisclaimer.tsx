import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export function BetaDisclaimer() {
  return (
    <div className="space-y-2 mb-4">
      <Alert className="bg-blue-50 border-blue-200">
        <AlertTriangle className="h-4 w-4 mr-2" />
        <AlertDescription className="text-xs">
          Beta Version – Some features may be unavailable
        </AlertDescription>
      </Alert>
      <Alert className="bg-amber-50 border-amber-200">
        <AlertTriangle className="h-4 w-4 mr-2" />
        <AlertDescription className="text-xs">
          Sign in and saved analysis features might not work as expected
        </AlertDescription>
      </Alert>
    </div>
  );
}
