/*
 * MetaThemeContext.ts
 * author: evan kirkiles
 * created on Sun Jun 04 2023
 * 2023 the nobot space
 */

import { PropsWithChildren, createContext } from 'react';

interface IMetaThemeContext {
  observer: IntersectionObserver;
}

export const MetaThemeContext = createContext<IMetaThemeContext>({
  observer: new IntersectionObserver(() => {
    return;
  }),
});

export default function MetaThemeProvider({ children }: PropsWithChildren) {
  return (
    <MetaThemeContext.Provider
      value={{
        observer: new IntersectionObserver(
          (entries) => {
            const selectedEntry = entries.reduce<
              [IntersectionObserverEntry | null, number]
            >(
              (acc, entry) =>
                entry.intersectionRatio > acc[1]
                  ? [entry, entry.intersectionRatio]
                  : acc,
              [null, 0],
            );
            const target = selectedEntry[0]?.target;
            if (target) {
              const color = target.getAttribute('data-metathemeswap-color');
              const transition = target.getAttribute(
                'data-metathemeswap-timeout',
              );
              if (color) {
                document.body.style.backgroundColor = color;
                if (transition) {
                  document.body.style.transition = `background-color ${transition} ease-in-out`;
                }
              }
            }
          },
          {
            rootMargin: '-0.05% 0px -99.9% 0px',
          },
        ),
      }}
    >
      {children}
    </MetaThemeContext.Provider>
  );
}
