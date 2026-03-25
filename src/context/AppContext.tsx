"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { ApplianceEntry, BillCalculationResult, SavingsSuggestion, calculateBill, generateSavingsSuggestions } from "@/lib/calculator";
import { StateTariff, DEFAULT_TARIFF } from "@/lib/tariffs";
import { saveAppliances, loadAppliances, saveTariff, loadTariff, saveTheme, loadTheme } from "@/lib/storage";
import { generateId } from "@/lib/utils";

interface AppContextType {
  appliances: ApplianceEntry[];
  tariff: StateTariff;
  result: BillCalculationResult | null;
  suggestions: SavingsSuggestion[];
  theme: "light" | "dark";
  addAppliance: (appliance: Omit<ApplianceEntry, "id">) => void;
  removeAppliance: (id: string) => void;
  updateAppliance: (id: string, updates: Partial<ApplianceEntry>) => void;
  setTariff: (tariff: StateTariff) => void;
  toggleTheme: () => void;
  clearAll: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [appliances, setAppliances] = useState<ApplianceEntry[]>([]);
  const [tariff, setTariffState] = useState<StateTariff>(DEFAULT_TARIFF);
  const [result, setResult] = useState<BillCalculationResult | null>(null);
  const [suggestions, setSuggestions] = useState<SavingsSuggestion[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedAppliances = loadAppliances();
    const savedTariff = loadTariff();
    const savedTheme = loadTheme();
    setAppliances(savedAppliances);
    setTariffState(savedTariff);
    setTheme(savedTheme);
    setMounted(true);
  }, []);

  // Apply theme class
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Recalculate when appliances or tariff change
  useEffect(() => {
    if (!mounted) return;
    if (appliances.length === 0) {
      setResult(null);
      setSuggestions([]);
      return;
    }
    const newResult = calculateBill(appliances, tariff);
    setResult(newResult);
    const newSuggestions = generateSavingsSuggestions(appliances, newResult, tariff);
    setSuggestions(newSuggestions);
  }, [appliances, tariff, mounted]);

  // Persist appliances
  useEffect(() => {
    if (mounted) saveAppliances(appliances);
  }, [appliances, mounted]);

  const addAppliance = useCallback((appliance: Omit<ApplianceEntry, "id">) => {
    setAppliances((prev) => [...prev, { ...appliance, id: generateId() }]);
  }, []);

  const removeAppliance = useCallback((id: string) => {
    setAppliances((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const updateAppliance = useCallback((id: string, updates: Partial<ApplianceEntry>) => {
    setAppliances((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
  }, []);

  const setTariff = useCallback((t: StateTariff) => {
    setTariffState(t);
    saveTariff(t.code);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      saveTheme(next);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setAppliances([]);
  }, []);

  return (
    <AppContext.Provider
      value={{
        appliances,
        tariff,
        result,
        suggestions,
        theme,
        addAppliance,
        removeAppliance,
        updateAppliance,
        setTariff,
        toggleTheme,
        clearAll,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
