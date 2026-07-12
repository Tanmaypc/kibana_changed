/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiImage, EuiSpacer, EuiTitle, useEuiShadow, useEuiTheme } from '@elastic/eui';
import { css, type SerializedStyles } from '@emotion/react';
import type { FC, PropsWithChildren } from 'react';
import React from 'react';

interface Props {
  className?: string;
  title: React.ReactNode;
  logo?: string;
  cssStyles?: SerializedStyles;
}

const CyberstancLogo = () => (
  <svg
    data-test-subj="cyberstancAuthenticationLogo"
    aria-hidden="true"
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
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

export const AuthenticationStatePage: FC<PropsWithChildren<Props>> = (props) => {
  const theme = useEuiTheme();
  const { euiTheme } = theme;
  const euiBottomShadowM = useEuiShadow('m');

  return (
    <div
      data-test-subj="secAuthenticationStatePage"
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: ${euiTheme.size.xl};
        background:
          radial-gradient(circle at 18% 12%, rgba(34, 211, 238, 0.18), transparent 34%),
          radial-gradient(circle at 85% 85%, rgba(129, 92, 246, 0.16), transparent 30%),
          #07111f;
      `}
    >
      <main
        css={[
          css`
            width: 100%;
            max-width: 520px;
            overflow: hidden;
            border: 1px solid ${euiTheme.colors.borderBaseSubdued};
            border-radius: ${euiTheme.border.radius.medium};
            background: ${euiTheme.colors.backgroundBasePlain};
            ${euiBottomShadowM};
          `,
          props.cssStyles,
        ]}
      >
        <header
          data-test-subj="secAuthenticationStatePageHeader"
          css={css`
            position: relative;
            padding: ${euiTheme.size.xxl} ${euiTheme.size.xl} 0;
            z-index: 10;
            text-align: center;
          `}
        >
          <div data-test-subj="secAuthenticationStatePageContent">
            <span
              data-test-subj="secAuthenticationStatePageLogo"
              css={css`
                margin-bottom: ${euiTheme.size.xl};
                display: inline-block;
                ${euiBottomShadowM};
              `}
            >
              {props.logo ? (
                <EuiImage src={props.logo} size={48} alt={'logo'} />
              ) : (
                <CyberstancLogo />
              )}
            </span>
            <EuiTitle size="l">
              <h1>{props.title}</h1>
            </EuiTitle>
            <EuiSpacer size="xl" />
          </div>
        </header>
        <div
          css={css`
            position: relative;
            padding: 0 ${euiTheme.size.xl} ${euiTheme.size.xxl};
            z-index: 10;
            text-align: center;
          `}
        >
          {props.children}
        </div>
      </main>
    </div>
  );
};
