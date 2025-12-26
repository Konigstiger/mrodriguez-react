import { useMemo, useState } from "react";
import type { ExperienceItem, ExperienceProject } from "../shared/types";
import SectionHeader from "./SectionHeader";
import Pill from "./Pill";

interface Props {
  experience: ExperienceItem[];
}

function formatYM(ym?: string) {
  if (!ym) return "Present";
  return ym; // already YYYY-MM in your data
}

function normalizeProjects(job: ExperienceItem): ExperienceProject[] {
  // New structure
  if (job.projects && job.projects.length > 0) return job.projects;

  // Backward compatible fallback (old structure becomes a single project)
  const tech = job.pills ?? [];
  const highlights = job.details ?? [];
  return [
    {
      id: `${job.id}-main`,
      name: "Main work",
      client: null,
      tech,
      highlights
    }
  ];
}

export default function WorkExperienceSection({ experience }: Props) {
  // Sort by dateStart descending
  const sorted = useMemo(
    () =>
      [...experience].sort((a, b) =>
        (b.dateStart ?? "").localeCompare(a.dateStart ?? "")
      ),
    [experience]
  );

  return (
    <div className="bg-slate-900/80 shadow-xl border border-slate-700 rounded-xl p-5 xl:p-6">
      <SectionHeader title="Work Experience" />

      <div className="relative mt-4 border-l border-slate-700 ml-3">
        {sorted.map((job) => {
          const projects = normalizeProjects(job);
          const hasManyProjects = projects.length > 1;

          return (
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
                    {formatYM(job.dateStart)} → {formatYM(job.dateEnd)}
                  </p>
                </div>

                {/* Projects */}
                <div className="mt-4 space-y-2">
                  {hasManyProjects ? (
                    <ProjectsAccordion jobId={job.id} projects={projects} />
                  ) : (
                    <ProjectCard project={projects[0]} forceOpen />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProjectsAccordion({
  projects
}: {
  jobId: string;
  projects: ExperienceProject[];
}) {
  const [openId, setOpenId] = useState<string>(projects[0]?.id ?? "");

  return (
    <div className="space-y-2">
      {projects.map((p) => {
        const isOpen = p.id === openId;
        return (
          <div
            key={p.id}
            className="rounded-lg border border-slate-700/60 bg-slate-950/20"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? "" : p.id)}
              className="w-full px-3 py-2 flex items-start justify-between gap-4 text-left"
            >
              <div>
                <div className="text-sm font-semibold text-slate-100">
                  {p.name}
                  {p.client ? (
                    <span className="text-slate-400 font-normal">
                      {" "}
                      · {p.client}
                    </span>
                  ) : null}
                </div>
              </div>

              <span className="text-slate-400 text-sm leading-none mt-0.5">
                {isOpen ? "–" : "+"}
              </span>
            </button>

            {isOpen ? (
              <div className="px-3 pb-3">
                <ProjectBody project={p} />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function ProjectCard({
  project
}: {
  project: ExperienceProject;
  forceOpen?: boolean;
}) {
  return (
    <div className="rounded-lg border border-slate-700/60 bg-slate-950/20 px-3 py-3">
      <div className="text-sm font-semibold text-slate-100">
        {project.name}
        {project.client ? (
          <span className="text-slate-400 font-normal"> · {project.client}</span>
        ) : null}
      </div>

      <div className="mt-2">
        <ProjectBody project={project} />
      </div>
    </div>
  );
}

function ProjectBody({ project }: { project: ExperienceProject }) {
  const tech = project.tech ?? [];
  const highlights = project.highlights ?? [];

  return (
    <>
      {tech.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tech.map((t) => (
            <Pill key={t} text={t} />
          ))}
        </div>
      )}

      {highlights.length > 0 && (
        <ul className="mt-3 list-disc list-inside text-sm text-slate-200 space-y-1.5 leading-relaxed">
          {highlights.map((d, idx) => (
            <li key={idx}>{d}</li>
          ))}
        </ul>
      )}
    </>
  );
}
