"use client";

import { useApp } from "@/context/AppContext";
import { formatCurrency } from "@/lib/utils";
import { Zap, Receipt, TrendingDown, AlertCircle } from "lucide-react";

export default function BillSummary() {
  const { result, tariff, appliances } = useApp();

  if (!result || appliances.length === 0) {
    return (
      <div className="solid-card p-6 text-center">
        <div className="text-4xl mb-3">⚡</div>
        <h3 className="text-base font-semibold text-foreground mb-1">Bill Preview</h3>
        <p className="text-sm text-muted-foreground">Add appliances to see your estimated bill</p>
      </div>
    );
  }

  const { totalKwh, billBreakdown, energyCost, fixedCharge, taxes, totalBill } = result;

  return (
    <div className="solid-card p-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center">
          <Receipt className="w-4 h-4 text-orange-600 dark:text-orange-400" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">Bill Estimate — {tariff.state}</h3>
      </div>

      {/* Total */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-5 text-white mb-5">
        <p className="text-sm text-blue-100 mb-1">Estimated Monthly Bill</p>
        <div className="text-4xl font-black animate-count">{formatCurrency(totalBill)}</div>
        <div className="flex items-center gap-3 mt-3 text-blue-100 text-xs">
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3" />
            {totalKwh} kWh consumed
          </span>
          <span>·</span>
          <span>{appliances.length} appliances</span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-2 mb-4">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Breakdown</h4>

        {/* Slab breakdown */}
        {billBreakdown.map((slab, i) => (
          <div key={i} className="flex items-center justify-between text-sm py-1.5">
            <span className="text-muted-foreground text-xs">{slab.label}</span>
            <span className="font-medium text-foreground">{formatCurrency(slab.cost)}</span>
          </div>
        ))}

        <div className="border-t border-border/60 my-2" />

        {/* Fixed charge */}
        <div className="flex items-center justify-between text-sm py-1">
          <span className="text-muted-foreground">Fixed / Demand Charge</span>
          <span className="font-medium">{formatCurrency(fixedCharge)}</span>
        </div>

        {/* Energy cost */}
        <div className="flex items-center justify-between text-sm py-1">
          <span className="text-muted-foreground">Energy Cost</span>
          <span className="font-medium">{formatCurrency(energyCost)}</span>
        </div>

        {/* Taxes */}
        {taxes > 0 && (
          <div className="flex items-center justify-between text-sm py-1">
            <span className="text-muted-foreground">Taxes ({tariff.taxPercent}%)</span>
            <span className="font-medium">{formatCurrency(taxes)}</span>
          </div>
        )}

        <div className="border-t border-border my-2" />

        {/* Total */}
        <div className="flex items-center justify-between py-1">
          <span className="text-sm font-bold text-foreground">Total Bill</span>
          <span className="text-lg font-black gradient-text">{formatCurrency(totalBill)}</span>
        </div>
      </div>

      {/* Avg daily cost */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-muted rounded-xl p-3 text-center">
          <div className="text-xs text-muted-foreground mb-0.5">Daily Cost</div>
          <div className="text-base font-bold text-foreground">{formatCurrency(totalBill / 30)}</div>
        </div>
        <div className="bg-muted rounded-xl p-3 text-center">
          <div className="text-xs text-muted-foreground mb-0.5">Yearly Estimate</div>
          <div className="text-base font-bold text-foreground">{formatCurrency(totalBill * 12)}</div>
        </div>
      </div>

      {/* Top consumer highlight */}
      {result.applianceConsumption[0] && (
        <div className="mt-4 flex items-start gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-amber-800 dark:text-amber-200">
            <strong>{result.applianceConsumption[0].name}</strong> is your biggest consumer at{" "}
            <strong>{result.applianceConsumption[0].percentage}%</strong> of your total bill.
          </div>
        </div>
      )}
    </div>
  );
}
