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
    <div className="bg-slate-900/80 shadow-xl border border-slate-700 rounded-xl p-5 xl:p-6">
      <SectionHeader title="Work Experience" />

      <div className="relative mt-3 border-l border-slate-700 ml-3">
        {sorted.map((job) => (
          <div key={job.id} className="mb-7 ml-4">
            {/* Timeline dot */}
            <div className="absolute -left-1.5 mt-2 h-3.5 w-3.5 rounded-full bg-sky-500 border-2 border-slate-900" />

            {/* Job card */}
            <div className="bg-slate-900/90 rounded-lg border border-slate-700 p-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2">
                <div>
                  <h3 className="text-base xl:text-lg font-semibold text-slate-50">
                    {job.title}
                  </h3>
                  <p className="text-sm text-slate-300">
                    {job.company} · {job.location}
                  </p>
                </div>
                <p className="text-sm text-slate-400">
                  {job.dateStart} → {job.dateEnd}
                </p>
              </div>

              {/* Pills (tech tags) */}
              {job.pills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {job.pills.map((p) => (
                    <Pill key={p} text={p} />
                  ))}
                </div>
              )}

              {/* Bullet points */}
              {job.details.length > 0 && (
                <ul className="mt-3 list-disc list-inside text-sm text-slate-200 space-y-1.5 leading-relaxed">
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
