import Link from "next/link";
import { Sparkles, ShieldCheck, ExternalLink, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function DecisionReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Back Link */}
      <Link href="/home" className="inline-flex items-center text-xs font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-1 h-3.5 w-3.5" /> Back to Dashboard
      </Link>

      {/* Hero Decision Report Header */}
      <Card className="glass-panel border-primary/40 bg-gradient-to-b from-primary/10 to-transparent">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Badge variant="default">AI Top Recommendation</Badge>
            <div className="flex items-center gap-1.5 text-sm font-mono text-emerald-400">
              <ShieldCheck className="h-4 w-4" /> 95% Confidence Rating
            </div>
          </div>
          <CardTitle className="text-2xl font-bold mt-3">
            Sony WH-1000XM5 Wireless Headphones
          </CardTitle>
          <CardDescription>
            Report ID: {id} — Analyzed across Amazon, eBay, and Jumia
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">AI Executive Rationale</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Selected as the overall best choice due to industry-leading noise cancellation, 30-hour battery life, and a $348 price point on Amazon featuring free next-day shipping from a 99% verified seller.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-border/50 pt-4">
            <div>
              <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Verified Pros</h4>
              <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1">
                <li>Best-in-class active noise cancellation</li>
                <li>Comfortable lightweight design for long listening sessions</li>
                <li>Multipoint Bluetooth pairing</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">Important Trade-offs</h4>
              <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1">
                <li>Non-foldable headband design compared to XM4</li>
                <li>$50 more expensive than second-best refurbished option</li>
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-border/50 pt-4">
            <div>
              <span className="text-2xl font-bold text-foreground">$348.00</span>
              <span className="block text-[10px] text-muted-foreground">Ships via Amazon Prime (Next-Day)</span>
            </div>
            <Link href="https://amazon.com" target="_blank">
              <Button variant="glow">
                Buy on Marketplace <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
