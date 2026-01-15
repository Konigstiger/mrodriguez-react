// profile.ts

import type {
  Profile,
  ExperienceItem,
  ExperienceProject,
  TechWeight,
} from "../shared/types";

import { API_BASE_URL } from "../config";

/* ---------- Tech normalization ---------- */

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
      const name =
        typeof item.name === "string" ? item.name.trim() : "";

      const weight =
        typeof item.weight === "number" && item.weight > 0
          ? item.weight
          : 1;

      if (!name) continue;
      map.set(name, (map.get(name) ?? 0) + weight);
    }
  }

  return Array.from(map.entries()).map(([name, weight]) => ({
    name,
    weight,
  }));
}

/* ---------- Project normalization ---------- */

function normalizeProjects(job: ExperienceItem): ExperienceProject[] {
  // New structure: projects[]
  if (Array.isArray(job.projects) && job.projects.length > 0) {
    return job.projects.map((p) => ({
      ...p,
      tech: normalizeTech((p as any).tech),
    }));
  }

  // Legacy structure: pills + details
  return [
    {
      id: `${job.id}-main`,
      name: "Main work",
      client: null,
      tech: normalizeTech(job.pills),
      highlights: job.details ?? [],
    },
  ];
}

/* ---------- Profile normalization ---------- */

function normalizeProfile(raw: any): Profile {
  const experience: ExperienceItem[] = Array.isArray(raw?.experience)
    ? raw.experience
    : [];

  const normalizedExperience = experience.map((job) => ({
    ...job,
    projects: normalizeProjects(job),
  }));

  return {
    ...raw,
    experience: normalizedExperience,
  } as Profile;
}

/* ---------- Public API ---------- */

export async function getProfile(): Promise<Profile> {
  const res = await fetch(`${API_BASE_URL}/api/profile`);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Profile fetch failed (${res.status}): ${text}`);
  }

  const raw = await res.json();
  return normalizeProfile(raw);
}
