"use client";

import { useApp } from "@/context/AppContext";
import { calculateApplianceKwh, calculateBill } from "@/lib/calculator";
import { formatCurrency } from "@/lib/utils";
import { SlidersHorizontal } from "lucide-react";

export default function WhatIfSimulator() {
  const { appliances, tariff, result, updateAppliance } = useApp();

  if (appliances.length === 0 || !result) {
    return (
      <div className="solid-card p-6 text-center">
        <div className="text-4xl mb-3">🎛️</div>
        <p className="text-sm text-muted-foreground">Add appliances to use the simulator</p>
      </div>
    );
  }

  // Simulate bill if we change one appliance's hours
  const simulateSaving = (applianceId: string, newHours: number) => {
    const modified = appliances.map((a) =>
      a.id === applianceId ? { ...a, hoursPerDay: newHours } : a
    );
    const sim = calculateBill(modified, tariff);
    return result.totalBill - sim.totalBill;
  };

  return (
    <div className="solid-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center">
          <SlidersHorizontal className="w-4 h-4 text-violet-600 dark:text-violet-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">What-If Simulator</h3>
          <p className="text-xs text-muted-foreground">Drag to simulate usage changes</p>
        </div>
      </div>

      <div className="space-y-5">
        {appliances.map((appliance) => {
          const kwh = calculateApplianceKwh(appliance);
          const pct = result.totalKwh > 0 ? (kwh / result.totalKwh) * 100 : 0;
          const saving = simulateSaving(appliance.id, Math.max(0.5, appliance.hoursPerDay - 1));

          return (
            <div key={appliance.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">{appliance.icon}</span>
                  <div>
                    <span className="text-sm font-medium text-foreground">{appliance.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">{kwh.toFixed(1)} kWh</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-foreground">{appliance.hoursPerDay}h</span>
                  <span className="text-xs text-muted-foreground">/day</span>
                </div>
              </div>

              {/* Progress bar showing consumption share */}
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${Math.min(pct, 100)}%` }}
                />
              </div>

              {/* Slider */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-6">0h</span>
                <input
                  type="range"
                  min="0.5"
                  max="24"
                  step="0.5"
                  value={appliance.hoursPerDay}
                  onChange={(e) => updateAppliance(appliance.id, { hoursPerDay: Number(e.target.value) })}
                  className="w-full accent-blue-500 h-1.5 rounded-full cursor-pointer"
                  aria-label={`${appliance.name} hours slider`}
                />
                <span className="text-xs text-muted-foreground w-8">24h</span>
              </div>

              {/* Savings hint */}
              {saving > 1 && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400">
                  💡 -1h saves <strong>{formatCurrency(saving)}/month</strong>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
