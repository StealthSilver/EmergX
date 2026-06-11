"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type PlatformScrollContextValue = {
  highlightProgress: number;
  highlightComplete: boolean;
  setHighlightProgress: (progress: number) => void;
};

const PlatformScrollContext = createContext<PlatformScrollContextValue | null>(
  null,
);

export function PlatformScrollProvider({ children }: { children: ReactNode }) {
  const [highlightProgress, setHighlightProgress] = useState(0);
  const highlightComplete = highlightProgress >= 1;

  const value = useMemo(
    () => ({
      highlightProgress,
      highlightComplete,
      setHighlightProgress,
    }),
    [highlightProgress, highlightComplete],
  );

  return (
    <PlatformScrollContext.Provider value={value}>
      {children}
    </PlatformScrollContext.Provider>
  );
}

export function usePlatformScroll() {
  const context = useContext(PlatformScrollContext);
  if (!context) {
    throw new Error(
      "usePlatformScroll must be used within a PlatformScrollProvider",
    );
  }
  return context;
}
