"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useApp } from "@/context/AppContext";
import { formatCurrency } from "@/lib/utils";
import { TrendingDown, ArrowRight, Trophy, AlertTriangle, Zap, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

const difficultyLabel: Record<string, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Long-term",
};

const difficultyClass: Record<string, string> = {
  easy: "badge-green",
  medium: "badge-blue",
  hard: "badge-orange",
};

export default function InsightsPage() {
  const { suggestions, result, appliances, tariff } = useApp();

  if (appliances.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
          <div className="text-6xl mb-6">💡</div>
          <h1 className="text-3xl font-black text-foreground mb-4">Smart Insights</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Add your appliances first to get personalized savings recommendations.
          </p>
          <Link href="/dashboard" className="btn-primary">
            Go to Calculator
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const totalPotentialSavings = suggestions.reduce((s, sg) => s + sg.savingsMonthly, 0);
  const yearlyPotential = suggestions.reduce((s, sg) => s + sg.savingsYearly, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-medium mb-4">
            <Zap className="w-3 h-3" />
            AI-Powered Recommendations
          </div>
          <h1 className="text-3xl font-black text-foreground mb-2">
            Your Savings <span className="gradient-text-green">Insights</span>
          </h1>
          <p className="text-muted-foreground">
            Personalized recommendations based on your appliances and {tariff.state} tariff plan.
          </p>
        </div>

        {/* Summary cards */}
        {result && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="solid-card p-5">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-5 h-5 text-emerald-500" />
                <span className="text-xs font-medium text-muted-foreground">Monthly Savings Potential</span>
              </div>
              <div className="text-2xl font-black gradient-text-green">{formatCurrency(totalPotentialSavings)}</div>
              <div className="text-xs text-muted-foreground mt-1">if you follow all tips</div>
            </div>
            <div className="solid-card p-5">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span className="text-xs font-medium text-muted-foreground">Yearly Savings Potential</span>
              </div>
              <div className="text-2xl font-black text-amber-500">{formatCurrency(yearlyPotential)}</div>
              <div className="text-xs text-muted-foreground mt-1">{suggestions.length} tips available</div>
            </div>
            <div className="solid-card p-5">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="w-5 h-5 text-green-500" />
                <span className="text-xs font-medium text-muted-foreground">Current Monthly Bill</span>
              </div>
              <div className="text-2xl font-black gradient-text">{formatCurrency(result.totalBill)}</div>
              <div className="text-xs text-muted-foreground mt-1">{result.totalKwh} kWh consumed</div>
            </div>
          </div>
        )}

        {/* Top consumer */}
        {result && result.applianceConsumption[0] && (
          <div className="solid-card p-5 mb-6 border-l-4 border-orange-400">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Highest Energy Consumer</h3>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {result.applianceConsumption[0].icon} {result.applianceConsumption[0].name}
                  </span>{" "}
                  consumes{" "}
                  <strong className="text-orange-500">{result.applianceConsumption[0].percentage}%</strong> of your
                  total electricity ({result.applianceConsumption[0].kwh} kWh/month), costing{" "}
                  <strong className="text-orange-500">{formatCurrency(result.applianceConsumption[0].cost)}/month</strong>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Appliance consumption table */}
        {result && result.applianceConsumption.length > 0 && (
          <div className="solid-card p-5 mb-8">
            <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-xs">📊</span>
              Consumption Breakdown
            </h2>
            <div className="space-y-3">
              {result.applianceConsumption.map((a, i) => (
                <div key={a.id} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-muted-foreground w-5">#{i + 1}</span>
                      <span>{a.icon}</span>
                      <span className="font-medium text-foreground">{a.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-muted-foreground">{a.kwh} kWh</span>
                      <span className="font-bold text-foreground">{formatCurrency(a.cost)}</span>
                      <span className="badge-blue">{a.percentage}%</span>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${a.percentage}%`,
                        background: i === 0
                          ? "linear-gradient(90deg, #f97316, #fb923c)"
                          : "linear-gradient(90deg, #3b82f6, #60a5fa)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Savings suggestions */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">
            💡 Savings Recommendations
          </h2>

          {suggestions.length === 0 ? (
            <div className="solid-card p-8 text-center">
              <div className="text-4xl mb-3">🎉</div>
              <p className="text-foreground font-semibold">Your usage looks very efficient!</p>
              <p className="text-sm text-muted-foreground mt-1">Keep it up — you&apos;re already saving well.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {suggestions.map((sg, i) => (
                <div
                  key={sg.id}
                  className={cn(
                    "insight-card animate-fade-in",
                    i === 0 ? "green" : sg.difficulty === "hard" ? "orange" : ""
                  )}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-2xl">{sg.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-foreground leading-tight">{sg.description}</h3>
                      </div>
                      {sg.appliance && (
                        <span className="text-xs text-muted-foreground">{sg.appliance}</span>
                      )}
                    </div>
                    <span className={cn(difficultyClass[sg.difficulty], "text-xs flex-shrink-0")}>
                      {difficultyLabel[sg.difficulty]}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted rounded-xl p-3">
                      <div className="text-xs text-muted-foreground mb-0.5">Monthly Saving</div>
                      <div className="text-base font-black text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(sg.savingsMonthly)}
                      </div>
                    </div>
                    <div className="bg-muted rounded-xl p-3">
                      <div className="text-xs text-muted-foreground mb-0.5">Yearly Saving</div>
                      <div className="text-base font-black text-blue-600 dark:text-blue-400">
                        {formatCurrency(sg.savingsYearly)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Link back */}
        <div className="mt-10 text-center">
          <Link href="/dashboard" className="btn-secondary inline-flex">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Calculator
          </Link>
        </div>
      </main>
    </div>
  );
}
