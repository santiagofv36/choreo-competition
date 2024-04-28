/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router';

interface PathContextType {
  previousPath: string;
  setPreviousPath: React.Dispatch<React.SetStateAction<string>>;
}

const PathContext = createContext<PathContextType | undefined>(undefined);

export function PathProvider({ children }: { children: React.ReactNode }) {
  const [previousPath, setPreviousPath] = useState('');

  return (
    <PathContext.Provider value={{ previousPath, setPreviousPath }}>
      {children}
    </PathContext.Provider>
  );
}

export function useCustomNavigate() {
  const { setPreviousPath } = usePreviousPath();
  const navigate = useNavigate();

  return (path: string) => {
    setPreviousPath(window.location.pathname + (window.location.search ?? ''));
    navigate(path);
  };
}

export const usePreviousPath = () => {
  const context = useContext(PathContext);
  if (!context) {
    throw new Error('usePreviousPath must be used within a PathProvider');
  }
  return context;
};
