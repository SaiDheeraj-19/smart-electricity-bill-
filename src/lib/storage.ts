import { ApplianceEntry } from "./calculator";
import { STATE_TARIFFS, DEFAULT_TARIFF, StateTariff } from "./tariffs";

const STORAGE_KEYS = {
  appliances: "elec_estimator_appliances",
  tariff: "elec_estimator_tariff",
  theme: "elec_estimator_theme",
};

export function saveAppliances(appliances: ApplianceEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.appliances, JSON.stringify(appliances));
  } catch {
    // localStorage not available (SSR or private mode)
  }
}

export function loadAppliances(): ApplianceEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.appliances);
    if (!raw) return [];
    return JSON.parse(raw) as ApplianceEntry[];
  } catch {
    return [];
  }
}

export function saveTariff(stateCode: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.tariff, stateCode);
  } catch {}
}

export function loadTariff(): StateTariff {
  try {
    const code = localStorage.getItem(STORAGE_KEYS.tariff);
    if (!code) return DEFAULT_TARIFF;
    return STATE_TARIFFS.find((t) => t.code === code) ?? DEFAULT_TARIFF;
  } catch {
    return DEFAULT_TARIFF;
  }
}

export function saveTheme(theme: "light" | "dark"): void {
  try {
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  } catch {}
}

export function loadTheme(): "light" | "dark" {
  try {
    const t = localStorage.getItem(STORAGE_KEYS.theme);
    if (t === "light" || t === "dark") return t;
    // Default: prefer system
    if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  } catch {
    return "light";
  }
}
