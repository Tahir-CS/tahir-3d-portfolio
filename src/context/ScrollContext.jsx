import React, { createContext, useContext, useRef, useState } from 'react';

const ScrollContext = createContext(null);

export function ScrollProvider({ children }) {
  const scrollProgress = useRef(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <ScrollContext.Provider
      value={{
        scrollProgress,
        activeSection,
        setActiveSection,
        selectedProject,
        setSelectedProject,
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
