"use client";

import { useState } from "react";
import { Plus, Trash2, ChevronDown } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { APPLIANCE_PRESETS, APPLIANCE_CATEGORIES } from "@/lib/appliances";
import { STATE_TARIFFS, DEFAULT_TARIFF } from "@/lib/tariffs";
import { cn } from "@/lib/utils";

interface QuickAddFormProps {
  onClose: () => void;
}

function QuickAddForm({ onClose }: QuickAddFormProps) {
  const { addAppliance } = useApp();
  const [form, setForm] = useState<{
    presetId: string;
    name: string;
    icon: string;
    watts: number | string;
    hoursPerDay: number | string;
    daysPerMonth: number | string;
  }>({
    presetId: "",
    name: "",
    icon: "⚡",
    watts: 100,
    hoursPerDay: 5,
    daysPerMonth: 30,
  });

  const handlePreset = (presetId: string) => {
    if (presetId === "") {
      setForm((f) => ({ ...f, presetId: "", name: "", icon: "⚡", watts: 100 }));
      return;
    }
    const preset = APPLIANCE_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setForm((f) => ({
        ...f,
        presetId,
        name: preset.name,
        icon: preset.icon,
        watts: preset.watts,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || Number(form.watts) <= 0) return;
    addAppliance({
      name: form.name,
      icon: form.icon || "⚡",
      watts: Number(form.watts) || 0,
      hoursPerDay: Number(form.hoursPerDay) || 0,
      daysPerMonth: Number(form.daysPerMonth) || 0,
      presetId: form.presetId || undefined,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-5 border border-blue-200 dark:border-blue-900 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 animate-slide-up">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Preset selector */}
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Quick Select Appliance</label>
          <div className="relative">
            <select
              value={form.presetId}
              onChange={(e) => handlePreset(e.target.value)}
              className="input-field pr-9 appearance-none"
            >
              <option value="">— Custom Appliance —</option>
              {APPLIANCE_CATEGORIES.map((cat) => (
                <optgroup key={cat.id} label={cat.label}>
                  {APPLIANCE_PRESETS.filter((p) => p.category === cat.id).map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.icon} {p.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Appliance Name*</label>
          <input
            id="appliance-name"
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="e.g. Living Room Fan"
            className="input-field"
            required
          />
        </div>

        {/* Watts */}
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Power Rating (Watts)*</label>
          <input
            id="appliance-watts"
            type="number"
            min="0"
            max="50000"
            value={form.watts}
            onChange={(e) => setForm((f) => ({ ...f, watts: e.target.value === "" ? "" : Number(e.target.value) }))}
            className="input-field"
            required
          />
        </div>

        {/* Hours per day */}
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Hours per Day</label>
          <input
            id="appliance-hours"
            type="number"
            min="0"
            max="24"
            step="any"
            value={form.hoursPerDay}
            onChange={(e) => setForm((f) => ({ ...f, hoursPerDay: e.target.value === "" ? "" : Number(e.target.value) }))}
            className="input-field"
          />
        </div>

        {/* Days per month */}
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Days per Month</label>
          <input
            id="appliance-days"
            type="number"
            min="0"
            max="31"
            value={form.daysPerMonth}
            onChange={(e) => setForm((f) => ({ ...f, daysPerMonth: e.target.value === "" ? "" : Number(e.target.value) }))}
            className="input-field"
          />
        </div>

        {/* kWh preview */}
        <div className="flex items-end">
          <div className="w-full px-4 py-2.5 rounded-xl bg-muted text-sm text-muted-foreground">
            Estimated usage:{" "}
            <strong className="text-foreground">
              {(((Number(form.watts) || 0) / 1000) * (Number(form.hoursPerDay) || 0) * (Number(form.daysPerMonth) || 0)).toFixed(1)} kWh/month
            </strong>
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-end pt-1">
        <button type="button" onClick={onClose} className="btn-secondary py-2 px-4 text-sm">
          Cancel
        </button>
        <button type="submit" className="btn-primary py-2 px-5 text-sm">
          <Plus className="w-4 h-4" />
          Add Appliance
        </button>
      </div>
    </form>
  );
}

export default function ApplianceForm() {
  const { appliances, removeAppliance, updateAppliance, tariff, setTariff } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);

  const allTariffs = [DEFAULT_TARIFF, ...STATE_TARIFFS];

  return (
    <div className="space-y-6">
      {/* State selector */}
      <div className="solid-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center text-xs">📍</span>
          Your State / Tariff Plan
        </h3>
        <div className="relative">
          <select
            value={tariff.code}
            onChange={(e) => {
              const found = allTariffs.find((t) => t.code === e.target.value);
              if (found) setTariff(found);
            }}
            className="input-field pr-9 appearance-none"
          >
            {allTariffs.map((t) => (
              <option key={t.code} value={t.code}>
                {t.state} — Fixed ₹{t.fixedCharge}/month
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
        {/* Slab preview */}
        <div className="mt-3 flex flex-wrap gap-2">
          {tariff.slabs.map((slab, i) => (
            <span key={i} className="badge-blue text-xs">
              {slab.min}–{slab.max ?? "∞"} units: ₹{slab.ratePerUnit}/u
            </span>
          ))}
          {tariff.taxPercent > 0 && (
            <span className="badge-orange text-xs">+{tariff.taxPercent}% tax</span>
          )}
        </div>
      </div>

      {/* Appliance list */}
      <div className="solid-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-xs">🏠</span>
            Your Appliances
            {appliances.length > 0 && (
              <span className="badge-blue ml-1">{appliances.length}</span>
            )}
          </h3>
          <button
            onClick={() => setShowAddForm((v) => !v)}
            className={cn("btn-primary py-2 px-4 text-xs", showAddForm && "opacity-70")}
          >
            <Plus className="w-3.5 h-3.5" />
            {showAddForm ? "Cancel" : "Add Appliance"}
          </button>
        </div>

        {showAddForm && (
          <div className="mb-4">
            <QuickAddForm onClose={() => setShowAddForm(false)} />
          </div>
        )}

        {appliances.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            <div className="text-4xl mb-3">🏠</div>
            <p className="text-sm font-medium">No appliances added yet</p>
            <p className="text-xs mt-1">Add your appliances to estimate your bill</p>
          </div>
        ) : (
          <div className="space-y-2">
            {/* Header row */}
            <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-3 px-3 text-xs font-medium text-muted-foreground">
              <span>Appliance</span>
              <span>Watts</span>
              <span>Hrs/Day</span>
              <span>Days/Mo</span>
              <span></span>
            </div>

            {appliances.map((appliance) => (
              <div
                key={appliance.id}
                className="appliance-row-enter grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-3 items-center px-3 py-3 rounded-xl hover:bg-muted/50 transition-colors group"
              >
                {/* Name */}
                <div className="flex items-center gap-2">
                  <span className="text-lg">{appliance.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-foreground">{appliance.name}</div>
                    <div className="text-xs text-muted-foreground sm:hidden">
                      {appliance.watts}W · {appliance.hoursPerDay}h/day · {appliance.daysPerMonth} days
                    </div>
                  </div>
                </div>

                {/* Watts */}
                <input
                  type="number"
                  min="0"
                  max="50000"
                  value={appliance.watts || ""}
                  onChange={(e) => updateAppliance(appliance.id, { watts: Number(e.target.value) })}
                  className="input-field text-xs hidden sm:block"
                  aria-label="watts"
                  placeholder="0"
                />

                {/* Hours */}
                <input
                  type="number"
                  min="0"
                  max="24"
                  step="any"
                  value={appliance.hoursPerDay || ""}
                  onChange={(e) => updateAppliance(appliance.id, { hoursPerDay: Number(e.target.value) })}
                  className="input-field text-xs hidden sm:block"
                  aria-label="hours per day"
                  placeholder="0"
                />

                {/* Days */}
                <input
                  type="number"
                  min="0"
                  max="31"
                  value={appliance.daysPerMonth || ""}
                  onChange={(e) => updateAppliance(appliance.id, { daysPerMonth: Number(e.target.value) })}
                  className="input-field text-xs hidden sm:block"
                  aria-label="days per month"
                  placeholder="0"
                />

                {/* Remove */}
                <button
                  onClick={() => removeAppliance(appliance.id)}
                  className="btn-danger p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove appliance"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
