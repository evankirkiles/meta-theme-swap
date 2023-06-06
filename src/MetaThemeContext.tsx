/*
 * MetaThemeContext.ts
 * author: evan kirkiles
 * created on Sun Jun 04 2023
 * 2023 the nobot space
 */
'use client';

import React, { useEffect, useState } from 'react';
import { PropsWithChildren, createContext, useRef } from 'react';

interface IMetaThemeContext {
  observerTop: IntersectionObserver | null;
  observerBottom: IntersectionObserver | null;
}

export const MetaThemeContext = createContext<IMetaThemeContext>({
  observerTop: null,
  observerBottom: null,
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
  const [observerTop, setTop] = useState<IntersectionObserver | null>(null);
  const [observerBottom, setBot] = useState<IntersectionObserver | null>(null);

  useEffect(() => {
    setTop(
      new IntersectionObserver(
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
    );
    setBot(
      new IntersectionObserver(
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
    );
  }, []);

  return (
    <MetaThemeContext.Provider
      value={{
        observerTop,
        observerBottom,
      }}
    >
      {children}
    </MetaThemeContext.Provider>
  );
}
