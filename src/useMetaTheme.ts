/*
 * useMetaTheme.tsx
 * author: evan kirkiles
 * created on Sun Jun 04 2023
 * 2023 meta-theme-swap
 */
import { RefObject, useContext, useEffect } from 'react';
import { MetaThemeContext } from './MetaThemeContext';

interface MetaThemeOptions {
  color: string;
  priority?: number;
}

/**
 * A hook for adding a meta theme color to an HTML element. When the element
 * reaches the top of the screen, the navigation bar will change color to
 * match the color specified. When the element reaches the bottom of the screen,
 * the address bar changes color to match the color specified.
 *
 * @param ref A ref object for the element to check intersections
 * @param color The color represented by the element.
 */
export default function useMetaTheme(ref: RefObject<Element>, options: MetaThemeOptions) {
  const { observeElement, unobserveElement } = useContext(MetaThemeContext);

  // add theme swap switching tags to the element
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const { color, priority = -1 } = options;
    node.setAttribute('data-mts-color', color);
    node.setAttribute('data-mts-priority', priority.toString());
    return () => {
      node.removeAttribute('data-mts-color');
      node.removeAttribute('data-mts-priority');
    };
  }, [options, ref]);

  // observe the element
  useEffect(() => {
    const node = ref.current;
    if (!node || !observeElement || !unobserveElement) return;
    observeElement(node);
    return () => unobserveElement(node);
  }, [observeElement, unobserveElement, ref]);
}
