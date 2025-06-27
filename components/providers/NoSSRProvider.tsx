'use client';

import { useEffect, useState, ReactNode } from 'react';

interface NoSSRProviderProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * NoSSRProvider - Prevents hydration mismatches by only rendering children on the client side
 * This is useful for components that might be affected by browser extensions like Grammarly
 * which add attributes to DOM elements after initial render
 */
export const NoSSRProvider = ({ children, fallback = null }: NoSSRProviderProps) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Return fallback during SSR and initial client render
  if (!hasMounted) {
    return fallback as React.ReactElement;
  }

  // Render children only after hydration is complete
  return children as React.ReactElement;
};

/**
 * Hook to check if component has mounted on client side
 * Useful for conditional rendering to avoid hydration mismatches
 */
export const useIsClient = (): boolean => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}; 