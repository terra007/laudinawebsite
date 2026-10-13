"use client";

import { MotionConfig } from "framer-motion";

/** Respektiert die Systemeinstellung „Bewegung reduzieren“ für alle Animationen. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
