"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center text-foreground">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-destructive/10 text-destructive shadow-xl">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h1 className="mb-2 text-3xl font-extrabold tracking-tight">System Exception Error</h1>
      <p className="mb-8 max-w-md text-sm text-muted-foreground">
        {error.message || "An unexpected application error occurred. The system is active; please retry."}
      </p>
      <Button onClick={() => reset()} variant="glow">
        <RefreshCw className="mr-2 h-4 w-4" /> Reset Application State
      </Button>
    </div>
  );
}
