"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  History,
  Bookmark,
  User,
  Sliders,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/app/actions/auth";

const navItems = [
  { name: "Home", href: "/home", icon: Home },
  { name: "AI Search", href: "/search", icon: Search },
  { name: "History", href: "/history", icon: History },
  { name: "Saved Reports", href: "/saved", icon: Bookmark },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Preferences", href: "/preferences", icon: Sliders },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex h-screen w-64 flex-col border-r border-border bg-[#0a0a0d] p-4 text-foreground">
      {/* Brand Header */}
      <Link href="/home" className="mb-8 flex items-center gap-3 px-2 pt-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-purple-500/30">
          <Sparkles className="h-5 w-5 text-foreground" />
        </div>
        <div>
          <span className="font-sans text-xl font-bold tracking-tight text-foreground">
            Atrixia
          </span>
          <span className="block text-[10px] uppercase tracking-widest text-primary">
            AI Shopping Agent
          </span>
        </div>
      </Link>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="border-t border-border pt-4">
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
