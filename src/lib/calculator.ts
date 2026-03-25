import { StateTariff } from "./tariffs";

export interface ApplianceEntry {
  id: string;
  name: string;
  icon: string;
  watts: number;
  hoursPerDay: number;
  daysPerMonth: number;
  presetId?: string;
}

export interface BillCalculationResult {
  totalKwh: number;
  billBreakdown: SlabBreakdown[];
  energyCost: number;
  fixedCharge: number;
  taxes: number;
  totalBill: number;
  applianceConsumption: ApplianceConsumption[];
  co2Emissions: number; // in kg
  co2TreesEquivalent: number;
}

export interface SlabBreakdown {
  label: string;
  units: number;
  rate: number;
  cost: number;
}

export interface ApplianceConsumption {
  id: string;
  name: string;
  icon: string;
  kwh: number;
  cost: number;
  percentage: number;
}

export interface SavingsSuggestion {
  id: string;
  type: "reduce_hours" | "replace_led" | "star_rating" | "shift_timing" | "remove" | "general";
  appliance?: string;
  description: string;
  savingsMonthly: number;
  savingsYearly: number;
  difficulty: "easy" | "medium" | "hard";
  icon: string;
}

// CO2 emission factor for India's grid (kg CO2 per kWh)
export const CO2_FACTOR = 0.82;

// Calculate kWh for a single appliance
export function calculateApplianceKwh(appliance: ApplianceEntry): number {
  return (appliance.watts / 1000) * appliance.hoursPerDay * appliance.daysPerMonth;
}

// Calculate bill using slab-based tariff
export function calculateSlabCost(
  totalKwh: number,
  tariff: StateTariff
): { slabBreakdown: SlabBreakdown[]; energyCost: number } {
  let remaining = totalKwh;
  let energyCost = 0;
  const slabBreakdown: SlabBreakdown[] = [];

  for (const slab of tariff.slabs) {
    if (remaining <= 0) break;

    const slabCapacity = slab.max !== null ? slab.max - slab.min + 1 : Infinity;
    const unitsInSlab = Math.min(remaining, slabCapacity);
    const cost = unitsInSlab * slab.ratePerUnit;

    if (unitsInSlab > 0) {
      slabBreakdown.push({
        label:
          slab.max !== null
            ? `${slab.min}–${slab.max} units @ ₹${slab.ratePerUnit}/unit`
            : `${slab.min}+ units @ ₹${slab.ratePerUnit}/unit`,
        units: Math.round(unitsInSlab * 100) / 100,
        rate: slab.ratePerUnit,
        cost: Math.round(cost * 100) / 100,
      });

      energyCost += cost;
      remaining -= unitsInSlab;
    }
  }

  return { slabBreakdown, energyCost };
}

// Main calculation function
export function calculateBill(
  appliances: ApplianceEntry[],
  tariff: StateTariff
): BillCalculationResult {
  if (appliances.length === 0) {
    return {
      totalKwh: 0,
      billBreakdown: [],
      energyCost: 0,
      fixedCharge: tariff.fixedCharge,
      taxes: 0,
      totalBill: tariff.fixedCharge,
      applianceConsumption: [],
      co2Emissions: 0,
      co2TreesEquivalent: 0,
    };
  }

  // Calculate per-appliance consumption
  const applianceKwhs = appliances.map((a) => ({
    appliance: a,
    kwh: calculateApplianceKwh(a),
  }));

  const totalKwh = applianceKwhs.reduce((sum, a) => sum + a.kwh, 0);

  // Calculate slab-based cost
  const { slabBreakdown, energyCost } = calculateSlabCost(totalKwh, tariff);

  // Calculate per-appliance cost proportionally
  const applianceConsumption: ApplianceConsumption[] = applianceKwhs.map(({ appliance, kwh }) => ({
    id: appliance.id,
    name: appliance.name,
    icon: appliance.icon,
    kwh: Math.round(kwh * 100) / 100,
    cost: totalKwh > 0 ? Math.round((kwh / totalKwh) * energyCost * 100) / 100 : 0,
    percentage: totalKwh > 0 ? Math.round((kwh / totalKwh) * 1000) / 10 : 0,
  }));

  // Sort by consumption descending
  applianceConsumption.sort((a, b) => b.kwh - a.kwh);

  // Calculate taxes
  const fixedCharge = tariff.fixedCharge;
  const taxes = Math.round(((energyCost + fixedCharge) * tariff.taxPercent) / 100 * 100) / 100;
  const totalBill = Math.round((energyCost + fixedCharge + taxes) * 100) / 100;

  // CO2 calculation
  const co2Emissions = Math.round(totalKwh * CO2_FACTOR * 100) / 100;
  const co2TreesEquivalent = Math.round((co2Emissions / 21.77) * 100) / 100; // avg tree absorbs 21.77kg CO2/year

  return {
    totalKwh: Math.round(totalKwh * 100) / 100,
    billBreakdown: slabBreakdown,
    energyCost: Math.round(energyCost * 100) / 100,
    fixedCharge,
    taxes,
    totalBill,
    applianceConsumption,
    co2Emissions,
    co2TreesEquivalent,
  };
}

