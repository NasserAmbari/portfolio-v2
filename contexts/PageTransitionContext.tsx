"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface PageTransitionContextValue {
  /** true once the page-enter animation has finished */
  isTransitionReady: boolean;
  /** called by PageTransition when enter animation completes */
  markReady: () => void;
  /** called by PageTransition when a new route starts (exit begins) */
  markTransitioning: () => void;
}

const PageTransitionContext = createContext<PageTransitionContextValue>({
  isTransitionReady: true, // default true so components render normally if context is missing
  markReady: () => {},
  markTransitioning: () => {},
});

export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isTransitionReady, setIsTransitionReady] = useState(false);

  const markReady = useCallback(() => setIsTransitionReady(true), []);
  const markTransitioning = useCallback(() => setIsTransitionReady(false), []);

  return (
    <PageTransitionContext.Provider
      value={{ isTransitionReady, markReady, markTransitioning }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  return useContext(PageTransitionContext);
}
