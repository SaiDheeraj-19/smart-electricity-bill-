// State-wise electricity tariff data for India
export interface TariffSlab {
  min: number;
  max: number | null; // null means unlimited
  ratePerUnit: number;
}

export interface StateTariff {
  state: string;
  code: string;
  fixedCharge: number; // per month
  slabs: TariffSlab[];
  taxPercent: number;
}

export const STATE_TARIFFS: StateTariff[] = [
  {
    state: "Andhra Pradesh",
    code: "AP",
    fixedCharge: 30,
    taxPercent: 0,
    slabs: [
      { min: 0, max: 50, ratePerUnit: 1.45 },
      { min: 51, max: 100, ratePerUnit: 2.6 },
      { min: 101, max: 200, ratePerUnit: 3.76 },
      { min: 201, max: 300, ratePerUnit: 5.66 },
      { min: 301, max: null, ratePerUnit: 7.1 },
    ],
  },
  {
    state: "Delhi",
    code: "DL",
    fixedCharge: 125,
    taxPercent: 5,
    slabs: [
      { min: 0, max: 200, ratePerUnit: 3 },
      { min: 201, max: 400, ratePerUnit: 4.5 },
      { min: 401, max: 800, ratePerUnit: 6.5 },
      { min: 801, max: 1200, ratePerUnit: 7 },
      { min: 1201, max: null, ratePerUnit: 8 },
    ],
  },
  {
    state: "Gujarat",
    code: "GJ",
    fixedCharge: 50,
    taxPercent: 5,
    slabs: [
      { min: 0, max: 50, ratePerUnit: 1.85 },
      { min: 51, max: 250, ratePerUnit: 2.95 },
      { min: 251, max: 500, ratePerUnit: 3.3 },
      { min: 501, max: null, ratePerUnit: 4.15 },
    ],
  },
  {
    state: "Karnataka",
    code: "KA",
    fixedCharge: 50,
    taxPercent: 0,
    slabs: [
      { min: 0, max: 30, ratePerUnit: 0 },
      { min: 31, max: 100, ratePerUnit: 3.15 },
      { min: 101, max: 200, ratePerUnit: 6.0 },
      { min: 201, max: 500, ratePerUnit: 7.45 },
      { min: 501, max: null, ratePerUnit: 8.3 },
    ],
  },
  {
    state: "Kerala",
    code: "KL",
    fixedCharge: 40,
    taxPercent: 0,
    slabs: [
      { min: 0, max: 50, ratePerUnit: 1.5 },
      { min: 51, max: 100, ratePerUnit: 2.5 },
      { min: 101, max: 150, ratePerUnit: 4.0 },
      { min: 151, max: 200, ratePerUnit: 5.8 },
      { min: 201, max: 300, ratePerUnit: 7.0 },
      { min: 301, max: null, ratePerUnit: 7.5 },
    ],
  },
  {
    state: "Maharashtra",
    code: "MH",
    fixedCharge: 95,
    taxPercent: 16,
    slabs: [
      { min: 0, max: 100, ratePerUnit: 2.79 },
      { min: 101, max: 300, ratePerUnit: 4.63 },
      { min: 301, max: 500, ratePerUnit: 8.71 },
      { min: 501, max: null, ratePerUnit: 10.92 },
    ],
  },
  {
    state: "Rajasthan",
    code: "RJ",
    fixedCharge: 90,
    taxPercent: 5,
    slabs: [
      { min: 0, max: 50, ratePerUnit: 3.0 },
      { min: 51, max: 150, ratePerUnit: 4.75 },
      { min: 151, max: 300, ratePerUnit: 6.0 },
      { min: 301, max: 500, ratePerUnit: 6.5 },
      { min: 501, max: null, ratePerUnit: 7.0 },
    ],
  },
  {
    state: "Tamil Nadu",
    code: "TN",
    fixedCharge: 30,
    taxPercent: 0,
    slabs: [
      { min: 0, max: 100, ratePerUnit: 0 },
      { min: 101, max: 200, ratePerUnit: 1.5 },
      { min: 201, max: 500, ratePerUnit: 3.5 },
      { min: 501, max: null, ratePerUnit: 4.6 },
    ],
  },
  {
    state: "Telangana",
    code: "TS",
    fixedCharge: 30,
    taxPercent: 0,
    slabs: [
      { min: 0, max: 50, ratePerUnit: 1.45 },
      { min: 51, max: 100, ratePerUnit: 2.6 },
      { min: 101, max: 200, ratePerUnit: 3.76 },
      { min: 201, max: 300, ratePerUnit: 5.56 },
      { min: 301, max: null, ratePerUnit: 7.0 },
    ],
  },
  {
    state: "Uttar Pradesh",
    code: "UP",
    fixedCharge: 75,
    taxPercent: 5,
    slabs: [
      { min: 0, max: 100, ratePerUnit: 3.35 },
      { min: 101, max: 150, ratePerUnit: 3.85 },
      { min: 151, max: 300, ratePerUnit: 5.0 },
      { min: 301, max: null, ratePerUnit: 5.5 },
    ],
  },
  {
    state: "West Bengal",
    code: "WB",
    fixedCharge: 45,
    taxPercent: 0,
    slabs: [
      { min: 0, max: 25, ratePerUnit: 4.21 },
      { min: 26, max: 75, ratePerUnit: 5.44 },
      { min: 76, max: 150, ratePerUnit: 6.24 },
      { min: 151, max: 275, ratePerUnit: 7.29 },
      { min: 276, max: null, ratePerUnit: 8.29 },
    ],
  },
  {
    state: "Punjab",
    code: "PB",
    fixedCharge: 60,
    taxPercent: 5,
    slabs: [
      { min: 0, max: 100, ratePerUnit: 3.49 },
      { min: 101, max: 300, ratePerUnit: 5.0 },
      { min: 301, max: 500, ratePerUnit: 6.5 },
      { min: 501, max: null, ratePerUnit: 7.0 },
    ],
  },
  {
    state: "Madhya Pradesh",
    code: "MP",
    fixedCharge: 75,
    taxPercent: 5,
    slabs: [
      { min: 0, max: 30, ratePerUnit: 3.82 },
      { min: 31, max: 100, ratePerUnit: 4.11 },
      { min: 101, max: 150, ratePerUnit: 5.48 },
      { min: 151, max: 300, ratePerUnit: 6.0 },
      { min: 301, max: null, ratePerUnit: 6.5 },
    ],
  },
  {
    state: "Haryana",
    code: "HR",
    fixedCharge: 65,
    taxPercent: 5,
    slabs: [
      { min: 0, max: 50, ratePerUnit: 2.5 },
      { min: 51, max: 100, ratePerUnit: 2.75 },
      { min: 101, max: 150, ratePerUnit: 5.25 },
      { min: 151, max: 250, ratePerUnit: 5.75 },
      { min: 251, max: null, ratePerUnit: 6.3 },
    ],
  },
];

export const DEFAULT_TARIFF: StateTariff = {
  state: "Standard (Generic)",
  code: "GEN",
  fixedCharge: 50,
  taxPercent: 5,
  slabs: [
    { min: 0, max: 100, ratePerUnit: 3.0 },
    { min: 101, max: 200, ratePerUnit: 5.0 },
    { min: 201, max: null, ratePerUnit: 8.0 },
  ],
};
