import { Settings as SettingsIcon, Bell, Moon, Shield, Bot } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Application Settings</h1>
        <p className="text-muted-foreground">
          System preferences, AI configurations, and security options
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Moon className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold">Appearance & Theme</CardTitle>
                <CardDescription>Tailored Dark Mode (Active Default)</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Active Theme System</span>
            <Badge variant="default">Midnight Dark HSL</Badge>
          </CardContent>
        </Card>

        {/* AI Engine Defaults */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold">AI Reasoning Provider</CardTitle>
                <CardDescription>Active model runtime setup</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Primary AI Model</span>
            <Badge variant="success">Gemini 2.5 Flash / Gemma 4</Badge>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                <Bell className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold">Notification Preferences</CardTitle>
                <CardDescription>Configure in-app and email alert alerts</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-muted-foreground">Email me when a decision report completes</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
            </label>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
