/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

const cyberstancLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none">
  <defs>
    <linearGradient id="cyberstancCanvasLogo" x1="44" y1="28" x2="212" y2="230" gradientUnits="userSpaceOnUse">
      <stop stop-color="#22D3EE"/>
      <stop offset="1" stop-color="#6366F1"/>
    </linearGradient>
  </defs>
  <rect width="256" height="256" rx="56" fill="#071226"/>
  <path d="M128 25 211 54v61c0 58-33 100-83 119-50-19-83-61-83-119V54l83-29Z" fill="#020617" stroke="url(#cyberstancCanvasLogo)" stroke-width="10" stroke-linejoin="round"/>
  <path d="M165 87c-10-13-22-19-38-19-30 0-51 23-51 55s21 55 51 55c17 0 30-7 40-20" stroke="url(#cyberstancCanvasLogo)" stroke-width="22" stroke-linecap="round"/>
  <path d="M126 123h64" stroke="#67E8F9" stroke-width="9" stroke-linecap="round"/>
  <circle cx="191" cy="123" r="15" fill="#67E8F9"/>
</svg>`;

// Keep the existing export name stable for Canvas consumers.
export const elasticLogo = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  cyberstancLogoSvg
)}`;
