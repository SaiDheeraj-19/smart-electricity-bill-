// Appliance presets with typical power ratings
export interface AppliancePreset {
  id: string;
  name: string;
  icon: string;
  watts: number;
  category: "cooling" | "kitchen" | "entertainment" | "lighting" | "computing" | "other";
}

export const APPLIANCE_PRESETS: AppliancePreset[] = [
  { id: "ac_1ton", name: "Air Conditioner (1 Ton)", icon: "❄️", watts: 1000, category: "cooling" },
  { id: "ac_15ton", name: "Air Conditioner (1.5 Ton)", icon: "❄️", watts: 1500, category: "cooling" },
  { id: "ac_2ton", name: "Air Conditioner (2 Ton)", icon: "❄️", watts: 2000, category: "cooling" },
  { id: "ceiling_fan", name: "Ceiling Fan", icon: "🌀", watts: 70, category: "cooling" },
  { id: "cooler", name: "Air Cooler", icon: "💨", watts: 180, category: "cooling" },
  { id: "refrigerator", name: "Refrigerator (200L)", icon: "🧊", watts: 150, category: "kitchen" },
  { id: "refrigerator_lg", name: "Refrigerator (400L)", icon: "🧊", watts: 250, category: "kitchen" },
  { id: "microwave", name: "Microwave Oven", icon: "📦", watts: 1200, category: "kitchen" },
  { id: "mixer", name: "Mixer / Grinder", icon: "🫙", watts: 550, category: "kitchen" },
  { id: "induction", name: "Induction Cooktop", icon: "🍳", watts: 1800, category: "kitchen" },
  { id: "electric_kettle", name: "Electric Kettle", icon: "🫖", watts: 1500, category: "kitchen" },
  { id: "washing_machine", name: "Washing Machine", icon: "🫧", watts: 500, category: "kitchen" },
  { id: "tv_led_32", name: "LED TV (32 inch)", icon: "📺", watts: 40, category: "entertainment" },
  { id: "tv_led_55", name: "LED TV (55 inch)", icon: "📺", watts: 100, category: "entertainment" },
  { id: "set_top_box", name: "Set Top Box", icon: "📡", watts: 20, category: "entertainment" },
  { id: "led_bulb", name: "LED Bulb (9W)", icon: "💡", watts: 9, category: "lighting" },
  { id: "tubelight", name: "Tubelight (40W)", icon: "🔦", watts: 40, category: "lighting" },
  { id: "laptop", name: "Laptop", icon: "💻", watts: 65, category: "computing" },
  { id: "desktop", name: "Desktop PC", icon: "🖥️", watts: 300, category: "computing" },
  { id: "wifi_router", name: "WiFi Router", icon: "📶", watts: 10, category: "computing" },
  { id: "water_heater", name: "Water Heater (Geyser)", icon: "🚿", watts: 2000, category: "other" },
  { id: "iron", name: "Clothes Iron", icon: "👔", watts: 1000, category: "other" },
  { id: "water_pump", name: "Water Pump (0.5 HP)", icon: "💧", watts: 375, category: "other" },
];

export const APPLIANCE_CATEGORIES = [
  { id: "cooling", label: "Cooling & Fans", color: "#60a5fa" },
  { id: "kitchen", label: "Kitchen", color: "#fb923c" },
  { id: "entertainment", label: "Entertainment", color: "#a78bfa" },
  { id: "lighting", label: "Lighting", color: "#fbbf24" },
  { id: "computing", label: "Computing", color: "#34d399" },
  { id: "other", label: "Other", color: "#f87171" },
];
