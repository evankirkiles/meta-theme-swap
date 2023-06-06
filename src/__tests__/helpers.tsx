/*
 * helpers.tsx
 * author: evan kirkiles
 * created on Tue Jun 06 2023
 * 2023 the nobot space
 */

import React, { useRef } from 'react';
import useMetaTheme from '../useMetaTheme';

export function ColoredSection({ size = '50vh', color }: { size?: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useMetaTheme(ref, color);
  return (
    <div id={color} style={{ backgroundColor: color, width: '100%', height: size }} ref={ref}>
      {color}
    </div>
  );
}
