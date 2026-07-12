/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { EuiBetaBadgeProps } from '@elastic/eui';
import { EuiBetaBadge } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import React from 'react';

export function ExperimentalBadge() {
  return (
    <EuiBetaBadge
      label={i18n.translate('xpack.observability.experimentalBadgeLabel', {
        defaultMessage: 'Technical preview',
      })}
      tooltipContent={i18n.translate('xpack.observability.experimentalBadgeDescription', {
        defaultMessage:
          'This functionality is in technical preview and may change or be removed in a future release. Cyberstanc will work to fix issues, but technical-preview features are not covered by the support SLA for generally available features.',
      })}
    />
  );
}

export function BetaBadge(
  badgeProps: Partial<Pick<EuiBetaBadgeProps, 'size' | 'iconType' | 'style'>>
) {
  return (
    <EuiBetaBadge
      label={i18n.translate('xpack.observability.betaBadgeLabel', {
        defaultMessage: 'Beta',
      })}
      tooltipContent={i18n.translate('xpack.observability.betaBadgeDescription', {
        defaultMessage: 'This functionality is in beta and is subject to change.',
      })}
      {...badgeProps}
    />
  );
}
