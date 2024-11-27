import { FC, PropsWithChildren } from 'react';
import { LangChanger } from '../LangChanger';
import { ThemeChanger } from '../ThemeChanger';

export const SiteSettings: FC<PropsWithChildren<{ className?: string }>> = ({ className, children }) => {
  return (
    <div className={className}>
      <ThemeChanger />
      {children}
      <LangChanger />
    </div>
  );
};
