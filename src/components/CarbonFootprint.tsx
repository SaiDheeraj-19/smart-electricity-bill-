"use client";

import { useApp } from "@/context/AppContext";
import { Leaf, TreePine, Car, Zap } from "lucide-react";

export default function CarbonFootprint() {
  const { result } = useApp();

  if (!result || result.totalKwh === 0) {
    return (
      <div className="solid-card p-6 text-center">
        <div className="text-4xl mb-3">🌱</div>
        <p className="text-sm text-muted-foreground">Add appliances to see carbon footprint</p>
      </div>
    );
  }

  const { co2Emissions, co2TreesEquivalent, totalKwh } = result;
  // Car equivalent: avg car emits 21 kg CO2 per 100 km
  const kmEquivalent = Math.round((co2Emissions / 0.21) * 10) / 10;
  // Coal equivalent: burning 1 kg coal ~ 2.42 kg CO2
  const coalKg = Math.round((co2Emissions / 2.42) * 10) / 10;

  // Rating
  let rating = "Excellent 🌟";
  let ratingColor = "text-emerald-600 dark:text-emerald-400";
  let barWidth = 15;
  if (co2Emissions > 200) { rating = "Poor ⚠️"; ratingColor = "text-red-500"; barWidth = 95; }
  else if (co2Emissions > 100) { rating = "Average 🟡"; ratingColor = "text-amber-500"; barWidth = 60; }
  else if (co2Emissions > 50) { rating = "Good ✅"; ratingColor = "text-blue-500"; barWidth = 35; }

  return (
    <div className="solid-card p-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
          <Leaf className="w-4 h-4 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">Carbon Footprint</h3>
          <p className="text-xs text-muted-foreground">Monthly environmental impact</p>
        </div>
      </div>

      {/* Main metric */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-2xl p-5 text-white mb-5">
        <p className="text-sm text-green-100 mb-1">CO₂ Emissions</p>
        <div className="text-4xl font-black">{co2Emissions} <span className="text-xl font-normal">kg</span></div>
        <div className="text-xs text-green-100 mt-2">Based on India grid factor: 0.82 kg CO₂/kWh</div>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Eco Rating</span>
          <span className={`font-bold text-sm ${ratingColor}`}>{rating}</span>
        </div>
        <div className="h-3 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full overflow-hidden relative">
          <div
            className="absolute top-0 h-full w-1.5 bg-white rounded-full shadow-lg transition-all duration-700"
            style={{ left: `${Math.min(barWidth, 98)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>

      {/* Equivalences */}
      <div className="space-y-3">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">That&apos;s equivalent to…</h4>

        <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
          <TreePine className="w-5 h-5 text-green-500 flex-shrink-0" />
          <div className="text-sm">
            <strong className="text-foreground">{co2TreesEquivalent} trees</strong>
            <span className="text-muted-foreground"> needed to offset this for a year</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
          <Car className="w-5 h-5 text-blue-500 flex-shrink-0" />
          <div className="text-sm">
            <strong className="text-foreground">{kmEquivalent} km</strong>
            <span className="text-muted-foreground"> driven by a petrol car</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
          <Zap className="w-5 h-5 text-orange-500 flex-shrink-0" />
          <div className="text-sm">
            <strong className="text-foreground">{coalKg} kg</strong>
            <span className="text-muted-foreground"> of coal burned</span>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-xl border border-green-200 dark:border-green-900 bg-green-50/50 dark:bg-green-950/20 text-xs text-green-800 dark:text-green-300">
        💡 Switch to green energy or add solar panels to reduce your carbon footprint to near zero.
      </div>
    </div>
  );
}
