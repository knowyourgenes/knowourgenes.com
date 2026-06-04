import type { ReactNode } from "react";

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Double-helix mark — strands in white, rungs in soft gold.
export function LogoMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <g stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" fill="none">
        <path d="M16 4.8 C 21.4 8 21.4 12.6 16 16 C 10.6 19.4 10.6 24 16 27.2" />
        <path d="M16 4.8 C 10.6 8 10.6 12.6 16 16 C 21.4 19.4 21.4 24 16 27.2" />
      </g>
      <g stroke="#f1d79a" strokeWidth="1.6" strokeLinecap="round">
        <line x1="12.4" y1="10" x2="19.6" y2="10" />
        <line x1="12.4" y1="22" x2="19.6" y2="22" />
      </g>
    </svg>
  );
}

export const SearchIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...base}>
    <circle cx="11" cy="11" r="7" />
    <line x1="16.5" y1="16.5" x2="21" y2="21" />
  </svg>
);

export const ArrowRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...base}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ChevronRight = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...base}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export const Close = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...base}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const Menu = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...base}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Info = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...base}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </svg>
);

// Category icons keyed by category.iconKey
const CATEGORY_ICONS: Record<string, ReactNode> = {
  nutrition: (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden {...base}>
      <path d="M5 3v7a2 2 0 002 2v9M5 3v4M8 3v4M19 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4v9" />
    </svg>
  ),
  caffeine: (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden {...base}>
      <path d="M5 9h11v5a4 4 0 01-4 4H9a4 4 0 01-4-4V9z" />
      <path d="M16 10h2.5a2.5 2.5 0 010 5H16" />
      <path d="M8 3c-.5 1 .5 1.6 0 2.6M11.5 3c-.5 1 .5 1.6 0 2.6" />
    </svg>
  ),
  vitamins: (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden {...base}>
      <rect
        x="3"
        y="9"
        width="11"
        height="6"
        rx="3"
        transform="rotate(-45 8.5 12)"
      />
      <path d="M9 9l4 4" />
    </svg>
  ),
  fitness: (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden {...base}>
      <path d="M6 9v6M4 10v4M18 9v6M20 10v4M6 12h12" />
    </svg>
  ),
  sleep: (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden {...base}>
      <path d="M20 14.5A8 8 0 119.5 4a6.5 6.5 0 0010.5 10.5z" />
    </svg>
  ),
  stress: (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden {...base}>
      <path d="M3 12h3l2-5 3 9 2.5-7L18 12h3" />
    </svg>
  ),
  connective: (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden {...base}>
      <path d="M7 4c0 4 10 4 10 8s-10 4-10 8" />
      <path d="M17 4c0 4-10 4-10 8s10 4 10 8" />
    </svg>
  ),
  risk: (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden {...base}>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
      <path d="M9.5 12l1.8 1.8L15 10" />
    </svg>
  ),
};

export function CategoryIcon({ iconKey }: { iconKey?: string }) {
  return <>{CATEGORY_ICONS[iconKey ?? ""] ?? CATEGORY_ICONS.nutrition}</>;
}
