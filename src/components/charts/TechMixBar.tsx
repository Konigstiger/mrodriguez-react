import type { TechWeight } from "../../shared/types";
import { getTechColorHex } from "../../shared/techColors";

type Props = {
  tech: TechWeight[];
};

export function TechMixBar({ tech }: Props) {
  if (!tech || tech.length === 0) return null;

  const total = tech.reduce((s, t) => s + t.weight, 0);

  return (
    <div className="rounded-xl border border-slate-700/70 bg-slate-950/30 p-2 w-[200px]">
      <div className="flex h-4 w-full overflow-hidden rounded-md">
        {tech.map((t) => {
          const pct = (t.weight / total) * 100;
          return (
            <div
              key={t.name}
              title={`${t.name}`}
              style={{
                width: `${pct}%`,
                backgroundColor: getTechColorHex(t.name),
              }}
              className="h-full"
            />
          );
        })}
      </div>
    </div>
  );
}
