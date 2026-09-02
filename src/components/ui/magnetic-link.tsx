import * as React from 'react';
import { useRef } from 'react';
import { motion, useSpring, useTransform, type MotionValue } from 'motion/react';

import { cn } from '@/lib/utils';

// Same proximity engine as DockItem in animated-dock.tsx — a shared mouseX
// motion value, each item measuring its own distance from the cursor — but
// driving a text link's `scale` instead of an icon capsule's `width`. The
// navbar here is a row of labels ("Каталог", "Хит продаж", …), not icons in
// fixed-size circles, so magnifying the width of a capsule that doesn't
// exist has nothing to act on; scaling the label itself is the equivalent
// motion for that shape of content.
// Deliberately narrow, rather than `extends React.AnchorHTMLAttributes<...>`:
// spreading the full native attribute set onto `motion.a` fails to compile
// — framer-motion's HTMLMotionProps redefines onDrag/onDragStart/onDragEnd
// with its own gesture-callback signatures, incompatible with React's native
// DragEventHandler that AnchorHTMLAttributes carries. Accepting only what
// this project's nav links actually pass sidesteps the whole conflict.
interface MagneticLinkProps {
  mouseX: MotionValue<number>;
  href: string;
  target?: string;
  rel?: string;
  className?: string;
  'aria-label'?: string;
  children: React.ReactNode;
  /** How far (px) the cursor's influence reaches. Smaller = snappier falloff. */
  range?: number;
  /** Peak scale directly under the cursor. Kept subtle on purpose — this is
   *  a boutique nav bar, not a playful icon dock. */
  peakScale?: number;
}

export function MagneticLink({
  mouseX,
  range = 90,
  peakScale = 1.16,
  className,
  children,
  ...anchorProps
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const scaleRaw = useTransform(distance, [-range, 0, range], [1, peakScale, 1]);
  const scale = useSpring(scaleRaw, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.a
      ref={ref}
      style={{ scale }}
      className={cn('inline-block', className)}
      {...anchorProps}
    >
      {children}
    </motion.a>
  );
}
