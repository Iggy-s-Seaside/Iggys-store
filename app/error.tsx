'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
        return () => {
            reset();
        };
    }, [error, reset]);
    return (
        <div className="w-full min-h-56 text-lg flex items-center justify-center flex-col">
            <h1>Error</h1>
            <p>{error.message}</p>
            <button
                onClick={
                    // attempt to reset the error
                    () => reset()
                }
            >
                Reset
            </button>
        </div>
    );
}
