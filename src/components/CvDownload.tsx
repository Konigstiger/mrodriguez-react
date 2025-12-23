import { useEffect, useState } from "react";

// retrieve the url for the API (Azure Function) from environment variable on the SPA on Azure
import { API_BASE_URL } from "../config";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string,
        options: {
          sitekey: string;
          callback: (token: string) => void;
        }
      ) => void;
      reset?: (widgetId?: string) => void;
    };
  }
}

// read Turnstile Site Key (public)
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

if (!TURNSTILE_SITE_KEY) {
  throw new Error("TURNSTILE_SITE_KEY is not defined");
}


export default function CvDownload() {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const url = `${API_BASE_URL}/api/cv`;

  useEffect(() => {
    const containerSelector = "#turnstile-cv-container";

    const interval = setInterval(() => {
      if (window.turnstile && document.querySelector(containerSelector)) {
        window.turnstile.render(containerSelector, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (t: string) => {
            setToken(t);
            setError(null);
          },
        });
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const handleDownload = async () => {
    if (!token) {
      setError("Please complete the verification first.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Download failed (${response.status}): ${text}`);
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = "[CV]Mariano-Rodriguez.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objectUrl);
    } catch (e: any) {
      setError("Error downloading CV. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 rounded-lg border border-slate-700/70 bg-slate-900/70 p-4">
      <h2 className="text-lg font-semibold mb-3">Download CV (PDF)</h2>

      <p className="text-xs text-slate-300 mb-3">
        To avoid automated scraping, please complete this quick verification.
      </p>

      <div id="turnstile-cv-container" className="flex justify-center mb-3" />

      {error && (
        <p className="text-red-400 text-xs text-center mb-2">{error}</p>
      )}

      <button
        className="w-full py-2 rounded bg-sky-600 hover:bg-sky-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-sm font-medium"
        disabled={!token || loading}
        onClick={handleDownload}
      >
        {loading ? "Preparing..." : "Download CV"}
      </button>
    </div>
  );
}
