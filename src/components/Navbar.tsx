"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Zap, LayoutDashboard, Lightbulb } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { theme, toggleTheme } = useApp();
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home", icon: Zap },
    { href: "/dashboard", label: "Calculator", icon: LayoutDashboard },
    { href: "/insights", label: "Insights", icon: Lightbulb },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 backdrop-blur-xl bg-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/30 transition-shadow">
            <Zap className="w-4 h-4 text-white" fill="currentColor" />
          </div>
          <div className="hidden sm:block">
            <span className="text-sm font-bold text-foreground">SmartElec</span>
            <span className="text-sm font-bold gradient-text"> Estimator</span>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                pathname === href
                  ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:block">{label}</span>
            </Link>
          ))}
        </nav>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}
