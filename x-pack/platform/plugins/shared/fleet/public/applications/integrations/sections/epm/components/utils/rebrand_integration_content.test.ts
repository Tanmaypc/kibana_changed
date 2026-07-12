/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import {
  rebrandIntegrationDisplayText,
  rebrandIntegrationMarkdown,
} from './rebrand_integration_content';

describe('integration content rebranding', () => {
  it('rebrands registry-provided display text', () => {
    expect(rebrandIntegrationDisplayText('Elastic Agent for Elasticsearch and Kibana')).toBe(
      'Cyberstanc Agent for Cyberstanc Search and Cyberstanc'
    );
  });

  it('rebrands prose and headings in package Markdown', () => {
    expect(
      rebrandIntegrationMarkdown(`
# abuse.ch integration for Elastic

The integration for Elastic sends data to Elasticsearch and provides Kibana assets.
`)
    ).toContain(
      'The integration for Cyberstanc sends data to Cyberstanc Search and provides Cyberstanc assets.'
    );
  });

  it('preserves fenced commands, inline code, lowercase identifiers, and URLs', () => {
    const markdown = `
Use Elastic Agent with \`elastic-agent install\` and https://example.com/Elastic.

\`\`\`sh
elastic-agent install --url=https://artifacts.elastic.co
echo "Elastic Agent"
\`\`\`
`;

    expect(rebrandIntegrationMarkdown(markdown)).toBe(`
Use Cyberstanc Agent with \`elastic-agent install\` and https://example.com/Elastic.

\`\`\`sh
elastic-agent install --url=https://artifacts.elastic.co
echo "Elastic Agent"
\`\`\`
`);
  });
});
