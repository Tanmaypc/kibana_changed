/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import type { EuiIconProps } from '@elastic/eui';
import { EuiIcon } from '@elastic/eui';
import React from 'react';

// TODO: This is duplicated code. It should be removed when the logo becomes available in EUI.

const AssistantLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="100%"
    width="100%"
    viewBox="0 0 64 64"
    fill="none"
    {...props}
  >
    <defs>
      <linearGradient id="cyberstancSelectionAssistantGradient" x1="14" y1="8" x2="52" y2="56">
        <stop stopColor="#22D3EE" />
        <stop offset="1" stopColor="#6366F1" />
      </linearGradient>
    </defs>
    <path
      fill="#071226"
      stroke="url(#cyberstancSelectionAssistantGradient)"
      strokeWidth="4"
      strokeLinejoin="round"
      d="M32 4 55 12v17c0 16.3-9.3 27.9-23 33C18.3 56.9 9 45.3 9 29V12L32 4Z"
    />
    <path
      fill="none"
      stroke="url(#cyberstancSelectionAssistantGradient)"
      strokeWidth="7"
      strokeLinecap="round"
      d="M42 23.5A14 14 0 1 0 42 42"
    />
    <path stroke="#67E8F9" strokeWidth="3" strokeLinecap="round" d="M32 32h14" />
    <circle cx="47" cy="32" r="4" fill="#67E8F9" />
  </svg>
);

/**
 * Props for the AI Assistant icon.
 */
export type AssistantIconProps = Omit<EuiIconProps, 'type'>;

/**
 * Default Cyberstanc AI Assistant icon.
 */
export const AssistantIcon = ({ size = 'm', ...rest }: AssistantIconProps) => {
  return <EuiIcon {...{ type: AssistantLogo, size, ...rest }} />;
};
