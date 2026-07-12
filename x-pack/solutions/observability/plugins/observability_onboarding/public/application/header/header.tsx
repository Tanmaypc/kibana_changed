/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import {
  EuiPageTemplate,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n-react';
import { css } from '@emotion/react';
import React from 'react';
import backgroundImageUrl from './background.svg';

export function Header() {
  return (
    <EuiPageTemplate.Section
      paddingSize="xl"
      css={css`
        & > div {
          background-color: #071226;
          background-image: url(${backgroundImageUrl}),
            linear-gradient(115deg, #071226 0%, #0b1f3a 58%, #172554 100%);
          background-position: right center;
          background-repeat: no-repeat;
          background-size: auto 100%, cover;
          border: 1px solid rgba(103, 232, 249, 0.18);
          border-radius: 24px;
          box-shadow: 0 22px 54px rgba(2, 6, 23, 0.2);
          overflow: hidden;
          padding: 40px 44px;
        }

        h1 {
          color: #f8fafc;
          letter-spacing: -0.025em;
        }

        .euiText {
          color: #cbd5e1 !important;
          max-width: 560px;
        }

        @media (max-width: 767px) {
          & > div {
            background-position: right bottom;
            background-size: auto 72%, cover;
            padding: 32px 28px 150px;
          }
        }
      `}
      grow={false}
      restrictWidth
    >
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiTitle size="l" data-test-subj="obltOnboardingHomeTitle">
            <h1>
              <FormattedMessage
                id="xpack.observability_onboarding.experimentalOnboardingFlow.addObservabilityDataTitleLabel"
                defaultMessage="Add Observability data"
              />
            </h1>
          </EuiTitle>
          <EuiSpacer size="s" />
          <EuiText color="subdued">
            <FormattedMessage
              id="xpack.observability_onboarding.experimentalOnboardingFlow.startIngestingDataIntoTextLabel"
              defaultMessage="Start ingesting Observability data into Cyberstanc. Return to this page at any time by clicking Add data."
            />
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem />
      </EuiFlexGroup>
    </EuiPageTemplate.Section>
  );
}
