/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { EuiIconProps } from '@elastic/eui';
import { EuiIcon } from '@elastic/eui';
import type { SVGProps } from 'react';
import React from 'react';

const iconType: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="cyberstancAiNavGradient" x1="4" y1="2" x2="17" y2="18">
        <stop stopColor="#22D3EE" />
        <stop offset="1" stopColor="#6366F1" />
      </linearGradient>
    </defs>
    <path
      fill="#071226"
      stroke="url(#cyberstancAiNavGradient)"
      strokeWidth="1.5"
      strokeLinejoin="round"
      d="M10 1.5 17 4v5.2c0 4.9-2.8 8.4-7 9.9-4.2-1.5-7-5-7-9.9V4l7-2.5Z"
    />
    <path
      stroke="url(#cyberstancAiNavGradient)"
      strokeWidth="2.2"
      strokeLinecap="round"
      d="M12.9 6.6a4.2 4.2 0 1 0 0 6.4"
    />
    <path stroke="#67E8F9" strokeWidth="1.2" strokeLinecap="round" d="M10 9.8h4.4" />
    <circle cx="15" cy="9.8" r="1.3" fill="#67E8F9" />
  </svg>
);

export const AiNavigationIcon = ({ size = 'm', ...rest }: Omit<EuiIconProps, 'type'>) => {
  return <EuiIcon {...{ type: iconType, size, ...rest }} />;
};
