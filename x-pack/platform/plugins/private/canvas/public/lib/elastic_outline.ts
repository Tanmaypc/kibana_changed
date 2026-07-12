/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

const cyberstancOutlineSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none">
  <path d="M128 19 218 51v66c0 63-36 109-90 129-54-20-90-66-90-129V51l90-32Z" stroke="#2D2D2D" stroke-width="12" stroke-linejoin="round"/>
  <path d="M169 84c-11-14-24-21-42-21-33 0-56 25-56 60s23 60 56 60c19 0 33-8 44-22" stroke="#2D2D2D" stroke-width="24" stroke-linecap="round"/>
  <path d="M126 123h69" stroke="#2D2D2D" stroke-width="10" stroke-linecap="round"/>
  <circle cx="196" cy="123" r="16" fill="#2D2D2D"/>
</svg>`;

// Keep the existing export name stable for Canvas consumers.
export const elasticOutline = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  cyberstancOutlineSvg
)}`;
