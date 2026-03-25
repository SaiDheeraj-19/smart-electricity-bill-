"use client";

import { useMemo } from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
} from "recharts";
import { useApp } from "@/context/AppContext";
import { generateMonthlyProjection } from "@/lib/calculator";

const COLORS = [
  "#3b82f6", "#f97316", "#a855f7", "#10b981",
  "#f59e0b", "#ef4444", "#06b6d4", "#84cc16",
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl px-3 py-2 shadow-xl text-sm">
      <p className="font-semibold text-foreground">{payload[0]?.name}</p>
      <p className="text-muted-foreground">
        {typeof payload[0]?.value === "number" && payload[0].value.toFixed(1)} {payload[0]?.unit || "kWh"}
      </p>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BarTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl px-3 py-2 shadow-xl text-sm">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {payload.map((p: any) => (
        <p key={p.dataKey} className="text-muted-foreground">
          {p.name}: <strong className="text-foreground">
            {p.dataKey === "bill" ? `₹${Math.round(p.value)}` : `${p.value.toFixed(0)} kWh`}
          </strong>
        </p>
      ))}
    </div>
  );
}

export default function Charts() {
  const { result, tariff } = useApp();

  const monthlyData = useMemo(() => {
    if (!result) return [];
    return generateMonthlyProjection(result.totalKwh, tariff);
  }, [result, tariff]);

  if (!result || result.applianceConsumption.length === 0) {
    return (
      <div className="solid-card p-6 text-center">
        <div className="text-4xl mb-3">📊</div>
        <p className="text-sm text-muted-foreground">Add appliances to see charts</p>
      </div>
    );
  }

  const pieData = result.applianceConsumption.map((a) => ({
    name: `${a.icon} ${a.name}`,
    value: a.kwh,
    percentage: a.percentage,
  }));

  return (
    <div className="space-y-6">
      {/* Pie Chart */}
      <div className="solid-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-1">Consumption by Appliance</h3>
        <p className="text-xs text-muted-foreground mb-4">Share of total energy (kWh)</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                animationBegin={0}
                animationDuration={600}
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="space-y-1.5 mt-2">
          {pieData.slice(0, 6).map((entry, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="text-muted-foreground truncate max-w-[140px]">{entry.name}</span>
              </div>
              <div className="flex items-center gap-2 text-right">
                <span className="text-foreground font-medium">{entry.value} kWh</span>
                <span className="text-muted-foreground">({entry.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bar Chart — Monthly Projection */}
      <div className="solid-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-1">12-Month Bill Projection</h3>
        <p className="text-xs text-muted-foreground mb-4">Estimated seasonality (summer peaks)</p>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--tw-border-opacity, 0.15)" opacity={0.3} />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} />
              <Tooltip content={<BarTooltip />} />
              <Bar dataKey="bill" name="Bill (₹)" fill="#3b82f6" radius={[4, 4, 0, 0]} animationDuration={600} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
