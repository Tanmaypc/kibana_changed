/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import {
  getCyberstancRedirectUrl,
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

  describe('getCyberstancRedirectUrl', () => {
    it.each([
      'https://www.elastic.co/guide/index.html',
      'https://docs.elastic.dev/kibana-dev-docs',
      'https://ela.st/example',
      'https://elastic.github.io/eui',
    ])('redirects the Elastic website %s', (href) => {
      expect(getCyberstancRedirectUrl(href)).toBe('https://cyberstanc.com');
    });

    it.each([
      '/app/security/alerts',
      'mailto:support@example.com',
      'https://example.com/elastic',
      'https://elastic.example.com',
      'https://artifacts.elastic.co/downloads/beats/filebeat/filebeat.tar.gz',
      'https://www.elastic.co/downloads/beats/filebeat',
      'https://ela.st/download-elastic-agent',
      'https://cloud.elastic.co/login',
      'https://deployment.gcp.elastic-cloud.com',
    ])('preserves the non-marketing or operational destination %s', (href) => {
      expect(getCyberstancRedirectUrl(href)).toBeUndefined();
    });

    it('preserves same-origin application links on Elastic-hosted deployments', () => {
      expect(
        getCyberstancRedirectUrl(
          'https://deployment.gcp.elastic-cloud.com/app/security/alerts',
          'https://deployment.gcp.elastic-cloud.com/app/security/rules'
        )
      ).toBeUndefined();
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

  it('redirects Elastic website links globally without changing internal or third-party links', () => {
    window.history.replaceState({}, '', '/app/security/hosts');
    document.body.innerHTML = `
      <div class="kbnAppWrapper">
        <a data-test-subj="elastic-link" href="https://www.elastic.co/guide">Elastic</a>
        <a data-test-subj="internal-link" href="/app/security/alerts">Alerts</a>
        <a data-test-subj="external-link" href="https://example.com">Example</a>
      </div>
    `;

    const stopInjection = startCyberstancRuntimeUiInjection();

    expect(document.querySelector('[data-test-subj="elastic-link"]')?.getAttribute('href')).toBe(
      'https://cyberstanc.com'
    );
    expect(document.querySelector('[data-test-subj="internal-link"]')?.getAttribute('href')).toBe(
      '/app/security/alerts'
    );
    expect(document.querySelector('[data-test-subj="external-link"]')?.getAttribute('href')).toBe(
      'https://example.com'
    );

    stopInjection();

    expect(document.querySelector('[data-test-subj="elastic-link"]')?.getAttribute('href')).toBe(
      'https://www.elastic.co/guide'
    );
  });
});
