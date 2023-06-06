/*
 * utils.ts
 * author: evan kirkiles
 * created on Tue Jun 06 2023
 * 2023 the nobot space
 */
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import MetaThemeProvider from '../MetaThemeContext';

beforeEach(() => {
  // IntersectionObserver isn't available in test environment
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

export const render = (node: React.ReactNode) => {
  // add white theme-color meta tag
  const meta = document.createElement('meta');
  meta.setAttribute('name', 'theme-color');
  meta.setAttribute('content', '#000000');

  // render meta theme context around app
  const mount = document.getElementById('mount');
  ReactDOM.render(
    <StrictMode>
      <MetaThemeProvider>{node}</MetaThemeProvider>
    </StrictMode>,
    mount,
  );
};
