import { useEffect, useRef, useState } from "react";

interface SectionNumProps {
  num: string;
  label: string;
  isDark?: boolean;
  isVisible?: boolean;
}

export default function SectionNum({ num, label, isDark = false }: SectionNumProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`absolute top-8 md:top-12 lg:top-16 left-4 md:left-6 lg:left-8 z-10 flex flex-col items-start gap-1 transition-all duration-700 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <span
        className={`text-[11px] md:text-xs font-bold tracking-[0.25em] leading-none ${
          isDark ? "text-white/50" : "text-navy/40"
        }`}
      >
        {label}
      </span>
      <span
        className={`text-3xl md:text-4xl lg:text-5xl font-black leading-none tracking-tight ${
          isDark ? "text-white/15" : "text-navy/10"
        }`}
      >
        {num}
      </span>
    </div>
  );
}