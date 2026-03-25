import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "Smart Electricity Bill Estimator & Savings Advisor",
  description: "Don't just calculate your bill. Control it. AI-powered electricity bill estimator with savings insights for Indian households.",
  keywords: ["electricity bill", "electricity calculator", "power consumption", "energy savings", "India tariff"],
  openGraph: {
    title: "Smart Electricity Bill Estimator & Savings Advisor",
    description: "Don't just calculate your bill. Control it.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
