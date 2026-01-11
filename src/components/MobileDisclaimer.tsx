import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Laptop } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function MobileDisclaimer() {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <Alert className="mb-4 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
      <Laptop className="h-4 w-4 mr-2 text-amber-600 dark:text-amber-400" />
      <AlertDescription className="text-xs text-amber-800 dark:text-amber-200">
        For the best viewing experience, please use a laptop or PC.
      </AlertDescription>
    </Alert>
  );
}