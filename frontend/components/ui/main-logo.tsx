import React from 'react';

export const LightLogo = () => (
  <div className="eth-ui">
<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 11.5L17 9L12 6.5L7 9L12 11.5ZM12 11.5V17.5" stroke="#141B34" strokeWidth="1.5" strokeLinejoin="round"/>
  <path d="M17 9V15L12 17.5L7 15V9" stroke="#141B34" strokeWidth="1.5" strokeLinejoin="round"/>
  <path d="M9 2.5H2.5V9M15 2.5H21.5V9M15 21.5H21.5V15M9 21.5H2.5V15" stroke="#141B34" strokeWidth="1.5"/>
</svg>
    <h2 className="text-neutral-900 font-black mb-x">Degentic Systems</h2>

  </div>
);

export const DarkLogo = () => (
<div className="eth-ui hover:animate-pulse transition-all duration-300 gap-2">
<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 11.5L17 9L12 6.5L7 9L12 11.5ZM12 11.5V17.5" stroke="#eee" strokeWidth="1.5" strokeLinejoin="round"/>
  <path d="M17 9V15L12 17.5L7 15V9" stroke="#eee" strokeWidth="1.5" strokeLinejoin="round"/>
  <path d="M9 2.5H2.5V9M15 2.5H21.5V9M15 21.5H21.5V15M9 21.5H2.5V15" stroke="#eee" strokeWidth="1.5"/>
</svg>
  <div>
    <h2 className="text-neutral-200 font-medium mb-x">Degentic Systems</h2>
    {/* <h3 className="eth-ui-white-text inline-flex font-bold mt-x">- secured -</h3> */}
  </div>
</div>
);