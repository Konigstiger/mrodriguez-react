export interface SkillLevel {
  name: string;
  level: number; // 1..5
}

export interface Skills {
  soft: SkillLevel[];
  technical: SkillLevel[];
  interests: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  title: string;
  dateStart: string;
  dateEnd: string;
  location: string;
  pills: string[];
  details: string[];
}

export interface Profile {
  name: string;
  headline: string;
  location: string;
  shortBio: string;
  links: Record<string, string>;
  skills: Skills;
  experience: ExperienceItem[];
}
