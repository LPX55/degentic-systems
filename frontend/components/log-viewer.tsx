// components/LogViewer.tsx
import type React from 'react';
import { useEffect, useRef } from 'react';

const LogViewer: React.FC = () => {
    const logRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const originalLog = console.log;

        console.log = (message: any) => {
            // Call the original console.log
            originalLog(message);
            // Append the message to the log div
            if (logRef.current) {
                logRef.current.innerHTML += `${message}<br />`;
                // Scroll to the bottom of the log div
                logRef.current.scrollTop = logRef.current.scrollHeight;
            }
        };

        // Cleanup function to restore original console.log
        return () => {
            console.log = originalLog;
        };
    }, []);

    return (
        <div className='text-neutral-700 text-sm'
            ref={logRef}
            style={{
                border: '1px solid #ccc',
                padding: '10px',
                height: '200px',
                overflowY: 'scroll',
            }}
        />
    );
};

export default LogViewer;