import type { ExperienceItem } from "../shared/types";
import SectionHeader from "./SectionHeader";
import Pill from "./Pill";

interface Props {
  experience: ExperienceItem[];
}

export default function WorkExperienceSection({ experience }: Props) {
  // Sort by dateStart descending (simple string compare, assuming YYYY-MM format)
  const sorted = [...experience].sort((a, b) =>
    (b.dateStart ?? "").localeCompare(a.dateStart ?? "")
  );

  return (
    <div className="bg-slate-900/80 shadow-xl border border-slate-700 rounded p-4">
      <SectionHeader title="Work Experience" />

      <div className="relative mt-2 border-l border-slate-700 ml-3">
        {sorted.map((job) => (
          <div key={job.id} className="mb-6 ml-4">
            <div className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full bg-sky-500 border border-slate-900" />
            <div className="bg-slate-900/90 rounded border border-slate-700 p-3">
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1">
                <div>
                  <h3 className="text-sm font-semibold text-slate-50">
                    {job.title}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {job.company} · {job.location}
                  </p>
                </div>
                <p className="text-xs text-slate-400">
                  {job.dateStart} – {job.dateEnd}
                </p>
              </div>

              {/* Pills (tech tags) */}
              {job.pills.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {job.pills.map((p) => (
                    <Pill key={p} text={p} />
                  ))}
                </div>
              )}

              {/* Bullet points */}
              {job.details.length > 0 && (
                <ul className="mt-3 list-disc list-inside text-xs text-slate-200 space-y-1">
                  {job.details.map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
