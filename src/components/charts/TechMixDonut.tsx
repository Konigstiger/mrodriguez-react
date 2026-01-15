import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import type { TechWeight } from "../../shared/types"; // adjust path if needed
import { getTechColorHex } from "../../shared/techColors"; // adjust path if needed

type Props = {
  tech: TechWeight[];
  /**
   * Compact = small horizontal "badge" version (recommended for cards)
   */
  compact?: boolean;
};

export function TechMixDonut({ tech, compact = false }: Props) {
  if (!tech || tech.length === 0) return null;

  // In compact mode we intentionally suppress tooltip/title to reduce noise.
  const showTooltip = !compact;

  return (
    <div
      className={[
        "rounded-xl border border-slate-700/70 bg-slate-950/30",
        compact ? "p-2" : "p-3",
      ].join(" ")}
      style={compact ? { maxWidth: 220 } : undefined}
    >
      {!compact && (
        <div className="mb-2 text-xs font-semibold text-slate-200">
          Tech Mix
        </div>
      )}

      {compact ? (
        // Compact: narrow and short, does not consume horizontal space
        <div className="h-[56px] w-[150px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={tech}
                dataKey="weight"
                nameKey="name"
                innerRadius="62%"
                outerRadius="92%"
                paddingAngle={2}
                stroke="rgba(15,23,42,0.6)"
                strokeWidth={2}
                isAnimationActive={false}
              >
                {tech.map((t) => (
                  <Cell key={t.name} fill={getTechColorHex(t.name)} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <>
          {/* Mobile: small (but still standalone) */}
          <div className="block sm:hidden h-[78px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={tech}
                  dataKey="weight"
                  nameKey="name"
                  innerRadius="62%"
                  outerRadius="92%"
                  paddingAngle={2}
                  stroke="rgba(15,23,42,0.6)"
                  strokeWidth={2}
                  isAnimationActive={false}
                >
                  {tech.map((t) => (
                    <Cell key={t.name} fill={getTechColorHex(t.name)} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Desktop+: larger */}
          <div className="hidden sm:block h-[120px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={tech}
                  dataKey="weight"
                  nameKey="name"
                  innerRadius="58%"
                  outerRadius="85%"
                  paddingAngle={3}
                  isAnimationActive
                  animationDuration={600}
                  stroke="rgba(15,23,42,0.6)"
                  strokeWidth={2}
                >
                  {tech.map((t) => (
                    <Cell key={t.name} fill={getTechColorHex(t.name)} />
                  ))}
                </Pie>

                {showTooltip && (
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const p = payload[0] as any;

                      return (
                        <div className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs shadow-lg">
                          <div className="font-semibold text-slate-100">
                            {p.name}
                          </div>
                          <div className="text-slate-300">weight: {p.value}</div>
                        </div>
                      );
                    }}
                  />
                )}
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
