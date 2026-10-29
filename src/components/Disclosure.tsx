interface DisclosureProps {
  children: React.ReactNode;
  className?: string;
}

export default function Disclosure({ children, className = '' }: DisclosureProps) {
  return (
    <p
      className={`flex items-start gap-2 rounded-[6px] border border-line bg-bg px-3.5 py-2.5 text-xs leading-relaxed text-muted ${className}`}
    >
      <span className="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-highlight" aria-hidden />
      <span>{children}</span>
    </p>
  );
}
