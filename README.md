# ⚡ Smart Electricity Bill Estimator & Savings Advisor

> **"Don’t just calculate your bill. Control it."**

A premium, AI-enhanced web application designed to help Indian households estimate their electricity bills with high accuracy (≤15% error) and provide actionable insights to reduce costs.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Next.js](https://img.shields.io/badge/Frontend-Next.js%2015-black)
![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🎯 Project Goal

Most people find electricity bills confusing. This tool simplifies the complexity of slab-based tariffs and provides a "What-If" simulator to visualize how changing habits impacts your monthly expense.

## 🚀 Core Features

- **🏠 Appliance-Based Input**: Add appliances from a library of 23 presets (AC, Fridge, TV, etc.) or create custom ones.
- **📊 Real-Time Calculation**: Slab-based tariff calculation for **14+ Indian states** (Karnataka, Delhi, Maharashtra, etc.).
- **💡 Smart Insights Engine**: Personalized suggestions like *"Reduce AC by 1 hour → save ₹800/month"*.
- **🎛️ What-If Simulator**: Real-time sliders to instantly see how usage adjustments change your bill.
- **📉 Data Visualization**: Interactive Pie and Bar charts for consumption breakdown and seasonal projections.
- **🌱 Carbon Footprint Tracker**: Convert kWh usage into CO₂ emissions and tree-equivalents.
- **📵 Offline-First**: All data is stored in `LocalStorage`. No data ever leaves your device.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **State Management**: React Context & Hooks
- **Storage**: Browser LocalStorage

---

## 🏗️ Architecture

```text
src/
├── app/             # Next.js App Router (Pages & Layout)
├── components/      # UI Components (Form, Charts, Simulator, etc.)
├── context/         # Global state & Calculation Logic
├── lib/             # Logic Layer (Tariffs, Appliances, Calculator)
└── public/          # Static Assets
```

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ 
- npm / yarn / pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SaiDheeraj-19/electricity-bill-estimator.git
   cd electricity-bill-estimator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:3000`

---

## 🎨 UI/UX Philosophy

- **Apple-Level UI**: Minimalist design with glassmorphism, soft shadows (2xl), and smooth transitions.
- **Responsive**: Fully optimized for Mobile, Tablet, and Desktop.
- **Dark Mode**: Native support for dark/light mode preference.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for a sustainable and cost-effective future.**
