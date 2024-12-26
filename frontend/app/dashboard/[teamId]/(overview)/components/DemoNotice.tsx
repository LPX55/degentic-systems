'use client';
import { constructor, useState } from 'react';
import Link from 'next/link';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function DemoNotice() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 p-4 xl:pl-[260px]">
        <div className="rounded-md bg-blue-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg aria-label="Information icon" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm leading-5 text-blue-700">
              This platform is currently vision for the general mechanics of the platform. Unless you like pretty designs and UX, you might want to check out some of our work in <Link href="/dashboard/demo" className="font-medium underline">research and some working proof of concepts</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 