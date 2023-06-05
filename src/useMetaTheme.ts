/*
 * useMetaTheme.tsx
 * author: evan kirkiles
 * created on Sun Jun 04 2023
 * 2023 meta-theme-swap
 */
import { RefObject, useContext, useEffect, useId } from 'react';
import { MetaThemeContext } from './MetaThemeContext';

export default function useMetaTheme(
  ref: RefObject<Element>,
  color: string,
  priority: number,
  timeout?: string,
) {
  const id = useId();
  const { observer } = useContext(MetaThemeContext);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    node.setAttribute('data-metathemeswap-id', id);
    node.setAttribute('data-metathemeswap-color', color);
    node.setAttribute('data-metathemeswap-timeout', timeout ?? '0ms');
    observer.observe(node);
    return () => {
      observer.unobserve(node);
    };
  }, [id, observer, color, timeout, ref]);
}
