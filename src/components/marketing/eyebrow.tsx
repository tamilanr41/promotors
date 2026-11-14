import { cn } from "@/lib/utils";

export default function Eyebrow({
  children,
  light = false,
  className = "",
}: {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.24em]",
        light ? "text-bone/70" : "text-brass-dark",
        className
      )}
    >
      <span className={cn("h-px w-8", light ? "bg-bone/40" : "bg-brass")} />
      {children}
    </div>
  );
}