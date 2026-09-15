"use client";

// Thin re-export layer so the rest of the app always imports animation
// primitives from "@/lib/motion" instead of "motion/react" directly.
// That indirection is what lets this file be swapped later (e.g. for a
// lighter CSS-only shim in an environment where the motion package can't
// be installed) without touching every component that uses it.
export { motion, AnimatePresence, useReducedMotion } from "motion/react";
