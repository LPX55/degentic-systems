'use client';

import Link from 'next/link';

export function NoticeBar() {
    
  return (
    <div className="fixed inset-x-0 bottom-0 p-4 xl:pl-[260px]">
  <div
    className="relative flex items-center justify-between gap-4 rounded-lg bg-yellow-600 px-4 py-3 text-white shadow-lg"
  >
    <p className="text-sm font-medium">
      This platform is currently vision for the general mechanics of the platform. Unless you like pretty designs and UX, you might want to check out some of our <Link href="/dashboard/demo" className="font-medium underline">work in research and some of our actual working proof of concepts</Link>.
    </p>


  </div>
</div>
  );
}
// biome-ignore lint/a11y/useButtonType: <explanation>
<button
aria-label="Close"
className="shrink-0 rounded-lg bg-black/10 p-1 transition hover:bg-black/20"
>
{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
<svg
    xmlns="http://www.w3.org/2000/svg"
    className="size-5"
    viewBox="0 0 20 20"
    fill="currentColor"
>
    <path
    fillRule="evenodd"
    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
    clipRule="evenodd"
    />
</svg>
</button>