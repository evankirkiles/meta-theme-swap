/*
 * useMetaTheme.tsx
 * author: evan kirkiles
 * created on Sun Jun 04 2023
 * 2023 meta-theme-swap
 */
import { RefObject, useContext, useEffect } from 'react';
import { MetaThemeContext } from './MetaThemeContext';

/**
 * A hook for adding a meta theme color to an HTML element. When the element
 * reaches the top of the screen, the navigation bar will change color to
 * match the color specified. When the element reaches the bottom of the screen,
 * the address bar changes color to match the color specified.
 *
 * @param ref A ref object for the element to check intersections
 * @param color The color represented by the element.
 */
export default function useMetaTheme(ref: RefObject<Element>, color: string) {
  const { observerTop, observerBottom } = useContext(MetaThemeContext);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    node.setAttribute('data-metathemeswap-color', color);
  }, [color, ref]);
  
  useEffect(() => {
    const node = ref.current;
    if (!node || !observerTop) return;
    observerTop?.observe(node);
  }, [observerTop, ref]);
  
  useEffect(() => {
    const node = ref.current;
    if (!node || !observerBottom) return;
    observerBottom?.observe(node);
  }, [observerBottom, ref]);
}
