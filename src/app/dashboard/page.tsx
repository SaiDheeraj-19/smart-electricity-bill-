"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import ApplianceForm from "@/components/ApplianceForm";
import BillSummary from "@/components/BillSummary";
import Charts from "@/components/Charts";
import WhatIfSimulator from "@/components/WhatIfSimulator";
import CarbonFootprint from "@/components/CarbonFootprint";
import { useApp } from "@/context/AppContext";
import { Trash2, LayoutDashboard, BarChart2, SlidersHorizontal, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "overview" | "charts" | "simulator" | "carbon";

const tabs: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "charts", label: "Charts", icon: BarChart2 },
  { id: "simulator", label: "Simulator", icon: SlidersHorizontal },
  { id: "carbon", label: "Carbon", icon: Leaf },
];

export default function DashboardPage() {
  const { clearAll, appliances, result } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-foreground">Electricity Calculator</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Add your appliances and get an instant bill estimate
            </p>
          </div>
          {appliances.length > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 px-3 py-2 rounded-xl transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          {/* Left — Appliance form */}
          <div className="space-y-6">
            <ApplianceForm />
          </div>

          {/* Right — Results panel */}
          <div className="space-y-4">
            {/* Tab bar */}
            <div className="flex gap-1 p-1 bg-muted rounded-xl">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-medium transition-all duration-200",
                    activeTab === id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="w-3.5 h-3.5 hidden sm:block" />
                  {label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === "overview" && (
              <div className="space-y-4 animate-fade-in">
                <BillSummary />
              </div>
            )}
            {activeTab === "charts" && (
              <div className="animate-fade-in">
                <Charts />
              </div>
            )}
            {activeTab === "simulator" && (
              <div className="animate-fade-in">
                <WhatIfSimulator />
              </div>
            )}
            {activeTab === "carbon" && (
              <div className="animate-fade-in">
                <CarbonFootprint />
              </div>
            )}

            {/* Quick stats when result available */}
            {result && (
              <div className="grid grid-cols-3 gap-2">
                <div className="solid-card p-3 text-center">
                  <div className="text-lg font-black gradient-text">{result.totalKwh}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">kWh/mo</div>
                </div>
                <div className="solid-card p-3 text-center">
                  <div className="text-lg font-black text-orange-500">{result.co2Emissions}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">kg CO₂</div>
                </div>
                <div className="solid-card p-3 text-center">
                  <div className="text-lg font-black text-emerald-500">{appliances.length}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Devices</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
