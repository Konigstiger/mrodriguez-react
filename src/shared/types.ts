// types.ts

export type TechWeight = {
  name: string;
  weight: number;
};

export type ExperienceProject = {
  id: string;
  name: string;
  client?: string | null;

  // normalized in UI/API layer
  tech?: TechWeight[];

  highlights?: string[];
};

export type ExperienceItem = {
  id: string;
  company: string;
  title: string;
  location: string;

  dateStart: string;         // YYYY-MM
  dateEnd?: string | null;   // YYYY-MM or null

  projects?: ExperienceProject[];

  // legacy fallback (still supported)
  pills?: string[];
  details?: string[];
};

// Keep the rest of your Profile type as you have it.
// At minimum, it must include experience:
export type Profile = {
  schemaVersion?: number;
  name: string;
  headline?: string;
  location?: string;
  shortBio?: string;

  skills: any; // keep your current real skills typing if you already have it
  experience: ExperienceItem[];

  links: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
};

export interface SkillLevel {
  name: string;
  level: number; // 1..5
}

export interface Skills {
  soft: SkillLevel[];
  technical: SkillLevel[];
  interests: string[];
}