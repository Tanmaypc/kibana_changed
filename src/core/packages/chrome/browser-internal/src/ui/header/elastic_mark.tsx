/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import type { SVGProps } from 'react';
import React from 'react';

export const CyberstancSymbol = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="48" height="48" rx="14" fill="#0F213B" />
    <path
      d="M24 7L38 13V22.5C38 31.6 32.1 39.7 24 42C15.9 39.7 10 31.6 10 22.5V13L24 7Z"
      fill="#22D3EE"
      fillOpacity="0.16"
      stroke="#22D3EE"
      strokeWidth="2"
    />
    <path
      d="M29.7 18.3C28.2 16.8 26.3 16 24 16C19.6 16 16 19.6 16 24C16 28.4 19.6 32 24 32C26.3 32 28.2 31.2 29.7 29.7"
      stroke="#F8FAFC"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <path d="M29 24H36" stroke="#818CF8" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

// Keep this export name stable for existing core imports while presenting the Cyberstanc wordmark.
export const ElasticMark = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="132"
    height="28"
    viewBox="0 0 132 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="cyberstancMark"
    {...props}
  >
    <title id="cyberstancMark">Cyberstanc</title>
    <CyberstancSymbol x="0" y="2" width="24" height="24" />
    <text
      x="32"
      y="19"
      fill="currentColor"
      fontFamily="Inter, BlinkMacSystemFont, Helvetica, Arial, sans-serif"
      fontSize="15"
      fontWeight="700"
      letterSpacing="-0.3"
    >
      Cyberstanc
    </text>
  </svg>
);
