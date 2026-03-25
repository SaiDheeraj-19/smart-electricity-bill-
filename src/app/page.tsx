"use client";

import Link from "next/link";
import { ArrowRight, Zap, TrendingDown, BarChart3, Leaf, Shield, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";

const features = [
  {
    icon: Zap,
    title: "Real-Time Calculation",
    description: "Instant bill estimates with slab-based tariffs for 14+ Indian states. Under 2 seconds.",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/40",
  },
  {
    icon: TrendingDown,
    title: "Smart Savings Advisor",
    description: "Personalized recommendations — 'Reduce AC by 1hr → save ₹800/month'.",
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
  },
  {
    icon: BarChart3,
    title: "Visual Dashboard",
    description: "Pie charts, bar charts, monthly projections — all interactive and animated.",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50 dark:bg-violet-950/40",
  },
  {
    icon: Leaf,
    title: "Carbon Footprint",
    description: "See your CO₂ emissions and environmental impact in clear, actionable terms.",
    color: "from-green-500 to-emerald-600",
    bg: "bg-green-50 dark:bg-green-950/40",
  },
  {
    icon: Shield,
    title: "Offline-First",
    description: "Works without internet. Your data stays private — stored only on your device.",
    color: "from-orange-500 to-amber-600",
    bg: "bg-orange-50 dark:bg-orange-950/40",
  },
  {
    icon: Zap,
    title: "What-If Simulator",
    description: "Drag sliders to instantly simulate changes in usage and see bill impact.",
    color: "from-pink-500 to-rose-600",
    bg: "bg-pink-50 dark:bg-pink-950/40",
  },
];

const stats = [
  { value: "14+", label: "Indian States", suffix: "" },
  { value: "23", label: "Appliances", suffix: "+" },
  { value: "15", label: "Accuracy", suffix: "% error max" },
  { value: "2", label: "Calc time", suffix: "sec" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-bg relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative">
          {/* Eyebrow tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-sm font-medium mb-8 animate-fade-in">
            <Zap className="w-3.5 h-3.5" fill="currentColor" />
            AI-Powered Electricity Bill Advisor for India
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground mb-6 animate-slide-up">
            Don&apos;t just calculate
            <br />
            <span className="gradient-text">your bill. Control it.</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in">
            Add your appliances, pick your state tariff, and instantly see your electricity bill —
            with personalized tips to cut costs by up to <strong>30%</strong>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link href="/dashboard" className="btn-primary text-base px-8 py-4 rounded-2xl">
              Start Estimating
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/insights" className="btn-secondary text-base px-8 py-4 rounded-2xl">
              View Insights
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="solid-card p-5 text-center">
                <div className="text-3xl font-black gradient-text">
                  {stat.value}
                  <span className="text-base">{stat.suffix}</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything you need to
            <span className="gradient-text"> save more</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A complete toolkit to understand, estimate, and reduce your electricity costs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => (
            <div key={feat.title} className="solid-card p-6 group">
              <div className={`w-12 h-12 rounded-xl ${feat.bg} flex items-center justify-center mb-4`}>
                <div className={`w-6 h-6 bg-gradient-to-br ${feat.color} rounded-lg flex items-center justify-center`}>
                  <feat.icon className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{feat.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl p-10 text-center"
               style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #1e40af 100%)" }}>
            <div className="absolute inset-0 opacity-20"
                 style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Ready to cut your electricity bill?
              </h2>
              <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of Indian households saving money every month.
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
              >
                Calculate My Bill
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>© 2025 SmartElec Estimator · Built for Indian households · No data is sent to any server</p>
      </footer>
    </div>
  );
}
