/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { IconType } from '@elastic/eui';
import { EuiBetaBadge } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import React from 'react';

type Props = {
  icon?: IconType;
} & Pick<React.ComponentProps<typeof EuiBetaBadge>, 'size' | 'style'>;

export function TechnicalPreviewBadge({ icon = 'beaker', size, style }: Props) {
  return (
    <EuiBetaBadge
      label={i18n.translate('xpack.observabilityShared.technicalPreviewBadgeLabel', {
        defaultMessage: 'Technical preview',
      })}
      tooltipContent={i18n.translate('xpack.observabilityShared.technicalPreviewBadgeDescription', {
        defaultMessage:
          'This functionality is in technical preview and may change or be removed in a future release. Cyberstanc will work to fix issues, but technical-preview features are not covered by the support SLA for generally available features.',
      })}
      iconType={icon}
      size={size}
      style={style}
    />
  );
}
