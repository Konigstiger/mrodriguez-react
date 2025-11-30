import type { Skills } from "../shared/types";
import SectionHeader from "./SectionHeader";
import SkillBar from "./SkillBar";
import Pill from "./Pill";

interface SkillCardProps {
  skills: Skills;
}

export default function SkillCard({ skills }: SkillCardProps) {
  return (
    <div className="bg-slate-900/80 rounded border border-slate-700 overflow-hidden">
      {/* Soft Skills */}
      <div className="bg-slate-800/90 p-4 border-b border-slate-700">
        <SectionHeader title="Soft Skills" />
        {skills.soft.map((s) => (
          <SkillBar key={s.name} skill={s} />
        ))}
      </div>

      {/* Tech Skills */}
      <div className="bg-slate-800/90 p-4 border-b border-slate-700">
        <SectionHeader title="Tech Skills" />
        {skills.technical.map((s) => (
          <SkillBar key={s.name} skill={s} />
        ))}
      </div>

      {/* Interests */}
      <div className="bg-slate-900 p-4">
        <SectionHeader title="Interests" />
        <div className="flex flex-wrap gap-2 mt-2">
          {skills.interests.map((i) => (
            <Pill key={i} text={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
