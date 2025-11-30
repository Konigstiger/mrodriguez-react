interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="mb-2">
      <h2 className="text-lg font-semibold text-slate-100 tracking-wide">
        {title}
      </h2>
      <div className="h-px w-12 bg-sky-500 mt-1" />
    </div>
  );
}
