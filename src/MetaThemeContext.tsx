/*
 * MetaThemeContext.ts
 * author: evan kirkiles
 * created on Sun Jun 04 2023
 * 2023 the nobot space
 */
'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { PropsWithChildren, createContext, useRef } from 'react';

interface IMetaThemeContext {
  observeElement: ((el: Element) => void) | null;
  unobserveElement: ((el: Element) => void) | null;
}

export const MetaThemeContext = createContext<IMetaThemeContext>({
  observeElement: null,
  unobserveElement: null,
});

const IO_TOP_OPTIONS = {
  rootMargin: '-0.05% 0px -99.9% 0px',
};

const IO_BOT_OPTIONS = {
  rootMargin: '-99.9% 0px -0.05% 0px',
};

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
  const metaTag = useRef<HTMLMetaElement | null>(null);
  const currThemeColor = useRef<string | null>(null);
  const observedElements = useRef(new Set<Element>());
  const [observerTop, setTop] = useState<IntersectionObserver | null>(null);
  const [observerBottom, setBot] = useState<IntersectionObserver | null>(null);

  // create intersection observers on mount
  useEffect(() => {
    metaTag.current = document.querySelector('meta[name="theme-color"]');
    currThemeColor.current = metaTag.current?.getAttribute('content') ?? null;

    // callback for updating the color of the Webkit status bar (theme-color)
    function updateTop(es: IntersectionObserverEntry[]) {
      if (!metaTag.current) return;
      const selectedEntry = es
        .filter((e) => e.isIntersecting)
        .reduce<[Element | null, number]>(
          (acc, entry) => {
            const priority = parseInt(entry.target.getAttribute('data-mts-priority') ?? '-1');
            return priority > acc[1] ? [entry.target, priority] : acc;
          },
          [null, -Infinity],
        );
      const target = selectedEntry[0];
      if (!target) return;
      const color = target.getAttribute('data-mts-color');
      if (!color) return;
      currThemeColor.current = color;
      metaTag.current.setAttribute('content', currThemeColor.current);
    }

    // callback for updating the color of the Webkit address bar (body background-color)
    function updateBot(es: IntersectionObserverEntry[]) {
      if (!metaTag.current) return;
      const selectedEntry = es
        .filter((e) => e.isIntersecting)
        .reduce<[Element | null, number]>(
          (acc, entry) => {
            const priority = parseInt(entry.target.getAttribute('data-mts-priority') ?? '-1');
            return priority > acc[1] ? [entry.target, priority] : acc;
          },
          [null, -Infinity],
        );
      const target = selectedEntry[0];
      if (!target) return;
      const color = target.getAttribute('data-mts-color');
      if (!color) return;
      document.body.style.backgroundColor = color;
      metaTag.current.setAttribute('content', currThemeColor.current + 'fe');
      const meta = metaTag.current;
      requestAnimationFrame(() => {
        meta.setAttribute('content', currThemeColor.current || '');
      });
    }

    setTop(new IntersectionObserver(updateTop, IO_TOP_OPTIONS));
    setBot(new IntersectionObserver(updateBot, IO_BOT_OPTIONS));
  }, []);

  // adds an entry to the observer list.
  const observeElement = useCallback(
    (elToAdd: Element) => {
      if (!observerTop || !observerBottom) return;
      if (observedElements.current.has(elToAdd)) return;
      observedElements.current.add(elToAdd);
      // re-observe all of the elements
      observedElements.current.forEach((el) => {
        observerTop.unobserve(el);
        observerTop.observe(el);
        observerBottom.unobserve(el);
        observerBottom.observe(el);
      });
    },
    [observerTop, observerBottom],
  );

  // removes an entry from the observer list
  const unobserveElement = useCallback(
    (elToDelete: Element) => {
      if (!observerTop || !observerBottom) return;
      if (!observedElements.current.has(elToDelete)) return;
      observedElements.current.delete(elToDelete);
      // re-observe all of the elements
      observedElements.current.forEach((el) => {
        observerTop.unobserve(el);
        observerTop.observe(el);
        observerBottom.unobserve(el);
        observerBottom.observe(el);
      });
    },
    [observerTop, observerBottom],
  );

  return (
    <MetaThemeContext.Provider
      value={{
        observeElement,
        unobserveElement,
      }}
    >
      {children}
    </MetaThemeContext.Provider>
  );
}
