'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';

const DebugContext = createContext<boolean>(false);

export function DebugProvider({ children }: { children: ReactNode }) {
  const [isDebug, setIsDebug] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const debug = searchParams.get('debug');
    setIsDebug(debug === 'penttipasanen');
  }, [searchParams]);

  return (
    <DebugContext.Provider value={isDebug}>
      {children}
    </DebugContext.Provider>
  );
}

export function useDebug() {
  return useContext(DebugContext);
} 