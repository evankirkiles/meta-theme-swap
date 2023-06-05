import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MetaThemeProvider } from 'meta-theme-swap';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MetaThemeProvider>
      <App />
    </MetaThemeProvider>
  </React.StrictMode>
);
