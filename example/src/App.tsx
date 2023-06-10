/*
 * App.tsx
 * author: evan kirkiles
 * created on Mon Jun 05 2023
 * 2023 the nobot space
 */
import React, { useRef, useState } from 'react';
import './App.css';
import { useMetaTheme } from 'meta-theme-swap';

function Menu() {
  const menuRef = useRef<HTMLDivElement>(null);
  useMetaTheme(menuRef, { color: "#ffffff", priority: 1 });

  return (
    <section ref={menuRef} className="Menu">
      THIS IS A MENU
    </section>
  );
}

function ColoredSection({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useMetaTheme(ref, { color });
  return (
    <div id={color} className="ColorSection" style={{ backgroundColor: color }} ref={ref}>
      {color}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="App">
      <button className="MenuButton" onClick={() => setMenuOpen(!menuOpen)}>
        MENU
      </button>
      {menuOpen && <Menu />}
      <ColoredSection color="#ffffff" />
      <ColoredSection color="#00ff00" />
      <ColoredSection color="#0000ff" />
      <ColoredSection color="#000000" />
      <ColoredSection color="#ffff00" />
      <ColoredSection color="#00ffff" />
      <ColoredSection color="#ff00ff" />
      <ColoredSection color="#ff0000" />
      <ColoredSection color="#00ff00" />
      <ColoredSection color="#0000ff" />
      <ColoredSection color="#000000" />
      <ColoredSection color="#ffff00" />
      <ColoredSection color="#00ffff" />
      <ColoredSection color="#ff00ff" />
      <ColoredSection color="#ff0000" />
      <ColoredSection color="#00ff00" />
      <ColoredSection color="#0000ff" />
      <ColoredSection color="#000000" />
      <ColoredSection color="#ffff00" />
      <ColoredSection color="#00ffff" />
      <ColoredSection color="#ff00ff" />
    </div>
  );
}

export default App;
