"use client";

import Link from "next/link";
import { Bell, Search, User } from "lucide-react";

interface TopNavProps {
  userEmail?: string;
  fullName?: string;
}

export function TopNav({ userEmail, fullName }: TopNavProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border bg-[#09090b]/80 backdrop-blur-md px-6">
      {/* Search Bar Input Trigger */}
      <Link
        href="/search"
        className="flex h-10 w-full max-w-md items-center gap-3 rounded-lg border border-border bg-black/40 px-3 text-sm text-muted-foreground transition-colors hover:border-primary/50"
      >
        <Search className="h-4 w-4 text-primary" />
        <span>Ask Atrixia to find or compare products...</span>
      </Link>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Notification Bell Placeholder */}
        <button
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-black/40 text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary animate-pulse" />
        </button>

        {/* User Profile Menu */}
        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-lg border border-border bg-black/40 p-1.5 pr-3 hover:bg-white/5 transition-colors"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-primary font-semibold text-xs">
            {fullName ? fullName.charAt(0).toUpperCase() : <User className="h-3.5 w-3.5" />}
          </div>
          <div className="hidden sm:block text-left text-xs">
            <p className="font-medium text-foreground">{fullName || "User"}</p>
            <p className="text-[10px] text-muted-foreground truncate max-w-[120px]">
              {userEmail || "user@example.com"}
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}
