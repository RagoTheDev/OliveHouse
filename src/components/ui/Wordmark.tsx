import { Link } from "react-router-dom";

interface WordmarkProps {
  className?: string;
  light?: boolean;
  size?: "sm" | "md" | "lg";
}

export function OliveLeaf({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      <path
        d="M26.5 5.5C19 6 11.5 11.5 8.5 19.5 7.2 23 7 26 7.5 26.5c.5.5 3.5.3 7-1 8-3 13.5-10.5 12-20z"
        fill="currentColor"
        opacity="0.9"
      />
      <path d="M8 26.5C13 20 18 14.5 26 6.5" stroke="var(--color-ivory)" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

const sizes = { sm: "text-[1.15rem]", md: "text-[1.35rem]", lg: "text-[2rem]" };

export function Wordmark({ className = "", light = false, size = "md" }: WordmarkProps) {
  return (
    <Link
      to="/"
      aria-label="Olive House — home"
      className={`inline-flex items-center gap-2.5 font-serif font-medium tracking-[0.02em] ${light ? "text-ivory" : "text-olive-900"} ${sizes[size]} ${className}`}
    >
      <OliveLeaf className={`${size === "lg" ? "size-8" : "size-6"} ${light ? "text-sand" : "text-olive"}`} />
      <span>
        Olive <span className="italic font-light">House</span>
      </span>
    </Link>
  );
}
