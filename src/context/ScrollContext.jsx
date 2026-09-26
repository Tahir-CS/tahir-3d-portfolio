import React, { createContext, useContext, useRef, useState } from 'react';

const ScrollContext = createContext(null);

export function ScrollProvider({ children }) {
  const scrollProgress = useRef(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState(null);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('tahir_theme') || 'obsidian';
    }
    return 'obsidian';
  });

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tahir_theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'obsidian' ? 'cream' : 'obsidian';
    setTheme(nextTheme);
  };

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ScrollContext.Provider
      value={{
        scrollProgress,
        activeSection,
        setActiveSection,
        selectedProject,
        setSelectedProject,
        wireframeMode,
        setWireframeMode,
        scrollPercent,
        setScrollPercent,
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollProgress() {
  const ctx = useContext(ScrollContext);
  if (!ctx) {
    throw new Error('useScrollProgress must be used within ScrollProvider');
  }
  return ctx;
}
