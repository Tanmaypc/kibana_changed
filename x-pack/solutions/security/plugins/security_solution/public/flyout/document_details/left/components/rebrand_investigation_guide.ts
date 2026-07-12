/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

const URL_PATTERN = /(https?:\/\/[^\s)]+)/g;

const rebrandTextSegment = (segment: string): string =>
  segment
    .replace(/\bElastic Defend\b/g, 'Scrutiny EDR')
    .replace(/\bElastic\b/g, 'Cyberstanc');

/**
 * Rebrands rule-provided investigation guide copy for display without changing
 * the stored rule note, Elasticsearch product names, or URL destinations.
 */
export const rebrandInvestigationGuide = (ruleNote: string): string =>
  ruleNote
    .split(URL_PATTERN)
    .map((segment, index) => (index % 2 === 0 ? rebrandTextSegment(segment) : segment))
    .join('');
