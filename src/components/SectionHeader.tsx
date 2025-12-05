interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="mb-3">
      <h2 className="text-xl xl:text-2xl font-semibold text-slate-100 tracking-wide">
        {title}
      </h2>
      <div className="h-px w-16 bg-sky-500 mt-1" />
    </div>
  );
}
