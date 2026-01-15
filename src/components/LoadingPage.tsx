// src/components/LoadingPage.tsx
export default function LoadingPage() {
  return (
    <main className="relative flex min-h-screen w-screen items-center justify-center bg-slate-950 text-slate-100 overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="pointer-events-none absolute -inset-40 bg-linear-to-br from-sky-600/10 via-slate-900 to-indigo-800/20 blur-3xl"
        aria-hidden="true"
      />

      {/* Center card */}
      <div className="relative w-full max-w-xl px-10 py-10 rounded-3xl border border-slate-700/70 bg-slate-900/80 shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
        {/* Inner glow */}
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-40 blur-2xl bg-linear-to-r from-sky-500/40 via-cyan-400/30 to-indigo-500/40"
          aria-hidden="true"
        />

        <div className="relative flex flex-col items-center gap-6">
          {/* Spinner + favicon */}
          <div className="relative">
            {/* Spinner ring */}
            <div className="h-24 w-24 rounded-full border-[6px] border-sky-500/70 border-t-transparent animate-spin" />

            {/* Favicon container */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-14 w-14 rounded-full overflow-hidden shadow-md bg-slate-900/60 border border-slate-700/50 flex items-center justify-center">
                <img
                  src="/duck.png"
                  alt="Logo"
                  className="h-10 w-10 opacity-95"
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-lg font-medium text-slate-50">
              Loading Profile
            </p>
            <p className="text-xs text-slate-400 animate-pulse">
              Fetching details from Azure…
            </p>
          </div>

          {/* Progress bar */}
          <div className="mt-2 h-1.5 w-64 rounded-full bg-slate-800/80 overflow-hidden">
            <div className="h-full w-1/2 rounded-full bg-sky-500 animate-[loadingBar_1.2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>
        {`
          @keyframes loadingBar {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(0%); }
            100% { transform: translateX(150%); }
          }
          .animate-[loadingBar_1.2s_ease-in-out_infinite] {
            animation: loadingBar 1.2s ease-in-out infinite;
          }
        `}
      </style>
    </main>
  );
}
