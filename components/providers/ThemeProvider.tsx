'use client';

import { ThemeProvider as ThemeContext } from 'next-themes';
import { FC, PropsWithChildren } from 'react';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeContext enableSystem enableColorScheme defaultTheme='sunset' attribute='data-theme'>
      {children}
    </ThemeContext>
  );
};
