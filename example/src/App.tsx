/*
 * App.tsx
 * author: evan kirkiles
 * created on Mon Jun 05 2023
 * 2023 the nobot space 
 */
import React, { useRef } from 'react';
import './App.css';
import { useMetaTheme } from 'meta-theme-swap';

function ColoredSection({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useMetaTheme(ref, color, 1, "300ms");
  return (
    <div id={color} className="ColorSection" style={{ backgroundColor: color }} ref={ref}>
      {color}
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <ColoredSection color="#ff0000" />
      <ColoredSection color="#00ff00" />
      <ColoredSection color="#0000ff" />
      <ColoredSection color="#000000" />
    </div>
  );
}

export default App;
