import type { SkillLevel } from "../shared/types";

interface SkillBarProps {
  skill: SkillLevel;
}

export default function SkillBar({ skill }: SkillBarProps) {
  const pct = Math.min(100, Math.max(0, (skill.level / 5) * 100));

  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs text-slate-200 mb-1">
        <span>{skill.name}</span>
        <span>{skill.level}/5</span>
      </div>
      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-sky-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
