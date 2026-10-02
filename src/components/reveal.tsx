"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig } from "motion/react";
import * as m from "motion/react-m";

const loadFeatures = () =>
  import("./motion-features").then((module) => module.default);

/**
 * Fades and lifts its children in the first time they scroll into view.
 * Use it inside a section, around its content, not around the section: the
 * section's own box then never moves, so anchor jumps to it land exactly
 * below the sticky header.
 *
 * - LazyMotion with `strict` and `m`: only the small `m` component is in the
 *   page bundle; the animation features load asynchronously.
 * - reducedMotion="user": with prefers-reduced-motion, Motion drops the
 *   movement and keeps only the fade.
 * - data-reveal: without JavaScript the start state would stay forever, so
 *   a <noscript> rule in the layout shows these elements as they are.
 */
export function Reveal({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">
        <m.div
          data-reveal
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {children}
        </m.div>
      </MotionConfig>
    </LazyMotion>
  );
}
