export interface SkillLevel {
  name: string;
  level: number; // 1..5
}

export interface Skills {
  soft: SkillLevel[];
  technical: SkillLevel[];
  interests: string[];
}

export type Profile = {
  schemaVersion?: number; // optional for backward compatibility
  name: string;
  headline: string;
  location: string;
  shortBio: string;
  links: Record<string, string>;
  skills: any;

  experience: ExperienceItem[];
};

export type ExperienceProject = {
  id: string;
  name: string;
  client?: string | null;
  tech?: string[];
  highlights?: string[];
};

export type ExperienceItem = {
  id: string;
  company: string;
  title: string;
  dateStart: string;
  dateEnd: string;
  location: string;

  // OLD (optional now)
  pills?: string[];
  details?: string[];

  // NEW
  projects?: ExperienceProject[];
};



