/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

/*
 * The UI and related logic for the welcome screen that *should* show only
 * when it is enabled (the default) and there is no Kibana-consumed data
 * in Elasticsearch.
 */

import React, { useEffect } from 'react';
import type { UseEuiTheme } from '@elastic/eui';
import {
  EuiTitle,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPortal,
  mathWithUnits,
} from '@elastic/eui';
import { METRIC_TYPE } from '@kbn/analytics';
import { FormattedMessage } from '@kbn/i18n-react';
import { css } from '@emotion/react';
import { getServices } from '../kibana_services';

import { SampleDataCard } from './sample_data';

interface WelcomeProps {
  urlBasePath: string;
  onSkip: () => void;
}

const CyberstancLogo = () => (
  <svg
    data-test-subj="homeCyberstancLogo"
    aria-hidden="true"
    width="56"
    height="56"
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

/**
 * Shows a full-screen welcome page that gives helpful quick links to beginners.
 */
export const Welcome: React.FC<WelcomeProps> = ({ urlBasePath, onSkip }: WelcomeProps) => {
  const services = getServices();

  const redirectToAddData = () => {
    services.application.navigateToApp('integrations', { path: '/browse' });
  };

  const onSampleDataDecline = () => {
    services.trackUiMetric(METRIC_TYPE.CLICK, 'sampleDataDecline');
    onSkip();
  };

  const onSampleDataConfirm = () => {
    services.trackUiMetric(METRIC_TYPE.CLICK, 'sampleDataConfirm');
    redirectToAddData();
  };

  useEffect(() => {
    const hideOnEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onSkip();
      }
    };
    const { welcomeService } = services;
    services.trackUiMetric(METRIC_TYPE.LOADED, 'welcomeScreenMount');
    document.addEventListener('keydown', hideOnEsc);
    welcomeService.onRendered();

    return () => {
      document.removeEventListener('keydown', hideOnEsc);
    };
  }, [onSkip, services]);

  const { welcomeService } = services;

  return (
    <EuiPortal>
      <div data-test-subj="homeWelcomeInterstitial" css={styles}>
        <header className="homeWelcome__header">
          <div className="homeWelcome__content eui-textCenter">
            <EuiSpacer size="xl" />
            <span className="homeWelcome__logo">
              <CyberstancLogo />
            </span>
            <EuiTitle size="l" className="homeWelcome__title">
              <h1>
                <FormattedMessage id="home.welcomeTitle" defaultMessage="Welcome to Cyberstanc" />
              </h1>
            </EuiTitle>
            <EuiSpacer size="m" />
          </div>
        </header>
        <div className="homeWelcome__content homeWelcome__body">
          <EuiFlexGroup gutterSize="l">
            <EuiFlexItem>
              <SampleDataCard
                urlBasePath={urlBasePath}
                onConfirm={onSampleDataConfirm}
                onDecline={onSampleDataDecline}
              />
              <EuiSpacer size="s" />
              {welcomeService.renderTelemetryNotice()}
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
      </div>
    </EuiPortal>
  );
};
const styles = ({ euiTheme }: UseEuiTheme) =>
  css({
    minHeight: '100vh',
    paddingBottom: euiTheme.size.xxxl,
    background: euiTheme.colors.backgroundBaseSubdued,
    '.homeWelcome__header': {
      padding: `${euiTheme.size.xxl} ${euiTheme.size.xl} ${euiTheme.size.xxxxl}`,
      zIndex: 10,
      color: '#f8fafc',
      background:
        'radial-gradient(circle at 20% 0%, rgba(34, 211, 238, 0.2), transparent 38%), linear-gradient(135deg, #07111f 0%, #0f213b 58%, #171d3d 100%)',
    },
    '.homeWelcome__logo': {
      marginBottom: euiTheme.size.xl,
      display: 'inline-block',
      filter: 'drop-shadow(0 18px 28px rgba(2, 8, 23, 0.42))',
    },
    '.homeWelcome__title': {
      color: '#f8fafc',
    },
    '.homeWelcome__content': {
      position: 'relative',
      margin: 'auto',
      maxWidth: mathWithUnits(euiTheme.size.xxxxl, (x) => x * 8),
      paddingLeft: euiTheme.size.xl,
      paddingRight: euiTheme.size.xl,
      zIndex: 10,
    },
    '.homeWelcome__body': {
      marginTop: `-${euiTheme.size.xxl}`,
    },
  });
