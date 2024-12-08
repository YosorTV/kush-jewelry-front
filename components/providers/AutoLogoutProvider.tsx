'use client';

import { FC, PropsWithChildren, useCallback, useEffect } from 'react';

import { useActivity } from '@/store';
import { logout } from '@/services';

import { AutoLogoutProviderProps, WindowActivityEvent } from '@/types/components';

export const AutoLogoutProvider: FC<PropsWithChildren<AutoLogoutProviderProps>> = ({
  timeoutCheckMs = 60000,
  locale = 'uk',
  session,
  children
}) => {
  const { lastActivity, setLastActivity } = useActivity();

  const getCurrentTime = useCallback(() => new Date().getTime(), []);

  const onUserActivity = useCallback(() => {
    setLastActivity(getCurrentTime());
  }, [getCurrentTime, setLastActivity]);

  const checkUserInactivity = useCallback(async () => {
    if (session) {
      const expiryTime = session.exp * 1000;

      if (lastActivity > expiryTime) {
        await logout({ locale });
      }
    }
  }, [session, lastActivity]);

  useEffect(() => {
    const windowEvents: WindowActivityEvent[] = ['focus', 'scroll', 'click', 'keydown', 'mousemove'];
    const controller = new AbortController();

    windowEvents.forEach((event) => window.addEventListener(event, onUserActivity, { signal: controller.signal }));

    const intervalId = setInterval(checkUserInactivity, timeoutCheckMs);

    return () => {
      controller.abort();
      clearInterval(intervalId);
    };
  }, [timeoutCheckMs]);

  return <>{children}</>;
};
