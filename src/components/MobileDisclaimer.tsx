
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Laptop } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function MobileDisclaimer() {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <Alert variant="warning" className="mb-4 bg-amber-50">
      <Laptop className="h-4 w-4 mr-2" />
      <AlertDescription className="text-xs">
        For the best viewing experience, please use a laptop or PC.
      </AlertDescription>
    </Alert>
  );
}
