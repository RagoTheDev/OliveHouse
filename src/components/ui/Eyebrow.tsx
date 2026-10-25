import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  /** Show a short rule before the label. */
  rule?: boolean;
  light?: boolean;
}

export function Eyebrow({ children, className = "", rule = true, light = false }: EyebrowProps) {
  return (
    <span className={`eyebrow inline-flex items-center gap-3 ${light ? "text-sand" : "text-olive-600"} ${className}`}>
      {rule && <span aria-hidden="true" className={`h-px w-8 ${light ? "bg-sand/60" : "bg-olive/40"}`} />}
      {children}
    </span>
  );
}