// Generate savings suggestions
export function generateSavingsSuggestions(
  appliances: ApplianceEntry[],
  currentResult: BillCalculationResult,
  tariff: StateTariff
): SavingsSuggestion[] {
  const suggestions: SavingsSuggestion[] = [];

  if (appliances.length === 0) return suggestions;

  // Sort by consumption to find top consumers
  const sortedAppliances = [...appliances].sort(
    (a, b) => calculateApplianceKwh(b) - calculateApplianceKwh(a)
  );

  // Suggestion 1: Reduce AC usage by 1 hour
  const acAppliances = sortedAppliances.filter(
    (a) => a.name.toLowerCase().includes("air conditioner") || a.name.toLowerCase().includes("ac")
  );
  for (const ac of acAppliances.slice(0, 1)) {
    if (ac.hoursPerDay > 1) {
      const reducedAc = { ...ac, hoursPerDay: Math.max(ac.hoursPerDay - 1, 0) };
      const modifiedAppliances = appliances.map((a) => (a.id === ac.id ? reducedAc : a));
      const newResult = calculateBill(modifiedAppliances, tariff);
      const savingsMonthly = currentResult.totalBill - newResult.totalBill;
      if (savingsMonthly > 0) {
        suggestions.push({
          id: `reduce_ac_${ac.id}`,
          type: "reduce_hours",
          appliance: ac.name,
          description: `Reduce ${ac.name} usage by 1 hour/day`,
          savingsMonthly: Math.round(savingsMonthly),
          savingsYearly: Math.round(savingsMonthly * 12),
          difficulty: "easy",
          icon: "❄️",
        });
      }
    }
  }

  // Suggestion 2: Reduce top energy consumer by 2 hours
  const topConsumer = sortedAppliances[0];
  if (topConsumer && topConsumer.hoursPerDay > 2) {
    const reduced = { ...topConsumer, hoursPerDay: topConsumer.hoursPerDay - 2 };
    const modifiedAppliances = appliances.map((a) => (a.id === topConsumer.id ? reduced : a));
    const newResult = calculateBill(modifiedAppliances, tariff);
    const savingsMonthly = currentResult.totalBill - newResult.totalBill;
    if (savingsMonthly > 5 && topConsumer.id !== acAppliances[0]?.id) {
      suggestions.push({
        id: `reduce_top_${topConsumer.id}`,
        type: "reduce_hours",
        appliance: topConsumer.name,
        description: `Reduce ${topConsumer.name} usage by 2 hours/day`,
        savingsMonthly: Math.round(savingsMonthly),
        savingsYearly: Math.round(savingsMonthly * 12),
        difficulty: "medium",
        icon: "⏰",
      });
    }
  }

  // Suggestion 3: Replace tubelights with LED
  const tubelights = appliances.filter(
    (a) => a.name.toLowerCase().includes("tubelight") || (a.watts >= 36 && a.watts <= 45 && a.name.toLowerCase().includes("tube"))
  );
  for (const tube of tubelights) {
    const ledWatts = 9; // LED equivalent
    const savedWatts = tube.watts - ledWatts;
    const savedKwh = (savedWatts / 1000) * tube.hoursPerDay * tube.daysPerMonth;
    const avgRate = currentResult.totalKwh > 0
      ? currentResult.energyCost / currentResult.totalKwh
      : tariff.slabs[Math.floor(tariff.slabs.length / 2)].ratePerUnit;
    const savingsMonthly = savedKwh * avgRate;
    if (savingsMonthly > 0.5) {
      suggestions.push({
        id: `led_${tube.id}`,
        type: "replace_led",
        appliance: tube.name,
        description: `Replace ${tube.name} with LED equivalent`,
        savingsMonthly: Math.round(savingsMonthly),
        savingsYearly: Math.round(savingsMonthly * 12),
        difficulty: "easy",
        icon: "💡",
      });
    }
  }

  // Suggestion 4: General star-rating upgrade for old appliances
  const oldAppliances = appliances.filter(
    (a) => (a.name.toLowerCase().includes("refrigerator") || a.name.toLowerCase().includes("fridge")) &&
      a.watts > 180
  );
  for (const old of oldAppliances.slice(0, 1)) {
    const savingsMonthly = Math.round(old.watts * 0.2 * old.hoursPerDay * old.daysPerMonth / 1000 *
      (currentResult.energyCost / Math.max(currentResult.totalKwh, 1)));
    if (savingsMonthly > 0) {
      suggestions.push({
        id: `star_${old.id}`,
        type: "star_rating",
        appliance: old.name,
        description: `Upgrade ${old.name} to 5-star BEE rated model (save ~20% energy)`,
        savingsMonthly,
        savingsYearly: savingsMonthly * 12,
        difficulty: "hard",
        icon: "⭐",
      });
    }
  }

  // Suggestion 5: Shift water heater/geyser to off-peak
  const geysers = appliances.filter(
    (a) => a.name.toLowerCase().includes("geyser") || a.name.toLowerCase().includes("water heater")
  );
  for (const geyser of geysers.slice(0, 1)) {
    const savingsMonthly = Math.round(geyser.watts * geyser.hoursPerDay * geyser.daysPerMonth / 1000 * 0.3 *
      (currentResult.energyCost / Math.max(currentResult.totalKwh, 1)));
    if (savingsMonthly > 0) {
      suggestions.push({
        id: `shift_${geyser.id}`,
        type: "shift_timing",
        appliance: geyser.name,
        description: `Use solar water heater instead of electric geyser`,
        savingsMonthly: Math.round(savingsMonthly),
        savingsYearly: Math.round(savingsMonthly * 12),
        difficulty: "hard",
        icon: "☀️",
      });
    }
  }

  // Suggestion 6: General energy-saving tips
  if (currentResult.totalKwh > 200) {
    suggestions.push({
      id: "general_habit",
      type: "general",
      description: "Unplug devices on standby — standby power can account for 10% of your bill",
      savingsMonthly: Math.round(currentResult.totalBill * 0.1),
      savingsYearly: Math.round(currentResult.totalBill * 0.1 * 12),
      difficulty: "easy",
      icon: "🔌",
    });
  }

  // Sort by savings descending
  return suggestions.sort((a, b) => b.savingsMonthly - a.savingsMonthly).slice(0, 6);
}

// Generate monthly projection data (12 months seasonality)
export function generateMonthlyProjection(baseUsage: number, tariff: StateTariff) {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  // Seasonality multipliers (summer peaks, winter lower for AC-dominated)
  const multipliers = [0.8, 0.85, 1.0, 1.2, 1.4, 1.35, 1.3, 1.25, 1.1, 0.9, 0.8, 0.75];

  return months.map((month, i) => {
    const kwh = Math.round(baseUsage * multipliers[i] * 100) / 100;
    const { energyCost } = calculateSlabCost(kwh, tariff);
    const total = Math.round((energyCost + tariff.fixedCharge) * (1 + tariff.taxPercent / 100) * 100) / 100;
    return { month, kwh, bill: total };
  });
}
