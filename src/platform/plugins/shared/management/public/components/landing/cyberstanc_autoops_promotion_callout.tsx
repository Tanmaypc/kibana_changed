/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React, { useState } from 'react';
import { EuiButton, EuiCallOut, EuiLink } from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n-react';

const CYBERSTANC_URL = 'https://cyberstanc.com';

interface CyberstancAutoOpsPromotionCalloutProps {
  style?: React.CSSProperties;
}

export const CyberstancAutoOpsPromotionCallout = ({
  style,
}: CyberstancAutoOpsPromotionCalloutProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <EuiCallOut
      color="danger"
      iconType="warning"
      title={
        <FormattedMessage
          id="management.cyberstancAutoOpsPromotionCallout.title"
          defaultMessage="New! Connect AutoOps to this self-managed cluster"
        />
      }
      onDismiss={() => setIsVisible(false)}
      style={style}
      data-test-subj="autoOpsPromotionCallout"
    >
      <p>
        <FormattedMessage
          id="management.cyberstancAutoOpsPromotionCallout.description"
          defaultMessage="Connect this cluster to Cyberstanc Cloud to get real-time issue detection, resolution paths, and enable Cyberstanc Support to use AutoOps to assist you better. {learnMoreLink}"
          values={{
            learnMoreLink: (
              <EuiLink href={CYBERSTANC_URL} target="_blank" external>
                <FormattedMessage
                  id="management.cyberstancAutoOpsPromotionCallout.learnMoreLink"
                  defaultMessage="Learn more"
                />
              </EuiLink>
            ),
          }}
        />
      </p>
      <EuiButton
        href={CYBERSTANC_URL}
        target="_blank"
        color="danger"
        size="s"
        fill
        data-test-subj="cyberstancConnectClusterButton"
      >
        <FormattedMessage
          id="management.cyberstancAutoOpsPromotionCallout.connectButton"
          defaultMessage="Connect this cluster"
        />
      </EuiButton>
    </EuiCallOut>
  );
};
