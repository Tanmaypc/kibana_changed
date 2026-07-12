/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import {
  getCyberstancRuntimeSurface,
  replaceCyberstancRuntimeBrandText,
  startCyberstancRuntimeUiInjection,
} from './cyberstanc_runtime_ui_injection';

describe('Cyberstanc runtime UI injection', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.body.removeAttribute('data-cyberstanc-runtime-surface');
    document.getElementById('cyberstanc-runtime-ui-styles')?.remove();
    window.history.replaceState({}, '', '/');
  });

  describe('getCyberstancRuntimeSurface', () => {
    it.each([
      ['/s/default/app/integrations/browse', 'integrations'],
      ['/app/security/rules', 'rules'],
      ['/app/security/rules/id/example', 'rules'],
      ['/app/security/alerts', 'alerts'],
    ] as const)('detects %s as the %s surface', (pathname, surface) => {
      expect(getCyberstancRuntimeSurface({ pathname, hash: '' }, document)).toBe(surface);
    });

    it('does not activate on unrelated pages', () => {
      expect(
        getCyberstancRuntimeSurface({ pathname: '/app/security/hosts', hash: '' }, document)
      ).toBeUndefined();
    });
  });

  describe('replaceCyberstancRuntimeBrandText', () => {
    it('rebrands presentation phrases', () => {
      expect(replaceCyberstancRuntimeBrandText('Elastic Security and Elastic managed rules')).toBe(
        'Cyberstanc Security and Cyberstanc managed rules'
      );
    });

    it('preserves technical product names', () => {
      expect(
        replaceCyberstancRuntimeBrandText('Elasticsearch, Elastic Agent, Elastic Defend, and KQL')
      ).toBe('Elasticsearch, Elastic Agent, Elastic Defend, and KQL');
    });
  });

  it('applies only to visible app copy and restores it during cleanup', () => {
    window.history.replaceState({}, '', '/app/security/rules');
    document.body.innerHTML = `
      <div class="kbnAppWrapper">
        <span data-test-subj="visible-copy">Elastic Security rules</span>
        <a data-test-subj="linked-copy">Elastic Security documentation</a>
        <code data-test-subj="code-copy">Elastic Security API</code>
      </div>
    `;

    const stopInjection = startCyberstancRuntimeUiInjection();

    expect(document.body.dataset.cyberstancRuntimeSurface).toBe('rules');
    expect(document.querySelector('[data-test-subj="visible-copy"]')?.textContent).toBe(
      'Cyberstanc Security rules'
    );
    expect(document.querySelector('[data-test-subj="linked-copy"]')?.textContent).toBe(
      'Elastic Security documentation'
    );
    expect(document.querySelector('[data-test-subj="code-copy"]')?.textContent).toBe(
      'Elastic Security API'
    );

    stopInjection();

    expect(document.body.dataset.cyberstancRuntimeSurface).toBeUndefined();
    expect(document.querySelector('[data-test-subj="visible-copy"]')?.textContent).toBe(
      'Elastic Security rules'
    );
  });
});
