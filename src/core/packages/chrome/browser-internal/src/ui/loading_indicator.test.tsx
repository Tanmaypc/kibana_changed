/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { EuiImage, EuiLoadingSpinner } from '@elastic/eui';
import React from 'react';
import { shallow } from 'enzyme';
import { BehaviorSubject } from 'rxjs';

import { LoadingIndicator } from './loading_indicator';
import { CyberstancSymbol } from './header/elastic_mark';

describe('kbnLoadingIndicator', () => {
  it('is hidden by default', () => {
    const wrapper = shallow(<LoadingIndicator loadingCount$={new BehaviorSubject(0)} />);
    expect(
      wrapper.findWhere((node) => node.prop('data-test-subj') === 'globalLoadingIndicator-hidden')
    ).toHaveLength(1);
    expect(wrapper.find(CyberstancSymbol)).toHaveLength(1);
    expect(wrapper.find(CyberstancSymbol).prop('aria-label')).toBe('Cyberstanc logo');
  });

  it('is visible when loadingCount is > 0', () => {
    const wrapper = shallow(<LoadingIndicator loadingCount$={new BehaviorSubject(1)} />);
    wrapper.setState({ visible: true });

    expect(wrapper.find(EuiLoadingSpinner)).toHaveLength(1);
    expect(wrapper.find(EuiLoadingSpinner).prop('data-test-subj')).toBe(
      'globalLoadingIndicator'
    );
  });

  it('shows logo image when customLogo is set', () => {
    const wrapper = shallow(
      <LoadingIndicator loadingCount$={new BehaviorSubject(0)} customLogo={'customLogo'} />
    );

    expect(wrapper.find(EuiImage)).toHaveLength(1);
    expect(wrapper.find(EuiImage).prop('src')).toBe('customLogo');
  });
});
