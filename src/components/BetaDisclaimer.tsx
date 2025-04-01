
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export function BetaDisclaimer() {
  return (
    <Alert className="mb-4 bg-blue-50 border-blue-200">
      <AlertTriangle className="h-4 w-4 mr-2" />
      <AlertDescription className="text-xs">
        Beta Version – Some features may be unavailable
      </AlertDescription>
    </Alert>
  );
}
