import { Session } from 'next-auth';

export interface AutoLogoutProviderProps {
  timeoutCheckMs?: number;
  requireSession?: boolean;
  locale: string;
  session: Session | null;
}

export type WindowActivityEvent = keyof WindowEventMap;
