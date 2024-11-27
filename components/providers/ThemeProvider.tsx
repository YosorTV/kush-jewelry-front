'use client';

import { FC, PropsWithChildren } from 'react';
import { ThemeProvider as ThemeContext } from 'next-themes';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeContext enableSystem enableColorScheme defaultTheme='light' attribute='data-theme'>
      {children}
    </ThemeContext>
  );
};
