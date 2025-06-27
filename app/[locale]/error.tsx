'use client';

import { useEffect } from 'react';
import { Button } from '@/components/elements';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error details
    console.error('Application error:', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      name: error.name,
    });
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="card w-96 bg-base-200 shadow-xl">
        <div className="card-body text-center">
          <h2 className="card-title justify-center text-error">
            Something went wrong!
          </h2>
          <p className="text-base-content/70">
            An error occurred while loading this page.
          </p>

          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 text-left">
              <details className="collapse collapse-arrow bg-base-100">
                <summary className="collapse-title text-sm font-medium">
                  Error Details (Development Only)
                </summary>
                <div className="collapse-content">
                  <pre className="text-xs overflow-auto">
                    <strong>Message:</strong> {error.message}
                    {error.digest && (
                      <>
                        <br />
                        <strong>Digest:</strong> {error.digest}
                      </>
                    )}
                  </pre>
                </div>
              </details>
            </div>
          )}

          <div className="card-actions justify-center mt-4">
            <Button
              onClick={() => reset()}
              className="btn-primary"
            >
              Try Again
            </Button>
            <Button
              onClick={() => window.location.href = '/'}
              className="btn-outline"
            >
              Go Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 