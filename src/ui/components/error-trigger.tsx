// src/shared/components/error-trigger.tsx
import { useState } from "react";
import { Button } from "@/ui/components/ui/button";

export function ErrorTrigger() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("💥 Kaboom! This is a test error.");
  }

  return (
    <div className="my-8 rounded-lg border border-dashed border-red-500 p-4 text-center">
      <h3 className="text-lg font-bold text-red-600 dark:text-red-400">Error Boundary Test</h3>
      <p className="text-muted-foreground my-2 text-sm">
        Click this button to trigger a rendering error and test the ErrorBoundary component.
      </p>
      <Button variant="destructive" onClick={() => setShouldThrow(true)}>
        Trigger Error
      </Button>
    </div>
  );
}
