'use client';

import { useEffect, useState } from 'react';

export default function Loading() {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!showLoading) {
    return null;
  }

  return (
    <div className='flex h-screen items-center justify-center overflow-hidden bg-base-100'>
      <div className='flex flex-col items-center gap-4'>
        <span className='loading loading-infinity w-12' />
      </div>
    </div>
  );
}
