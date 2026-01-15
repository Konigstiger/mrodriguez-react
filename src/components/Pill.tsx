// Pill.tsx
import { getTechColorHex, rgba } from "../shared/techColors"; // adjust path if needed

interface PillProps {
  text: string;
}

export default function Pill({ text }: PillProps) {
  const hex = getTechColorHex(text);

  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs border"
      style={{
        backgroundColor: rgba(hex, 0.16),
        borderColor: rgba(hex, 0.45),
        color: "rgba(248,250,252,0.95)",
      }}
    >
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: hex }} />
      {text}
    </span>
  );
}
