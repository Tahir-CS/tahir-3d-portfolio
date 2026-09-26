import React, { createContext, useContext, useRef, useState } from 'react';

const ScrollContext = createContext(null);

export function ScrollProvider({ children }) {
  const scrollProgress = useRef(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState(null);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

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
