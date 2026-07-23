import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center text-foreground">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-xl">
        <Sparkles className="h-8 w-8" />
      </div>
      <h1 className="mb-2 text-4xl font-extrabold tracking-tight">404 - Page Not Found</h1>
      <p className="mb-8 max-w-md text-sm text-muted-foreground">
        The page or decision report you are looking for does not exist or has been moved.
      </p>
      <Link href="/home">
        <Button variant="glow">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
      </Link>
    </div>
  );
}
