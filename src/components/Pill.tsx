interface PillProps {
  text: string;
}

export default function Pill({ text }: PillProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-100 border border-slate-600">
      {text}
    </span>
  );
}
