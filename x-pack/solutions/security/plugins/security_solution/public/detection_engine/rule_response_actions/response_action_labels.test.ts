/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { ResponseActionTypesEnum } from '../../../common/api/detection_engine/model/rule_response_actions';
import { getActionDetails } from './constants';
import { responseActionTypes } from './get_supported_response_actions';

describe('response action labels', () => {
  it('uses Scrutiny EDR for endpoint response actions', () => {
    const endpointAction = responseActionTypes.find(
      ({ id }) => id === ResponseActionTypesEnum['.endpoint']
    );

    expect(endpointAction?.name).toBe('Scrutiny EDR');
    expect(getActionDetails(ResponseActionTypesEnum['.endpoint']).name).toBe('Scrutiny EDR');
  });
});
