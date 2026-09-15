// Shared easing + spring presets for the motion/ components.
// Keep this as the single source of truth so JS transitions (motion)
// and CSS transitions (view-transition keyframes) stay visually in sync.

// Cubic-bezier "ease out quint" — a fast start that decelerates smoothly
// into rest. Used wherever a motion transition wants ease: EASE_OUT.
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Same curve, as a CSS string — for plain CSS/@keyframes animations
// (e.g. the View Transitions API in theme-toggle.tsx) that can't take
// a JS easing array.
export const EASE_OUT_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";

// Tight, snappy spring for instantaneous feedback — button whileTap, etc.
// High stiffness + high damping = quick settle, minimal overshoot.
export const SPRING_PRESS = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.5,
} as const;

// Slightly looser spring for content swapping in/out (letter roll, icon
// swap). A touch more travel and settle time than SPRING_PRESS so the
// motion reads as content arriving rather than a UI press response.
export const SPRING_SWAP = {
  type: "spring",
  stiffness: 380,
  damping: 30,
  mass: 0.8,
} as const;
