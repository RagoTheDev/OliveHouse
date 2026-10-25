import { useRef, type ComponentPropsWithoutRef, type MouseEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { gsap } from "@/lib/motion";
import { useCanHover } from "@/hooks/useMediaQuery";

type Variant = "primary" | "ivory" | "outline" | "outline-light" | "ghost" | "ghost-light";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  arrow?: "right" | "external" | "none";
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonProps = BaseProps & ComponentPropsWithoutRef<"button"> & { to?: undefined; href?: undefined };
type LinkProps = BaseProps & { to: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "to">;
type AnchorProps = BaseProps & { href: string } & ComponentPropsWithoutRef<"a">;

const base =
  "group relative inline-flex items-center justify-center gap-3 rounded-full font-sans font-medium tracking-[0.04em] transition-[background-color,color,border-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] select-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-olive text-ivory hover:bg-olive-900 border border-olive hover:border-olive-900",
  ivory: "bg-ivory text-olive-900 hover:bg-white border border-ivory",
  outline: "border border-charcoal/30 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory",
  "outline-light": "border border-ivory/40 text-ivory hover:bg-ivory hover:text-olive-900 hover:border-ivory",
  ghost: "text-charcoal hover:text-olive px-0!",
  "ghost-light": "text-ivory hover:text-sand px-0!",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[0.78rem]",
  md: "h-12 px-7 text-[0.84rem]",
  lg: "h-14 px-9 text-[0.9rem]",
};

function useMagnetic(enabled: boolean) {
  const ref = useRef<HTMLElement | null>(null);
  const canHover = useCanHover();
  const active = enabled && canHover;

  const onMove = (e: MouseEvent) => {
    if (!active || !ref.current) return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    gsap.to(el, { x: x * 0.22, y: y * 0.3, duration: 0.6, ease: "power3.out" });
  };
  const onLeave = () => {
    if (!active || !ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.5)" });
  };
  return { ref, onMove, onLeave };
}

function Inner({ children, arrow }: { children: ReactNode; arrow: BaseProps["arrow"] }) {
  return (
    <>
      <span className="relative">{children}</span>
      {arrow === "right" && (
        <ArrowRight
          className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
      {arrow === "external" && (
        <ArrowUpRight
          className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      )}
    </>
  );
}

export function Button(props: ButtonProps | LinkProps | AnchorProps) {
  const { variant = "primary", size = "md", arrow = "none", magnetic = true, className = "", children, ...rest } = props;
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const { ref, onMove, onLeave } = useMagnetic(magnetic && !variant.startsWith("ghost"));

  if ("to" in rest && rest.to) {
    const { to, ...linkRest } = rest as LinkProps;
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        to={to}
        className={cls}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        {...(linkRest as object)}
      >
        <Inner arrow={arrow}>{children}</Inner>
      </Link>
    );
  }
  if ("href" in rest && rest.href) {
    const anchorRest = rest as AnchorProps;
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={cls}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        {...anchorRest}
      >
        <Inner arrow={arrow}>{children}</Inner>
      </a>
    );
  }
  const buttonRest = rest as ButtonProps;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      className={cls}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...buttonRest}
    >
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}
