'use client';

import { FC, PropsWithChildren } from 'react';
import { ThemeProvider as ThemeContext } from 'next-themes';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeContext 
      enableSystem={false}
      enableColorScheme={false} 
      themes={['light', 'dark']} 
      attribute='data-theme'
      defaultTheme='light'
      storageKey='theme'
      disableTransitionOnChange
    >
      {children}
    </ThemeContext>
  );
};
