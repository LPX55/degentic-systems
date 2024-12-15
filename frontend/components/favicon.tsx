'use client';

import SVGIcon from "react-svg-favicon";

export function FavIcon() {
  return (
    <>

      <SVGIcon type="image/svg+xml" sizes="any" media="(prefers-color-scheme: dark)">
        <svg viewBox="0 0 100 100">
          <circle cx={50} cy={50} r={45} fill="orange" />
          <path
            d="M25 65 L40 50 L25 35 L35 25 L50 40 L65 25 L75 35 L60 50 L75 65 L65 75 L50 60 L35 75 Z"
            fill="black"
          />
          </svg>
      </SVGIcon>
    </>
  );
}