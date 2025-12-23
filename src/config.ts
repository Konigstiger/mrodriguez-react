// src/config.ts
export const API_BASE_URL = (() => {
  const v = import.meta.env.VITE_API_BASE_URL;
  if (!v) throw new Error("Missing VITE_API_BASE_URL");
  return v;
})();
