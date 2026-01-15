// src/shared/techColors.ts

const OVERRIDES: Record<string, string> = {
  // Put here the exact colors you want for the most common techs
  "azure": "#0ea5e9",
  "sql server": "#f59e0b",
  "sql": "#f59e0b",
  "c#": "#a855f7",
  ".net": "#4f46e5",
  "net": "#4f46e5",
  "dotnet": "#4f46e5",
  "react": "#22c55e",
  "nintex k2": "#10b981",
  "k2": "#10b981",
};

const PALETTE = [
  "#4f46e5",
  "#0ea5e9",
  "#10b981",
  "#f59e0b",
  "#a855f7",
] as const;

function hashToIndex(input: string, modulo: number) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  return hash % modulo;
}

function normalizeKey(name: string) {
  return (name ?? "").trim().toLowerCase();
}

export function getTechColorHex(name: string): string {
  const key = normalizeKey(name);
  if (OVERRIDES[key]) return OVERRIDES[key];
  const idx = hashToIndex(key, PALETTE.length);
  return PALETTE[idx];
}

function hexToRgb(hex: string) {
  const h = hex.replace("#", "").trim();
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function rgba(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
