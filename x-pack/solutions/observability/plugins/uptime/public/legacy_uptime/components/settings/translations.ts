/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { i18n } from '@kbn/i18n';

export const certificateFormTranslations = {
  ageInputAriaLabel: i18n.translate(
    'xpack.uptime.sourceConfiguration.ageLimitThresholdInput.ariaLabel',
    {
      defaultMessage:
        'Controls the maximum number of days a TLS certificate may be valid before Cyberstanc shows a warning.',
    }
  ),
  expirationInputAriaLabel: i18n.translate(
    'xpack.uptime.sourceConfiguration.certificateExpirationThresholdInput.ariaLabel',
    {
      defaultMessage:
        'Controls the minimum number of days remaining before TLS certificate expiration when Cyberstanc shows a warning.',
    }
  ),
};

export const alertFormI18n = {
  inputPlaceHolder: i18n.translate(
    'xpack.uptime.sourceConfiguration.alertDefaultForm.selectConnector',
    {
      defaultMessage: 'Select one or more connectors',
    }
  ),
  emailPlaceHolder: i18n.translate(
    'xpack.uptime.sourceConfiguration.alertDefaultForm.emailConnectorPlaceHolder',
    {
      defaultMessage: 'To: Email for email connector',
    }
  ),
};
