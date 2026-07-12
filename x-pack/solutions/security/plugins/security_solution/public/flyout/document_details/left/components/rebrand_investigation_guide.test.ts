/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { rebrandInvestigationGuide } from './rebrand_investigation_guide';

describe('rebrandInvestigationGuide', () => {
  it('rebrands Elastic Defend as Scrutiny EDR in investigation guide copy', () => {
    expect(
      rebrandInvestigationGuide(
        '### Investigating Endpoint Security (Elastic Defend)\n\nElastic Defend generated this alert.'
      )
    ).toBe(
      '### Investigating Endpoint Security (Scrutiny EDR)\n\nScrutiny EDR generated this alert.'
    );
  });

  it('preserves Elasticsearch product names and URL destinations', () => {
    expect(
      rebrandInvestigationGuide(
        '[Elastic documentation](https://www.elastic.co/guide) for Elasticsearch'
      )
    ).toBe('[Cyberstanc documentation](https://www.elastic.co/guide) for Elasticsearch');
  });
});
