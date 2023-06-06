/*
 * MetaThemeContext.ts
 * author: evan kirkiles
 * created on Sun Jun 04 2023
 * 2023 the nobot space
 */
import React from 'react';
import { PropsWithChildren, createContext, useRef } from 'react';

interface IMetaThemeContext {
  observerTop: IntersectionObserver;
  observerBottom: IntersectionObserver;
}

export const MetaThemeContext = createContext<IMetaThemeContext>({
  observerTop: new IntersectionObserver(() => void 0),
  observerBottom: new IntersectionObserver(() => void 0),
});

/**
 * A HOC for providing the Meta Theme context, so elements may control the
 * colors of the WebKit navigation and address bars. Example usage:
 *
 * ```
 * <MetaThemeProvider>
 *  ...your app
 * </MetaThemeProvider>
 * ```
 */
export default function MetaThemeProvider({ children }: PropsWithChildren) {
  const metaTag = useRef<HTMLMetaElement>(document.querySelector('meta[name="theme-color"'));
  const currThemeColor = useRef<string | null>(metaTag.current?.getAttribute('content') ?? null);
  return (
    <MetaThemeContext.Provider
      value={{
        // Top of screen intersection observer (controls theme-color)
        observerTop: new IntersectionObserver(
          (es) => {
            if (!metaTag.current) return;
            const selectedEntry = es.filter((e) => e.isIntersecting);
            const target = selectedEntry[0]?.target;
            if (!target) return;
            const color = target.getAttribute('data-metathemeswap-color');
            if (!color) return;
            currThemeColor.current = color;
            metaTag.current.setAttribute('content', currThemeColor.current);
          },
          {
            rootMargin: '-0.05% 0px -99.9% 0px',
          },
        ),
        // Bottom of screen intersection observer (controls background-color)
        observerBottom: new IntersectionObserver(
          (es) => {
            if (!metaTag.current) return;
            const selectedEntry = es.filter((e) => e.isIntersecting);
            const target = selectedEntry[0]?.target;
            if (!target) return;
            const color = target.getAttribute('data-metathemeswap-color');
            if (!color) return;
            document.body.style.backgroundColor = color;
            metaTag.current.setAttribute('content', currThemeColor.current + 'fe');
            const meta = metaTag.current;
            requestAnimationFrame(() => {
              meta.setAttribute('content', currThemeColor.current || '');
            });
          },
          {
            rootMargin: '-99.9% 0px -0.05% 0px',
          },
        ),
      }}
    >
      {children}
    </MetaThemeContext.Provider>
  );
}
