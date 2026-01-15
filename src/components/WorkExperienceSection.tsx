import { useState } from "react";

import type { ExperienceItem, ExperienceProject, TechWeight } from "../shared/types"; // adjust path if needed
import Pill from "./Pill"; // adjust path if needed
//import { TechMixDonut } from "./charts/TechMixDonut"; // adjust path if needed
import { TechMixBar } from "./charts/TechMixBar";

type Props = {
  experience: ExperienceItem[];
};

function normalizeYM(ym?: string | null): string | null {
  const v = (ym ?? "").trim();
  return v.length === 0 ? null : v;
}

function formatRange(start?: string | null, end?: string | null) {
  const s = normalizeYM(start) ?? "";
  const e = normalizeYM(end);
  return e ? `${s} → ${e}` : `${s} → Present`;
}

type RawTech = string | { name?: unknown; weight?: unknown };

function normalizeTech(raw: unknown): TechWeight[] {
  if (!Array.isArray(raw)) return [];

  const map = new Map<string, number>();

  for (const item of raw as RawTech[]) {
    // OLD: "React"
    if (typeof item === "string") {
      const name = item.trim();
      if (!name) continue;
      map.set(name, (map.get(name) ?? 0) + 1);
      continue;
    }

    // NEW: { name, weight }
    if (item && typeof item === "object") {
      const name = typeof item.name === "string" ? item.name.trim() : "";
      const weight =
        typeof item.weight === "number" && Number.isFinite(item.weight) && item.weight > 0
          ? item.weight
          : 1;

      if (!name) continue;
      map.set(name, (map.get(name) ?? 0) + weight);
    }
  }

  return Array.from(map.entries()).map(([name, weight]) => ({ name, weight }));
}

function normalizeProjects(job: ExperienceItem): ExperienceProject[] {
  // New structure: normalize each project.tech (supports old or new formats)
  if (job.projects && job.projects.length > 0) {
    return job.projects.map((p) => ({
      ...p,
      tech: normalizeTech((p as any).tech),
    }));
  }

  // Backward compatible fallback (old structure becomes a single project)
  const tech = normalizeTech((job as any).pills ?? []);
  const highlights = (job as any).details ?? [];

  return [
    {
      id: `${job.id}-main`,
      name: "Main work",
      client: null,
      tech,
      highlights,
    },
  ];
}

function ProjectBody({ project }: { project: ExperienceProject }) {
  const tech = project.tech ?? [];
  const highlights = project.highlights ?? [];

  return (
    <>
      {/* OPTION A: Compact donut + pills in a single row */}
      {tech.length > 0 && (
        <div className="flex items-center gap-3">
          {/* <TechMixDonut tech={tech} compact /> */}
            <TechMixBar tech={tech} />

          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <Pill key={t.name} text={t.name} />
            ))}
          </div>
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

function ProjectCard({ project }: { project: ExperienceProject }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-3 rounded-xl border border-slate-700/60 bg-slate-950/20">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left"
      >
        <div className="min-w-0">
          <div className="text-sm font-semibold text-slate-100 truncate">
            {project.name}
          </div>
          {project.client && (
            <div className="text-sm text-slate-400 truncate">{project.client}</div>
          )}
        </div>

        <div className="text-slate-400 select-none">{open ? "−" : "+"}</div>
      </button>

      {open && (
        <div className="px-4 pb-4">
          <ProjectBody project={project} />
        </div>
      )}
    </div>
  );
}

function ProjectsAccordion({ projects }: { projects: ExperienceProject[] }) {
  if (!projects || projects.length === 0) return null;

  // If only one project, render it open by default (no accordion UX needed)
  if (projects.length === 1) {
    return (
      <div className="mt-3 rounded-xl border border-slate-700/60 bg-slate-950/20 px-4 py-4">
        <ProjectBody project={projects[0]} />
      </div>
    );
  }

  return (
    <div className="mt-3">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  );
}

export default function WorkExperienceSection({ experience }: Props) {
  if (!experience || experience.length === 0) return null;

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-100">Work Experience</h2>
        <div className="h-px bg-slate-700/70 mt-2" />
      </div>

      <div className="space-y-8">
        {experience.map((job) => {
          const projects = normalizeProjects(job);

          return (
            <div key={job.id} className="rounded-2xl border border-slate-700/60 bg-slate-950/20 p-5">
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <div className="text-lg font-semibold text-slate-100 truncate">
                    {job.title}
                  </div>
                  <div className="text-sm text-slate-300 truncate">
                    {job.company} · {job.location}
                  </div>
                </div>

                <div className="text-sm text-slate-400 whitespace-nowrap">
                  {formatRange(job.dateStart, job.dateEnd)}
                </div>
              </div>

              <ProjectsAccordion projects={projects} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
