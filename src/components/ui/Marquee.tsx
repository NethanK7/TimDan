export default function Marquee({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  // Duplicated once so the -50% keyframe loops seamlessly
  const row = [...items, ...items];

  return (
    <div className={`marquee-host relative overflow-hidden ${className}`}>
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-[clamp(1.6rem,4vw,3.2rem)] text-bone/70">
              {item}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
