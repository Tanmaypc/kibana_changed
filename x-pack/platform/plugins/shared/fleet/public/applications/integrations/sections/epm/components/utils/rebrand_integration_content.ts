/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

const replaceBrandTerms = (value: string): string =>
  value
    .split(/(https?:\/\/[^\s<>()\]]+)/g)
    .map((segment, index) =>
      index % 2 === 1
        ? segment
        : segment
            .replace(/\bElasticsearch\b/g, 'Cyberstanc Search')
            .replace(/\bKibana\b/g, 'Cyberstanc')
            .replace(/\bElastic\b/g, 'Cyberstanc')
    )
    .join('');

const replaceOutsideInlineCode = (line: string): string => {
  let result = '';
  let cursor = 0;

  while (cursor < line.length) {
    const openingIndex = line.indexOf('`', cursor);
    if (openingIndex === -1) {
      return result + replaceBrandTerms(line.slice(cursor));
    }

    result += replaceBrandTerms(line.slice(cursor, openingIndex));

    let delimiterEnd = openingIndex;
    while (line[delimiterEnd] === '`') {
      delimiterEnd += 1;
    }
    const delimiter = line.slice(openingIndex, delimiterEnd);
    const closingIndex = line.indexOf(delimiter, delimiterEnd);

    if (closingIndex === -1) {
      return result + line.slice(openingIndex);
    }

    const codeEnd = closingIndex + delimiter.length;
    result += line.slice(openingIndex, codeEnd);
    cursor = codeEnd;
  }

  return result;
};

/**
 * Rebrands package-registry Markdown before React renders it. Code fences and
 * inline code are preserved so commands, configuration, and identifiers remain
 * technically accurate.
 */
export const rebrandIntegrationMarkdown = (markdown: string | undefined): string | undefined => {
  if (!markdown) {
    return markdown;
  }

  let activeFence: { marker: string; length: number } | undefined;

  return markdown
    .split('\n')
    .map((line) => {
      const fenceMatch = /^\s*(`{3,}|~{3,})/.exec(line);
      const fenceDelimiter = fenceMatch?.[1];

      if (activeFence) {
        if (
          fenceDelimiter &&
          fenceDelimiter.charAt(0) === activeFence.marker &&
          fenceDelimiter.length >= activeFence.length
        ) {
          activeFence = undefined;
        }
        return line;
      }

      if (fenceDelimiter) {
        activeFence = { marker: fenceDelimiter.charAt(0), length: fenceDelimiter.length };
        return line;
      }

      return replaceOutsideInlineCode(line);
    })
    .join('\n');
};

/** Rebrands registry-provided titles and descriptions used by integration cards and headers. */
export const rebrandIntegrationDisplayText = (value: string): string => replaceBrandTerms(value);
